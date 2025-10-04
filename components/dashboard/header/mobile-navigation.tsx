"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  dashboardNavItems,
} from "@/lib/constants/navigation-items";
import CustomUserButton from "@/components/custom-user-button";
import { Unauthenticated, Authenticated } from "convex/react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function MobileNavigation({ surveyId }: { surveyId?: string }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const hasSurvey = Boolean(surveyId);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-64 p-4">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-3 mt-4">
          {hasSurvey &&
            dashboardNavItems(surveyId!).map((item) => (
              <SheetClose asChild key={item.href}>
                <Button variant="ghost" asChild>
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              </SheetClose>
            ))}
          <div className="border-t my-2" />

          <Unauthenticated>
            <div className="flex flex-col gap-2">
              <SignInButton>
                <Button variant="outline">Sign in</Button>
              </SignInButton>
              <SignUpButton>
                <Button>Sign up</Button>
              </SignUpButton>
            </div>
          </Unauthenticated>

          <Authenticated>
            <CustomUserButton />
          </Authenticated>
        </div>
      </SheetContent>
    </Sheet>
  );
}
