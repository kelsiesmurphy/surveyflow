const WelcomeScreen = ({ selectedQuestion, survey }:{ [x: string]: any }) => {
  return (
    <div className="flex h-full flex-col items-center justify-around">
      <img src={survey.company_logo_img} className="rounded-lg w-16 h-16"/>
      <img src={survey.starter_img} className="rounded-lg aspect-[5/3] object-cover"/>
      <h1 className="text-center font-semibold text-lg text-slate-900">{selectedQuestion.title}</h1>
    </div>
  )
}

export default WelcomeScreen