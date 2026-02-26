import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  image: string;
  imageAlt: string;
  category: string;
  title: string;
  date: string;
  slug: string;
}

const BlogCard = ({
  image,
  imageAlt,
  category,
  title,
  date,
  slug,
}: BlogCardProps) => {
  return (
    <Link
      href={`/actualites-conseils/${slug}`}
      prefetch={true} // Enable prefetching for better performance
      className="flex flex-col items-start w-[280px] max-mobile:w-full max-mobile:items-stretch transition-transform duration-300 cursor-pointer"
    >
      <div className="relative rounded-[var(--Border-Radius-Cards,20px)] shadow-card bg-lightgray bg-center bg-cover w-[280px] h-[239px] max-mobile:w-full max-mobile:h-[308px] max-mobile:rounded-[16px] max-mobile:shadow-[0_1px_3px_-1px_rgba(140,140,140,0.10),0_1px_6px_0_rgba(140,140,140,0.10)] overflow-hidden group">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="rounded-[var(--Border-Radius-Cards,20px)] object-cover max-mobile:rounded-[16px] transition-transform duration-2000 ease-out hover:scale-120"
        />
      </div>

      <div className="flex flex-col items-start gap-4 self-stretch py-5 max-mobile:items-stretch">
        <div className="flex flex-row items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
          >
            <circle cx="3" cy="3" r="3" fill="#0F110C" />
          </svg>
          <span className="Button2-XS text-[#0F110C]">{category}</span>
        </div>
        <p className="Text-M text-[#0F110C]">{title}</p>
        <p className="Button2-XS text-[#8C8C8C]">{date}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
