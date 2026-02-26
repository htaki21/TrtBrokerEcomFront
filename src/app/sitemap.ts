import { getAllBlogs } from "@/lib/services/blogService";
import { MetadataRoute } from "next";

/**
 * Enterprise-Level SEO Sitemap Configuration
 *
 * Priority Guidelines:
 * - 1.0: Homepage (highest priority)
 * - 0.9: Main conversion pages (insurance products, devis)
 * - 0.8: Secondary conversion pages & important content
 * - 0.7: Supporting pages (about, blog index)
 * - 0.6: Blog posts & FAQ
 * - 0.5: Career & other pages
 * - 0.3: Legal pages
 *
 * Change Frequency Strategy:
 * - daily: Homepage, blog index (fresh content)
 * - weekly: Product pages, devis pages, career (regular updates)
 * - monthly: About, contact, FAQ (occasional updates)
 * - yearly: Legal pages (rare updates)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://trtbroker.com";
  const currentDate = new Date().toISOString();

  // 1. HOMEPAGE - Maximum Priority
  const homepage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
  ];

  // 2. CORE INSURANCE PRODUCTS - High Priority (Main Business Pages)
  const coreInsurancePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/assurance-automobile`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.95, // Top product
    },
    {
      url: `${baseUrl}/assurance-habitation`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.95, // Top product
    },
    {
      url: `${baseUrl}/assurance-moto`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/assurance-sante`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // 3. B2B & PROFESSIONAL INSURANCE - High Priority
  const professionalInsurancePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/assurance-entreprise`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.95, // Key B2B page
    },
    {
      url: `${baseUrl}/assurance-professionnelle`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // 4. SECONDARY INSURANCE PRODUCTS - Medium-High Priority
  const secondaryInsurancePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/assurance-voyage`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/assurance-plaisance-jet-ski`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/assurance-individuelle-accidents`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/assurance-maladie-complementaire`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // 5. QUOTE/DEVIS PAGES - High Priority (Conversion Funnels)
  const quotePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/devis-assurance-auto`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9, // High conversion page
    },
    {
      url: `${baseUrl}/devis-assurance-habitation`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9, // High conversion page
    },
    {
      url: `${baseUrl}/devis-assurance-moto`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/devis-assurance-sante`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/devis-assurance-plaisance-jet-ski`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/devis-assurance-individuelle-accidents`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/devis-assurance-assistance-voyage`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    },
  ];

  // 6. CONTENT & ENGAGEMENT PAGES - Medium Priority
  const contentPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/actualites-conseils`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.8, // Fresh content hub
    },
    {
      url: `${baseUrl}/qui-sommes-nous`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7, // Important for conversions
    },
  ];

  // 7. CAREER & RECRUITMENT - Medium-Low Priority
  const careerPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/carriere`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
  ];

  // 8. LEGAL & COMPLIANCE PAGES - Low Priority
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/conditions-generales-vente`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/conditions-generales-utilisation`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // 9. DYNAMIC BLOG POSTS - Medium-Low Priority (SEO Content)
  let blogPages: MetadataRoute.Sitemap = [];

  try {
    const blogPosts = await getAllBlogs();

    blogPages = blogPosts.map((post) => ({
      url: `${baseUrl}/actualites-conseils/${post.slug}`,
      lastModified: post.updatedAt || post.createdAt,
      changeFrequency: "monthly" as const, // Blog posts are relatively static after publication
      priority: 0.6, // SEO value but lower than conversion pages
    }));
  } catch (error) {
    console.error("Error fetching blog data for sitemap:", error);
    // Fail gracefully - sitemap will still work without blog posts
  }

  /**
   * SITEMAP STRUCTURE (Ordered by Priority)
   *
   * This order ensures search engines crawl the most important pages first:
   * 1. Homepage (1.0)
   * 2. Core products & B2B pages (0.95)
   * 3. Conversion funnels (devis pages) (0.9-0.85)
   * 4. Secondary products (0.85-0.8)
   * 5. Content & engagement (0.8-0.65)
   * 6. Blog posts (0.6)
   * 7. Career (0.6)
   * 8. Legal (0.3)
   */
  return [
    ...homepage,
    ...coreInsurancePages,
    ...professionalInsurancePages,
    ...quotePages,
    ...secondaryInsurancePages,
    ...contentPages,
    ...blogPages,
    ...careerPages,
    ...legalPages,
  ];
}
