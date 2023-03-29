const FarewellScreen = ({ selectedQuestion, survey }: { [x: string]: any }) => {
  return (
    <div className="flex h-full flex-col items-center justify-around gap-4">
      <img src={survey.company_logo_img} className="h-16 w-16 rounded-lg" />
      <h1 className="text-center text-lg font-semibold text-slate-900 md:text-2xl">
        {selectedQuestion.title}
      </h1>
      <p className="text-center text-xl font-bold text-slate-900 md:text-3xl">
        {survey.discount_code}
      </p>
    </div>
  );
};

export default FarewellScreen;
