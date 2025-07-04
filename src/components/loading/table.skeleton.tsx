import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTable = () => {
  return (
    <div className="table w-full rounded-md border border-gray-200">
      <div className="table-header-group">
        <div className="table-header-cell">
          <Skeleton className="w-24 h-6 rounded-md" />
        </div>
        <div className="table-header-cell">
          <Skeleton className="w-24 h-6 rounded-md" />
        </div>
        <div className="table-header-cell">
          <Skeleton className="w-24 h-6 rounded-md" />
        </div>
      </div>
      <div className="table-row-group">
        <div className="table-row">
          <div className="table-cell">
            <Skeleton className="w-24 h-6 rounded-md" />
          </div>
          <div className="table-cell">
            <Skeleton className="w-24 h-6 rounded-md" />
          </div>
          <div className="table-cell">
            <Skeleton className="w-24 h-6 rounded-md" />
          </div>
        </div>
        <div className="table-row">
          <div className="table-cell">
            <Skeleton className="w-24 h-6 rounded-md" />
          </div>
          <div className="table-cell">
            <Skeleton className="w-24 h-6 rounded-md" />
          </div>
          <div className="table-cell">
            <Skeleton className="w-24 h-6 rounded-md" />
          </div>
        </div>
      </div>
      <div className="table-footer-group">
        <div className="table-footer-cell">
          <Skeleton className="w-24 h-6 rounded-md" />
        </div>
        <div className="table-footer-cell">
          <Skeleton className="w-24 h-6 rounded-md" />
        </div>
        <div className="table-footer-cell">
          <Skeleton className="w-24 h-6 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonTable;