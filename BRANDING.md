# OpenECU Alliance Branding Guidelines

**Version 1.0.0**

This document defines how to properly use OpenECU Alliance trademarks, logos, and terminology. Following these guidelines ensures clarity for users and protects the integrity of the Alliance brand.

## 1. Key Terminology

Understanding the distinction between these terms is critical:

| Term | Definition | Example |
|------|------------|---------|
| **OpenECU Alliance** | The organization that maintains standards and projects | The governing body |
| **OpenECU Spec** | The technical specification for adapter formats | This repository |
| **OpenECU Spec-Compatible** | Third-party applications implementing the spec | UltraLog, TunerPro |
| **OpenECU Alliance Project** | Projects officially maintained by the Alliance | Future donated projects |

### 1.1 Visual Distinction

```
┌─────────────────────────────────────────────────────────────┐
│                    OpenECU Alliance                         │
│                   (The Organization)                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              OpenECU Spec                            │   │
│  │          (The Specification)                         │   │
│  │                                                      │   │
│  │  Published and maintained by the Alliance            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────────────┐  │
│  │ Alliance Projects   │  │  Spec-Compatible Apps       │  │
│  │                     │  │                             │  │
│  │ - Maintained by     │  │ - Independent developers    │  │
│  │   the Alliance      │  │ - Implement the spec        │  │
│  │ - Donated by        │  │ - Self-certified or         │  │
│  │   community         │  │   formally certified        │  │
│  │ - Official support  │  │ - Not Alliance-maintained   │  │
│  │                     │  │                             │  │
│  │ Examples:           │  │ Examples:                   │  │
│  │ - (Future projects) │  │ - UltraLog                  │  │
│  │                     │  │ - (Your app here)           │  │
│  └─────────────────────┘  └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 2. Naming Conventions

### 2.1 Correct Usage

| Context | Correct | Incorrect |
|---------|---------|-----------|
| The organization | "OpenECU Alliance" | "Open ECU Alliance", "OECUA", "The Alliance" (alone) |
| The specification | "OpenECU Spec" | "OpenECU Specification", "OECUA Spec", "The Spec" |
| Compatible apps | "OpenECU Spec-Compatible" | "OpenECU Compatible", "Alliance Compatible" |
| Alliance projects | "OpenECU Alliance Project" | "Alliance Project", "Official Project" |

### 2.2 First Reference Rule

On first reference in any document, use the full name:

> "UltraLog is an **OpenECU Spec-Compatible** application..."

Subsequent references may use abbreviated forms:

> "The spec defines standard channel identifiers..."

### 2.3 Product Naming

**DO NOT** include "OpenECU" in your product name:

- **Correct**: "UltraLog - OpenECU Spec-Compatible Log Viewer"
- **Incorrect**: "OpenECU UltraLog" or "UltraLog OpenECU Edition"

**Exception**: Alliance Projects may use "OpenECU" in product names with Steering Committee approval.

## 3. Describing Your Application

### 3.1 Spec-Compatible Applications

If your application implements the OpenECU Spec:

**Acceptable descriptions:**
- "OpenECU Spec-Compatible"
- "Implements the OpenECU Spec"
- "Supports OpenECU Spec adapters"
- "Compatible with OpenECU Spec 1.0"

**NOT acceptable:**
- "Official OpenECU application"
- "OpenECU Certified" (without formal certification)
- "Endorsed by OpenECU Alliance" (without endorsement)
- "OpenECU Alliance Partner" (without partnership)

### 3.2 Alliance Projects

Projects officially maintained by the Alliance may use:

- "An OpenECU Alliance Project"
- "Maintained by the OpenECU Alliance"
- "Official OpenECU Alliance software"

### 3.3 Examples

**For a Spec-Compatible app (like UltraLog):**
```
UltraLog
A high-performance ECU log viewer

OpenECU Spec-Compatible (Level 2)
Supports adapters from the OpenECU Spec registry

[OpenECU Spec-Compatible Badge]
```

**For an Alliance Project:**
```
ProjectName
An OpenECU Alliance Project

Officially maintained by the OpenECU Alliance.
Licensed under [License].

[OpenECU Alliance Project Badge]
```

## 4. Logo and Badge Usage

### 4.1 Available Assets

| Asset | Usage | Availability |
|-------|-------|--------------|
| Alliance Logo | Alliance materials only | Restricted |
| Spec Logo | Spec documentation | Open use with attribution |
| Compatibility Badge | Spec-compatible apps | Open use (self-certified) |
| Certified Badge | Formally certified apps | After certification |
| Alliance Project Badge | Donated projects | Alliance Projects only |

### 4.2 Compatibility Badges

Available for self-certified applications:

```
┌──────────────────────────────┐
│  OpenECU Spec Compatible     │
│         Level 2              │
│         v1.0                 │
└──────────────────────────────┘
```

Badge URLs:
- `https://openecualliance.org/badges/compatible-level-1.svg`
- `https://openecualliance.org/badges/compatible-level-2.svg`
- `https://openecualliance.org/badges/compatible-level-3.svg`

**Requirements for badge use:**
- Meet all requirements for claimed compliance level
- Link badge to COMPLIANCE.md or openecualliance.org/compliance
- Include spec version number

### 4.3 Alliance Project Badge

Only for officially donated/maintained projects:

```
┌──────────────────────────────┐
│   OpenECU Alliance Project   │
│                              │
│   [Alliance Logo]            │
└──────────────────────────────┘
```

**Requirements:**
- Project accepted per PROJECT_CHARTER.md
- Approved by Steering Committee
- Listed on openecualliance.org

### 4.4 Logo Usage Rules

**DO:**
- Use official assets from openecualliance.org/brand
- Maintain minimum clear space around logos
- Use on white or light backgrounds
- Link to openecualliance.org when possible

**DO NOT:**
- Modify, distort, or recolor logos
- Use logos as part of your own logo
- Imply endorsement without authorization
- Use Alliance logo for non-Alliance projects

## 5. Marketing and Communications

### 5.1 Press Releases

**For Spec-Compatible apps:**

> [Product] announces OpenECU Spec compatibility
>
> [City, Date] - [Company] today announced that [Product] now supports
> the OpenECU Spec, an open standard for ECU log file adapters maintained
> by the OpenECU Alliance.
>
> [Product] achieves Level [X] compliance, enabling users to...

**Do not imply:**
- Partnership with the Alliance (unless true)
- Endorsement by the Alliance (unless given)
- Official status (unless an Alliance Project)

### 5.2 Website Usage

Recommended placement for compatibility information:

```
Footer:
"OpenECU Spec-Compatible" [Badge]

Features page:
"Supports OpenECU Spec adapters for cross-platform compatibility"

About page:
"[Product] implements the OpenECU Spec, an open standard maintained
by the OpenECU Alliance. Learn more at openecualliance.org"
```

### 5.3 Social Media

Acceptable hashtags:
- #OpenECUSpec
- #OpenECUAlliance
- #ECULogging

## 6. Trademark Guidelines

### 6.1 Trademark Status

The following are trademarks of the OpenECU Alliance:

- "OpenECU Alliance"
- "OpenECU Spec"
- OpenECU Alliance logo
- OpenECU Spec logo

### 6.2 Fair Use

You may use trademarks without permission for:

- Truthful references to the specification
- Compatibility statements
- Editorial or educational purposes

### 6.3 Permissions Required

Permission is required to:

- Use "OpenECU" in a product name
- Use the Alliance logo
- Claim "Official" or "Certified" status
- Create derivative logos or badges

### 6.4 Requesting Permission

Contact: branding@openecualliance.org

Include:
- Your name and organization
- Intended use
- Mockups or examples
- Duration of use

## 7. Alliance Project Branding

### 7.1 When a Project Joins the Alliance

Projects donated to the Alliance may:

1. Add "An OpenECU Alliance Project" tagline
2. Use Alliance Project badge
3. Be listed on openecualliance.org
4. Use Alliance infrastructure (repos, domains, etc.)

### 7.2 Branding Transition

When a Spec-Compatible app becomes an Alliance Project:

**Before (independent):**
```
UltraLog
OpenECU Spec-Compatible Log Viewer
```

**After (Alliance Project):**
```
UltraLog
An OpenECU Alliance Project
```

### 7.3 Maintaining Identity

Alliance Projects retain their original identity:
- Keep original name (unless conflict)
- Keep original branding/colors
- Add Alliance affiliation, don't replace identity

## 8. Quick Reference

### What You CAN Say

- "Implements the OpenECU Spec"
- "OpenECU Spec-Compatible"
- "Supports OpenECU Spec adapters"
- "Compatible with OpenECU Spec version 1.0"
- "Verified against OpenECU Spec compliance tests"

### What You CANNOT Say (without authorization)

- "Official OpenECU application"
- "OpenECU Certified" (without formal certification)
- "Endorsed by OpenECU Alliance"
- "OpenECU Alliance Partner"
- "Powered by OpenECU Alliance"
- Using "OpenECU" in product name

---

## Questions?

For branding questions: branding@openecualliance.org
For compliance questions: See [COMPLIANCE.md](COMPLIANCE.md)
For trademark concerns: legal@openecualliance.org
