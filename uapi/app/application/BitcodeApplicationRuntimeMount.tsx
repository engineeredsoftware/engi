'use client';

import React from 'react';

import BitcodeApplicationRuntimeHost from './BitcodeApplicationRuntimeHost';
import {
  BITCODE_APPLICATION_STYLESHEET_HREF,
  BITCODE_APPLICATION_STYLESHEET_ID,
  useBitcodeApplicationShellMount,
} from './use-bitcode-application-shell-mount';

type BitcodeApplicationRuntimeMountProps = {
  className?: string;
  stylesheetId?: string;
  stylesheetHref?: string;
};

export default function BitcodeApplicationRuntimeMount({
  className,
  stylesheetId = BITCODE_APPLICATION_STYLESHEET_ID,
  stylesheetHref = BITCODE_APPLICATION_STYLESHEET_HREF,
}: BitcodeApplicationRuntimeMountProps) {
  useBitcodeApplicationShellMount({ stylesheetId, stylesheetHref });

  return <BitcodeApplicationRuntimeHost className={className} />;
}
