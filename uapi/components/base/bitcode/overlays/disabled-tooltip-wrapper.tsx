"use client";

import React, { FC, useCallback, useState } from "react";
import { cn } from '@bitcode/styling';

type TooltipSide = "bottom" | "top" | "right" | "left";
type TooltipAlign = "start" | "center" | "end";

interface ResolvedTooltipPlacement {
  side: TooltipSide;
  align: TooltipAlign;
}

interface DisabledTooltipWrapperProps {
  /** Tooltip text shown while the child element is hovered */
  tooltip: string;
  /** The disabled control (e.g. button) */
  children: React.ReactNode;
  /** Additional classes for the wrapper */
  className?: string;
  /** Optional positioning override – defaults to bottom-center */
  placement?: TooltipSide;

  /** Colour theme.  Defaults to emerald (Bitcode green) but can be switched to
   *  'purple' for marketing / coming-soon variants. */
  variant?: "emerald" | "purple";
}

const tooltipViewportMargin = 16;
const tooltipMaxWidth = 544;
const tooltipMinVerticalRoom = 160;

function resolveTooltipPlacement(trigger: HTMLElement, preferredSide: TooltipSide): ResolvedTooltipPlacement {
  if (typeof window === 'undefined') {
    return { side: preferredSide, align: 'center' };
  }

  const rect = trigger.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const tooltipWidth = Math.min(tooltipMaxWidth, viewportWidth - tooltipViewportMargin * 2);
  const centerX = rect.left + rect.width / 2;
  const spaceAbove = rect.top;
  const spaceBelow = viewportHeight - rect.bottom;
  const spaceLeft = rect.left;
  const spaceRight = viewportWidth - rect.right;

  let side = preferredSide;
  if (preferredSide === 'bottom' && spaceBelow < tooltipMinVerticalRoom && spaceAbove > spaceBelow) {
    side = 'top';
  } else if (preferredSide === 'top' && spaceAbove < tooltipMinVerticalRoom && spaceBelow > spaceAbove) {
    side = 'bottom';
  } else if (preferredSide === 'right' && spaceRight < tooltipWidth && spaceLeft > spaceRight) {
    side = 'left';
  } else if (preferredSide === 'left' && spaceLeft < tooltipWidth && spaceRight > spaceLeft) {
    side = 'right';
  }

  let align: TooltipAlign = 'center';
  if (side === 'top' || side === 'bottom') {
    if (centerX - tooltipWidth / 2 < tooltipViewportMargin) {
      align = 'start';
    } else if (centerX + tooltipWidth / 2 > viewportWidth - tooltipViewportMargin) {
      align = 'end';
    }
  }

  return { side, align };
}

function tooltipPositionClassName({ side, align }: ResolvedTooltipPlacement) {
  if (side === 'right') return 'top-1/2 left-full ml-4 -translate-y-1/2';
  if (side === 'left') return 'top-1/2 right-full mr-4 -translate-y-1/2';

  const sideClassName = side === 'bottom' ? 'top-full mt-4' : 'bottom-full mb-4';
  const alignClassName =
    align === 'start'
      ? 'left-0'
      : align === 'end'
        ? 'right-0'
        : 'left-1/2 -translate-x-1/2';

  return `${sideClassName} ${alignClassName}`;
}

function arrowClassName({ side, align }: ResolvedTooltipPlacement) {
  if (side === 'right') {
    return 'top-1/2 -left-[7px] -translate-y-1/2 border-y-[7px] border-r-[7px] border-y-transparent border-r-[rgba(3,7,18,0.95)]';
  }

  if (side === 'left') {
    return 'top-1/2 -right-[7px] -translate-y-1/2 border-y-[7px] border-l-[7px] border-y-transparent border-l-[rgba(3,7,18,0.95)]';
  }

  const alignClassName =
    align === 'start'
      ? 'left-4'
      : align === 'end'
        ? 'right-4'
        : 'left-1/2 -translate-x-1/2';
  const sideClassName =
    side === 'bottom'
      ? '-top-[7px] border-x-[7px] border-b-[7px] border-x-transparent border-b-[rgba(3,7,18,0.95)]'
      : '-bottom-[7px] border-x-[7px] border-t-[7px] border-x-transparent border-t-[rgba(3,7,18,0.95)]';

  return `${alignClassName} ${sideClassName}`;
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
  const [resolvedPlacement, setResolvedPlacement] = useState<ResolvedTooltipPlacement>({
    side: placement,
    align: 'center',
  });
  const tooltipStyle: React.CSSProperties = {
    width: 'min(34rem, calc(100vw - 2rem))',
  };
  const updatePlacement = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      setResolvedPlacement(resolveTooltipPlacement(event.currentTarget, placement));
    },
    [placement],
  );

  return (
    <div
      className={cn("relative inline-block group/tooltip", className)}
      onFocus={updatePlacement}
      onMouseEnter={updatePlacement}
      onTouchStart={updatePlacement}
    >
      {children}

      {/* Tooltip bubble */}
      <div
        className={cn(
          "pointer-events-none absolute flex flex-col items-center z-50",
          tooltipPositionClassName(resolvedPlacement),
        )}
        style={tooltipStyle}
      >
        {/* Entrance / exit animation */}
        <div
          className="opacity-0 translate-y-1 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 group-hover/tooltip:scale-100 transition-all duration-300 ease-out"
          style={{ transformOrigin: "center" }}
        >
          {/* Bubble with a triangle-only pointer so no inner diamond edge is visible. */}
          <div className="relative">
            <div
              className={cn(
                "absolute z-0 h-0 w-0",
                arrowClassName(resolvedPlacement),
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

            {/* Bubble */}
            <div
              className={cn(
                "relative z-20 w-full rounded-md bg-gray-950/95 px-4 py-3 text-left text-xs font-light leading-5 backdrop-blur-sm tablet:text-sm",
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
