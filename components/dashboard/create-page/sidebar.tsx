"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Monitor, Smartphone } from "lucide-react";
import { Button } from "../../ui/button";
import SidebarPreview from "./sidebar-preview";

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
  return (
    <ScrollArea className="flex h-[calc(100vh-64px)] flex-col w-64 border-r bg-background">
      <div className="flex sticky top-0 z-10 gap-2 border-b p-4 bg-muted shrink-0">
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

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {questions.map((question, i) => (
            <div
              key={question._id}
              onClick={() => setIndex(i)}
              className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                i === index ? "border-primary" : ""
              }`}
            >
              <SidebarPreview
                index={i}
                question={question}
                questions={questions}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </ScrollArea>
  );
}
