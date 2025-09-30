"use client";

import Sidebar from "@/components/dashboard/sidebar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { use, useState } from "react";

export default function SurveyDashboardPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId: rawSurveyId } = use(params);
  const surveyId = rawSurveyId as Id<"surveys">;

  const survey = useQuery(api.surveys.getSurveyWithQuestions, { surveyId });

  const [index, setIndex] = useState(0);

  const questions = (survey?.questions ?? []).filter(Boolean);
  const current = questions[index];

  if (!survey || !current) {
    return <div>Loading…</div>;
  }

  return (
    <div className="flex flex-1">
      <Sidebar questions={questions} index={index} setIndex={setIndex} />
      <div className="flex-1 flex justify-center items-start p-6">
        {current.title}
      </div>
    </div>
  );
}
