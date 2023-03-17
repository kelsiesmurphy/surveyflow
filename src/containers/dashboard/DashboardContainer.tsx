import Navigation from "../Navigation";
import DashboardHome from "./DashboardHome";

const DashboardContainer = ({ navigate, userProfile }:any) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation navigate={navigate}/>
      <div className="bg-[#F9FAFB] flex-1 flex justify-center px-4 py-12">
        <DashboardHome userProfile={userProfile}/>
      </div>
    </div>
  );
};

export default DashboardContainer;
