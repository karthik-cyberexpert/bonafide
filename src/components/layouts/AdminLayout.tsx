import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import { LayoutDashboard, User, History, FileClock, Users } from "lucide-react";
import { Outlet } from "react-router-dom";
import { NavItem } from "@/lib/types";

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Pending Requests",
    href: "/admin/pending-requests",
    icon: <FileClock className="h-4 w-4" />,
  },
  {
    title: "Request History",
    href: "/admin/request-history",
    icon: <History className="h-4 w-4" />,
  },
  {
    title: "Manage Faculties",
    href: "/admin/manage-faculties",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Profile",
    href: "/admin/profile",
    icon: <User className="h-4 w-4" />,
  },
];

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar navItems={navItems} portalName="Admin Portal" />
      <div className="flex flex-col flex-1 bg-muted/40">
        <Header navItems={navItems} portalName="Admin Portal" />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;