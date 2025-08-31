import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import { NavItem } from "@/lib/types";

interface SidebarProps {
  navItems: NavItem[];
  portalName: string;
  variant?: 'default' | 'admin' | 'student' | 'principal' | 'hod';
}

const Sidebar = ({ navItems, portalName, variant = 'default' }: SidebarProps) => {
  const isDefault = variant === 'default';
  const isAdmin = variant === 'admin';
  const isStudent = variant === 'student';
  const isPrincipal = variant === 'principal';
  const isHod = variant === 'hod';

  return (
    <aside className={cn(
      "hidden md:flex md:flex-col md:w-64 border-r",
      isDefault && "bg-sidebar",
      isAdmin && "bg-admin-sidebar text-admin-sidebar-foreground",
      isStudent && "bg-gradient-to-b from-student-sidebar-start to-student-sidebar-end text-student-sidebar-foreground",
      isPrincipal && "bg-principal-sidebar text-principal-sidebar-foreground",
      isHod && "bg-black text-white" // Directly apply black background and white text
    )}>
      <div className={cn(
        "flex h-16 items-center border-b px-6",
        isAdmin && "border-admin-sidebar-border",
        isStudent && "border-student-sidebar-border",
        isPrincipal && "border-principal-sidebar-border",
        isHod && "border-gray-700" // A subtle border for contrast
      )}>
        <LayoutDashboard className="h-6 w-6 mr-2" />
        <h2 className="text-lg font-semibold">{portalName}</h2>
      </div>
      <nav className="flex-1 space-y-2 p-4">
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
                isHod && "text-gray-300 hover:text-white", // Muted foreground for inactive, white on hover
                isActive && (
                  isDefault ? "bg-muted text-primary" :
                  isAdmin ? "bg-admin-sidebar-active text-admin-sidebar-active-foreground" :
                  isStudent ? "bg-student-sidebar-active text-student-sidebar-active-foreground" :
                  isPrincipal ? "bg-principal-sidebar-active text-principal-sidebar-active-foreground" :
                  isHod ? "bg-gray-700 text-white" : // Active background and white text
                  ""
                )
              )
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;