import DashboardCard from "@/components/shared/DashboardCard";
import RequestAnalyticsChart from "@/components/shared/RequestAnalyticsChart";
import { dummyStudents } from "@/data/dummyData";
import { dummyTutorProfile } from "@/data/dummyProfiles";
import { dummyRequests } from "@/data/dummyRequests";
import { FileClock, Users } from "lucide-react";

const TutorDashboard = () => {
  // Calculate total students for the tutor
  const totalStudents = dummyStudents.filter(
    (student) => student.tutor === dummyTutorProfile.name
  ).length;

  // Calculate pending requests for the tutor
  const pendingRequests = dummyRequests.filter(
    (req) => req.status === "Pending Tutor Approval"
  ).length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard
          title="Total Students"
          value={totalStudents.toString()}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard
          title="Pending Requests"
          value={pendingRequests.toString()}
          icon={<FileClock className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div>
        <RequestAnalyticsChart />
      </div>
    </div>
  );
};

export default TutorDashboard;