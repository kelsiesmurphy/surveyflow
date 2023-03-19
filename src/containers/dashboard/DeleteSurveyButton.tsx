import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { Trash2 } from "react-feather";
import { supabase } from "../../supabaseClient";

const DeleteSurveyButton = ({ survey, getSurveys }: any) => {
  const [open, setOpen] = useState(false);

  const deleteSurvey = async (survey: any) => {
    const { error } = await supabase.from("survey").delete().eq("id", survey.id);
    getSurveys()
  };

  return (
    <>
      <button className="p-3" onClick={() => setOpen(true)}>
        <Trash2
          size={20}
          className="cursor-pointer text-white transition-colors hover:text-red-400"
        />
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          modal: "customModal",
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
              Delete this Survey
            </h2>
            <p className="text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-medium text-red-700">{survey.title}</span>?
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-2.5 px-4 text-slate-700 shadow-sm outline-slate-900 transition-colors hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-600 bg-red-600 py-2.5 px-4 text-white shadow-sm outline-slate-900 transition-colors hover:border-red-700 hover:bg-red-700"
              onClick={() => deleteSurvey(survey)}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteSurveyButton;
