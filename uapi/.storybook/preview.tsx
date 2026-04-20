// Import global styles and Tailwind for all stories
import '../app/globals.css';

// Import all additional app-level styles (animations, components, effects, etc.)
// using Webpack's require.context to include every CSS file in app/styles
// @ts-ignore
declare const require: any;
// @ts-ignore
const reqStyles = require.context('../styles', true, /\.css$/);
// @ts-ignore
reqStyles.keys().forEach(reqStyles);
import type { Preview } from '@storybook/react';

export const parameters: Preview['parameters'] = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'dark', value: '#030816' },
      { name: 'light', value: '#ffffff' },
    ],
  },
  // Remove Storybook's default 1rem padding around the preview iframe
  // so that components can render edge-to-edge when they need the
  // full available width/height.
  layout: 'fullscreen',
};

export const decorators = [
  /*
    Global layout decorator:
    • fullscreen (layout already set)  
    • dark theme    
    • subtle emerald grid pattern behind everything (re-uses .grid-background
      class from conversations fullscreen styles so we inherit Bitcode visual language).  
    • Components centred automatically via flex when they don’t specify their
      own width (makes single-item stories look polished).  
    • Heavy OrbitalBackground removed (still importable per-story if desired)
  */
  (Story) => (
    <div
      className="dark bg-[#030816] text-foreground flex items-center justify-center min-h-screen"
      style={{ position: 'relative', overflow: 'hidden', padding: '3rem' }}
    >
      {/* Brand grid pattern */}
      <div className="grid-background" />

      {/* Story content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '100%' }}>
        <Story />
      </div>
    </div>
  ),
];
