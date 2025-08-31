import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import {
  LayoutDashboard,
  User,
  History,
  FileClock,
  Users,
  ClipboardList,
  Briefcase,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { NavItem } from "@/lib/types";

const navItems: NavItem[] = [
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
    title: "Profile",
    href: "/hod/profile",
    icon: <User className="h-4 w-4" />,
  },
];

const HodLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar navItems={navItems} portalName="HOD Portal" variant="hod" />
      <div className="flex flex-col flex-1 bg-gray-100 dark:bg-gray-900"> {/* Explicitly set light background for main content */}
        <Header navItems={navItems} portalName="HOD Portal" headerClassName="bg-gray-100 dark:bg-gray-900 text-foreground" />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HodLayout;