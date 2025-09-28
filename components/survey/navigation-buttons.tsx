import React from "react";
import { Button } from "@/components/ui/button";

type NavigationButtonsProps = {
  index: number;
  handleBack?: React.MouseEventHandler<HTMLButtonElement>;
  handleNext?: React.MouseEventHandler<HTMLButtonElement>;
  disabledNext?: boolean;
};

export default function NavigationButtons({
  index,
  handleBack,
  handleNext,
  disabledNext,
}: NavigationButtonsProps) {
  return (
    <div className="flex gap-2 mt-6">
      {index > 0 && (
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
      )}
      <Button className="flex-1" onClick={handleNext} disabled={disabledNext}>
        Next
      </Button>
    </div>
  );
}
