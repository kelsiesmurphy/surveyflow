"use client";

import { Header } from "@/components/dashboard/header";
import { Id } from "@/convex/_generated/dataModel";
import { Authenticated, Unauthenticated } from "convex/react";
import { use } from "react";

export default function SurveyDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId: rawSurveyId } = use(params);
  const surveyId = rawSurveyId as Id<"surveys">;

  return (
    <>
      <Authenticated>
        <div className="flex flex-col w-full">
          <Header surveyId={surveyId} />
          <main id="content" className="flex-1 flex bg-muted overscroll-none">
            {children}
          </main>
        </div>
      </Authenticated>

      <Unauthenticated>
        <Header />
        <main className="flex flex-1 items-center justify-center p-6">
          <p>You need to be signed in to access the dashboard.</p>
        </main>
      </Unauthenticated>
    </>
  );
}
