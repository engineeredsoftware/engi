export type SecretTextRedactionResult = {
  value: string;
  redactionApplied: boolean;
};

const PEM_BEGIN_PREFIX = '-----BEGIN ';
const PEM_END_PREFIX = '-----END ';
const PEM_BOUNDARY_SUFFIX = '-----';
const PRIVATE_KEY_LABEL_SUFFIX = 'PRIVATE KEY';
const MAX_PEM_LABEL_LENGTH = 80;

export function redactPemPrivateKeyBlocks(value: string, replacement: string): SecretTextRedactionResult {
  let cursor = 0;
  let redactionApplied = false;
  let redacted = '';

  while (cursor < value.length) {
    const beginIndex = value.indexOf(PEM_BEGIN_PREFIX, cursor);
    if (beginIndex === -1) {
      redacted += value.slice(cursor);
      break;
    }

    const labelStart = beginIndex + PEM_BEGIN_PREFIX.length;
    const labelEnd = value.indexOf(PEM_BOUNDARY_SUFFIX, labelStart);
    if (labelEnd === -1 || labelEnd - labelStart > MAX_PEM_LABEL_LENGTH) {
      redacted += value.slice(cursor, labelStart);
      cursor = labelStart;
      continue;
    }

    const label = value.slice(labelStart, labelEnd);
    if (!label.endsWith(PRIVATE_KEY_LABEL_SUFFIX)) {
      redacted += value.slice(cursor, labelEnd + PEM_BOUNDARY_SUFFIX.length);
      cursor = labelEnd + PEM_BOUNDARY_SUFFIX.length;
      continue;
    }

    const footer = `${PEM_END_PREFIX}${label}${PEM_BOUNDARY_SUFFIX}`;
    const footerIndex = value.indexOf(footer, labelEnd + PEM_BOUNDARY_SUFFIX.length);
    redacted += value.slice(cursor, beginIndex);
    redacted += replacement;
    redactionApplied = true;

    if (footerIndex === -1) {
      cursor = value.length;
      break;
    }

    cursor = footerIndex + footer.length;
  }

  return {
    value: redacted,
    redactionApplied,
  };
}
