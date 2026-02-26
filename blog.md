# Blog and Category API - GET Endpoints Only

## Base URL

```
http://localhost:1337
```

## Categories

### GET /api/categories

Get all categories

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "nom": "Technology",
      "slug": "technology",
      "image": null,
      "description": "Articles about technology and programming",
      "createdAt": "2025-01-13T12:00:00.000Z",
      "updatedAt": "2025-01-13T12:00:00.000Z"
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

### GET /api/categories/:id

Get a specific category by ID

**Response:**

```json
{
  "data": {
    "id": 1,
    "nom": "Technology",
    "slug": "technology",
    "image": null,
    "description": "Articles about technology and programming",
    "createdAt": "2025-01-13T12:00:00.000Z",
    "updatedAt": "2025-01-13T12:00:00.000Z"
  }
}
```

## Blogs

### GET /api/blogs

Get all blog posts

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "titre": "Getting Started with Strapi",
      "slug": "getting-started-with-strapi",
      "image": null,
      "description": "A comprehensive guide to building APIs with Strapi",
      "contenu": "Strapi is a headless CMS that makes it easy to build APIs...",
      "conclusion": "In conclusion, Strapi is a powerful tool for building APIs...",
      "categorie": {
        "id": 1,
        "nom": "Technology",
        "slug": "technology"
      },
      "publishedAt": "2025-01-13T12:00:00.000Z",
      "createdAt": "2025-01-13T12:00:00.000Z",
      "updatedAt": "2025-01-13T12:00:00.000Z"
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

### GET /api/blogs/:id

Get a specific blog post by ID

**Response:**

```json
{
  "data": {
    "id": 1,
    "titre": "Getting Started with Strapi",
    "slug": "getting-started-with-strapi",
    "image": null,
    "description": "A comprehensive guide to building APIs with Strapi",
    "contenu": "Strapi is a headless CMS that makes it easy to build APIs...",
    "conclusion": "In conclusion, Strapi is a powerful tool for building APIs...",
    "categorie": {
      "id": 1,
      "nom": "Technology",
      "slug": "technology"
    },
    "publishedAt": "2025-01-13T12:00:00.000Z",
    "createdAt": "2025-01-13T12:00:00.000Z",
    "updatedAt": "2025-01-13T12:00:00.000Z"
  }
}
```

## Usage Examples

### Frontend Integration

1. **Get all blogs:**

   ```javascript
   fetch("http://localhost:1337/api/blogs")
     .then((response) => response.json())
     .then((data) => console.log(data.data));
   ```

2. **Get all categories:**

   ```javascript
   fetch("http://localhost:1337/api/categories")
     .then((response) => response.json())
     .then((data) => console.log(data.data));
   ```

3. **Get single blog:**

   ```javascript
   fetch("http://localhost:1337/api/blogs/1")
     .then((response) => response.json())
     .then((data) => console.log(data.data));
   ```

4. **Get single category:**
   ```javascript
   fetch("http://localhost:1337/api/categories/1")
     .then((response) => response.json())
     .then((data) => console.log(data.data));
   ```

## Notes

- All endpoints are public (no authentication required)
- Blog posts use draft/publish system
- Categories are always published
- All relations are automatically populated in responses
