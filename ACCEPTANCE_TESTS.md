# ACCEPTANCE TESTS — Phase 1

---

## A. Core Rules

### A1. Ads always map to sellpage
Given an ad is created  
Then it must have sellpage_id

### A2. Post ID immutability
Given an ad_post  
When attempting to change post_id  
Then reject

---

## B. Sellpage

### B1. Publish sellpage
Create product → sellpage → publish onepage  
Expect public URL works

---

## C. Creative Stack

### C1. Create assets
Upload video, text, thumbnail

### C2. Create stack
Combine v/t/b → stack belongs to ONE sellpage

---

## D. Ad Launch

### D1. Step 1
Create launch with strategy + sellpage

### D2. Step 2
Reuse existing post ID OR choose stack

### D3. Step 3
Submit → Meta entities created and mapped

---

## E. Care Camp

### E1. List campaigns
Filter by sellpage

### E2. Bulk pause
Pause multiple ads

### E3. Budget edit
Change budget only

---

## F. Metrics

### F1. Sync metrics
Trigger sync job

### F2. Dashboard numbers
Metrics roll up by sellpage
