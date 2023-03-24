import FarewellScreen from "./FarewellScreen";
import RatingScreen from "./RatingScreen";
import ReturnScreen from "./ReturnScreen";
import ValuesScreen from "./ValuesScreen";
import WelcomeScreen from "./WelcomeScreen";

const SurveyContainer = ({ survey, selectedQuestion }:{ [x: string]: any }) => {

  const ENUM_STATES:any = {
    "Welcome": <WelcomeScreen selectedQuestion={selectedQuestion} survey={survey}/>,
    "Values": <ValuesScreen  selectedQuestion={selectedQuestion} survey={survey}/>,
    "Rating": <RatingScreen  selectedQuestion={selectedQuestion} survey={survey}/>,
    "Return": <ReturnScreen  selectedQuestion={selectedQuestion} survey={survey}/>,
    "Farewell": <FarewellScreen  selectedQuestion={selectedQuestion} survey={survey}/>
  }

  function EnumState({ state }:any) {
    return <div>{ENUM_STATES[state]}</div>;
  }

  return (
    <div className="flex-1 p-4">
      <EnumState state={selectedQuestion.question_type_title}></EnumState>
    </div>
  );
};

export default SurveyContainer;
