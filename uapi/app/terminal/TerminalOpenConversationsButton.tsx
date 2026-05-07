'use client';

interface TerminalOpenConversationsButtonProps {
  className?: string;
  label?: string;
  onOpen: () => void;
}

export default function TerminalOpenConversationsButton({
  className = 'rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-left text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15',
  label = 'Open conversations',
  onOpen,
}: TerminalOpenConversationsButtonProps) {
  return (
    <button type="button" onClick={onOpen} className={className}>
      {label}
    </button>
  );
}
