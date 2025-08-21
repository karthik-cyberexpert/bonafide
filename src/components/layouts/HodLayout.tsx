import Sidebar from "@/components/shared/Sidebar";
import {
  LayoutDashboard,
  User,
  History,
  FileClock,
  Users,
  ClipboardList,
} from "lucide-react";
import { Outlet } from "react-router-dom";

const navItems = [
  {
    title: "Dashboard",
    href: "/hod/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Pending Requests",
    href: "/hod/pending-requests",
    icon: <FileClock className="h-4 w-4" />,
  },
  {
    title: "Request History",
    href: "/hod/request-history",
    icon: <History className="h-4 w-4" />,
  },
  {
    title: "Student Management",
    href: "/hod/student-management",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Batch Management",
    href: "/hod/batch-management",
    icon: <ClipboardList className="h-4 w-4" />,
  },
  {
    title: "Profile",
    href: "/hod/profile",
    icon: <User className="h-4 w-4" />,
  },
];

const HodLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar navItems={navItems} portalName="HOD Portal" />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HodLayout;