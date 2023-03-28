const WelcomeScreen = ({ selectedQuestion, survey }:{ [x: string]: any }) => {
  return (
    <div className="flex h-full flex-col gap-4 items-center justify-around">
      <img src={survey.company_logo_img} className="rounded-lg w-16 h-16"/>
      <img src={survey.starter_img} width={288} className="rounded-lg object-cover"/>
      <h1 className="text-center font-semibold text-lg text-slate-900">{selectedQuestion.title}</h1>
    </div>
  )
}

export default WelcomeScreen