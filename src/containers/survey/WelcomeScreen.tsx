const WelcomeScreen = ({ selectedQuestion, survey }: { [x: string]: any }) => {
  return (
    <div className="flex h-full flex-col items-center justify-around gap-4">
      <img src={survey.company_logo_img} className="h-16 w-16 rounded-lg" />
      <img src={survey.starter_img} className="rounded-lg object-cover" />
      <h1 className="text-center text-lg font-semibold text-slate-900 md:text-2xl">
        {selectedQuestion.title}
      </h1>
    </div>
  );
};

export default WelcomeScreen;
