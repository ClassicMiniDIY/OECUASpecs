# CLAUDE.md

This file provides guidance to Claude Code when working with the OECUASpecs repository.

## Repository Purpose

This is the **single source of truth** for OpenECU Alliance adapter specifications. This repository contains:

1. **Adapter Definitions** - YAML files that describe ECU log file formats
2. **JSON Schema** - Validation schema for adapter files
3. **Brand Assets** - Logos and icons for ECU vendors

Full documentation is available at: [openecualliance.org/docs](https://www.openecualliance.org/docs)

Applications (like UltraLog, the OpenECU Alliance marketplace, etc.) consume adapters from this repository.

## Repository Structure

```
OECUASpecs/
├── adapters/                    # Adapter files organized by vendor
│   ├── haltech/
│   │   └── haltech-nsp.adapter.yaml
│   ├── link/
│   │   └── link-llg.adapter.yaml
│   ├── aim/
│   │   └── aim-xrk.adapter.yaml
│   └── [vendor]/
│       └── [adapter-id].adapter.yaml
├── schema/
│   └── adapter.schema.json      # JSON Schema for validation
├── assets/                      # Brand assets (logos, icons)
├── README.md                    # Public-facing documentation
└── CLAUDE.md                    # This file
```

## Adapter File Naming Convention

- Files MUST be named: `{adapter-id}.adapter.yaml`
- Adapter ID format: `{vendor}-{format}` (lowercase, hyphen-separated)
- Examples:
  - `haltech-nsp.adapter.yaml`
  - `link-llg.adapter.yaml`
  - `aim-xrk.adapter.yaml`
  - `ecumaster-emu-csv.adapter.yaml`

## Adapter Organization

Adapters are organized by vendor in the `adapters/` directory:

```
adapters/
├── haltech/           # Haltech ECU adapters
├── link/              # Link ECU adapters
├── aim/               # AiM data logger adapters
├── ecumaster/         # ECUMaster adapters
├── motec/             # MoTeC adapters
├── aem/               # AEM adapters
├── holley/            # Holley/Dominator adapters
├── fueltech/          # FuelTech adapters
├── megasquirt/        # MegaSquirt adapters
├── speeduino/         # Speeduino adapters
└── rusefi/            # rusEFI adapters
```

## Creating New Adapters

When creating a new adapter:

1. **Create vendor directory** if it doesn't exist:
   ```bash
   mkdir -p adapters/{vendor}
   ```

2. **Create adapter file** following the naming convention:
   ```bash
   touch adapters/{vendor}/{vendor}-{format}.adapter.yaml
   ```

3. **Required fields** in every adapter:
   ```yaml
   openecualliance: "1.0"
   id: vendor-format
   name: "Human Readable Name"
   version: "1.0.0"
   vendor: vendorname
   file_format:
     type: csv  # or binary
     extensions: [".csv"]
     # ... format-specific fields
   channels:
     - id: rpm
       name: "Engine RPM"
       # ... channel definition
   ```

4. **Validate** against JSON Schema before committing

## Channel Definition Guidelines

### Canonical Channel IDs

Use these standardized IDs when mapping vendor-specific channels:

**Engine:**
- `rpm` - Engine speed
- `tps` - Throttle position (%)
- `map` - Manifold absolute pressure
- `maf` - Mass air flow
- `ignition_advance` - Spark timing

**Fuel:**
- `afr` - Air-fuel ratio
- `afr_target` - Target AFR
- `afr_1`, `afr_2` - Per-bank AFR
- `lambda` - Lambda value
- `duty_cycle` - Injector duty cycle
- `pulse_width` - Injector pulse width
- `fuel_pressure` - Fuel rail pressure

**Temperature:**
- `coolant_temp` - Engine coolant
- `iat` - Intake air temperature
- `oil_temp` - Oil temperature
- `egt` - Exhaust gas temperature
- `egt_1` through `egt_8` - Per-cylinder EGT

**Pressure:**
- `boost` - Boost pressure (gauge)
- `oil_pressure` - Oil pressure
- `barometric` - Barometric pressure

**Electrical:**
- `battery_voltage` - System voltage

**Speed:**
- `vehicle_speed` - Vehicle speed
- `wheel_speed_fl`, `wheel_speed_fr`, `wheel_speed_rl`, `wheel_speed_rr`

**Drivetrain:**
- `gear` - Current gear

**Corrections:**
- `ego_correction` - Closed-loop fuel correction
- `knock_retard` - Knock-induced timing retard
- `knock_level` - Knock sensor level

### Source Names

The `source_names` array should include ALL known variations of how this channel appears in vendor log files:

```yaml
source_names:
  - "Engine RPM"        # Most common
  - "RPM"               # Abbreviated
  - "Engine Speed"      # Alternative
  - "Eng RPM"           # Short form
  - "engine/rpm"        # Path-style (some ECUs)
```

## Validation

Validate adapters against the JSON Schema:

```bash
# Using ajv-cli
npx ajv validate -s schema/adapter.schema.json -d adapters/**/*.adapter.yaml

# Using check-jsonschema
check-jsonschema --schemafile schema/adapter.schema.json adapters/**/*.adapter.yaml
```

## Versioning

### Adapter Versioning

Each adapter has its own version following semver:

- **MAJOR** - Breaking changes (removed channels, changed IDs)
- **MINOR** - New channels added, new source_names
- **PATCH** - Bug fixes, description updates

### Specification Versioning

The `openecualliance` field indicates spec version compatibility:
- Current: `"1.0"`

## Testing Adapters

When adding or modifying adapters:

1. **Validate schema** - Ensure YAML validates against JSON Schema
2. **Test with real logs** - If possible, test parsing with actual log files
3. **Check source_names** - Verify channel names match what appears in real exports
4. **Document tested ECUs** - Add to `metadata.tested_with` array

## Pull Request Guidelines

When submitting adapter PRs:

1. One adapter per PR (unless related)
2. Include adapter validation output
3. Note which ECU models were tested
4. Update CHANGELOG if adding new vendor

## Integration with OpenECU Alliance Marketplace

The marketplace (OpenECUAlliance Nuxt app) consumes adapters from this repo:

- Marketplace reads adapter files to populate listings
- Users can download individual adapters
- Adapter metadata (channels, versions) displayed on detail pages

## Common Tasks

### Add a new adapter for an existing vendor

```bash
# 1. Create the file
touch adapters/haltech/haltech-elite-csv.adapter.yaml

# 2. Copy structure from existing adapter
cp adapters/haltech/haltech-nsp.adapter.yaml adapters/haltech/haltech-elite-csv.adapter.yaml

# 3. Modify for new format
# Edit the file with appropriate changes

# 4. Validate
npx ajv validate -s schema/adapter.schema.json -d adapters/haltech/haltech-elite-csv.adapter.yaml
```

### Add a new vendor

```bash
# 1. Create vendor directory
mkdir -p adapters/newvendor

# 2. Create first adapter
touch adapters/newvendor/newvendor-format.adapter.yaml

# 3. Use template structure from https://www.openecualliance.org/spec
```

### Update an existing adapter

1. Increment version appropriately
2. Add changelog entry to metadata
3. Validate schema
4. Test with log files if possible
