import { Skeleton } from "@/components/ui/skeleton";

const OverviewReportSkeleton = () => {
  return (
    <>
      {/* First Row */}
      <div className="flex gap-4">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-36 w-full" />
        ))}
      </div>

      {/* Second Row */}
      <div>
        <Skeleton className="h-120 w-full" />
      </div>

      {/* Third Row */}
      <div className="flex gap-4">
        {[...Array(2)].map((_, index) => (
          <Skeleton key={index} className="h-60 w-full" />
        ))}
      </div>

      {/* Fourth Row */}
      <div className="flex gap-4">
        {[...Array(2)].map((_, index) => (
          <Skeleton key={index} className="h-60 w-full" />
        ))}
      </div>
    </>
  );
};

export default OverviewReportSkeleton;
