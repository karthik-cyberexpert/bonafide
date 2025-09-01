import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import {
  LayoutDashboard,
  User,
  History,
  FileClock,
  Users,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { NavItem } from "@/lib/types";
import { useState } from "react";

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/tutor/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Pending Requests",
    href: "/tutor/pending-requests",
    icon: <FileClock className="h-4 w-4" />,
  },
  {
    title: "Request History",
    href: "/tutor/request-history",
    icon: <History className="h-4 w-4" />,
  },
  {
    title: "My Students",
    href: "/tutor/students",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Profile",
    href: "/tutor/profile",
    icon: <User className="h-4 w-4" />,
  },
];

const TutorLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse

  return (
    <div className="flex min-h-screen w-full tutor-gradient-bg"> {/* Apply Tutor gradient here */}
      <Sidebar navItems={navItems} portalName="Tutor Portal" variant="tutor" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-col flex-1">
        <Header navItems={navItems} portalName="Tutor Portal" headerClassName="bg-tutor-header text-primary-foreground dark:text-primary-foreground" />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TutorLayout;