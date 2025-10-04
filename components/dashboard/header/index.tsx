"use client";

import { Button } from "@/components/ui/button";
import { dashboardNavItems } from "@/lib/constants/navigation-items";
import Link from "next/link";
import DesktopNavigation from "./desktop-navigation";
import Logo from "./logo";
import MobileNavigation from "./mobile-navigation";
import SkipToContent from "@/components/skip-to-content";

export function Header({ surveyId }: { surveyId?: string }) {
  return (
    <header className="fixed top-0 z-50 w-full bg-background border-b">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 gap-4">
        <SkipToContent />
        <div className="flex items-center gap-4 flex-1">
          <Logo href="/dashboard" />
          {surveyId && (
            <nav className="hidden md:flex items-center gap-1">
              {dashboardNavItems(surveyId!).map((item) => (
                <Button key={item.href} variant="ghost" size="sm" asChild>
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </nav>
          )}
        </div>

        <DesktopNavigation />
        <MobileNavigation surveyId={surveyId} />
      </div>
    </header>
  );
}
