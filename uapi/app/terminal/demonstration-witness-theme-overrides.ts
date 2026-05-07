export const BITCODE_DEMONSTRATION_WITNESS_THEME_OVERRIDES = `
.bitcode-demonstration-witness-root {
  --line: rgba(101, 254, 183, .18);
  --line-soft: rgba(101, 254, 183, .10);
  --accent: #65feb7;
  --accent-2: #34d399;
}

.bitcode-demonstration-witness-root .eyebrow,
.bitcode-demonstration-witness-root .meta-inline,
.bitcode-demonstration-witness-root .surface-help {
  color: rgba(209, 250, 229, .82);
}

.bitcode-demonstration-witness-root .status,
.bitcode-demonstration-witness-root .intro-card,
.bitcode-demonstration-witness-root .badge,
.bitcode-demonstration-witness-root .surface-mode-button {
  border-color: rgba(101, 254, 183, .18);
  background: rgba(16, 185, 129, .08);
  color: #a7f3d0;
}

.bitcode-demonstration-witness-root button {
  border: 1px solid rgba(110, 231, 183, .32);
  background: linear-gradient(180deg, rgba(16, 185, 129, .92), rgba(4, 120, 87, .96));
  color: #ecfdf5;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 12px 30px rgba(5, 150, 105, .16);
}

.bitcode-demonstration-witness-root button:hover:not(:disabled) {
  border-color: rgba(167, 243, 208, .52);
  background: linear-gradient(180deg, rgba(52, 211, 153, .92), rgba(5, 150, 105, .98));
}

.bitcode-demonstration-witness-root button.ghost,
.bitcode-demonstration-witness-root .surface-mode-button {
  background: rgba(255, 255, 255, .04);
  color: #d1fae5;
}

.bitcode-demonstration-witness-root .surface-mode-button.active {
  border-color: rgba(110, 231, 183, .36);
  background: linear-gradient(180deg, rgba(16, 185, 129, .20), rgba(16, 185, 129, .08));
  color: #ecfdf5;
}

.bitcode-demonstration-witness-root button:disabled {
  cursor: not-allowed;
  opacity: .48;
  filter: grayscale(.55);
}

.bitcode-demonstration-witness-root button:focus-visible,
.bitcode-demonstration-witness-root input:focus-visible,
.bitcode-demonstration-witness-root select:focus-visible,
.bitcode-demonstration-witness-root textarea:focus-visible,
.bitcode-demonstration-witness-root .surface-mode-button:focus-visible {
  outline-color: rgba(101, 254, 183, .84);
}
`;
