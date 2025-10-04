"use client";

import { useState } from "react";
import QuestionWrapper from "@/components/survey/question-wrapper";
import MultipleChoiceQuestion from "@/components/survey/question-types/multiple-choice";
import TextAreaQuestion from "@/components/survey/question-types/text-area";
import RatingQuestion from "@/components/survey/question-types/rating";

export default function SurveyEditor({
  index,
  setIndex,
  questionsLength,
  current,
}: {
  index: number;
  setIndex: (index: number) => void;
  questionsLength: number;
  current: any;
}) {
  const [answers, setAnswers] = useState<Record<string, any>>({});

  if (!current) {
    return <div>Loading…</div>;
  }

  function handleNext() {
    if (index + 1 < questionsLength) {
      setIndex(index + 1);
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

  //   if (!sessionId) {
  //     return (
  //       <QuestionWrapper index={index} total={questionsLength}>
  //         {survey.coverImageStorageId && (
  //           <Image
  //             src={getConvexImageUrl(survey.coverImageStorageId)}
  //             alt={
  //               survey.coverImageAlt ? survey.coverImageAlt : "Survey Cover Image"
  //             }
  //             className="aspect-[4/3] w-full rounded-xl object-cover"
  //           />
  //         )}
  //         <div className="space-y-2 mt-6">
  //           <h1 className="text-xl font-bold">{survey.title}</h1>
  //           <p className="text-muted-foreground">{survey.description}</p>
  //         </div>
  //         <Button onClick={handleStart} className="mt-4 flex-1 w-full">
  //           Start Survey
  //         </Button>
  //       </QuestionWrapper>
  //     );
  //   }

  switch (current.type) {
    case "thank_you":
      return (
        <QuestionWrapper
          index={index}
          total={questionsLength}
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
          total={questionsLength}
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
          total={questionsLength}
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
          total={questionsLength}
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
        <QuestionWrapper index={index} total={questionsLength} title="Error">
          Unsupported question type
        </QuestionWrapper>
      );
  }
}
