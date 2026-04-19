import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import AuxillariesRouteClient from '@/app/auxillaries/AuxillariesRouteClient';
import {
  buildAuxillariesRoutePath,
  getAuxillaryDescriptor,
  normalizeAuxillaryPane,
} from '@/app/auxillaries/components/auxillary-pane-meta';

type AuxillariesPanePageProps = {
  params: {
    pane: string;
  };
};

function resolveAuxillaryPane(pane: string) {
  const step = normalizeAuxillaryPane(pane);
  if (!step) return null;

  return {
    step,
    descriptor: getAuxillaryDescriptor(step),
  };
}

export function generateMetadata({ params }: AuxillariesPanePageProps): Metadata {
  const resolved = resolveAuxillaryPane(params.pane);
  if (!resolved) {
    return {
      title: 'Bitcode Auxillaries',
      description: 'Contained Bitcode auxillary routes for identity, interfaces, connects, and $BTD.',
    };
  }

  return {
    title: `Bitcode • ${resolved.descriptor.routeTitle}`,
    description: resolved.descriptor.routeDescription,
    alternates: {
      canonical: buildAuxillariesRoutePath(resolved.step),
    },
  };
}

export default function AuxillariesPanePage({ params }: AuxillariesPanePageProps) {
  const resolved = resolveAuxillaryPane(params.pane);
  if (!resolved) {
    notFound();
  }

  if (params.pane.toLowerCase() !== resolved.descriptor.routeSegment) {
    redirect(buildAuxillariesRoutePath(resolved.step));
  }

  return <AuxillariesRouteClient step={resolved.step} />;
}
