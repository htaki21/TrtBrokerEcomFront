"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { getBlogs } from "@/lib/services/blogService";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import ButtonLink from "../components/buttons/ButtonLink";
import CarouselItemSkeleton from "./components/CarouselItemSkeleton";

interface Post {
  img: string;
  category: string;
  title: string;
  date: string;
  slug: string;
}

interface BlogPostsProps {
  posts?: Post[]; // Make optional for backward compatibility
}

export default function CarouselPosts({ posts: propPosts }: BlogPostsProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  );
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Helper function to get image URL
  const getImageUrl = (
    image: { url?: string; alternativeText?: string } | null,
  ) => {
    if (image?.url) {
      if (image.url.startsWith("http")) {
        const urlObj = new URL(image.url);
        return `/api/media${urlObj.pathname}`;
      }
      if (image.url.startsWith("/uploads")) {
        return `/api/media${image.url}`;
      }
      return `/api/media/uploads/${image.url}`;
    }
    return "/Épargne-Préparation.png";
  };

  // Load blogs data
  React.useEffect(() => {
    const loadBlogs = async () => {
      // If posts are provided as props, use them
      if (propPosts && propPosts.length > 0) {
        setPosts(propPosts);
        setLoading(false);
        return;
      }

      // Otherwise, fetch from API
      try {
        setLoading(true);
        const blogsData = await getBlogs({
          page: 1,
          pageSize: 12, // Limit to 12 latest posts for carousel
          category: "tous",
          search: "",
        });

        // Convert BlogPost[] to Post[] format and limit to 12 items
        const convertedPosts: Post[] = blogsData.data
          .slice(0, 12)
          .map((blog) => ({
            img: getImageUrl(blog.image || null),
            category: blog.categorie?.nom || "Auto",
            title: blog.titre,
            date: formatDate(blog.createdAt),
            slug: blog.slug,
          }));

        setPosts(convertedPosts);
        setError(null);
      } catch {
        setError("Erreur lors du chargement des articles");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [propPosts]);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    api.on("select", onSelect);

    setActiveIndex(api.selectedScrollSnap());

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative w-full max-w-[1180px]">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
      >
        <CarouselContent className="-ml-4">
          {loading ? (
            // Show skeleton loading while fetching
            Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem
                key={`skeleton-${index}`}
                className="basis-1/4 max-tablet:basis-1/3 max-mobile:basis-1/1 pl-4"
              >
                <CarouselItemSkeleton />
              </CarouselItem>
            ))
          ) : error ? (
            // Show error state
            <CarouselItem
              key="error-state"
              className="basis-1/4 max-tablet:basis-1/3 max-mobile:basis-1/1 pl-4"
            >
              <div className="f-col w-full items-center justify-center py-8">
                <p className="text-Text-Body">
                  Erreur lors du chargement des articles
                </p>
              </div>
            </CarouselItem>
          ) : posts.length === 0 ? (
            // Show empty state
            <CarouselItem
              key="empty-state"
              className="basis-1/4 max-tablet:basis-1/3 max-mobile:basis-1/1 pl-4"
            >
              <div className="f-col w-full items-center justify-center py-8">
                <p className="text-Text-Body">Aucun article trouvé</p>
              </div>
            </CarouselItem>
          ) : (
            // Show actual posts with EXACT same design
            posts.map((post, index) => (
              <CarouselItem
                key={index}
                className="basis-1/4 max-tablet:basis-1/3 max-mobile:basis-1/1 pl-4"
              >
                <Link
                  href={`/actualites-conseils/${post.slug}`}
                  prefetch={true} // Enable prefetching for better performance
                  className="f-col w-full transition-transform duration-300 cursor-pointer"
                >
                  <div className="relative w-[280px] h-[240px] max-mobile:w-[500px] max-mobile:h-[308px] overflow-hidden rounded-[12px] shadow-[0_1px_3px_-1px_rgba(140,140,140,0.10),_0_1px_6px_0_rgba(140,140,140,0.10)]">
                    <Image
                      src={post.img}
                      alt={post.category}
                      fill
                      className="object-cover transition-transform duration-2000 ease-out hover:scale-120"
                    />
                  </div>

                  <div className="f-col gap-4 py-5">
                    <div className="f-col gap-2">
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="6"
                          viewBox="0 0 6 6"
                          fill="none"
                        >
                          <circle cx="3" cy="3" r="3" fill="#0F110C" />
                        </svg>
                        <span className="Button2-XS text-BG-Dark">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-BG-Dark Button-M">{post.title}</h3>
                    </div>
                    <span className="Button2-XS text-Text-Body">
                      {post.date}
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
      </Carousel>
      {/* pagination and custom arrows - EXACT same design */}
      <div className="mt-4 max-mobile:mt-0 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {loading
            ? // Show skeleton pagination dots
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={`skeleton-dot-${index}`}
                  className="bg-Neutral-BG-3 h-1.5 w-1.5 rounded-full animate-pulse"
                ></div>
              ))
            : posts.map((_, index) => (
                <div
                  key={index}
                  className={`flex transition-all duration-300 ease-in-out ${
                    index === activeIndex
                      ? "bg-Neutral-Dark h-1.5 w-8"
                      : "bg-Neutral-BG-3 h-1.5 w-1.5"
                  } rounded-full`}
                ></div>
              ))}
        </div>
        <div className="flex items-center gap-2">
          <ButtonLink
            direction="left"
            color="gray"
            iconClassName="w-7 h-7"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              api?.scrollPrev();
            }}
            ariaLabel="Article précédent"
          />
          <ButtonLink
            color="gray"
            iconClassName="w-7 h-7"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              api?.scrollNext();
            }}
            ariaLabel="Article suivant"
          />
        </div>
      </div>
    </div>
  );
}
