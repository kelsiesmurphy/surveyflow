"use client";

import { Header } from "@/components/dashboard/header";
import { Id } from "@/convex/_generated/dataModel";
import { Authenticated, Unauthenticated } from "convex/react";
import { use } from "react";

export default function DashboardLayout({
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
        <div className="flex flex-col h-screen">
          <Header surveyId={surveyId} />
          <main
            id="content"
            className="flex-1 flex bg-secondary pt-16"
          >
            {children}
          </main>
        </div>
      </Authenticated>
      <Unauthenticated>
        <div className="flex flex-col h-screen">
          <Header surveyId={surveyId} />
          <main id="content" className="flex-1 flex pt-16 px-4">
            <div className="flex items-center justify-center flex-col w-full">
              You need to be signed in to access the dashboard.
            </div>
          </main>
        </div>
      </Unauthenticated>
    </>
  );
}
