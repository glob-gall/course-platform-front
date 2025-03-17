import { Skeleton } from "../ui/skeleton";

export function LoadingTable() {

  return (
    <div className="container mx-auto">
      <div>
      <div className="pt-4 pb-3 flex">
        <Skeleton className="w-20 h-8 ml-auto" />

      </div>
      <div className="rounded-md border flex flex-col gap-2 p-2">
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-10" />
      </div>
        


        <div className="flex items-center justify-end space-x-2 py-3">
          <Skeleton className="w-13 h-7" />
          <Skeleton className="w-13 h-7" />
        </div>
    </div>
    </div>
  )
}
