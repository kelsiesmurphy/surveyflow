import { ChevronLeft, ChevronRight } from "react-feather";
import SurveyEditorContainer from "../surveyEditor/SurveyEditorContainer";

const SurveyWrapperEditor = ({
  survey,
  selectedQuestion,
  deviceSize,
  questions,
  setSelectedQuestion,
}: { [x: string]: any }) => {
  const progressPercentage =
    ((selectedQuestion.sort_order - 1) / questions.length) * 100;

  const handleBack = () => {
    setSelectedQuestion(questions[selectedQuestion.sort_order - 2]);
  };

  const handleNext = () => {
    if (selectedQuestion.sort_order == questions.length) {
      setSelectedQuestion(questions[0]);
    } else if (questions[selectedQuestion.sort_order]) {
      setSelectedQuestion(questions[selectedQuestion.sort_order]);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <div
        className={`flex flex-col rounded-2xl border border-slate-300 bg-white shadow-md ${
          deviceSize === "desktop"
            ? " aspect-video w-[90%]"
            : "aspect-[9/16] w-[25%] min-w-[288px]"
        } overflow-hidden transition-all`}
      >
        <div className="relative flex h-2.5 w-full bg-gray-300">
          <div
            style={{ width: `${progressPercentage}%` }}
            className="h-full bg-sky-600 transition-all"
          ></div>
        </div>
        <div className="flex flex-1 justify-center">
          <SurveyEditorContainer survey={survey} selectedQuestion={selectedQuestion} deviceSize={deviceSize} />
        </div>
        <div className="flex gap-4 p-4">
          {selectedQuestion.sort_order !== 1 && (
            <button
              onClick={handleBack}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-3 px-3 font-medium text-slate-700 shadow-sm outline-slate-900 transition-colors hover:bg-slate-50"
            >
              <ChevronLeft />
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-sky-600 bg-sky-600 px-3 py-3 text-center align-middle font-medium text-white shadow-sm transition hover:border-sky-700 hover:bg-sky-700"
          >
            {selectedQuestion.sort_order === 1 ? "Begin" : "Next"}
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyWrapperEditor;
