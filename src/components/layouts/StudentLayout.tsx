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

  // This class should apply to the container of header and main
  const layoutAndMainContainerClass = cn(
    "flex flex-col flex-1", // Keep flex properties
    "student-layout-theme", // Base class for the overall layout background
    {
      'theme-ocean-breeze': studentTheme === 'ocean-breeze',
      'theme-sunset-glow': studentTheme === 'sunset-glow',
      'theme-forest-retreat': studentTheme === 'forest-retreat',
    }
  );

  // This class applies to the main content area (Outlet)
  const mainContentClass = cn(
    "flex-1 p-6 rounded-lg shadow-inner", // Keep padding, rounded corners, shadow
    "text-foreground", // Ensure text color is set, it will be overridden by theme-specific text-color from parent
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

  // Determine header background based on studentTheme and systemTheme
  const getHeaderBackgroundColorClass = () => {
    if (systemTheme === 'dark') {
      switch (studentTheme) {
        case 'ocean-breeze': return 'bg-[hsl(var(--dark-theme-ocean-breeze-header-background))]';
        case 'sunset-glow': return 'bg-[hsl(var(--dark-theme-sunset-glow-header-background))]';
        case 'forest-retreat': return 'bg-[hsl(var(--dark-theme-forest-retreat-header-background))]';
        default: return 'bg-student-header'; // Default dark mode header background
      }
    } else {
      switch (studentTheme) {
        case 'ocean-breeze': return 'bg-[hsl(var(--theme-ocean-breeze-header-background))]';
        case 'sunset-glow': return 'bg-[hsl(var(--theme-sunset-glow-header-background))]';
        case 'forest-retreat': return 'bg-[hsl(var(--theme-forest-retreat-header-background))]';
        default: return 'bg-student-header'; // Default light mode header background
      }
    }
  };

  const headerBackgroundColorClass = getHeaderBackgroundColorClass();

  const headerClassName = cn(
    headerBackgroundColorClass, // Apply dynamic header background
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
      <div className={layoutAndMainContainerClass}> {/* Apply layout theme here */}
        <Header
          navItems={navItems}
          portalName="Student Portal"
          headerClassName={headerClassName}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          glassmorphism={true} // Enable glassmorphism
          isStudentLayout={true} // Indicate that this is a student layout
        />
        <main className={mainContentClass}> {/* Main content styling */}
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