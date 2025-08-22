import DashboardCard from "@/components/shared/DashboardCard";
import DepartmentRequestChart from "@/components/shared/DepartmentRequestChart";
import {
  students as appStudents,
  tutors as appTutors,
  hods as appHods,
  requests as appRequests,
  departments as appDepartments,
} from "@/data/appData";
import { FileClock, Users, Building, Briefcase } from "lucide-react";

const PrincipalDashboard = () => {
  const totalStudents = appStudents.length;
  const totalStaff = appTutors.length + appHods.length;
  const pendingRequests = appRequests.filter((req) =>
    req.status.startsWith("Pending")
  ).length;
  const totalDepartments = appDepartments.length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Principal Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Students"
          value={totalStudents.toString()}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard
          title="Total Staff"
          value={totalStaff.toString()}
          icon={<Briefcase className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard
          title="Pending Requests"
          value={pendingRequests.toString()}
          icon={<FileClock className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard
          title="Total Departments"
          value={totalDepartments.toString()}
          icon={<Building className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div>
        <DepartmentRequestChart />
      </div>
    </div>
  );
};

export default PrincipalDashboard;