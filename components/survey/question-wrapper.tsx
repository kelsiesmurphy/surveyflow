import React from "react";
import SurveyPagination from "./pagination";
import NavigationButtons from "./navigation-buttons";

type NavigationConfig = {
  index: number;
  handleBack?: React.MouseEventHandler<HTMLButtonElement>;
  handleNext?: React.MouseEventHandler<HTMLButtonElement>;
  disabledNext?: boolean;
};

export default function QuestionWrapper({
  children,
  index,
  total,
  navigation,
}: Readonly<{
  children: React.ReactNode;
  index: number;
  total: number;
  navigation?: NavigationConfig;
}>) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1">{children}</div>
      {navigation && (
        <NavigationButtons
          index={navigation.index}
          handleNext={navigation.handleNext}
          handleBack={navigation.handleBack}
          disabledNext={navigation.disabledNext}
        />
      )}
      <SurveyPagination index={index} total={total} />
    </div>
  );
}
