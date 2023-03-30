import { useState } from "react";

const FarewellScreen = ({ selectedQuestion, survey }: { [x: string]: any }) => {
  const [title, setTitle] = useState(selectedQuestion.title);
  const [discountCode, setDiscountCode] = useState(survey.discount_code);

  return (
    <div className="flex h-full flex-col gap-4 justify-around">
      <img src={survey.company_logo_img} className="h-16 self-center w-16 rounded-lg" />
      <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={4}
          className="resize-none rounded-lg text-center border-sky-600 text-lg font-semibold text-slate-900 hover:border-2 focus:outline-sky-600"
        ></textarea>
      <input
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="resize-none rounded-lg text-center border-sky-600 text-xl font-bold text-slate-900 hover:border-2 focus:outline-sky-600"
        />
    </div>
  );
};

export default FarewellScreen;
