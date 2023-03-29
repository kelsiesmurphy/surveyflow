import { useState } from "react";
import FarewellScreen from "./FarewellScreen";
import RatingScreen from "./RatingScreen";
import ReturnScreen from "./ReturnScreen";
import ValuesScreen from "./ValuesScreen";
import WelcomeScreen from "./WelcomeScreen";

const SurveyContainer = ({ survey, selectedQuestion }: any) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(3);
  const [review, setReview] = useState<string>("");
  const [returnBack, setReturnBack] = useState<boolean>(true);

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
