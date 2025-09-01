import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import {
  LayoutDashboard,
  User,
  History,
  FileClock,
  Building,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { NavItem } from "@/lib/types";
import { useState } from "react"; // Import useState

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/principal/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Pending Requests",
    href: "/principal/pending-requests",
    icon: <FileClock className="h-4 w-4" />,
  },
  {
    title: "Request History",
    href: "/principal/request-history",
    icon: <History className="h-4 w-4" />,
  },
  {
    title: "Departments",
    href: "/principal/department-overview",
    icon: <Building className="h-4 w-4" />,
  },
  {
    title: "Profile",
    href: "/principal/profile",
    icon: <User className="h-4 w-4" />,
  },
];

const PrincipalLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse

  return (
    <div className="flex min-h-screen w-full principal-layout-theme"> {/* Apply Principal gradient here */}
      <Sidebar
        navItems={navItems}
        portalName="Principal Portal"
        variant="principal"
        isCollapsed={isCollapsed} // Pass state
        setIsCollapsed={setIsCollapsed} // Pass setter
      />
      <div className="flex flex-col flex-1">
        <Header
          navItems={navItems}
          portalName="Principal Portal"
          headerClassName="bg-principal-header text-primary-foreground dark:text-primary-foreground"
          isCollapsed={isCollapsed} // Pass isCollapsed to Header
          setIsCollapsed={setIsCollapsed} // Pass setIsCollapsed to Header
        />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrincipalLayout;