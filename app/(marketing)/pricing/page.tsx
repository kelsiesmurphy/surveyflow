import { PricingTableSkeleton } from "@/components/skeletons/pricing-table-skeleton";
import { PricingTable } from "@clerk/nextjs";

export default function PricingPage() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-start pt-16 px-6 md:px-10">
      <div className="max-w-4xl flex-1">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started with SurveyFlow for free, or upgrade to Pro to unlock
            unlimited surveys, advanced customization, and powerful analytics.
          </p>
        </div>
        <PricingTable fallback={<PricingTableSkeleton />} />
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Have questions?{" "}
            <a href="/contact" className="underline text-primary">
              Contact us
            </a>{" "}
            for help choosing the best plan.
          </p>
        </div>
      </div>
    </div>
  );
}
