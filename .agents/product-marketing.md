# Product Marketing Context

**Document version:** v1
**Last updated:** 2026-10-16

## Product Overview
**One-liner:** BQS software for marine surveyors — capture, calculate, issue locked certificates.
**What it does:** Web platform + offline mobile app that takes bunker survey readings (ullage/sounding, temperature, free water) through a fixed ASTM D1250 Table 54B calculation (engine v1.0.0) into locked PDF certificates and Excel breakdowns, with a searchable fleet register and dashboard.
**Product category:** Bunker quantity survey software / marine survey software.
**Product type:** B2B SaaS (web + mobile).
**Business model:** Team license by surveyors and monthly volume. No public prices — "talk to us". Demo → pilot workspace → license.

## Target Audience
**Target companies:** Marine survey firms running BQS work; superintendents/fleet managers and bunker buyers/charterers are indirect beneficiaries (receive proof, no login).
**Decision-makers:** Survey company owners, ops managers (buy); team leads (evaluate method); IT/data evaluators (vet security/API).
**Primary use case:** Produce defensible quantity records for bunker deliveries, ROB on/off-hire, and debunkering without retyping or spreadsheet risk.
**Jobs to be done:**
- Record readings once on deck, even offline, and never retype them.
- Show every correction and its source so any number can be explained.
- Issue consistent locked reports in minutes that clients forward.
**Use cases:**
- Bunker delivery attendance record (before/after, BDN cross-check).
- ROB at charter start/end for settlement packet.
- Debunkering removal record.

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---|---|---|---|
| Surveyor on deck | Few taps, offline, no rework | Poor signal, awkward conditions | Scan QR, 3 steps, autosave, offline calc |
| Team lead | Correct method, no blame | Disputes over numbers | Fixed order, audit trail, review before complete |
| Ops manager / owner | Cost, adoption, audit exposure | Lost reports, spreadsheet risk | One register, roles, locked finals |
| Superintendent / buyer (indirect) | Fair settlement | Shortfalls, supplier disputes | Dated certificate + Excel with method |
| IT evaluator | Data handling, access | Unknown controls | Tenancy, JWT/roles, API keys, audit |

## Problems & Pain Points
**Core problem:** A $1M fuel delivery happens thousands of miles from the buyer's office; without an independent measured record, shortages and disputes come down to opinions.
**Why alternatives fall short:** Spreadsheets get retyped and edited; generic LIMS suites are built for labs, not deck capture; paper notes get lost.
**What it costs them:** Rework, claim losses, management time, client trust.
**Emotional tension:** Being blamed for a number you cannot explain.

## Competitive Landscape
**Direct:** BQS modules inside LIMS suites (Labsols/Bitwave marine BQS) — lab-centric, not deck-first.
**Secondary:** Full TIC giants (Viswa Group) with service + BFM analytics — they perform surveys; we arm survey firms.
**Indirect:** Spreadsheets, paper notebooks, generic forms.
**How each falls short:** Labs tools don't work offline on deck; service giants don't sell software to independent firms; spreadsheets have no lock or audit.

## Differentiation
**Key differentiators:**
- Offline-first mobile with vessel-QR start and Ship-Fuel-Tanks wizard.
- Deterministic v1.0.0 engine with per-line audit (table ID/revision/method/flags), no extrapolation.
- Locked finalised state; role-gated completion; AI analysis with stated limits.
- Webhooks/x-api-key/MCP/agent integration surface.
**How we do it differently:** One record from first sounding to final report — capture, calculation and certificate share the same data, no retyping.
**Why that's better:** Fewer errors, faster reports, defensible numbers.
**Why customers choose us:** Built for surveyors, not adapted from lab software.

## Objections
| Objection | Response |
|---|---|
| We already use spreadsheets | Spreadsheets can be edited after issue; Space finals lock and show method per line. Pilot one vessel to compare. |
| Our LIMS does BQS | Lab suites track samples, not deck capture. We work offline with QR start and sync later. |
| What about quality testing? | Out of scope — quantity-only. Your reports stay clean inputs for labs. |
| Photos/signatures? | Roadmap, not live. Certificates carry method + version today. |
| Price? | Team license by surveyors and volume — talk to us after the demo. |

**Anti-persona:** Labs needing quality testing; owners wanting a survey vendor to attend vessels (we never attend).

## Switching Dynamics
**Push:** Claim pain, spreadsheet errors, lost notes, client pressure for audit trails.
**Pull:** Offline app, locked reports, fleet register, API.
**Habit:** Familiar spreadsheets; LIMS contracts.
**Anxiety:** Adoption by field teams; data migration of tank tables. Answer: pilot workspace + master-data import.

## Customer Language
**How they describe the problem:**
- "Did we get what we paid for?"
- "The BDN says X, we measured Y."
**How they describe us:**
- "One record from sounding to report."
**Words to use:** sounding, ullage, ROB, BDN, locked, audit trail, temperature-corrected MT.
**Words to avoid:** revolutionary, game-changing, certified, guaranteed, 100% accurate, zero disputes.
**Glossary:** See `/resources/glossary-10-terms`.

## Brand Voice
**Tone:** Precise, calm, audit-grade.
**Style:** Short, verb-first. Outcome, mechanism, proof.
**Personality:** Exact, honest, measured, helpful.

## Proof Points
**Metrics:** Engine v1.0.0; worked check 0.9500 @ 40°C → VCF 0.9677 → 457.819 MT. No customer metrics claimed yet.
**Customers:** Early adopters — names on request. No logos without permission.
**Testimonials:** None yet — customers section stays honest.
**Value themes:**
| Theme | Proof |
|---|---|
| Traceability | Per-line table ID/revision/method/flags; locked finals |
| Field-ready | 72 h offline lease; QR start; autosave |
| Speed | Live preview; reports in minutes; register search |

## Goals
**Business goal:** Survey firms running paid pilots.
**Conversion action:** Request a demo (`demo_submit`); secondary: sample report view.
**Current metrics:** Pre-launch. Track `cta_click`, `demo_submit`, `sample_report_view`, `scroll_beat_view` via dataLayer.

## Changelog
- v1 (2026-10-16) — Initial context.
