"use client";

import { Header } from "@/components/dashboard/header";
import { Authenticated, Unauthenticated } from "convex/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Authenticated>
        <Header />
        <main id="content" className="flex-1 flex bg-muted pt-16">
          {children}
        </main>
      </Authenticated>

      <Unauthenticated>
        <Header />
        <main id="content" className="flex-1 flex pt-16 px-4">
          <div className="flex items-center justify-center flex-col w-full">
            You need to be signed in to access the dashboard.
          </div>
        </main>
      </Unauthenticated>
    </>
  );
}
