import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import { NavItem } from "@/lib/types";

interface SidebarProps {
  navItems: NavItem[];
  portalName: string;
}

const Sidebar = ({ navItems, portalName }: SidebarProps) => (
  <aside className="hidden md:flex md:flex-col md:w-64 border-r bg-background">
    <div className="flex h-16 items-center border-b px-6">
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
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isActive && "bg-muted text-primary"
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

export default Sidebar;