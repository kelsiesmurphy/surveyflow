"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Id } from "@/convex/_generated/dataModel";
import { use } from "react";

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
  const answer = useMutation(api.surveys.answerSurveyQuestion);
  const complete = useMutation(api.surveys.completeSurvey);

  const [sessionId, setSessionId] = useState<Id<"survey_sessions"> | null>(
    null
  );
  const [index, setIndex] = useState(0);

  // top-level state for text questions
  const [text, setText] = useState("");

  const questions = (survey?.questions ?? []).filter(Boolean);
  const current = questions[index];

  useEffect(() => {
    if (current?.type === "text") setText("");
  }, [index, current?.type]);

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

  async function handleAnswerGeneric(answerValue: any, metadata?: unknown) {
    if (!sessionId || !current) return;

    await answer({
      sessionId,
      questionId: current._id,
      answer: answerValue,
      metadata,
    });

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      await complete({ sessionId });
    }
  }

  // Initial start screen
  if (!sessionId) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">{survey.title}</h1>
        <p>{survey.description}</p>
        <Button onClick={handleStart} className="mt-4">
          Start Survey
        </Button>
      </div>
    );
  }

  // Render logic for different question types
  switch (current.type) {
    case "welcome":
      return (
        <div className="p-4 space-y-4">
          <p className="text-xl">{current.text}</p>
          <Button onClick={() => setIndex(index + 1)}>Continue</Button>
        </div>
      );

    case "thank_you":
      return (
        <div className="p-4">
          <h2 className="text-xl font-semibold">{current.text}</h2>
        </div>
      );

    case "multiple_choice":
      return (
        <div className="p-4 space-y-4">
          <p className="text-xl">{current.text}</p>
          <div className="grid gap-2 mt-4">
            {current.options?.map((opt: any, i: number) => (
              <Button
                key={i}
                variant="outline"
                onClick={() =>
                  handleAnswerGeneric(
                    opt.hasOther
                      ? { selected: opt.label, other: "" }
                      : opt.label
                  )
                }
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
            ))}
          </div>
        </div>
      );

    case "text":
      return (
        <div className="p-4 space-y-4">
          <p className="text-xl">{current.text}</p>
          <textarea
            className="w-full p-2 border rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={() => handleAnswerGeneric(text)}>Submit</Button>
        </div>
      );

    case "rating":
      return (
        <div className="p-4 space-y-4">
          <p className="text-xl">{current.text}</p>
          <div className="flex gap-2 mt-2">
            {Array.from({ length: current.metadata?.scale || 5 }).map(
              (_, i) => (
                <Button key={i} onClick={() => handleAnswerGeneric(i + 1)}>
                  {i + 1}
                </Button>
              )
            )}
          </div>
        </div>
      );

    default:
      return <div>Unsupported question type</div>;
  }
}
