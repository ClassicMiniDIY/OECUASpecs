# OpenECU Alliance Brand Assets

This directory contains branding assets for ECU vendors included in the OpenECU Spec adapter registry.

## Directory Structure

```
assets/
├── logos/      # Full vendor logos (horizontal/primary)
├── icons/      # Square icons (for favicons, app icons, thumbnails)
├── banners/    # Banner images (for social sharing, headers)
└── README.md   # This file
```

## Asset Specifications

### Logos (`logos/`)

Full vendor logos, typically the horizontal/primary version.

| Property       | Requirement                                                            |
| -------------- | ---------------------------------------------------------------------- |
| **Format**     | SVG (preferred) or PNG                                                 |
| **Size**       | Minimum 400px wide                                                     |
| **Background** | Transparent                                                            |
| **Naming**     | `{vendor}-logo.{ext}` (e.g., `haltech-logo.svg`)                       |
| **Color**      | Original brand colors; optionally include `-white` or `-dark` variants |

### Icons (`icons/`)

Square icons suitable for thumbnails, favicons, and app icons.

| Property         | Requirement                                      |
| ---------------- | ------------------------------------------------ |
| **Format**       | SVG (preferred) or PNG                           |
| **Size**         | 256x256 pixels (or scalable SVG)                 |
| **Aspect Ratio** | 1:1 (square)                                     |
| **Background**   | Transparent                                      |
| **Naming**       | `{vendor}-icon.{ext}` (e.g., `haltech-icon.svg`) |

### Banners (`banners/`)

Banner images for social sharing and headers.

| Property       | Requirement                                          |
| -------------- | ---------------------------------------------------- |
| **Format**     | PNG or JPG                                           |
| **Size**       | 1200x630 pixels (Open Graph standard)                |
| **Background** | Solid color or gradient (not transparent)            |
| **Naming**     | `{vendor}-banner.{ext}` (e.g., `haltech-banner.png`) |

## Adding New Assets

### 1. Source Requirements

**Acceptable sources:**

- Official vendor press kits / media pages
- Direct permission from vendor
- Assets you have rights to use

**Not acceptable:**

- Screenshots or low-quality captures
- Modified third-party images
- Assets without clear licensing

### 2. File Naming

All files must be lowercase with hyphens:

- `haltech-logo.svg`
- `ecumaster-icon.png`
- `aim-banner.png`

Variants can be named:

- `haltech-logo-white.svg` (white version)
- `haltech-logo-dark.svg` (dark version)

### 3. Updating Adapters

After adding assets, update the corresponding adapter YAML:

```yaml
branding:
  logo: haltech-logo.svg
  icon: haltech-icon.svg
  banner: haltech-banner.png
  color_primary: "#E31937"
  color_secondary: "#1A1A1A"
```

### 4. Pull Request

When submitting assets:

1. Include source/permission documentation
2. Confirm you have rights to use the assets
3. Test that files display correctly
4. Update the adapter YAML

## License & Attribution

Brand assets remain property of their respective owners. They are included here under fair use for:

- Identification of ECU systems in compatible applications
- Educational and informational purposes
- Non-commercial open source ecosystem use

If you are a vendor representative and have concerns about asset usage, please contact us at legal@openecualliance.org.

## Current Assets

| Vendor    | Logo    | Icon    | Banner  | Colors  |
| --------- | ------- | ------- | ------- | ------- |
| Haltech   | Pending | Pending | Pending | Pending |
| ECUMaster | Pending | Pending | Pending | Pending |
| Link      | Pending | Pending | Pending | Pending |
| AiM       | Pending | Pending | Pending | Pending |
| RomRaider | Pending | Pending | Pending | Pending |
| Speeduino | Pending | Pending | Pending | Pending |
| rusEFI    | Pending | Pending | Pending | Pending |
| Emerald   | Pending | Pending | Pending | Pending |
