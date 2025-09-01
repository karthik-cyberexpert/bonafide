import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ChevronLeft, ChevronRight, Search, User as UserIcon } from "lucide-react"; // Added Chevron and Search icons, renamed User to UserIcon to avoid conflict
import { NavItem } from "@/lib/types";
import { Button } from "@/components/ui/button"; // Import Button
import { Input } from "@/components/ui/input"; // Import Input
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar components
import { useSession } from "@/components/auth/SessionContextProvider"; // Import useSession

interface SidebarProps {
  navItems: NavItem[];
  portalName: string;
  variant?: 'default' | 'admin' | 'student' | 'principal' | 'hod' | 'tutor';
  isCollapsed: boolean; // Added isCollapsed prop
  setIsCollapsed: (collapsed: boolean) => void; // Added setIsCollapsed prop
}

const Sidebar = ({ navItems, portalName, variant = 'default', isCollapsed, setIsCollapsed }: SidebarProps) => {
  const isDefault = variant === 'default';
  const isAdmin = variant === 'admin';
  const isStudent = variant === 'student';
  const isPrincipal = variant === 'principal';
  const isHod = variant === 'hod';
  const isTutor = variant === 'tutor';

  const { profile } = useSession(); // Get user profile

  return (
    <aside className={cn(
      "hidden md:flex md:flex-col h-screen transition-all duration-300 ease-in-out",
      isCollapsed ? "md:w-20" : "md:w-64", // Adjust width based on collapsed state
      "border-r rounded-lg m-4", // Rounded corners and margin
      isDefault && "bg-sidebar",
      isAdmin && "bg-admin-sidebar text-admin-sidebar-foreground border-admin-sidebar-border", // Use admin theme variables
      isStudent && "bg-gradient-to-b from-student-sidebar-background-start to-student-sidebar-background-end text-student-sidebar-foreground border-student-sidebar-border",
      isPrincipal && "bg-principal-sidebar text-principal-sidebar-foreground border-principal-sidebar-border",
      isHod && "bg-hod-sidebar text-hod-sidebar-foreground border-hod-sidebar-border", // Use HOD theme variables
      isTutor && "bg-tutor-sidebar text-tutor-sidebar-foreground border-tutor-sidebar-border", // Use Tutor theme variables
      "z-20" // Ensure sidebar is above main content
    )}>
      <div className={cn(
        "flex items-center h-16 px-6 relative", // Added relative for absolute positioning of toggle button
        isCollapsed && "justify-center px-0",
        isAdmin && "border-admin-sidebar-border",
        isStudent && "border-student-sidebar-border",
        isPrincipal && "border-principal-sidebar-border",
        isHod && "border-hod-sidebar-border", // Use HOD theme variables
        isTutor && "border-tutor-sidebar-border" // Use Tutor theme variables
      )}>
        {!isCollapsed && (
          <>
            <LayoutDashboard className="h-6 w-6 mr-2" />
            <h2 className="text-lg font-semibold">{portalName}</h2>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-background border shadow-md",
            "hidden md:flex h-8 w-8 items-center justify-center",
            isAdmin && "bg-admin-sidebar text-admin-sidebar-foreground border-admin-sidebar-border hover:bg-admin-sidebar-active hover:text-admin-sidebar-active-foreground",
            isHod && "bg-hod-sidebar text-hod-sidebar-foreground border-hod-sidebar-border hover:bg-hod-sidebar-active hover:text-hod-sidebar-active-foreground", // HOD specific styling
            isPrincipal && "bg-principal-sidebar text-principal-sidebar-foreground border-principal-sidebar-border hover:bg-principal-sidebar-active hover:text-principal-sidebar-active-foreground", // Principal specific styling
            isStudent && "bg-student-sidebar-background-start text-student-sidebar-foreground border-student-sidebar-border hover:bg-student-sidebar-active hover:text-student-sidebar-active-foreground", // Student specific styling
            isTutor && "bg-tutor-sidebar text-tutor-sidebar-foreground border-tutor-sidebar-border hover:bg-tutor-sidebar-active hover:text-tutor-sidebar-active-foreground" // Tutor specific styling
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      {(isAdmin || isHod || isPrincipal || isTutor) && ( // Admin, HOD, Principal, and Tutor-specific search box
        <div className={cn("p-4", isCollapsed && "px-2")}>
          <div className="relative">
            <Search className={cn("absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", isCollapsed && "left-1/2 -translate-x-1/2")} />
            {!isCollapsed && (
              <Input
                type="search"
                placeholder="Search..."
                className={cn(
                  "w-full pl-9",
                  isAdmin && "bg-admin-sidebar-active text-admin-sidebar-active-foreground border-admin-sidebar-border focus:ring-admin-sidebar-active",
                  isHod && "bg-hod-sidebar-active text-hod-sidebar-active-foreground border-hod-sidebar-border focus:ring-hod-sidebar-active", // HOD specific styling
                  isPrincipal && "bg-principal-sidebar-active text-principal-sidebar-active-foreground border-principal-sidebar-border focus:ring-principal-sidebar-active", // Principal specific styling
                  isTutor && "bg-tutor-sidebar-active text-tutor-sidebar-active-foreground border-tutor-sidebar-border focus:ring-tutor-sidebar-active" // Tutor specific styling
                )}
              />
            )}
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                isDefault && "text-muted-foreground hover:text-primary",
                isAdmin && "text-admin-sidebar-muted-foreground hover:text-admin-sidebar-foreground",
                isStudent && "text-student-sidebar-muted-foreground hover:text-student-sidebar-foreground",
                isPrincipal && "text-principal-sidebar-muted-foreground hover:text-principal-sidebar-foreground",
                isHod && "text-hod-sidebar-muted-foreground hover:text-hod-sidebar-foreground", // HOD specific styling
                isTutor && "text-tutor-sidebar-muted-foreground hover:text-tutor-sidebar-foreground", // Tutor specific styling
                isActive && (
                  isDefault ? "bg-muted text-primary" :
                  isAdmin ? "bg-admin-sidebar-active text-admin-sidebar-active-foreground" :
                  isStudent ? "bg-student-sidebar-active text-student-sidebar-active-foreground" :
                  isPrincipal ? "bg-principal-sidebar-active text-principal-sidebar-active-foreground" :
                  isHod ? "bg-hod-sidebar-active text-hod-sidebar-active-foreground" : // HOD active styling
                  isTutor ? "bg-tutor-sidebar-active text-tutor-sidebar-active-foreground" : // Tutor active styling
                  ""
                ),
                isCollapsed && "justify-center" // Center items when collapsed
              )
            }
          >
            {item.icon}
            {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {(isAdmin || isHod || isPrincipal || isTutor) && profile && ( // Admin, HOD, Principal, and Tutor-specific user profile section
        <div className={cn("p-4 border-t", isCollapsed && "px-2 py-4 border-t-0", isAdmin && "border-admin-sidebar-border", isHod && "border-hod-sidebar-border", isPrincipal && "border-principal-sidebar-border", isTutor && "border-tutor-sidebar-border")}>
          <div className={cn("flex items-center gap-3", isCollapsed && "flex-col gap-1")}>
            <Avatar className={cn("h-9 w-9", isCollapsed && "h-10 w-10")}>
              <AvatarImage src={profile.avatar_url || undefined} alt={profile.username || "User"} />
              <AvatarFallback>
                <UserIcon className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className={cn("text-sm font-medium", isAdmin && "text-admin-sidebar-foreground", isHod && "text-hod-sidebar-foreground", isPrincipal && "text-principal-sidebar-foreground", isTutor && "text-tutor-sidebar-foreground")}>
                  {profile.first_name} {profile.last_name}
                </span>
                <span className={cn("text-xs", isAdmin && "text-admin-sidebar-muted-foreground", isHod && "text-hod-sidebar-muted-foreground", isPrincipal && "text-principal-sidebar-muted-foreground", isTutor && "text-tutor-sidebar-muted-foreground")}>
                  {profile.role}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;