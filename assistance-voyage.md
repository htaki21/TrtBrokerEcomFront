# Assistance Voyage API Documentation

## 🚀 **API Base URL**

```
https://backoffice.trtbroker.com/api
```

## 📋 **Overview**

The Assistance Voyage API manages travel assistance lead submissions from a multi-step form. This API provides comprehensive CRUD operations and specialized endpoints for lead management, statistics, and form processing. The API handles different types of travel assistance including Schengen, worldwide, student, and expatriate coverage.

## 🎯 **Main Endpoints**

### **1. Form Submission (Primary Endpoint)**

**Endpoint**: `POST /api/assistance-voyage-leads/submit`  
**Content-Type**: `application/json`  
**Authentication**: None required

#### **Request Body**

```json
{
  "data": {
    "dureeVisa": "six_mois",
    "typeAssistance": "schengen",
    "typeCouverture": "individuel",
    "prenom": "Ahmed",
    "nom": "Benali",
    "telephone": "+212 6 12 34 56 78",
    "email": "ahmed.benali@example.com",
    "datePreference": "2024-02-15",
    "creneauHoraire": "Matin (9h-12h)",
    "optinMarketing": true,
    "conditionsAcceptees": true,
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "source": "website",
    "notes": "Customer interested in Schengen travel assistance"
  }
}
```

#### **Response (Success)**

```json
{
  "success": true,
  "message": "Assistance voyage lead soumis avec succès",
  "data": {
    "id": 1,
    "dureeVisa": "six_mois",
    "typeAssistance": "schengen",
    "typeCouverture": "individuel",
    "primeAssistance": 350.0,
    "prenom": "Ahmed",
    "nom": "Benali",
    "telephone": "+212 6 12 34 56 78",
    "email": "ahmed.benali@example.com",
    "status": "soumis",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### **Response (Error)**

```json
{
  "data": null,
  "error": {
    "status": 400,
    "name": "BadRequest",
    "message": "Erreur lors de la soumission de l'assistance voyage lead",
    "details": {
      "error": "Validation error details"
    }
  }
}
```

### **2. Get All Leads**

**Endpoint**: `GET /api/assistance-voyage-leads`  
**Authentication**: None required

#### **Query Parameters**

- `status` (optional): Filter by status (`brouillon`, `soumis`, `traite`, `rejete`)
- `dureeVisa` (optional): Filter by visa duration (`six_mois`, `plus_six_mois`)
- `typeAssistance` (optional): Filter by assistance type (`schengen`, `monde`, `etudiant`, `expatrie`)
- `typeCouverture` (optional): Filter by coverage type (`individuel`, `couple`, `famille`)
- `pagination[page]` (optional): Page number
- `pagination[pageSize]` (optional): Items per page
- `sort` (optional): Sort field (e.g., `createdAt:desc`)

#### **Example Request**

```
GET /api/assistance-voyage-leads?status=soumis&typeAssistance=schengen&dureeVisa=six_mois&pagination[page]=1&pagination[pageSize]=10
```

#### **Response**

```json
{
  "data": [
    {
      "id": 1,
      "dureeVisa": "six_mois",
      "typeAssistance": "schengen",
      "typeCouverture": "individuel",
      "primeAssistance": 350.0,
      "prenom": "Ahmed",
      "nom": "Benali",
      "telephone": "+212 6 12 34 56 78",
      "email": "ahmed.benali@example.com",
      "status": "soumis",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 5,
      "total": 50
    }
  }
}
```

### **3. Get Single Lead**

**Endpoint**: `GET /api/assistance-voyage-leads/:id`  
**Authentication**: None required

#### **Response (Success)**

```json
{
  "data": {
    "id": 1,
    "dureeVisa": "six_mois",
    "typeAssistance": "schengen",
    "typeCouverture": "individuel",
    "primeAssistance": 350.0,
    "prenom": "Ahmed",
    "nom": "Benali",
    "telephone": "+212 6 12 34 56 78",
    "email": "ahmed.benali@example.com",
    "datePreference": "2024-02-15",
    "creneauHoraire": "Matin (9h-12h)",
    "optinMarketing": true,
    "conditionsAcceptees": true,
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "source": "website",
    "status": "soumis",
    "notes": "Customer interested in Schengen travel assistance",
    "submittedAt": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### **Response (Not Found)**

```json
{
  "data": null,
  "error": {
    "status": 404,
    "name": "NotFound",
    "message": "Assistance voyage lead non trouvé"
  }
}
```

### **4. Update Lead**

**Endpoint**: `PUT /api/assistance-voyage-leads/:id`  
**Content-Type**: `application/json`  
**Authentication**: None required

#### **Request Body**

```json
{
  "data": {
    "status": "traite",
    "notes": "Lead processed and customer contacted"
  }
}
```

#### **Response**

```json
{
  "data": {
    "id": 1,
    "status": "traite",
    "notes": "Lead processed and customer contacted",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### **5. Delete Lead**

**Endpoint**: `DELETE /api/assistance-voyage-leads/:id`  
**Authentication**: None required

#### **Response**

```json
{
  "data": {
    "id": 1,
    "deleted": true
  }
}
```

## 📊 **Data Model**

### **Lead Object Structure**

| Field                 | Type     | Required | Description               | Validation                      |
| --------------------- | -------- | -------- | ------------------------- | ------------------------------- |
| `id`                  | Integer  | Auto     | Unique identifier         | Auto-generated                  |
| `dureeVisa`           | Enum     | No       | Visa duration             | See visa duration options below |
| `typeAssistance`      | Enum     | Yes      | Type of travel assistance | See assistance type options     |
| `typeCouverture`      | Enum     | No       | Coverage type             | See coverage type options       |
| `vehiculePersonnel`   | Boolean  | No       | Personal vehicle travel   | Only for Schengen               |
| `primeAssistance`     | Decimal  | Yes      | Assistance premium        | Varies by type and coverage     |
| `prenom`              | String   | Yes      | First name                | 2-100 chars, letters only       |
| `nom`                 | String   | Yes      | Last name                 | 2-100 chars, letters only       |
| `telephone`           | String   | Yes      | Phone number              | 10-20 chars, digits and symbols |
| `email`               | Email    | Yes      | Email address             | Valid email format              |
| `datePreference`      | Date     | No       | Preferred contact date    | Valid date format               |
| `creneauHoraire`      | String   | No       | Preferred time slot       | 50 chars max                    |
| `optinMarketing`      | Boolean  | No       | Marketing consent         | Default: true                   |
| `conditionsAcceptees` | Boolean  | Yes      | Terms acceptance          | Must be true                    |
| `ipAddress`           | String   | No       | Client IP address         | IPv4/IPv6 format                |
| `userAgent`           | Text     | No       | Browser user agent        | 500 chars max                   |
| `source`              | String   | No       | Lead source identifier    | 100 chars max                   |
| `status`              | Enum     | Yes      | Lead status               | See status options below        |
| `notes`               | Text     | No       | Internal notes            | 1000 chars max                  |
| `submittedAt`         | DateTime | No       | Submission timestamp      | Auto-set on submit              |
| `createdAt`           | DateTime | Auto     | Creation timestamp        | Auto-generated                  |
| `updatedAt`           | DateTime | Auto     | Last update timestamp     | Auto-generated                  |

### **Visa Duration Options**

| Value           | Description        |
| --------------- | ------------------ |
| `six_mois`      | 6 months or less   |
| `plus_six_mois` | More than 6 months |
| `un_an`         | 1 year             |

### **Assistance Type Options**

| Value      | Description               |
| ---------- | ------------------------- |
| `schengen` | Schengen area coverage    |
| `monde`    | Worldwide coverage        |
| `etudiant` | Student-specific coverage |
| `expatrie` | Expatriate coverage       |

### **Coverage Type Options**

| Value        | Description         |
| ------------ | ------------------- |
| `individuel` | Individual coverage |
| `couple`     | Couple coverage     |
| `famille`    | Family coverage     |

### **Status Options**

| Value       | Description     |
| ----------- | --------------- |
| `brouillon` | Draft (default) |
| `soumis`    | Submitted       |
| `traite`    | Processed       |
| `rejete`    | Rejected        |

## 🔧 **Service Methods (Internal)**

### **Process Lead**

- **Method**: `processLead(id: number)`
- **Description**: Updates lead status to "traite"
- **Returns**: Updated lead object

### **Get Leads by Status**

- **Method**: `getLeadsByStatus(status: string)`
- **Description**: Retrieves leads filtered by status
- **Returns**: Array of leads

### **Get Leads by Visa Duration**

- **Method**: `getLeadsByVisaDuration(dureeVisa: string)`
- **Description**: Retrieves leads filtered by visa duration
- **Returns**: Array of leads

### **Get Leads by Assistance Type**

- **Method**: `getLeadsByAssistanceType(typeAssistance: string)`
- **Description**: Retrieves leads filtered by assistance type
- **Returns**: Array of leads

### **Get Leads by Coverage Type**

- **Method**: `getLeadsByCoverageType(typeCouverture: string)`
- **Description**: Retrieves leads filtered by coverage type
- **Returns**: Array of leads

### **Get Leads Statistics**

- **Method**: `getLeadsStatistics()`
- **Description**: Returns comprehensive lead statistics
- **Returns**: Statistics object with counts and revenue

#### **Statistics Response**

```json
{
  "total": 150,
  "soumis": 120,
  "traite": 95,
  "enAttente": 25,
  "totalRevenue": 42000
}
```

### **Get Visa Duration Statistics**

- **Method**: `getVisaDurationStatistics()`
- **Description**: Returns visa duration distribution
- **Returns**: Object with visa duration counts

#### **Visa Duration Statistics Response**

```json
{
  "sixMois": 80,
  "plusSixMois": 40
}
```

### **Get Assistance Type Statistics**

- **Method**: `getAssistanceTypeStatistics()`
- **Description**: Returns assistance type distribution
- **Returns**: Object with assistance type counts

#### **Assistance Type Statistics Response**

```json
{
  "schengen": 60,
  "monde": 30,
  "etudiant": 20,
  "expatrie": 10
}
```

### **Get Coverage Type Statistics**

- **Method**: `getCoverageTypeStatistics()`
- **Description**: Returns coverage type distribution
- **Returns**: Object with coverage type counts

#### **Coverage Type Statistics Response**

```json
{
  "individuel": 70,
  "couple": 30,
  "famille": 20
}
```

## 🚨 **Error Handling**

### **Common Error Responses**

#### **Validation Error (400)**

```json
{
  "data": null,
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "Validation error",
    "details": {
      "errors": [
        {
          "path": ["dureeVisa"],
          "message": "dureeVisa is required"
        }
      ]
    }
  }
}
```

#### **Not Found Error (404)**

```json
{
  "data": null,
  "error": {
    "status": 404,
    "name": "NotFound",
    "message": "Assistance voyage lead non trouvé"
  }
}
```

#### **Server Error (500)**

```json
{
  "data": null,
  "error": {
    "status": 500,
    "name": "InternalServerError",
    "message": "Internal server error"
  }
}
```

## 📝 **Usage Examples**

### **JavaScript/Fetch Example**

```javascript
// Submit a new travel assistance lead
const submitTravelAssistanceLead = async (leadData) => {
  try {
    const response = await fetch("/api/assistance-voyage-leads/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: leadData }),
    });

    const result = await response.json();

    if (result.success) {
      console.log(
        "Travel assistance lead submitted successfully:",
        result.data
      );
      return result.data;
    } else {
      console.error("Error submitting lead:", result.error);
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error("Network error:", error);
    throw error;
  }
};

// Get leads with multiple filters
const getTravelAssistanceLeads = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters);
  const response = await fetch(`/api/assistance-voyage-leads?${queryParams}`);
  return await response.json();
};

// Get Schengen leads for 6 months or less
const getSchengenShortTermLeads = async () => {
  return await getTravelAssistanceLeads({
    typeAssistance: "schengen",
    dureeVisa: "six_mois",
    status: "soumis",
  });
};

// Update lead status
const updateTravelAssistanceLeadStatus = async (id, status) => {
  const response = await fetch(`/api/assistance-voyage-leads/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { status } }),
  });
  return await response.json();
};
```

### **cURL Examples**

```bash
# Submit a new travel assistance lead
curl -X POST "https://backoffice.trtbroker.com/api/assistance-voyage-leads/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "dureeVisa": "six_mois",
      "typeAssistance": "schengen",
      "typeCouverture": "individuel",
      "prenom": "Ahmed",
      "nom": "Benali",
      "telephone": "+212 6 12 34 56 78",
      "email": "ahmed.benali@example.com",
      "conditionsAcceptees": true
    }
  }'

# Get all submitted Schengen leads
curl -X GET "https://backoffice.trtbroker.com/api/assistance-voyage-leads?status=soumis&typeAssistance=schengen"

# Get leads for 6 months or less visa duration
curl -X GET "https://backoffice.trtbroker.com/api/assistance-voyage-leads?dureeVisa=six_mois"

# Get family coverage leads
curl -X GET "https://backoffice.trtbroker.com/api/assistance-voyage-leads?typeCouverture=famille"

# Get a specific lead
curl -X GET "https://backoffice.trtbroker.com/api/assistance-voyage-leads/1"

# Update lead status
curl -X PUT "https://backoffice.trtbroker.com/api/assistance-voyage-leads/1" \
  -H "Content-Type: application/json" \
  -d '{"data": {"status": "traite"}}'
```

## 🔒 **Security Considerations**

1. **No Authentication Required**: All endpoints are publicly accessible
2. **Input Validation**: All inputs are validated according to schema rules
3. **IP Tracking**: Client IP addresses are captured for security
4. **User Agent Tracking**: Browser information is logged
5. **Rate Limiting**: Consider implementing rate limiting for production
6. **CORS**: Configure CORS settings for frontend integration

## 📈 **Performance Notes**

- **Pagination**: Use pagination for large datasets
- **Filtering**: Leverage query parameters for efficient data retrieval
- **Indexing**: Database indexes are recommended on frequently queried fields
- **Caching**: Consider implementing caching for statistics endpoints

## 🔄 **Integration Notes**

- **Form Submission**: Use the `/submit` endpoint for form submissions
- **Lead Management**: Use standard CRUD endpoints for lead management
- **Statistics**: Access service methods for analytics and reporting
- **Status Workflow**: Follow the status progression: `brouillon` → `soumis` → `traite`/`rejete`
- **Fixed Pricing**: All travel assistance leads have a fixed premium of 350 DH

## 🎯 **Business Logic**

### **Form Flows by Assistance Type**

#### **Schengen** (4 steps):

1. Duration selection (6 months or more than 6 months)
2. Personal vehicle question (Yes/No)
3. Premium confirmation (350 DH TTC)
4. Contact form

#### **Monde** (3 steps):

1. Duration selection (6 months or 1 year)
2. Premium confirmation (350 DH TTC)
3. Contact form

#### **Étudiant** (2 steps):

1. Premium confirmation (500 DH TTC)
2. Contact form

#### **Expatrié** (3 steps):

1. Family situation (Individuel/Couple/Famille)
2. Premium confirmation (varies by coverage: 400/600/800 DH)
3. Contact form

### **Premium Structure**

| Assistance Type | Coverage Type | Premium (DH) |
| --------------- | ------------- | ------------ |
| Schengen        | Any           | 350          |
| Monde           | Any           | 350          |
| Étudiant        | Any           | 500          |
| Expatrié        | Individuel    | 350          |
| Expatrié        | Couple        | 350          |
| Expatrié        | Famille       | 350          |

### **Field Requirements by Type**

- **Schengen**: Requires `dureeVisa`, `vehiculePersonnel`
- **Monde**: Requires `dureeVisa`
- **Étudiant**: No additional requirements
- **Expatrié**: Requires `typeCouverture`

- **Multiple Filtering**: Supports filtering by visa duration, assistance type, and coverage type
- **Comprehensive Statistics**: Provides detailed analytics for different dimensions
- **Flexible Coverage**: Supports individual, couple, and family coverage options

---

**Last Updated**: January 2024  
**API Version**: 1.0  
**Maintainer**: TRT Broker Backend Team
