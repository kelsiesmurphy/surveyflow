import Lottie from "react-lottie-player";
import { emptyState } from "../../assets";
import CreateSurveyButton from "./CreateSurveyButton";

const EmptyState = ({ userProfile, getSurveys }: any) => {
  return (
    <div className="flex justify-center py-8">
      <div className="max-w-xl flex-1 space-y-4">
        <Lottie loop animationData={emptyState} play />
        <div className="flex flex-col items-center text-center">
          <h2 className="text-lg font-medium text-slate-800">
            No surveys found
          </h2>
          <p className="mb-4 max-w-sm text-slate-500">
            You have not created any surveys yet. To do so, click the 'Create
            new' button.
          </p>
          <CreateSurveyButton
            userProfile={userProfile}
            getSurveys={getSurveys}
            styles={
              "flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-2.5 px-4 text-slate-700 shadow-sm outline-slate-900 transition-colors hover:bg-slate-50"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
