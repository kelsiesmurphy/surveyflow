import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const ResultsScreen = ({ survey }: any) => {
  const [surveyAnswers, setSurveyAnswers] = useState([]);

  const getSurveyAnswers = async (survey_id: any) => {
    try {
      const { data, error }: any = await supabase
        .from("survey_answer")
        .select()
        .eq("survey_id", survey_id);
      if (data) {
        setSurveyAnswers(data);
      }
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };

  useEffect(() => {
    if (survey.id) {
      getSurveyAnswers(survey.id);
    }
  }, [survey]);

  const removeItem = () => {
    console.log("Removed");
  };

  const answerNodes = surveyAnswers.map((answer: any, index: number) => {
    const stars = [1, 2, 3, 4, 5];
    const ratingsNode = stars.map((star, index) => {
      return (
        <svg
          key={index}
          aria-hidden="true"
          className={`h-6 w-6 transition-colors hover:text-yellow-300 ${
            star <= answer.rating ? "text-yellow-400" : "text-slate-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Star {index}</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    });

    const valueNodes = answer.values.map((value: any, index: number) => {
      return (
        <li
          key={index}
          className="rounded-full text-center bg-sky-100 text-sky-700 py-1 px-4 font-medium"
        >
          {value}
        </li>
      );
    });

    return (
      <tr
        key={index}
        className="flex flex-1 items-center justify-between gap-1 border-b py-3 odd:bg-slate-50"
      >
        <td className="flex flex-1 items-center gap-3 px-6">
            <div className="flex">{ratingsNode}</div>
        </td>
        <td className="hidden flex-1 px-6 md:block">
          <p className="text-sm text-slate-500">
            {answer.buy_again ? "True" : "False"}
          </p>
        </td>
        <td className="hidden max-w-[300px] flex-1 px-6 md:block">
          {answer.review}
        </td>
        <td className="hidden flex-1 px-6 md:block">
          <ul className="flex flex-wrap gap-3">{valueNodes}</ul>
        </td>
        <td className="hidden flex-1 px-6 md:block">
          <p className="text-sm text-slate-500">
            {new Date(answer.submitted_at).toLocaleDateString("en-GB")}
          </p>
        </td>
        <td className="flex max-w-[100px] flex-1 justify-center gap-4 px-6">
          {/* <DeleteItem
            itemToRemove={answer.name}
            removeItem={() => removeItem(answer)}
          /> */}
        </td>
      </tr>
    );
  });

  return (
    <div className="flex flex-1 justify-center px-2 py-12">
      <div className="mt-4 flex max-w-5xl flex-1 flex-col border-y border-slate-300 bg-white pb-12 shadow-sm md:mx-4 md:rounded-xl md:border-x">
        <div className="flex flex-col flex-wrap justify-between gap-6 py-6 px-6  md:flex-row">
          <div>
            <h3 className="text-lg font-medium text-slate-900">
              Survey results
            </h3>
            <p className="text-sm text-slate-500">
              View your survey results here.
            </p>
          </div>
        </div>
        <table>
          <thead className="text-left">
            <tr className="flex flex-1 justify-between gap-1 border-y py-3">
              <th className="flex-1 px-6">
                <h4 className="text-xs font-medium text-slate-500">Rating</h4>
              </th>
              <th className="hidden flex-1 px-6 md:block">
                <h4 className="text-xs font-medium text-slate-500">
                  Purchase again?
                </h4>
              </th>
              <th className="hidden flex-1 px-6 md:block">
                <h4 className="text-xs font-medium text-slate-500">Details</h4>
              </th>
              <th className="hidden flex-1 px-6 md:block">
                <h4 className="text-xs font-medium text-slate-500">Values</h4>
              </th>
              <th className="hidden flex-1 px-6 md:block">
                <h4 className="text-xs font-medium text-slate-500">Date</h4>
              </th>
              <th className="hidden max-w-[100px] flex-1 px-6 md:block"></th>
            </tr>
          </thead>
          <tbody>{answerNodes}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsScreen;
