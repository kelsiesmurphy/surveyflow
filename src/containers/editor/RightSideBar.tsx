import { useState } from "react";
import { ChevronLeft, Upload, X } from "react-feather";
import { supabase } from "../../supabaseClient";

const RightSideBar = ({
  survey,
  getSurvey,
  showSettings,
  setShowSettings,
}: any) => {
  const [updatedValues, setUpdatedValues] = useState([]);

  const updateLogo = async (path: any) => {
    await supabase
      .from("survey")
      .update({
        company_logo_img:
          "https://xfjgoeigkozgqhjronue.supabase.co/storage/v1/object/public/surveyflow-user-storage/" +
          path,
      })
      .eq("id", survey.id);
    getSurvey(survey.id);
  };

  const handleLogoUpload = async (e: any) => {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }
    const { data, error } = await supabase.storage
      .from("surveyflow-user-storage")
      .upload(file?.name, file as File);
    if (data) {
      console.log(data);
      updateLogo(data.path);
    } else if (error) {
      console.log(error);
      alert(
        "There was an error adding this image. Please try a different image."
      );
    }
  };

  const updateDBValues = async () => {
    await supabase
      .from("survey")
      .update({ values: updatedValues })
      .eq("id", survey.id);
  };

  const ValueField = ({ value, index, handleValueChange }: any) => {
    const [newValue, setNewValue] = useState(value);
    return (
      <li key={index} className="flex flex-col gap-1">
        <label
          className="text-sm font-medium text-slate-600"
          htmlFor={`${value}-input`}
        >
          Value {index + 1}
        </label>
        <input
          id={`${value}-input`}
          type={value}
          value={value}
          onChange={handleValueChange}
          onBlur={updateDBValues}
          placeholder={`Enter value ${index + 1}`}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm"
        />
      </li>
    );
  };

  let valueNodes;
  if (survey.values) {
    valueNodes = survey.values.map((value: any, index: number) => {
      const handleValueChange = (e: any) => {
        const dupValues: any = [...survey.values];
        dupValues[index] = e.target.value;
        setUpdatedValues(dupValues);
        console.log(updatedValues);
      };

      return (
        <ValueField
          key={index}
          value={value}
          index={index}
          handleValueChange={handleValueChange}
        />
      );
    });
  }

  return (
    <div
      className={`flex flex-col bg-white p-4 transition-all ${
        showSettings ? "w-[320px]" : "w-[60px]"
      }`}
    >
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`flex-1 items-center justify-center ${
          showSettings ? "hidden" : "flex"
        }`}
      >
        <ChevronLeft className="text-slate-400 transition-colors hover:text-slate-800" />
      </button>
      <div
        className={`relative flex flex-col gap-4 overflow-y-auto scrollbar-hide ${
          showSettings ? "flex" : "hidden"
        }`}
      >
        <button
          onClick={() => setShowSettings(false)}
          className="absolute flex self-end"
        >
          <X className="text-slate-400 transition-colors hover:text-slate-800" />
        </button>
        <div className="gap mt-3 flex flex-col">
          <h2 className="text-lg font-medium text-slate-900">Company Logo</h2>
          <p className="mb-4 text-sm text-slate-500">
            Update the company logo here, and it will update in real time in
            your survey.
          </p>
          <div className="flex max-w-[100px] items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className={`flex aspect-square flex-1 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg transition-colors ${
                survey.company_logo_img
                  ? `border-sky-600 bg-cover hover:border-2`
                  : "bg-gray-50 hover:bg-slate-100"
              }`}
            >
              <img
                className="aspect-square object-cover"
                src={survey.company_logo_img}
              />
              <div
                className={`flex-col items-center justify-center gap-1 pt-5 pb-6 ${
                  survey.company_logo_img ? "hidden" : "flex"
                }`}
              >
                <Upload className="h-10 w-6 text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Upload</span>
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  handleLogoUpload(e);
                }}
              />
            </label>
          </div>
        </div>
        <hr />
        <div>
          <h2 className="text-lg font-medium text-slate-900">Company Values</h2>
          <p className="mb-4 text-sm text-slate-500">
            Update the company values here, and they will update in real time in
            your survey.
          </p>
          <ul className="space-y-4">{valueNodes}</ul>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
