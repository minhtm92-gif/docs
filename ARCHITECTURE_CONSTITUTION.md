# ARCHITECTURE CONSTITUTION
Project: Seller Ops & Ads Orchestrator (Selless-like)
Phase: 1
Status: ACTIVE — MUST FOLLOW

---

## 1. Purpose
This document defines non-negotiable architectural rules.
All code, AI-generated or human-written, MUST comply.

If a requirement conflicts with this document, THIS DOCUMENT WINS.

---

## 2. Core Mental Model

### 2.1 Profit Center
- Sellpage is the ONLY profit center.
- All ads, creatives, metrics, and orders MUST map to a sellpage_id.

### 2.2 Creative System
- Creatives are evaluated and scaled as a Creative Stack:
  - Media (video or image)
  - Ad Text
  - Thumbnail
- Never evaluate a single creative asset in isolation.

### 2.3 Ads Scaling
- Facebook Post ID is a reusable asset.
- Post ID is immutable once created.
- Scaling = reuse Post ID across new campaigns.

### 2.4 Strategy
- Facebook Ad Strategy is a preset template.
- Normal users CANNOT edit strategy logic.
- Strategy changes require new strategy versions.

### 2.5 Delivery vs Core
- Core entities are immutable.
- Delivery (domain, path, rendering) is mutable.
- Changing delivery must NOT affect ads or metrics.

---

## 3. Layered Architecture

### 3.1 Core Layer (Immutable)
- product
- sellpage
- creative_asset
- creative_stack
- ad_post
- ad_strategy
- metrics_snapshot

### 3.2 Delivery Layer (Mutable)
- onepage rendering
- domain / path
- checkout wiring

### 3.3 Integration Layer
- Meta (Facebook) API
- External IDs must always map back to core entities

---

## 4. Rules (Hard Constraints)

### 4.1 Data Integrity
- Every ad entity MUST map to a sellpage_id.
- Metrics without sellpage_id are INVALID.

### 4.2 Permissions
- Only ADMIN can:
  - Create/edit strategies
  - Add Meta resources (page, ad account, pixel)
- MEDIA / LEADER can:
  - Launch ads
  - Pause / resume
  - Change budget only

### 4.3 Bulk Operations
- Bulk edit is limited to:
  - Status (ON/OFF)
  - Budget
- Targeting, creative, attribution are FORBIDDEN in bulk.

---

## 5. AI Coding Rules
When using Codex or any AI:
- AI must follow DATA_MODEL.md and API_CONTRACT.md
- AI must not invent entities, flows, or shortcuts
- If unclear → AI must ask before coding

Violation = reject the code.
