import { useState } from "react";
import { Upload } from "react-feather";
import { supabase } from "../../supabaseClient";

const ReturnScreen = ({
  selectedQuestion,
  survey,
  deviceSize,
  returnBack,
  setReturnBack,
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

  const updateReturnImg = async (path: any) => {
    await supabase
      .from("survey")
      .update({
        buy_again_img:
          "https://xfjgoeigkozgqhjronue.supabase.co/storage/v1/object/public/surveyflow-user-storage/" +
          path,
      })
      .eq("id", survey.id);
  };

  const handleUpload = async (e: any) => {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }
    const { data, error } = await supabase.storage
      .from("surveyflow-user-storage")
      .upload(file?.name, file as File);
    if (data) {
      updateReturnImg(data.path);
    } else if (error) {
      console.log(error);
      alert("There was an error adding this image. Please try a different image.")
    }
  };

  return (
    <div className="flex h-full flex-col justify-around gap-4">
      <div className="flex justify-center">
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className={`flex aspect-[4/3] overflow-hidden flex-1 cursor-pointer flex-col items-center justify-center rounded-lg transition-colors ${
              deviceSize === "desktop" ? "max-w-sm" : ""
            } ${
              survey.buy_again_img
                ? `border-sky-600 bg-cover hover:border-2`
                : "bg-gray-50 hover:bg-slate-100"
            }`}
          >
            <img className="aspect-[4/3] object-cover" src={survey.buy_again_img}/>
            <div
              className={`flex-col items-center justify-center pt-5 pb-6 ${
                survey.buy_again_img ? "hidden" : "flex"
              }`}
            >
              <Upload className="mb-3 h-10 w-6 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG or JPG (MAX. 800x600px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                handleUpload(e);
              }}
            />
          </label>
        </div>
      </div>
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={updateTitle}
        rows={2}
        className="resize-none rounded-lg border-sky-600 text-center text-lg font-semibold text-slate-900 hover:border-2 focus:outline-sky-600"
      ></textarea>
      <div className="flex flex-wrap gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2">
        <button
          onClick={() => setReturnBack(false)}
          className={
            returnBack === false
              ? "text-md h-11 flex-1 cursor-pointer rounded-md bg-white font-medium text-slate-700 drop-shadow transition-all"
              : "text-md h-11 flex-1 cursor-pointer rounded-md bg-transparent font-medium text-slate-500 transition-all"
          }
        >
          No
        </button>
        <button
          onClick={() => setReturnBack(true)}
          className={
            returnBack === true
              ? "text-md h-11 flex-1 cursor-pointer rounded-md bg-white font-medium text-slate-700 drop-shadow transition-all"
              : "text-md h-11 flex-1 cursor-pointer rounded-md bg-transparent font-medium text-slate-500 transition-all"
          }
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default ReturnScreen;
