import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import { LayoutDashboard, FilePlus, History, User } from "lucide-react";
import { Outlet } from "react-router-dom";
import { NavItem } from "@/lib/types";
import { useState } from "react";
import { StudentDashboardThemeProvider } from "@/components/student/StudentDashboardTheme"; // Import the provider

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar navItems={navItems} portalName="Student Portal" variant="student" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-col flex-1 student-layout-theme text-foreground">
        <Header
          navItems={navItems}
          portalName="Student Portal"
          headerClassName="bg-student-header text-foreground"
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          glassmorphism={true} // Enable glassmorphism
        />
        <main className="flex-1 p-0"> {/* Removed default padding, theme will handle */}
          <StudentDashboardThemeProvider> {/* Wrap Outlet with the theme provider */}
            <Outlet />
          </StudentDashboardThemeProvider>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;