import { Skeleton } from "@/components/ui/skeleton";

export function SignUpSkeleton() {
  return (
    <div className="w-full max-w-[25rem] border border-secondary rounded-xl overflow-hidden">
      <div className="p-8 space-y-2 flex flex-col items-center">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="space-y-4 p-8">
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="bg-muted/20 p-8">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
