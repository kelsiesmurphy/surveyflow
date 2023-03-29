import { ChevronLeft, ChevronRight } from "react-feather";
import { useParams } from "react-router-dom";
import SurveyContainer from "./SurveyContainer";
import { supabase } from "../../supabaseClient";
import { useState, useEffect } from "react";
import { render } from "react-dom";

const CreateMain = () => {
  const { id } = useParams();

  const [survey, setSurvey] = useState({});
  const [questions, setQuestions] = useState<any>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<{
    [x: string]: any;
  }>({});

  useEffect(() => {
    if (questions[0]) {
      setSelectedQuestion(questions[0]);
    }
  }, [questions]);

  const getQuestions = async (surveyId: any) => {
    try {
      const { data, error } = await supabase
        .from("survey_question")
        .select()
        .eq("survey_id", surveyId)
        .order("sort_order", { ascending: true });
      setQuestions(data);
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };

  const getSurvey = async (id: any) => {
    try {
      const { data, error } = await supabase
        .from("survey")
        .select()
        .eq("id", id);
      if (data) {
        setSurvey(data[0]);
        getQuestions(data[0].id);
      }
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };

  useEffect(() => {
    console.log("testtung");

    if (id) {
      getSurvey(id);
    }
  }, [id]);

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
    <div className="flex min-h-screen flex-1">
      <div className="flex min-w-[288px] flex-1 flex-col transition-all">
        <div className="relative flex h-2.5 w-full bg-gray-300">
          <div
            style={{ width: `${progressPercentage}%` }}
            className="h-full bg-sky-600 transition-all"
          ></div>
        </div>
        <div className="flex flex-1 justify-center">
          <SurveyContainer
            survey={survey}
            selectedQuestion={selectedQuestion}
          />
        </div>
        <div className="flex gap-4 p-4 md:p-12">
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
            {selectedQuestion.sort_order === 1
              ? "Begin"
              : selectedQuestion.sort_order === questions.length
              ? "Submit"
              : "Next"}
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMain;
