import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  ShoppingCart,
  BarChart,
  Menu,
  Briefcase,
  Share2,
} from "lucide-react";

const sidebarNavItems = [
  {
    title: "Analytics",
    href: "/dashboards/analytics",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    title: "E-commerce",
    href: "/dashboards/ecommerce",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    title: "Projects",
    href: "/dashboards/projects",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    title: "Social Media",
    href: "/dashboards/social",
    icon: <Share2 className="h-4 w-4" />,
  },
];

const Sidebar = () => (
  <aside className="hidden md:flex md:flex-col md:w-64 border-r bg-background">
    <div className="flex h-16 items-center border-b px-6">
      <LayoutDashboard className="h-6 w-6 mr-2" />
      <h2 className="text-lg font-semibold">Dashboards</h2>
    </div>
    <nav className="flex-1 space-y-2 p-4">
      {sidebarNavItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
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

const MobileNav = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <nav className="grid gap-6 text-lg font-medium">
        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
          <LayoutDashboard className="h-6 w-6" />
          <span>Dashboards</span>
        </div>
        {sidebarNavItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
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
);

const Layout = () => {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileNav />
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;