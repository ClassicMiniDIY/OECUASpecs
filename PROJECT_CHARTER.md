# OpenECU Alliance Project Charter

**Version 1.0.0**

This document defines the mission, values, and governance of the OpenECU Alliance, as well as the process for projects to join the Alliance ecosystem.

## 1. Mission Statement

The OpenECU Alliance exists to:

> **Standardize, simplify, and democratize access to ECU data through open specifications and community-maintained tools.**

We believe that:
- ECU data should be accessible to enthusiasts, tuners, and developers alike
- Open standards foster innovation and interoperability
- Community maintenance ensures long-term project sustainability
- Collaboration produces better outcomes than fragmentation

## 2. Core Values

### 2.1 Openness

All Alliance specifications and projects are open:
- Specifications are freely available
- Source code is open source
- Development happens in public
- Decisions are made transparently

### 2.2 Community First

The Alliance serves the automotive enthusiast community:
- User needs drive feature priorities
- Contributors are valued and recognized
- Feedback channels are maintained
- Documentation is prioritized

### 2.3 Quality

Alliance projects maintain high standards:
- Code is reviewed before merging
- Tests validate functionality
- Documentation accompanies features
- Security is taken seriously

### 2.4 Sustainability

Projects should outlast their original creators:
- Knowledge is documented, not siloed
- Multiple maintainers are cultivated
- Dependencies are carefully managed
- Funding sources are diversified

### 2.5 Vendor Neutrality

The Alliance does not favor any vendor:
- All ECU manufacturers are supported equally
- No exclusive partnerships
- Community decides priorities
- Commercial interests are secondary

## 3. Scope

### 3.1 In Scope

The Alliance focuses on:

- **ECU Log Standards** - Specifications for log file formats and channel mappings
- **Log Analysis Tools** - Applications that read, visualize, and analyze ECU data
- **Tuning Utilities** - Tools that assist with ECU calibration and tuning
- **Data Export/Import** - Converters between formats
- **Educational Resources** - Documentation helping users understand ECU data

### 3.2 Out of Scope

The Alliance does not maintain:

- ECU firmware or embedded software
- Commercial tuning software
- Hardware products
- Projects unrelated to automotive ECU data

## 4. Alliance Projects

### 4.1 What is an Alliance Project?

An Alliance Project is software that has been donated to the OpenECU Alliance for long-term community maintenance. Unlike Spec-Compatible applications (which are independently maintained), Alliance Projects:

- Are hosted under OpenECU Alliance GitHub organization
- Are maintained by Alliance contributors
- Follow Alliance governance and quality standards
- May use Alliance branding and trademarks
- Receive community support resources

### 4.2 Benefits of Becoming an Alliance Project

For project owners:
- **Sustainability** - Project lives on even if you step back
- **Contributors** - Access to Alliance contributor pool
- **Credibility** - Association with established organization
- **Infrastructure** - GitHub org, CI/CD, hosting support
- **Community** - Connection to broader ecosystem

For users:
- **Longevity** - Reduced risk of project abandonment
- **Quality** - Alliance quality standards
- **Integration** - Better integration with other Alliance projects
- **Support** - Community support channels

### 4.3 Responsibilities of Alliance Projects

Alliance Projects agree to:
- Follow Alliance [Code of Conduct](CODE_OF_CONDUCT.md)
- Adhere to Alliance [Governance](GOVERNANCE.md) processes
- Maintain documentation
- Respond to issues and PRs in reasonable time
- Implement OpenECU Spec where applicable
- License under an OSI-approved open source license

## 5. Project Donation Process

### 5.1 Eligibility Criteria

To be considered for donation, a project must:

| Criterion | Requirement |
|-----------|-------------|
| **Relevance** | Related to ECU data, logging, tuning, or analysis |
| **Maturity** | Functional software with existing users |
| **License** | Open source (OSI-approved) or willing to relicense |
| **Quality** | Reasonable code quality, some documentation |
| **Maintenance** | Current owner willing to participate in transition |
| **Community Fit** | Aligns with Alliance mission and values |

### 5.2 Donation Steps

#### Step 1: Express Interest

Open a discussion in the OECUASpecs repository:

```
Title: [Project Donation] ProjectName

Project: [Name]
Repository: [URL]
Description: [What does it do?]
Users: [Approximate user base]
Why Alliance: [Why do you want to donate?]
```

#### Step 2: Initial Review

The Steering Committee reviews:
- Does the project fit Alliance scope?
- Is the project technically sound?
- Is there community interest?
- Are there any concerns?

Timeline: 2-4 weeks

#### Step 3: Due Diligence

If initial review passes:
- Code review for quality and security
- License verification
- Dependency audit
- Documentation review

The Alliance may request changes before proceeding.

#### Step 4: Community Discussion

30-day public comment period:
- Announced on Alliance channels
- Community can raise concerns
- Project owner answers questions

#### Step 5: Steering Committee Vote

Requires supermajority (2/3) approval.

Considerations:
- Community feedback
- Resource availability
- Strategic fit

#### Step 6: Transfer

If approved:
1. Repository transferred to OpenECU Alliance org
2. Project owner added as maintainer
3. CI/CD and infrastructure configured
4. Announcement published
5. Documentation updated

### 5.3 Transfer Agreement

Project owners sign a transfer agreement covering:
- Intellectual property assignment or license
- Trademark transfer (if applicable)
- Commitment to transition period
- Acknowledgment of Alliance governance

### 5.4 Post-Transfer

After transfer:
- Original owner typically becomes Lead Maintainer
- Additional maintainers recruited over time
- Project follows Alliance processes
- Regular status updates to Steering Committee

## 6. Project Lifecycle

### 6.1 Project States

| State | Description |
|-------|-------------|
| **Incubating** | New projects in evaluation period |
| **Active** | Fully maintained, accepting contributions |
| **Maintenance** | Bug fixes only, no new features |
| **Archived** | No longer maintained, read-only |

### 6.2 Incubation Period

New Alliance Projects enter a 6-month incubation:
- Evaluated for quality and community engagement
- May graduate to Active status
- May be archived if criteria not met

Graduation criteria:
- Active maintainers (2+ recommended)
- Passing CI/CD pipeline
- Documentation complete
- Community engagement demonstrated

### 6.3 Archiving Projects

Projects may be archived when:
- No maintainers available
- Technology obsolete
- Superseded by another project
- Community interest insufficient

Archived projects:
- Repository becomes read-only
- Documentation notes archived status
- Forks encouraged for continued development

## 7. Relationship to Spec-Compatible Applications

### 7.1 Comparison

| Aspect | Spec-Compatible | Alliance Project |
|--------|-----------------|------------------|
| Ownership | Independent | Alliance |
| Governance | Self-governed | Alliance governance |
| Maintenance | Owner's responsibility | Community responsibility |
| Branding | "Spec-Compatible" badge | "Alliance Project" badge |
| Requirements | Implement spec | Implement spec + Alliance processes |
| Support | Owner provides | Alliance community |

### 7.2 Upgrade Path

Spec-Compatible applications may become Alliance Projects by:
1. Following donation process above
2. Adopting Alliance governance
3. Transferring to Alliance org

This is entirely optional. Many excellent applications remain independently maintained.

### 7.3 Downgrade Path

Alliance Projects may leave the Alliance:
1. Request to Steering Committee
2. 90-day transition period
3. Repository forked or transferred back
4. Loses Alliance branding rights

## 8. Ecosystem Integration

### 8.1 Interoperability Expectations

Alliance Projects should:
- Implement OpenECU Spec for relevant functionality
- Provide import/export in standard formats
- Document integration points
- Collaborate with other Alliance Projects

### 8.2 Shared Resources

Alliance Projects may share:
- Adapter registry
- User forums
- Documentation site
- CI/CD infrastructure
- Analytics (privacy-respecting)

### 8.3 Cross-Project Collaboration

Encouraged collaborations:
- Shared libraries for common functionality
- Coordinated releases
- Joint documentation
- Combined user support

## 9. Funding and Resources

### 9.1 Alliance Resources

The Alliance may provide:
- GitHub organization membership
- CI/CD compute resources
- Domain and hosting (case-by-case)
- Documentation infrastructure

### 9.2 Project-Specific Funding

Individual projects may:
- Accept donations (disclosed)
- Apply for grants
- Receive sponsorships (disclosed)

All funding must be:
- Transparent
- Disclosed publicly
- Not create conflicts of interest
- Approved by Steering Committee (for large amounts)

### 9.3 Commercial Relationships

Alliance Projects may have commercial relationships if:
- Disclosed to community
- Do not compromise vendor neutrality
- Approved by Steering Committee
- Benefit the broader community

## 10. Current Alliance Projects

### 10.1 Official Projects

| Project | Description | Status |
|---------|-------------|--------|
| OECUASpecs | OpenECU Spec repository | Active |
| *(Future projects)* | | |

### 10.2 Spec-Compatible Applications

See [openecualliance.org/ecosystem](https://openecualliance.org/ecosystem) for a list of known Spec-Compatible applications.

---

## Appendix A: Transfer Agreement Template

```
OpenECU Alliance Project Transfer Agreement

Project: ____________________
Current Owner: ____________________
Date: ____________________

1. GRANT
   Owner grants OpenECU Alliance perpetual, irrevocable license
   to use, modify, and distribute the Project under [LICENSE].

2. REPRESENTATIONS
   Owner represents they have authority to make this transfer.

3. TRADEMARKS
   [Project name] trademark is [transferred/licensed] to Alliance.

4. TRANSITION
   Owner agrees to participate in transition for [X] months.

5. ACCEPTANCE
   Alliance accepts Project subject to its governance documents.

Signatures:
___________________________ (Owner)
___________________________ (Alliance Representative)
```

## Appendix B: Project Evaluation Rubric

| Criterion | Weight | Score (1-5) |
|-----------|--------|-------------|
| Technical Quality | 20% | |
| Documentation | 15% | |
| User Base | 15% | |
| Maintenance History | 15% | |
| Strategic Fit | 15% | |
| License Compatibility | 10% | |
| Security | 10% | |
| **Total** | 100% | |

Minimum passing score: 3.0 weighted average

## Appendix C: Contact

- Project donation inquiries: projects@openecualliance.org
- General questions: info@openecualliance.org
- GitHub Discussions: github.com/openecualliance/OECUASpecs/discussions
