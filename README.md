# OpenECU Alliance

**The open community for ECU resources: adapters, protocols, and 3D models.**

[![Spec Version](https://img.shields.io/badge/spec-1.0-blue.svg)](https://www.openecualliance.org/spec)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

## What is the OpenECU Alliance?

The OpenECU Alliance is a community-driven initiative providing free, open resources for the automotive ECU enthusiast community. We share three types of standardized content:

| Content | Description | Use Case |
|---------|-------------|----------|
| **Adapters** | Log file format definitions | Parse ECU logs in any application |
| **Protocols** | CAN Bus message definitions | Real-time ECU communication |
| **3D Models** | Printable hardware designs | Mounts, enclosures, brackets |

### Why Standardize?

Every ECU manufacturer does things differently:
- Haltech calls it "Engine RPM", Link calls it "Engine Speed", AiM calls it "RPM"
- CAN message structures vary between vendors
- There's no central place to find printable ECU accessories

**The OpenECU Alliance solves this** with standardized definitions that any application can use.

---

## Repository Contents

```
OECUASpecs/
├── adapters/                    # Log file format adapters
│   ├── haltech/
│   ├── link/
│   ├── aim/
│   └── ...
├── protocols/                   # CAN Bus protocol definitions
│   ├── haltech/
│   ├── link/
│   └── ...
├── models/                      # 3D printable models
│   ├── mounts/
│   ├── enclosures/
│   ├── brackets/
│   └── ...
├── schema/                      # JSON Schemas for validation
│   ├── adapter.schema.json
│   ├── protocol.schema.json
│   └── model.schema.json
├── assets/                      # Logos and branding
└── scripts/                     # Utility scripts
```

---

## Adapters

Adapters define how to parse ECU log files and map vendor-specific channel names to standardized identifiers.

### Available Adapters

| Vendor | Adapter | Format | Channels |
|--------|---------|--------|----------|
| Haltech | [haltech-nsp](adapters/haltech/haltech-nsp.adapter.yaml) | CSV | 62 |
| ECUMaster | [ecumaster-emu-csv](adapters/ecumaster/ecumaster-emu-csv.adapter.yaml) | CSV | 54 |
| RomRaider | [romraider-csv](adapters/romraider/romraider-csv.adapter.yaml) | CSV | 47 |
| Link ECU | [link-llg](adapters/link/link-llg.adapter.yaml) | Binary | 73 |
| AiM | [aim-xrk](adapters/aim/aim-xrk.adapter.yaml) | Binary | 65 |
| Speeduino | [speeduino-mlg](adapters/speeduino/speeduino-mlg.adapter.yaml) | Binary | 36 |
| rusEFI | [rusefi-mlg](adapters/rusefi/rusefi-mlg.adapter.yaml) | Binary | 58 |
| Emerald | [emerald-lg](adapters/emerald/emerald-lg.adapter.yaml) | Binary | 42 |

---

## Protocols

Protocols define CAN Bus message structures for real-time ECU data streaming. Each protocol can be exported to industry-standard DBC format.

### Available Protocols

| Vendor | Protocol | Baud Rate | Messages |
|--------|----------|-----------|----------|
| Haltech | [haltech-elite-broadcast](protocols/haltech/haltech-elite-broadcast.protocol.yaml) | 1 Mbps | 11 |

**Coming Soon:** Link, ECUMaster, AiM, Speeduino

### DBC Export

Protocol definitions can be exported to DBC format for use with CANalyzer, PCAN-View, SavvyCAN, and other CAN analysis tools.

---

## 3D Models

Printable hardware designs for ECU-related accessories with full print settings and assembly instructions.

### Model Categories

| Category | Description |
|----------|-------------|
| **Mounts** | ECU mounting brackets |
| **Enclosures** | ECU cases and housings |
| **Brackets** | Sensor and component brackets |
| **Adapters** | Physical connector adapters |
| **Accessories** | Misc accessories |

### Available Models

| Model | Category | Material | Print Time |
|-------|----------|----------|------------|
| [speeduino-v04-mount](models/mounts/speeduino-v04-mount/) | Mounts | PETG | 3.5 hrs |

**Want to contribute?** See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## Documentation

Full documentation is available at **[openecualliance.org/docs](https://www.openecualliance.org/docs)**

| Topic | Link |
|-------|------|
| Getting Started | [/docs/getting-started](https://www.openecualliance.org/docs/getting-started) |
| Full Specification | [/spec](https://www.openecualliance.org/spec) |
| Creating Adapters | [/docs/creating-adapters](https://www.openecualliance.org/docs/creating-adapters) |
| Creating Protocols | [/docs/creating-protocols](https://www.openecualliance.org/docs/creating-protocols) |
| Creating Models | [/docs/creating-models](https://www.openecualliance.org/docs/creating-models) |

---

## Validation

All content can be validated against JSON schemas:

```bash
# Install validator
npm install -g ajv-cli

# Validate adapters
ajv validate -s schema/adapter.schema.json -d "adapters/**/*.adapter.yaml"

# Validate protocols
ajv validate -s schema/protocol.schema.json -d "protocols/**/*.protocol.yaml"

# Validate models
ajv validate -s schema/model.schema.json -d "models/**/*.model.yaml"
```

---

## Compatible Applications

Applications that support OpenECU Alliance content:

| Application | Adapters | Protocols | Models |
|-------------|----------|-----------|--------|
| [UltraLog](https://github.com/ClassicMiniDIY/UltraLog) | Yes | - | - |

**Building an app?** Visit [openecualliance.org/ecosystem](https://www.openecualliance.org/ecosystem)

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for:

- How to create adapters, protocols, and models
- Quality guidelines and checklists
- Submission process

---

## License

- **Schemas**: MIT License
- **Adapters & Protocols**: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **3D Models**: As specified in each model (typically CC BY-SA 4.0)

---

**OpenECU Alliance** - One community. Shared standards. Free resources.

[Website](https://www.openecualliance.org) | [GitHub](https://github.com/openecualliance/OECUASpecs) | [Discussions](https://github.com/openecualliance/OECUASpecs/discussions)
