'use client';

import React from 'react';

import DemonstrationWitnessHost from './DemonstrationWitnessHost';
import {
  BITCODE_DEMONSTRATION_WITNESS_STYLESHEET_HREF,
  BITCODE_DEMONSTRATION_WITNESS_STYLESHEET_ID,
  useDemonstrationWitnessShellMount,
} from './use-demonstration-witness-shell-mount';

type DemonstrationWitnessMountProps = {
  className?: string;
  stylesheetId?: string;
  stylesheetHref?: string;
};

export default function DemonstrationWitnessMount({
  className,
  stylesheetId = BITCODE_DEMONSTRATION_WITNESS_STYLESHEET_ID,
  stylesheetHref = BITCODE_DEMONSTRATION_WITNESS_STYLESHEET_HREF,
}: DemonstrationWitnessMountProps) {
  useDemonstrationWitnessShellMount({ stylesheetId, stylesheetHref });

  return <DemonstrationWitnessHost className={className} />;
}
