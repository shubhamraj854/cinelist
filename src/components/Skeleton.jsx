export function CardSkeleton({ fluid = false }) {
  return (
    <div className={"shrink-0 " + (fluid ? "w-full" : "w-32 sm:w-40 lg:w-44")}>
      <div className="aspect-[2/3] animate-pulse rounded-xl bg-zinc-800" />
      <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-zinc-800" />
    </div>
  );
}
export function HeroSkeleton() {
  return <div className="h-[48vh] min-h-72 animate-pulse bg-zinc-900 sm:h-[55vh]" />;
}
