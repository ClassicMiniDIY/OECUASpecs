# Contributing to OpenECU Alliance

Welcome! The OpenECU Alliance is a community-driven project that provides free, open resources for the automotive ECU community. We welcome contributions of all kinds.

## What Can You Contribute?

| Content Type | Description | Directory |
|--------------|-------------|-----------|
| **Adapters** | Log file format definitions for ECU data loggers | `adapters/` |
| **Protocols** | CAN Bus protocol definitions (message IDs, signals) | `protocols/` |
| **3D Models** | Printable mounts, enclosures, brackets | `models/` |

---

## Quick Start

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR-USERNAME/OECUASpecs.git
cd OECUASpecs
```

### 2. Create Your Content

Choose the type of content you want to contribute:

- **Adapters**: See [Creating Adapters](#creating-adapters)
- **Protocols**: See [Creating Protocols](#creating-protocols)
- **3D Models**: See [Creating 3D Models](#creating-3d-models)

### 3. Validate Your Content

```bash
# Install a JSON Schema validator
npm install -g ajv-cli

# Validate adapters
ajv validate -s schema/adapter.schema.json -d "adapters/**/*.adapter.yaml"

# Validate protocols
ajv validate -s schema/protocol.schema.json -d "protocols/**/*.protocol.yaml"

# Validate models
ajv validate -s schema/model.schema.json -d "models/**/*.model.yaml"
```

### 4. Submit a Pull Request

1. Create a new branch: `git checkout -b add-vendor-content`
2. Commit your changes: `git commit -m "Add Vendor XYZ adapter"`
3. Push to your fork: `git push origin add-vendor-content`
4. Open a Pull Request on GitHub

---

## Creating Adapters

Adapters define how to parse ECU log files. They map vendor-specific channel names to standardized OpenECU Alliance channel IDs.

### Directory Structure

```
adapters/
└── vendor-name/
    └── vendor-format.adapter.yaml
```

### File Naming

- Directory: lowercase vendor name (e.g., `haltech`, `link`, `ecumaster`)
- File: `{vendor}-{format}.adapter.yaml` (e.g., `haltech-nsp.adapter.yaml`)

### Minimal Example

```yaml
openecualliance: "1.0"
id: vendor-format
name: "Vendor Format Name"
version: "1.0.0"
vendor: vendor

file_format:
  type: csv
  extensions: [".csv"]
  delimiter: ","
  header_row: 0
  data_start_row: 1
  timestamp_column: "Time"
  timestamp_unit: seconds

channels:
  - id: rpm
    name: "Engine RPM"
    category: engine
    data_type: float
    unit: rpm
    source_names:
      - "Engine Speed"
      - "RPM"
```

### Channel Categories

Use these standardized categories:

| Category | Examples |
|----------|----------|
| `engine` | RPM, TPS, MAP |
| `fuel` | AFR, Lambda, Fuel Pressure |
| `ignition` | Timing, Dwell, Knock |
| `temperature` | Coolant, IAT, Oil, EGT |
| `pressure` | Boost, Oil, Fuel |
| `electrical` | Battery Voltage |
| `speed` | Vehicle Speed, Wheel Speeds |
| `drivetrain` | Gear Position |
| `correction` | Fuel Trim, Knock Retard |
| `acceleration` | G-forces |
| `position` | GPS coordinates |
| `custom` | Vendor-specific channels |

### Tips for Good Adapters

1. **Include ALL known source names** - Different firmware versions may use different names
2. **Test with real log files** - List tested ECU models in `metadata.tested_with`
3. **Document known issues** - Use `metadata.known_issues` for any quirks
4. **Add unit conversions** - Use `conversion` field if source units differ from canonical

---

## Creating Protocols

Protocols define CAN Bus message structures for real-time ECU communication.

### Directory Structure

```
protocols/
└── vendor-name/
    └── vendor-protocol.protocol.yaml
```

### File Naming

- Directory: lowercase vendor name
- File: `{vendor}-{protocol}.protocol.yaml` (e.g., `haltech-elite-broadcast.protocol.yaml`)

### Minimal Example

```yaml
openecualliance: "1.0"
type: protocol
id: vendor-protocol
name: "Vendor CAN Broadcast"
version: "1.0.0"
vendor: vendor

protocol:
  type: can
  baudrate: 1000000
  extended_id: false

messages:
  - id: 0x360
    name: "Engine Data"
    length: 8
    signals:
      - name: "RPM"
        start_bit: 0
        length: 16
        byte_order: little_endian
        data_type: unsigned
        scale: 1.0
        offset: 0
        unit: "rpm"
```

### Signal Definitions

Each signal must specify:

| Field | Description | Example |
|-------|-------------|---------|
| `start_bit` | Bit position (0-indexed from byte 0) | `0`, `16`, `32` |
| `length` | Signal length in bits | `8`, `16`, `32` |
| `byte_order` | `little_endian` (Intel) or `big_endian` (Motorola) | `little_endian` |
| `data_type` | `unsigned`, `signed`, `float`, `double` | `unsigned` |
| `scale` | Multiply raw value by this | `0.1`, `0.001` |
| `offset` | Add this after scaling | `0`, `-40` |
| `unit` | Physical unit | `rpm`, `kPa`, `celsius` |

**Physical Value Formula:** `physical = (raw × scale) + offset`

### DBC Export

Protocol definitions can be automatically exported to DBC format for use with industry tools like CANalyzer, PCAN-View, and SavvyCAN.

---

## Creating 3D Models

3D models are printable designs for ECU-related hardware like mounts, enclosures, and brackets.

### Directory Structure

```
models/
└── category/
    └── model-name/
        ├── model-name.model.yaml    # Metadata (required)
        ├── model-name.stl           # Print-ready mesh (required)
        ├── model-name.step          # CAD source (recommended)
        └── images/
            ├── preview.jpg          # Primary preview image
            └── ...
```

### Categories

| Category | Description |
|----------|-------------|
| `mounts` | ECU mounting brackets |
| `enclosures` | ECU cases and housings |
| `brackets` | Sensor and component brackets |
| `adapters` | Physical connector adapters |
| `accessories` | Misc accessories |

### Minimal Example

```yaml
openecualliance: "1.0"
type: model
id: my-ecu-mount
name: "My ECU Mount"
version: "1.0.0"
description: |
  A mounting bracket for XYZ ECU.
category: mounts

files:
  - filename: my-ecu-mount.stl
    format: stl
    primary: true

printing:
  recommended_material: "PETG"
  layer_height: 0.2
  infill_percent: 40
  supports_required: false
```

### Print Settings Guidelines

| Setting | Recommended | Notes |
|---------|-------------|-------|
| Material | PETG, ASA, ABS | Never PLA for engine bay! |
| Layer Height | 0.2mm | Good balance of speed/quality |
| Infill | 30-50% | Higher for structural parts |
| Walls | 3-4 | More for screw holes |
| Supports | Minimize | Design to avoid when possible |

### Required Files

1. **Metadata** (`*.model.yaml`) - Always required
2. **STL** - Print-ready mesh file
3. **Preview Image** - At least one image

### Recommended Files

1. **STEP** - Editable CAD source for modifications
2. **3MF** - With embedded print settings
3. **Dimensional Drawing** - PNG/PDF with measurements

### Image Requirements

| Type | Purpose | Requirements |
|------|---------|--------------|
| `render` | 3D visualization | Good lighting, neutral background |
| `photo` | Real-world examples | Clear, well-lit |
| `diagram` | Technical drawings | Dimensions in mm, readable text |

---

## Quality Checklist

Before submitting, verify:

### All Content Types

- [ ] YAML file validates against schema
- [ ] Version follows semver (e.g., `1.0.0`)
- [ ] Description is clear and helpful
- [ ] Metadata includes author and license

### Adapters

- [ ] All common channel names included in `source_names`
- [ ] Tested with real log files
- [ ] File format details are accurate
- [ ] Categories are correctly assigned

### Protocols

- [ ] Message IDs are correct
- [ ] Signal bit positions are accurate
- [ ] Scale and offset values are verified
- [ ] Compatible ECU models listed

### 3D Models

- [ ] STL is manifold (no holes/errors)
- [ ] Print settings are realistic
- [ ] Hardware list is complete
- [ ] At least one preview image

---

## Vendor Branding

If adding a new vendor, consider including:

| Asset | Location | Requirements |
|-------|----------|--------------|
| Logo | `assets/logos/` | SVG preferred, min 400px wide |
| Icon | `assets/icons/` | Square, 256×256 or scalable |
| Colors | In YAML | Hex format (`#RRGGBB`) |

---

## Getting Help

- **Questions**: Open a GitHub Discussion
- **Bug Reports**: Open a GitHub Issue
- **Documentation**: Visit [openecualliance.org/docs](https://openecualliance.org/docs)

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License (for code/schemas) or specified Creative Commons license (for content).

Thank you for contributing to the OpenECU Alliance!
