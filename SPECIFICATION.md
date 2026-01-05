# OpenECU Alliance Specification

**Version 1.0.0-draft**

## 1. Introduction

This document defines the OpenECU Alliance adapter specification format. An adapter is a declarative description of how to interpret ECU log files and map their channels to standardized identifiers.

### 1.1 Design Principles

1. **Self-Contained**: Each adapter contains complete channel definitions. No external references required.
2. **Declarative**: Adapters describe *what* data looks like, not *how* to parse it programmatically.
3. **Language Agnostic**: YAML format parseable by any programming language.
4. **Extensible**: Custom channels and metadata are first-class citizens.

### 1.2 Terminology

| Term | Definition |
|------|------------|
| **Adapter** | A complete specification file describing an ECU log format |
| **Channel** | A single data stream (e.g., RPM, coolant temperature) |
| **Canonical ID** | The standardized identifier for a channel (snake_case) |
| **Source Name** | The vendor-specific name as it appears in log files |
| **Unit** | The measurement unit for a channel's values |

## 2. File Format

### 2.1 File Extension

Adapter files MUST use the extension `.adapter.yaml` or `.adapter.yml`.

### 2.2 Encoding

Files MUST be encoded as UTF-8.

### 2.3 YAML Version

Files SHOULD be valid YAML 1.2.

## 3. Root Structure

An adapter file MUST contain the following root-level fields:

```yaml
openecualliance: "1.0"        # Required: Spec version
id: string                     # Required: Unique adapter identifier
name: string                   # Required: Human-readable name
version: string                # Required: Adapter version (semver)
vendor: string                 # Required: ECU vendor/manufacturer
description: string            # Optional: Detailed description
website: string                # Optional: URL for more information
file_format: object            # Required: File format specification
channels: array                # Required: Channel definitions
metadata: object               # Optional: Additional metadata
```

### 3.1 Field Definitions

#### `openecualliance` (required)

The specification version this adapter conforms to. Currently `"1.0"`.

```yaml
openecualliance: "1.0"
```

#### `id` (required)

A unique identifier for this adapter. MUST be lowercase alphanumeric with hyphens. MUST be globally unique within the registry.

```yaml
id: haltech-nsp
```

Naming convention: `{vendor}-{format}` or `{vendor}-{product}-{format}`

Examples:
- `haltech-nsp`
- `link-llg`
- `aim-xrk`
- `ecumaster-emu-csv`

#### `name` (required)

Human-readable name for the adapter.

```yaml
name: "Haltech NSP CSV Export"
```

#### `version` (required)

Semantic version of the adapter itself. MUST follow [semver](https://semver.org/).

```yaml
version: "1.2.0"
```

#### `vendor` (required)

The ECU vendor or manufacturer. Use lowercase.

```yaml
vendor: haltech
```

Common vendors:
- `haltech`
- `link`
- `aim`
- `ecumaster`
- `motec`
- `aem`
- `holley`
- `fueltech`
- `megasquirt`
- `speeduino`
- `rusefi`

#### `description` (optional)

A detailed description of the adapter, including any limitations or special notes.

```yaml
description: |
  Parses CSV files exported from Haltech NSP software.
  Supports all Haltech ECU models that export via NSP.
  Time column may be labeled "Time" or "Time_s".
```

#### `website` (optional)

URL for more information about this ECU or format.

```yaml
website: "https://www.haltech.com"
```

#### `branding` (optional)

Vendor branding assets for display in applications. All paths are relative to the `assets/` directory in the OECUASpecs repository.

```yaml
branding:
  logo: haltech-logo.svg           # Full logo (assets/logos/)
  icon: haltech-icon.svg           # Square icon (assets/icons/)
  banner: haltech-banner.png       # Social banner (assets/banners/)
  color_primary: "#FFBE1A"         # Primary brand color
  color_secondary: "#1A1A1A"       # Secondary brand color
```

| Field | Description | Requirements |
|-------|-------------|--------------|
| `logo` | Full vendor logo | SVG or PNG, min 400px wide, transparent background |
| `icon` | Square icon | SVG or PNG, 256x256px, transparent background |
| `banner` | Banner image | PNG/JPG, 1200x630px (Open Graph standard) |
| `color_primary` | Primary brand color | Hex format (#RRGGBB) |
| `color_secondary` | Secondary brand color | Hex format (#RRGGBB) |

**File Naming Convention**: `{vendor}-{type}.{ext}` (e.g., `haltech-logo.svg`, `link-icon.png`)

**Asset Sources**: Assets should come from official vendor press kits, media pages, or with explicit permission. See [assets/README.md](assets/README.md) for contribution guidelines.

## 4. File Format Specification

The `file_format` object describes how to parse the log file.

### 4.1 CSV Format

```yaml
file_format:
  type: csv
  extensions: [".csv", ".log"]
  encoding: utf-8                    # Optional, default: utf-8
  delimiter: ","                     # Required for CSV
  quote_char: "\""                   # Optional, default: "
  escape_char: "\\"                  # Optional, default: \
  header_row: 0                      # Required: 0-indexed row number
  unit_row: 1                        # Optional: Row containing units
  data_start_row: 2                  # Required: First data row
  comment_prefix: "#"                # Optional: Lines starting with this are ignored
  timestamp_column: "Time"           # Optional: Column name for timestamps
  timestamp_unit: seconds            # Optional: seconds, milliseconds, microseconds
```

#### CSV Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be `"csv"` |
| `extensions` | array | Yes | Valid file extensions |
| `encoding` | string | No | File encoding (default: utf-8) |
| `delimiter` | string | Yes | Column delimiter |
| `quote_char` | string | No | Quote character (default: ") |
| `escape_char` | string | No | Escape character (default: \) |
| `header_row` | integer | Yes | 0-indexed row containing headers |
| `unit_row` | integer | No | Row containing unit labels |
| `data_start_row` | integer | Yes | First row of actual data |
| `comment_prefix` | string | No | Ignore lines starting with this |
| `timestamp_column` | string | No | Name of time/timestamp column |
| `timestamp_unit` | string | No | Unit of timestamp values |

### 4.2 Binary Format

For binary formats, the specification provides structural hints but applications may need format-specific parsers.

```yaml
file_format:
  type: binary
  extensions: [".llg", ".mlg"]
  endianness: little                 # Required: little or big
  magic_bytes: [0x4D, 0x4C, 0x47]   # Optional: File signature
  header_size: 512                   # Optional: Header size in bytes
  record_size: variable              # Optional: fixed or variable
  specification_url: "https://..."   # Optional: Link to format docs
```

#### Binary Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Must be `"binary"` |
| `extensions` | array | Yes | Valid file extensions |
| `endianness` | string | Yes | `"little"` or `"big"` |
| `magic_bytes` | array | No | File signature bytes |
| `header_size` | integer | No | Size of header in bytes |
| `record_size` | string | No | `"fixed"` or `"variable"` |
| `specification_url` | string | No | URL to format documentation |

## 5. Channel Definitions

The `channels` array contains definitions for each data channel.

### 5.1 Channel Structure

```yaml
channels:
  - id: rpm                          # Required: Canonical identifier
    name: "Engine RPM"               # Required: Display name
    description: "Engine speed"      # Optional: Detailed description
    category: engine                 # Required: Channel category
    data_type: float                 # Required: Data type
    unit: rpm                        # Required: Canonical unit
    min: 0                           # Optional: Minimum valid value
    max: 20000                       # Optional: Maximum valid value
    precision: 0                     # Optional: Decimal places
    source_names:                    # Required: Vendor-specific names
      - "Engine RPM"
      - "RPM"
      - "Engine Speed"
    source_unit: null                # Optional: If different from canonical
    conversion: null                 # Optional: Unit conversion formula
    tags: ["critical", "primary"]    # Optional: Searchable tags
```

### 5.2 Channel Field Definitions

#### `id` (required)

The canonical identifier for this channel. MUST be lowercase snake_case. This is the standardized name applications will use.

```yaml
id: coolant_temp
```

**Recommended Canonical IDs:**

| Category | ID | Description |
|----------|-----|-------------|
| Engine | `rpm` | Engine rotational speed |
| Engine | `tps` | Throttle position (percentage) |
| Engine | `map` | Manifold absolute pressure |
| Engine | `maf` | Mass air flow |
| Engine | `ignition_advance` | Ignition timing advance |
| Engine | `duty_cycle` | Injector duty cycle |
| Engine | `pulse_width` | Injector pulse width |
| Temperature | `coolant_temp` | Engine coolant temperature |
| Temperature | `iat` | Intake air temperature |
| Temperature | `mat` | Manifold air temperature |
| Temperature | `oil_temp` | Oil temperature |
| Temperature | `egt` | Exhaust gas temperature |
| Fuel | `afr` | Air-fuel ratio |
| Fuel | `afr_target` | Target air-fuel ratio |
| Fuel | `afr_1` | AFR sensor/bank 1 |
| Fuel | `afr_2` | AFR sensor/bank 2 |
| Fuel | `lambda` | Lambda value |
| Fuel | `fuel_pressure` | Fuel rail pressure |
| Pressure | `boost` | Boost pressure |
| Pressure | `oil_pressure` | Oil pressure |
| Pressure | `fuel_pressure` | Fuel pressure |
| Pressure | `barometric` | Barometric pressure |
| Electrical | `battery_voltage` | Battery/system voltage |
| Electrical | `alternator_voltage` | Alternator output |
| Speed | `vehicle_speed` | Vehicle speed |
| Speed | `wheel_speed_fl` | Front left wheel speed |
| Speed | `wheel_speed_fr` | Front right wheel speed |
| Speed | `wheel_speed_rl` | Rear left wheel speed |
| Speed | `wheel_speed_rr` | Rear right wheel speed |
| Drivetrain | `gear` | Current gear |
| Drivetrain | `clutch_switch` | Clutch engaged |
| Correction | `ego_correction` | EGO/O2 correction |
| Correction | `knock_retard` | Knock-induced timing retard |
| Correction | `knock_level` | Knock sensor level |
| Acceleration | `g_lateral` | Lateral acceleration (G-force) |
| Acceleration | `g_longitudinal` | Longitudinal acceleration (G-force) |
| Acceleration | `g_vertical` | Vertical acceleration (G-force) |
| Rotation | `gyro_yaw` | Yaw rotation rate |
| Rotation | `gyro_pitch` | Pitch rotation rate |
| Rotation | `gyro_roll` | Roll rotation rate |
| Position | `gps_latitude` | GPS latitude |
| Position | `gps_longitude` | GPS longitude |
| Position | `gps_altitude` | GPS altitude |
| Position | `gps_heading` | GPS heading/course |
| Suspension | `suspension_fl` | Front left suspension travel |
| Suspension | `suspension_fr` | Front right suspension travel |
| Suspension | `suspension_rl` | Rear left suspension travel |
| Suspension | `suspension_rr` | Rear right suspension travel |
| Timing | `lap_number` | Current lap number |
| Timing | `lap_time` | Current lap time |
| Timing | `best_lap_time` | Best lap time |
| Traction | `traction_slip` | Wheel slip percentage |
| Driver Input | `steering_angle` | Steering wheel angle |
| Driver Input | `brake_pressure_front` | Front brake pressure |
| Driver Input | `brake_pressure_rear` | Rear brake pressure |
| System | `time` | Timestamp |
| System | `sample_rate` | Logging sample rate |

Custom IDs are permitted for ECU-specific channels not in this list.

#### `name` (required)

Human-readable display name for the channel.

```yaml
name: "Engine RPM"
```

#### `description` (optional)

Detailed description of what this channel represents.

```yaml
description: "Engine crankshaft rotational speed measured from crank sensor"
```

#### `category` (required)

Logical grouping for the channel. MUST be one of:

- `engine` - Core engine parameters (RPM, TPS, MAP, VVT, etc.)
- `fuel` - Fuel system (AFR, injector data, fuel pressure)
- `ignition` - Ignition system (timing, dwell, knock)
- `temperature` - Temperature sensors
- `pressure` - Pressure sensors
- `electrical` - Electrical system (voltage, current)
- `speed` - Speed measurements (vehicle, wheel)
- `drivetrain` - Transmission and drivetrain
- `correction` - ECU corrections and trims
- `system` - System/logging metadata
- `acceleration` - Accelerometer/G-force measurements
- `rotation` - Gyroscope/rotation rate measurements
- `position` - GPS and position data
- `suspension` - Suspension travel and damper data
- `timing` - Lap timing and session data
- `traction` - Traction control and wheel slip
- `driver_input` - Steering, brake, throttle inputs
- `custom` - ECU-specific channels

#### `data_type` (required)

The data type of channel values. MUST be one of:

| Type | Description | Example |
|------|-------------|---------|
| `float` | Floating point number | 14.7, 3.14159 |
| `int` | Integer | 6000, -40 |
| `bool` | Boolean (true/false) | true, false |
| `string` | Text value | "Park", "Drive" |
| `enum` | Enumerated value | See below |

For `enum` types, include the possible values:

```yaml
data_type: enum
enum_values:
  - value: 0
    label: "Off"
  - value: 1
    label: "On"
  - value: 2
    label: "Error"
```

#### `unit` (required)

The canonical unit for this channel. Applications SHOULD store data in this unit.

**Standard Units:**

| Category | Units |
|----------|-------|
| Temperature | `celsius`, `fahrenheit`, `kelvin` |
| Pressure | `kpa`, `psi`, `bar`, `mbar`, `inhg` |
| Speed | `rpm`, `kph`, `mph`, `m/s` |
| Volume | `liters`, `gallons`, `cc` |
| Flow | `cc/min`, `lb/hr`, `kg/hr` |
| Ratio | `afr`, `lambda`, `percent` |
| Time | `seconds`, `milliseconds`, `microseconds` |
| Voltage | `volts`, `millivolts` |
| Current | `amps`, `milliamps` |
| Distance | `meters`, `kilometers`, `miles`, `feet` |
| Angle | `degrees`, `radians` |
| Mass | `grams`, `kilograms`, `pounds` |

#### `min` / `max` (optional)

Valid range for this channel. Values outside this range may indicate sensor errors.

```yaml
min: 0
max: 20000
```

#### `precision` (optional)

Number of decimal places for display. Default is 2.

```yaml
precision: 0  # Display as integer
```

#### `source_names` (required)

Array of names this channel may appear as in the log file. Case-insensitive matching is RECOMMENDED.

```yaml
source_names:
  - "Engine RPM"
  - "RPM"
  - "Engine Speed"
  - "Eng RPM"
  - "engine/rpm"
```

#### `source_unit` (optional)

If the source data is in a different unit than the canonical unit, specify it here.

```yaml
unit: celsius
source_unit: fahrenheit
```

#### `conversion` (optional)

Formula to convert from source unit to canonical unit. Use `x` as the input variable.

```yaml
conversion: "(x - 32) * 5/9"  # Fahrenheit to Celsius
```

Common conversions:
- F to C: `(x - 32) * 5/9`
- PSI to kPa: `x * 6.89476`
- Bar to kPa: `x * 100`
- inHg to kPa: `x * 3.38639`
- MPH to KPH: `x * 1.60934`

#### `tags` (optional)

Searchable tags for categorization and filtering.

```yaml
tags: ["critical", "primary", "engine-health"]
```

## 6. Metadata

The optional `metadata` object can contain additional information.

```yaml
metadata:
  author: "OpenECU Alliance"
  license: "MIT"
  repository: "https://github.com/openecualliance/adapters"
  tested_with:
    - "Haltech Elite 2500"
    - "Haltech Nexus R5"
  known_issues:
    - "Time column may be missing on older NSP versions"
  changelog:
    - version: "1.0.0"
      date: "2024-01-15"
      changes:
        - "Initial release"
```

## 7. Validation

### 7.1 Schema Validation

Adapters MUST validate against the JSON Schema provided at `schema/adapter.schema.json`.

### 7.2 Required Validations

1. All required fields are present
2. `id` is unique and follows naming convention
3. `version` is valid semver
4. `channels[].id` values are unique within the adapter
5. `channels[].source_names` arrays are non-empty
6. `channels[].unit` is a recognized unit or documented custom unit
7. `channels[].conversion` is a valid mathematical expression (if present)

### 7.3 Warnings

The following SHOULD generate warnings but not failures:

1. Channel IDs not in the recommended list
2. Categories set to `custom`
3. Missing `description` fields
4. Missing `min`/`max` ranges

## 8. Versioning

### 8.1 Specification Versioning

The specification version follows semver:
- MAJOR: Breaking changes to the spec
- MINOR: New optional features
- PATCH: Clarifications and fixes

### 8.2 Adapter Versioning

Adapter versions are independent and should increment when:
- MAJOR: Breaking changes (removed channels, changed IDs)
- MINOR: New channels added
- PATCH: Bug fixes, additional source_names

## 9. Extending the Specification

### 9.1 Custom Fields

Adapters MAY include additional fields prefixed with `x_`:

```yaml
x_haltech_specific:
  firmware_version: "1.45"
  protocol: "CAN"
```

### 9.2 Custom Units

Non-standard units SHOULD be documented in the adapter description.

### 9.3 Custom Categories

The `custom` category is reserved for ECU-specific channels that don't fit standard categories.

## 10. Examples

See the [examples/](examples/) directory for complete adapter examples:

- `haltech-nsp.adapter.yaml` - Haltech NSP CSV export
- `link-llg.adapter.yaml` - Link ECU binary format
- `aim-xrk.adapter.yaml` - AiM data logger

## Appendix A: Complete Channel Reference

A comprehensive list of recommended canonical channel IDs is maintained at:
`https://openecualliance.org/channels`

## Appendix B: Unit Conversion Reference

| From | To | Formula |
|------|-----|---------|
| fahrenheit | celsius | `(x - 32) * 5/9` |
| celsius | fahrenheit | `x * 9/5 + 32` |
| psi | kpa | `x * 6.89476` |
| kpa | psi | `x * 0.145038` |
| bar | kpa | `x * 100` |
| kpa | bar | `x / 100` |
| inhg | kpa | `x * 3.38639` |
| mph | kph | `x * 1.60934` |
| kph | mph | `x * 0.621371` |
| gallons | liters | `x * 3.78541` |
| liters | gallons | `x * 0.264172` |
| lambda | afr | `x * 14.7` |
| afr | lambda | `x / 14.7` |
