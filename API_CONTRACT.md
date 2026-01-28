# API CONTRACT — Phase 1
Base URL: /api
Auth: JWT
Org is inferred from token.

---

## Products
GET /products  
POST /products  
PATCH /products/:id  

---

## Sellpages
GET /sellpages  
POST /sellpages  
PATCH /sellpages/:id  
PUT /sellpages/:id/content  
POST /sellpages/:id/publish  

---

## Creatives
GET /creatives/assets  
POST /creatives/assets  

GET /creatives/stacks  
POST /creatives/stacks  

---

## Facebook Strategies
GET /ads/facebook/strategies  
POST /ads/facebook/strategies (ADMIN)

---

## Ad Launch (Wizard)

POST /ads/facebook/launches  
PUT /ads/facebook/launches/:id/slots  
POST /ads/facebook/launches/:id/submit  

---

## Ads Manager (Care Camp)

GET /ads/facebook/manager/campaigns  
PATCH /ads/facebook/manager/bulk  

Bulk PATCH allowed:
- status
- budget ONLY
