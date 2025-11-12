import React from 'react';

type EngiSoftwareSvgLogoProps = {
  width?: string;
  height?: string;
  /** Extra classes applied to the outer container */
  className?: string;
  /** Extra classes applied to the ".software" text */
  softwareClassName?: string;
  /** Fill color for the base logo */
  fill?: string;

  /**
   * Optional per-instance vertical translation for the “.software” span
   * (e.g. "-1px").  If omitted, the component uses a sensible default.
   */
  softwareOffsetY?: string;

  /**
   * Whether to render the neon-green glow on the first letter.  The glow is
   * implemented by overlaying a second, clipped SVG that is filled with the
   * green colour and blurred via drop-shadows.  In very small renderings – for
   * example inside the footer where the full “engi.software” wordmark is
   * displayed – that clipped overlay looks like a hard-cut green gradient on
   * the left edge of the logo.  Allow turning it off so we can show a clean
   * monochrome logo when desired.
   */
  glow?: boolean;
};

/*
  We want the first letter (the lower-case "e") to retain the neon-green glow
  that existed before we switched the logo to an inline SVG.  To achieve this
  without re-drawing the path we simply render the same SVG twice:

  1. The base layer is the normal white (or provided `fill`) logo.
  2. A second layer is absolutely positioned on top, clipped so that only the
     first ~22 % of the width (i.e. the "e") is visible and a drop-shadow is
     applied to produce the glow.

  This keeps the markup simple, avoids having to split the path, and still
  isolates the glow to the "e" only.
*/

export default function EngiSoftwareSvgLogo({
  width = "115px",
  height = "auto",
  className = "",
  /*
    Tailwind utility classes for the “.software” text.  You can override the
    default vertical offset via the `softwareOffsetY` prop instead of inline
    styles.
  */
  softwareClassName =
  "ml-1 inline-block font-medium text-sm tracking-wide align-baseline bg-gradient-to-r from-[#65FEB7] via-white to-[#65FEB7] text-transparent bg-clip-text",
  fill = "white",
  // Keep the green first letter but *without* the neon drop-shadow.  Overlay
  // therefore remains enabled by default.
  glow = true,
  softwareOffsetY,
}: EngiSoftwareSvgLogoProps) {
  // Percentage of the logo's width that roughly covers the first letter.
  // We keep this as a constant (in %) so the clipping scales with `width`.
  // Covers the width of the first letter ("e") including a tiny bit of margin
  // so the glow soft-edges are not clipped.
  /*
    Clip only the first letter ("e") for the colour overlay. The original
    20 % width worked well at smaller render sizes but left a visible white
    strip on the right edge of the “e” once the word-mark scaled up – most
    noticeably inside the marketing competitors table where the logo is
    rendered at ~92 px.

    Based on the vector path the first glyph occupies ~30 % of the total
    view-box width, so we expand the clipping region accordingly. This fully
    covers the character across all current logo sizes whilst still stopping
    short of the neighbouring “n”.
  */
  const LETTER_CLIP_PERCENT = 30;

  /*
    Horizontal nudge so the green overlay sits exactly on top of the underlying
    letter.  Positive moves it right, negative left.  The value is empirical
    but expressed as a constant in % so it scales with the logo width.
  */
  const LETTER_OFFSET_PERCENT = -1.1;

  /*
    Static vertical tweak for the “.software” text ---------------------------

    Adjust this pixel value up/down until the bodies of both words sit on the
    same visual baseline at your most common render sizes.
  */
  const SOFTWARE_Y_TRANSLATE = softwareOffsetY ?? '-2px';

  const ORIGINAL_VIEWBOX_WIDTH = 404;
  const ORIGINAL_VIEWBOX_HEIGHT = 175;

  const numericWidth = parseFloat(width.toString());

  // Exact rendered height of the SVG for the given width so we can give the
  // overlay wrapper an explicit, identical height.  This avoids subtle 5–6 px
  // mismatches that occur when the base <svg> sizes itself via intrinsic
  // aspect-ratio while the absolutely positioned overlay relies on `height:
  // 100 %` without a resolved containing block height.
  const computedHeight = isNaN(numericWidth)
    ? 'auto'
    : `${(numericWidth * ORIGINAL_VIEWBOX_HEIGHT) / ORIGINAL_VIEWBOX_WIDTH}px`;

  /*
    Glow fade -----------------------------------------------------------------

    A soft fade avoids the visible rectangular clipping of the green overlay.
    We fade over ~12 % of the logo’s rendered width.
  */
  /*
    Fade the overlay before the hard rectangular clip becomes visible.  A
    gentler 7 % looks closer to a natural neon fall-off.
  */
  const GLOW_FADE_PX = isNaN(numericWidth) ? 8 : Math.ceil(numericWidth * 0.07);

  // We inline the SVG path once so it can be re-used by the two <svg> tags
  const LogoPath = (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M372.26 15C367.433 15 363.521 18.9128 363.521 23.7395C363.521 28.5662 367.433 32.479 372.26 32.479C377.087 32.479 381 28.5662 381 23.7395C381 18.9128 377.087 15 372.26 15ZM120.258 101.051C114.79 113.707 102.196 122.563 87.5328 122.563C72.8698 122.563 60.2754 113.707 54.808 101.051H41.9228C47.9426 120.52 66.0858 134.664 87.5328 134.664C108.98 134.664 127.123 120.52 133.143 101.051H120.258ZM54.808 72.8156C60.2754 60.1599 72.8698 51.303 87.5328 51.303C102.196 51.303 114.79 60.1599 120.258 72.8156H120.26C121.819 76.1769 122.597 80.5352 122.597 80.5352H109.532H83.3859H31.412L22 92.3182H134.968C134.968 92.3182 135.265 89.8431 135.265 86.261C135.265 84.0149 134.968 79.1289 133.148 72.8156H133.143C127.123 53.3465 108.98 39.2021 87.5328 39.2021C66.0858 39.2021 47.9426 53.3465 41.9228 72.8156H54.808ZM227.72 118.53V84.9164C227.72 66.3522 212.67 51.303 194.105 51.303C175.541 51.303 160.491 66.3522 160.491 84.9164V118.53V122.563V134.664H148.39V84.9164C148.39 59.6691 168.857 39.2021 194.105 39.2021C219.353 39.2021 239.821 59.6691 239.821 84.9164V134.664H227.72V122.563V118.53ZM300.998 122.563C320.677 122.563 336.63 106.611 336.63 86.9332C336.63 67.2555 320.677 51.303 300.998 51.303C281.319 51.303 265.367 67.2555 265.367 86.9332C265.367 106.611 281.319 122.563 300.998 122.563ZM336.63 118.694C327.888 128.494 315.164 134.664 300.998 134.664C274.636 134.664 253.266 113.294 253.266 86.9332C253.266 60.5721 274.636 39.2021 300.998 39.2021C315.164 39.2021 327.888 45.3728 336.63 55.1727V43.2354H348.731V127.269C348.731 153.63 327.361 175 300.999 175C279.552 175 261.409 160.856 255.389 141.387H268.274C273.741 154.042 286.336 162.899 300.999 162.899C320.677 162.899 336.63 146.947 336.63 127.269V118.694ZM366.21 43.2354H378.311V134.664H366.21V43.2354Z"
      fill={fill}
    />
  );

  return (
    <div className={`relative flex items-baseline ${className}`}>
      {/* Base logo (white) */}
      {/*
        The original SVG viewBox included ~15 px of empty space below the actual
        glyphs (0–190 px).  Because flexbox baseline alignment uses the bottom
        box edge for replaced elements like <svg>, that extra space pushed the
        word-mark up and created the visual gap the design review called out.

        Cropping the viewBox to the exact path bounds (0–175 px) removes the
        stray whitespace so the baseline sits flush with the bottom of the
        letters.  This change keeps the logo proportions intact (the width
        remains 404 px) while fixing the vertical mis-alignment between
        “engi” and “.software”.
      */}
      <svg
        width={width}
        height={computedHeight}
        viewBox="0 0 404 175"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {LogoPath}
      </svg>

      {/* Optional glow overlay – can be disabled via the `glow` prop */}
      {glow && (
        <div
          className="absolute top-0 left-0 pointer-events-none z-20"
          style={{
            overflow: 'visible',
            width: `calc(${LETTER_CLIP_PERCENT}% + ${GLOW_FADE_PX}px)`,
            height: computedHeight,
            //transform: `translateX(${LETTER_OFFSET_PERCENT}%)`,
            WebkitMaskImage: `linear-gradient(90deg,#000 calc(100% - ${GLOW_FADE_PX}px),transparent)` as any,
            maskImage: `linear-gradient(90deg,#000 calc(100% - ${GLOW_FADE_PX}px),transparent)`,
          }}
        >
          <svg
            width={width}
            height={computedHeight}
            viewBox="0 0 404 175"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'none' }}
          >
            {/* The overlay is filled with the neon colour itself so the drop-shadow stands out */}
            {React.cloneElement(LogoPath, { fill: '#65FEB7' })}
          </svg>
        </div>
      )}

      {/* .software text */}
      <span
        className={softwareClassName}
        style={{ transform: `translateY(${SOFTWARE_Y_TRANSLATE})` }}
      >
        .software
      </span>
    </div>
  );
}
