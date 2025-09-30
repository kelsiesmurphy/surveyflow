import { PricingSection } from "@/lib/constants/landing-page";
import { PricingTableSkeleton } from "@/components/skeletons/pricing-table-skeleton";
import { PricingTable } from "@clerk/nextjs";

export default function Pricing({ content }: { content: PricingSection }) {
  return (
    <section
      id="pricing"
      className="container flex flex-col gap-6 items-center py-16 md:py-24 max-w-4xl"
    >
      <h2 className="text-3xl md:text-6xl font-semibold">{content.heading}</h2>
      <h2 className="text-muted-foreground md:text-xl mb-8">
        {content.subheading}
      </h2>
      <PricingTable fallback={<PricingTableSkeleton />} />
    </section>
  );
}
