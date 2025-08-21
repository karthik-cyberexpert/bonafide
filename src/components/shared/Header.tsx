import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { NavItem } from "@/lib/types";

interface HeaderProps {
  navItems: NavItem[];
  portalName: string;
}

const Header = ({ navItems, portalName }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 sm:px-6">
      <div className="md:hidden">
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
      </div>
      
      {/* This empty div is a trick to push the theme toggle to the far right on desktop */}
      <div className="hidden md:block" />

      <ThemeToggle />
    </header>
  );
};

export default Header;