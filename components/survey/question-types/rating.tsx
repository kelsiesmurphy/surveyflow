import { Button } from "@/components/ui/button";
import React from "react";

export default function RatingQuestion({
  current,
  answers,
  updateAnswer,
}: {
  current: any;
  answers: Record<string, any>;
  updateAnswer: (value: any) => void;
}) {
  return (
    <div className="flex gap-2 mt-2">
      {Array.from({ length: current.metadata?.scale || 5 }).map((_, i) => {
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
      })}
    </div>
  );
}
