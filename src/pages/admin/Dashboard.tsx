import DashboardCard from "@/components/shared/DashboardCard";
import BatchRequestAnalyticsChart from "@/components/shared/BatchRequestAnalyticsChart";
import { dummyStudents, dummyBatches } from "@/data/dummyData";
import { dummyRequests } from "@/data/dummyRequests";
import { Users, ClipboardList, FileClock } from "lucide-react";

const AdminDashboard = () => {
  const totalStudents = dummyStudents.length;
  const activeBatches = dummyBatches.filter(
    (batch) => batch.status === "Active"
  ).length;
  const pendingRequests = dummyRequests.filter(
    (req) => req.status === "Pending Admin Approval"
  ).length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard
          title="Total Students"
          value={totalStudents.toString()}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard
          title="Active Batches"
          value={activeBatches.toString()}
          icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard
          title="Pending Requests"
          value={pendingRequests.toString()}
          icon={<FileClock className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div>
        <BatchRequestAnalyticsChart />
      </div>
    </div>
  );
};

export default AdminDashboard;