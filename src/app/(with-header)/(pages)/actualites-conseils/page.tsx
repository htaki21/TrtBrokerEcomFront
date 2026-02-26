"use client";
import { generateStructuredData } from "@/lib/seo";
import {
  BlogCategory,
  BlogPost,
  getAllBlogs,
  getCategories,
} from "@/lib/services/blogService";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import BlogCard from "./components/BlogCard";
import BlogCardSkeleton from "./components/BlogCardSkeleton";

const ActualitesConseilsContent = () => {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allBlogsLoaded, setAllBlogsLoaded] = useState<BlogPost[]>([]);
  const observerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup debounce timer on component unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Handle URL parameters on page load
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        setError(null);
      } catch (error) {
        console.error("❌ Error loading categories:", error);
        setError("Erreur lors du chargement des catégories");
      }
    };

    loadCategories();
  }, []);

  // Load initial blogs when component mounts or filters change
  useEffect(() => {
    const loadInitialBlogs = async () => {
      setLoading(true);
      setError(null);
      setCurrentPage(1);
      setAllBlogsLoaded([]);
      setHasMore(true);

      try {
        // First, get all blogs to bypass the 100-item limit
        const allBlogs = await getAllBlogs({
          category: selectedCategory,
          search: debouncedSearchQuery,
        });

        // Show first 25 blogs initially
        const initialBlogs = allBlogs.slice(0, 25);
        setBlogs(initialBlogs);
        setAllBlogsLoaded(allBlogs);
        setHasMore(allBlogs.length > 25); // More blogs available if total > 25
        setError(null);
      } catch {
        setError("Erreur lors du chargement des articles");
        setBlogs([]);
        setAllBlogsLoaded([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadInitialBlogs();
  }, [selectedCategory, debouncedSearchQuery]);

  // Load more blogs for infinite scroll
  const loadMoreBlogs = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    // Use the current number of blogs loaded as the start index
    const startIndex = blogs.length;
    const endIndex = Math.min(startIndex + 25, allBlogsLoaded.length);

    try {
      // Get more blogs from the already loaded data
      const moreBlogs = allBlogsLoaded.slice(startIndex, endIndex);

      if (moreBlogs.length > 0) {
        setBlogs((prev) => {
          const newBlogs = [...prev, ...moreBlogs];
          // Check if we've loaded all blogs by comparing the new total with the total available
          const hasMoreBlogs = newBlogs.length < allBlogsLoaded.length;
          setHasMore(hasMoreBlogs);
          return newBlogs;
        });
        setCurrentPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("❌ Error loading more blogs", error);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [blogs.length, allBlogsLoaded, loadingMore, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!hasMore || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMoreBlogs();
        }
      },
      { threshold: 0.1 },
    );

    // Use a timeout to ensure the element is rendered
    const timeoutId = setTimeout(() => {
      if (observerRef.current) {
        observer.observe(observerRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      const currentRef = observerRef.current;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMoreBlogs, hasMore, loadingMore, blogs.length]);

  // Comprehensive security sanitization for search input
  const sanitizeSearchInput = (input: string): string => {
    return (
      input
        // XSS Protection
        .replace(/[<>]/g, "") // Remove HTML tags
        .replace(/javascript:/gi, "") // Remove javascript protocol
        .replace(/on\w+=/gi, "") // Remove event handlers
        .replace(/data:/gi, "") // Remove data URLs
        .replace(/vbscript:/gi, "") // Remove vbscript

        // SQL Injection Protection
        .replace(/['"`;\\]/g, "") // Remove SQL injection characters
        .replace(/--/g, "") // Remove SQL comments
        .replace(/\/\*/g, "") // Remove SQL block comment start
        .replace(/\*\//g, "") // Remove SQL block comment end
        .replace(
          /\b(union|select|insert|update|delete|drop|create|alter|exec|execute|script)\b/gi,
          "",
        ) // Remove SQL keywords

        // NoSQL Injection Protection
        .replace(/\$\w+/g, "") // Remove MongoDB operators
        .replace(/\{|\}/g, "") // Remove JSON-like structures

        // Directory Traversal Protection
        .replace(/\.\./g, "") // Remove directory traversal
        .replace(/[\\\/]/g, "") // Remove path separators

        // Command Injection Protection
        .replace(/[|&;$`]/g, "") // Remove command injection characters
        .replace(/\$\(/g, "") // Remove command substitution

        // Length and content limits
        .replace(/\s+/g, " ") // Normalize multiple spaces to single space
        .substring(0, 50)
    ); // Reasonable limit for search queries
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Allow normal typing but prevent malicious input
    if (rawValue.length > 50) return; // Prevent excessive length

    const sanitizedValue = sanitizeSearchInput(rawValue);
    setSearchQuery(sanitizedValue);

    // Enhanced debouncing with ref to prevent race conditions
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Clear search immediately if empty (after trimming for check only)
    if (!sanitizedValue.trim()) {
      setDebouncedSearchQuery("");
      debounceTimerRef.current = null;
    } else {
      // Set a new timer for non-empty searches
      debounceTimerRef.current = setTimeout(() => {
        setDebouncedSearchQuery(sanitizedValue.trim());
        debounceTimerRef.current = null;
      }, 1000); // 1 second delay to ensure user finishes typing
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The useEffect will automatically trigger when debouncedSearchQuery changes
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Don't reset search when changing category - let user keep their search
  };

  // Efficient search filtering function - only title, slug, and category
  const filterBlogsBySearch = (
    blogs: BlogPost[],
    searchTerm: string,
  ): BlogPost[] => {
    if (!searchTerm.trim()) return blogs;

    const term = searchTerm.toLowerCase().trim();
    return blogs.filter((blog) => {
      // Search in title (most important)
      if (blog.titre?.toLowerCase().includes(term)) return true;

      // Search in slug
      if (blog.slug?.toLowerCase().includes(term)) return true;

      // Search in category name
      if (blog.categorie?.nom?.toLowerCase().includes(term)) return true;

      return false;
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Get image URL with fallback
  const getImageUrl = (
    image: { url?: string; alternativeText?: string } | null,
  ) => {
    if (image?.url) {
      // If it's already a full URL, extract path and use media proxy
      if (image.url.startsWith("http")) {
        const urlObj = new URL(image.url);
        return `/api/media${urlObj.pathname}`;
      }
      // If it starts with /uploads, use media proxy
      if (image.url.startsWith("/uploads")) {
        return `/api/media${image.url}`;
      }
      // For static images (like /Épargne-Préparation.png), return as is
      if (image.url.startsWith("/")) {
        return image.url;
      }
      // Otherwise, assume it's a relative path and use media proxy
      return `/api/media/uploads/${image.url}`;
    }
    return "/Épargne-Préparation.png"; // Fallback image
  };

  return (
    <div className="relative max-w-[1180px] mx-auto py-32 max-mobile:py-16 max-mobile:px-4">
      <div className="flex flex-col items-center justify-center gap-y-14 py-12 max-mobile:gap-y-8 max-mobile:py-6">
        <div className="flex flex-col items-center gap-[25px] pb-[56px] self-stretch max-mobile:pb-9">
          <div className="flex flex-col justify-center items-center  gap-3 self-stretch">
            <h1 className="Headings-H1 text-[#0F110C] text-center">
              Nos conseils et actualités
            </h1>
            <p className="text-[#8C8C8C] Text-M max-mobile:text-center">
              Restez informé, comparez, et assurez plus intelligemment.
            </p>
          </div>
          <form
            onSubmit={handleSearchSubmit}
            className="flex justify-center items-center gap-2 py-3 pr-[236px] pl-4 rounded-[76px] bg-[#E8E8E8] max-tablet:pr-8 max-mobile:pr-4 max-mobile:px-4 max-mobile:w-full max-mobile:max-w-[400px] cursor-text"
            onClick={() => document.getElementById("search-input")?.focus()}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16667 1.875C13.1937 1.875 16.4583 5.13959 16.4583 9.16667C16.4583 10.9552 15.8131 12.5921 14.7445 13.8607L17.9419 17.0581L17.985 17.1053C18.1853 17.3508 18.1707 17.7131 17.9419 17.9419C17.7131 18.1707 17.3508 18.1853 17.1053 17.985L17.0581 17.9419L13.8607 14.7445C12.5921 15.8131 10.9552 16.4583 9.16667 16.4583C5.13959 16.4583 1.875 13.1937 1.875 9.16667C1.875 5.13959 5.13959 1.875 9.16667 1.875ZM9.16667 3.125C5.82995 3.125 3.125 5.82995 3.125 9.16667C3.125 12.5034 5.82995 15.2083 9.16667 15.2083C12.5034 15.2083 15.2083 12.5034 15.2083 9.16667C15.2083 5.82995 12.5034 3.125 9.16667 3.125Z"
                  fill="#0F110C"
                />
              </svg>
            </span>
            <label htmlFor="search-input" className="sr-only">
              Rechercher dans les articles
            </label>
            <input
              id="search-input"
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={handleSearchChange}
              maxLength={50}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              className="text-[#8C8C8C] button-s bg-transparent outline-none focus:outline-none focus:ring-0 focus:border-transparent w-32 max-tablet:w-40 max-mobile:w-full"
              aria-label="Rechercher dans les articles"
            />
          </form>
        </div>
        <div className="flex flex-col items-start self-stretch gap-6">
          <div className="flex flex-col items-start gap-6 self-stretch w-full">
            <div className="flex items-start gap-6 self-stretch border-b border-[#E8E8E8] pb-6 w-full max-mobile:gap-3 max-mobile:pb-4 max-mobile:overflow-x-auto">
              <span
                className={`Button2-M cursor-pointer transition-colors whitespace-nowrap ${
                  selectedCategory === "tous"
                    ? "text-[#0D0F0B] border-b border-[#0F110C]"
                    : "text-[#525252] hover:text-[#0D0F0B]"
                }`}
                onClick={() => handleCategoryChange("tous")}
              >
                Tous
              </span>
              {loading && categories.length === 0
                ? // Show loading skeleton for categories
                  Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-16 h-6 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))
                : categories.map((category) => (
                    <span
                      key={category.id}
                      className={`Button2-M cursor-pointer transition-colors whitespace-nowrap ${
                        selectedCategory === category.slug
                          ? "text-[#0D0F0B] border-b border-[#0F110C]"
                          : "text-[#525252] hover:text-[#0D0F0B]"
                      }`}
                      onClick={() => handleCategoryChange(category.slug)}
                    >
                      {category.nom}
                    </span>
                  ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-5 w-[1180px] max-tablet:w-full max-mobile:w-full">
            <div className="grid grid-cols-4 gap-5 w-[1180px] max-tablet:grid-cols-2 max-tablet:w-full max-tablet:gap-4 max-mobile:flex max-mobile:flex-col max-mobile:w-full max-mobile:gap-4">
              {loading ? (
                // Loading skeletons
                Array.from({ length: 8 }).map((_, index) => (
                  <BlogCardSkeleton key={index} />
                ))
              ) : error ? (
                <div className="col-span-4 max-tablet:col-span-2 max-mobile:col-span-1 text-center py-8">
                  <p className="Text-M text-red-600 mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    aria-label="Réessayer de charger les articles"
                  >
                    Réessayer
                  </button>
                </div>
              ) : blogs.length > 0 ? (
                <>
                  {blogs.map((blog) => {
                    return (
                      <BlogCard
                        key={blog.id}
                        image={getImageUrl(blog.image || null)}
                        imageAlt={blog.image?.alternativeText || blog.titre}
                        category={blog.categorie?.nom || "Non classé"}
                        title={blog.titre}
                        date={formatDate(blog.createdAt)}
                        slug={blog.slug}
                      />
                    );
                  })}
                  {/* Loading more indicator */}
                  {loadingMore && (
                    <div className="col-span-4 max-tablet:col-span-2 max-mobile:col-span-1 flex justify-center py-8">
                      <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F110C]"></div>
                        <p className="Text-S text-[#8C8C8C]">Chargement...</p>
                      </div>
                    </div>
                  )}
                  {/* Intersection Observer trigger */}
                  {hasMore && !loadingMore && (
                    <div
                      ref={observerRef}
                      className="col-span-4 max-tablet:col-span-2 max-mobile:col-span-1 h-20 flex items-center justify-center"
                    >
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F110C]"></div>
                    </div>
                  )}
                </>
              ) : (
                <div className="col-span-4 max-tablet:col-span-2 max-mobile:col-span-1 text-center py-12">
                  <div className="flex flex-col items-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-[#8C8C8C]"
                    >
                      <path
                        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex flex-col gap-2">
                      <p className="Text-M text-[#8C8C8C]">
                        Aucun article trouvé
                      </p>
                      <p className="Text-S text-[#8C8C8C]">
                        {debouncedSearchQuery && selectedCategory !== "tous" ? (
                          <>
                            pour &quot;{debouncedSearchQuery}&quot; dans la
                            catégorie &quot;
                            {categories.find((c) => c.slug === selectedCategory)
                              ?.nom || selectedCategory}
                            &quot;
                          </>
                        ) : debouncedSearchQuery ? (
                          <>pour &quot;{debouncedSearchQuery}&quot;</>
                        ) : selectedCategory !== "tous" ? (
                          <>
                            dans la catégorie &quot;
                            {categories.find((c) => c.slug === selectedCategory)
                              ?.nom || selectedCategory}
                            &quot;
                          </>
                        ) : (
                          "Essayez de modifier vos critères de recherche"
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCategory("tous");
                        setSearchQuery("");
                        setDebouncedSearchQuery("");
                      }}
                      className="px-4 py-2 bg-[#0F110C] text-white rounded-lg hover:bg-[#333] transition-colors cursor-pointer"
                      aria-label="Effacer tous les filtres de recherche"
                    >
                      Effacer les filtres
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  // Generate structured data for blog listing page
  const breadcrumbData = generateStructuredData("BreadcrumbList", {
    items: [
      { name: "Accueil", url: "https://trtbroker.com" },
      {
        name: "Actualités et conseils",
        url: "https://trtbroker.com/actualites-conseils",
      },
    ],
  });

  return (
    <>
      {/* Structured Data for Blog Listing */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />

      <Suspense
        fallback={
          <div className="min-h-screen bg-white">
            <div className="pt-[132px] max-laptop:px-4 max-mobile:py-16 max-mobile:px-2">
              <div className="max-w-[1180px] mx-auto">
                <div className="f-col gap-8">
                  <div className="f-col gap-4">
                    <div className="w-64 h-8 bg-gray-200 animate-pulse rounded"></div>
                    <div className="w-96 h-6 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <BlogCardSkeleton key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <ActualitesConseilsContent />
      </Suspense>
    </>
  );
};

export default Page;
