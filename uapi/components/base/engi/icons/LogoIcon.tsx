"use client";

import React from 'react';

export interface LogoIconProps {
  /** Fill color for the logo */
  fill?: string;
  /** Width of the SVG */
  width?: number;
  /** Height of the SVG */
  height?: number;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

function normalizeLogoColor(fill: string) {
  if (fill === 'theme(colors.brand.emerald)') return '#65FEB7';
  if (fill === 'theme(colors.brand.red)') return '#EF4444';
  return fill;
}

/**
 * LogoIcon: Bitcode icon sourced from the canonical filesystem asset, themable via fill color.
 */
const LogoIcon: React.FC<LogoIconProps & React.SVGProps<SVGSVGElement>> = ({
  fill = '#65FEB7',
  width = 24,
  height = 24,
  className = '',
  style,
  ...props
}) => {
  const resolvedFill = normalizeLogoColor(fill);

  return (
    <span
      role="img"
      aria-label="Bitcode icon"
      {...props}
      className={className}
      style={{
        display: 'inline-block',
        width,
        height,
        backgroundColor: resolvedFill,
        WebkitMaskImage: 'url("/bitcode.svg")',
        maskImage: 'url("/bitcode.svg")',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        ...style,
      }}
    />
  );
};

export default LogoIcon;
