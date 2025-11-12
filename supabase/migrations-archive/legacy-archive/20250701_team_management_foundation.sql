-- Team Management Foundation: Organizations, Invitations, and Enhanced User Model
-- Migration: 20250701_team_management_foundation
-- Description: Complete team management system with proper relational model

-- Create organization table
CREATE TABLE IF NOT EXISTS "public"."organizations" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "name" text NOT NULL,
    "slug" text UNIQUE NOT NULL,
    "email_domain" text UNIQUE NOT NULL,
    "logo_url" text,
    "settings" jsonb DEFAULT '{}'::jsonb,
    "subscription_tier" text DEFAULT 'free',
    "credit_balance" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create team member roles enum
CREATE TYPE "public"."team_role" AS ENUM (
    'owner',
    'admin', 
    'lead',
    'dev'
);

-- Create organization memberships table
CREATE TABLE IF NOT EXISTS "public"."organization_memberships" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "organization_id" uuid REFERENCES "public"."organizations"("id") ON DELETE CASCADE NOT NULL,
    "user_id" uuid REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE NOT NULL,
    "role" team_role NOT NULL DEFAULT 'dev',
    "credit_budget" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "joined_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE("organization_id", "user_id")
);

-- Create invitations table
CREATE TABLE IF NOT EXISTS "public"."invitations" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "organization_id" uuid REFERENCES "public"."organizations"("id") ON DELETE CASCADE NOT NULL,
    "invited_by" uuid REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE NOT NULL,
    "email" text NOT NULL,
    "role" team_role NOT NULL DEFAULT 'dev',
    "credit_budget" integer DEFAULT 0,
    "token" text UNIQUE NOT NULL,
    "expires_at" timestamp with time zone NOT NULL,
    "accepted_at" timestamp with time zone,
    "accepted_by" uuid REFERENCES "public"."user_profiles"("id") ON DELETE SET NULL,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE("organization_id", "email")
);

-- Add organization reference to user_profiles
ALTER TABLE "public"."user_profiles" 
ADD COLUMN IF NOT EXISTS "primary_organization_id" uuid REFERENCES "public"."organizations"("id") ON DELETE SET NULL;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "organizations_email_domain_idx" ON "public"."organizations"("email_domain");
CREATE INDEX IF NOT EXISTS "organization_memberships_user_id_idx" ON "public"."organization_memberships"("user_id");
CREATE INDEX IF NOT EXISTS "organization_memberships_organization_id_idx" ON "public"."organization_memberships"("organization_id");
CREATE INDEX IF NOT EXISTS "invitations_token_idx" ON "public"."invitations"("token");
CREATE INDEX IF NOT EXISTS "invitations_email_idx" ON "public"."invitations"("email");
CREATE INDEX IF NOT EXISTS "invitations_organization_id_idx" ON "public"."invitations"("organization_id");

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION "public"."set_updated_at"()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER "organizations_updated_at"
    BEFORE UPDATE ON "public"."organizations"
    FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();

CREATE TRIGGER "organization_memberships_updated_at"
    BEFORE UPDATE ON "public"."organization_memberships"
    FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();

-- Row Level Security (RLS) Policies

-- Organizations: Users can read their own organization
ALTER TABLE "public"."organizations" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their organization" ON "public"."organizations"
    FOR SELECT USING (
        id IN (
            SELECT organization_id FROM "public"."organization_memberships" 
            WHERE user_id = auth.uid() AND is_active = true
        )
    );

CREATE POLICY "Organization owners can update their organization" ON "public"."organizations"
    FOR UPDATE USING (
        id IN (
            SELECT organization_id FROM "public"."organization_memberships" 
            WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND is_active = true
        )
    );

-- Organization Memberships: Users can read their organization's memberships
ALTER TABLE "public"."organization_memberships" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read organization memberships" ON "public"."organization_memberships"
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM "public"."organization_memberships" 
            WHERE user_id = auth.uid() AND is_active = true
        )
    );

CREATE POLICY "Admins can manage organization memberships" ON "public"."organization_memberships"
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM "public"."organization_memberships" 
            WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND is_active = true
        )
    );

-- Invitations: Admins can manage invitations
ALTER TABLE "public"."invitations" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage invitations" ON "public"."invitations"
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM "public"."organization_memberships" 
            WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND is_active = true
        )
    );

CREATE POLICY "Anyone can read invitations by token" ON "public"."invitations"
    FOR SELECT USING (true);

-- Helper function to get user's organization
CREATE OR REPLACE FUNCTION "public"."get_user_organization"(user_id uuid)
RETURNS TABLE(
    organization_id uuid,
    organization_name text,
    organization_slug text,
    user_role team_role,
    credit_budget integer
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        o.id,
        o.name,
        o.slug,
        om.role,
        om.credit_budget
    FROM "public"."organizations" o
    JOIN "public"."organization_memberships" om ON o.id = om.organization_id
    WHERE om.user_id = get_user_organization.user_id AND om.is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if email domain is available
CREATE OR REPLACE FUNCTION "public"."is_email_domain_available"(domain text)
RETURNS boolean AS $$
BEGIN
    RETURN NOT EXISTS(
        SELECT 1 FROM "public"."organizations" 
        WHERE email_domain = domain
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to extract email domain
CREATE OR REPLACE FUNCTION "public"."extract_email_domain"(email text)
RETURNS text AS $$
BEGIN
    RETURN split_part(email, '@', 2);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to create organization and set user as owner
CREATE OR REPLACE FUNCTION "public"."create_organization_with_owner"(
    org_name text,
    org_slug text,
    owner_email text,
    owner_id uuid
)
RETURNS uuid AS $$
DECLARE
    new_org_id uuid;
    email_domain text;
BEGIN
    -- Extract email domain
    email_domain := extract_email_domain(owner_email);
    
    -- Check if domain is available
    IF NOT is_email_domain_available(email_domain) THEN
        RAISE EXCEPTION 'Email domain % is already taken by another organization', email_domain;
    END IF;
    
    -- Create organization
    INSERT INTO "public"."organizations" (name, slug, email_domain)
    VALUES (org_name, org_slug, email_domain)
    RETURNING id INTO new_org_id;
    
    -- Add owner membership
    INSERT INTO "public"."organization_memberships" (organization_id, user_id, role)
    VALUES (new_org_id, owner_id, 'owner');
    
    -- Update user's primary organization
    UPDATE "public"."user_profiles" 
    SET primary_organization_id = new_org_id
    WHERE id = owner_id;
    
    RETURN new_org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create credit transactions table for audit trail
CREATE TABLE IF NOT EXISTS "public"."credit_transactions" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "organization_id" uuid REFERENCES "public"."organizations"("id") ON DELETE CASCADE NOT NULL,
    "user_id" uuid REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE NOT NULL,
    "type" text NOT NULL CHECK (type IN ('purchase', 'allocation', 'usage', 'refund', 'adjustment')),
    "amount" integer NOT NULL,
    "description" text,
    "metadata" jsonb DEFAULT '{}'::jsonb,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for credit transactions
CREATE INDEX IF NOT EXISTS "credit_transactions_organization_id_idx" ON "public"."credit_transactions"("organization_id");
CREATE INDEX IF NOT EXISTS "credit_transactions_user_id_idx" ON "public"."credit_transactions"("user_id");
CREATE INDEX IF NOT EXISTS "credit_transactions_type_idx" ON "public"."credit_transactions"("type");
CREATE INDEX IF NOT EXISTS "credit_transactions_created_at_idx" ON "public"."credit_transactions"("created_at");

-- RLS for credit transactions
ALTER TABLE "public"."credit_transactions" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read organization credit transactions" ON "public"."credit_transactions"
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM "public"."organization_memberships" 
            WHERE user_id = auth.uid() AND is_active = true
        )
    );

CREATE POLICY "Admins can manage credit transactions" ON "public"."credit_transactions"
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM "public"."organization_memberships" 
            WHERE user_id = auth.uid() AND role IN ('owner', 'admin') AND is_active = true
        )
    );

-- Function to track credit usage
CREATE OR REPLACE FUNCTION "public"."track_credit_usage"(
    org_id uuid,
    member_id uuid,
    credits_used integer,
    description text DEFAULT NULL
)
RETURNS void AS $$
BEGIN
    -- Insert credit usage transaction
    INSERT INTO "public"."credit_transactions" (
        organization_id,
        user_id,
        type,
        amount,
        description
    ) VALUES (
        org_id,
        member_id,
        'usage',
        -credits_used, -- Negative for usage
        description
    );
    
    -- Update user's credit usage (if user_credit_usages table exists)
    -- This would be handled by the application logic
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT ALL ON ALL TABLES IN SCHEMA "public" TO "authenticated";
GRANT ALL ON ALL SEQUENCES IN SCHEMA "public" TO "authenticated";
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA "public" TO "authenticated";