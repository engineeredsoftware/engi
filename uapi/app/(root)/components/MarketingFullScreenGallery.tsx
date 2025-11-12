"use client";

import React from 'react';

interface Screenshot {
  src: string;
  alt?: string;
  title?: string;
}

interface FullScreenGalleryProps {
  images: Screenshot[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const MarketingFullScreenGallery: React.FC<FullScreenGalleryProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev
}) => {
  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="relative max-w-7xl max-h-full p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl z-10"
        >
          ×
        </button>

        {currentImage && (
          <img
            src={currentImage.src}
            alt={currentImage.alt || 'Gallery image'}
            className="max-w-full max-h-full object-contain"
          />
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
            >
              ‹
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MarketingFullScreenGallery;