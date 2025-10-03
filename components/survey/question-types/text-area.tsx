import React from "react";
import { Textarea } from "@/components/ui/textarea";

export default function TextAreaQuestion({
  current,
  answers,
  updateAnswer,
}: {
  current: any;
  answers: Record<string, any>;
  updateAnswer: (value: any) => void;
}) {
  return (
    <Textarea
      className="min-h-48"
      value={answers[current._id] ?? ""}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
        updateAnswer(e.target.value)
      }
    />
  );
}
