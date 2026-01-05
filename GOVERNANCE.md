# OpenECU Alliance Governance

**Version 1.0.0**

This document describes how the OpenECU Alliance operates, how decisions are made, and how the specification evolves over time.

## 1. Overview

The OpenECU Alliance is an open community dedicated to standardizing ECU log data formats and building an ecosystem of interoperable automotive tools. The Alliance maintains the OpenECU Spec and coordinates development of Alliance Projects.

### 1.1 Guiding Principles

1. **Openness** - All specifications are freely available. Development happens in the open.
2. **Consensus** - Major decisions are made through community discussion and rough consensus.
3. **Meritocracy** - Influence is earned through contribution and demonstrated expertise.
4. **Vendor Neutrality** - The spec serves the community, not any single vendor or product.
5. **Pragmatism** - Working code and real-world usage inform specification design.

## 2. Organizational Structure

### 2.1 Roles

#### Steering Committee

The Steering Committee provides strategic direction for the Alliance. Responsibilities include:

- Approving major specification versions
- Accepting or declining donated projects
- Resolving disputes that cannot be settled through normal processes
- Managing Alliance trademarks and branding
- Appointing Maintainers

**Composition**: 3-7 members, with staggered 2-year terms.

#### Maintainers

Maintainers have write access to Alliance repositories and are responsible for:

- Reviewing and merging pull requests
- Triaging issues
- Ensuring quality and consistency of contributions
- Mentoring new contributors

**Appointment**: Nominated by existing Maintainers, approved by Steering Committee.

#### Contributors

Anyone who contributes to the Alliance through:

- Submitting adapters
- Proposing specification changes
- Reporting bugs or issues
- Improving documentation
- Participating in discussions

### 2.2 Working Groups

Working Groups may be formed for specific focus areas:

- **Adapter Working Group** - Reviews adapter submissions, maintains quality standards
- **Spec Evolution Working Group** - Develops and reviews RFCs for specification changes
- **Tooling Working Group** - Develops validation tools, SDKs, and reference implementations

Working Groups are created by Steering Committee approval and dissolved when their purpose is complete.

## 3. Decision Making

### 3.1 Consensus Model

The Alliance uses a **lazy consensus** model for most decisions:

1. A proposal is made (PR, RFC, or discussion)
2. Community members discuss and provide feedback
3. If no objections after the review period, the proposal is accepted
4. If objections exist, discussion continues until consensus is reached

**Review Periods**:
- Adapter additions: 7 days
- Minor spec changes: 14 days
- Major spec changes: 30 days

### 3.2 Voting

When consensus cannot be reached, decisions may go to a vote:

- **Simple Majority** - Routine decisions, adapter disputes
- **Supermajority (2/3)** - Specification changes, governance changes
- **Unanimous** - Removing a Steering Committee member

Only Maintainers and Steering Committee members may vote on formal matters.

### 3.3 RFC Process

Significant changes to the specification follow the RFC (Request for Comments) process:

1. **Draft** - Author creates RFC document in `rfcs/` directory
2. **Discussion** - Community provides feedback via PR comments
3. **Revision** - Author incorporates feedback
4. **Final Comment Period (FCP)** - 14-day period for last objections
5. **Accepted/Rejected** - Steering Committee makes final decision
6. **Implementation** - Changes are incorporated into specification

RFC template is available at `rfcs/0000-template.md`.

## 4. Specification Versioning

### 4.1 Version Scheme

The OpenECU Spec follows [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0) - Breaking changes that require adapter updates
- **MINOR** (0.X.0) - New features, backward-compatible additions
- **PATCH** (0.0.X) - Clarifications, typo fixes, no functional changes

### 4.2 Release Process

1. Changes accumulate on the `main` branch
2. When ready, Maintainers propose a release
3. Release candidate is created for final review
4. After FCP, release is tagged and published
5. Changelog is updated with all changes

### 4.3 Deprecation Policy

Features may be deprecated with at least one minor version of warning:

1. Feature marked as deprecated in documentation
2. Warning period of at least 6 months
3. Feature removed in next major version

## 5. Adapter Governance

### 5.1 Adapter Submission

Anyone may submit adapters. Process:

1. Create adapter following SPECIFICATION.md
2. Validate against JSON Schema
3. Submit Pull Request
4. Adapter Working Group reviews
5. Community review period (7 days)
6. Merged if approved

### 5.2 Adapter Ownership

Adapters in this repository are owned by the Alliance, not individual contributors. This ensures:

- Long-term maintenance regardless of original author availability
- Consistent quality standards
- Freedom for any Maintainer to update

Original authors are credited in adapter metadata.

### 5.3 Disputed Adapters

If multiple adapters exist for the same format, or disputes arise:

1. Discussion in GitHub issue
2. Adapter Working Group mediates
3. If unresolved, Steering Committee decides
4. Decision is final

## 6. Code of Conduct

All participants must adhere to the [Code of Conduct](CODE_OF_CONDUCT.md).

### 6.1 Enforcement

1. **Warning** - First violation, unless severe
2. **Temporary Ban** - Repeated violations, 30-90 days
3. **Permanent Ban** - Severe or continued violations

Enforcement decisions are made by the Steering Committee.

## 7. Amendments

This governance document may be amended through the RFC process with a supermajority vote of the Steering Committee.

---

## Appendix A: Current Steering Committee

*To be established*

## Appendix B: Current Maintainers

*To be established*

## Appendix C: Working Groups

*None currently active*
