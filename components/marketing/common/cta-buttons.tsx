import { Button } from "@/components/ui/button";
import { Authenticated, Unauthenticated } from "convex/react";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function CTAButtons({
  isLargeButtons,
}: {
  isLargeButtons?: boolean;
}) {
  return (
    <div className="flex flex-col w-full sm:w-min sm:flex-row gap-4">
      <Unauthenticated>
        <Button size={isLargeButtons ? "lg" : "default"} asChild>
          <Link href="/sign-up">Create account</Link>
        </Button>
      </Unauthenticated>
      <Authenticated>
        <Button size={isLargeButtons ? "lg" : "default"} asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </Authenticated>
    </div>
  );
}
