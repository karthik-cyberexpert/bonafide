import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import { LayoutDashboard, FilePlus, History, User } from "lucide-react";
import { Outlet } from "react-router-dom";
import { NavItem } from "@/lib/types";
import { useState } from "react";
import { StudentDashboardThemeProvider, useStudentDashboardTheme } from "@/components/student/StudentDashboardTheme"; // Import the provider and hook
import { cn } from "@/lib/utils"; // Import cn for conditional class names
import { useTheme } from "next-themes"; // Import useTheme to check dark mode

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
  const { theme: studentTheme } = useStudentDashboardTheme(); // Get the current student dashboard theme
  const { theme: systemTheme } = useTheme(); // Get the system theme (light/dark)

  const mainContentThemeClass = cn(
    "flex-1", // Removed p-0, the theme class will handle padding
    "student-dashboard-main-content", // Base class for main content styling
    {
      'theme-ocean-breeze': studentTheme === 'ocean-breeze',
      'theme-sunset-glow': studentTheme === 'sunset-glow',
      'theme-forest-retreat': studentTheme === 'forest-retreat',
    }
  );

  // Determine header text color based on studentTheme and systemTheme
  const getHeaderTextColorClass = () => {
    if (systemTheme === 'dark') {
      switch (studentTheme) {
        case 'ocean-breeze': return 'text-[hsl(var(--dark-theme-ocean-breeze-header-text-color))]';
        case 'sunset-glow': return 'text-[hsl(var(--dark-theme-sunset-glow-header-text-color))]';
        case 'forest-retreat': return 'text-[hsl(var(--dark-theme-forest-retreat-header-text-color))]';
        default: return 'text-foreground'; // Default dark mode foreground
      }
    } else {
      switch (studentTheme) {
        case 'ocean-breeze': return 'text-[hsl(var(--theme-ocean-breeze-header-text-color))]';
        case 'sunset-glow': return 'text-[hsl(var(--theme-sunset-glow-header-text-color))]';
        case 'forest-retreat': return 'text-[hsl(var(--theme-forest-retreat-header-text-color))]';
        default: return 'text-foreground'; // Default light mode foreground
      }
    }
  };

  const headerTextColorClass = getHeaderTextColorClass();

  const headerClassName = cn(
    "bg-student-header",
    headerTextColorClass
  );

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar
        navItems={navItems}
        portalName="Student Portal"
        variant="student"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        studentTheme={studentTheme} // Pass the student theme to the sidebar
      />
      <div className="flex flex-col flex-1 student-layout-theme text-foreground">
        <Header
          navItems={navItems}
          portalName="Student Portal"
          headerClassName={headerClassName} // Apply dynamic header class
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