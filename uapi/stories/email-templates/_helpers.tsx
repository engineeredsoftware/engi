import * as React from 'react';

/**
 * Utility to create a Storybook render function that renders the React email
 * component directly. BaseLayout automatically switches to a safe DOM markup
 * when running in the browser, so we no longer read the iframe hack.
 */
export function createEmailStory<P>(Component: React.ComponentType<P>) {
  return (args: P) => <Component {...(args as P)} />;
}

