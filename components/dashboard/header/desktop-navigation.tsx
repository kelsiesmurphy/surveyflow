"use client";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  dashboardNavItems,
  marketingNavItems,
} from "@/lib/constants/navigation-items";
import { Unauthenticated, Authenticated } from "convex/react";

export default function DesktopNavigation({ surveyId }: { surveyId: string }) {
  return (
    <div className="hidden md:flex flex-1 items-center justify-between gap-x-4">
      <Unauthenticated>
        <div className="space-x-4 w-full flex justify-end">
          {marketingNavItems.map((item) => (
            <Button variant="ghost" asChild key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          <SignInButton>
            <Button variant="outline">Sign in</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign up</Button>
          </SignUpButton>
        </div>
      </Unauthenticated>
      <Authenticated>
        <div>
          {dashboardNavItems(surveyId).map((item) => (
            <Button variant="ghost" asChild key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div>
        <UserButton />
      </Authenticated>
    </div>
  );
}
