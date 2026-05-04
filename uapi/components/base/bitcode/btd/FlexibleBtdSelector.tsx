"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';

export interface FlexibleBtdSelectorProps {
  /** Current numeric value of BTD */
  value: number;
  /** Callback when value changes (after clamp) */
  onChange: (newValue: number) => void;
  /** Slider minimum BTD amount */
  min: number;
  /** Slider maximum BTD amount */
  max: number;
  /** Cost per BTD in USD */
  perBtdCost: number;
  /** Factor for approximating asset pack count */
  assetPacksFactor?: number;
  /** Disable typing into inputs (industrial fixed) */
  inputDisabled?: boolean;
  /** accent color 'emerald' or 'purple' */
  accent?: 'emerald' | 'purple';
  /** Treat the slider value as USD instead of BTD */
  valueIsUSD?: boolean;
  /** When valueIsUSD and Industrial tier selected */
  isIndustrial?: boolean;
  /** BTD granted when industrial */
  industrialBtd?: number;
  /** Advisory content displayed just above the slider track */
  advisoryContent?: React.ReactNode;
  /** Controls visibility & animation of the advisory */
  showAdvisory?: boolean;
}

export const FlexibleBtdSelector: React.FC<FlexibleBtdSelectorProps> = ({
  value,
  onChange,
  min,
  max,
  perBtdCost,
  assetPacksFactor = 100,
  accent = 'emerald',
  inputDisabled = false,
  valueIsUSD = false,
  isIndustrial = false,
  industrialBtd,
  advisoryContent,
  showAdvisory = false,
}) => {
  // Format helpers
  const formatBtd = (val: number) => val?.toLocaleString() ?? '0';
  const formatPrice = (val: number) => {
    if (val == null || isNaN(val)) return '0';
    // Show no decimals when value represents whole dollars
    const withDecimals = val % 1 !== 0 ? val.toFixed(2) : val.toFixed(0);
    return withDecimals.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Derive BTD & price based on interpretation of `value`
  const derivedBtd = valueIsUSD
    ? isIndustrial
      ? industrialBtd || 0
      : Math.round(value / perBtdCost)
    : value;
  const derivedPrice = valueIsUSD ? value : value * perBtdCost;
  const clamp = (val: number) => Math.max(min, Math.min(max, val));

  // Local input states for freeform typing
  const [btdInput, setBtdInput] = useState<string>(() => formatBtd(derivedBtd));
  const [priceInput, setPriceInput] = useState<string>(() => formatPrice(derivedPrice));
  // Track whether user entered an invalid (out-of-range / NaN) amount
  const [isInvalidInput, setIsInvalidInput] = useState<boolean>(false);
  // Flags for whether the user is actively editing each input
  const [isEditingCredit, setIsEditingCredit] = useState<boolean>(false);
  const [isEditingPrice, setIsEditingPrice] = useState<boolean>(false);

  // Sync inputs when external value changes, but avoid overwriting during user edit
  useEffect(() => {
    if (!isEditingCredit) {
      setBtdInput(formatBtd(derivedBtd));
    }
    if (!isEditingPrice) {
      setPriceInput(formatPrice(derivedPrice));
    }
  }, [derivedBtd, derivedPrice, isEditingCredit, isEditingPrice]);

  // Handle slider moves
  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    const clamped = clamp(parsed);
    onChange(clamped);
    // Update display values
    if (valueIsUSD) {
      if (isIndustrial) {
        setBtdInput(formatBtd(industrialBtd || 0));
      } else {
        setBtdInput(formatBtd(Math.round(clamped / perBtdCost)));
      }
      setPriceInput(formatPrice(clamped));
      setIsInvalidInput(false);
      // stop any input editing state when slider moves
      setIsEditingCredit(false);
      setIsEditingPrice(false);
    } else {
      setBtdInput(formatBtd(clamped));
      setPriceInput(formatPrice(clamped * perBtdCost));
    }
  };

  // Freeform BTD input when slider represents USD
  const handleBtdInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isIndustrial) return;
    const txt = e.target.value;
    setBtdInput(txt);
    const parsed = parseInt(txt.replace(/,/g, ''), 10);
    if (!isNaN(parsed)) {
      const usd = Math.round(parsed * perBtdCost);
      if (usd >= min && usd <= max) {
        onChange(usd);
        setPriceInput(formatPrice(usd));
        setIsInvalidInput(false);
      } else {
        setIsInvalidInput(true);
      }
    } else {
      setIsInvalidInput(true);
    }
  };

  const handleBtdInputBlur = () => {
    if (isIndustrial) return;
    const parsed = parseInt(btdInput.replace(/,/g, ''), 10);
    if (isNaN(parsed)) {
      setBtdInput(formatBtd(derivedBtd));
      setIsInvalidInput(false);
    } else {
      const usd = Math.round(parsed * perBtdCost);
      const clamped = clamp(usd);
      onChange(clamped);
      setBtdInput(formatBtd(Math.round(clamped / perBtdCost)));
      setPriceInput(formatPrice(clamped));
      setIsInvalidInput(false);
    }
  };

  // Freeform price input typing
  const handlePriceInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isIndustrial) return;
    const txt = e.target.value;
    setPriceInput(txt);
    const parsed = parseFloat(txt.replace(/,/g, ''));
    if (!isNaN(parsed)) {
      const usd = Math.round(parsed);
      if (usd >= min && usd <= max) {
        onChange(usd);
        setBtdInput(formatBtd(Math.round(usd / perBtdCost)));
        setIsInvalidInput(false);
      } else {
        setIsInvalidInput(true);
      }
    } else {
      setIsInvalidInput(true);
    }
  };

  const handlePriceInputBlur = () => {
    if (isIndustrial) return;
    const parsed = parseFloat(priceInput.replace(/,/g, ''));
    if (isNaN(parsed)) {
      setPriceInput(formatPrice(value));
      setIsInvalidInput(false);
    } else {
      const usd = Math.round(parsed);
      const clamped = clamp(usd);
      onChange(clamped);
      setBtdInput(formatBtd(Math.round(clamped / perBtdCost)));
      setPriceInput(formatPrice(clamped));
    }
  };

  return (
    <>
      {/* Slider + optional advisory wrapper */}
      <div className="relative w-full min-h-[40px] laptop:min-h-0">
        {/* Advisory */}
        {advisoryContent && (
          <div
            className={`laptop:absolute laptop:left-1/2 laptop:-translate-x-1/2 laptop:-translate-y-2 flex items-center gap-1 text-amber-200 text-[12px] laptop:text-sm whitespace-normal laptop:whitespace-nowrap break-words text-center px-1 drop-shadow-[0_0_6px_rgba(251,191,36,0.45)] pointer-events-none transition-all duration-300 ${showAdvisory ? 'opacity-100' : 'opacity-0 laptop:translate-y-1'
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 flex-shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M11.25 2.25c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm-.75 4.875a.75.75 0 011.5 0v.75a.75.75 0 01-1.5 0v-.75zm.75 3a.75.75 0 00-.75.75v5.25a.75.75 0 001.5 0v-5.25a.75.75 0 00-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            {advisoryContent}
          </div>
        )}

        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={handleSliderChange}
          className={`custom-slider ${isInvalidInput ? 'slider-grey' : accent === 'emerald' ? 'slider-emerald' : 'slider-purple'}`}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {/* Wrapper for forms + info so card has 3 flex children */}
      <div className="flex flex-col items-center gap-4">
        {/* First row: $BTD | Dollars with vertical bar */}
        <div className="flex flex-col laptop:flex-row items-baseline justify-center w-full px-4 laptop:px-6">
          {/* Price FIRST */}
          <div className="flex items-baseline justify-center font-extrabold gap-x-2">
            <span
              className={`text-xl laptop:text-2xl font-medium leading-tight whitespace-nowrap ${accent === 'purple' ? 'text-purple-300' : 'text-emerald-300'
                }`}
            >
              $ USD
            </span>
            <input
              type="text"
              value={priceInput}
              onFocus={() => setIsEditingPrice(true)}
              onChange={!isIndustrial ? handlePriceInputChange : undefined}
              onBlur={e => {
                if (!isIndustrial) {
                  handlePriceInputBlur();
                  setIsEditingPrice(false);
                }
              }}
              className="bg-transparent focus:outline-none text-left text-white underline decoration-gray-400 w-[5.1ch] pl-0 leading-tight text-5xl laptop:text-6xl"
              readOnly={isIndustrial}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Flexible spacer + vertical separator */}
          <div className="flex-1 hidden laptop:flex justify-center">
            <div
              className={
                `w-px laptop:h-8 rounded-full ` +
                (accent === 'purple'
                  ? 'bg-purple-300 shadow-[0_0_8px_rgba(167,139,250,0.8)]'
                  : 'bg-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.8)]')
              }
            />
          </div>

          {/* BTD SECOND */}
          <div className="flex items-baseline justify-center font-extrabold gap-x-2">
            <span
              className={`text-xl laptop:text-2xl font-medium drop-shadow-[0_0_6px_rgba(16,185,129,0.8)] ${accent === 'purple' ? 'text-purple-300' : 'text-emerald-300'
                }`}
            >
              $BTD
            </span>
            <input
              type="text"
              value={btdInput}
              onFocus={() => setIsEditingCredit(true)}
              onChange={!isIndustrial ? handleBtdInputChange : undefined}
              onBlur={e => {
                if (!isIndustrial) {
                  handleBtdInputBlur();
                  setIsEditingCredit(false);
                }
              }}
              className="bg-transparent focus:outline-none text-left text-white underline decoration-gray-400 w-[5.3ch] leading-tight text-4xl laptop:text-5xl"
              readOnly={isIndustrial}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>

        {/* Second row: price per BTD + asset packs */}
        <div className="flex flex-col laptop:flex-row items-center justify-center gap-6 laptop:items-center">
          <div
            className="plan-value text-lg laptop:text-xl font-medium leading-tight flex items-center"
            style={{ marginBottom: 0 }}
          >
            ${perBtdCost.toFixed(2)} per BTD
          </div>
          <div
            className={`plan-asset-packs inline-flex items-center w-fit px-3 py-1 rounded-md gap-1 text-lg laptop:text-xl ${accent === 'purple'
              ? 'bg-purple-500/10 text-purple-300'
              : 'bg-emerald-500/10 text-emerald-300'
              }`}
          >
            <span>≈ {Math.round(derivedBtd / assetPacksFactor).toLocaleString()} asset packs</span>
            <div className="tooltip-icon text-white/70" title="100 BTD per asset pack baseline">ⓘ</div>
          </div>
        </div> {/* end info row */}
      </div> {/* end wrapper */}
    </>
  );
};
// Default export for convenience
export default FlexibleBtdSelector;
