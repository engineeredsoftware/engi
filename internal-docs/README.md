# Engi Internal Documentation

**GA-1 Production Readiness Documentation**

Note:
- GA-1 Tracking: `GA1-PRODUCTION-READINESS-TRACKING.md` is the sole authoritative tracking document.
- All other documents here are reference documentation.
- GA-2 scope (measure, obfuscate pipelines and related features) is explicitly out of scope for GA-1 and not counted in GA-1 metrics.

## 🚀 GA-1 Status

Production readiness targeting early 2025.
- PromptParts (measured): 1324 typed exports in `packages/prompts/src/raw_promptparts/*`
- Deliverables agent keys (phase-prefixed, measured): setup 17, discovery 19, implementation 12, validation 17, shipping 12 (≈98 total registrations across variants)
- Database tables (measured): 37 (see DB.md for list and notes)
- **PTRR** (Plan-Try-Refine-Retry) agent methodology
- **SDIVS** (Setup-Discovery-Implementation-Validation-Shipping) pipeline pattern
- **Security audit complete** - fixes to be applied LAST before ship

## 📚 Core Documentation

### Architecture & Engineering

#### 1. **[PHILOSOPHY-AND-VISION.md](./PHILOSOPHY-AND-VISION.md)**
The vision and principles that guide Engi.
- Vision Overview
- Core Thesis
- Core engineering principles
- AI development philosophy

#### 2. **[AI Engineering Transformation (AGENTS.md)](../AGENTS.md)**
AI engineering transformation document.
- Core transformation principles
- Word precision requirements
- RAQK format for responses
- Delete-first philosophy
- Common technical pitfalls

#### 3. **[PROMPT-ENGINEERING.md](./PROMPT-ENGINEERING.md)**
GA-1 production prompt system.
- Two-layer architecture: PromptParts and Prompts
- Performance-Based Versioning (PBV)
- Coverage and quality tracked via PBV; avoid unverified counts
- Benchmarking and evolution

#### 4. **[EXECUTABLE-PIPELINES.md](./EXECUTABLE-PIPELINES.md)**
Pipeline implementations documentation (source-verified). Focuses on GA-1 deliverables pipeline; other pipelines are GA-2 reference only.
- SDIVS pattern implementation
- Agent architecture with PTRR
- OTF system integration

#### 5. **[DOC-CODING.md](./DOC-CODING.md)**
Doc-comments as prompts system.
- AST transformation
- Pattern library
- Best practices
- Advanced techniques

### System Components

#### 6. **[API.md](./API.md)**
RESTful API and client-side data management.
- Endpoint specifications
- GA-1 active vs post-GA-1 (501) endpoints
- React Query integration
- Stripe payments
- SSE streaming

#### 7. **[DB.md](./DB.md)**
Database architecture.
- Migration strategy (001_ga1_schema.sql)
- Row Level Security patterns
- Schema documentation

#### 8. **[DELIVERABLES.md](./DELIVERABLES.md)**
Deliverables system documentation.
- Core product feature
- Pipeline execution interface
- Credit consumption model
- User workflow

#### 9. **[CHAT.md](./CHAT.md)**
Conversation chat interface documentation.
- Temporarily disabled (NEXT_PUBLIC_CONVERSATIONS_WIDGET=false)
- ConversationAgent with PTRR pattern

#### 10. **[INTEGRATIONS.md](./INTEGRATIONS.md)**
External service integrations.
- VCS providers (GitHub, GitLab, Bitbucket)
- MCP tools (AWS, Figma, Notion, Vercel, etc.)
- Provider abstraction patterns
- Tool architecture and configuration

### Infrastructure & Security

#### 11. **[SECURITY.md](./SECURITY.md)** 🚨 **CRITICAL**
Security audit findings - MUST FIX BEFORE GA-1.
- Hardcoded secrets in version control
- JWT validation insufficient
- SQL injection vulnerabilities
- No rate limiting
- CSRF protection missing
- **Fix LAST before ship**

#### 12. **[DEPLOYMENT.md](./DEPLOYMENT.md)**
Deployment configuration guide.
- Environment variables documentation
- OAuth provider setup
- Security best practices
- Common issues

#### 13. **[PERFORMANCE.md](./PERFORMANCE.md)**
Performance optimization guide.
- App performance guidance (network, JS, rendering)
- React Query integration
- CSS performance patterns
- Network optimization

### User Experience

#### 14. **[USER-ONBOARDING-AND-SETTINGS.md](./USER-ONBOARDING-AND-SETTINGS.md)**
User onboarding and authentication.
- 4-step onboarding flow
- SSO implementation (Google & GitHub OAuth)
- Settings management
- Authentication architecture

### Project Management

#### 15. **[GA1-PRODUCTION-READINESS-TRACKING.md](./GA1-PRODUCTION-READINESS-TRACKING.md)**
GA-1 launch tracking.
- Launch checklist
- Progress tracking
- Known issues
- Team updates

#### 16. **[TERMINOLOGY.md](./TERMINOLOGY.md)**
Complete terminology reference.
- System terminology
- Architecture concepts
- Domain-specific terms
- Naming conventions

#### 17. **[CRAZY-IDEAS.md](./CRAZY-IDEAS.md)** 📝
Archive of experimental concepts.
- SIENT - Synthetic Engineering Intelligence (abandoned)
- Field-Doc System (abandoned)
- Other experimental ideas that didn't ship
- Lessons learned from overengineering

## 🚨 GA-1 Critical Path

1. **Complete all feature work**
2. **Fix all P0 bugs**
3. **SECURITY FIXES LAST** (see [SECURITY.md](./SECURITY.md))
4. **Deploy to production**

## 🎯 Quick Start Guide

### For Different Roles

- **New to Engi?** → [PHILOSOPHY-AND-VISION.md](./PHILOSOPHY-AND-VISION.md)
- **AI Engineer?** → [AI Engineering Transformation (AGENTS.md)](../AGENTS.md)
- **Understanding Architecture?** → [EXECUTABLE-PIPELINES.md](./EXECUTABLE-PIPELINES.md)
- **Working with Prompts?** → [PROMPT-ENGINEERING.md](./PROMPT-ENGINEERING.md)
- **API Development?** → [API.md](./API.md)
- **Database Work?** → [DB.md](./DB.md)
- **Security Concerns?** → [SECURITY.md](./SECURITY.md) 🚨
- **Performance Issues?** → [PERFORMANCE.md](./PERFORMANCE.md)
- **Frontend Components/Styles?** → [STYLE.md](./STYLE.md)

### Frontend Quickstart (2‑minute ramp)

- Import UI only from `@/components/base/shadcn/*`; import Engi primitives from `@/components/base/engi/*`.
- Use `ScrollContainer` for scroll regions; add a themed variant (`custom-scrollbar--thumb-purple` / `-emerald` / `-blue`).
- Wrap heavy/animated containers: `GPUAcceleration`; wrap large off‑screen content: `ContentVisibility`.
- Keep shared CSS in `app/styles/components.css`; don’t redefine scrollbars in feature CSS.
- Headers stay neutral. Render doc/cards as siblings via flags: `renderDocInsideHeader`, `renderCardsInsideHeader`.
- **External Integrations?** → [INTEGRATIONS.md](./INTEGRATIONS.md)
- **Deployment?** → [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📝 Documentation Standards

All documentation follows these principles:

1. **Accuracy** - Verified against source code
2. **Clarity** - Clear structure and navigation
3. **Completeness** - All concepts covered
4. **Maintainability** - Single source of truth
5. **Excellence** - Engineering-grade documentation

## 🔄 Recent Updates

- Renamed and reorganized all documentation for clarity
- Merged redundant documents (ENGI-MASTER-GUIDE, SSO, REACT-QUERY-SETUP)
- Added comprehensive MCP tools documentation
- Updated for GA-1 production readiness
- Consolidated authentication and onboarding documentation

## 📊 Documentation Coverage

| Area | Status | Document |
|------|--------|----------|
| Architecture | ✅ Complete | EXECUTABLE-PIPELINES.md |
| Prompts | ✅ Complete | PROMPT-ENGINEERING.md |
| API | ✅ Complete | API.md |
| Database | ✅ Complete | DB.md |
| Security | ✅ Audit Complete | SECURITY.md |
| Performance | ✅ Optimized | PERFORMANCE.md |
#### 18. **[STYLE.md](./STYLE.md)**
Frontend components + styling SSOT (GA‑1).
- Base layers: `components/base/{engi,shadcn}`
- Styling SSOT: `app/styles/components.css`
- Performance wrappers, ScrollContainer usage
- Header composition with sibling panels

| Integrations | ✅ Documented | INTEGRATIONS.md |
| Deployment | ✅ Ready | DEPLOYMENT.md |
| User Experience | ✅ Complete | USER-ONBOARDING-AND-SETTINGS.md |

---

*Last Updated: 2025-09-03*
*Version: GA‑1 Stable/Latest*
*Status: Production Documentation*
