import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import { LayoutDashboard, FilePlus, History, User } from "lucide-react";
import { Outlet } from "react-router-dom";
import { NavItem } from "@/lib/types";
import { useState } from "react";
import { StudentDashboardThemeProvider, useStudentDashboardTheme } from "@/components/student/StudentDashboardTheme"; // Import the provider and hook
import { cn } from "@/lib/utils"; // Import cn for conditional class names

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

const StudentLayoutContent = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme } = useStudentDashboardTheme(); // Get the current student dashboard theme

  const mainContentThemeClass = cn(
    "flex-1", // Removed p-0, the theme class will handle padding
    "student-dashboard-main-content", // Base class for main content styling
    {
      'theme-ocean-breeze': theme === 'ocean-breeze',
      'theme-sunset-glow': theme === 'sunset-glow',
      'theme-forest-retreat': theme === 'forest-retreat',
    }
  );

  const headerThemeClass = cn(
    "bg-student-header",
    "text-foreground", // Default text color
    {
      'text-[hsl(var(--theme-ocean-breeze-text-color))]': theme === 'ocean-breeze',
      'text-[hsl(var(--theme-sunset-glow-text-color))]': theme === 'sunset-glow',
      'text-[hsl(var(--theme-forest-retreat-text-color))]': theme === 'forest-retreat',
    }
  );

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar
        navItems={navItems}
        portalName="Student Portal"
        variant="student"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        studentTheme={theme} // Pass the student theme to the sidebar
      />
      <div className="flex flex-col flex-1 student-layout-theme text-foreground">
        <Header
          navItems={navItems}
          portalName="Student Portal"
          headerClassName={headerThemeClass} // Apply dynamic header class
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          glassmorphism={true} // Enable glassmorphism
        />
        <main className={mainContentThemeClass}> {/* Apply theme classes directly to main */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const StudentLayout = () => (
  <StudentDashboardThemeProvider>
    <StudentLayoutContent />
  </StudentDashboardThemeProvider>
);

export default StudentLayout;