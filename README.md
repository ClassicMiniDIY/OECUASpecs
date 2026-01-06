# OpenECU Spec

**The open standard for ECU log file adapters.**

[![Spec Version](https://img.shields.io/badge/spec-1.0-blue.svg)](https://www.openecualliance.org/spec)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

## What is the OpenECU Spec?

The OpenECU Spec defines a standard format for **adapter files** - YAML documents that describe how to parse ECU log files and map vendor-specific channel names to standardized identifiers.

Every ECU manufacturer exports data differently (Haltech calls it "Engine RPM", Link calls it "Engine Speed", AiM calls it "RPM"). Adapters solve this by mapping vendor-specific names to canonical identifiers that any spec-compatible application can understand.

## Documentation

All documentation is available at **[openecualliance.org/docs](https://www.openecualliance.org/docs)**

| Topic | Link |
|-------|------|
| Getting Started | [openecualliance.org/docs/getting-started](https://www.openecualliance.org/docs/getting-started) |
| Full Specification | [openecualliance.org/spec](https://www.openecualliance.org/spec) |
| Creating Adapters | [openecualliance.org/docs/creating-adapters](https://www.openecualliance.org/docs/creating-adapters) |
| Compliance Levels | [openecualliance.org/docs/compliance](https://www.openecualliance.org/docs/compliance) |
| Branding Guidelines | [openecualliance.org/docs/branding](https://www.openecualliance.org/docs/branding) |
| Governance | [openecualliance.org/docs/governance](https://www.openecualliance.org/docs/governance) |
| Project Charter | [openecualliance.org/docs/project-charter](https://www.openecualliance.org/docs/project-charter) |

## Repository Contents

This repository contains the official adapter library and JSON schema for validation:

```
OECUASpecs/
├── adapters/                    # Adapter files organized by vendor
│   ├── aim/
│   ├── ecumaster/
│   ├── emerald/
│   ├── haltech/
│   ├── link/
│   ├── romraider/
│   ├── rusefi/
│   └── speeduino/
├── schema/
│   └── adapter.schema.json      # JSON Schema for validation
└── assets/                      # Logos and branding assets
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
| Emerald | [emerald-lg](adapters/emerald/emerald-lg.adapter.yaml) | Binary | Ready |

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

See the [Creating Adapters](https://www.openecualliance.org/docs/creating-adapters) guide for instructions on submitting new adapters.

## License

Adapter specifications in this repository are released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

---

**OpenECU Spec** is maintained by the **[OpenECU Alliance](https://www.openecualliance.org)**.

Questions? Open a [Discussion](https://github.com/openecualliance/OECUASpecs/discussions) or email info@openecualliance.org.
