import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";

export default function CTAButtons({
  isLargeButtons,
}: {
  isLargeButtons?: boolean;
}) {
  return (
    <div className="flex flex-col w-full sm:w-min sm:flex-row gap-4">
      <Unauthenticated>
        <SignInButton>
          <Button size={isLargeButtons ? "lg" : "default"} variant="outline">
            Sign in
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button size={isLargeButtons ? "lg" : "default"}>Sign up</Button>
        </SignUpButton>
      </Unauthenticated>
      <Authenticated>
        <Button size={isLargeButtons ? "lg" : "default"} asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </Authenticated>
    </div>
  );
}
