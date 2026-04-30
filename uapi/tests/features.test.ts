function loadFeatureFlags(nodeEnv: string, applicationDebugWidget?: string) {
  const previousNodeEnv = process.env.NODE_ENV;
  const previousDebugWidget = process.env.NEXT_PUBLIC_APPLICATION_DEBUG_WIDGET;

  process.env.NODE_ENV = nodeEnv;
  if (applicationDebugWidget === undefined) {
    delete process.env.NEXT_PUBLIC_APPLICATION_DEBUG_WIDGET;
  } else {
    process.env.NEXT_PUBLIC_APPLICATION_DEBUG_WIDGET = applicationDebugWidget;
  }

  let featureFlags: typeof import('@/config/features').FEATURE_FLAGS | null = null;
  jest.isolateModules(() => {
    featureFlags = require('@/config/features').FEATURE_FLAGS;
  });

  process.env.NODE_ENV = previousNodeEnv;
  if (previousDebugWidget === undefined) {
    delete process.env.NEXT_PUBLIC_APPLICATION_DEBUG_WIDGET;
  } else {
    process.env.NEXT_PUBLIC_APPLICATION_DEBUG_WIDGET = previousDebugWidget;
  }

  return featureFlags;
}

describe('FEATURE_FLAGS', () => {
  it('defaults the application debug widget on locally and off in production', () => {
    expect(loadFeatureFlags('development')?.APPLICATION_DEBUG_WIDGET).toBe(true);
    expect(loadFeatureFlags('production')?.APPLICATION_DEBUG_WIDGET).toBe(false);
  });

  it('lets NEXT_PUBLIC_APPLICATION_DEBUG_WIDGET override the environment default', () => {
    expect(loadFeatureFlags('production', 'true')?.APPLICATION_DEBUG_WIDGET).toBe(true);
    expect(loadFeatureFlags('development', 'false')?.APPLICATION_DEBUG_WIDGET).toBe(false);
  });
});
