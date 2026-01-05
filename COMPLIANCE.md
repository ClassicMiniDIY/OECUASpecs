# OpenECU Spec Compliance

**Version 1.0.0**

This document defines what it means for an application to be "OpenECU Spec-Compatible" and outlines the different levels of compliance.

## 1. Overview

The OpenECU Spec defines a standard format for describing ECU log file formats. Applications that implement this specification can advertise their compliance level, helping users understand what to expect.

### 1.1 Why Compliance Matters

- **Interoperability** - Users can share adapters across compatible applications
- **Quality Assurance** - Compliance levels indicate implementation completeness
- **Ecosystem Growth** - A clear standard encourages more tool development

## 2. Compliance Levels

### 2.1 Level 1: Adapter Reader (Bronze)

**Minimum viable implementation.**

An application achieves Level 1 compliance by:

| Requirement | Description |
|-------------|-------------|
| Parse adapter files | Read `.adapter.yaml` files |
| Extract channel mappings | Use `source_names` to identify channels in log files |
| Display canonical IDs | Show standardized channel names to users |
| Schema validation | Validate adapters against JSON Schema (recommended) |

**Use Case**: Simple log viewers that use adapters to identify channels.

**Badge**: "OpenECU Spec Compatible - Level 1"

### 2.2 Level 2: Full Reader (Silver)

**Complete read-side implementation.**

Level 2 includes all Level 1 requirements plus:

| Requirement | Description |
|-------------|-------------|
| Unit conversion | Apply `conversion` formulas when `source_unit` differs |
| Category grouping | Organize channels by `category` |
| Metadata display | Show adapter `name`, `version`, `description` |
| Multi-adapter support | Load and switch between multiple adapters |
| Automatic detection | Detect correct adapter based on file format |

**Use Case**: Full-featured log analysis tools.

**Badge**: "OpenECU Spec Compatible - Level 2"

### 2.3 Level 3: Full Implementation (Gold)

**Complete implementation including write capabilities.**

Level 3 includes all Level 2 requirements plus:

| Requirement | Description |
|-------------|-------------|
| Adapter creation | UI or API to create new adapters |
| Adapter validation | Validate adapters against schema before saving |
| Adapter export | Export adapters in valid `.adapter.yaml` format |
| Channel ID suggestions | Suggest canonical IDs when creating adapters |
| Registry integration | Fetch adapters from OpenECU Alliance registry |

**Use Case**: ECU software, adapter development tools.

**Badge**: "OpenECU Spec Compatible - Level 3"

## 3. Compliance Requirements Detail

### 3.1 Adapter Parsing

Compliant applications MUST:

- Parse YAML 1.2 syntax
- Handle all required fields per SPECIFICATION.md
- Gracefully handle unknown fields (ignore, don't error)
- Support both `.adapter.yaml` and `.adapter.yml` extensions

### 3.2 Channel Matching

When matching log file columns to adapter channels:

- MUST try all `source_names` for each channel
- SHOULD use case-insensitive matching
- SHOULD handle whitespace variations
- MAY support regex patterns in `source_names`

```yaml
# All of these should match "Engine RPM" column:
source_names:
  - "Engine RPM"
  - "engine rpm"
  - "ENGINE RPM"
  - " Engine RPM "  # with whitespace
```

### 3.3 Unit Conversion

Level 2+ applications MUST:

- Apply `conversion` formula when `source_unit` is specified
- Use standard mathematical expression evaluation
- Support variables: `x` (input value)
- Support operators: `+`, `-`, `*`, `/`, `^`, `()`
- Support functions: `abs`, `sqrt`, `sin`, `cos`, `tan`, `log`, `exp`

Example:
```yaml
unit: celsius
source_unit: fahrenheit
conversion: "(x - 32) * 5/9"
```

### 3.4 File Format Detection

Level 2+ applications SHOULD automatically detect the correct adapter:

1. Check file extension against `file_format.extensions`
2. For CSV: check delimiter, header structure
3. For binary: check `magic_bytes` if specified
4. Allow user override if multiple adapters match

### 3.5 Schema Validation

All levels SHOULD validate adapters against the JSON Schema:

```json
{
  "$ref": "https://openecualliance.org/schema/adapter.schema.json"
}
```

Invalid adapters SHOULD:
- Display clear error messages
- Identify the specific validation failure
- Still attempt to load if possible (graceful degradation)

## 4. Certification Process

### 4.1 Self-Certification

For Levels 1-2, applications may self-certify by:

1. Implementing all requirements for the claimed level
2. Testing against reference adapters in the `test-adapters/` directory
3. Documenting compliance in application materials
4. Using appropriate compliance badge

### 4.2 Formal Certification

For Level 3 or marketing as "Certified", applications should:

1. Submit application for review to OpenECU Alliance
2. Demonstrate compliance via test suite or live demo
3. Receive certification letter
4. Be listed on OpenECU Alliance website

### 4.3 Compliance Testing

Reference test suite includes:

| Test | Description |
|------|-------------|
| `test-adapters/minimal.adapter.yaml` | Minimum valid adapter |
| `test-adapters/full.adapter.yaml` | All optional fields |
| `test-adapters/conversions.adapter.yaml` | Unit conversion tests |
| `test-adapters/edge-cases.adapter.yaml` | Edge cases and special values |

Applications should correctly parse all test adapters and produce expected results.

## 5. Compliance Badge Usage

### 5.1 Badge Requirements

Applications may display compliance badges if they:

- Meet ALL requirements for the claimed level
- Link to this compliance document
- Include spec version (e.g., "OpenECU Spec 1.0 Compatible")

### 5.2 Badge Formats

Badges are available at:
- `https://openecualliance.org/badges/level-1.svg`
- `https://openecualliance.org/badges/level-2.svg`
- `https://openecualliance.org/badges/level-3.svg`

### 5.3 Badge Revocation

Badges may be revoked if:

- Application no longer meets requirements
- Compliance is misrepresented
- Significant bugs affect spec compliance

## 6. Versioning and Compatibility

### 6.1 Spec Version Compatibility

Applications should declare which spec versions they support:

```
Supports OpenECU Spec 1.0, 1.1
```

### 6.2 Forward Compatibility

Applications MUST:
- Ignore unknown fields in adapters
- Not fail on newer adapters with additional fields

Applications SHOULD:
- Warn users when adapter spec version is newer than supported
- Provide upgrade path when new spec versions release

### 6.3 Backward Compatibility

The OpenECU Spec maintains backward compatibility within major versions:

- Adapters written for 1.0 will work with 1.x applications
- Major version changes may require adapter updates

## 7. Compliance Matrix

| Feature | Level 1 | Level 2 | Level 3 |
|---------|:-------:|:-------:|:-------:|
| Parse adapter YAML | Required | Required | Required |
| Map source_names to channels | Required | Required | Required |
| Display canonical IDs | Required | Required | Required |
| Schema validation | Recommended | Required | Required |
| Unit conversion | - | Required | Required |
| Category grouping | - | Required | Required |
| Metadata display | - | Required | Required |
| Multi-adapter support | - | Required | Required |
| Auto-detection | - | Required | Required |
| Adapter creation | - | - | Required |
| Adapter export | - | - | Required |
| Registry integration | - | - | Required |

## 8. Compliance FAQ

**Q: Can I claim partial compliance?**
A: No. You must meet ALL requirements for a level to claim it.

**Q: What if I exceed Level 2 but don't have all Level 3 features?**
A: Claim Level 2. Partial Level 3 is still Level 2.

**Q: Is certification required to use "OpenECU Spec Compatible"?**
A: Self-certification is acceptable for Levels 1-2. Level 3 and "Certified" require formal review.

**Q: How do I report non-compliant applications?**
A: Open an issue at github.com/openecualliance/OECUASpecs.

**Q: Can I use the OpenECU Alliance logo?**
A: Logo usage requires separate approval. See [BRANDING.md](BRANDING.md).

---

## Appendix A: Reference Implementation

A reference implementation demonstrating all compliance levels is available at:
`https://github.com/openecualliance/reference-implementation`

## Appendix B: Test Adapter Suite

Test adapters for compliance verification:

```bash
git clone https://github.com/openecualliance/OECUASpecs.git
cd OECUASpecs/test-adapters
```

## Appendix C: Compliance Checklist

### Level 1 Checklist
- [ ] Parse `.adapter.yaml` files
- [ ] Read `openecualliance` version field
- [ ] Extract `channels` array
- [ ] Match columns using `source_names`
- [ ] Display channel `id` (canonical name)

### Level 2 Checklist
- [ ] All Level 1 items
- [ ] Apply `conversion` formulas
- [ ] Display `unit` for each channel
- [ ] Group channels by `category`
- [ ] Show adapter `name` and `version`
- [ ] Support multiple adapters
- [ ] Auto-detect adapter from file

### Level 3 Checklist
- [ ] All Level 2 items
- [ ] Create new adapters via UI/API
- [ ] Validate adapters against schema
- [ ] Export valid `.adapter.yaml` files
- [ ] Suggest canonical channel IDs
- [ ] Fetch from adapter registry
