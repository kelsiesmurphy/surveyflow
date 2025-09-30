"use client";

import { UserButton } from "@clerk/nextjs";
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
import { dashboardNavItems } from "@/lib/constants/navigation-items";

export default function MobileNavigation({ surveyId }: { surveyId: string }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-64 p-4">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-4">
          {dashboardNavItems(surveyId).map((item) => (
            <SheetClose asChild key={item.href}>
              <Button variant="ghost" asChild>
                <Link href={item.href}>{item.label}</Link>
              </Button>
            </SheetClose>
          ))}
          <UserButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}
