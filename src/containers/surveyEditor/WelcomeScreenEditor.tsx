import { useState } from "react";
import { Upload } from "react-feather";
import { supabase } from "../../supabaseClient";

const WelcomeScreen = ({
  selectedQuestion,
  survey,
  deviceSize,
}: {
  [x: string]: any;
}) => {
  const [title, setTitle] = useState(selectedQuestion.title);

  const updateTitle = async () => {
    await supabase
      .from("survey_question")
      .update({ title: title })
      .eq("id", selectedQuestion.id);
  };

  return (
    <div className="flex h-full flex-col items-center justify-around gap-4">
      <img src={survey.company_logo_img} className="h-16 w-16 rounded-lg" />
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className={`flex aspect-[4/3] flex-1 cursor-pointer flex-col items-center justify-center rounded-lg transition-colors ${
            deviceSize === "desktop" ? "max-w-sm" : ""
          } ${
            survey.starter_img
              ? `bg-[url('${survey.starter_img}')] border-sky-600 bg-cover hover:border-2`
              : "bg-gray-50 hover:bg-slate-100"
          }`}
        >
          <div
            className={`flex-col items-center justify-center pt-5 pb-6 ${
              survey.starter_img ? "hidden" : "flex"
            }`}
          >
            <Upload className="mb-3 h-10 w-6 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG or JPG (MAX. 800x600px)
            </p>
          </div>

          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
      <textarea
        value={title}
        onBlur={updateTitle}
        onChange={(e) => setTitle(e.target.value)}
        rows={3}
        className="resize-none rounded-lg border-sky-600 text-center text-lg font-semibold text-slate-900 hover:border-2 focus:outline-sky-600"
      ></textarea>
    </div>
  );
};

export default WelcomeScreen;
