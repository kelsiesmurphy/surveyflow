"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Id } from "@/convex/_generated/dataModel";
import { use } from "react";
import QuestionWrapper from "@/components/survey/question-wrapper";
import MultipleChoiceQuestion from "@/components/survey/question-types/multiple-choice";
import TextAreaQuestion from "@/components/survey/question-types/text-area";
import RatingQuestion from "@/components/survey/question-types/rating";
import { getConvexImageUrl } from "@/lib/utils";
import Image from "next/image";

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

  if (!sessionId) {
    return (
      <QuestionWrapper index={index} total={questions.length}>
        {survey.coverImageStorageId && (
          <Image
            src={getConvexImageUrl(survey.coverImageStorageId)}
            width={400}
            height={300}
            priority
            sizes="(max-width: 768px) 100vw, 400px"
            alt={
              survey.coverImageAlt ? survey.coverImageAlt : "Survey Cover Image"
            }
            className="aspect-[4/3] w-full rounded-xl object-cover"
          />
        )}
        <div className="space-y-2 mt-6">
          <h1 className="text-xl font-bold">{survey.title}</h1>
          <p className="text-muted-foreground">{survey.description}</p>
        </div>
        <Button onClick={handleStart} className="mt-4 flex-1 w-full">
          Start Survey
        </Button>
      </QuestionWrapper>
    );
  }

  switch (current.type) {
    case "thank_you":
      if (sessionId) {
        complete({ sessionId });
      }
      return (
        <QuestionWrapper
          index={index}
          total={questions.length}
          title={current.title}
          subtitle={current.subtitle}
        >
          <p className="text-center">You may now close this screen</p>
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
          title={current.title}
          subtitle={current.subtitle}
        >
          <MultipleChoiceQuestion
            current={current}
            answers={answers}
            updateAnswer={updateAnswer}
          />
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
          title={current.title}
          subtitle={current.subtitle}
        >
          <TextAreaQuestion
            current={current}
            answers={answers}
            updateAnswer={updateAnswer}
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
          title={current.title}
          subtitle={current.subtitle}
        >
          <RatingQuestion
            current={current}
            answers={answers}
            updateAnswer={updateAnswer}
          />
        </QuestionWrapper>
      );

    default:
      return (
        <QuestionWrapper index={index} total={questions.length} title="Error">
          Unsupported question type
        </QuestionWrapper>
      );
  }
}
