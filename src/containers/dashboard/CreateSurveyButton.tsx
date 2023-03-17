import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Plus } from "react-feather"
import { useState } from "react";

const CreateSurveyButton = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [colour, setColour] = useState("");

  const handleSubmit = () => {
    console.log("submitted!");
    
  }

  return (
    <>
        <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-lg border border-sky-600 bg-sky-600 px-4 py-2 text-center align-middle font-medium text-white shadow-sm transition hover:border-sky-700 hover:bg-sky-700">
          <Plus size={24} />
          Create new
        </button>
        
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          modal: 'customModal',
        }}
        >
        <div className="flex flex-col">
          <div className="border-b px-3 py-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Create a new survey
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
              onChange={(e) => setTitle(e.target.value)}
              className="min-w-[280px] max-w-[448px] flex-1 rounded-lg border border-slate-300 py-3 px-3.5 shadow-sm outline-slate-900 placeholder:text-slate-500"
              id="title"
              placeholder="e.g. Customer survey"
            />
          </div>
          <div className="flex flex-wrap justify-between gap-x-8 py-4">
            <label
              htmlFor="colour"
              className="text-sm font-medium text-slate-800"
            >
              Survey colour*
            </label>
            <input
              type="text"
              name="colour"
              value={colour}
              onChange={(e) => setColour(e.target.value)}
              className="min-w-[280px] max-w-[448px] flex-1 rounded-lg border border-slate-300 py-3 px-3.5 shadow-sm outline-slate-900 placeholder:text-slate-500"
              id="colour"
              placeholder="e.g. #ff0000"
            />
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
            value="Add Event"
          />
        </div>
          </form>
        </div>
        </Modal>
    </>
  );
};

export default CreateSurveyButton;
