import Sidebar from "@/components/shared/Sidebar";
import { LayoutDashboard, User, History } from "lucide-react";
import { Outlet } from "react-router-dom";

const navItems = [
  {
    title: "Dashboard",
    href: "/tutor/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Request History",
    href: "/tutor/request-history",
    icon: <History className="h-4 w-4" />,
  },
  {
    title: "Profile",
    href: "/tutor/profile",
    icon: <User className="h-4 w-4" />,
  },
];

const TutorLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar navItems={navItems} portalName="Tutor Portal" />
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TutorLayout;