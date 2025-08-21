import Sidebar from "@/components/shared/Sidebar";
import { LayoutDashboard, FilePlus, History } from "lucide-react";
import { Outlet } from "react-router-dom";

const navItems = [
  {
    title: "Dashboard",
    href: "/student/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "New Request",
    href: "/student/request",
    icon: <FilePlus className="h-4 w-4" />,
  },
  {
    title: "My Requests",
    href: "/student/my-requests",
    icon: <History className="h-4 w-4" />,
  },
];

const StudentLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar navItems={navItems} portalName="Student Portal" />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;