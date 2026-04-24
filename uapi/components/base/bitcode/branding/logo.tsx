import React from 'react';

type LogoProps = {
  beta?: boolean;
  className?: string;
  height?: string;
  width?: string;
  fill?: string;
};

function normalizeLogoColor(fill: string) {
  if (fill === 'theme(colors.brand.emerald)') return '#65FEB7';
  if (fill === 'theme(colors.brand.red)') return '#EF4444';
  return fill;
}

export default function Logo({
  beta = false,
  className = "",
  height = 'h-10',
  width = 'w-10',
  fill = '#65FEB7'
}: LogoProps) {
  const resolvedFill = normalizeLogoColor(fill);

  return (
    <div className={"relative " + className} >
      <span
        aria-label="Bitcode logo"
        className={`block ${height} ${width} z-20`}
        style={{
          backgroundColor: resolvedFill,
          WebkitMaskImage: 'url("/bitcode.svg")',
          maskImage: 'url("/bitcode.svg")',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }}
      />
      {beta && (
        <div className="absolute z-30 bottom-0 right-[-10px] translate-x-[65%] translate-y-[65%] text-xs font-medium text-nowrap">
          <span className="text-[#65FEB7] [text-shadow:0_0_8px_rgba(101,254,183,0.8),0_0_16px_rgba(101,254,183,0.4)]">V26</span><sup className="text-[0.75em] ml-[1px] text-[#FF9547] [text-shadow:0_0_8px_rgba(255,149,71,0.8),0_0_16px_rgba(255,149,71,0.4)]">PRC</sup>
        </div>
      )}
    </div>
  );
}
