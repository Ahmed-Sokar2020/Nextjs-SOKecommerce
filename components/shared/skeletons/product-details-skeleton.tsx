import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_2fr_1fr] gap-8 items-start">
        {/* Left Side: Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-16 w-16 rounded-md" />
            <Skeleton className="h-16 w-16 rounded-md" />
          </div>
          {/* Main Image */}
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>

        {/* Middle Side: Details */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" /> {/* Brand Name */}
          <Skeleton className="h-10 w-full" /> {/* Title Line 1 */}
          <Skeleton className="h-10 w-3/4" /> {/* Title Line 2 */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" /> {/* Ratings Stars */}
            <Skeleton className="h-4 w-16" /> {/* Ratings Count */}
          </div>
          <hr className="my-4" />
          {/* Price Section */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" /> {/* Big Price */}
            <Skeleton className="h-4 w-24" /> {/* List Price */}
          </div>
          {/* Color Selectors */}
          <div className="space-y-3 pt-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-8 w-3/4 rounded-md" />
          </div>
          {/* Size Selectors */}
          <div className="space-y-3 pt-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-8 w-1/3 rounded-md" />
          </div>
          <hr className="my-4" />
          {/* Description */}
          <div className="space-y-3 pt-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        </div>

        {/* Right Side: Add to Cart (The box on the right) */}
        <div className="md:col-span-3 lg:col-span-1 border rounded-xl p-4 space-y-4">
          <Skeleton className="h-6 w-16" /> {/* Price inside box */}
          <Skeleton className="h-4 w-20" /> {/* Stock status */}
          <Skeleton className="h-8 w-25 rounded-2xl" /> {/* Quantity */}
          {/* Add to Cart Button */}
          <Skeleton className="h-8 w-full rounded-full" />{" "}
          {/* Buy Now Button */}
          <Skeleton className="h-8 w-full rounded-full" />{" "}
        </div>
      </div>
    </div>
  );
}
