import CreateSurveyButton from "./CreateSurveyButton";
import { supabase } from "../../supabaseClient";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteSurveyButton from "./DeleteSurveyButton";
import EmptyState from "./EmptyState";

const DashboardHome = ({ userProfile }: any) => {
  const [surveyList, setSurveyList] = useState<{ [x: string]: any }[] | null>(
    []
  );

  const getSurveys = async () => {
    try {
      const { data, error } = await supabase
        .from("survey")
        .select()
        .eq("company_id", userProfile.company_id);
      setSurveyList(data);
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };

  useEffect(() => {
    if (userProfile) {
      getSurveys();
    }
  }, [userProfile]);

  let surveyNodes: any = [];
  if (surveyList) {
    surveyNodes = surveyList.map((survey, index) => {
      return (
        <li key={index}>
          <Link
            to={`/editor/${survey.id}`}
            className={`h-[208px] w-[280px] rounded-2xl bg-[url('${survey.starter_img}')] flex items-end border border-slate-200 bg-cover bg-center shadow-sm`}
          >
            <div className="flex h-16 flex-1 items-center justify-between gap-4 rounded-b-2xl border-t border-t-slate-300 bg-slate-600/30 p-1 px-5 backdrop-blur-sm transition-all hover:h-20">
              <div className="flex flex-col gap-1">
                <h2 className="font-medium text-white">{survey.title}</h2>
                <p className="text-xs text-white">
                  Created: {new Date(survey.created_at).toLocaleDateString()}
                </p>
              </div>
              <DeleteSurveyButton survey={survey} getSurveys={getSurveys} />
            </div>
          </Link>
        </li>
      );
    });
  }

  return (
    <div className="max-w-7xl flex-1">
      <div className="flex flex-1 justify-between">
        <h1 className="text-xl font-medium text-slate-900 md:text-2xl">
          Your Surveys
        </h1>
        <CreateSurveyButton
          userProfile={userProfile}
          getSurveys={getSurveys}
          styles={
            "flex items-center gap-2 rounded-lg border border-sky-600 bg-sky-600 px-4 py-2 text-center align-middle font-medium text-white shadow-sm transition hover:border-sky-700 hover:bg-sky-700"
          }
        />
      </div>
      {surveyNodes.length == 0 ? (
        <EmptyState userProfile={userProfile} getSurveys={getSurveys} />
      ) : (
        <ul className="flex flex-wrap gap-8 py-7">{surveyNodes}</ul>
      )}
    </div>
  );
};

export default DashboardHome;
