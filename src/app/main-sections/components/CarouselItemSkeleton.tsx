const CarouselItemSkeleton = () => {
  return (
    <div className="f-col w-full transition-transform duration-300 cursor-pointer">
      <div className="relative w-[280px] h-[240px] max-mobile:w-[500px] max-mobile:h-[308px] overflow-hidden rounded-[12px] shadow-[0_1px_3px_-1px_rgba(140,140,140,0.10),_0_1px_6px_0_rgba(140,140,140,0.10)]">
        <div className="w-full h-full bg-gray-200 animate-pulse"></div>
      </div>

      <div className="f-col gap-4 py-5">
        <div className="f-col gap-2">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default CarouselItemSkeleton;
