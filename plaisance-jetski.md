# Plaisance/Jet-ski Lead API Documentation

## Overview

The Plaisance/Jet-ski Lead API handles boat and watercraft insurance lead submissions through a 5-step multi-step form workflow. This API supports different types of boats and watercraft with customizable guarantee options.

## Base URL

```
http://localhost:1337/api
```

## Authentication

No authentication required for form submission.

---

## API Endpoints

### 1. Submit Plaisance/Jet-ski Lead

**POST** `/plaisance-jetski-leads/submit`

Submit a new plaisance/jet-ski insurance lead through the multi-step form.

#### Request Body

```json
{
  "data": {
    "typeBateau": "a_voile",
    "garantiesDeBase": "responsabilite_civile,defense_et_recours",
    "garantiesOptionnelles": "perte_totale_delaissement,tous_risques",
    "ficheTechnique": null,
    "prenom": "Amine",
    "nom": "El Mehdi",
    "telephone": "06 12 34 56 78",
    "email": "amine@example.com",
    "datePreference": "2024-02-15",
    "creneauHoraire": "14:00-16:00",
    "optinMarketing": true,
    "conditionsAcceptees": true,
    "source": "website"
  }
}
```

**Note:** The `garantiesDeBase` and `garantiesOptionnelles` fields accept arrays in the request but are stored as comma-separated strings in the database for better admin panel compatibility. The API response will show the comma-separated string format.

#### Response

```json
{
  "success": true,
  "message": "Plaisance/Jet-ski lead soumis avec succès",
  "data": {
    "id": 1,
    "typeBateau": "a_voile",
    "garantiesDeBase": "responsabilite_civile,defense_et_recours",
    "garantiesOptionnelles": "perte_totale_delaissement,tous_risques",
    "ficheTechnique": null,
    "prenom": "Amine",
    "nom": "El Mehdi",
    "telephone": "06 12 34 56 78",
    "email": "amine@example.com",
    "datePreference": "2024-02-15",
    "creneauHoraire": "14:00-16:00",
    "optinMarketing": true,
    "conditionsAcceptees": true,
    "status": "soumis",
    "submittedAt": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Get All Leads

**GET** `/plaisance-jetski-leads`

Retrieve all plaisance/jet-ski leads with optional filtering.

#### Query Parameters

- `status` - Filter by lead status
- `typeBateau` - Filter by boat type
- `garantiesDeBase` - Filter by basic guarantees (array)
- `garantiesOptionnelles` - Filter by optional guarantees (array)

#### Example Request

```
GET /plaisance-jetski-leads?status=soumis&typeBateau=a_voile
```

#### Response

```json
{
  "data": [
    {
      "id": 1,
      "typeBateau": "a_voile",
      "garantiesDeBase": ["responsabilite_civile", "defense_et_recours"],
      "garantiesOptionnelles": ["perte_totale_delaissement"],
      "prenom": "Amine",
      "nom": "El Mehdi",
      "email": "amine@example.com",
      "status": "soumis",
      "submittedAt": "2024-01-15T10:30:00.000Z"
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

### 3. Get Single Lead

**GET** `/plaisance-jetski-leads/:id`

Retrieve a specific plaisance/jet-ski lead by ID.

#### Response

```json
{
  "data": {
    "id": 1,
    "typeBateau": "a_voile",
    "garantiesDeBase": "responsabilite_civile,defense_et_recours",
    "garantiesOptionnelles": "perte_totale_delaissement,tous_risques",
    "ficheTechnique": {
      "id": 1,
      "name": "fiche_technique.pdf",
      "url": "/uploads/fiche_technique_123.pdf"
    },
    "prenom": "Amine",
    "nom": "El Mehdi",
    "telephone": "06 12 34 56 78",
    "email": "amine@example.com",
    "datePreference": "2024-02-15",
    "creneauHoraire": "14:00-16:00",
    "optinMarketing": true,
    "conditionsAcceptees": true,
    "status": "soumis",
    "submittedAt": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 4. Update Lead

**PUT** `/plaisance-jetski-leads/:id`

Update an existing plaisance/jet-ski lead.

#### Request Body

```json
{
  "data": {
    "status": "traite",
    "notes": "Lead processed successfully"
  }
}
```

### 5. Delete Lead

**DELETE** `/plaisance-jetski-leads/:id`

Delete a plaisance/jet-ski lead.

---

## Field Format Notes

### Guarantees Fields Format

The `garantiesDeBase` and `garantiesOptionnelles` fields use a special format:

- **API Input**: Accepts arrays of strings (e.g., `["responsabilite_civile", "defense_et_recours"]`)
- **Database Storage**: Stored as comma-separated strings (e.g., `"responsabilite_civile,defense_et_recours"`)
- **Admin Panel**: Displayed as text fields for better visibility and editing

This format ensures compatibility with the Strapi admin panel while maintaining a clean API interface.

## Data Model

| Field                   | Type     | Required | Description                  | Validation                                             |
| ----------------------- | -------- | -------- | ---------------------------- | ------------------------------------------------------ |
| `id`                    | Integer  | Auto     | Unique identifier            | Auto-generated                                         |
| `typeBateau`            | Enum     | Yes      | Type of boat/watercraft      | de_plaisance, a_moteur, a_voile, jet_ski               |
| `garantiesDeBase`       | Text     | Yes      | Basic guarantees selected    | Comma-separated string of selected basic guarantees    |
| `garantiesOptionnelles` | Text     | No       | Optional guarantees selected | Comma-separated string of selected optional guarantees |
| `ficheTechnique`        | Media    | No       | Technical sheet upload       | PDF, JPG, PNG (max 10MB)                               |
| `prenom`                | String   | Yes      | First name                   | 2-100 chars, letters only                              |
| `nom`                   | String   | Yes      | Last name                    | 2-100 chars, letters only                              |
| `telephone`             | String   | Yes      | Phone number                 | 10-20 chars, digits and symbols                        |
| `email`                 | Email    | Yes      | Email address                | Valid email format                                     |
| `datePreference`        | Date     | No       | Preferred contact date       | Valid date format                                      |
| `creneauHoraire`        | String   | No       | Preferred time slot          | 50 chars max                                           |
| `optinMarketing`        | Boolean  | No       | Marketing consent            | Default: true                                          |
| `conditionsAcceptees`   | Boolean  | Yes      | Terms acceptance             | Must be true to submit                                 |
| `ipAddress`             | String   | No       | Client IP address            | IPv4/IPv6 format                                       |
| `userAgent`             | Text     | No       | Client user agent            | 500 chars max                                          |
| `source`                | String   | No       | Lead source identifier       | 100 chars max                                          |
| `status`                | Enum     | Yes      | Lead status                  | brouillon, soumis, traite, rejete                      |
| `notes`                 | Text     | No       | Internal notes               | 1000 chars max                                         |
| `submittedAt`           | DateTime | No       | Submission timestamp         | Auto-set on submit                                     |
| `createdAt`             | DateTime | Auto     | Creation timestamp           | Auto-generated                                         |
| `updatedAt`             | DateTime | Auto     | Last update timestamp        | Auto-generated                                         |

---

## Multi-Step Form Workflow

### Step 1: Boat Type Selection (Étape 1 sur 5)

**Question:** "Quel est le type de bateau à assurer?" (What type of boat to insure?)

**Options (Single Choice):**

- `de_plaisance` - De Plaisance (Leisure Boat) - "Idéal pour les sorties en mer ou en rivière"
- `a_moteur` - À Moteur (Motorboat) - "Bateau rapide, souvent utilisé pour les sports nautiques"
- `a_voile` - À Voile (Sailboat) - "Voilier ou catamaran principalement à voile"
- `jet_ski` - Jet-Ski - "Véhicule nautique individuel à moteur pour le sport"

### Step 2: Basic Guarantees (Étape 2 sur 5)

**Question:** "Vos garanties de base" (Your basic guarantees)

**Options (Multiple Choice - Can select both or one):**

- `responsabilite_civile` - Responsabilité Civile (Civil Liability) - "Couvre les dommages causés à des tiers"
- `defense_et_recours` - Défense et Recours (Defense and Recourse) - "Pavillon individuel, souvent avec un petit jardin"

### Step 3: Optional Guarantees (Étape 3 sur 5)

**Question:** "Souhaitez-vous ajouter des garanties supplémentaires?" (Do you want to add additional guarantees?)

**Options (Multiple Choice - Can select any combination):**

- `perte_totale_delaissement` - Perte Totale & Délaissement (Total Loss & Abandonment) - "Remboursement en cas de perte irréversible ou abandon du bateau"
- `vol_total` - Vol Total (Total Theft) - "Bateau rapide, souvent utilisé pour les sports nautiques"
- `tous_risques` - Tous Risques (All Risks) - "Voilier ou catamaran principalement à voile"
- `individuelle_personne_transportees` - Individuelle Personnes Transportées (Individual Persons Transported) - "Véhicule nautique individuel à moteur pour le sport"

### Step 4: Technical Sheet Upload (Étape 4 sur 5)

**Question:** "Téléverser la fiche technique de votre bateau" (Upload the technical sheet of your boat)

**Details:**

- **Optional step** - "Cette étape est facultative, mais elle permet de traiter plus rapidement votre demande"
- **Accepted formats:** PDF, JPG, PNG (max 10MB)
- **Skip option** - "Si vous ne l'avez pas, vous pouvez passer cette étape"

### Step 5: Contact Information (Étape 5 sur 5)

**Question:** "Vos informations pour recevoir votre devis" (Your information to receive your quote)

**Required Fields:**

- `prenom` - Prénom\* (First Name)
- `nom` - Nom\* (Last Name)
- `telephone` - N° de téléphone\* (Phone Number)
- `email` - Email\*

**Optional Fields:**

- `datePreference` - Date (preferred date)
- `creneauHoraire` - Créneau horaire (time slot)

**Checkboxes:**

- `optinMarketing` - Marketing consent for emails
- `conditionsAcceptees` - Terms and conditions acceptance (required)

---

## Error Responses

### 400 Bad Request

```json
{
  "data": null,
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "Erreur lors de la soumission du plaisance/jet-ski lead",
    "details": {
      "error": "Validation error details"
    }
  }
}
```

### 404 Not Found

```json
{
  "data": null,
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Plaisance/Jet-ski lead non trouvé"
  }
}
```

### 500 Internal Server Error

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

---

## Frontend Integration Examples

### JavaScript/Fetch

```javascript
// Submit form
const submitPlaisanceJetskiLead = async (formData) => {
  try {
    const response = await fetch(
      "http://localhost:1337/api/plaisance-jetski-leads/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formData,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      console.log("Lead submitted successfully:", result.data);
      return result.data;
    } else {
      throw new Error(result.error?.message || "Submission failed");
    }
  } catch (error) {
    console.error("Error submitting lead:", error);
    throw error;
  }
};

// Example usage
const formData = {
  typeBateau: "a_voile",
  garantiesDeBase: ["responsabilite_civile", "defense_et_recours"],
  garantiesOptionnelles: ["perte_totale_delaissement"],
  prenom: "Amine",
  nom: "El Mehdi",
  telephone: "06 12 34 56 78",
  email: "amine@example.com",
  conditionsAcceptees: true,
};

submitPlaisanceJetskiLead(formData);
```

### cURL Examples

```bash
# Submit lead
curl -X POST http://localhost:1337/api/plaisance-jetski-leads/submit \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "typeBateau": "a_voile",
      "garantiesDeBase": ["responsabilite_civile", "defense_et_recours"],
      "garantiesOptionnelles": ["perte_totale_delaissement"],
      "prenom": "Amine",
      "nom": "El Mehdi",
      "telephone": "06 12 34 56 78",
      "email": "amine@example.com",
      "conditionsAcceptees": true
    }
  }'

# Get all leads
curl -X GET "http://localhost:1337/api/plaisance-jetski-leads?status=soumis"

# Get single lead
curl -X GET http://localhost:1337/api/plaisance-jetski-leads/1

# Update lead
curl -X PUT http://localhost:1337/api/plaisance-jetski-leads/1 \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "status": "traite",
      "notes": "Lead processed successfully"
    }
  }'

# Delete lead
curl -X DELETE http://localhost:1337/api/plaisance-jetski-leads/1
```

---

## Notes

- The API supports a 5-step multi-step form workflow
- Basic guarantees are required and can be selected as multiple options
- Optional guarantees are not required and can be selected as any combination
- Technical sheet upload is optional but recommended for faster processing
- All contact information fields are required except for date preference and time slot
- The API validates guarantee selections to ensure only valid options are accepted
- File uploads are limited to PDF, JPG, and PNG formats with a maximum size of 10MB
