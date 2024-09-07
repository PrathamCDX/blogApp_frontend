import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-purple-300 opacity-[0.01]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
