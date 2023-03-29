const FarewellScreen = ({ selectedQuestion, survey }: { [x: string]: any }) => {
  return (
    <div className="flex h-full flex-col items-center gap-4 justify-around">
      <img src={survey.company_logo_img} className="h-16 w-16 rounded-lg" />
      <h1 className="text-center text-lg font-semibold text-slate-900">
        {selectedQuestion.title}
      </h1>
      <p className="text-center text-xl font-bold text-slate-900">
        {survey.discount_code}
      </p>
    </div>
  );
};

export default FarewellScreen;
