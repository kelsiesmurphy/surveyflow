import { useEffect, useState } from "react";
import SurveyWrapperEditor from "./SurveyWrapperEditor";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";

const CreateScreen = ({
  questions,
  survey,
  getSurvey,
}: {
  [x: string]: any;
}) => {
  const [deviceSize, setDeviceSize] = useState("mobile");
  const [showSettings, setShowSettings] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<{
    [x: string]: any;
  }>({});

  useEffect(() => {
    if (questions[0]) {
      setSelectedQuestion(questions[0]);
    }
  }, [questions]);

  return (
    <div className="flex flex-1">
      <LeftSideBar
        questions={questions}
        selectedQuestion={selectedQuestion}
        deviceSize={deviceSize}
        setDeviceSize={setDeviceSize}
        setSelectedQuestion={setSelectedQuestion}
      />
      <SurveyWrapperEditor
        survey={survey}
        selectedQuestion={selectedQuestion}
        deviceSize={deviceSize}
        questions={questions}
        getSurvey={getSurvey}
        setSelectedQuestion={setSelectedQuestion}
        setShowSettings={setShowSettings}
      />
      <RightSideBar
        survey={survey}
        getSurvey={getSurvey}
        setShowSettings={setShowSettings}
        questions={questions}
        setSelectedQuestion={setSelectedQuestion}
        showSettings={showSettings}
      />
    </div>
  );
};

export default CreateScreen;
