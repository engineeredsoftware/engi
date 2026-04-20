import React from 'react';

interface MultiAgentsIconProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const MultiAgentsIcon = ({ className = 'w-4 h-4', strokeWidth = 1 }: MultiAgentsIconProps) => {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <circle cx="7" cy="7" r="1.5" opacity={0.8} />
      <circle cx="17" cy="7" r="1.5" opacity={0.8} />
      <circle cx="17" cy="17" r="1.5" opacity={0.8} />
      <circle cx="7" cy="17" r="1.5" opacity={0.8} />
      <path d="M8.5 8.5L11 11M15.5 8.5L13 11M15.5 15.5L13 13M8.5 15.5L11 13" opacity={0.8} />
    </svg>
  );
};

export default MultiAgentsIcon;
 
