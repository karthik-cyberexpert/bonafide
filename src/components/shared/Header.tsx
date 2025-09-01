import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Menu, Bell, LogOut, ChevronLeft, ChevronRight } from "lucide-react"; // Added Chevron icons
import { ThemeToggle } from "./ThemeToggle";
import { NavItem } from "@/lib/types";
import { useSession } from "@/components/auth/SessionContextProvider"; // Import useSession

interface HeaderProps {
  navItems: NavItem[];
  portalName: string;
  headerClassName?: string; // New prop for custom header class
  isCollapsed?: boolean; // Added isCollapsed prop
  setIsCollapsed?: (collapsed: boolean) => void; // Added setIsCollapsed prop
}

const Header = ({ navItems, portalName, headerClassName, isCollapsed, setIsCollapsed }: HeaderProps) => {
  const { signOut } = useSession(); // Use the signOut function
  const onHeaderBg = headerClassName?.includes("bg-header") || headerClassName?.includes("bg-default-header");

  return (
    <header className={cn(
      "sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4 sm:px-6",
      headerClassName || "bg-default-header" // Use custom class if provided, otherwise default to bg-default-header
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
                  onHeaderBg && "bg-transparent border-current hover:bg-white/20"
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
        {setIsCollapsed && ( // Only render if setIsCollapsed is provided (i.e., not for default layout)
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hidden md:flex shrink-0",
              onHeaderBg && "bg-transparent border-current hover:bg-white/20"
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
          className={cn(onHeaderBg && "hover:bg-white/20")}
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">View notifications</span>
        </Button>
        <ThemeToggle onHeaderBg={onHeaderBg} />
        <Button
          variant="ghost"
          size="icon"
          onClick={signOut}
          className={cn(onHeaderBg && "hover:bg-white/20")}
        >
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;