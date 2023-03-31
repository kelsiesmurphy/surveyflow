import { useState } from "react";
import { supabase } from "../../supabaseClient";

const FarewellScreen = ({
  selectedQuestion,
  survey,
  setShowSettings,
}: {
  [x: string]: any;
}) => {
  const [title, setTitle] = useState(selectedQuestion.title);
  const [discountCode, setDiscountCode] = useState(survey.discount_code);

  const updateTitle = async () => {
    await supabase
      .from("survey_question")
      .update({ title: title })
      .eq("id", selectedQuestion.id);
  };

  const updateDiscountCode = async () => {
    await supabase
      .from("survey")
      .update({ discount_code: discountCode })
      .eq("id", survey.id);
  };

  return (
    <div className="flex h-full flex-col justify-around gap-4">
        <img
          src={survey.company_logo_img}
          className="h-16 w-16 self-center rounded-lg"
        />
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={updateTitle}
        rows={4}
        className="resize-none rounded-lg border-sky-600 text-center text-lg font-semibold text-slate-900 hover:border-2 focus:outline-sky-600"
      ></textarea>
      <input
        value={discountCode}
        onBlur={updateDiscountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        className="resize-none rounded-lg border-sky-600 text-center text-xl font-bold text-slate-900 hover:border-2 focus:outline-sky-600"
      />
    </div>
  );
};

export default FarewellScreen;
