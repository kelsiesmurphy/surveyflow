"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Id } from "@/convex/_generated/dataModel";
import { use } from "react";
import QuestionWrapper from "@/components/survey/question-wrapper";

export default function TakeSurvey({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const { surveyId: rawSurveyId } = use(params);
  const surveyId = rawSurveyId as Id<"surveys">;

  const { userId } = useAuth();

  const survey = useQuery(api.surveys.getSurveyWithQuestions, { surveyId });
  const start = useMutation(api.surveys.startSurvey);
  const complete = useMutation(api.surveys.completeSurvey);

  const [sessionId, setSessionId] = useState<Id<"survey_sessions"> | null>(
    null
  );
  const [index, setIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<string, any>>({});

  const questions = (survey?.questions ?? []).filter(Boolean);
  const current = questions[index];

  if (!survey || !current) {
    return <div>Loading…</div>;
  }

  async function handleStart() {
    const sId = await start({
      surveyId,
      respondentId: userId ?? undefined,
    });
    setSessionId(sId);
  }

  function handleNext() {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else if (sessionId) {
      complete({ sessionId });
    }
  }

  function handleBack() {
    if (index > 0) setIndex(index - 1);
  }

  function updateAnswer(value: any) {
    if (current) {
      setAnswers((prev) => ({ ...prev, [current._id]: value }));
    }
  }

  // Intro screen (no navigation)
  if (!sessionId) {
    return (
      <QuestionWrapper index={index} total={questions.length}>
        <h1 className="text-xl font-bold mb-4">{survey.title}</h1>
        <p>{survey.description}</p>
        <Button onClick={handleStart} className="mt-4 flex-1">
          Start Survey
        </Button>
      </QuestionWrapper>
    );
  }

  // Question types
  switch (current.type) {
    case "welcome":
      return (
        <QuestionWrapper
          index={index}
          total={questions.length}
          navigation={{ index, handleNext, handleBack }}
        >
          <p className="text-xl">{current.text}</p>
        </QuestionWrapper>
      );

    case "thank_you":
      return (
        <QuestionWrapper index={index} total={questions.length}>
          <h2 className="text-xl font-semibold">{current.text}</h2>
        </QuestionWrapper>
      );

    case "multiple_choice":
      return (
        <QuestionWrapper
          index={index}
          total={questions.length}
          navigation={{
            index,
            handleNext,
            handleBack,
            disabledNext: !answers[current._id],
          }}
        >
          <p className="text-xl">{current.text}</p>
          <div className="grid gap-2 mt-4">
            {current.options?.map((opt: any, i: number) => {
              const value = opt.hasOther
                ? { selected: opt.label, other: "" }
                : opt.label;
              const isSelected =
                JSON.stringify(answers[current._id]) === JSON.stringify(value);

              return (
                <Button
                  key={i}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => updateAnswer(value)}
                >
                  {opt.iconUrl && (
                    <img
                      src={opt.iconUrl}
                      alt={opt.label}
                      className="inline-block w-5 h-5 mr-2"
                    />
                  )}
                  {opt.label}
                </Button>
              );
            })}
          </div>
        </QuestionWrapper>
      );

    case "text":
      return (
        <QuestionWrapper
          index={index}
          total={questions.length}
          navigation={{
            index,
            handleNext,
            handleBack,
            disabledNext:
              !answers[current._id] ||
              (typeof answers[current._id] === "string" &&
                !answers[current._id].trim()),
          }}
        >
          <p className="text-xl">{current.text}</p>
          <textarea
            className="w-full p-2 border rounded"
            value={answers[current._id] ?? ""}
            onChange={(e) => updateAnswer(e.target.value)}
          />
        </QuestionWrapper>
      );

    case "rating":
      return (
        <QuestionWrapper
          index={index}
          total={questions.length}
          navigation={{
            index,
            handleNext,
            handleBack,
            disabledNext: !answers[current._id],
          }}
        >
          <p className="text-xl">{current.text}</p>
          <div className="flex gap-2 mt-2">
            {Array.from({ length: current.metadata?.scale || 5 }).map(
              (_, i) => {
                const value = i + 1;
                const isSelected = answers[current._id] === value;
                return (
                  <Button
                    key={i}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => updateAnswer(value)}
                  >
                    {value}
                  </Button>
                );
              }
            )}
          </div>
        </QuestionWrapper>
      );

    default:
      return (
        <QuestionWrapper index={index} total={questions.length}>
          Unsupported question type
        </QuestionWrapper>
      );
  }
}
