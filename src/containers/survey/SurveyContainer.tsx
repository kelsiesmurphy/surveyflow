import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FarewellScreen from "./FarewellScreen";
import RatingScreen from "./RatingScreen";
import ReturnScreen from "./ReturnScreen";
import ValuesScreen from "./ValuesScreen";
import WelcomeScreen from "./WelcomeScreen";
import { supabase } from "../../supabaseClient";

const SurveyContainer = () => {
  const { id } = useParams();

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(3);
  const [review, setReview] = useState<string>("");
  const [returnBack, setReturnBack] = useState<boolean>(true);
  const [survey, setSurvey] = useState({});
  const [questions, setQuestions] = useState<{ [x: string]: any }[] | null>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<{ [x: string]: any }>({});
  

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

  const addValue = (value: string) => {
    const duplicateValues = [...selectedValues];
    duplicateValues.push(value);
    setSelectedValues(duplicateValues);
  };

  const removeValue = (value: string) => {
    const duplicateValues = [...selectedValues];
    const index = duplicateValues.indexOf(value);
    duplicateValues.splice(index, 1);
    setSelectedValues(duplicateValues);
  };

  const handleReviewChange = (e: any) => {
    e.preventDefault();
    setReview(e.target.value);
  };

  const ENUM_STATES: any = {
    Welcome: (
      <WelcomeScreen selectedQuestion={selectedQuestion} survey={survey} />
    ),
    Values: (
      <ValuesScreen
        selectedQuestion={selectedQuestion}
        survey={survey}
        addValue={addValue}
        removeValue={removeValue}
        selectedValues={selectedValues}
      />
    ),
    Rating: (
      <RatingScreen
        selectedQuestion={selectedQuestion}
        survey={survey}
        review={review}
        rating={rating}
        setReview={setReview}
        setRating={setRating}
        handleReviewChange={handleReviewChange}
      />
    ),
    Return: (
      <ReturnScreen
        selectedQuestion={selectedQuestion}
        survey={survey}
        returnBack={returnBack}
        setReturnBack={setReturnBack}
      />
    ),
    Farewell: (
      <FarewellScreen selectedQuestion={selectedQuestion} survey={survey} />
    ),
  };

  const EnumState = ({ state }: any) => {
    return <>{ENUM_STATES[state]}</>;
  };

  return (
    <div className="max-w-2xl flex-1 p-4">
      <EnumState state={selectedQuestion.question_type_title}></EnumState>
    </div>
  );
};

export default SurveyContainer;
