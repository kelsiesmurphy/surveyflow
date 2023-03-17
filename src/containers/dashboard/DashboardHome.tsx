import CreateSurveyButton from "./CreateSurveyButton"

const DashboardHome = ({userProfile}:any) => {
  return (
    <div className="flex-1 max-w-7xl">
        <div className="flex flex-1 justify-between">
            <h1 className="text-slate-900 font-medium text-xl md:text-2xl">Your Surveys</h1>
            <CreateSurveyButton  userProfile={userProfile}/>
        </div>
    </div>
  )
}

export default DashboardHome