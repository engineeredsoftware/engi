import { isPlausibleBitcoinAddress } from '@/lib/bitcode-wallet-local';
import { bitcodeQaTelemetry, compactBitcodeAddress } from './bitcode-qa-telemetry';

type UnknownRecord = Record<string, unknown>;

export type BitcoinWalletProviderId = 'xverse' | 'unisat' | 'leather' | 'okx-bitcoin';

export interface BitcoinWalletProviderSummary {
  id: BitcoinWalletProviderId;
  label: string;
}

type BitcoinWalletProvider =
  | {
      id: 'xverse';
      label: 'Xverse';
      providerId: string | null;
      request?: (method: string, params?: UnknownRecord | null) => Promise<unknown>;
    }
  | {
      id: 'unisat';
      label: 'UniSat';
      requestAccounts: () => Promise<unknown>;
      getNetwork?: () => Promise<unknown>;
      getChain?: () => Promise<unknown>;
      signMessage?: (message: string, type?: 'ecdsa' | 'bip322-simple') => Promise<unknown>;
    }
  | {
      id: 'leather';
      label: 'Leather';
      request: (method: string, params?: UnknownRecord) => Promise<unknown>;
    }
  | {
      id: 'okx-bitcoin';
      label: 'OKX Bitcoin';
      requestAccounts?: () => Promise<unknown>;
      connect?: () => Promise<unknown>;
      getAccounts?: () => Promise<unknown>;
      getNetwork?: () => Promise<unknown>;
      signMessage?: (message: string, type?: string) => Promise<unknown>;
    };

export interface BitcoinWalletConnection {
  address: string;
  provider: string;
  providerLabel: string;
  network: string | null;
  paymentAddress?: string | null;
  authAddress?: string | null;
  addressType?: string | null;
  message: string;
  signature: string | null;
  connectedAt: string;
  proofKind: 'bitcoin_message_signature' | 'provider_session';
}

function asRecord(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as UnknownRecord;
}

function readString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function readErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.trim()) return error.message.trim();
  const record = asRecord(error);
  return (
    readString(record?.message) ??
    readString(record?.error) ??
    readString(asRecord(record?.error)?.message) ??
    'Bitcoin wallet request failed.'
  );
}

function bindFunction<T extends (...args: any[]) => any>(owner: UnknownRecord, value: unknown): T | undefined {
  return typeof value === 'function' ? (value.bind(owner) as T) : undefined;
}

function readFirstAddress(value: unknown): string | null {
  if (isPlausibleBitcoinAddress(value)) return value;
  if (Array.isArray(value)) {
    const direct = value.find((entry) => isPlausibleBitcoinAddress(entry));
    if (typeof direct === 'string') return direct;

    for (const entry of value) {
      const record = asRecord(entry);
      const candidate = readString(record?.address) ?? readString(record?.paymentAddress);
      if (isPlausibleBitcoinAddress(candidate)) return candidate;
    }
  }

  const record = asRecord(value);
  const result = record ? asRecord(record.result) : null;
  const address =
    readString(record?.address) ??
    readString(record?.paymentAddress) ??
    readString(result?.address) ??
    readString(result?.paymentAddress);
  return isPlausibleBitcoinAddress(address) ? address : null;
}

function readSignature(value: unknown): string | null {
  const direct = readString(value);
  if (direct) return direct;
  const record = asRecord(value);
  const result = record ? asRecord(record.result) : null;
  return readString(record?.signature) ?? readString(result?.signature);
}

function readNetwork(value: unknown): string | null {
  const direct = readString(value);
  if (direct) return direct;
  const record = asRecord(value);
  const bitcoin = asRecord(record?.bitcoin);
  return (
    readString(record?.network) ??
    readString(record?.name) ??
    readString(record?.enum) ??
    readString(bitcoin?.name)
  );
}

function readConfiguredBitcoinNetwork() {
  return (
    process.env.NEXT_PUBLIC_BITCODE_BITCOIN_NETWORK ??
    process.env.NEXT_PUBLIC_BITCOIN_NETWORK ??
    process.env.NEXT_PUBLIC_BTC_NETWORK ??
    'testnet4'
  ).toLowerCase();
}

function readSatsConnectNetwork() {
  const network = readConfiguredBitcoinNetwork();
  if (network === 'mainnet') return 'Mainnet';
  if (network === 'signet') return 'Signet';
  if (network === 'regtest') return 'Regtest';
  if (network === 'testnet4' || network === 'testnet-4') return 'Testnet4';
  return 'Testnet';
}

function readLeatherNetwork() {
  const network = readConfiguredBitcoinNetwork();
  if (network === 'mainnet') return 'mainnet';
  if (network === 'signet') return 'signet';
  return 'testnet';
}

function readWindowRecord() {
  if (typeof window === 'undefined') return null;
  return window as typeof window & UnknownRecord;
}

function detectDirectBitcoinWalletProviders(): BitcoinWalletProvider[] {
  const windowRecord = readWindowRecord();
  if (!windowRecord) return [];
  const providers: BitcoinWalletProvider[] = [];

  const unisat = asRecord(windowRecord.unisat);
  if (typeof unisat?.requestAccounts === 'function') {
    providers.push({
      id: 'unisat',
      label: 'UniSat',
      requestAccounts: unisat.requestAccounts.bind(unisat) as Extract<BitcoinWalletProvider, { id: 'unisat' }>['requestAccounts'],
      getNetwork: bindFunction(unisat, unisat.getNetwork),
      getChain: bindFunction(unisat, unisat.getChain),
      signMessage: bindFunction(unisat, unisat.signMessage),
    });
  }

  const leather = asRecord(windowRecord.LeatherProvider);
  if (typeof leather?.request === 'function') {
    providers.push({
      id: 'leather',
      label: 'Leather',
      request: leather.request.bind(leather) as Extract<BitcoinWalletProvider, { id: 'leather' }>['request'],
    });
  }

  const okx = asRecord(asRecord(windowRecord.okxwallet)?.bitcoin);
  if (okx && (typeof okx.requestAccounts === 'function' || typeof okx.connect === 'function')) {
    providers.push({
      id: 'okx-bitcoin',
      label: 'OKX Bitcoin',
      requestAccounts: bindFunction(okx, okx.requestAccounts),
      connect: bindFunction(okx, okx.connect),
      getAccounts: bindFunction(okx, okx.getAccounts),
      getNetwork: bindFunction(okx, okx.getNetwork),
      signMessage: bindFunction(okx, okx.signMessage),
    });
  }

  return providers;
}

export function detectBitcoinWalletProvider(): BitcoinWalletProvider | null {
  return detectDirectBitcoinWalletProviders()[0] ?? null;
}

async function detectXverseProvider(): Promise<Extract<BitcoinWalletProvider, { id: 'xverse' }> | null> {
  try {
    const satsConnect = await import('sats-connect');
    const providers =
      typeof satsConnect.getProviders === 'function'
        ? satsConnect.getProviders()
        : [];
    const provider = Array.isArray(providers)
      ? providers.find((candidate: unknown) => {
          const record = asRecord(candidate);
          const id = readString(record?.id) ?? '';
          const name = readString(record?.name) ?? '';
          return /xverse/i.test(id) || /xverse/i.test(name) || id === 'BitcoinProvider';
        })
      : null;
    const providerRecord = asRecord(provider);
    const providerId = readString(providerRecord?.id);

    if (providerId) {
      return {
        id: 'xverse',
        label: 'Xverse',
        providerId,
      };
    }
  } catch {
    // Sats Connect is client-only; fall through to direct provider checks.
  }

  const windowRecord = readWindowRecord();
  const xverseProvider = asRecord(asRecord(windowRecord?.XverseProviders)?.BitcoinProvider);
  if (xverseProvider) {
    return {
      id: 'xverse',
      label: 'Xverse',
      providerId: 'XverseProviders.BitcoinProvider',
      request: bindFunction(xverseProvider, xverseProvider.request),
    };
  }
  const bitcoinProvider = asRecord(windowRecord?.BitcoinProvider);
  if (bitcoinProvider) {
    return {
      id: 'xverse',
      label: 'Xverse',
      providerId: 'BitcoinProvider',
      request: bindFunction(bitcoinProvider, bitcoinProvider.request),
    };
  }

  return null;
}

async function detectAvailableBitcoinWalletProviders(): Promise<BitcoinWalletProvider[]> {
  const providers: BitcoinWalletProvider[] = [];
  const xverseProvider = await detectXverseProvider();
  if (xverseProvider) providers.push(xverseProvider);
  providers.push(...detectDirectBitcoinWalletProviders());

  const seen = new Set<BitcoinWalletProviderId>();
  const dedupedProviders = providers.filter((provider) => {
    if (seen.has(provider.id)) return false;
    seen.add(provider.id);
    return true;
  });
  bitcodeQaTelemetry('info', 'wallet-client', 'providers-detected', dedupedProviders.map((provider) => ({
    id: provider.id,
    label: provider.label,
  })));
  return dedupedProviders;
}

export async function inspectBitcoinWalletProviders(): Promise<BitcoinWalletProviderSummary[]> {
  const providers = await detectAvailableBitcoinWalletProviders();
  return providers.map((provider) => ({ id: provider.id, label: provider.label }));
}

export function buildBitcoinWalletAuthenticationMessage(input: {
  address: string;
  network: string | null;
  issuedAt: string;
  nonce: string;
}) {
  return [
    'Bitcode Bitcoin wallet authentication',
    `Address: ${input.address}`,
    `Network: ${input.network ?? 'unknown'}`,
    `Origin: ${window.location.origin}`,
    `Issued: ${input.issuedAt}`,
    `Nonce: ${input.nonce}`,
    'Purpose: Authenticate Bitcode commercial profile, BTC fee readiness, and BTD source-share access.',
  ].join('\n');
}

async function withWalletRequestTimeout<T>(
  promise: Promise<T>,
  label: string,
  timeoutMs = 45_000,
): Promise<T> {
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_resolve, reject) => {
    timeoutHandle = setTimeout(() => {
      reject(
        new Error(
          `${label} did not return a wallet approval. Open the extension, confirm it is unlocked on Testnet4, or choose another installed Bitcoin wallet.`,
        ),
      );
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timeoutHandle) clearTimeout(timeoutHandle);
  }
}

async function connectUniSat(provider: Extract<BitcoinWalletProvider, { id: 'unisat' }>) {
  bitcodeQaTelemetry('info', 'wallet-client', 'connect-start', { provider: provider.id });
  const accounts = await withWalletRequestTimeout(provider.requestAccounts(), provider.label);
  const address = readFirstAddress(accounts);
  if (!address) throw new Error('Bitcoin wallet did not return a Bitcoin address.');

  const network =
    (provider.getChain ? readNetwork(await provider.getChain().catch(() => null)) : null) ??
    (provider.getNetwork ? readNetwork(await provider.getNetwork().catch(() => null)) : null);
  const issuedAt = new Date().toISOString();
  const nonce = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const message = buildBitcoinWalletAuthenticationMessage({ address, network, issuedAt, nonce });
  const signature = provider.signMessage
    ? readSignature(await provider.signMessage(message, 'bip322-simple').catch(() => provider.signMessage?.(message)))
    : null;

  const connection = {
    address,
    provider: provider.id,
    providerLabel: provider.label,
    network,
    paymentAddress: address,
    authAddress: address,
    addressType: null,
    message,
    signature,
    connectedAt: issuedAt,
    proofKind: signature ? 'bitcoin_message_signature' : 'provider_session',
  } satisfies BitcoinWalletConnection;
  bitcodeQaTelemetry('info', 'wallet-client', 'connect-success', {
    provider: connection.provider,
    network: connection.network,
    proofKind: connection.proofKind,
    address: compactBitcodeAddress(connection.address),
  });
  return connection;
}

async function connectLeather(provider: Extract<BitcoinWalletProvider, { id: 'leather' }>) {
  bitcodeQaTelemetry('info', 'wallet-client', 'connect-start', { provider: provider.id });
  const accounts = await withWalletRequestTimeout(provider.request('getAddresses').catch(() => null), provider.label);
  const result = asRecord(asRecord(accounts)?.result);
  const addresses = Array.isArray(result?.addresses) ? result.addresses : [];
  const p2tr = addresses.find((entry) => {
    const record = asRecord(entry);
    return record?.symbol === 'BTC' && record?.type === 'p2tr' && isPlausibleBitcoinAddress(record?.address);
  });
  const p2wpkh = addresses.find((entry) => {
    const record = asRecord(entry);
    return record?.symbol === 'BTC' && record?.type === 'p2wpkh' && isPlausibleBitcoinAddress(record?.address);
  });
  const authRecord = asRecord(p2tr ?? p2wpkh);
  const paymentRecord = asRecord(p2wpkh ?? p2tr);
  const address = readString(authRecord?.address);
  if (!isPlausibleBitcoinAddress(address)) throw new Error('Leather did not return a Bitcoin address.');

  const issuedAt = new Date().toISOString();
  const nonce = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const network = readLeatherNetwork();
  const message = buildBitcoinWalletAuthenticationMessage({ address, network, issuedAt, nonce });
  const derivationPath = readString(authRecord?.derivationPath);
  const accountSegment = derivationPath?.split('/')[3]?.replaceAll("'", '');
  const account =
    typeof accountSegment === 'string' && Number.isFinite(Number.parseInt(accountSegment, 10))
      ? Number.parseInt(accountSegment, 10)
      : undefined;
  const response = await withWalletRequestTimeout(
    provider.request('signMessage', {
      message,
      paymentType: readString(authRecord?.type) === 'p2tr' ? 'p2tr' : 'p2wpkh',
      network,
      ...(account === undefined ? {} : { account }),
    }),
    provider.label,
  );
  const record = asRecord(response);
  const signResult = record ? asRecord(record.result) : null;
  const signature = readString(signResult?.signature) ?? readString(record?.signature);

  const connection = {
    address,
    provider: provider.id,
    providerLabel: provider.label,
    network,
    paymentAddress: readString(paymentRecord?.address),
    authAddress: address,
    addressType: readString(authRecord?.type),
    message,
    signature,
    connectedAt: issuedAt,
    proofKind: signature ? 'bitcoin_message_signature' : 'provider_session',
  } satisfies BitcoinWalletConnection;
  bitcodeQaTelemetry('info', 'wallet-client', 'connect-success', {
    provider: connection.provider,
    network: connection.network,
    proofKind: connection.proofKind,
    address: compactBitcodeAddress(connection.address),
    paymentAddress: compactBitcodeAddress(connection.paymentAddress),
    authAddress: compactBitcodeAddress(connection.authAddress),
    addressType: connection.addressType,
  });
  return connection;
}

async function connectXverse(provider: Extract<BitcoinWalletProvider, { id: 'xverse' }>) {
  bitcodeQaTelemetry('info', 'wallet-client', 'connect-start', {
    provider: provider.id,
    providerId: provider.providerId,
  });
  const satsConnect = await import('sats-connect');
  const satsConnectRecord = satsConnect as UnknownRecord;
  if (typeof provider.request !== 'function' && typeof satsConnectRecord.request !== 'function') {
    throw new Error('Sats Connect request API is unavailable.');
  }

  const requestedNetwork = readSatsConnectNetwork();
  const providerObject =
    typeof satsConnectRecord.getProviderById === 'function' && provider.providerId
      ? asRecord((satsConnectRecord.getProviderById as (providerId: string) => unknown)(provider.providerId))
      : null;
  const providerRequest = bindFunction<
    (method: string, params?: Record<string, unknown> | null) => Promise<unknown>
  >(providerObject ?? {}, providerObject?.request);
  const moduleRequest = satsConnectRecord.request as
    | ((
        method: string,
        params: Record<string, unknown> | null,
        providerId?: string,
      ) => Promise<unknown>)
    | undefined;
  const request = async (method: string, params: Record<string, unknown> | null) => {
    const response =
      provider.request
        ? await provider.request(method, params)
        : providerRequest
          ? await providerRequest(method, params)
          : await moduleRequest?.(method, params, provider.providerId ?? undefined);
    const record = asRecord(response);
    if (record?.status === 'error') {
      return {
        status: 'error' as const,
        error: asRecord(record.error),
      };
    }
    if (record?.status === 'success') {
      return {
        status: 'success' as const,
        result: record.result,
      };
    }
    if (record && 'result' in record) {
      return {
        status: 'success' as const,
        result: record.result,
      };
    }
    return {
      status: 'success' as const,
      result: response,
    };
  };

  const response = await withWalletRequestTimeout(request(
    'wallet_connect',
    {
      addresses: ['payment', 'ordinals'],
      message: 'Connect Bitcode Bitcoin identity',
      network: requestedNetwork,
    },
  ), provider.label);

  if (response.status !== 'success') {
    throw new Error(readString(response.error?.message) || 'Xverse wallet connection was rejected or failed.');
  }

  const result = asRecord(response.result);
  const addresses = Array.isArray(result?.addresses) ? result.addresses : [];
  const paymentRecord = asRecord(
    addresses.find((entry) => asRecord(entry)?.purpose === 'payment') ?? null,
  );
  const ordinalsRecord = asRecord(
    addresses.find((entry) => asRecord(entry)?.purpose === 'ordinals') ?? null,
  );
  const authRecord = ordinalsRecord ?? paymentRecord ?? asRecord(addresses[0]);
  const address = readString(authRecord?.address);
  if (!isPlausibleBitcoinAddress(address)) {
    throw new Error('Xverse did not return a Bitcoin auth address.');
  }

  const network = readNetwork(result?.network) ?? requestedNetwork;
  const issuedAt = new Date().toISOString();
  const nonce = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const message = buildBitcoinWalletAuthenticationMessage({ address, network, issuedAt, nonce });
  const signatureResponse = await withWalletRequestTimeout(request(
    'signMessage',
    {
      address,
      message,
      protocol: 'BIP322',
    },
  ), provider.label);
  const signature =
    signatureResponse.status === 'success'
      ? readSignature(signatureResponse.result)
      : null;

  if (signatureResponse.status === 'error') {
    throw new Error(readString(signatureResponse.error?.message) || 'Xverse message signing was rejected or failed.');
  }

  const connection = {
    address,
    provider: provider.id,
    providerLabel: provider.label,
    network,
    paymentAddress: readString(paymentRecord?.address),
    authAddress: address,
    addressType: readString(authRecord?.addressType),
    message,
    signature,
    connectedAt: issuedAt,
    proofKind: signature ? 'bitcoin_message_signature' : 'provider_session',
  } satisfies BitcoinWalletConnection;
  bitcodeQaTelemetry('info', 'wallet-client', 'connect-success', {
    provider: connection.provider,
    network: connection.network,
    proofKind: connection.proofKind,
    address: compactBitcodeAddress(connection.address),
    paymentAddress: compactBitcodeAddress(connection.paymentAddress),
    authAddress: compactBitcodeAddress(connection.authAddress),
    addressType: connection.addressType,
  });
  return connection;
}

async function connectOkx(provider: Extract<BitcoinWalletProvider, { id: 'okx-bitcoin' }>) {
  bitcodeQaTelemetry('info', 'wallet-client', 'connect-start', { provider: provider.id });
  const accountResponse = provider.requestAccounts
    ? await withWalletRequestTimeout(provider.requestAccounts(), provider.label)
    : provider.connect
      ? await withWalletRequestTimeout(provider.connect(), provider.label)
      : provider.getAccounts
        ? await withWalletRequestTimeout(provider.getAccounts(), provider.label)
        : null;
  const address = readFirstAddress(accountResponse);
  if (!address) throw new Error('Bitcoin wallet did not return a Bitcoin address.');

  const network = provider.getNetwork ? readNetwork(await provider.getNetwork().catch(() => null)) : null;
  const issuedAt = new Date().toISOString();
  const nonce = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const message = buildBitcoinWalletAuthenticationMessage({ address, network, issuedAt, nonce });
  const signature = provider.signMessage
    ? readSignature(await withWalletRequestTimeout(provider.signMessage(message, 'bip322-simple'), provider.label))
    : null;

  const connection = {
    address,
    provider: provider.id,
    providerLabel: provider.label,
    network,
    paymentAddress: address,
    authAddress: address,
    addressType: null,
    message,
    signature,
    connectedAt: issuedAt,
    proofKind: signature ? 'bitcoin_message_signature' : 'provider_session',
  } satisfies BitcoinWalletConnection;
  bitcodeQaTelemetry('info', 'wallet-client', 'connect-success', {
    provider: connection.provider,
    network: connection.network,
    proofKind: connection.proofKind,
    address: compactBitcodeAddress(connection.address),
  });
  return connection;
}

export async function connectBitcoinWallet(preferredProviderId?: BitcoinWalletProviderId) {
  const providers = await detectAvailableBitcoinWalletProviders();
  const connectableProviders = preferredProviderId
    ? providers.filter((provider) => provider.id === preferredProviderId)
    : providers;
  if (connectableProviders.length === 0) {
    throw new Error(
      preferredProviderId
        ? `${preferredProviderId} was not detected in this browser profile. Confirm the extension is enabled, unlocked, and allowed on this site.`
        : 'No browser Bitcoin dapp wallet provider was found. Install or enable Xverse, Leather, UniSat, or OKX Bitcoin. MetaMask’s injected Ethereum provider is not used for Bitcode Bitcoin authentication.',
    );
  }

  const failures: string[] = [];
  for (const provider of connectableProviders) {
    try {
      if (provider.id === 'xverse') return await connectXverse(provider);
      if (provider.id === 'unisat') return await connectUniSat(provider);
      if (provider.id === 'leather') return await connectLeather(provider);
      return await connectOkx(provider);
    } catch (error) {
      bitcodeQaTelemetry('warn', 'wallet-client', 'connect-provider-failure', {
        provider: provider.id,
        message: readErrorMessage(error),
      });
      failures.push(`${provider.label}: ${readErrorMessage(error)}`);
      if (preferredProviderId) break;
    }
  }

  throw new Error(
    failures.length
      ? `Bitcoin wallet connection failed. ${failures.join(' ')}`
      : 'Bitcoin wallet connection failed before a provider could be selected.',
  );
}
