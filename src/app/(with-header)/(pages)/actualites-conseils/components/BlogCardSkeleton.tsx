const BlogCardSkeleton = () => {
  return (
    <div className="flex flex-col items-start w-[280px] max-mobile:w-full max-mobile:items-stretch">
      {/* Image skeleton */}
      <div className="relative rounded-[var(--Border-Radius-Cards,20px)] bg-gray-200 w-[280px] h-[239px] max-mobile:w-full max-mobile:h-[308px] max-mobile:rounded-[16px] overflow-hidden animate-pulse">
        <div className="w-full h-full bg-gray-300"></div>
      </div>

      {/* Content skeleton */}
      <div className="flex flex-col items-start gap-4 self-stretch py-5 max-mobile:items-stretch">
        {/* Category skeleton */}
        <div className="flex flex-row items-center gap-1">
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Title skeleton */}
        <div className="space-y-2 w-full">
          <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Date skeleton */}
        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
