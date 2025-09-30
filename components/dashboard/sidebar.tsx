import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Sidebar({
  questions,
  index,
  setIndex,
}: {
  questions: any[];
  index: number;
  setIndex: (index: number) => void;
}) {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)] w-64 border-r bg-background flex flex-col">
      <div className="flex-1 p-4 space-y-4">
        {questions.map((question, i) => (
          <div
            key={question._id}
            onClick={() => setIndex(i)}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
              i === index ? "border-primary" : ""
            }`}
          >
            <div className="h-24 bg-secondary flex items-center justify-center text-xs text-muted-foreground">
              Preview
            </div>
            <div className="py-2 px-3 flex justify-between items-center">
              <p className="text-sm font-medium">{question.type}</p>
              <p className="text-xs text-muted-foreground">
                {i + 1} of {questions.length}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
