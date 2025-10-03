import React from "react";
import SurveyPagination from "@/components/survey/pagination";
import NavigationButtons from "@/components/survey/navigation-buttons";
import Link from "next/link";

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
  title,
  subtitle,
}: Readonly<{
  children: React.ReactNode;
  index: number;
  total: number;
  navigation?: NavigationConfig;
  title?: string | undefined;
  subtitle?: string | undefined;
}>) {
  return (
    <div className="flex-1 flex flex-col space-y-6">
      {title && (
        <div className="space-y-2">
          <h2 className="text-center font-semibold text-2xl">{title}</h2>
          {subtitle && (
            <p className="text-center text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}
      <div className="flex-1 space-y-4">{children}</div>
      <div>
        {navigation && (
          <NavigationButtons
            index={navigation.index}
            handleNext={navigation.handleNext}
            handleBack={navigation.handleBack}
            disabledNext={navigation.disabledNext}
          />
        )}
        <SurveyPagination index={index} total={total} />
        <p className="text-[10px] text-muted-foreground text-center mt-4">
          Powered by{" "}
          <Link href="/" className="font-semibold text-primary hover:underline">
            SurveyFlow
          </Link>
        </p>
      </div>
    </div>
  );
}
