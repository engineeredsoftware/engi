"use client";

import React, { FC } from "react";
import { cn } from '@bitcode/styling';

interface DisabledTooltipWrapperProps {
  /** Tooltip text shown while the child element is hovered */
  tooltip: string;
  /** The disabled control (e.g. button) */
  children: React.ReactNode;
  /** Additional classes for the wrapper */
  className?: string;
  /** Optional positioning override – defaults to bottom-center */
  placement?: "bottom" | "top" | "right" | "left"; // supports left now

  /** Colour theme.  Defaults to emerald (Bitcode green) but can be switched to
   *  'purple' for marketing / coming-soon variants. */
  variant?: "emerald" | "purple";
}

/**
 * Wraps a disabled control and shows an animated “coming soon” tooltip on
 * hover.  The wrapper itself receives the hover state – this allows the
 * wrapped control to keep `pointer-events-none` if desired while still
 * revealing the tooltip.
 */
export const DisabledTooltipWrapper: FC<DisabledTooltipWrapperProps> = ({
  tooltip,
  children,
  className = "",
  placement = "bottom",
  variant = "emerald",
}) => {
  const isBottom = placement === "bottom";
  const isTop = placement === "top";
  const isRight = placement === "right";
  const isLeft = placement === "left";

  return (
    <div className={cn("relative inline-block group/tooltip", className)}>
      {children}

      {/* Tooltip bubble */}
      <div
        className={cn(
          "pointer-events-none absolute flex flex-col items-center z-50",
          isBottom && "left-1/2 -translate-x-1/2 top-full mt-4",
          isTop && "left-1/2 -translate-x-1/2 bottom-full mb-4",
          isRight && "top-1/2 left-full ml-4 -translate-y-1/2",
          isLeft && "top-1/2 right-full mr-4 -translate-y-1/2"
        )}
      >
        {/* Entrance / exit animation */}
        <div
          className="opacity-0 translate-y-1 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 group-hover/tooltip:scale-100 transition-all duration-300 ease-out"
          style={{ transformOrigin: "center" }}
        >
          {/* Bubble with arrow (arrow is sibling so bubble overlays diamond’s inner edges) */}
          <div className="relative">
            {/* Arrow diamond (background + border + glow) */}
            <div
              className={cn(
                "absolute w-3 h-3 -rotate-45 bg-gray-950/95 rounded-none z-0",
                // Placement-based positioning
          isBottom && "left-1/2 -translate-x-1/2 rounded-tr-[1px] -top-[0.38rem]",
          isTop && "left-1/2 -translate-x-1/2 rounded-bl-[1px] -bottom-[0.38rem]",
          isRight && "top-1/2 -translate-y-1/2 -left-[0.38rem] rounded-br-[1px]",
          isLeft && "top-1/2 -translate-y-1/2 -right-[0.38rem] rounded-bl-[1px]",
                // Variant ring / shadow
                variant === 'purple'
                  ? 'ring-purple-500/20 shadow-[0_0_8px_rgba(186,84,236,0.45)]'
                  : 'ring-emerald-500/20 shadow-[0_0_8px_rgba(101,254,183,0.45)]'
              )}
              style={{
                filter:
                  variant === 'purple'
                    ? 'drop-shadow(0 0 6px rgba(186,84,236,0.5))'
                    : 'drop-shadow(0 0 6px rgba(101,254,183,0.5))',
              }}
            />

            {/* Canceller – overlays arrow base to hide inner border for vertical arrows only */}
            {(isBottom || isTop) && (
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-[18px] h-[6px] overflow-hidden z-30 pointer-events-none",
                  isBottom ? "-top-[0.38rem]" : "-bottom-[0.38rem]"
                )}
              >
                <div className="relative w-[18px] h-[18px] overflow-hidden">
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-[18px] h-[18px] rotate-45 bg-gray-950"
                    style={{ top: isBottom ? '2px' : '-14px' }}
                  />
                </div>
              </div>
            )}

            {/* Bubble */}
            <div
              className={cn(
                "relative z-20 bg-gray-950/95 backdrop-blur-sm rounded-md py-1 px-3 whitespace-nowrap text-xs tablet:text-sm font-light",
                variant === 'purple'
                  ? 'text-purple-200 ring-purple-500/20 shadow-[0_0_8px_rgba(186,84,236,0.35)]'
                  : 'text-emerald-200 ring-emerald-500/20 shadow-[0_0_8px_rgba(101,254,183,0.45)]'
              )}
            >
              {tooltip}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
