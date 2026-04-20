async function waitForBitcodeApplicationHost() {
  if (typeof document === 'undefined') return false;

  for (let index = 0; index < 12; index += 1) {
    if (document.getElementById('bitcodeApplicationRoot') && document.getElementById('heroEyebrow')) {
      return true;
    }

    await new Promise((resolve) => {
      window.requestAnimationFrame(() => resolve(undefined));
    });
  }

  return false;
}

async function loadBitcodeApplicationShellModule() {
  const hostReady = await waitForBitcodeApplicationHost();
  if (!hostReady) return null;
  return import('../public/app.js');
}

/**
 * @returns {Promise<(() => void) | undefined>}
 */
export async function mountBitcodeApplicationShell() {
  globalThis.__BITCODE_APPLICATION_SHELL_AUTOBOOT__ = false;
  const module = await loadBitcodeApplicationShellModule();
  if (!module) return undefined;
  if (typeof module.mountBitcodeApplicationShell === 'function') {
    return module.mountBitcodeApplicationShell();
  }
  return undefined;
}

export async function readBitcodeApplicationShellSnapshot() {
  const module = await loadBitcodeApplicationShellModule();
  if (!module) return null;
  const snapshotReader = globalThis.__BITCODE_APPLICATION_SHELL_SNAPSHOT__;
  if (typeof snapshotReader === 'function') {
    try {
      return snapshotReader();
    } catch {
      return null;
    }
  }
  return null;
}

export async function readBitcodeApplicationShellControls() {
  const module = await loadBitcodeApplicationShellModule();
  if (!module) return null;
  const controls = globalThis.__BITCODE_APPLICATION_SHELL_CONTROLS__;
  if (controls && typeof controls === 'object') {
    return controls;
  }
  return null;
}
