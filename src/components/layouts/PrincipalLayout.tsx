import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import {
  LayoutDashboard,
  User,
  History,
  FileClock,
  Building,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { NavItem } from "@/lib/types";

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/principal/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Pending Requests",
    href: "/principal/pending-requests",
    icon: <FileClock className="h-4 w-4" />,
  },
  {
    title: "Request History",
    href: "/principal/request-history",
    icon: <History className="h-4 w-4" />,
  },
  {
    title: "Departments",
    href: "/principal/department-overview",
    icon: <Building className="h-4 w-4" />,
  },
  {
    title: "Profile",
    href: "/principal/profile",
    icon: <User className="h-4 w-4" />,
  },
];

const PrincipalLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar navItems={navItems} portalName="Principal Portal" />
      <div className="flex flex-col flex-1 bg-muted/40">
        <Header navItems={navItems} portalName="Principal Portal" />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrincipalLayout;