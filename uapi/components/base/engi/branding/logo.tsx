import React from 'react';

type LogoProps = {
  beta?: boolean;
  className?: string;
  height?: string;
  width?: string;
  fill?: string;
};

export default function Logo({
  beta = false,
  className = "",
  height = 'h-10',
  width = 'h-10',
  fill = '#65FEB7'
}: LogoProps) {
  return (
    <div className={"relative " + className} >
      <svg viewBox="0 0 31 26" className={`${height} ${width} z-20`}>
        <path fillRule="evenodd" clipRule="evenodd" d="M17.936 22.704a9.756 9.756 0 0 0 8.956-5.859h3.527A13.062 13.062 0 0 1 17.936 26a13.062 13.062 0 0 1-12.483-9.155h3.526a9.756 9.756 0 0 0 8.957 5.86Zm0-19.408a9.756 9.756 0 0 0-8.957 5.859H5.453A13.062 13.062 0 0 1 17.936 0c5.87 0 10.836 3.852 12.483 9.155h.002c.498 1.72.579 3.05.579 3.662 0 .976-.081 1.65-.081 1.65H0l2.576-3.21h24.957s-.213-1.187-.64-2.102a9.756 9.756 0 0 0-8.957-5.86Z" fill={fill}>
        </path>
      </svg>
      {beta && (
        <div className="absolute z-30 bottom-0 right-[-10px] translate-x-[65%] translate-y-[65%] text-xs font-medium text-nowrap">
          <span className="text-[#65FEB7] [text-shadow:0_0_8px_rgba(101,254,183,0.8),0_0_16px_rgba(101,254,183,0.4)]">GA-1</span><sup className="text-[0.75em] ml-[1px] text-[#FF9547] [text-shadow:0_0_8px_rgba(255,149,71,0.8),0_0_16px_rgba(255,149,71,0.4)]">PRC</sup>
        </div>
      )}
    </div>
  );
}
