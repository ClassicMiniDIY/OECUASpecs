# OpenECU Spec

**The open standard for ECU log file adapters.**

[![Spec Version](https://img.shields.io/badge/spec-1.0-blue.svg)](SPECIFICATION.md)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

## Understanding the Ecosystem

The OpenECU ecosystem has three distinct components:

| Component | What It Is | Examples |
|-----------|-----------|----------|
| **OpenECU Alliance** | The organization maintaining standards and projects | The governing body |
| **OpenECU Spec** | The technical specification (this repository) | Adapter format, channel IDs |
| **Spec-Compatible Apps** | Applications implementing the spec | UltraLog, and others |

```
┌─────────────────────────────────────────────────────────────┐
│                    OpenECU Alliance                         │
│                   (The Organization)                        │
│                                                             │
│     Maintains standards, accepts donated projects,          │
│           coordinates the ecosystem                         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              OpenECU Spec (This Repo)               │   │
│  │                                                      │   │
│  │  • Adapter file format specification                 │   │
│  │  • Canonical channel identifiers                     │   │
│  │  • JSON Schema for validation                        │   │
│  │  • Official adapter library                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│              ┌────────────┴────────────┐                   │
│              ▼                         ▼                    │
│  ┌─────────────────────┐  ┌─────────────────────────────┐  │
│  │ Alliance Projects   │  │  Spec-Compatible Apps       │  │
│  │                     │  │                             │  │
│  │ Donated to and      │  │ Independent apps that       │  │
│  │ maintained by the   │  │ implement the OpenECU Spec  │  │
│  │ Alliance            │  │                             │  │
│  │                     │  │ • UltraLog                  │  │
│  │ • (Future projects) │  │ • (Your app here)           │  │
│  └─────────────────────┘  └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## What is the OpenECU Spec?

The OpenECU Spec defines a standard format for **adapter files** - YAML documents that describe how to parse ECU log files and map vendor-specific channel names to standardized identifiers.

### The Problem

Every ECU manufacturer exports data differently:
- Haltech calls it "Engine RPM"
- Link calls it "Engine Speed"
- AiM calls it "RPM"
- They all mean the same thing

### The Solution

Adapters map vendor-specific names to canonical identifiers:

```yaml
channels:
  - id: rpm                    # Canonical ID (standardized)
    name: "Engine RPM"
    source_names:              # Vendor-specific names
      - "Engine RPM"
      - "Engine Speed"
      - "RPM"
      - "Eng RPM"
```

Applications implementing the OpenECU Spec can use any adapter to parse any supported ECU format.

## Repository Structure

```
OECUASpecs/
├── adapters/                    # Adapter files organized by vendor
│   ├── aim/
│   ├── ecumaster/
│   ├── haltech/
│   ├── link/
│   ├── romraider/
│   ├── rusefi/
│   └── speeduino/
├── schema/
│   └── adapter.schema.json      # JSON Schema for validation
├── SPECIFICATION.md             # Technical specification
├── GOVERNANCE.md                # How the Alliance operates
├── CONTRIBUTING.md              # How to contribute
├── COMPLIANCE.md                # Compatibility levels
├── BRANDING.md                  # Trademark and naming guidelines
├── PROJECT_CHARTER.md           # Mission, values, project donations
└── README.md                    # This file
```

## Available Adapters

| Vendor | Adapter | Format | Status |
|--------|---------|--------|--------|
| Haltech | [haltech-nsp](adapters/haltech/haltech-nsp.adapter.yaml) | CSV | Ready |
| ECUMaster | [ecumaster-emu-csv](adapters/ecumaster/ecumaster-emu-csv.adapter.yaml) | CSV | Ready |
| RomRaider | [romraider-csv](adapters/romraider/romraider-csv.adapter.yaml) | CSV | Ready |
| Speeduino | [speeduino-mlg](adapters/speeduino/speeduino-mlg.adapter.yaml) | Binary | Ready |
| rusEFI | [rusefi-mlg](adapters/rusefi/rusefi-mlg.adapter.yaml) | Binary | Ready |
| AiM | [aim-xrk](adapters/aim/aim-xrk.adapter.yaml) | Binary | Ready |
| Link | [link-llg](adapters/link/link-llg.adapter.yaml) | Binary | Ready |
| MoTeC | motec-csv | CSV | Planned |
| AEM | aem-csv | CSV | Planned |
| Holley | holley-csv | CSV | Planned |
| FuelTech | fueltech-csv | CSV | Planned |

## Quick Start

### Using Adapters in Your Application

1. Download an adapter from `adapters/`
2. Parse the YAML file
3. Use `source_names` to match columns in log files
4. Display data using canonical `id` values

### Creating a New Adapter

1. Read [SPECIFICATION.md](SPECIFICATION.md)
2. Create `adapters/{vendor}/{vendor}-{format}.adapter.yaml`
3. Validate against `schema/adapter.schema.json`
4. Submit a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

## Adapter Format

```yaml
openecualliance: "1.0"
id: vendor-format
name: "Human Readable Name"
version: "1.0.0"
vendor: vendorname

file_format:
  type: csv
  extensions: [".csv"]
  delimiter: ","
  header_row: 0
  data_start_row: 1

channels:
  - id: rpm
    name: "Engine RPM"
    category: engine
    data_type: float
    unit: rpm
    source_names:
      - "Engine RPM"
      - "RPM"
```

See [SPECIFICATION.md](SPECIFICATION.md) for complete field definitions.

## Canonical Channel IDs

Adapters map vendor names to standardized IDs:

| ID | Name | Category |
|----|------|----------|
| `rpm` | Engine RPM | engine |
| `tps` | Throttle Position | engine |
| `map` | Manifold Pressure | pressure |
| `afr` | Air-Fuel Ratio | fuel |
| `coolant_temp` | Coolant Temperature | temperature |
| `oil_pressure` | Oil Pressure | pressure |
| `boost` | Boost Pressure | pressure |
| `vehicle_speed` | Vehicle Speed | speed |

See [SPECIFICATION.md](SPECIFICATION.md) for the complete channel reference.

## For Application Developers

### Implementing the Spec

See [COMPLIANCE.md](COMPLIANCE.md) for:
- Compliance levels (Level 1-3)
- Requirements for each level
- Self-certification process
- Compatibility badges

### Branding Your Application

See [BRANDING.md](BRANDING.md) for:
- How to describe your application
- Badge usage guidelines
- Trademark guidelines

**Quick summary:**
- You CAN say: "OpenECU Spec-Compatible"
- You CANNOT say: "Official OpenECU application"

## For Project Owners

Interested in donating your ECU-related project to the Alliance for long-term community maintenance?

See [PROJECT_CHARTER.md](PROJECT_CHARTER.md) for:
- Benefits of becoming an Alliance Project
- Donation process
- Requirements and expectations

## Validation

```bash
# Using ajv-cli (Node.js)
npm install -g ajv-cli
ajv validate -s schema/adapter.schema.json -d adapters/**/*.adapter.yaml

# Using check-jsonschema (Python)
pip install check-jsonschema
check-jsonschema --schemafile schema/adapter.schema.json adapters/**/*.adapter.yaml
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- How to submit adapters
- How to propose spec changes (RFC process)
- Style guidelines
- Pull request process

## Governance

See [GOVERNANCE.md](GOVERNANCE.md) for:
- How decisions are made
- Roles (Steering Committee, Maintainers, Contributors)
- RFC process for spec changes
- Versioning policy

## Ecosystem

### Spec-Compatible Applications

Applications that implement the OpenECU Spec:

- **[UltraLog](https://ultralog.app)** - High-performance ECU log viewer

*Want your application listed? Open a PR adding it here.*

### Resources

- **[OpenECU Alliance Website](https://openecualliance.org)** - Organization home
- **[Adapter Registry](https://openecualliance.org/adapters)** - Browse all adapters
- **[GitHub Discussions](https://github.com/openecualliance/OECUASpecs/discussions)** - Community forum

## Documentation

| Document | Description |
|----------|-------------|
| [SPECIFICATION.md](SPECIFICATION.md) | Technical specification for adapters |
| [GOVERNANCE.md](GOVERNANCE.md) | How the Alliance operates |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute |
| [COMPLIANCE.md](COMPLIANCE.md) | Compatibility levels and certification |
| [BRANDING.md](BRANDING.md) | Trademark and naming guidelines |
| [PROJECT_CHARTER.md](PROJECT_CHARTER.md) | Mission, values, project donations |

## License

Adapter specifications in this repository are released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

---

**OpenECU Spec** is maintained by the **OpenECU Alliance**.

Questions? Open a [Discussion](https://github.com/openecualliance/OECUASpecs/discussions) or email info@openecualliance.org.
