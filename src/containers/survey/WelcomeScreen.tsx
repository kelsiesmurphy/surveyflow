const WelcomeScreen = ({ selectedQuestion, survey }:{ [x: string]: any }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={survey.company_logo_img} className="rounded-lg w-16"/>
    </div>
  )
}

export default WelcomeScreen