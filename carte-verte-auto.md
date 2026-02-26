# Carte Verte Auto Lead API Documentation

## Overview

This API handles green card (carte verte) auto insurance lead management for the TRT Broker platform. It provides endpoints for creating, managing, and tracking green card auto insurance leads with comprehensive vehicle registration validation.

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
- [Analytics](#analytics)

## Authentication

All endpoints are publicly accessible (no authentication required).

## Content Type

**Content Type**: `carte-verte-auto-lead`  
**Collection Name**: `carte_verte_auto_leads`  
**Display Name**: Carte Verte Auto Lead

## Endpoints

### 1. Standard CRUD Endpoints

#### GET /api/carte-verte-auto-leads

Retrieve all green card auto insurance leads with pagination and filtering.

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
        "immatriculationNum1": "123",
        "immatriculationLettre": "أ",
        "immatriculationNum2": "45678",
        "dateReceptionSouhaitee": "2025-09-15",
        "nom": "TAKI",
        "prenom": "HOUCINE",
        "telephone": "0656740701",
        "email": "contact@deadline.ma",
        "datePreference": "2025-09-15",
        "creneauHoraire": "10:00 – 10:30",
        "optinMarketing": false,
        "conditionsAcceptees": true,
        "ipAddress": "192.168.1.1",
        "userAgent": "Mozilla/5.0...",
        "source": "website",
        "status": "brouillon",
        "notes": null,
        "submittedAt": "2025-09-11T21:00:00.000Z",
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
    }
  }
}
```

#### GET /api/carte-verte-auto-leads/:id

Retrieve a specific green card auto insurance lead by ID.

**Response:**

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "immatriculationNum1": "123",
      "immatriculationLettre": "أ",
      "immatriculationNum2": "45678",
      "dateReceptionSouhaitee": "2025-09-15",
      "nom": "TAKI",
      "prenom": "HOUCINE",
      "telephone": "0656740701",
      "email": "contact@deadline.ma",
      "datePreference": "2025-09-15",
      "creneauHoraire": "10:00 – 10:30",
      "optinMarketing": false,
      "conditionsAcceptees": true,
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "source": "website",
      "status": "brouillon",
      "notes": null,
      "submittedAt": "2025-09-11T21:00:00.000Z",
      "createdAt": "2025-09-11T21:00:00.000Z",
      "updatedAt": "2025-09-11T21:00:00.000Z"
    }
  }
}
```

#### POST /api/carte-verte-auto-leads

Create a new green card auto insurance lead.

**Request Body:**

```json
{
  "data": {
    "immatriculationNum1": "123",
    "immatriculationLettre": "أ",
    "immatriculationNum2": "45678",
    "dateReceptionSouhaitee": "2025-09-15",
    "nom": "TAKI",
    "prenom": "HOUCINE",
    "telephone": "0656740701",
    "email": "contact@deadline.ma",
    "datePreference": "2025-09-15",
    "creneauHoraire": "10:00 – 10:30",
    "optinMarketing": false,
    "conditionsAcceptees": true,
    "source": "website"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Carte verte auto lead created successfully",
  "data": {
    "id": 1,
    "attributes": {
      "immatriculationNum1": "123",
      "immatriculationLettre": "أ",
      "immatriculationNum2": "45678",
      "dateReceptionSouhaitee": "2025-09-15",
      "nom": "TAKI",
      "prenom": "HOUCINE",
      "telephone": "0656740701",
      "email": "contact@deadline.ma",
      "datePreference": "2025-09-15",
      "creneauHoraire": "10:00 – 10:30",
      "optinMarketing": false,
      "conditionsAcceptees": true,
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "source": "website",
      "status": "brouillon",
      "notes": null,
      "submittedAt": "2025-09-11T21:00:00.000Z",
      "createdAt": "2025-09-11T21:00:00.000Z",
      "updatedAt": "2025-09-11T21:00:00.000Z"
    }
  },
  "distribution": {
    "success": true,
    "message": "Lead distributed to external systems"
  }
}
```

#### PUT /api/carte-verte-auto-leads/:id

Update an existing green card auto insurance lead.

#### DELETE /api/carte-verte-auto-leads/:id

Delete a green card auto insurance lead.

### 2. Analytics Endpoint

#### GET /api/carte-verte-auto-leads/analytics

Get analytics and statistics for green card auto insurance leads.

**Response:**

```json
{
  "success": true,
  "data": {
    "totalLeads": 150,
    "statusStats": {
      "brouillon": 25,
      "soumis": 80,
      "traite": 35,
      "rejete": 10
    },
    "recentLeads": [
      {
        "id": 1,
        "prenom": "HOUCINE",
        "nom": "TAKI",
        "email": "contact@deadline.ma",
        "status": "soumis",
        "createdAt": "2025-09-11T21:00:00.000Z"
      }
    ]
  }
}
```

## Request/Response Examples

### Complete Form Submission

```bash
curl -X POST https://backoffice.trtbroker.com/api/carte-verte-auto-leads \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "immatriculationNum1": "123",
      "immatriculationLettre": "أ",
      "immatriculationNum2": "45678",
      "dateReceptionSouhaitee": "2025-09-15",
      "nom": "TAKI",
      "prenom": "HOUCINE",
      "telephone": "0656740701",
      "email": "contact@deadline.ma",
      "datePreference": "2025-09-15",
      "creneauHoraire": "10:00 – 10:30",
      "optinMarketing": false,
      "conditionsAcceptees": true,
      "source": "website"
    }
  }'
```

### Get Analytics

```bash
curl -X GET https://backoffice.trtbroker.com/api/carte-verte-auto-leads/analytics
```

## Validation Rules

### Required Fields

- `immatriculationNum1` - First part of vehicle registration (1-3 digits)
- `immatriculationLettre` - Arabic letter in vehicle registration
- `immatriculationNum2` - Second part of vehicle registration (1-5 digits)
- `dateReceptionSouhaitee` - Desired reception date for the green card
- `nom` - Last name (2-100 characters, letters only)
- `prenom` - First name (2-100 characters, letters only)
- `telephone` - Phone number (10-20 characters, digits and special chars)
- `email` - Valid email format (max 254 characters)
- `conditionsAcceptees` - Must be `true` (terms acceptance required)

### Optional Fields

- `datePreference` - Preferred contact date (YYYY-MM-DD format)
- `creneauHoraire` - Preferred time slot (max 50 characters)
- `optinMarketing` - Boolean (default: false)
- `source` - String (max 100 characters, default: "website")
- `notes` - Text field for internal notes (max 1000 characters)

### Field Validation

#### immatriculationNum1

**Type**: String  
**Required**: Yes  
**Pattern**: `^[0-9]{1,3}$`  
**Length**: 1-3 characters  
**Description**: First part of vehicle registration (numbers only)

#### immatriculationLettre

**Type**: Enumeration  
**Required**: Yes  
**Valid Values**:

- `أ` - Alif
- `ب` - Ba
- `ج` - Jim
- `د` - Dal
- `ر` - Ra
- `ز` - Zay
- `س` - Sin
- `ط` - Ta
- `ع` - Ain
- `ف` - Fa
- `ق` - Qaf
- `ك` - Kaf
- `ل` - Lam
- `م` - Mim
- `ن` - Nun
- `ه` - Ha
- `و` - Waw
- `ي` - Ya

#### immatriculationNum2

**Type**: String  
**Required**: Yes  
**Pattern**: `^[0-9]{1,5}$`  
**Length**: 1-5 characters  
**Description**: Second part of vehicle registration (numbers only)

#### dateReceptionSouhaitee

**Type**: Date  
**Required**: Yes  
**Format**: YYYY-MM-DD  
**Description**: Desired reception date for the green card

#### nom

**Type**: String  
**Required**: Yes  
**Pattern**: `^[a-zA-ZÀ-ÿ\s'-]+$`  
**Length**: 2-100 characters  
**Description**: Last name - only letters, spaces, hyphens, and apostrophes allowed

#### prenom

**Type**: String  
**Required**: Yes  
**Pattern**: `^[a-zA-ZÀ-ÿ\s'-]+$`  
**Length**: 2-100 characters  
**Description**: First name - only letters, spaces, hyphens, and apostrophes allowed

#### telephone

**Type**: String  
**Required**: Yes  
**Pattern**: `^[0-9+\s()-]+$`  
**Length**: 10-20 characters  
**Description**: Phone number - only digits, spaces, parentheses, hyphens, and plus sign allowed

#### email

**Type**: Email  
**Required**: Yes  
**Format**: Valid email format  
**Max Length**: 254 characters  
**Description**: Valid email address for communication

#### creneauHoraire

**Type**: String  
**Required**: No  
**Pattern**: `^[a-zA-ZÀ-ÿ0-9\s:-]+$`  
**Max Length**: 50 characters  
**Description**: Preferred time slot for contact (optional)

## Status Values

- `brouillon` - Draft lead (default)
- `soumis` - Submitted lead
- `traite` - Processed lead
- `rejete` - Rejected lead

## Error Handling

### Common Error Responses

#### 400 Bad Request

```json
{
  "success": false,
  "error": "immatriculationNum1 is required",
  "message": "Failed to create lead"
}
```

#### 400 Validation Error

```json
{
  "success": false,
  "error": "Invalid immatriculationNum1 format",
  "message": "Failed to create lead",
  "errors": ["immatriculationNum1 must match pattern ^[0-9]{1,3}$"]
}
```

#### 400 Distribution Error

```json
{
  "success": false,
  "error": "Lead created but failed to distribute",
  "message": "Failed to create lead",
  "distribution": {
    "error": "External system unavailable"
  }
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "error": "Database connection failed",
  "message": "Failed to create lead"
}
```

## Frontend Integration

### Form Implementation

```javascript
const formData = {
  immatriculationNum1: "123",
  immatriculationLettre: "أ",
  immatriculationNum2: "45678",
  dateReceptionSouhaitee: "2025-09-15",
  nom: "TAKI",
  prenom: "HOUCINE",
  telephone: "0656740701",
  email: "contact@deadline.ma",
  datePreference: "2025-09-15",
  creneauHoraire: "10:00 – 10:30",
  optinMarketing: false,
  conditionsAcceptees: true,
  source: "website",
};
```

### API Integration Examples

#### Submit Form

```javascript
const submitForm = async (formData) => {
  try {
    const response = await fetch(
      "https://backoffice.trtbroker.com/api/carte-verte-auto-leads",
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
      throw new Error(error.error);
    }
  } catch (error) {
    console.error("Submission failed:", error);
    throw error;
  }
};
```

#### Get Analytics

```javascript
const getAnalytics = async () => {
  try {
    const response = await fetch(
      "https://backoffice.trtbroker.com/api/carte-verte-auto-leads/analytics"
    );

    if (response.ok) {
      const result = await response.json();
      console.log("Analytics:", result.data);
      return result.data;
    } else {
      throw new Error("Failed to fetch analytics");
    }
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};
```

### Vehicle Registration Format

The vehicle registration follows the Moroccan format: **XXX-ح-XXXXX**

- **XXX**: 1-3 digits (immatriculationNum1)
- **ح**: Arabic letter (immatriculationLettre)
- **XXXXX**: 1-5 digits (immatriculationNum2)

**Examples:**

- `123-أ-45678`
- `45-ب-1234`
- `1-ج-98765`

## Analytics

### Available Metrics

- **Total Leads**: Total number of leads created
- **Status Statistics**: Breakdown by lead status
  - `brouillon`: Draft leads
  - `soumis`: Submitted leads
  - `traite`: Processed leads
  - `rejete`: Rejected leads
- **Recent Leads**: Last 10 leads with basic information

### Analytics Response Structure

```json
{
  "success": true,
  "data": {
    "totalLeads": 150,
    "statusStats": {
      "brouillon": 25,
      "soumis": 80,
      "traite": 35,
      "rejete": 10
    },
    "recentLeads": [
      {
        "id": 1,
        "prenom": "HOUCINE",
        "nom": "TAKI",
        "email": "contact@deadline.ma",
        "status": "soumis",
        "createdAt": "2025-09-11T21:00:00.000Z"
      }
    ]
  }
}
```

## Key Features

- **Vehicle Registration Validation** - Comprehensive validation for Moroccan license plate format
- **Arabic Letter Support** - Full support for Arabic letters in vehicle registration
- **Lead Distribution** - Automatic distribution to external systems
- **Analytics Dashboard** - Built-in analytics and reporting
- **Security Tracking** - IP address and user agent tracking
- **Status Management** - Complete lead lifecycle management
- **Comprehensive Validation** - Email, phone, name, and date validation

## Technical Implementation

- **Strapi v5** - Uses latest Strapi entity service
- **Lead Management Integration** - Automatic distribution to external systems
- **Comprehensive Validation** - Pattern-based validation for all fields
- **Error Handling** - Detailed error messages and validation feedback
- **Analytics Support** - Built-in analytics and reporting capabilities

## Support

For technical support or questions about this API, please contact the development team or refer to the Strapi documentation.
