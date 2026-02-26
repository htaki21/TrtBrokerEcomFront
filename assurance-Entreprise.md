# Assurance Entreprise Lead API Documentation

## Overview

This API handles business insurance lead management for the TRT Broker platform. It provides endpoints for creating, managing, and tracking business insurance leads with a 3-step form flow.

## Base URL

```
https://backoffice.trtbroker.com/api
```

## Table of Contents

- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Content Type](#content-type)
- [Endpoints](#endpoints)
- [Request/Response Examples](#requestresponse-examples)
- [Validation Rules](#validation-rules)
- [Status Values](#status-values)
- [Error Handling](#error-handling)
- [Frontend Integration](#frontend-integration)
- [Recent Updates](#recent-updates)

## Authentication

All endpoints are publicly accessible (no authentication required).

## Content Type

**Content Type**: `assurance-entreprise-lead`  
**Collection Name**: `assurance_entreprise_leads`  
**Display Name**: Assurance Entreprise Lead

## Endpoints

### 1. Standard CRUD Endpoints

#### GET /api/assurance-entreprise-leads

Retrieve all business insurance leads with pagination and filtering.

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `pageSize` (number): Items per page (default: 25)
- `sort` (string): Sort field (default: "createdAt:desc")
- `filters` (object): Filter criteria

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "secteurActivite": "btp",
        "categoriesAssurance": "rc_dirigeants_mandataires, multirisques_locaux",
        "nomStructure": "Deadline Construction",
        "ville": "Casablanca",
        "nom": "TAKI",
        "prenom": "HOUCINE",
        "telephone": "0656740701",
        "email": "contact@deadline.ma",
        "datePreference": "2025-09-15",
        "creneauHoraire": "10:00 – 10:30",
        "conditions": true,
        "optMarketing": false,
        "ipAddress": "192.168.1.1",
        "userAgent": "Mozilla/5.0...",
        "source": "website",
        "status": "new",
        "notes": null,
        "createdAt": "2025-09-11T21:00:00.000Z",
        "updatedAt": "2025-09-11T21:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    },
    "totalLeads": 1
  }
}
```

#### GET /api/assurance-entreprise-leads/:id

Retrieve a specific business insurance lead by ID.

**Response:**

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "secteurActivite": "btp",
      "categoriesAssurance": "rc_dirigeants_mandataires, multirisques_locaux",
      "nomStructure": "Deadline Construction",
      "ville": "Casablanca",
      "nom": "TAKI",
      "prenom": "HOUCINE",
      "telephone": "0656740701",
      "email": "contact@deadline.ma",
      "datePreference": "2025-09-15",
      "creneauHoraire": "10:00 – 10:30",
      "conditions": true,
      "optMarketing": false,
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "source": "website",
      "status": "new",
      "notes": null,
      "createdAt": "2025-09-11T21:00:00.000Z",
      "updatedAt": "2025-09-11T21:00:00.000Z"
    }
  }
}
```

#### POST /api/assurance-entreprise-leads

Create a new business insurance lead.

**Request Body:**

```json
{
  "data": {
    "secteurActivite": "btp",
    "categoriesAssurance": "rc_dirigeants_mandataires, multirisques_locaux",
    "nomStructure": "Deadline Construction",
    "ville": "Casablanca",
    "nom": "TAKI",
    "prenom": "HOUCINE",
    "telephone": "0656740701",
    "email": "contact@deadline.ma",
    "datePreference": "2025-09-15",
    "creneauHoraire": "10:00 – 10:30",
    "conditions": true,
    "optMarketing": false,
    "source": "website"
  }
}
```

**Response:**

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "secteurActivite": "btp",
      "categoriesAssurance": "rc_dirigeants_mandataires, multirisques_locaux",
      "nomStructure": "Deadline Construction",
      "ville": "Casablanca",
      "nom": "TAKI",
      "prenom": "HOUCINE",
      "telephone": "0656740701",
      "email": "contact@deadline.ma",
      "datePreference": "2025-09-15",
      "creneauHoraire": "10:00 – 10:30",
      "conditions": true,
      "optMarketing": false,
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "source": "website",
      "status": "new",
      "notes": null,
      "createdAt": "2025-09-11T21:00:00.000Z",
      "updatedAt": "2025-09-11T21:00:00.000Z"
    }
  }
}
```

#### PUT /api/assurance-entreprise-leads/:id

Update an existing business insurance lead.

#### DELETE /api/assurance-entreprise-leads/:id

Delete a business insurance lead.

### 2. Custom Form Endpoints

#### POST /api/assurance-entreprise-leads/submit

Submit a completed business insurance form (same as POST /api/assurance-entreprise-leads).

#### POST /api/assurance-entreprise-leads/save-draft

Save a draft business insurance form.

**Request Body:**

```json
{
  "data": {
    "secteurActivite": "btp",
    "categoriesAssurance": "rc_dirigeants_mandataires",
    "nomStructure": "Deadline Construction",
    "ville": "Casablanca",
    "nom": "TAKI",
    "prenom": "HOUCINE",
    "telephone": "0656740701",
    "email": "contact@deadline.ma",
    "datePreference": "2025-09-15",
    "creneauHoraire": "10:00 – 10:30",
    "conditions": true,
    "optMarketing": false,
    "source": "website"
  }
}
```

**Response:**

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "secteurActivite": "btp",
      "categoriesAssurance": "rc_dirigeants_mandataires",
      "nomStructure": "Deadline Construction",
      "ville": "Casablanca",
      "nom": "TAKI",
      "prenom": "HOUCINE",
      "telephone": "0656740701",
      "email": "contact@deadline.ma",
      "datePreference": "2025-09-15",
      "creneauHoraire": "10:00 – 10:30",
      "conditions": true,
      "optMarketing": false,
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "source": "website",
      "status": "draft",
      "notes": null,
      "createdAt": "2025-09-11T21:00:00.000Z",
      "updatedAt": "2025-09-11T21:00:00.000Z"
    }
  }
}
```

#### GET /api/assurance-entreprise-leads/form-options

Get form options for the frontend.

**Response:**

```json
{
  "secteurActivite": [
    { "value": "btp", "label": "BTP (Building and Public Works)" },
    { "value": "commerce", "label": "Commerce (Trade/Retail)" },
    {
      "value": "services_conseil",
      "label": "Services / Conseil (Services / Consulting)"
    },
    { "value": "hotellerie", "label": "Hôtellerie (Hospitality)" },
    { "value": "industrie", "label": "Industrie (Industry)" },
    { "value": "energie", "label": "Energie (Energy)" },
    { "value": "transport", "label": "Transport (Transport)" }
  ],
  "categoriesAssurance": [
    {
      "value": "maladie_base",
      "label": "Maladie de Base (Basic Health Insurance)"
    },
    {
      "value": "assistance_medicale",
      "label": "Assistance Médicale (Medical Assistance)"
    },
    {
      "value": "retraite_complementaire",
      "label": "Retraite Complémentaire (Supplementary Retirement)"
    },
    {
      "value": "accident_travail",
      "label": "Accident de travail (Work Accident)"
    },
    { "value": "flotte_automobile", "label": "Flotte automobile (Car Fleet)" },
    {
      "value": "multirisques_locaux",
      "label": "Multirisques Locaux (Multi-risk Premises)"
    },
    {
      "value": "rc_dirigeants_mandataires",
      "label": "RC Dirigeants/Mandataires (Directors' and Officers' Liability)"
    },
    {
      "value": "transport_marchandises",
      "label": "Transport Marchandises (Goods Transport)"
    },
    {
      "value": "rc_exploitation",
      "label": "RC Exploitation (Operating Liability)"
    }
  ]
}
```

## Request/Response Examples

### Complete Form Submission

```bash
curl -X POST https://backoffice.trtbroker.com/api/assurance-entreprise-leads/submit \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "secteurActivite": "btp",
      "categoriesAssurance": "rc_dirigeants_mandataires, multirisques_locaux, flotte_automobile",
      "nomStructure": "Deadline Construction",
      "ville": "Casablanca",
      "nom": "TAKI",
      "prenom": "HOUCINE",
      "telephone": "0656740701",
      "email": "contact@deadline.ma",
      "datePreference": "2025-09-15",
      "creneauHoraire": "10:00 – 10:30",
      "conditions": true,
      "optMarketing": false,
      "source": "website"
    }
  }'
```

### Draft Save

```bash
curl -X POST https://backoffice.trtbroker.com/api/assurance-entreprise-leads/save-draft \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "secteurActivite": "commerce",
      "categoriesAssurance": "maladie_base",
      "nomStructure": "Deadline Commerce",
      "ville": "Rabat",
      "nom": "SMITH",
      "prenom": "JOHN",
      "telephone": "0661234567",
      "email": "john@deadline.ma",
      "conditions": true,
      "optMarketing": true,
      "source": "website"
    }
  }'
```

### Get Form Options

```bash
curl -X GET https://backoffice.trtbroker.com/api/assurance-entreprise-leads/form-options
```

## Validation Rules

### Required Fields

- `secteurActivite` - Must be one of the valid business sectors
- `categoriesAssurance` - Must be a comma-separated string with at least one valid category
- `nomStructure` - Company name (max 255 characters)
- `ville` - City (max 100 characters)
- `nom` - Last name (max 100 characters)
- `prenom` - First name (max 100 characters)
- `telephone` - Phone number (max 20 characters, basic format validation)
- `email` - Valid email format (max 255 characters)
- `conditions` - Must be `true` (terms acceptance required)

### Optional Fields

- `datePreference` - Date in YYYY-MM-DD format
- `creneauHoraire` - Free text input (max 50 characters)
- `optMarketing` - Boolean (default: false)
- `source` - String (max 100 characters, default: "website")
- `notes` - Text field for internal notes

### Field Validation

#### secteurActivite

**Type**: Enumeration (single selection)  
**Required**: Yes  
**Valid Values**:

- `btp` - BTP (Building and Public Works)
- `commerce` - Commerce (Trade/Retail)
- `services_conseil` - Services / Conseil (Services / Consulting)
- `hotellerie` - Hôtellerie (Hospitality)
- `industrie` - Industrie (Industry)
- `energie` - Energie (Energy)
- `transport` - Transport (Transport)

#### categoriesAssurance

**Type**: String (comma-separated)  
**Required**: Yes  
**Format**: Comma-separated string of valid categories  
**Valid Values**:

- `maladie_base` - Maladie de Base (Basic Health Insurance)
- `assistance_medicale` - Assistance Médicale (Medical Assistance)
- `retraite_complementaire` - Retraite Complémentaire (Supplementary Retirement)
- `accident_travail` - Accident de travail (Work Accident)
- `flotte_automobile` - Flotte automobile (Car Fleet)
- `multirisques_locaux` - Multirisques Locaux (Multi-risk Premises)
- `rc_dirigeants_mandataires` - RC Dirigeants/Mandataires (Directors' and Officers' Liability)
- `transport_marchandises` - Transport Marchandises (Goods Transport)
- `rc_exploitation` - RC Exploitation (Operating Liability)

**Examples**:

- Single category: `"rc_dirigeants_mandataires"`
- Multiple categories: `"rc_dirigeants_mandataires, multirisques_locaux, flotte_automobile"`

#### creneauHoraire

**Type**: String (free text)  
**Required**: No  
**Max Length**: 50 characters  
**Description**: Preferred time slot - free text input from frontend  
**Examples**: `"10:00 – 10:30"`, `"Afternoon"`, `"Morning"`

## Status Values

- `new` - Newly created lead (default)
- `contacted` - Lead has been contacted
- `qualified` - Lead has been qualified
- `converted` - Lead has been converted to customer
- `rejected` - Lead has been rejected
- `draft` - Draft lead (saved but not submitted)

## Error Handling

### Common Error Responses

#### 400 Bad Request

```json
{
  "error": {
    "status": 400,
    "name": "BadRequest",
    "message": "secteurActivite is required"
  }
}
```

#### 400 Validation Error

```json
{
  "error": {
    "status": 400,
    "name": "BadRequest",
    "message": "Invalid secteurActivite value"
  }
}
```

#### 400 Categories Validation

```json
{
  "error": {
    "status": 400,
    "name": "BadRequest",
    "message": "At least one insurance category must be selected"
  }
}
```

#### 500 Internal Server Error

```json
{
  "error": {
    "status": 500,
    "name": "InternalServerError",
    "message": "Failed to create lead"
  }
}
```

## Frontend Integration

### Form Flow Implementation

#### Step 1: Business Sector Selection

```javascript
// User must select exactly one business sector
const secteurActivite = "btp"; // Required, single selection
```

#### Step 2: Insurance Categories Selection

```javascript
// User can select multiple categories (minimum 1, maximum all)
const categoriesAssurance = "rc_dirigeants_mandataires, multirisques_locaux"; // Required, comma-separated string
```

#### Step 3: Contact Information Form

```javascript
const formData = {
  secteurActivite: "btp",
  categoriesAssurance: "rc_dirigeants_mandataires, multirisques_locaux",
  nomStructure: "Deadline Construction",
  ville: "Casablanca",
  nom: "TAKI",
  prenom: "HOUCINE",
  telephone: "0656740701",
  email: "contact@deadline.ma",
  datePreference: "2025-09-15",
  creneauHoraire: "10:00 – 10:30", // Free text input
  conditions: true, // Required
  optMarketing: false, // Optional
  source: "website",
};
```

### API Integration Examples

#### Submit Complete Form

```javascript
const submitForm = async (formData) => {
  try {
    const response = await fetch(
      "https://backoffice.trtbroker.com/api/assurance-entreprise-leads/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("Lead created:", result.data);
      return result.data;
    } else {
      const error = await response.json();
      console.error("Error:", error);
      throw new Error(error.error.message);
    }
  } catch (error) {
    console.error("Submission failed:", error);
    throw error;
  }
};
```

#### Save Draft

```javascript
const saveDraft = async (formData) => {
  try {
    const response = await fetch(
      "https://backoffice.trtbroker.com/api/assurance-entreprise-leads/save-draft",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("Draft saved:", result.data);
      return result.data;
    } else {
      const error = await response.json();
      console.error("Error:", error);
      throw new Error(error.error.message);
    }
  } catch (error) {
    console.error("Draft save failed:", error);
    throw error;
  }
};
```

#### Get Form Options

```javascript
const getFormOptions = async () => {
  try {
    const response = await fetch(
      "https://backoffice.trtbroker.com/api/assurance-entreprise-leads/form-options"
    );

    if (response.ok) {
      const options = await response.json();
      console.log("Form options:", options);
      return options;
    } else {
      throw new Error("Failed to fetch form options");
    }
  } catch (error) {
    console.error("Error fetching options:", error);
    throw error;
  }
};
```

## Recent Updates (v1.0)

### Initial Release

- ✅ **Content Type Created** - New `assurance-entreprise-lead` content type
- ✅ **3-Step Form Flow** - Business sector → Insurance categories → Contact form
- ✅ **Custom Endpoints** - Submit, save-draft, and form-options endpoints
- ✅ **Validation Logic** - Comprehensive validation for all fields
- ✅ **TypeScript Support** - Full TypeScript implementation with type assertions
- ✅ **Error Handling** - Detailed error messages and validation
- ✅ **Tracking Data** - Automatic IP address, user agent, and source tracking

### Key Features

- **Business Sector Selection** - 7 predefined business sectors (single selection)
- **Insurance Categories** - 9 insurance categories (multiple selection, comma-separated string)
- **Free Text Input** - `creneauHoraire` field accepts any text input from frontend
- **Draft Support** - Save incomplete forms as drafts
- **Form Options API** - Get all available options for frontend
- **Comprehensive Validation** - Email, phone, required fields, and enum validation
- **Status Management** - Track lead status through the sales pipeline

### Technical Implementation

- **Strapi v5** - Uses latest Strapi document service
- **TypeScript** - Full type safety with temporary type assertions
- **Custom Controllers** - Enhanced with form-specific methods
- **Custom Services** - Business logic for lead management
- **Custom Routes** - Additional endpoints for form handling
- **Error Logging** - Detailed console logging for debugging

## Debugging & Troubleshooting

### Common Issues

#### 1. TypeScript Errors

**Issue**: Content type not recognized by TypeScript  
**Solution**: Type assertions (`as any`) are used temporarily until Strapi generates types

#### 2. Validation Errors

**Issue**: Form submission fails with validation errors  
**Solution**: Check required fields and enum values match exactly

#### 3. Categories Format

**Issue**: `categoriesAssurance` validation fails  
**Solution**: Ensure it's a comma-separated string, not an array

### Debugging Checklist

- ✅ Check all required fields are provided
- ✅ Verify `secteurActivite` is one of the valid enum values
- ✅ Ensure `categoriesAssurance` is a comma-separated string
- ✅ Validate email format and phone number
- ✅ Confirm `conditions` is set to `true`
- ✅ Check server logs for detailed error messages

### Logging

The API provides detailed console logging:

- 📥 Incoming data logging
- 📤 Data being saved logging
- ❌ Error logging with details
- ✅ Success confirmation logging

## Support

For technical support or questions about this API, please contact the development team or refer to the Strapi documentation.
