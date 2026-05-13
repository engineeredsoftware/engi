type ProfileRecord = Record<string, any> | null | undefined;

function normalizeWalletBindingStatus(value: unknown) {
  if (value === 'verified' || value === 'pending' || value === 'manual') {
    return value;
  }
  if (value === 'bound') {
    return 'manual';
  }
  return null;
}

function readString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

export function readBitcodeWalletBindingFromProfile(profile: ProfileRecord) {
  if (!profile) return null;

  const nestedWalletBinding = profile.settings?.bitcodeProfile?.walletBinding;
  if (nestedWalletBinding && typeof nestedWalletBinding === 'object') {
    return readBitcodeWalletBindingFromProfile({
      wallet_binding: nestedWalletBinding,
      wallet_provider: nestedWalletBinding.provider,
      wallet_binding_status: nestedWalletBinding.status,
      wallet_bound_at: nestedWalletBinding.boundAt,
    });
  }

  const walletBinding = profile.wallet_binding;
  if (walletBinding && typeof walletBinding === 'object') {
    const address = readString(walletBinding.address);
    if (address) {
      return {
        ...walletBinding,
        address,
        provider: readString(walletBinding.provider) ?? readString(profile.wallet_provider),
        status:
          normalizeWalletBindingStatus(walletBinding.status) ??
          normalizeWalletBindingStatus(profile.wallet_binding_status) ??
          'pending',
        boundAt: readString(walletBinding.boundAt) ?? readString(profile.wallet_bound_at),
      };
    }
  }

  const address = readString(profile.wallet_address);
  if (!address) return null;

  return {
    address,
    provider: readString(profile.wallet_provider),
    status: normalizeWalletBindingStatus(profile.wallet_binding_status) ?? 'manual',
    boundAt: readString(profile.wallet_bound_at),
    network: readString(profile.wallet_network),
    proofKind: readString(profile.wallet_proof_kind),
    paymentAddress: readString(profile.wallet_payment_address),
    authAddress: readString(profile.wallet_auth_address),
    addressType: readString(profile.wallet_address_type),
  };
}

export function readBitcodeWalletCapabilityFromProfile(profile: ProfileRecord) {
  const binding = readBitcodeWalletBindingFromProfile(profile);
  return {
    binding,
    hasIdentity: Boolean(binding?.address),
    hasWalletBinding: Boolean(binding?.address),
    isProviderManaged: binding?.status === 'pending' || binding?.status === 'verified',
    walletAddress: binding?.address ?? null,
    walletProvider: binding?.provider ?? null,
    walletBindingStatus: binding?.status ?? null,
  };
}

export function hydrateBitcodeProfile(profile: ProfileRecord) {
  return profile ? { ...profile } : null;
}

export function mergeBitcodeProfileSettings(profile: ProfileRecord, patch: Record<string, any>) {
  return {
    ...(profile || {}),
    ...patch,
  };
}
