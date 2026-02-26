# Strapi Content Types Setup for Blog Integration

## Required Content Types

You need to create these content types in your Strapi backend at `https://backoffice.trtbroker.com/admin`:

### 1. Category Content Type

**Name:** `category` (plural: `categories`)

**Fields:**

- `nom` (Text) - Category name
- `slug` (UID) - URL slug (target field: `nom`)
- `description` (Text) - Category description
- `couleur` (Text) - Hex color code (e.g., #FF6B35)
- `icone` (Text) - Icon name (e.g., car, home, health)
- `langue` (Text) - Language (e.g., fr, ar, en)
- `ordre` (Number) - Sort order
- `estActif` (Boolean) - Active status
- `image` (Media) - Category image

### 2. Blog Content Type

**Name:** `blog` (plural: `blogs`)

**Fields:**

- `titre` (Text) - Blog title
- `slug` (UID) - URL slug (target field: `titre`)
- `description` (Text) - Short description
- `contenu` (Rich Text) - Main content
- `imagePrincipale` (Media) - Main image
- `categorie` (Relation) - Many-to-One relation to Category
- `featured` (Boolean) - Featured article
- `publishedAt` (DateTime) - Publication date

## API Endpoints

Once created, these endpoints will be available:

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get single blog
- `GET /api/blogs?filters[categorie][slug][$eq]=auto` - Filter by category
- `GET /api/blogs?filters[$or][0][titre][$containsi]=search` - Search blogs

## Sample Data

### Sample Categories:

```json
[
  {
    "nom": "Auto",
    "slug": "auto",
    "description": "Tout sur l'assurance automobile au Maroc",
    "couleur": "#FF6B35",
    "icone": "car",
    "langue": "fr",
    "ordre": 1,
    "estActif": true
  },
  {
    "nom": "Moto",
    "slug": "moto",
    "description": "Assurance moto et deux-roues",
    "couleur": "#FF6B35",
    "icone": "motorcycle",
    "langue": "fr",
    "ordre": 2,
    "estActif": true
  },
  {
    "nom": "Habitation",
    "slug": "habitation",
    "description": "Protégez votre logement",
    "couleur": "#FF6B35",
    "icone": "home",
    "langue": "fr",
    "ordre": 3,
    "estActif": true
  },
  {
    "nom": "Santé",
    "slug": "sante",
    "description": "Complémentaire santé et prévoyance",
    "couleur": "#FF6B35",
    "icone": "health",
    "langue": "fr",
    "ordre": 4,
    "estActif": true
  },
  {
    "nom": "Épargne",
    "slug": "epargne",
    "description": "Épargne et préparation retraite",
    "couleur": "#FF6B35",
    "icone": "savings",
    "langue": "fr",
    "ordre": 5,
    "estActif": true
  },
  {
    "nom": "Voyage",
    "slug": "voyage",
    "description": "Assurance voyage et assistance",
    "couleur": "#FF6B35",
    "icone": "travel",
    "langue": "fr",
    "ordre": 6,
    "estActif": true
  }
]
```

### Sample Blog Posts:

```json
[
  {
    "titre": "Dégât des eaux : les bons réflexes à adopter",
    "slug": "degat-eaux-bons-reflexes",
    "description": "Découvrez comment bien réagir en cas de dégât des eaux dans votre habitation.",
    "contenu": "## Les bons réflexes en cas de dégât des eaux\n\nEn cas de dégât des eaux, il est important de réagir rapidement pour limiter les dégâts et faciliter le remboursement par votre assurance habitation.\n\n### 1. Coupez l'eau immédiatement\n\nLa première chose à faire est de couper l'arrivée d'eau principale pour stopper la fuite.\n\n### 2. Prenez des photos\n\nDocumentez les dégâts avec des photos avant de commencer les réparations d'urgence.\n\n### 3. Contactez votre assureur\n\nPrévenez votre compagnie d'assurance dans les 5 jours ouvrés suivant la découverte du sinistre.",
    "categorie": 3,
    "featured": true,
    "publishedAt": "2025-01-27T10:00:00.000Z"
  },
  {
    "titre": "Assurance auto : comment bien choisir sa garantie",
    "slug": "assurance-auto-choisir-garantie",
    "description": "Guide complet pour choisir les bonnes garanties d'assurance automobile.",
    "contenu": "## Choisir sa garantie d'assurance auto\n\nL'assurance automobile au Maroc propose plusieurs niveaux de garantie. Voici comment bien choisir selon vos besoins.\n\n### Assurance au tiers\n\nCouvre uniquement les dommages causés aux tiers. Obligatoire au minimum.\n\n### Assurance au tiers étendu\n\nInclut la garantie vol et incendie en plus du tiers.\n\n### Assurance tous risques\n\nLa protection la plus complète pour votre véhicule.",
    "categorie": 1,
    "featured": false,
    "publishedAt": "2025-01-26T10:00:00.000Z"
  }
]
```

## Steps to Create in Strapi:

1. Go to `https://backoffice.trtbroker.com/admin`
2. Navigate to Content-Type Builder
3. Create "Category" content type with the fields listed above
4. Create "Blog" content type with the fields listed above
5. Set up the relation between Blog and Category
6. Add sample data using the Content Manager
7. Publish the content types

Once these are created, the frontend will automatically start using the real data from Strapi instead of the static fallback data.
