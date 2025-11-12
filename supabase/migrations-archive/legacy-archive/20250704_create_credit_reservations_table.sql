-- Create credit_reservations table and consume_reservation function
-- This implements the escrow system for long-running pipeline operations

-- Credit reservations table
create table if not exists public.credit_reservations (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  reserved integer not null check (reserved > 0),
  used integer not null default 0 check (used >= 0),
  status text not null check (status in ('OPEN', 'CLOSED')) default 'OPEN',
  created_at timestamptz not null default now(),
  closed_at timestamptz null,
  updated_at timestamptz not null default now()
);

-- Indexes for performance
create index if not exists idx_credit_reservations_user_id on public.credit_reservations(user_id);
create index if not exists idx_credit_reservations_status on public.credit_reservations(status);
create index if not exists idx_credit_reservations_created_at on public.credit_reservations(created_at);

-- RLS policies
alter table public.credit_reservations enable row level security;

-- Users can only see their own reservations
create policy credit_reservations_select on public.credit_reservations
  for select using (auth.uid() = user_id);

-- Only service role can insert/update reservations (managed by application)
create policy credit_reservations_service_role on public.credit_reservations
  for all using (auth.role() = 'service_role');

-- Function to atomically consume credits from a reservation with top-up logic
create or replace function public.consume_reservation(
  p_reservation_id text,
  p_additional_used integer,
  p_safety_margin integer default 10,
  p_top_up integer default 100
)
returns public.credit_reservations
language plpgsql
security definer
as $$
declare
  v_reservation record;
  v_user_id uuid;
  v_current_used integer;
  v_current_reserved integer;
  v_new_used integer;
  v_available integer;
  v_needs_topup boolean := false;
  v_topup_amount integer := 0;
  v_user_balance integer;
begin
  -- Validate inputs
  if p_additional_used < 0 then
    raise exception 'PAYS0' using message = 'Additional usage must be non-negative';
  end if;
  
  if p_safety_margin < 0 then
    raise exception 'PAYS0' using message = 'Safety margin must be non-negative';
  end if;
  
  if p_top_up <= 0 then
    raise exception 'PAYS0' using message = 'Top-up amount must be positive';
  end if;

  -- Lock and fetch the reservation
  select * into v_reservation
  from public.credit_reservations
  where id = p_reservation_id and status = 'OPEN'
  for update;

  if not found then
    raise exception 'PAYS0' using message = 'Reservation not found or already closed';
  end if;

  v_user_id := v_reservation.user_id;
  v_current_used := v_reservation.used;
  v_current_reserved := v_reservation.reserved;
  v_new_used := v_current_used + p_additional_used;

  -- Check if we have enough reserved credits
  v_available := v_current_reserved - v_new_used;
  
  if v_available < p_safety_margin then
    v_needs_topup := true;
    v_topup_amount := p_top_up;
    
    -- Check user balance for top-up
    select credits into v_user_balance
    from public.user_credits
    where user_id = v_user_id
    for update;
    
    if v_user_balance is null then
      v_user_balance := 0;
    end if;
    
    if v_user_balance < v_topup_amount then
      raise exception 'PAYS0' using message = format('Insufficient balance for top-up: have %s, need %s', v_user_balance, v_topup_amount);
    end if;
    
    -- Deduct credits for top-up
    update public.user_credits
    set credits = credits - v_topup_amount,
        updated_at = now()
    where user_id = v_user_id;
    
    -- Record the deduction
    insert into public.user_credit_usages (user_id, change, balance, description)
    values (v_user_id, -v_topup_amount, v_user_balance - v_topup_amount, 'Reservation top-up');
    
    -- Update reservation with additional credits
    update public.credit_reservations
    set reserved = reserved + v_topup_amount,
        used = v_new_used,
        updated_at = now()
    where id = p_reservation_id;
    
    -- Return updated reservation
    return query 
    select * from public.credit_reservations 
    where id = p_reservation_id;
  else
    -- Just update usage, no top-up needed
    update public.credit_reservations
    set used = v_new_used,
        updated_at = now()
    where id = p_reservation_id;
    
    -- Return updated reservation
    return query 
    select * from public.credit_reservations 
    where id = p_reservation_id;
  end if;
end;
$$;

-- Grant execute permissions
grant execute on function public.consume_reservation(text, integer, integer, integer) 
to anon, authenticated, service_role;

-- Helper function to record reservation usage (for backward compatibility with existing code)
create or replace function public.record_reservation_usage(
  p_reservation_id text,
  p_additional_used integer
)
returns boolean
language plpgsql
security definer
as $$
declare
  v_result record;
begin
  -- Use default safety margin and top-up values
  select * into v_result
  from public.consume_reservation(
    p_reservation_id,
    p_additional_used,
    coalesce(nullif(current_setting('app.credit_safety_margin', true), ''), '10')::integer,
    coalesce(nullif(current_setting('app.credit_top_up', true), ''), '100')::integer
  );
  
  return v_result.success;
exception
  when others then
    -- Log error but don't fail the operation unless it's a critical PAYS0 error
    if sqlerrm like '%PAYS0%' then
      raise;
    end if;
    return false;
end;
$$;

grant execute on function public.record_reservation_usage(text, integer) 
to anon, authenticated, service_role;

-- Update trigger to maintain updated_at
create or replace function public.update_credit_reservations_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_credit_reservations_updated_at
  before update on public.credit_reservations
  for each row execute function public.update_credit_reservations_updated_at();