# OpenECU Alliance Adapter Specifications

**The single source of truth for OpenECU Alliance adapter definitions.**

## What is OpenECU Alliance?

OpenECU Alliance is an open specification for standardizing ECU (Engine Control Unit) log data formats. This repository contains the adapter files that describe how to parse log files from various ECU systems and map vendor-specific channel names to standardized identifiers.

## Repository Structure

```
OECUASpecs/
├── adapters/                    # Adapter files organized by vendor
│   ├── aim/
│   │   └── aim-xrk.adapter.yaml
│   ├── ecumaster/
│   │   └── ecumaster-emu-csv.adapter.yaml
│   ├── haltech/
│   │   └── haltech-nsp.adapter.yaml
│   ├── link/
│   │   └── link-llg.adapter.yaml
│   ├── romraider/
│   │   └── romraider-csv.adapter.yaml
│   ├── rusefi/
│   │   └── rusefi-mlg.adapter.yaml
│   └── speeduino/
│       └── speeduino-mlg.adapter.yaml
├── schema/
│   └── adapter.schema.json      # JSON Schema for validation
├── SPECIFICATION.md             # Formal specification document
└── README.md
```

## Available Adapters

| Vendor | Adapter | Format | Channels | Status |
|--------|---------|--------|----------|--------|
| Haltech | [haltech-nsp](adapters/haltech/haltech-nsp.adapter.yaml) | CSV | 35 | ✅ Ready |
| ECUMaster | [ecumaster-emu-csv](adapters/ecumaster/ecumaster-emu-csv.adapter.yaml) | CSV | 32 | ✅ Ready |
| RomRaider | [romraider-csv](adapters/romraider/romraider-csv.adapter.yaml) | CSV | 27 | ✅ Ready |
| Speeduino | [speeduino-mlg](adapters/speeduino/speeduino-mlg.adapter.yaml) | Binary | 25 | ✅ Ready |
| rusEFI | [rusefi-mlg](adapters/rusefi/rusefi-mlg.adapter.yaml) | Binary | 42 | ✅ Ready |
| AiM | [aim-xrk](adapters/aim/aim-xrk.adapter.yaml) | Binary | 45 | ✅ Ready |
| Link | [link-llg](adapters/link/link-llg.adapter.yaml) | Binary | 52 | ✅ Ready |
| MoTeC | motec-csv | CSV | - | 🚧 Planned |
| AEM | aem-csv | CSV | - | 🚧 Planned |
| Holley | holley-csv | CSV | - | 🚧 Planned |
| FuelTech | fueltech-csv | CSV | - | 🚧 Planned |

## Quick Start

### Using an Adapter

1. Find the adapter for your ECU in the `adapters/` directory
2. Download the `.adapter.yaml` file
3. Use it with any OpenECU Alliance-compatible application

### Creating an Adapter

1. Read the [SPECIFICATION.md](SPECIFICATION.md)
2. Create a YAML file in `adapters/{vendor}/{vendor}-{format}.adapter.yaml`
3. Validate against `schema/adapter.schema.json`
4. Submit a Pull Request

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
    min: 0
    max: 20000
    source_names:
      - "Engine RPM"
      - "RPM"
      - "Engine Speed"
```

## Canonical Channel IDs

Adapters map vendor-specific channel names to standardized IDs:

| ID | Name | Category |
|----|------|----------|
| `rpm` | Engine RPM | engine |
| `tps` | Throttle Position | engine |
| `map` | Manifold Pressure | pressure |
| `afr` | Air-Fuel Ratio | fuel |
| `lambda` | Lambda | fuel |
| `coolant_temp` | Coolant Temperature | temperature |
| `iat` | Intake Air Temperature | temperature |
| `oil_pressure` | Oil Pressure | pressure |
| `oil_temp` | Oil Temperature | temperature |
| `battery_voltage` | Battery Voltage | electrical |
| `boost` | Boost Pressure | pressure |
| `ignition_advance` | Ignition Timing | ignition |
| `duty_cycle` | Injector Duty Cycle | fuel |
| `vehicle_speed` | Vehicle Speed | speed |
| `gear` | Gear Position | drivetrain |
| `g_lateral` | Lateral G-Force | acceleration |
| `g_longitudinal` | Longitudinal G-Force | acceleration |
| `gps_latitude` | GPS Latitude | position |
| `gps_longitude` | GPS Longitude | position |
| `steering_angle` | Steering Angle | driver_input |
| `lap_time` | Lap Time | timing |

See [SPECIFICATION.md](SPECIFICATION.md) for the complete channel reference.

## Validation

Validate adapters against the JSON Schema:

```bash
# Using ajv-cli
npm install -g ajv-cli
ajv validate -s schema/adapter.schema.json -d adapters/haltech/haltech-nsp.adapter.yaml

# Using check-jsonschema (Python)
pip install check-jsonschema
check-jsonschema --schemafile schema/adapter.schema.json adapters/**/*.adapter.yaml
```

## Contributing

We welcome adapter contributions for any ECU system!

1. Fork this repository
2. Create vendor directory if needed: `mkdir -p adapters/{vendor}`
3. Create adapter file: `adapters/{vendor}/{vendor}-{format}.adapter.yaml`
4. Validate against JSON Schema
5. Submit a Pull Request

### Contribution Guidelines

- One adapter per file
- Include all known `source_names` variations
- Test with actual log files when possible
- Document tested ECU models in `metadata.tested_with`
- Follow semantic versioning for adapter versions

## Ecosystem

- **[OpenECU Alliance Marketplace](https://openecualliance.org)** - Browse and discover adapters
- **[UltraLog](https://ultralog.app)** - ECU log viewer using OpenECU Alliance adapters

## Documentation

- [SPECIFICATION.md](SPECIFICATION.md) - Full specification with all field definitions
- [schema/adapter.schema.json](schema/adapter.schema.json) - JSON Schema for validation

## License

Adapter specifications in this repository are released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
