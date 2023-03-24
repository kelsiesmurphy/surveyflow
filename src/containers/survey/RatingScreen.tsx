const RatingScreen = ({ selectedQuestion, survey }: { [x: string]: any }) => {
  return (
    <div className="flex h-full flex-col items-center">
      <div className="flex gap-4">
        <h1 className="text-lg font-semibold text-slate-900">
          {selectedQuestion.title}
        </h1>
        <img src={survey.company_logo_img} className="h-16 w-16 rounded-lg" />
      </div>
    </div>
  );
};

export default RatingScreen;
