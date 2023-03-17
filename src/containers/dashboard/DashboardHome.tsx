import CreateSurveyButton from "./CreateSurveyButton"

const DashboardHome = () => {
  return (
    <div className="flex-1 max-w-7xl">
        <div className="flex flex-1 justify-between">
            <h1 className="text-slate-900 font-medium text-xl md:text-2xl">Your Surveys</h1>
            <CreateSurveyButton />
        </div>
    </div>
  )
}

export default DashboardHome