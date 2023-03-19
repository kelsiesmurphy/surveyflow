import DashboardNavigation from "./DashboardNavigation";
import DashboardHome from "./DashboardHome";

const DashboardContainer = ({ navigate, userProfile }: any) => {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNavigation navigate={navigate} />
      <div className="flex flex-1 justify-center bg-[#F9FAFB] px-4 py-12">
        <DashboardHome userProfile={userProfile} />
      </div>
    </div>
  );
};

export default DashboardContainer;
