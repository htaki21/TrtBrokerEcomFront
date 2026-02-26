export interface BlogCategory {
  id: number;
  nom: string;
  slug: string;
  description?: string;
  image?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: number;
  titre: string;
  slug: string;
  description: string;
  contenu: string;
  conclusion?: string;
  image?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  categorie: BlogCategory;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface BlogResponse {
  data: BlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CategoryResponse {
  data: BlogCategory[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

// Get all categories
export const getCategories = async (): Promise<BlogCategory[]> => {
  try {
    // Use localhost for server-side, relative for client-side
    const baseUrl =
      typeof window === "undefined" ? "http://localhost:3000" : "";
    const endpoint = `${baseUrl}/api/blog-categories`;

    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      // Remove server-side cache options that don't work in client-side calls
    });

    if (response.ok) {
      const result: CategoryResponse = await response.json();
      if (result.data && result.data.length > 0) {
        // Normalize category data structure
        const normalizedCategories = result.data.map((category) => {
          return {
            id: category.id,
            nom: category.nom || "Unknown",
            slug: category.slug || category.id?.toString() || "unknown",
            description: category.description || "",
            image: category.image,
            createdAt: category.createdAt || new Date().toISOString(),
            updatedAt: category.updatedAt || new Date().toISOString(),
          };
        });

        return normalizedCategories;
      }
    } else {
      const errorText = await response.text();
      // console.log(`❌ API failed: ${response.status} - ${errorText}`);
    }

    // If API fails, return empty array
    // console.log("⚠️ API failed, returning empty categories");
    return [];
  } catch (error) {
    // console.log("⚠️ Returning empty categories due to error");
    return [];
  }
};

// Get all blogs with pagination and filtering
export const getBlogs = async (
  params: {
    page?: number;
    pageSize?: number;
    category?: string;
    search?: string;
    sort?: string;
  } = {},
): Promise<BlogResponse> => {
  // console.log("🔍 Fetching blogs from Strapi...");

  try {
    const {
      page = 1,
      pageSize = 25,
      category,
      search,
      sort = "createdAt:desc",
    } = params;

    // Workaround for Strapi 100-item limit
    // If we need more than 100 items, we'll fetch in batches
    const maxStrapiPageSize = 100;
    const actualPageSize = Math.min(pageSize, maxStrapiPageSize);

    // Use localhost for server-side, relative for client-side
    const baseUrl =
      typeof window === "undefined" ? "http://localhost:3000" : "";
    let url = `${baseUrl}/api/blogs?page=${page}&pageSize=${actualPageSize}`;

    // Add category filter if provided
    if (category && category !== "tous") {
      url += `&category=${encodeURIComponent(category)}`;
    }

    // Add search filter if provided
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 900, // Revalidate every 15 minutes for faster updates
        tags: ["blogs", category || "all", search || "no-search"],
      },
      cache: "force-cache", // Enable aggressive caching
    });

    // console.log(`📊 Response status: ${response.status}`);

    if (response.ok) {
      const result: BlogResponse = await response.json();
      // console.log("🔍 Full API Response:", result);
      // console.log("🔍 API Response meta:", result.meta);
      // console.log("🔍 API Response pagination:", result.meta?.pagination);
      if (result.data && result.data.length > 0) {
        // Ensure all blogs have proper category data
        const validBlogs = result.data.map((blog) => {
          // Handle category data
          let categoryData = blog.categorie;

          // If category is an object but has different field names
          if (categoryData && typeof categoryData === "object") {
            // Use only valid BlogCategory properties
            const categoryName = categoryData.nom;
            const categorySlug =
              categoryData.slug || categoryData.id?.toString();

            if (categoryName) {
              categoryData = {
                id: categoryData.id || 0,
                nom: categoryName,
                slug: categorySlug || "unknown",
                description: categoryData.description || "",
                createdAt: categoryData.createdAt || new Date().toISOString(),
                updatedAt: categoryData.updatedAt || new Date().toISOString(),
              };
            }
          }

          // Use actual category data from Strapi API
          // console.log(`🔍 Blog ID: ${blog.id}, Title: "${blog.titre}"`);
          // console.log(`🔍 API Category:`, blog.categorie);

          // Use the category data directly from API
          if (blog.categorie && typeof blog.categorie === "object") {
            categoryData = {
              id: blog.categorie.id || 0,
              nom: blog.categorie.nom || "Auto",
              slug: blog.categorie.slug || "auto",
              description: blog.categorie.description || "",
              createdAt: blog.categorie.createdAt || new Date().toISOString(),
              updatedAt: blog.categorie.updatedAt || new Date().toISOString(),
            };
            // console.log("✅ Using API category:", categoryData.nom);
          } else {
            // console.log(`⚠️ No category from API for blog: "${blog.titre}"`);

            // Use a default category
            categoryData = {
              id: 1,
              nom: "Auto",
              slug: "auto",
              description: "Assurance automobile",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            // console.log("✅ Assigned default category: Auto");
          }

          return {
            ...blog,
            categorie: categoryData || {
              id: 0,
              nom: "Non classé",
              slug: "non-classe",
              description: "Article non classé",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          };
        });

        // Apply client-side category filtering
        let filteredBlogs = validBlogs;
        if (category && category !== "tous") {
          // console.log(`🔍 Filtering by category: "${category}"`);
          // console.log(`🔍 Available blogs: ${validBlogs.length}`);

          filteredBlogs = validBlogs.filter((blog) => {
            const blogCategorySlug = blog.categorie?.slug;
            const matches = blogCategorySlug === category;
            // console.log(`🔍 Blog "${blog.titre}" category slug: "${blogCategorySlug}" matches "${category}": ${matches}`);
            return matches;
          });

          // console.log(`🔍 Filtered blogs count: ${filteredBlogs.length}`);
        }

        return {
          ...result,
          data: filteredBlogs,
          meta: {
            ...(result.meta || {}),
            pagination: {
              ...(result.meta?.pagination || {}),
              total: filteredBlogs.length,
              pageCount: Math.ceil(filteredBlogs.length / pageSize),
            },
          },
        };
      }
    } else {
      const errorText = await response.text();
      // console.log(`❌ API failed: ${response.status} - ${errorText}`);
    }

    // If API fails, return empty results
    // console.log("⚠️ API failed, returning empty results");
    return {
      data: [],
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount: 0,
          total: 0,
        },
      },
    };
  } catch (error) {
    // console.error("❌ Error fetching blogs:", error);
    // console.log("⚠️ Returning empty results due to error");
    // Return empty results on error
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
};

// Get single blog by slug
export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    // Use localhost for server-side, relative for client-side
    const baseUrl =
      typeof window === "undefined" ? "http://localhost:3000" : "";
    const endpoint = `${baseUrl}/api/blogs/${encodeURIComponent(slug)}`;
    // console.log(`📡 Fetching blog by slug: ${endpoint}`);

    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 1800, // Revalidate every 30 minutes
        tags: ["blog", slug],
      },
      cache: "force-cache", // Enable aggressive caching
    });

    if (response.ok) {
      const blog = await response.json();
      if (blog && blog.id) {
        // Ensure blog has proper category data
        let categoryData = blog.categorie;

        // If category is an object but has different field names
        if (categoryData && typeof categoryData === "object") {
          const categoryName = categoryData.nom || "";
          const categorySlug = categoryData.slug || categoryData.id?.toString();

          if (categoryName) {
            categoryData = {
              id: categoryData.id || 0,
              nom: categoryName,
              slug: categorySlug || "unknown",
              description: categoryData.description || "",
              createdAt: categoryData.createdAt || new Date().toISOString(),
              updatedAt: categoryData.updatedAt || new Date().toISOString(),
            };
          }
        }

        return {
          ...blog,
          categorie: categoryData || {
            id: 0,
            nom: "Non classé",
            slug: "non-classe",
            description: "Article non classé",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        };
      }
    }

    // If not found, try again after a short delay (for cache issues)
    console.error(`⚠️ Blog not found for slug: ${slug}, retrying...`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

    // Retry the request
    const retryResponse = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 1800, // Revalidate every 30 minutes
        tags: ["blog", slug],
      },
      cache: "force-cache", // Enable aggressive caching
    });

    if (retryResponse.ok) {
      const retryBlog = await retryResponse.json();
      if (retryBlog && retryBlog.id) {
        return retryBlog;
      }
    }

    // Fallback to null
    console.error(`❌ Blog not found after retry for slug: ${slug}`);
    return null;
  } catch (error) {
    console.error("❌ Error fetching blog by slug:", error);
    // Fallback to null
    return null;
  }
};

// Get featured blogs
export const getFeaturedBlogs = async (
  limit: number = 5,
): Promise<BlogPost[]> => {
  try {
    // Use localhost for server-side, relative for client-side
    const baseUrl =
      typeof window === "undefined" ? "http://localhost:3000" : "";
    const endpoint = `${baseUrl}/api/blogs?pageSize=${limit}&sort=createdAt:desc`;
    // console.log(`📡 Fetching featured blogs: ${endpoint}`);

    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 900, // Revalidate every 15 minutes
        tags: ["featured-blogs"],
      },
      cache: "force-cache", // Enable aggressive caching
    });

    if (response.ok) {
      const result: BlogResponse = await response.json();
      if (result.data && result.data.length > 0) {
        // console.log("✅ Featured blogs loaded from API");
        // Ensure all blogs have proper category data
        const validBlogs = result.data.map((blog) => {
          let categoryData = blog.categorie;

          // If category is an object but has different field names
          if (categoryData && typeof categoryData === "object") {
            const categoryName = categoryData.nom || "" || "" || "";
            const categorySlug =
              categoryData.slug || categoryData.id?.toString();

            if (categoryName) {
              categoryData = {
                id: categoryData.id || 0,
                nom: categoryName,
                slug: categorySlug || "unknown",
                description: categoryData.description || "",
                createdAt: categoryData.createdAt || new Date().toISOString(),
                updatedAt: categoryData.updatedAt || new Date().toISOString(),
              };
            }
          }

          return {
            ...blog,
            categorie: categoryData || {
              id: 0,
              nom: "Non classé",
              slug: "non-classe",
              description: "Article non classé",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          };
        });
        return validBlogs;
      }
    }

    // Fallback to empty array
    // console.log("⚠️ API failed, returning empty featured blogs");
    return [];
  } catch (error) {
    // console.error("❌ Error fetching featured blogs:", error);
    return [];
  }
};

// Get popular/recent blogs
export const getPopularBlogs = async (
  limit: number = 10,
): Promise<BlogPost[]> => {
  try {
    // Use localhost for server-side, relative for client-side
    const baseUrl =
      typeof window === "undefined" ? "http://localhost:3000" : "";
    const endpoint = `${baseUrl}/api/blogs?pageSize=${limit}&sort=createdAt:desc`;
    // console.log(`📡 Fetching popular blogs: ${endpoint}`);

    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 900, // Revalidate every 15 minutes
        tags: ["popular-blogs"],
      },
      cache: "force-cache", // Enable aggressive caching
    });

    if (response.ok) {
      const result: BlogResponse = await response.json();
      if (result.data && result.data.length > 0) {
        // console.log("✅ Popular blogs loaded from API");
        // Ensure all blogs have proper category data
        const validBlogs = result.data.map((blog) => {
          let categoryData = blog.categorie;

          // If category is an object but has different field names
          if (categoryData && typeof categoryData === "object") {
            const categoryName = categoryData.nom || "" || "" || "";
            const categorySlug =
              categoryData.slug || categoryData.id?.toString();

            if (categoryName) {
              categoryData = {
                id: categoryData.id || 0,
                nom: categoryName,
                slug: categorySlug || "unknown",
                description: categoryData.description || "",
                createdAt: categoryData.createdAt || new Date().toISOString(),
                updatedAt: categoryData.updatedAt || new Date().toISOString(),
              };
            }
          }

          return {
            ...blog,
            categorie: categoryData || {
              id: 0,
              nom: "Non classé",
              slug: "non-classe",
              description: "Article non classé",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          };
        });
        return validBlogs;
      }
    }

    // Fallback to empty array
    // console.log("⚠️ API failed, returning empty popular blogs");
    return [];
  } catch (error) {
    // console.error("❌ Error fetching popular blogs:", error);
    return [];
  }
};

// Get all blogs by making multiple requests to bypass 100-item limit
export const getAllBlogs = async (
  params: {
    category?: string;
    search?: string;
    sort?: string;
  } = {},
): Promise<BlogPost[]> => {
  // console.log(
  //   "🔍 Fetching ALL blogs from Strapi (bypassing 100-item limit)..."
  // );

  try {
    const { category, search, sort = "createdAt:desc" } = params;
    const allBlogs: BlogPost[] = [];
    let page = 1;
    const pageSize = 100; // Maximum allowed by Strapi
    let hasMore = true;

    while (hasMore) {
      // Use localhost for server-side, relative for client-side
      const baseUrl =
        typeof window === "undefined" ? "http://localhost:3000" : "";
      let url = `${baseUrl}/api/blogs?page=${page}&pageSize=${pageSize}&sort=${sort}`;

      // Add efficient search filter - only title, slug, and category
      if (search) {
        // Comprehensive sanitization to prevent XSS, SQL injection, and other attacks
        const sanitizedSearch = search
          .trim()
          // XSS Protection
          .replace(/[<>]/g, "") // Remove HTML tags
          .replace(/javascript:/gi, "") // Remove javascript protocol
          .replace(/on\w+=/gi, "") // Remove event handlers
          .replace(/data:/gi, "") // Remove data URLs
          .replace(/vbscript:/gi, "") // Remove vbscript
          .replace(/eval\s*\(/gi, "") // Remove eval calls
          .replace(/expression\s*\(/gi, "") // Remove CSS expressions

          // SQL Injection Protection (enhanced patterns)
          .replace(/['"`;\\]/g, "") // Remove SQL injection characters
          .replace(/--/g, "") // Remove SQL comments
          .replace(/\/\*/g, "") // Remove SQL block comment start
          .replace(/\*\//g, "") // Remove SQL block comment end
          .replace(
            /\b(select|from|union|insert|update|delete|drop|create|alter|exec|execute|script|xp_cmdshell|sp_executesql)\b/gi,
            "",
          ) // Remove SQL keywords
          .replace(/\b(or|and)\s*(1\s*=\s*1|true|false)\b/gi, "") // Remove SQL boolean injections
          .replace(/\|\||&&/g, "") // Remove logical operators that could be used in injections

          // NoSQL Injection Protection
          .replace(/\$\w+/g, "") // Remove MongoDB operators
          .replace(/\{|\}/g, "") // Remove JSON-like structures

          // Directory Traversal Protection
          .replace(/\.\./g, "") // Remove directory traversal
          .replace(/[\\\/]/g, "") // Remove path separators

          // Command Injection Protection
          .replace(/[|&;$`]/g, "") // Remove command injection characters
          .replace(/\$\(/g, "") // Remove command substitution

          // Additional security measures
          .replace(/\s+/g, " ") // Normalize multiple spaces to single space
          .replace(/[^\w\s\-_.]/g, "") // Only allow alphanumeric, spaces, hyphens, underscores, dots
          .substring(0, 50); // Reasonable limit for search queries

        if (sanitizedSearch) {
          url += `&search=${encodeURIComponent(sanitizedSearch)}`;
        }
      }

      // console.log(`📡 Fetching page ${page}: ${url}`);

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 1800, // Revalidate every 30 minutes
          tags: ["all-blogs", category || "all", search || "no-search"],
        },
      });

      if (response.ok) {
        const result: BlogResponse = await response.json();
        if (result.data && result.data.length > 0) {
          // Process blogs with same logic as getBlogs
          const validBlogs = result.data.map((blog) => {
            let categoryData = blog.categorie;

            if (categoryData && typeof categoryData === "object") {
              const categoryName = categoryData.nom || "" || "" || "";
              const categorySlug =
                categoryData.slug || categoryData.id?.toString();

              if (categoryName) {
                categoryData = {
                  id: categoryData.id || 0,
                  nom: categoryName,
                  slug: categorySlug || "unknown",
                  description: categoryData.description || "",
                  createdAt: categoryData.createdAt || new Date().toISOString(),
                  updatedAt: categoryData.updatedAt || new Date().toISOString(),
                };
              }
            }

            // Use the category data directly from API
            if (blog.categorie && typeof blog.categorie === "object") {
              categoryData = {
                id: blog.categorie.id || 0,
                nom: blog.categorie.nom || "Auto",
                slug: blog.categorie.slug || "auto",
                description: blog.categorie.description || "",
                createdAt: blog.categorie.createdAt || new Date().toISOString(),
                updatedAt: blog.categorie.updatedAt || new Date().toISOString(),
              };
              // console.log("✅ Using API category:", categoryData.nom);
            } else {
              // console.log(`⚠️ No category from API for blog: "${blog.titre}"`);

              // Use a default category
              categoryData = {
                id: 1,
                nom: "Auto",
                slug: "auto",
                description: "Assurance automobile",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
              // console.log("✅ Assigned default category: Auto");
            }

            return {
              ...blog,
              categorie: categoryData,
            };
          });

          allBlogs.push(...validBlogs);

          // Check if we got less than pageSize, meaning no more pages
          if (result.data.length < pageSize) {
            hasMore = false;
          } else {
            page++;
          }
        } else {
          hasMore = false;
        }
      } else {
        // console.log(`❌ API failed on page ${page}: ${response.status}`);
        hasMore = false;
      }
    }

    // Apply client-side category filtering
    let filteredBlogs = allBlogs;
    if (category && category !== "tous") {
      // console.log(`🔍 Filtering ${allBlogs.length} blogs by category: "${category}"`);
      filteredBlogs = allBlogs.filter((blog) => {
        const blogCategorySlug = blog.categorie?.slug;
        return blogCategorySlug === category;
      });
      // console.log(`🔍 Filtered to ${filteredBlogs.length} blogs`);
    }

    // console.log(`✅ Loaded ${filteredBlogs.length} total blogs`);
    return filteredBlogs;
  } catch (error) {
    // console.error("❌ Error fetching all blogs:", error);
    return [];
  }
};

// Search blogs
export const searchBlogs = async (
  query: string,
  category?: string,
): Promise<BlogPost[]> => {
  try {
    // Comprehensive sanitization to prevent XSS, SQL injection, and other attacks
    const sanitizedSearch = query
      .trim()
      // XSS Protection
      .replace(/[<>]/g, "") // Remove HTML tags
      .replace(/javascript:/gi, "") // Remove javascript protocol
      .replace(/on\w+=/gi, "") // Remove event handlers
      .replace(/data:/gi, "") // Remove data URLs
      .replace(/vbscript:/gi, "") // Remove vbscript
      .replace(/eval\s*\(/gi, "") // Remove eval calls
      .replace(/expression\s*\(/gi, "") // Remove CSS expressions

      // SQL Injection Protection (enhanced patterns)
      .replace(/['"`;\\]/g, "") // Remove SQL injection characters
      .replace(/--/g, "") // Remove SQL comments
      .replace(/\/\*/g, "") // Remove SQL block comment start
      .replace(/\*\//g, "") // Remove SQL block comment end
      .replace(
        /\b(select|from|union|insert|update|delete|drop|create|alter|exec|execute|script|xp_cmdshell|sp_executesql)\b/gi,
        "",
      ) // Remove SQL keywords
      .replace(/\b(or|and)\s*(1\s*=\s*1|true|false)\b/gi, "") // Remove SQL boolean injections
      .replace(/\|\||&&/g, "") // Remove logical operators that could be used in injections

      // NoSQL Injection Protection
      .replace(/\$\w+/g, "") // Remove MongoDB operators
      .replace(/\{|\}/g, "") // Remove JSON-like structures

      // Directory Traversal Protection
      .replace(/\.\./g, "") // Remove directory traversal
      .replace(/[\\\/]/g, "") // Remove path separators

      // Command Injection Protection
      .replace(/[|&;$`]/g, "") // Remove command injection characters
      .replace(/\$\(/g, "") // Remove command substitution

      // Additional security measures
      .replace(/\s+/g, " ") // Normalize multiple spaces to single space
      .replace(/[^\w\s\-_.]/g, "") // Only allow alphanumeric, spaces, hyphens, underscores, dots
      .substring(0, 50); // Reasonable limit for search queries

    if (!sanitizedSearch) return [];

    // Use localhost for server-side, relative for client-side
    const baseUrl =
      typeof window === "undefined" ? "http://localhost:3000" : "";
    const url = `${baseUrl}/api/blogs?search=${encodeURIComponent(sanitizedSearch)}&sort=createdAt:desc`;

    // Note: Category filtering will be handled client-side
    // if (category && category !== "tous") {
    //   url += `&filters[categorie][slug][$eq]=${category}`;
    // }

    // console.log(`📡 Searching blogs: ${url}`);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 900, // Revalidate every 15 minutes for search
        tags: ["search-blogs", sanitizedSearch, category || "all"],
      },
    });

    if (response.ok) {
      const result: BlogResponse = await response.json();
      if (result.data && result.data.length > 0) {
        // console.log("✅ Search results loaded from API");
        // Use same category assignment logic as getBlogs
        const validBlogs = result.data.map((blog) => {
          // Check if category data exists from API
          let categoryData = null;
          if (
            blog.categorie &&
            typeof blog.categorie === "object" &&
            blog.categorie.nom
          ) {
            categoryData = {
              id: blog.categorie.id || 0,
              nom: blog.categorie.nom,
              slug: blog.categorie.slug || "non-classe",
              description: blog.categorie.description || "",
              createdAt: blog.categorie.createdAt || new Date().toISOString(),
              updatedAt: blog.categorie.updatedAt || new Date().toISOString(),
            };
          } else {
            // console.log(`⚠️ No category from API for blog: "${blog.titre}"`);

            // Use a default category when API doesn't provide one
            categoryData = {
              id: 1,
              nom: "Auto",
              slug: "auto",
              description: "Assurance automobile",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            // console.log("✅ Assigned default category: Auto");
          }

          return {
            ...blog,
            categorie: categoryData,
          };
        });

        // Apply client-side category filtering
        let filteredBlogs = validBlogs;
        if (category && category !== "tous") {
          filteredBlogs = validBlogs.filter((blog) => {
            const blogCategorySlug = blog.categorie?.slug;
            return blogCategorySlug === category;
          });
        }

        return filteredBlogs;
      }
    }

    // Fallback to empty array
    // console.log("⚠️ API failed, returning empty search results");
    return [];
  } catch (error) {
    // console.error("❌ Error searching blogs:", error);
    // Fallback to empty array
    return [];
  }
};
