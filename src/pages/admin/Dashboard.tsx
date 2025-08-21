import DashboardCard from "@/components/shared/DashboardCard";
import DepartmentRequestChart from "@/components/shared/DepartmentRequestChart";
import { dummyHods } from "@/data/dummyData";
import { dummyRequests } from "@/data/dummyRequests";
import { FileClock, Building } from "lucide-react";

const AdminDashboard = () => {
  // Calculate pending requests for Admin
  const pendingRequests = dummyRequests.filter(
    (req) => req.status === "Pending Admin Approval"
  ).length;

  // Calculate total departments from the number of HODs
  const totalDepartments = dummyHods.length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
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

export default AdminDashboard;