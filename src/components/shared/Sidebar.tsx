import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import { NavItem } from "@/lib/types";

interface SidebarProps {
  navItems: NavItem[];
  portalName: string;
  variant?: 'default' | 'admin';
}

const Sidebar = ({ navItems, portalName, variant = 'default' }: SidebarProps) => {
  const isDefault = variant === 'default';

  return (
    <aside className={cn(
      "hidden md:flex md:flex-col md:w-64 border-r",
      isDefault ? "bg-sidebar" : "bg-admin-sidebar text-admin-sidebar-foreground"
    )}>
      <div className={cn(
        "flex h-16 items-center border-b px-6",
        !isDefault && "border-admin-sidebar-border"
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
                isDefault ? "text-muted-foreground hover:text-primary" : "text-admin-sidebar-muted-foreground hover:text-admin-sidebar-foreground",
                isActive && (isDefault ? "bg-muted text-primary" : "bg-admin-sidebar-active text-admin-sidebar-active-foreground")
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