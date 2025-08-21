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

import HodLayout from "./components/layouts/HodLayout";
import HodDashboard from "./pages/hod/Dashboard";
import HodProfile from "./pages/hod/Profile";

import AdminLayout from "./components/layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProfile from "./pages/admin/Profile";

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
            <Route path="/tutor/profile" element={<TutorProfile />} />
          </Route>

          <Route element={<HodLayout />}>
            <Route path="/hod/dashboard" element={<HodDashboard />} />
            <Route path="/hod/profile" element={<HodProfile />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
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