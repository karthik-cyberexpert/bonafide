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
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar navItems={navItems} portalName="Admin Portal" variant="admin" />
      <div className="flex flex-col flex-1 bg-muted">
        <Header navItems={navItems} portalName="Admin Portal" headerClassName="bg-header text-primary-foreground dark:text-primary" />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;