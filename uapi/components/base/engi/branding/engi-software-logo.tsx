import React from 'react';
import Image from 'next/image';

type EngiSoftwareLogoProps = {
  width?: number;
  height?: number;
  className?: string;
  softwareClassName?: string;
}

export default function EngiSoftwareLogo({
  width = 115,
  height = 51.5,
  className = "",
  softwareClassName = "text-gray-300 ml-1 font-light"
}: EngiSoftwareLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image src="/engi-typelogo.png" width={width} height={height} alt="engi logo" />
      <span className={softwareClassName}>.software</span>
    </div>
  );
}
