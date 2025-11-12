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
import ClientLayout from './ClientLayout';
import CosmicMeteors from '@/components/base/engi/magicui/meteors';
import Head from 'next/head'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from '@next/third-parties/google'
import dynamic from 'next/dynamic';
import ReadLightpaper from "./fill-gaps";
import AnalyticsEventsClient from '@/components/base/engi/analytics/AnalyticsEventsClient';
import PageAnalyticsClient from '@/components/base/engi/analytics/PageAnalyticsClient';
import Script from 'next/script';
import { FEATURE_FLAGS } from '@/config/features';
import { init as initSentry } from '@engi/sentry';

initSentry({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
  release: process.env.NEXT_PUBLIC_COMMIT_SHA,
  tracesSampleRate: 0.2,
  replaysSessionSampleRate: 0.05,
});
// The ComingSoon splash screen is now rendered on the client by our gate
// component – keep this import only for the gate, not used directly here.
// import ComingSoon from './components/coming-soon';

import MarketingComingSoonGate from './(root)/components/MarketingComingSoonGate';

// Dynamically import Conversations overlay with loading optimization
const Conversation = dynamic(() => import('@/app/conversations/components/ConversationsOverlay'), {
  ssr: false,
  loading: () => null,
  // Add suspense boundary to prevent layout shifts
  suspense: true
});

// Dynamically import sidebar components with lazy loading
const LeftSidebar = dynamic(() => import('@/components/base/engi/layout/sidebars/left-sidebar'), {
  ssr: false,
  loading: () => null
});
const RightSidebar = dynamic(() => import('@/components/base/engi/layout/sidebars/right-sidebar'), {
  ssr: false,
  loading: () => null
});

const Nav = dynamic(() => import('@/components/base/engi/layout/nav'), { ssr: false });
const Footer = dynamic(() => import('@/components/base/engi/layout/footer'), { ssr: false });

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
      <Head>
        {/* Preconnect external resources for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="preconnect" href="https://api.vercel.com" />
      </Head>
      <body
        className={`${inter.className} z-20 overflow-x-hidden`}
      >
        {FEATURE_FLAGS.COMING_SOON ? (
          <MarketingComingSoonGate>
            <>
              {FEATURE_FLAGS.LIGHTPAPER_BANNER && <ReadLightpaper reavealingSoon />}
              <ClientLayout>{children}</ClientLayout>
            </>
          </MarketingComingSoonGate>
        ) : (
          <>
            {FEATURE_FLAGS.LIGHTPAPER_BANNER && <ReadLightpaper reavealingSoon />}
            <ClientLayout>{children}</ClientLayout>
          </>
        )}
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
