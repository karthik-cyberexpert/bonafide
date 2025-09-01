import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Menu, Bell, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { NavItem } from "@/lib/types";
import { useSession } from "@/components/auth/SessionContextProvider";
import { useStudentDashboardTheme } from "../student/StudentDashboardTheme"; // Import student theme hook
import { useTheme } from "next-themes"; // Import useTheme to check dark mode

interface HeaderProps {
  navItems: NavItem[];
  portalName: string;
  headerClassName?: string;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
  glassmorphism?: boolean; // New prop for glassmorphism effect
}

const Header = ({ navItems, portalName, headerClassName, isCollapsed, setIsCollapsed, glassmorphism }: HeaderProps) => {
  const { signOut } = useSession();
  const { theme: studentTheme } = useStudentDashboardTheme(); // Get student theme
  const { theme: systemTheme } = useTheme(); // Get system theme

  // Determine if buttons/icons should have 'on dark background' styling
  const onHeaderBg = glassmorphism || headerClassName?.includes("bg-header") || headerClassName?.includes("bg-default-header") || headerClassName?.includes("bg-admin-header") || headerClassName?.includes("bg-principal-header") || headerClassName?.includes("bg-hod-header") || headerClassName?.includes("bg-tutor-header");

  // Determine dynamic text color for header buttons/icons
  const getButtonTextColorClass = () => {
    if (systemTheme === 'dark') {
      switch (studentTheme) {
        case 'ocean-breeze': return 'text-[hsl(var(--dark-theme-ocean-breeze-header-text-color))]';
        case 'sunset-glow': return 'text-[hsl(var(--dark-theme-sunset-glow-header-text-color))]';
        case 'forest-retreat': return 'text-[hsl(var(--dark-theme-forest-retreat-header-text-color))]';
        default: return 'text-white'; // Default dark mode header buttons
      }
    } else {
      switch (studentTheme) {
        case 'ocean-breeze': return 'text-[hsl(var(--theme-ocean-breeze-header-text-color))]';
        case 'sunset-glow': return 'text-[hsl(var(--theme-sunset-glow-header-text-color))]';
        case 'forest-retreat': return 'text-[hsl(var(--theme-forest-retreat-header-text-color))]';
        default: return 'text-foreground'; // Default light mode header buttons
      }
    }
  };

  const buttonTextColorClass = getButtonTextColorClass();

  return (
    <header className={cn(
      "sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4 sm:px-6",
      headerClassName || "bg-default-header",
      glassmorphism && "backdrop-blur-md bg-background/30 border-white/20 dark:border-white/10" // Glassmorphism styles
    )}>
      <div className="flex items-center gap-4">
        {/* Mobile Sheet Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "shrink-0",
                  onHeaderBg && "bg-transparent border-current hover:bg-white/20 dark:hover:bg-white/10",
                  buttonTextColorClass // Apply dynamic text color
                )}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <nav className="grid gap-6 text-lg font-medium p-4">
                <div className="flex items-center gap-2 text-lg font-semibold mb-4 border-b pb-4">
                  <LayoutDashboard className="h-6 w-6" />
                  <span>{portalName}</span>
                </div>
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                        isActive && "text-foreground"
                      )
                    }
                  >
                    {item.icon}
                    {item.title}
                  </NavLink>
                ))}
                <Button variant="ghost" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground w-full justify-start" onClick={signOut}>
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar Toggle Button */}
        {setIsCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hidden md:flex shrink-0",
              onHeaderBg && "bg-transparent border-current hover:bg-white/20 dark:hover:bg-white/10",
              buttonTextColorClass // Apply dynamic text color
            )}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        )}
      </div>

      {/* This empty div is a trick to push the theme toggle to the far right on desktop */}
      <div className="flex-grow" />

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={cn(onHeaderBg && "hover:bg-white/20 dark:hover:bg-white/10", buttonTextColorClass)} // Apply dynamic text color
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">View notifications</span>
        </Button>
        <ThemeToggle onHeaderBg={onHeaderBg} />
        <Button
          variant="ghost"
          size="icon"
          onClick={signOut}
          className={cn(onHeaderBg && "hover:bg-white/20 dark:hover:bg-white/10", buttonTextColorClass)} // Apply dynamic text color
        >
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;