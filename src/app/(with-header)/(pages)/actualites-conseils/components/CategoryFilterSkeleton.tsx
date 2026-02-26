const CategoryFilterSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="px-4 py-2 bg-gray-200 rounded-full animate-pulse"
        >
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilterSkeleton;
