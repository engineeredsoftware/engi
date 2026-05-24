import {
  SECRET_ROTATION_FAMILY_IDS,
  SECRET_ROTATION_REQUIRED_FAMILY_FIELDS,
  buildSecretRotationFamily,
  buildSecretRotationFamilyRows,
  buildSecretRotationPlan,
} from '../src/secret-rotation-plan';

describe('secret rotation plan', () => {
  it('catalogs required OpenAI, Supabase, Vercel, GitHub, wallet, object storage, webhook, MCP, and ChatGPT App families', () => {
    const plan = buildSecretRotationPlan();

    expect(plan.kind).toBe('bitcode.secret_rotation_plan');
    expect(plan.schemaId).toBe('bitcode.secretRotationPlan.v1');
    expect(plan.familyCount).toBe(9);
    expect(plan.missingFamilyIds).toEqual([]);
    expect(plan.requiredFamilyIds).toEqual([...SECRET_ROTATION_FAMILY_IDS].sort());
    expect(plan.observedFamilyIds).toEqual([...SECRET_ROTATION_FAMILY_IDS]);
    expect(plan.planRoot).toMatch(/^secret-rotation-plan:[a-f0-9]{24}$/);
    expect(plan.sourceSafety.sourceSafe).toBe(true);
    expect(plan.sourceSafety.containsSecret).toBe(false);
    expect(plan.sourceSafety.protectedSourceVisible).toBe(false);
  });

  it('requires owner, host, lane, rotation, verification, masking, leak response, blast-radius, runtime, audit, and proof fields', () => {
    const plan = buildSecretRotationPlan();

    for (const family of plan.families) {
      for (const field of SECRET_ROTATION_REQUIRED_FAMILY_FIELDS) {
        expect(family[field]).toBeTruthy();
      }
      expect(family.requiredHostIds.length).toBeGreaterThan(0);
      expect(family.supportedLaneIds.length).toBeGreaterThan(0);
      expect(family.supportedLaneIds).not.toContain('value-bearing-mainnet');
      expect(family.ciMaskingPosture.toLowerCase()).toContain('mask');
      expect(family.auditEventName).toMatch(/^secret_rotation\./);
      expect(family.proofRootBasis.length).toBeGreaterThan(0);
      expect(family.familyRoot).toMatch(/^secret-rotation-family:[a-f0-9]{24}$/);
      expect(family.sourceSafety.containsSecret).toBe(false);
    }
  });

  it('proves all operational closure booleans without admitting value-bearing mainnet', () => {
    const plan = buildSecretRotationPlan();

    expect(plan.rotationCommandsCovered).toBe(true);
    expect(plan.ciMaskingCovered).toBe(true);
    expect(plan.leakResponseCovered).toBe(true);
    expect(plan.blastRadiusCovered).toBe(true);
    expect(plan.runtimeAvailabilityCovered).toBe(true);
    expect(plan.auditEventsCovered).toBe(true);
    expect(plan.noSerializedSecretValues).toBe(true);
    expect(plan.valueBearingMainnetBlocked).toBe(true);
  });

  it('fails closed when a required secret family is missing', () => {
    const families = buildSecretRotationFamilyRows().filter(
      (family) => family.familyId !== 'model_provider_openai',
    );

    expect(() => buildSecretRotationPlan({ families })).toThrow(
      /missing family ids: model_provider_openai/,
    );
  });

  it('fails closed on duplicate secret family ids', () => {
    const families = buildSecretRotationFamilyRows();

    expect(() => buildSecretRotationPlan({ families: [...families, families[0]] })).toThrow(
      /duplicate family ids: model_provider_openai/,
    );
  });

  it('fails closed when a family admits value-bearing mainnet before future canon', () => {
    const [family] = buildSecretRotationFamilyRows();

    expect(() =>
      buildSecretRotationFamily({
        ...family,
        supportedLaneIds: [...family.supportedLaneIds, 'value-bearing-mainnet'],
      }),
    ).toThrow(/must not admit value-bearing-mainnet/);
  });

  it('fails closed when CI masking posture is missing', () => {
    const families = buildSecretRotationFamilyRows().map((family) =>
      family.familyId === 'webhook_signing'
        ? {
            ...family,
            ciMaskingPosture: 'plain logging is allowed',
          }
        : family,
    );

    expect(() => buildSecretRotationPlan({ families })).toThrow(
      /must cover rotation commands, CI masking, leak response/,
    );
  });

  it('fails closed on serialized secret-shaped values', () => {
    const [family] = buildSecretRotationFamilyRows();
    const secretShapedText = `${['sk', 'proj'].join('-')}-${'abcdefghijklmnop1234567890'}`;

    expect(() =>
      buildSecretRotationFamily({
        ...family,
        rotationCommand: secretShapedText,
      }),
    ).toThrow(/must not contain serialized secret values/);
  });
});
