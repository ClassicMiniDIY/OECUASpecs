# Contributing to OpenECU Alliance

Thank you for your interest in contributing to the OpenECU Alliance! This document explains how to contribute adapters, propose specification changes, and participate in the community.

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Contributing Adapters](#contributing-adapters)
- [Contributing Brand Assets](#contributing-brand-assets)
- [Proposing Specification Changes](#proposing-specification-changes)
- [Reporting Issues](#reporting-issues)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## Ways to Contribute

There are many ways to contribute to the OpenECU Alliance:

| Contribution Type | Description | Difficulty |
|------------------|-------------|------------|
| **Submit Adapters** | Add support for new ECU formats | Beginner |
| **Improve Adapters** | Add source_names, fix issues | Beginner |
| **Report Issues** | Report bugs or missing features | Beginner |
| **Documentation** | Improve docs, add examples | Beginner |
| **Review PRs** | Help review adapter submissions | Intermediate |
| **Propose RFC** | Suggest specification changes | Advanced |
| **Build Tools** | Validation tools, SDKs | Advanced |

## Contributing Adapters

Adapters are the primary way the community expands OpenECU Spec coverage.

### Before You Start

1. **Check existing adapters** - Ensure an adapter doesn't already exist for your format
2. **Gather sample files** - You'll need real log files to test against
3. **Read the specification** - Familiarize yourself with [SPECIFICATION.md](SPECIFICATION.md)

### Step-by-Step Guide

#### 1. Fork and Clone

```bash
git clone https://github.com/YOUR-USERNAME/OECUASpecs.git
cd OECUASpecs
```

#### 2. Create Vendor Directory (if needed)

```bash
mkdir -p adapters/vendorname
```

Use lowercase vendor names: `haltech`, `link`, `motec`, `aem`, etc.

#### 3. Create Adapter File

```bash
touch adapters/vendorname/vendorname-format.adapter.yaml
```

Naming convention: `{vendor}-{format}.adapter.yaml`

Examples:
- `haltech-nsp.adapter.yaml`
- `motec-csv.adapter.yaml`
- `aem-infinity-csv.adapter.yaml`

#### 4. Write the Adapter

Use this template:

```yaml
openecualliance: "1.0"
id: vendorname-format
name: "Vendor Name Format Description"
version: "1.0.0"
vendor: vendorname
description: |
  Brief description of this adapter.
  Include supported ECU models and export methods.
website: "https://vendor-website.com"

file_format:
  type: csv  # or binary
  extensions: [".csv", ".log"]
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
      # Add ALL variations you've seen in real log files

  # Add more channels...

metadata:
  author: "Your Name"
  tested_with:
    - "ECU Model 1"
    - "ECU Model 2"
  changelog:
    - version: "1.0.0"
      date: "2024-01-15"
      changes:
        - "Initial release"
```

#### 5. Validate Your Adapter

```bash
# Install validation tool (one-time)
npm install -g ajv-cli

# Validate
ajv validate -s schema/adapter.schema.json -d adapters/vendorname/vendorname-format.adapter.yaml
```

#### 6. Test with Real Data

If you have access to an OpenECU Spec-compatible application:

1. Load your adapter
2. Open a real log file from the target ECU
3. Verify channels are correctly identified
4. Check unit conversions are accurate

#### 7. Submit Pull Request

```bash
git checkout -b add-vendorname-adapter
git add adapters/vendorname/
git commit -m "Add adapter for VendorName Format"
git push origin add-vendorname-adapter
```

Then create a Pull Request on GitHub.

### Adapter Quality Checklist

Before submitting, verify:

- [ ] Adapter validates against JSON Schema
- [ ] All required fields are present
- [ ] `id` follows naming convention (`vendor-format`)
- [ ] `version` follows semver (start with `1.0.0`)
- [ ] Each channel has at least one `source_name`
- [ ] Channel IDs use canonical names where applicable (see SPECIFICATION.md)
- [ ] `metadata.tested_with` lists ECU models tested
- [ ] Description explains what log files this adapter supports

### Adding Source Names to Existing Adapters

If you discover additional channel name variations in log files:

1. Find the channel in the existing adapter
2. Add the new name to `source_names` array
3. Increment the PATCH version
4. Submit PR with explanation of where you found this variation

```yaml
# Before
source_names:
  - "Engine RPM"

# After
source_names:
  - "Engine RPM"
  - "Eng RPM"  # Found in firmware v2.3 exports
```

## Contributing Brand Assets

Help make the OpenECU Alliance visually cohesive by contributing vendor logos, icons, and brand assets.

### Asset Directory Structure

```text
assets/
├── logos/      # Full vendor logos (horizontal/primary)
├── icons/      # Square icons (for favicons, app icons, thumbnails)
├── banners/    # Banner images (for social sharing, headers)
└── README.md   # Detailed specifications
```

### Asset Requirements

| Asset Type | Format                 | Size           | Background     | Naming                |
|------------|------------------------|----------------|----------------|-----------------------|
| **Logo**   | SVG (preferred) or PNG | Min 400px wide | Transparent    | `{vendor}-logo.svg`   |
| **Icon**   | SVG (preferred) or PNG | 256x256px      | Transparent    | `{vendor}-icon.svg`   |
| **Banner** | PNG or JPG             | 1200x630px     | Solid/gradient | `{vendor}-banner.png` |

### Acceptable Sources

**Approved sources:**

- Official vendor press kits / media pages
- Direct written permission from vendor
- Assets you have verified rights to use

**Not acceptable:**

- Screenshots or low-quality captures
- Modified third-party images
- Assets without clear licensing

### Contributing Brand Assets Guide

#### 1. Find Official Assets

Check vendor websites for:

- Media/Press pages
- Brand guidelines PDFs
- Download sections

Many vendors offer official logos at URLs like:

- `vendor.com/media`
- `vendor.com/press`
- `vendor.com/brand`

#### 2. Prepare Assets

Ensure files meet the specifications:

```bash
# Check image dimensions (using ImageMagick)
identify assets/logos/haltech-logo.svg

# Optimize PNG files
optipng -o5 assets/icons/haltech-icon.png
```

#### 3. Add to Repository

```bash
# Copy files to appropriate directories
cp ~/Downloads/haltech-logo.svg assets/logos/
cp ~/Downloads/haltech-icon.png assets/icons/

# Ensure lowercase naming
mv assets/logos/Haltech-Logo.svg assets/logos/haltech-logo.svg
```

#### 4. Update the Adapter

Add branding reference to the adapter YAML:

```yaml
website: "https://www.haltech.com"

branding:
  logo: haltech-logo.svg
  icon: haltech-icon.svg
  banner: haltech-banner.png
  color_primary: "#FFBE1A"
  color_secondary: "#1A1A1A"

file_format:
  # ...
```

#### 5. Document Source

Include in your PR description:

- Where you obtained the assets
- Link to vendor media page or permission
- Any license terms that apply

#### 6. Submit Pull Request

```bash
git checkout -b add-vendorname-branding
git add assets/logos/ assets/icons/ assets/banners/
git add adapters/vendorname/
git commit -m "branding: add assets for VendorName"
git push origin add-vendorname-branding
```

### Finding Brand Colors

Extract primary brand colors from vendor assets:

1. **From Logo**: Use a color picker on the dominant logo color
2. **From Website**: Inspect CSS for brand colors
3. **From Guidelines**: Many vendors publish hex codes in brand guides

Common tools:

- Browser DevTools (inspect element)
- [ColorZilla](https://www.colorzilla.com/) browser extension
- [Coolors](https://coolors.co/) image color extractor

### Asset Checklist

Before submitting brand assets:

- [ ] Files are from an official/approved source
- [ ] File names are lowercase with hyphens
- [ ] Logo is at least 400px wide (or scalable SVG)
- [ ] Icon is square (1:1 aspect ratio)
- [ ] Banner is 1200x630px for Open Graph compatibility
- [ ] Backgrounds are transparent (except banners)
- [ ] Color codes are valid 6-digit hex values
- [ ] Adapter YAML is updated with branding section
- [ ] PR description includes asset source

## Proposing Specification Changes

For changes to the OpenECU Spec itself, use the RFC process.

### When to Write an RFC

Write an RFC for:

- New fields in the adapter schema
- New channel categories
- Changes to existing field definitions
- New canonical channel IDs
- Breaking changes of any kind

You do NOT need an RFC for:

- Typo fixes
- Clarifications that don't change meaning
- Adding adapter examples

### RFC Process

1. **Discuss First** - Open a GitHub Discussion to gauge interest
2. **Write RFC** - Create `rfcs/0000-your-proposal.md` using the template
3. **Submit PR** - Open PR for community review
4. **Iterate** - Incorporate feedback
5. **FCP** - Final Comment Period (14 days)
6. **Decision** - Steering Committee accepts or rejects

### RFC Template

```markdown
# RFC: Your Proposal Title

- **RFC Number**: 0000 (assigned when accepted)
- **Author**: Your Name
- **Status**: Draft
- **Created**: YYYY-MM-DD

## Summary

One paragraph explanation.

## Motivation

Why is this change needed? What problem does it solve?

## Detailed Design

Technical details of the proposal.

## Drawbacks

Why might we NOT want to do this?

## Alternatives

What other approaches were considered?

## Unresolved Questions

What needs to be resolved before accepting?
```

## Reporting Issues

### Bug Reports

For issues with:

- Incorrect adapter definitions
- Schema validation problems
- Documentation errors

Include:

1. Which adapter/file is affected
2. What you expected
3. What actually happened
4. Sample log file (if applicable, sanitize sensitive data)

### Feature Requests

For new features:

1. Describe the use case
2. Explain why existing features don't suffice
3. Propose a solution (optional)

## Development Setup

### Prerequisites

- Node.js 18+ (for validation tools)
- Git
- A text editor with YAML support

### Install Validation Tools

```bash
# Option 1: ajv-cli (Node.js)
npm install -g ajv-cli

# Option 2: check-jsonschema (Python)
pip install check-jsonschema
```

### Validate All Adapters

```bash
# Using ajv-cli
for f in adapters/**/*.adapter.yaml; do
  ajv validate -s schema/adapter.schema.json -d "$f"
done

# Using check-jsonschema
check-jsonschema --schemafile schema/adapter.schema.json adapters/**/*.adapter.yaml
```

## Pull Request Process

### For Adapters

1. Create branch: `add-{vendor}-adapter` or `update-{adapter-id}`
2. Make changes
3. Validate against schema
4. Push and create PR
5. Fill out PR template
6. Wait for review (typically 7 days)
7. Address feedback
8. Maintainer merges

### For Documentation

1. Create branch: `docs-{description}`
2. Make changes
3. Push and create PR
4. Maintainer reviews and merges (faster turnaround)

### For Specification Changes

1. Follow RFC process first
2. Once RFC is accepted, implement changes
3. Create branch: `rfc-{number}-{description}`
4. Update SPECIFICATION.md and schema
5. Update CHANGELOG.md
6. Maintainer merges after final review

## Style Guidelines

### YAML Style

```yaml
# Use 2-space indentation
channels:
  - id: rpm
    name: "Engine RPM"

# Quote strings that might be ambiguous
version: "1.0.0"  # Not 1.0.0 (could be parsed as number)

# Use lowercase for IDs and vendors
id: haltech-nsp
vendor: haltech

# Use snake_case for channel IDs
id: coolant_temp  # Not coolantTemp or CoolantTemp

# Multi-line descriptions use |
description: |
  This is a longer description
  that spans multiple lines.
```

### Commit Messages

```
type: brief description

Longer explanation if needed.

Refs: #123
```

Types:
- `adapter:` - Adding or updating adapters
- `spec:` - Specification changes
- `docs:` - Documentation only
- `schema:` - JSON Schema changes
- `chore:` - Maintenance, tooling

Examples:
- `adapter: add MoTeC CSV adapter`
- `adapter: add source_names to haltech-nsp rpm channel`
- `spec: add gps_speed canonical channel`
- `docs: clarify unit conversion examples`

## Getting Help

- **GitHub Discussions** - Questions, ideas, general discussion
- **GitHub Issues** - Bug reports, specific problems
- **Discord** - Real-time chat (link TBD)

## Recognition

All contributors are recognized in:

- Adapter `metadata.author` fields
- Repository CONTRIBUTORS.md file
- Release notes for significant contributions

Thank you for contributing to the OpenECU Alliance!
