import { useEffect } from "react";

const ValuesScreen = ({ selectedQuestion, survey }: { [x: string]: any }) => {
  const valueNodes = survey.values.map((value:any, index:number) => {
    return <li key={index} className="bg-sky-100 text-sky-700 font-medium py-2 px-4 rounded-full">{value}</li>;
  });
  
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex gap-4">
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
