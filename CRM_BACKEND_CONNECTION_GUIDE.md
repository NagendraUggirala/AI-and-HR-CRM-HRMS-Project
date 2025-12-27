# CRM Components - Backend Connection Guide

## 📋 Overview

This document explains in detail how the CRM frontend components (`client/src/components/CRM`) connect to the backend API, including base URLs, endpoint mappings, and the complete request flow.

---

## 🏗️ Architecture Overview

```
Frontend Component (JSX)
    ↓
API Utility Functions (utils/api.js)
    ↓
API Configuration (config/api.config.js)
    ↓
Backend API Endpoints (FastAPI)
    ↓
Database (PostgreSQL)
```

---

## 🔧 Configuration Files

### 1. **Base URL Configuration** (`client/src/config/api.config.js`)

**Location:** `client/src/config/api.config.js`

**Current Configuration:**
```javascript
export const BASE_URL = 'http://127.0.0.1:8000';
```

**Key Points:**
- ✅ **Hardcoded** to `http://127.0.0.1:8000` (development)
- ✅ Backend runs on port **8000** by default
- ⚠️ **No environment variable** support currently (commented out)
- 📝 For production, you can uncomment:
  ```javascript
  export const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  ```

---

### 2. **API Utility Functions** (`client/src/utils/api.js`)

**Location:** `client/src/utils/api.js`

**Purpose:** Centralized API communication layer

**Key Functions:**

#### `apiCall(endpoint, options)`
- **Purpose:** Generic function that makes all API calls
- **Features:**
  - ✅ Automatically prepends `BASE_URL` to endpoints
  - ✅ Adds JWT token from `localStorage` to Authorization header
  - ✅ Handles JSON parsing
  - ✅ Error handling and logging

**Example:**
```javascript
const response = await fetch(`${BASE_URL}${endpoint}`, config);
```

**Token Handling:**
```javascript
const getToken = () => localStorage.getItem('token');
// Token is added as: 'Authorization': `Bearer ${token}`
```

---

## 📁 CRM Component Files & Their Backend Connections

### 1. **Activities.jsx**

**File:** `client/src/components/CRM/Activities.jsx`

**Import:**
```javascript
import { activitiesAPI } from "../../utils/api";
```

**API Functions Used:**
- `activitiesAPI.list()` - Get all activities
- `activitiesAPI.create(activityData)` - Create new activity
- `activitiesAPI.update(id, activityData)` - Update activity
- `activitiesAPI.delete(id)` - Delete activity

**Backend Endpoints Called:**
```
GET    /api/crm/activities          → List all activities
POST   /api/crm/activities          → Create activity
GET    /api/crm/activities/{id}     → Get activity by ID
PUT    /api/crm/activities/{id}     → Update activity
DELETE /api/crm/activities/{id}     → Delete activity
```

**Backend Route:** `Backend/routers/CRM/activities.py`
**Registered in main.py as:** `prefix="/activities"` (⚠️ **MISMATCH** - see issue below)

---

### 2. **Contacts.jsx**

**File:** `client/src/components/CRM/Contacts.jsx`

**Import:**
```javascript
import { contactsAPI } from "../../utils/api";
```

**API Functions Used:**
- `contactsAPI.list()` - Get all contacts
- `contactsAPI.create(contactData)` - Create new contact
- `contactsAPI.update(id, contactData)` - Update contact
- `contactsAPI.delete(id)` - Delete contact

**Backend Endpoints Called:**
```
GET    /api/crm/contacts          → List all contacts
POST   /api/crm/contacts          → Create contact
GET    /api/crm/contacts/{id}      → Get contact by ID
PUT    /api/crm/contacts/{id}      → Update contact
DELETE /api/crm/contacts/{id}      → Delete contact
```

**Backend Route:** `Backend/routers/CRM/contacts.py`
**Registered in main.py as:** `prefix="/contacts"` (⚠️ **MISMATCH**)

---

### 3. **Companies.jsx**

**File:** `client/src/components/CRM/Companies.jsx`

**Import:**
```javascript
import { companiesAPI } from '../../utils/api';
```

**API Functions Used:**
- `companiesAPI.list()` - Get all companies
- `companiesAPI.create(companyData)` - Create new company
- `companiesAPI.update(id, companyData)` - Update company
- `companiesAPI.delete(id)` - Delete company

**Backend Endpoints Called:**
```
GET    /api/crm/companies          → List all companies
POST   /api/crm/companies          → Create company
GET    /api/crm/companies/{id}      → Get company by ID
PUT    /api/crm/companies/{id}      → Update company
DELETE /api/crm/companies/{id}      → Delete company
```

**Backend Route:** `Backend/routers/CRM/company.py`
**Registered in main.py as:** `prefix="/companies"` (⚠️ **MISMATCH**)

---

### 4. **Deals.jsx**

**File:** `client/src/components/CRM/Deals.jsx`

**Import:**
```javascript
import { dealsAPI } from "../../utils/api";
```

**API Functions Used:**
- `dealsAPI.list()` - Get all deals
- `dealsAPI.getById(id)` - Get deal by ID
- `dealsAPI.create(dealData)` - Create new deal
- `dealsAPI.update(id, dealData)` - Update deal
- `dealsAPI.delete(id)` - Delete deal

**Backend Endpoints Called:**
```
GET    /api/crm/deals          → List all deals
POST   /api/crm/deals          → Create deal
GET    /api/crm/deals/{id}      → Get deal by ID
PUT    /api/crm/deals/{id}      → Update deal
DELETE /api/crm/deals/{id}      → Delete deal
```

**Backend Route:** `Backend/routers/CRM/deals.py`
**Registered in main.py as:** `prefix="/deals"` (⚠️ **MISMATCH**)

---

### 5. **Leads.jsx**

**File:** `client/src/components/CRM/Leads.jsx`

**Import:**
```javascript
import { leadsAPI } from '../../utils/api';
```

**API Functions Used:**
- `leadsAPI.list()` - Get all leads
- `leadsAPI.create(leadData)` - Create new lead
- `leadsAPI.update(id, leadData)` - Update lead
- `leadsAPI.delete(id)` - Delete lead

**Backend Endpoints Called:**
```
GET    /api/crm/leads          → List all leads
POST   /api/crm/leads          → Create lead
GET    /api/crm/leads/{id}      → Get lead by ID
PUT    /api/crm/leads/{id}      → Update lead
DELETE /api/crm/leads/{id}      → Delete lead
```

**Backend Route:** `Backend/routers/CRM/leads.py`
**Registered in main.py as:** `prefix="/leads"` (⚠️ **MISMATCH**)

---

### 6. **Pipeline.jsx**

**File:** `client/src/components/CRM/Pipeline.jsx`

**Note:** This component appears to use different endpoints (recruitment pipeline, not CRM pipeline)

**Backend Endpoints:**
```
GET    /api/pipeline/stages          → Get pipeline stages
POST   /api/pipeline/stages          → Create stage
PATCH  /api/pipeline/stages/{id}     → Update stage
DELETE /api/pipeline/stages/{id}     → Delete stage
```

---

### 7. **Analytics.jsx**

**File:** `client/src/components/CRM/Analytics.jsx`

**Import:**
```javascript
import { contactsAPI, leadsAPI, dealsAPI, companiesAPI } from "../../utils/api";
```

**Uses Multiple APIs:**
- Fetches data from contacts, leads, deals, and companies APIs
- Combines data for analytics dashboard

---

## ⚠️ **CRITICAL ISSUE: URL Mismatch**

### Problem

**Frontend expects:**
```
/api/crm/contacts
/api/crm/companies
/api/crm/activities
/api/crm/deals
/api/crm/leads
```

**Backend provides:**
```
/contacts
/companies
/activities
/deals
/leads
```

### Current Backend Registration (main.py lines 197-203)

```python
app.include_router(contacts.router, prefix="/contacts", tags=["contacts"])
app.include_router(company.router, prefix="/companies", tags=["companies"])
app.include_router(deals.router, prefix="/deals", tags=["deals"])
app.include_router(leads.router, prefix="/leads", tags=["leads"])
app.include_router(pipelines.router, prefix="/pipelines", tags=["pipelines"])
app.include_router(activities.router, prefix="/activities", tags=["activities"])
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
```

### Solution Options

**Option 1: Fix Backend (Recommended)**
Update `Backend/main.py` to add `/api/crm` prefix:

```python
app.include_router(contacts.router, prefix="/api/crm/contacts", tags=["contacts"])
app.include_router(company.router, prefix="/api/crm/companies", tags=["companies"])
app.include_router(deals.router, prefix="/api/crm/deals", tags=["deals"])
app.include_router(leads.router, prefix="/api/crm/leads", tags=["leads"])
app.include_router(activities.router, prefix="/api/crm/activities", tags=["activities"])
app.include_router(analytics.router, prefix="/api/crm/analytics", tags=["analytics"])
```

**Option 2: Fix Frontend**
Update `client/src/utils/api.js` to remove `/api/crm` prefix:

```javascript
// Change from:
list: () => apiCall('/api/crm/contacts'),
// To:
list: () => apiCall('/contacts'),
```

---

## 🔄 Complete Request Flow Example

### Example: Creating a Contact

1. **User Action:** User fills form and clicks "Save" in `Contacts.jsx`

2. **Component Code:**
   ```javascript
   await contactsAPI.create(contactData);
   ```

3. **API Utility (`utils/api.js`):**
   ```javascript
   apiCall('/api/crm/contacts', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(contactData)
   })
   ```

4. **Full URL Construction:**
   ```javascript
   BASE_URL + endpoint
   = 'http://127.0.0.1:8000' + '/api/crm/contacts'
   = 'http://127.0.0.1:8000/api/crm/contacts'
   ```

5. **HTTP Request:**
   ```http
   POST http://127.0.0.1:8000/api/crm/contacts
   Authorization: Bearer <jwt_token>
   Content-Type: application/json
   
   {
     "name": "John Doe",
     "email": "john@example.com",
     ...
   }
   ```

6. **Backend Route Handler:**
   - `Backend/routers/CRM/contacts.py` → `create_contact()`
   - Processes request
   - Saves to database
   - Returns response

7. **Response:**
   ```json
   {
     "id": 1,
     "name": "John Doe",
     "email": "john@example.com",
     ...
   }
   ```

---

## 🔐 Authentication Flow

### Token Storage
- JWT token stored in `localStorage` with key `'token'`
- Retrieved by: `localStorage.getItem('token')`

### Token Usage
- Automatically added to all API requests via `apiCall()` function
- Header format: `Authorization: Bearer <token>`

### Login Flow
1. User submits credentials via `authAPI.login(email, password)`
2. Backend validates and returns JWT token
3. Frontend stores token: `localStorage.setItem('token', token)`
4. Subsequent API calls include token automatically

---

## 📊 API Endpoint Summary

| Component | Frontend API Call | Expected URL | Actual Backend URL | Status |
|-----------|------------------|--------------|-------------------|--------|
| Activities | `activitiesAPI.list()` | `/api/crm/activities` | `/activities` | ❌ Mismatch |
| Contacts | `contactsAPI.list()` | `/api/crm/contacts` | `/contacts` | ❌ Mismatch |
| Companies | `companiesAPI.list()` | `/api/crm/companies` | `/companies` | ❌ Mismatch |
| Deals | `dealsAPI.list()` | `/api/crm/deals` | `/deals` | ❌ Mismatch |
| Leads | `leadsAPI.list()` | `/api/crm/leads` | `/leads` | ❌ Mismatch |
| Analytics | Multiple APIs | `/api/crm/*` | `/*` | ❌ Mismatch |

---

## ✅ Recommendations

1. **Fix URL Mismatch:** Update backend routes to include `/api/crm` prefix
2. **Add Environment Variables:** Use `REACT_APP_API_URL` for different environments
3. **Add Error Handling:** Improve error messages in components
4. **Add Loading States:** Better UX during API calls
5. **Add Request Interceptors:** For logging/debugging API calls

---

## 🧪 Testing the Connection

### Test Backend Endpoint
```bash
curl http://127.0.0.1:8000/api/test
```

### Test CRM Endpoint (after fix)
```bash
curl http://127.0.0.1:8000/api/crm/contacts
```

### Test with Authentication
```bash
curl -H "Authorization: Bearer <token>" http://127.0.0.1:8000/api/crm/contacts
```

---

## 📝 Summary

- **Base URL:** `http://127.0.0.1:8000` (hardcoded in `api.config.js`)
- **All CRM components** use centralized API functions from `utils/api.js`
- **Authentication** handled automatically via JWT tokens
- **⚠️ URL Mismatch:** Frontend expects `/api/crm/*` but backend provides `/*`
- **Fix Required:** Update backend route prefixes in `main.py`

