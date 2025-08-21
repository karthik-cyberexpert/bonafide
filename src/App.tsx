import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

import StudentLayout from "./components/layouts/StudentLayout";
import StudentDashboard from "./pages/student/Dashboard";
import NewRequest from "./pages/student/NewRequest";
import MyRequests from "./pages/student/MyRequests";
import StudentProfile from "./pages/student/Profile";

import TutorLayout from "./components/layouts/TutorLayout";
import TutorDashboard from "./pages/tutor/Dashboard";
import TutorProfile from "./pages/tutor/Profile";
import TutorRequestHistory from "./pages/tutor/RequestHistory";
import TutorPendingRequests from "./pages/tutor/PendingRequests";
import TutorStudents from "./pages/tutor/Students";

import HodLayout from "./components/layouts/HodLayout";
import HodDashboard from "./pages/hod/Dashboard";
import HodProfile from "./pages/hod/Profile";
import HodRequestHistory from "./pages/hod/RequestHistory";
import HodPendingRequests from "./pages/hod/PendingRequests";
import BatchManagement from "./pages/hod/BatchManagement";
import StudentManagement from "./pages/hod/StudentManagement";

import AdminLayout from "./components/layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProfile from "./pages/admin/Profile";
import AdminRequestHistory from "./pages/admin/RequestHistory";
import AdminPendingRequests from "./pages/admin/PendingRequests";
import ManageFaculties from "./pages/admin/ManageFaculties";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route element={<StudentLayout />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/request" element={<NewRequest />} />
            <Route path="/student/my-requests" element={<MyRequests />} />
            <Route path="/student/profile" element={<StudentProfile />} />
          </Route>

          <Route element={<TutorLayout />}>
            <Route path="/tutor/dashboard" element={<TutorDashboard />} />
            <Route
              path="/tutor/pending-requests"
              element={<TutorPendingRequests />}
            />
            <Route
              path="/tutor/request-history"
              element={<TutorRequestHistory />}
            />
            <Route path="/tutor/students" element={<TutorStudents />} />
            <Route path="/tutor/profile" element={<TutorProfile />} />
          </Route>

          <Route element={<HodLayout />}>
            <Route path="/hod/dashboard" element={<HodDashboard />} />
            <Route
              path="/hod/pending-requests"
              element={<HodPendingRequests />}
            />
            <Route
              path="/hod/request-history"
              element={<HodRequestHistory />}
            />
            <Route
              path="/hod/student-management"
              element={<StudentManagement />}
            />
            <Route
              path="/hod/batch-management"
              element={<BatchManagement />}
            />
            <Route path="/hod/profile" element={<HodProfile />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin/pending-requests"
              element={<AdminPendingRequests />}
            />
            <Route
              path="/admin/request-history"
              element={<AdminRequestHistory />}
            />
            <Route
              path="/admin/manage-faculties"
              element={<ManageFaculties />}
            />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;