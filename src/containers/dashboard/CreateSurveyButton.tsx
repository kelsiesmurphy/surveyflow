import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Plus } from "react-feather";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { TwitterPicker } from "react-color";

const CreateSurveyButton = ({ userProfile, getSurveys, styles }: any) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [colour, setColour] = useState("");

  const createSurveyQuestions = async (data: any) => {
    await supabase.from("survey_question").insert([
      {
        title: "Please rate your recent experience with Surveyflow",
        question_type_id: 1,
        survey_id: data[0].id,
        company_id: userProfile.company_id,
        sort_order: 1,
        question_type_title: "Welcome",
        question_type_img: "https://xfjgoeigkozgqhjronue.supabase.co/storage/v1/object/public/surveyflow-storage/Welcome.svg"
      },
      {
        title: "Before we start, what do you value in a company?",
        question_type_id: 2,
        survey_id: data[0].id,
        company_id: userProfile.company_id,
        sort_order: 2,
        question_type_title: "Values",
        question_type_img: "https://xfjgoeigkozgqhjronue.supabase.co/storage/v1/object/public/surveyflow-storage/Values.svg"
      },
      {
        title: "Please rate your experience shopping with us.",
        question_type_id: 3,
        survey_id: data[0].id,
        company_id: userProfile.company_id,
        sort_order: 3,
        question_type_title: "Rating",
        question_type_img: "https://xfjgoeigkozgqhjronue.supabase.co/storage/v1/object/public/surveyflow-storage/Rating.svg"
      },
      {
        title: "Would you buy from us again in future?",
        question_type_id: 4,
        survey_id: data[0].id,
        company_id: userProfile.company_id,
        sort_order: 4,
        question_type_title: "Return",
        question_type_img: "https://xfjgoeigkozgqhjronue.supabase.co/storage/v1/object/public/surveyflow-storage/Return.svg"
      },
      {
        title:
          "Thank you! Here is a 10% discount on your next order as a thank you for taking the time to complete this!",
        question_type_id: 5,
        survey_id: data[0].id,
        company_id: userProfile.company_id,
        sort_order: 5,
        question_type_title: "Farewell",
        question_type_img: "https://xfjgoeigkozgqhjronue.supabase.co/storage/v1/object/public/surveyflow-storage/Fairwell.svg"
      },
    ]);
  };

  const createSurvey = async () => {
    try {
      const { data, error } = await supabase
        .from("survey")
        .insert({
          title: title,
          colour: colour,
          company_id: userProfile.company_id,
          starter_img:
            "https://xfjgoeigkozgqhjronue.supabase.co/storage/v1/object/public/surveyflow-storage/starter.jpeg",
          buy_again_img:
            "https://xfjgoeigkozgqhjronue.supabase.co/storage/v1/object/public/surveyflow-storage/buy_again.jpeg",
          discount_code: "EX4MPLEC0DE",
          values: [
            "Comfort",
            "Sustainability",
            "Material Quality",
            "Personality",
            "Authentic",
            "Customer Service",
            "Colours",
            "Price",
            "Warmth",
            "Ethically made",
            "Creativity",
          ],
        })
        .select();
      createSurveyQuestions(data);
      getSurveys();
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };

  const handleSubmit = (e: any) => {
    try {
      e.preventDefault();
      createSurvey();
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setTitle("");
      setColour("");
      setOpen(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className={styles}>
        <Plus size={20} />
        Create new
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          modal: "customModal",
        }}
      >
        <div className="flex flex-col">
          <div className="space-y-2 border-b px-3 py-4">
            <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
              Create a new Survey
            </h2>
            <p className="text-slate-500">
              Please enter a name and choose a colour for this survey.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="px-3">
              <div className="flex flex-wrap justify-between gap-x-8 border-b border-slate-300 py-4">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-slate-800"
                >
                  Survey title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  className="min-w-[280px] max-w-[448px] flex-1 rounded-lg border border-slate-300 py-3 px-3.5 shadow-sm outline-slate-900 placeholder:text-slate-500"
                  id="title"
                  placeholder="e.g. Customer survey"
                />
              </div>
              <div className="flex flex-col justify-between gap-2 py-4">
                <label
                  htmlFor="colour"
                  className="text-sm font-medium text-slate-800"
                >
                  Survey colour*
                </label>
                <div className="flex min-w-[280px] max-w-[448px] flex-1 justify-center rounded-lg border border-slate-300 py-3 px-3.5 shadow-sm outline-slate-900 placeholder:text-slate-500">
                  <TwitterPicker
                    color={colour}
                    onChangeComplete={(e: any) => setColour(e.hex)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 px-3 pt-2">
              <button
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-2.5 px-4 text-slate-700 shadow-sm outline-slate-900 transition-colors hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <input
                type="submit"
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-sky-600 bg-sky-600 py-2.5 px-4 text-white shadow-sm outline-slate-900 transition-colors hover:border-sky-700 hover:bg-sky-700"
                value="Create Survey"
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateSurveyButton;
