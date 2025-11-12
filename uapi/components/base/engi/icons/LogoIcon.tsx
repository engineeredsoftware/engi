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

/**
 * LogoIcon: Engi icon as inline SVG, themable via fill color.
 */
const LogoIcon: React.FC<LogoIconProps & React.SVGProps<SVGSVGElement>> = ({
  fill = '#65FEB7',
  width = 24,
  height = 24,
  className = '',
  style,
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 113 97"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    {...props}
  >
    <path
      d="M32.9121 62.6455C38.3391 75.3002 50.8401 84.1562 65.3945 84.1562C79.949 84.1562 92.4499 75.3002 97.877 62.6455H110.667C104.692 82.1132 86.6828 96.2568 65.3945 96.2568C44.1063 96.2568 26.0974 82.1132 20.1221 62.6455H32.9121ZM65.3945 0.800781C86.6828 0.800781 104.692 14.9443 110.667 34.4121H110.673C112.479 40.725 112.773 45.6106 112.773 47.8564C112.773 51.4192 112.483 53.8869 112.479 53.9131H0.34668L9.68848 42.1309H100.199C100.194 42.1026 99.4222 37.7623 97.8789 34.4121H97.877C92.45 21.7573 79.9491 12.9004 65.3945 12.9004C50.84 12.9004 38.3391 21.7573 32.9121 34.4121H20.1221C26.0973 14.9443 44.1062 0.800781 65.3945 0.800781Z"
      fill={fill}
    />
  </svg>
);

export default LogoIcon;