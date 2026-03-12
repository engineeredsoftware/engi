import type { Metadata } from "next";
import { Suspense } from 'react';
import "./globals.css";
// Global navigation animations
import "@/styles/nav-animations.css";
// Global marketing animations (text gradients, pulses, etc.)
import "@/styles/marketing-animations.css";
// Global styles for the orbital modal and rings
import "@/styles/orbital-rings.css";
import "@/styles/orbital.css";
import "@/styles/orbital-global.css";
import "@/styles/skeleton-shine.css";
import "@/styles/components.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from '@next/third-parties/google'
import AnalyticsEventsClient from '@/components/base/engi/analytics/AnalyticsEventsClient';
import PageAnalyticsClient from '@/components/base/engi/analytics/PageAnalyticsClient';
import { init as initSentry } from '@engi/sentry';

initSentry({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
  release: process.env.NEXT_PUBLIC_COMMIT_SHA,
  tracesSampleRate: 0.2,
  replaysSessionSampleRate: 0.05,
});
// Restrict to normal (non-italic) axis only – halves font file size because
// the italic variable axis is no longer downloaded.  `display:swap` ensures
// text remains visible during fetch.
// Disable Google Font fetching in offline / CI environments.
const inter = { className: '' } as const;

export const metadata: Metadata = {
  title: "engi • eng/acc",
  description: "evolutionary engineering AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="dark relative overflow-x-hidden"
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} z-20 overflow-x-hidden`}
      >
        {children}
        <AnalyticsEventsClient />
        <Suspense fallback={null}>
          <PageAnalyticsClient />
        </Suspense>
        <SpeedInsights />
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-R8VXLSXPW7" />
    </html>
  );
}
