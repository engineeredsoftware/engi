# ENGI Demo Checklist

Use this before presenting the demo.

---

## Pre-demo setup

- [ ] Open the demo at `http://127.0.0.1:4318`
- [ ] Confirm the page loads successfully
- [ ] Confirm the thesis strip is visible
- [ ] Confirm the top summary cards render
- [ ] Set mode appropriately:
  - [ ] `light` for live presentation
  - [ ] `heavy` only if deeper inspection is expected
- [ ] Click **Reset demo** before starting
- [ ] Confirm seeded state appears clean:
  - [ ] 3 assets
  - [ ] 0 public receipts
  - [ ] proof group summary shows clean initial state

---

## Seeded scenario sanity check

- [ ] Buyer is `Frontier Code Systems`
- [ ] Seeded query is `enterprise auth migration rollback for monorepo services with issuer mismatch`
- [ ] Expected top asset is `Enterprise auth migration rollback playbook`
- [ ] Benchmark name is `production-auth-remediation`

---

## Gold-path presentation checklist

### 1. Openly writable
- [ ] Point to thesis strip
- [ ] Show `1. Public deposits`
- [ ] Explain that public commitments are visible while corpus payloads stay sealed

### 2. Measurably readable
- [ ] Run the licensed query or click guided demo
- [ ] Show the private bundle
- [ ] Explain that the system assembles a need-matched bundle rather than revealing the full corpus

### 3. Provable
- [ ] In light mode, mention the collapsed proof summary
- [ ] If needed, expand proof group
- [ ] Show at least:
  - [ ] ranking explanation
  - [ ] conservation check
  - [ ] public receipts
- [ ] Mention policy/provenance if asked

### 4. Valuable
- [ ] End on the benchmark panel
- [ ] Explain baseline outcome
- [ ] Explain treatment outcome
- [ ] Explain why the licensed bundle helped
- [ ] Land the buyer impact clearly

---

## Expected live outputs after gold path

After one normal gold-path run, expect roughly:

- [ ] private bundle issued successfully
- [ ] top-ranked asset: `Enterprise auth migration rollback playbook`
- [ ] allocation conservation: `verified`
- [ ] public receipts present
- [ ] benchmark uplift: `2500 bp`
- [ ] buyer impact mentions:
  - [ ] higher-confidence incident recovery
  - [ ] faster safe rollback
  - [ ] lower risk of breaking live sessions

---

## If presenting in light mode

- [ ] Keep proof group collapsed until the proof step
- [ ] Use the proof summary card as the trust-at-a-glance surface
- [ ] Do not get stuck inside raw proof payloads
- [ ] Return quickly to the benchmark ending

---

## If someone asks for deeper proof

Expand the proof group and walk in this order:

1. ranking explanation
2. conservation check
3. public receipts
4. receipt schemas
5. policy release / attestation
6. proof log timeline

---

## If something looks wrong

### If state is dirty
- [ ] Click **Reset demo**
- [ ] Reconfirm 0 receipts

### If proof group is distracting
- [ ] Switch to `light` mode

### If the benchmark panel is not the last visual beat
- [ ] Scroll back to `3. Utility proof`
- [ ] re-land the value claim before closing

### If the server is not responding
Run from repo root:

```bash
cd /Users/garrettmaring/.openclaw/workspace/engi-demo
node server.js
```

Then reload:

`http://127.0.0.1:4318`

---

## Final reminder

Do not end on proof mechanics.

End on this:

- the buyer had a real production auth incident
- the system assembled the right licensed bundle
- the read was provable
- the read improved the buyer's remediation system
