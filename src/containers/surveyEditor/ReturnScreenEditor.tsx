import { useState } from "react";
import { Upload } from "react-feather";

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

  return (
    <div className="flex h-full flex-col justify-around gap-4">
      <div className="flex justify-center">
        <div className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className={`aspect-[4/3] transition-colors flex flex-1 cursor-pointer flex-col items-center justify-center rounded-lg ${deviceSize === "desktop" ? "max-w-sm" : ""} ${survey.buy_again_img ? `bg-[url('${survey.buy_again_img}')] bg-cover hover:border-2 border-sky-600` : "bg-gray-50 hover:bg-slate-100"}`}
        > 
            <div className={`flex-col items-center justify-center pt-5 pb-6 ${survey.buy_again_img ? "hidden" : "flex"}`}>
              <Upload className="mb-3 h-10 w-6 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG or JPG (MAX. 800x600px)
              </p>
            </div>
          
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
      </div>
      <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
