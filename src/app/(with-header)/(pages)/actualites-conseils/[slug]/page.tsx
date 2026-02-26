import FacebookIcon from "@/app/components/social-icons/FacebookIcon";
import InstagramIcon from "@/app/components/social-icons/InstagramIcon";
import LinkedInIcon from "@/app/components/social-icons/LinkedInIcon";
import TwitterIcon from "@/app/components/social-icons/TwitterIcon";
import Wrapper1180 from "@/app/components/wrapper/wrapper-1180";
import { getAllBlogs, getBlogBySlug } from "@/lib/services/blogService";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Helper function to get image URL - use media proxy to avoid external DNS
const getImageUrl = (
  image:
    | { id: number; url: string; alternativeText?: string }
    | null
    | undefined,
) => {
  if (image?.url) {
    if (image.url.startsWith("http")) {
      // Extract path from full URL and use media proxy
      const urlObj = new URL(image.url);
      return `/api/media${urlObj.pathname}`;
    }
    if (image.url.startsWith("/uploads")) {
      return `/api/media${image.url}`;
    }
    if (image.url.startsWith("/")) {
      return image.url;
    }
    return `/api/media/uploads/${image.url}`;
  }
  return "/Épargne-Préparation.png";
};

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs();
    const params = blogs.map((blog) => ({
      slug: blog.slug,
    }));

    return params;
  } catch (error) {
    console.error(
      "❌ Error generating static params, will use on-demand generation:",
      error,
    );
    // Return empty array if fetch fails - pages will be generated on-demand
    return [];
  }
}

// Enable ISR with longer revalidation period to prevent frequent cache misses
export const revalidate = 1800; // Revalidate every 30 minutes

// Allow dynamic rendering for blog posts not in generateStaticParams
export const dynamicParams = true;

// Helper function to get category name
const getCategoryName = (blogPost: {
  categorie?: { nom: string };
  titre?: string;
}) => {
  // Use only API category data
  if (blogPost.categorie?.nom && blogPost.categorie.nom !== "Non classé") {
    return blogPost.categorie.nom;
  }

  // If no valid API category, return a default
  return "Auto";
};

// Helper function to detect and style tips in content
const processContentWithTips = (content: string) => {
  if (!content) return content;

  // Detect Conseil patterns (case insensitive)
  const conseilPattern =
    /(?:^|\n)\s*(?:Conseil|CONSEIL|conseil)\s*[:\-]\s*([^\n\r]+)/gim;
  // Detect Attention patterns (case insensitive)
  const attentionPattern =
    /(?:^|\n)\s*(?:Attention|ATTENTION|attention)\s*[:\-]\s*([^\n\r]+)/gim;
  // Detect À retenir patterns (case insensitive)
  const aRetenirPattern =
    /(?:^|\n)\s*(?:À retenir|À RETENIR|à retenir)\s*[:\-]\s*([^\n\r]+)/gim;
  // Detect Délai patterns (case insensitive)
  const delaiPattern =
    /(?:^|\n)\s*(?:Délai|DÉLAI|délai)\s*[:\-]\s*([^\n\r]+)/gim;
  // Detect Conséquences patterns (case insensitive)
  const consequencesPattern =
    /(?:^|\n)\s*(?:Conséquences|CONSÉQUENCES|conséquences)\s*[:\-]\s*([^\n\r]+)/gim;

  let processedContent = content;

  // Process Conseil tips
  processedContent = processedContent.replace(
    conseilPattern,
    (match, tipText) => {
      const cleanTipText = tipText
        .trim()
        .replace(/[\r\n\t]+/g, " ")
        .replace(/\s+/g, " ");
      return `<div style="display: block; margin: 16px 0; padding: 8px 12px; border-radius: 8px; font-size: 16px; line-height: 1.5; background-color: #E8F5E8; color: #2D5A2D; word-wrap: break-word; overflow-wrap: break-word; hyphens: auto;"><span style="font-weight: bold; margin-right: 8px;">Conseil :</span><span style="font-weight: normal; white-space: normal; word-break: normal;">${cleanTipText
        .replace(/(^|\r?\n)\s*-\s*/g, "$1● ")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</span></div>`;
    },
  );

  // Process Attention tips
  processedContent = processedContent.replace(
    attentionPattern,
    (match, tipText) => {
      const cleanTipText = tipText
        .trim()
        .replace(/[\r\n\t]+/g, " ")
        .replace(/\s+/g, " ");
      return `<div style="display: block; margin: 16px 0; padding: 8px 12px; border-radius: 8px; font-size: 16px; line-height: 1.5; background-color: #FEF2F2; color: #DC2626; word-wrap: break-word; overflow-wrap: break-word; hyphens: auto;"><span style="font-weight: bold; margin-right: 8px;">Attention :</span><span style="font-weight: normal; white-space: normal; word-break: normal;">${cleanTipText
        .replace(/(^|\r?\n)\s*-\s*/g, "$1● ")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</span></div>`;
    },
  );

  // Process À retenir tips
  processedContent = processedContent.replace(
    aRetenirPattern,
    (match, tipText) => {
      const cleanTipText = tipText
        .trim()
        .replace(/[\r\n\t]+/g, " ")
        .replace(/\s+/g, " ");
      return `<div style="display: block; margin: 16px 0; padding: 8px 12px; border-radius: 8px; font-size: 16px; line-height: 1.5; background-color: #F5F5F5; color: #545454; word-wrap: break-word; overflow-wrap: break-word; hyphens: auto;"><span style="font-weight: bold; margin-right: 8px;">À retenir :</span><span style="font-weight: normal; white-space: normal; word-break: normal;">${cleanTipText
        .replace(/(^|\r?\n)\s*-\s*/g, "$1● ")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</span></div>`;
    },
  );

  // Process Délai tips (blue background for time-related info)
  processedContent = processedContent.replace(
    delaiPattern,
    (match, tipText) => {
      const cleanTipText = tipText
        .trim()
        .replace(/[\r\n\t]+/g, " ")
        .replace(/\s+/g, " ");
      return `<div style="display: block; margin: 16px 0; padding: 8px 12px; border-radius: 8px; font-size: 16px; line-height: 1.5; background-color: #E3F2FD; color: #1565C0; word-wrap: break-word; overflow-wrap: break-word; hyphens: auto;"><span style="font-weight: bold; margin-right: 8px;">Délai :</span><span style="font-weight: normal; white-space: normal; word-break: normal;">${cleanTipText
        .replace(/(^|\r?\n)\s*-\s*/g, "$1● ")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</span></div>`;
    },
  );

  // Process Conséquences tips (orange background for warning/impact info)
  processedContent = processedContent.replace(
    consequencesPattern,
    (match, tipText) => {
      const cleanTipText = tipText
        .trim()
        .replace(/[\r\n\t]+/g, " ")
        .replace(/\s+/g, " ");
      return `<div style="display: block; margin: 16px 0; padding: 8px 12px; border-radius: 8px; font-size: 16px; line-height: 1.5; background-color: #FFF3E0; color: #E65100; word-wrap: break-word; overflow-wrap: break-word; hyphens: auto;"><span style="font-weight: bold; margin-right: 8px;">Conséquences :</span><span style="font-weight: normal; white-space: normal; word-break: normal;">${cleanTipText
        .replace(/(^|\r?\n)\s*-\s*/g, "$1● ")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</span></div>`;
    },
  );

  return processedContent;
};

// Generate metadata for social sharing
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blogPost = await getBlogBySlug(slug);

    if (!blogPost) {
      return {
        title: "Article non trouvé",
        description: "L'article que vous cherchez n'existe pas.",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trtbroker.com";
    const currentUrl = `${baseUrl}/actualites-conseils/${slug}`;
    const imageUrl = blogPost.image?.url
      ? blogPost.image.url.startsWith("http")
        ? blogPost.image.url
        : `${baseUrl}/api/media${blogPost.image.url}`
      : `${baseUrl}/Épargne-Préparation.png`;

    return {
      title: blogPost.titre,
      description: blogPost.description,
      openGraph: {
        title: blogPost.titre,
        description: blogPost.description,
        url: currentUrl,
        siteName: "TRT Broker",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: blogPost.image?.alternativeText || blogPost.titre,
          },
        ],
        locale: "fr_FR",
        type: "article",
        publishedTime: blogPost.publishedAt,
        modifiedTime: blogPost.updatedAt,
        authors: ["TRT Broker"],
        section: getCategoryName(blogPost),
      },
      twitter: {
        card: "summary_large_image",
        title: blogPost.titre,
        description: blogPost.description,
        images: [imageUrl],
      },
      alternates: {
        canonical: currentUrl,
      },
    };
  } catch {
    return {
      title: "Article non trouvé",
      description: "L'article que vous cherchez n'existe pas.",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    // Fetch blog post data with retry mechanism
    let blogPost = await getBlogBySlug(slug);

    // If not found, try again after a short delay (for cache issues)
    if (!blogPost) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
      blogPost = await getBlogBySlug(slug);
    }

    // If still not found, try one more time with a longer delay
    if (!blogPost) {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds
      blogPost = await getBlogBySlug(slug);
    }

    if (!blogPost) {
      notFound();
    }

    const socialIcons = [
      { id: "facebook", Icon: FacebookIcon },
      { id: "instagram", Icon: InstagramIcon },
      { id: "twitter", Icon: TwitterIcon },
      { id: "linkedin", Icon: LinkedInIcon },
    ];

    // Social sharing URLs
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trtbroker.com";
    const currentUrl = `${baseUrl}/actualites-conseils/${slug}`;
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(blogPost.titre)}`,
      instagram: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blogPost.titre + " - " + blogPost.description)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(blogPost.titre)}&summary=${encodeURIComponent(blogPost.description)}`,
    };

    return (
      <Wrapper1180
        as="section"
        className="pt-[132px] max-laptop:px-4 max-mobile:gap-9 gap-[120px] max-mobile:py-16 max-mobile:px-2"
      >
        {/* Header section */}
        <div className="flex gap-6 max-tablet:flex-col-reverse">
          <div className="flex flex-1 flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              <ul className="flex items-center gap-2">
                <li className="button2-s text-Sage-Gray-Higher">
                  <Link
                    href="/actualites-conseils"
                    className="hover:text-Primary-800 transition-colors"
                  >
                    Actualités et conseils
                  </Link>
                </li>
                <span className="gray-ellipse" />
                <li className="button2-s text-Sage-Gray-Higher">
                  {blogPost.categorie?.nom &&
                  blogPost.categorie.nom !== "Non classé" ? (
                    <Link
                      href={`/actualites-conseils?category=${encodeURIComponent(blogPost.categorie.slug)}`}
                      className="hover:text-Primary-800 transition-colors"
                    >
                      {getCategoryName(blogPost)}
                    </Link>
                  ) : (
                    getCategoryName(blogPost)
                  )}
                </li>
              </ul>

              <h2 className="Headings-H2 text-Neutral-Dark text-balance">
                {blogPost.titre}
              </h2>

              <p className="Text-M text-Text-Body max-w-[490px]">
                {blogPost.description}
              </p>
            </div>

            <span className="button2-s text-Sage-Gray-Higher">
              {(() => {
                const dateString =
                  blogPost.publishedAt ||
                  blogPost.createdAt ||
                  blogPost.updatedAt;
                if (dateString) {
                  const date = new Date(dateString);
                  if (!isNaN(date.getTime())) {
                    return date.toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }
                }
                return "Date récente";
              })()}
            </span>
          </div>

          <div className="flex-1">
            <Image
              src={getImageUrl(blogPost.image)}
              alt={
                blogPost.image?.alternativeText ||
                blogPost.titre ||
                "Image d'article"
              }
              width={578}
              height={493}
              className="w-full h-auto rounded-[20px] shadow-[0_1px_3px_-1px_rgba(140,140,140,0.10),_0_1px_6px_0_rgba(140,140,140,0.10)]"
              priority
            />
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="flex justify-between gap-9 max-tablet:flex-col">
          {/* Main article */}
          <ul className="f-col w-full max-w-[680px] max-tablet:max-w-full gap-8">
            <li>
              <p className="Text-M text-Text-Body-2">
                Choisir une assurance adaptée n&apos;est pas toujours simple.
                Entre les garanties de base, les options, les tarifs et les
                besoins spécifiques, il est facile de s&apos;y perdre.
                <br />
                Dans cet article, nous allons vous guider étape par étape pour
                comprendre comment sélectionner une couverture optimale, tout en
                maîtrisant votre budget.
              </p>
            </li>

            {/* Dynamic content */}
            <li>
              <div
                className="Text-M text-Text-Body-2 prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: processContentWithTips(blogPost.contenu)
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **text** to <strong>text</strong>
                    .replace(/(^|\r?\n)\s*-\s*/g, "$1● ") // Replace - with bullet point
                    .replace(/\n/g, "<br/>"),
                }}
              />
            </li>

            {/* Conclusion section */}
            {blogPost.conclusion && (
              <li className="f-col gap-4">
                <h4 className="Headings-H4 text-Neutral-Dark">Conclusion</h4>
                <div
                  className="Text-M text-Text-Body-2 prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: processContentWithTips(blogPost.conclusion)
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **text** to <strong>text</strong>
                      .replace(/(^|\r?\n)\s*-\s*/g, "$1● ") // Replace - with bullet point
                      .replace(/\n/g, "<br/>"),
                  }}
                />
              </li>
            )}

            <p className="text-base text-Primary-800 font-semibold pl-4 border-l-1 border-Primary-800">
              &quot;Une bonne assurance ne se limite pas au prix, mais à la
              tranquillité d&apos;esprit qu&apos;elle vous apporte.&quot;
            </p>
          </ul>

          {/* Sidebar */}
          <aside className="f-col w-full max-w-[280px] gap-4">
            <h6 className="Headings-H6 text-Neutral-Dark">
              Partager l&apos;article
            </h6>
            <ul className="flex items-center gap-1">
              {socialIcons.map(({ id, Icon }) => (
                <li
                  key={id}
                  className="bg-Sage-Gray-Low flex rounded-[12px] p-3"
                >
                  <Icon href={shareUrls[id as keyof typeof shareUrls]} />
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Wrapper1180>
    );
  } catch {
    notFound();
  }
}
