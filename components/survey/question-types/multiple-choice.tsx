import { getConvexImageUrl } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function MultipleChoiceQuestion({
  current,
  answers,
  updateAnswer,
}: {
  current: any;
  answers: Record<string, any>;
  updateAnswer: (value: any) => void;
}) {
  return (
    <div className="grid gap-4">
      {current.options?.map((opt: any, i: number) => {
        const value = opt.hasOther
          ? { selected: opt.label, other: "" }
          : opt.label;
        const isSelected =
          JSON.stringify(answers[current._id]) === JSON.stringify(value);

        return (
          <button
            key={i}
            className={`py-5 px-6 flex gap-4 bg-muted items-center justify-between border rounded-xl shadow-xs transition-all font-semibold duration-700 ${
              isSelected && "border-primary bg-muted/90"
            }`}
            onClick={() => updateAnswer(value)}
          >
            <div>
              {opt.iconStorageId && (
                <Image
                  src={getConvexImageUrl(opt.iconStorageId)}
                  alt={opt.label}
                  width={24}
                  height={24}
                  sizes="24px"
                  unoptimized
                  className="inline-block text-foreground size-6 mr-3"
                />
              )}
              {opt.label}
            </div>
            <div
              className={`border size-4 rounded-full flex justify-center items-center transition-all duration-300 ${
                isSelected && "border-primary bg-primary"
              }`}
            >
              <div
                className={`size-1.5 rounded-full transition-all ${
                  isSelected && "bg-background"
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
