import { useState } from "react";
import FarewellScreen from "./FarewellScreen";
import RatingScreen from "./RatingScreen";
import ReturnScreen from "./ReturnScreen";
import ValuesScreen from "./ValuesScreen";
import WelcomeScreen from "./WelcomeScreen";

const SurveyContainer = ({
  survey,
  selectedQuestion,
  selectedValues,
  rating,
  review,
  returnBack,
  addValue,
  removeValue,
  setReview,
  setRating,
  setReturnBack,
}: any) => {
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
      {EnumState({state: selectedQuestion.question_type_title})}
    </div>
  );
};

export default SurveyContainer;
