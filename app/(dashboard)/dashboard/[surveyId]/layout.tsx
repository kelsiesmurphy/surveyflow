"use client";

import { Header } from "@/components/dashboard/header";
import { Id } from "@/convex/_generated/dataModel";
import { Authenticated, Unauthenticated } from "convex/react";
import { use } from "react";

export default function SurveyDashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ surveyId: string }>;
}>) {
  const { surveyId: rawSurveyId } = use(params);
  const surveyId = rawSurveyId as Id<"surveys">;

  return (
    <>
      <Authenticated>
        <div className="flex flex-col h-screen w-full">
          <Header surveyId={surveyId} />
          <main id="content" className="flex-1 flex bg-muted">
            {children}
          </main>
        </div>
      </Authenticated>

      <Unauthenticated>
        <Header />
        <main id="content" className="flex-1 flex px-4">
          <div className="flex items-center justify-center flex-col w-full">
            You need to be signed in to access the dashboard.
          </div>
        </main>
      </Unauthenticated>
    </>
  );
}
