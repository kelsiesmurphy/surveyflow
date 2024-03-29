import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import EditorNavigation from "../editor/EditorNavigation";
import CreateScreen from "./CreateScreen";
import ResultsScreen from "./ResultsScreen";
// import ShareScreen from "./ShareScreen";

const EditorContainer = ({ navigate }: { [x: string]: any }) => {
  const { id } = useParams();
  const [survey, setSurvey] = useState({});
  const [questions, setQuestions] = useState<{ [x: string]: any }[] | null>([]);

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
    if (id) {
      getSurvey(id);
    }
  }, [id]);

  return (
    <div className="flex h-screen flex-col">
      <EditorNavigation navigate={navigate} />
      <div className="flex h-[calc(100%_-_86px)] flex-1 bg-[#F9FAFB]">
        <Routes>
          <Route
            path="create"
            element={
              <CreateScreen
                questions={questions}
                survey={survey}
                getSurvey={getSurvey}
              />
            }
          />
          {/* <Route path="share" element={<ShareScreen survey={survey} />} /> */}
          <Route path="results" element={<ResultsScreen survey={survey} />} />
        </Routes>
      </div>
    </div>
  );
};

export default EditorContainer;
