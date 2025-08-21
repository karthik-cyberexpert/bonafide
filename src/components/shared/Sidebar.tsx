import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Menu } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  navItems: NavItem[];
  portalName: string;
}

const Sidebar = ({ navItems, portalName }: SidebarProps) => (
  <>
    {/* Desktop Sidebar */}
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

    {/* Mobile Header + Nav */}
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
        <Sheet>
            <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
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
            </nav>
            </SheetContent>
        </Sheet>
    </header>
  </>
);

export default Sidebar;