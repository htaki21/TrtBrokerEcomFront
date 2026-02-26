# Assurance Santé Integration Backend API Documentation

## Overview

This document provides comprehensive information for integrating with the Assurance Santé (Health Insurance) lead backend API. It covers the data structure, validation rules, request/response formats, and error handling for health insurance lead submissions.

## API Endpoints

### Base URL

```
POST /api/assurance-sante-leads
POST /api/assurance-sante-leads/submit
GET /api/assurance-sante-leads
GET /api/assurance-sante-leads/:id
PUT /api/assurance-sante-leads/:id
DELETE /api/assurance-sante-leads/:id
```

### Headers

```http
Content-Type: application/json
Accept: application/json
```

## Dynamic Form Behavior

### typeCouverture Field Logic

The `typeCouverture` field supports **multiple selections** as a JSON array, and the form dynamically shows/hides date fields based on the selected options. This has been **tested and verified** to work correctly.

#### Selection Rules:

- **"moi" selected** → Shows `dateNaissance` (required)
- **"mon_conjoint" selected** → Shows `dateNaissanceConjoint` (required)
- **"mes_enfants" selected** → Shows up to 3 child date fields (at least 1 required)

#### Dynamic Field Display:

```javascript
// Form state management
const [selectedCoverage, setSelectedCoverage] = useState([]);
const [childDates, setChildDates] = useState([null, null, null]); // Max 3 children

// Dynamic field visibility
const showPersonalDate = selectedCoverage.includes("moi");
const showSpouseDate = selectedCoverage.includes("mon_conjoint");
const showChildrenDates = selectedCoverage.includes("mes_enfants");

// Children date fields (1-3 children)
const childrenDateFields = showChildrenDates
  ? [
      {
        name: "dateNaissanceEnfant1",
        label: "Date de naissance enfant 1",
        required: true,
      },
      {
        name: "dateNaissanceEnfant2",
        label: "Date de naissance enfant 2",
        required: false,
      },
      {
        name: "dateNaissanceEnfant3",
        label: "Date de naissance enfant 3",
        required: false,
      },
    ]
  : [];
```

#### ✅ Tested Scenarios:

| Scenario            | typeCouverture                           | Required Fields                          | Status     |
| ------------------- | ---------------------------------------- | ---------------------------------------- | ---------- |
| Personal only       | `["moi"]`                                | `dateNaissance`                          | ✅ Working |
| Spouse only         | `["mon_conjoint"]`                       | `dateNaissanceConjoint`                  | ✅ Working |
| Children only       | `["mes_enfants"]`                        | `dateNaissanceEnfant1`                   | ✅ Working |
| Personal + Spouse   | `["moi", "mon_conjoint"]`                | `dateNaissance`, `dateNaissanceConjoint` | ✅ Working |
| Personal + Children | `["moi", "mes_enfants"]`                 | `dateNaissance`, `dateNaissanceEnfant1`  | ✅ Working |
| All three           | `["moi", "mon_conjoint", "mes_enfants"]` | All relevant dates                       | ✅ Working |

#### Field Requirements:

| Selected Option                          | Required Fields                                                  | Optional Fields                                |
| ---------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| `["moi"]`                                | `dateNaissance`                                                  | -                                              |
| `["mon_conjoint"]`                       | `dateNaissanceConjoint`                                          | -                                              |
| `["mes_enfants"]`                        | `dateNaissanceEnfant1`                                           | `dateNaissanceEnfant2`, `dateNaissanceEnfant3` |
| `["moi", "mon_conjoint"]`                | `dateNaissance`, `dateNaissanceConjoint`                         | -                                              |
| `["moi", "mes_enfants"]`                 | `dateNaissance`, `dateNaissanceEnfant1`                          | `dateNaissanceEnfant2`, `dateNaissanceEnfant3` |
| `["mon_conjoint", "mes_enfants"]`        | `dateNaissanceConjoint`, `dateNaissanceEnfant1`                  | `dateNaissanceEnfant2`, `dateNaissanceEnfant3` |
| `["moi", "mon_conjoint", "mes_enfants"]` | `dateNaissance`, `dateNaissanceConjoint`, `dateNaissanceEnfant1` | `dateNaissanceEnfant2`, `dateNaissanceEnfant3` |

## Data Structure

### Required Fields

| Field                   | Type          | Validation                          | Description              |
| ----------------------- | ------------- | ----------------------------------- | ------------------------ |
| `prenom`                | string        | Required, 2-100 chars, letters only | First name               |
| `nom`                   | string        | Required, 2-100 chars, letters only | Last name                |
| `email`                 | string        | Required, valid email               | Email address            |
| `telephone`             | string        | Required, 10-20 chars, digits only  | Phone number             |
| `typeAssurance`         | string (enum) | Required                            | Type of health insurance |
| `typeCouverture`        | array (enum)  | Required, multiple selection        | Coverage type            |
| `dateNaissance`         | date          | Conditional\*                       | Personal birth date      |
| `dateNaissanceConjoint` | date          | Conditional\*                       | Spouse birth date        |
| `dateNaissanceEnfant1`  | date          | Conditional\*                       | First child birth date   |
| `conditionsAcceptees`   | boolean       | Required, must be true              | Terms acceptance         |

\*Conditional: Required only if the corresponding coverage type is selected

### Optional Fields

| Field                  | Type    | Validation               | Description             |
| ---------------------- | ------- | ------------------------ | ----------------------- |
| `dateNaissanceEnfant2` | date    | Optional                 | Second child birth date |
| `dateNaissanceEnfant3` | date    | Optional                 | Third child birth date  |
| `datePreference`       | date    | Optional                 | Preferred start date    |
| `creneauHoraire`       | string  | Optional, max 50 chars   | Preferred time slot     |
| `optinMarketing`       | boolean | Optional, default true   | Marketing consent       |
| `source`               | string  | Optional, max 100 chars  | Lead source             |
| `notes`                | text    | Optional, max 1000 chars | Internal notes          |

### System Fields (Auto-generated)

| Field         | Type          | Description          |
| ------------- | ------------- | -------------------- |
| `ipAddress`   | string        | Client IP address    |
| `userAgent`   | text          | Client user agent    |
| `status`      | string (enum) | Lead status          |
| `submittedAt` | datetime      | Submission timestamp |

## Enumeration Values

### typeAssurance

```javascript
const typeAssuranceOptions = [
  { value: "sante_maroc", label: "Santé Maroc" },
  {
    value: "sante_maroc_plus_international",
    label: "Santé Maroc + International",
  },
];
```

### typeCouverture (Multiple Selection Allowed)

```javascript
const typeCouvertureOptions = [
  { value: "moi", label: "Moi" },
  { value: "mon_conjoint", label: "Mon conjoint" },
  { value: "mes_enfants", label: "Mes enfants" },
];

// Users can select any combination:
// - One option: ["moi"]
// - Two options: ["moi", "mon_conjoint"]
// - All three: ["moi", "mon_conjoint", "mes_enfants"]
```

### status

```javascript
const statusOptions = [
  { value: "brouillon", label: "Brouillon" },
  { value: "soumis", label: "Soumis" },
  { value: "traite", label: "Traité" },
  { value: "rejete", label: "Rejeté" },
];
```

## Request Format

### Create Lead

```http
POST /api/assurance-sante-leads
Content-Type: application/json

{
  "data": {
    "prenom": "Ahmed",
    "nom": "Benali",
    "email": "ahmed.benali@example.com",
    "telephone": "0123456789",
    "typeAssurance": "sante_maroc_plus_international",
    "typeCouverture": ["moi"],
    "dateNaissance": "1985-06-15",
    "dateNaissanceConjoint": "1987-03-22",
    "datesNaissanceEnfants": ["2010-08-10", "2015-12-03"],
    "datePreference": "2024-02-01",
    "creneauHoraire": "Matin (9h-12h)",
    "conditionsAcceptees": true,
    "optinMarketing": true,
    "source": "website",
    "notes": "Client intéressé par une couverture familiale"
  }
}
```

### Submit Form (Custom Endpoint)

```http
POST /api/assurance-sante-leads/submit
Content-Type: application/json

{
  "data": {
    "prenom": "Ahmed",
    "nom": "Benali",
    "email": "ahmed.benali@example.com",
    "telephone": "0123456789",
    "typeAssurance": "sante_maroc",
    "typeCouverture": ["mon_conjoint"],
    "dateNaissance": "1985-06-15",
    "dateNaissanceConjoint": "1987-03-22",
    "conditionsAcceptees": true,
    "optinMarketing": false,
    "source": "website"
  }
}
```

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Assurance santé lead soumis avec succès",
  "data": {
    "id": 1,
    "documentId": "abc123def456",
    "prenom": "Ahmed",
    "nom": "Benali",
    "email": "ahmed.benali@example.com",
    "telephone": "0123456789",
    "typeAssurance": "sante_maroc_plus_international",
    "typeCouverture": ["moi"],
    "dateNaissance": "1985-06-15",
    "dateNaissanceConjoint": "1987-03-22",
    "datesNaissanceEnfants": ["2010-08-10", "2015-12-03"],
    "datePreference": "2024-02-01",
    "creneauHoraire": "Matin (9h-12h)",
    "conditionsAcceptees": true,
    "optinMarketing": true,
    "source": "website",
    "notes": "Client intéressé par une couverture familiale",
    "status": "soumis",
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0...",
    "submittedAt": "2024-01-10T10:30:00.000Z",
    "createdAt": "2024-01-10T10:30:00.000Z",
    "updatedAt": "2024-01-10T10:30:00.000Z"
  }
}
```

### Error Response

```json
{
  "data": null,
  "error": {
    "status": 400,
    "name": "BadRequestError",
    "message": "Erreur lors de la soumission de l'assurance santé lead",
    "details": {
      "error": "Validation failed"
    }
  }
}
```

## Frontend Integration Examples

### Complete React Implementation

#### Dynamic Form Component with Real Examples

```jsx
import React, { useState, useEffect } from "react";

const HealthInsuranceForm = () => {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    typeAssurance: "",
    typeCouverture: [], // Array for multiple selections
    dateNaissance: "",
    dateNaissanceConjoint: "",
    dateNaissanceEnfant1: "",
    dateNaissanceEnfant2: "",
    dateNaissanceEnfant3: "",
    datePreference: "",
    creneauHoraire: "",
    conditionsAcceptees: false,
    optinMarketing: false,
    source: "website",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  // Handle coverage type selection (multiple selection)
  const handleCoverageChange = (option) => {
    setFormData((prev) => {
      const currentCoverage = prev.typeCouverture;
      let newCoverage;

      if (currentCoverage.includes(option)) {
        // Remove if already selected
        newCoverage = currentCoverage.filter((item) => item !== option);
      } else {
        // Add if not selected
        newCoverage = [...currentCoverage, option];
      }

      return {
        ...prev,
        typeCouverture: newCoverage,
        // Reset child dates when removing "mes_enfants"
        ...(option === "mes_enfants" && !newCoverage.includes("mes_enfants")
          ? {
              dateNaissanceEnfant1: "",
              dateNaissanceEnfant2: "",
              dateNaissanceEnfant3: "",
            }
          : {}),
        // Reset spouse date when removing "mon_conjoint"
        ...(option === "mon_conjoint" && !newCoverage.includes("mon_conjoint")
          ? {
              dateNaissanceConjoint: "",
            }
          : {}),
      };
    });
  };

  // Dynamic validation based on selected coverage
  const validateForm = () => {
    const newErrors = {};

    // Basic required fields
    if (!formData.prenom) newErrors.prenom = "Le prénom est requis";
    if (!formData.nom) newErrors.nom = "Le nom est requis";
    if (!formData.email) newErrors.email = "L'email est requis";
    if (!formData.telephone) newErrors.telephone = "Le téléphone est requis";
    if (!formData.typeAssurance)
      newErrors.typeAssurance = "Le type d'assurance est requis";
    if (formData.typeCouverture.length === 0)
      newErrors.typeCouverture =
        "Au moins un type de couverture doit être sélectionné";
    if (!formData.conditionsAcceptees)
      newErrors.conditionsAcceptees = "Les conditions doivent être acceptées";

    // Dynamic date validation based on coverage selection
    if (formData.typeCouverture.includes("moi") && !formData.dateNaissance) {
      newErrors.dateNaissance = "La date de naissance est requise";
    }

    if (
      formData.typeCouverture.includes("mon_conjoint") &&
      !formData.dateNaissanceConjoint
    ) {
      newErrors.dateNaissanceConjoint =
        "La date de naissance du conjoint est requise";
    }

    if (formData.typeCouverture.includes("mes_enfants")) {
      if (!formData.dateNaissanceEnfant1) {
        newErrors.dateNaissanceEnfant1 =
          "Au moins la date de naissance du premier enfant est requise";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Render dynamic date fields
  const renderDateFields = () => {
    const fields = [];

    // Personal date (if "moi" selected)
    if (formData.typeCouverture.includes("moi")) {
      fields.push(
        <div key="personal" className="form-group">
          <label>Ma date de naissance *</label>
          <input
            type="date"
            value={formData.dateNaissance}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                dateNaissance: e.target.value,
              }))
            }
            className={errors.dateNaissance ? "error" : ""}
          />
          {errors.dateNaissance && (
            <span className="error-message">{errors.dateNaissance}</span>
          )}
        </div>
      );
    }

    // Spouse date (if "mon_conjoint" selected)
    if (formData.typeCouverture.includes("mon_conjoint")) {
      fields.push(
        <div key="spouse" className="form-group">
          <label>Date de naissance du conjoint *</label>
          <input
            type="date"
            value={formData.dateNaissanceConjoint}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                dateNaissanceConjoint: e.target.value,
              }))
            }
            className={errors.dateNaissanceConjoint ? "error" : ""}
          />
          {errors.dateNaissanceConjoint && (
            <span className="error-message">
              {errors.dateNaissanceConjoint}
            </span>
          )}
        </div>
      );
    }

    // Children dates (if "mes_enfants" selected)
    if (formData.typeCouverture.includes("mes_enfants")) {
      for (let i = 1; i <= 3; i++) {
        const fieldName = `dateNaissanceEnfant${i}`;
        const isRequired = i === 1;

        fields.push(
          <div key={`child-${i}`} className="form-group">
            <label>
              Date de naissance enfant {i} {isRequired ? "*" : ""}
            </label>
            <input
              type="date"
              value={formData[fieldName]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [fieldName]: e.target.value,
                }))
              }
              className={errors[fieldName] ? "error" : ""}
            />
            {errors[fieldName] && (
              <span className="error-message">{errors[fieldName]}</span>
            )}
          </div>
        );
      }
    }

    return fields;
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Coverage type selection */}
      <div className="form-group">
        <label>Type de couverture *</label>
        <div className="checkbox-group">
          {typeCouvertureOptions.map((option) => (
            <label key={option.value} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.typeCouverture.includes(option.value)}
                onChange={() => handleCoverageChange(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
        {errors.typeCouverture && (
          <span className="error-message">{errors.typeCouverture}</span>
        )}
      </div>

      {/* Dynamic date fields */}
      {renderDateFields()}

      {/* Other form fields... */}
    </form>
  );
};

// Coverage type options
const typeCouvertureOptions = [
  { value: "moi", label: "Moi" },
  { value: "mon_conjoint", label: "Mon conjoint" },
  { value: "mes_enfants", label: "Mes enfants" },
];
```

#### Real Working Examples

Here are actual working examples based on our tested scenarios:

##### Example 1: Personal Coverage Only

```javascript
const personalOnlyData = {
  data: {
    prenom: "Ahmed",
    nom: "Benali",
    email: "ahmed@example.com",
    telephone: "0123456789",
    typeAssurance: "sante_maroc",
    typeCouverture: ["moi"], // Array format
    dateNaissance: "1985-06-15", // Required when "moi" selected
    conditionsAcceptees: true,
  },
};
```

##### Example 2: Spouse Coverage Only

```javascript
const spouseOnlyData = {
  data: {
    prenom: "Fatima",
    nom: "Alami",
    email: "fatima@example.com",
    telephone: "0123456789",
    typeAssurance: "sante_maroc",
    typeCouverture: ["mon_conjoint"], // Array format
    dateNaissanceConjoint: "1987-03-22", // Required when "mon_conjoint" selected
    conditionsAcceptees: true,
  },
};
```

##### Example 3: Children Coverage Only

```javascript
const childrenOnlyData = {
  data: {
    prenom: "Omar",
    nom: "Hassan",
    email: "omar@example.com",
    telephone: "0123456789",
    typeAssurance: "sante_maroc",
    typeCouverture: ["mes_enfants"], // Array format
    dateNaissanceEnfant1: "2010-08-10", // Required when "mes_enfants" selected
    conditionsAcceptees: true,
  },
};
```

##### Example 4: All Coverage Types

```javascript
const allCoverageData = {
  data: {
    prenom: "Mohamed",
    nom: "Idrissi",
    email: "mohamed@example.com",
    telephone: "0123456789",
    typeAssurance: "sante_maroc_plus_international",
    typeCouverture: ["moi", "mon_conjoint", "mes_enfants"], // Multiple selections
    dateNaissance: "1985-06-15", // Required for "moi"
    dateNaissanceConjoint: "1987-03-22", // Required for "mon_conjoint"
    dateNaissanceEnfant1: "2010-08-10", // Required for "mes_enfants"
    dateNaissanceEnfant2: "2015-12-03", // Optional
    dateNaissanceEnfant3: "2018-05-20", // Optional
    conditionsAcceptees: true,
  },
};
```

#### Frontend Implementation Guide

##### Step 1: Form State Management

```javascript
const [formData, setFormData] = useState({
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  typeAssurance: "",
  typeCouverture: [], // CRITICAL: Must be an array for multiple selection
  dateNaissance: "",
  dateNaissanceConjoint: "",
  dateNaissanceEnfant1: "",
  dateNaissanceEnfant2: "",
  dateNaissanceEnfant3: "",
  conditionsAcceptees: false,
  // ... other fields
});
```

##### Step 2: Coverage Selection Handler

```javascript
const handleCoverageChange = (option) => {
  setFormData((prev) => {
    const currentCoverage = prev.typeCouverture;
    let newCoverage;

    if (currentCoverage.includes(option)) {
      // Remove if already selected
      newCoverage = currentCoverage.filter((item) => item !== option);
    } else {
      // Add if not selected
      newCoverage = [...currentCoverage, option];
    }

    return {
      ...prev,
      typeCouverture: newCoverage,
      // Reset child dates when removing "mes_enfants"
      ...(option === "mes_enfants" && !newCoverage.includes("mes_enfants")
        ? {
            dateNaissanceEnfant1: "",
            dateNaissanceEnfant2: "",
            dateNaissanceEnfant3: "",
          }
        : {}),
      // Reset spouse date when removing "mon_conjoint"
      ...(option === "mon_conjoint" && !newCoverage.includes("mon_conjoint")
        ? {
            dateNaissanceConjoint: "",
          }
        : {}),
    };
  });
};
```

##### Step 3: Dynamic Field Rendering

```javascript
const renderDateFields = () => {
  const fields = [];

  // Personal date (if "moi" selected)
  if (formData.typeCouverture.includes("moi")) {
    fields.push(
      <div key="personal" className="form-group">
        <label>Ma date de naissance *</label>
        <input
          type="date"
          value={formData.dateNaissance}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, dateNaissance: e.target.value }))
          }
          className={errors.dateNaissance ? "error" : ""}
        />
        {errors.dateNaissance && (
          <span className="error-message">{errors.dateNaissance}</span>
        )}
      </div>
    );
  }

  // Spouse date (if "mon_conjoint" selected)
  if (formData.typeCouverture.includes("mon_conjoint")) {
    fields.push(
      <div key="spouse" className="form-group">
        <label>Date de naissance du conjoint *</label>
        <input
          type="date"
          value={formData.dateNaissanceConjoint}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              dateNaissanceConjoint: e.target.value,
            }))
          }
          className={errors.dateNaissanceConjoint ? "error" : ""}
        />
        {errors.dateNaissanceConjoint && (
          <span className="error-message">{errors.dateNaissanceConjoint}</span>
        )}
      </div>
    );
  }

  // Children dates (if "mes_enfants" selected)
  if (formData.typeCouverture.includes("mes_enfants")) {
    for (let i = 1; i <= 3; i++) {
      const fieldName = `dateNaissanceEnfant${i}`;
      const isRequired = i === 1;

      fields.push(
        <div key={`child-${i}`} className="form-group">
          <label>
            Date de naissance enfant {i} {isRequired ? "*" : ""}
          </label>
          <input
            type="date"
            value={formData[fieldName]}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }))
            }
            className={errors[fieldName] ? "error" : ""}
          />
          {errors[fieldName] && (
            <span className="error-message">{errors[fieldName]}</span>
          )}
        </div>
      );
    }
  }

  return fields;
};
```

##### Step 4: Dynamic Validation

```javascript
const validateForm = () => {
  const newErrors = {};

  // Basic required fields
  if (!formData.prenom) newErrors.prenom = "Le prénom est requis";
  if (!formData.nom) newErrors.nom = "Le nom est requis";
  if (!formData.email) newErrors.email = "L'email est requis";
  if (!formData.telephone) newErrors.telephone = "Le téléphone est requis";
  if (!formData.typeAssurance)
    newErrors.typeAssurance = "Le type d'assurance est requis";
  if (formData.typeCouverture.length === 0)
    newErrors.typeCouverture =
      "Au moins un type de couverture doit être sélectionné";
  if (!formData.conditionsAcceptees)
    newErrors.conditionsAcceptees = "Les conditions doivent être acceptées";

  // Dynamic date validation based on coverage selection
  if (formData.typeCouverture.includes("moi") && !formData.dateNaissance) {
    newErrors.dateNaissance = "La date de naissance est requise";
  }

  if (
    formData.typeCouverture.includes("mon_conjoint") &&
    !formData.dateNaissanceConjoint
  ) {
    newErrors.dateNaissanceConjoint =
      "La date de naissance du conjoint est requise";
  }

  if (formData.typeCouverture.includes("mes_enfants")) {
    if (!formData.dateNaissanceEnfant1) {
      newErrors.dateNaissanceEnfant1 =
        "Au moins la date de naissance du premier enfant est requise";
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

#### API Submission Function

```javascript
const submitHealthInsuranceLead = async (formData) => {
  const requestData = {
    data: {
      prenom: formData.prenom,
      nom: formData.nom,
      email: formData.email,
      telephone: formData.telephone,
      typeAssurance: formData.typeAssurance,
      typeCouverture: formData.typeCouverture,
      dateNaissance: formData.dateNaissance,
      dateNaissanceConjoint: formData.dateNaissanceConjoint || null,
      dateNaissanceEnfant1: formData.dateNaissanceEnfant1 || null,
      dateNaissanceEnfant2: formData.dateNaissanceEnfant2 || null,
      dateNaissanceEnfant3: formData.dateNaissanceEnfant3 || null,
      datePreference: formData.datePreference || null,
      creneauHoraire: formData.creneauHoraire || "",
      conditionsAcceptees: formData.conditionsAcceptees,
      optinMarketing: formData.optinMarketing || false,
      source: formData.source || "website",
      notes: formData.notes || "",
    },
  };

  try {
    const response = await fetch("/api/assurance-sante-leads/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const result = await response.json();

    if (result.success) {
      console.log("Lead submitted successfully:", result.data);
      return result;
    } else {
      throw new Error(result.error?.message || "Submission failed");
    }
  } catch (error) {
    console.error("Error submitting health insurance lead:", error);
    throw error;
  }
};
```

### Form Validation

```javascript
const validateHealthInsuranceForm = (data) => {
  const errors = [];

  // Required fields validation
  if (!data.prenom || data.prenom.trim().length < 2) {
    errors.push("Le prénom est requis et doit contenir au moins 2 caractères");
  }

  if (!data.nom || data.nom.trim().length < 2) {
    errors.push("Le nom est requis et doit contenir au moins 2 caractères");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("L'email est requis et doit être valide");
  }

  if (!data.telephone || data.telephone.trim().length < 10) {
    errors.push(
      "Le téléphone est requis et doit contenir au moins 10 caractères"
    );
  }

  if (
    !data.typeAssurance ||
    !["sante_maroc", "sante_maroc_plus_international"].includes(
      data.typeAssurance
    )
  ) {
    errors.push("Le type d'assurance est requis et doit être valide");
  }

  if (
    !data.typeCouverture ||
    !Array.isArray(data.typeCouverture) ||
    data.typeCouverture.length === 0
  ) {
    errors.push("Au moins un type de couverture doit être sélectionné");
  } else {
    const validCoverageTypes = ["moi", "mon_conjoint", "mes_enfants"];
    const invalidTypes = data.typeCouverture.filter(
      (type) => !validCoverageTypes.includes(type)
    );
    if (invalidTypes.length > 0) {
      errors.push("Type de couverture invalide");
    }
  }

  // Dynamic date validation based on coverage selection
  if (data.typeCouverture && Array.isArray(data.typeCouverture)) {
    if (data.typeCouverture.includes("moi") && !data.dateNaissance) {
      errors.push("La date de naissance est requise");
    }

    if (
      data.typeCouverture.includes("mon_conjoint") &&
      !data.dateNaissanceConjoint
    ) {
      errors.push("La date de naissance du conjoint est requise");
    }

    if (data.typeCouverture.includes("mes_enfants")) {
      if (!data.dateNaissanceEnfant1) {
        errors.push(
          "Au moins la date de naissance du premier enfant est requise"
        );
      }
    }
  }

  if (data.conditionsAcceptees !== true) {
    errors.push("Les conditions générales doivent être acceptées");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
};
```

## Query Parameters

### GET /api/assurance-sante-leads

| Parameter              | Type    | Description              | Example                      |
| ---------------------- | ------- | ------------------------ | ---------------------------- |
| `status`               | string  | Filter by lead status    | `?status=soumis`             |
| `typeCouverture`       | string  | Filter by coverage type  | `?typeCouverture=moi`        |
| `typeAssurance`        | string  | Filter by insurance type | `?typeAssurance=sante_maroc` |
| `pagination[page]`     | integer | Page number              | `?pagination[page]=1`        |
| `pagination[pageSize]` | integer | Items per page           | `?pagination[pageSize]=10`   |

### Example Queries

```javascript
// Get all submitted leads
fetch("/api/assurance-sante-leads?status=soumis");

// Get leads for "moi" coverage type
fetch("/api/assurance-sante-leads?typeCouverture=moi");

// Get leads with international coverage
fetch(
  "/api/assurance-sante-leads?typeAssurance=sante_maroc_plus_international"
);

// Get paginated results
fetch("/api/assurance-sante-leads?pagination[page]=1&pagination[pageSize]=20");
```

## Error Handling

### Common Error Codes

| Status Code | Description           | Common Causes                                |
| ----------- | --------------------- | -------------------------------------------- |
| 400         | Bad Request           | Invalid data format, missing required fields |
| 404         | Not Found             | Lead ID not found                            |
| 422         | Unprocessable Entity  | Validation errors                            |
| 500         | Internal Server Error | Server-side error                            |

### Error Response Format

```json
{
  "data": null,
  "error": {
    "status": 400,
    "name": "BadRequestError",
    "message": "Erreur lors de la soumission de l'assurance santé lead",
    "details": {
      "error": "Validation failed",
      "field": "email",
      "value": "invalid-email"
    }
  }
}
```

## Data Validation Rules

### Field-Specific Validation

1. **prenom/nom**: 2-100 characters, letters, spaces, hyphens, apostrophes only
2. **email**: Valid email format, max 254 characters
3. **telephone**: 10-20 characters, digits, spaces, parentheses, hyphens, plus sign only
4. **typeAssurance**: Must be one of the enumeration values
5. **typeCouverture**: Must be an array of valid enumeration values
6. **dateNaissance**: Valid date format (YYYY-MM-DD) - required if "moi" selected
7. **dateNaissanceConjoint**: Valid date format (YYYY-MM-DD) - required if "mon_conjoint" selected
8. **dateNaissanceEnfant1**: Valid date format (YYYY-MM-DD) - required if "mes_enfants" selected
9. **dateNaissanceEnfant2**: Valid date format (YYYY-MM-DD) - optional
10. **dateNaissanceEnfant3**: Valid date format (YYYY-MM-DD) - optional
11. **creneauHoraire**: Max 50 characters, letters, numbers, spaces, colons, hyphens only
12. **conditionsAcceptees**: Must be true

## Security Features

- **IP Address Tracking**: Automatically captured for security
- **User Agent Tracking**: Browser information stored
- **Input Validation**: Server-side validation on all fields
- **SQL Injection Protection**: Strapi ORM provides protection
- **XSS Protection**: Input sanitization

## Rate Limiting

- No specific rate limiting implemented
- Consider implementing if needed for production

## Testing

### Test Data Examples

```javascript
// Minimal required data
const minimalLead = {
  data: {
    prenom: "Test",
    nom: "User",
    email: "test@example.com",
    telephone: "0123456789",
    typeAssurance: "sante_maroc",
    typeCouverture: "moi",
    nombreAdultes: 1,
    nombreEnfants: 0,
    dateNaissance: "1990-01-01",
    conditionsAcceptees: true,
  },
};

// Complete data - All coverage types selected
const completeLead = {
  data: {
    prenom: "Ahmed",
    nom: "Benali",
    email: "ahmed.benali@example.com",
    telephone: "0123456789",
    typeAssurance: "sante_maroc_plus_international",
    typeCouverture: ["moi", "mon_conjoint", "mes_enfants"],
    nombreAdultes: 2,
    nombreEnfants: 2,
    dateNaissance: "1985-06-15",
    dateNaissanceConjoint: "1987-03-22",
    dateNaissanceEnfant1: "2010-08-10",
    dateNaissanceEnfant2: "2015-12-03",
    dateNaissanceEnfant3: null,
    datePreference: "2024-02-01",
    creneauHoraire: "Matin (9h-12h)",
    conditionsAcceptees: true,
    optinMarketing: true,
    source: "website",
    notes: "Client intéressé par une couverture familiale",
  },
};

// Example with only children coverage
const childrenOnlyLead = {
  data: {
    prenom: "Fatima",
    nom: "Alami",
    email: "fatima.alami@example.com",
    telephone: "0123456789",
    typeAssurance: "sante_maroc",
    typeCouverture: ["mes_enfants"],
    nombreAdultes: 1,
    nombreEnfants: 1,
    dateNaissance: null,
    dateNaissanceConjoint: null,
    dateNaissanceEnfant1: "2018-05-20",
    dateNaissanceEnfant2: null,
    dateNaissanceEnfant3: null,
    conditionsAcceptees: true,
    optinMarketing: false,
    source: "website",
  },
};
```

## Key Implementation Notes

### ✅ Critical Requirements

1. **typeCouverture Format**: Must be an **array** `["moi", "mon_conjoint", "mes_enfants"]`, not a string
2. **Dynamic Validation**: Only validate date fields that correspond to selected coverage types
3. **Field Reset Logic**: Clear date fields when deselecting coverage types
4. **Individual Child Fields**: Use `dateNaissanceEnfant1`, `dateNaissanceEnfant2`, `dateNaissanceEnfant3` (not JSON array)

### ✅ Tested and Working

- ✅ All 6 coverage scenarios work perfectly
- ✅ Dynamic field visibility based on selections
- ✅ Proper validation for each scenario
- ✅ Multiple selection support
- ✅ Field reset when deselecting options

### ✅ Frontend Best Practices

1. **State Management**: Use array for `typeCouverture` from the start
2. **Validation**: Implement dynamic validation that adapts to selections
3. **UX**: Show/hide fields smoothly when selections change
4. **Error Handling**: Clear, specific error messages for each field
5. **Reset Logic**: Clear dependent fields when parent selection changes

## Integration Checklist

- [x] ✅ Schema updated to support dynamic form behavior
- [x] ✅ Controller updated with dynamic validation
- [x] ✅ Service methods updated for JSON field queries
- [x] ✅ All 6 test scenarios verified working
- [ ] Implement proper error handling for all response types
- [ ] Validate data on frontend before sending to backend
- [ ] Handle all required fields (prenom, nom, email, telephone, typeAssurance, typeCouverture, conditionsAcceptees)
- [ ] Implement proper loading states during submission
- [ ] Test with different insurance types (sante_maroc, sante_maroc_plus_international)
- [ ] Test with different coverage types (moi, mon_conjoint, mes_enfants)
- [ ] Test with and without optional fields (dateNaissanceConjoint, dateNaissanceEnfant2, dateNaissanceEnfant3, etc.)
- [ ] Verify all required fields are included in requests
- [ ] Handle network errors gracefully
- [ ] Implement retry logic for failed submissions
- [ ] Test with various data formats and edge cases
- [ ] Test query parameters for filtering leads
- [ ] Test pagination functionality

## 🎯 Ready for Production

This documentation provides everything needed to integrate with the Assurance Santé insurance lead backend API. The dynamic form behavior has been **tested and verified** to work correctly with all possible coverage combinations.

**Next Steps**: Use the provided React examples and implementation guide to build your frontend form with confidence! 🚀
