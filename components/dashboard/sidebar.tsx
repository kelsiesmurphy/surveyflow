"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import useLenis from "@/lib/hooks/useLenis";
import { Monitor, Smartphone } from "lucide-react";
import { Button } from "../ui/button";

export default function Sidebar({
  questions,
  index,
  setIndex,
  breakpoint,
  setBreakpoint,
}: {
  questions: any[];
  index: number;
  setIndex: (index: number) => void;
  breakpoint: "mobile" | "desktop";
  setBreakpoint: (breakpoint: "mobile" | "desktop") => void;
}) {
  useLenis();
  return (
    <div>
      <ScrollArea className="h-[calc(100vh-4rem)] w-64 border-r bg-background flex flex-col">
        <div className="flex gap-2 p-4 bg-muted">
          <Button
            className="flex-1 hover:bg-background"
            variant={breakpoint === "desktop" ? "outline" : "ghost"}
            onClick={() => setBreakpoint("desktop")}
          >
            <Monitor />
          </Button>
          <Button
            className="flex-1 hover:bg-background"
            variant={breakpoint === "mobile" ? "outline" : "ghost"}
            onClick={() => setBreakpoint("mobile")}
          >
            <Smartphone />
          </Button>
        </div>
        <hr />
        <div className="flex-1 p-4 space-y-4">
          {questions.map((question, i) => (
            <div
              key={question._id}
              onClick={() => setIndex(i)}
              className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                i === index ? "border-primary" : ""
              }`}
            >
              <div className="h-24 bg-muted flex items-center justify-center text-xs text-muted-foreground">
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
    </div>
  );
}
