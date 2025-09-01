import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import {
  LayoutDashboard,
  User,
  Users,
  Building,
  FileText,
  ClipboardList,
  Briefcase,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { NavItem } from "@/lib/types";
import { useState } from "react"; // Import useState

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Student Management",
    href: "/admin/student-management",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Batch Management",
    href: "/admin/batch-management",
    icon: <ClipboardList className="h-4 w-4" />,
  },
  {
    title: "Manage Faculties",
    href: "/admin/manage-faculties",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Manage Tutors",
    href: "/admin/manage-tutors",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    title: "Department Management",
    href: "/admin/department-management",
    icon: <Building className="h-4 w-4" />,
  },
  {
    title: "Template Management",
    href: "/admin/template-management",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Profile",
    href: "/admin/profile",
    icon: <User className="h-4 w-4" />,
  },
];

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse

  return (
    <div className="flex min-h-screen w-full admin-gradient-bg"> {/* Apply gradient here */}
      <Sidebar
        navItems={navItems}
        portalName="Admin Portal"
        variant="admin"
        isCollapsed={isCollapsed} // Pass state
        setIsCollapsed={setIsCollapsed} // Pass setter
      />
      <div className="flex flex-col flex-1"> {/* Removed bg-muted here, as gradient is on parent */}
        <Header
          navItems={navItems}
          portalName="Admin Portal"
          headerClassName="bg-header text-primary-foreground dark:text-primary-foreground"
          isCollapsed={isCollapsed} // Pass isCollapsed to Header
          setIsCollapsed={setIsCollapsed} // Pass setIsCollapsed to Header
        />
        <main className="flex-1 p-6 admin-layout-theme">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;