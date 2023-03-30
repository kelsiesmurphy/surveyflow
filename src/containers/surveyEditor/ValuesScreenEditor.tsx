import { useState } from "react";
import { supabase } from "../../supabaseClient";

const ValuesScreen = ({
  selectedQuestion,
  survey,
  selectedValues,
  addValue,
  removeValue,
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

  const handleValueChange = (value: string) => {
    if (selectedValues.includes(value)) {
      removeValue(value);
    } else {
      addValue(value);
    }
  };

  const valueNodes = survey.values.map((value: any, index: number) => {
    return (
      <li
        key={index}
        className={`rounded-full py-1 px-4 font-medium ${
          selectedValues.includes(value)
            ? "bg-sky-700 text-sky-100"
            : "bg-sky-100 text-sky-700"
        } transition-colors duration-300`}
      >
        <button onClick={() => handleValueChange(value)}>{value}</button>
      </li>
    );
  });

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex justify-between gap-4">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={updateTitle}
          rows={3}
          className="resize-none rounded-lg border-sky-600 text-lg font-semibold text-slate-900 hover:border-2 focus:outline-sky-600"
        ></textarea>
        <img src={survey.company_logo_img} className="h-16 w-16 rounded-lg" />
      </div>
      <ul className="flex flex-wrap gap-3">{valueNodes}</ul>
    </div>
  );
};

export default ValuesScreen;
