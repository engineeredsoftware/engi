"use client";

import React from 'react';

interface PlaceholderImageProps {
  src?: string;
  alt?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
}

const MarketingPlaceholderImage: React.FC<PlaceholderImageProps> = ({
  src,
  alt = 'Placeholder image',
  className = '',
  width = '100%',
  height = 'auto',
  onClick
}) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      />
    );
  }

  return (
    <div
      className={`bg-gray-200 flex items-center justify-center ${className}`}
      style={{
        width,
        height: height === 'auto' ? '200px' : height,
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
    >
      <div className="text-gray-500 text-center">
        <div className="text-4xl mb-2">📷</div>
        <div className="text-sm">{alt}</div>
      </div>
    </div>
  );
};

export default MarketingPlaceholderImage;