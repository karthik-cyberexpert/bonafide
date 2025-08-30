import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import { LayoutDashboard, FilePlus, History, User } from "lucide-react";
import { Outlet } from "react-router-dom";
import { NavItem } from "@/lib/types";

const navItems: NavItem[] = [
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
  {
    title: "Profile",
    href: "/student/profile",
    icon: <User className="h-4 w-4" />,
  },
];

const StudentLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar navItems={navItems} portalName="Student Portal" variant="student" />
      <div className="flex flex-col flex-1 bg-gradient-to-b from-student-sidebar-start to-student-sidebar-end text-student-sidebar-foreground">
        <Header navItems={navItems} portalName="Student Portal" headerClassName="bg-student-header text-primary-foreground dark:text-primary" />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;