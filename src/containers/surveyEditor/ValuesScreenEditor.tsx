import { useEffect } from "react";

const ValuesScreen = ({
  selectedQuestion,
  survey,
  selectedValues,
  addValue,
  removeValue,
}: {
  [x: string]: any;
}) => {
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
        <button onClick={() => handleValueChange(value)}>
          {value}
        </button>
      </li>
    );
  });

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex justify-between gap-4">
        <h1 className="text-lg font-semibold text-slate-900">
          {selectedQuestion.title}
        </h1>
        <img src={survey.company_logo_img} className="h-16 w-16 rounded-lg" />
      </div>
      <ul className="flex flex-wrap gap-3">{valueNodes}</ul>
    </div>
  );
};

export default ValuesScreen;
