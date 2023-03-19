import Navigation from "../Navigation";
import DashboardHome from "./DashboardHome";


const DashboardContainer = ({ navigate, userProfile }: any) => {

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation navigate={navigate} />
      <div className="flex flex-1 justify-center bg-[#F9FAFB] px-4 py-12">
        <DashboardHome userProfile={userProfile}/>
      </div>
    </div>
  );
};

export default DashboardContainer;
