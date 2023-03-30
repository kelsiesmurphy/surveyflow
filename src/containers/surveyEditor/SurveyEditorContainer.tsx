import { useState } from "react";
import FarewellScreen from "./FarewellScreenEditor";
import RatingScreen from "./RatingScreenEditor";
import ReturnScreen from "./ReturnScreenEditor";
import ValuesScreen from "./ValuesScreenEditor";
import WelcomeScreen from "./WelcomeScreenEditor";

const SurveyEditorContainer = ({
  survey,
  selectedQuestion,
  deviceSize,
}: {
  [x: string]: any;
}) => {
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
      <WelcomeScreen
        selectedQuestion={selectedQuestion}
        survey={survey}
        deviceSize={deviceSize}
      />
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
        rating={rating}
        setRating={setRating}
      />
    ),
    Return: (
      <ReturnScreen
        selectedQuestion={selectedQuestion}
        survey={survey}
        deviceSize={deviceSize}
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

export default SurveyEditorContainer;
