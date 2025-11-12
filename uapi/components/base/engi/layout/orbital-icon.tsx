import React from 'react';

interface OrbitalIconProps {
  className?: string;
  variant?: 'violet' | 'green';
}

export const OrbitalIcon = ({ className = "", variant = 'violet' }: OrbitalIconProps) => {
  const color = variant === 'green' ? '#67feb7' : '#a78bfa';
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill={color} />
      <path d="M4 12c4-6 12-6 16 0" stroke={color} strokeWidth="1.5" />
      <path d="M4 12c4 6 12 6 16 0" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

export default OrbitalIcon;

