# DATA MODEL — Phase 1
Version: 1.0

---

## 1. Core Entities

### org
- id (uuid)
- name
- created_at

### user
- id (uuid)
- email (unique)
- name

### membership
- org_id
- user_id
- role: ADMIN | LEADER | MEDIA | VIEWER

---

## 2. Product & Sellpage

### product
- id
- org_id
- code (internal shorthand)
- name
- status: ACTIVE | ARCHIVED

### sellpage
- id (IMMUTABLE)
- org_id
- product_id
- name
- version
- pixel_id
- status: DRAFT | PUBLISHED | PAUSED

---

## 3. Delivery (Onepage-first)

### sellpage_delivery
- id
- sellpage_id
- type: ONEPAGE
- domain
- path
- public_url
- status

---

## 4. Creatives

### creative_asset
- id
- product_id
- type: VIDEO | IMAGE | THUMBNAIL | ADTEXT
- version
- storage_url
- meta_json

### creative_stack
- id (IMMUTABLE)
- sellpage_id
- media_asset_id
- adtext_asset_id
- thumbnail_asset_id
- status

---

## 5. Ads Core

### ad_post
- id
- platform: FACEBOOK
- page_id
- post_id (IMMUTABLE)
- sellpage_id
- creative_stack_id

### facebook_ad_strategy
- id
- name
- config_json
- status

### ad_launch
- id
- strategy_id
- sellpage_id
- page_id
- ad_account_id
- pixel_id
- budget
- status

---

## 6. Metrics

### metrics_snapshot
- id
- date
- level: CAMPAIGN | ADSET | AD | POST | STACK | SELLPAGE
- ref_id
- sellpage_id
- spend
- revenue
- roas
- purchases
- raw_json

---

## 7. Immutability Rules
IMMUTABLE:
- sellpage.id
- creative_stack.id
- ad_post.post_id

MUTABLE:
- delivery
- UI
- strategy versions (new row only)
