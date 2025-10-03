"use client";

import SurveyEditor from "@/components/dashboard/create-page/survey-editor";
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
  const [breakpoint, setBreakpoint] = useState<"mobile" | "desktop">("desktop");

  const questions = (survey?.questions ?? []).filter(Boolean);
  const current = questions[index];

  if (!survey || !current) {
    return <div>Loading…</div>;
  }

  return (
    <div className="flex flex-1">
      <Sidebar
        questions={questions}
        index={index}
        setIndex={setIndex}
        breakpoint={breakpoint}
        setBreakpoint={setBreakpoint}
      />
      <div className="flex-1 flex justify-center items-center p-6">
        <div
          className={`w-full min-h-[668px] flex rounded-2xl ${
            breakpoint === "mobile" ? "max-w-sm rounded-4xl" : "max-w-5xl"
          } border-8 shadow-xl justify-center bg-background transition-all duration-300 px-4 py-12 flex-1`}
        >
          <div className="flex-1 flex max-w-md">
            <SurveyEditor
              current={current}
              index={index}
              setIndex={setIndex}
              questionsLength={questions.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
