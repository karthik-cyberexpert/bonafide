import DashboardCard from "@/components/shared/DashboardCard";
import BatchRequestChart from "@/components/shared/BatchRequestChart";
import { dummyBatches, dummyStudents } from "@/data/dummyData";
import { dummyRequests } from "@/data/dummyRequests";
import { FileClock, Users, ClipboardList } from "lucide-react";

const HodDashboard = () => {
  // Calculate pending requests for HOD
  const pendingRequests = dummyRequests.filter(
    (req) => req.status === "Pending HOD Approval"
  ).length;

  // Calculate total students (assuming HOD oversees all students in the dummy data)
  const totalStudents = dummyStudents.length;

  // Calculate total active batches
  const activeBatches = dummyBatches.filter(
    (batch) => batch.status === "Active"
  ).length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">HOD Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard
          title="Pending Requests"
          value={pendingRequests.toString()}
          icon={<FileClock className="h-4 w-4 text-muted-foreground" />}
        />
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
      </div>
      <div>
        <BatchRequestChart />
      </div>
    </div>
  );
};

export default HodDashboard;