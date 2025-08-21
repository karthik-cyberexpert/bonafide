import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import AnalyticsDashboard from "./pages/dashboards/AnalyticsDashboard";
import EcommerceDashboard from "./pages/dashboards/EcommerceDashboard";
import ProjectDashboard from "./pages/dashboards/ProjectDashboard";
import SocialMediaDashboard from "./pages/dashboards/SocialMediaDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboards/analytics" replace />} />
          <Route path="/dashboards" element={<Layout />}>
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="ecommerce" element={<EcommerceDashboard />} />
            <Route path="projects" element={<ProjectDashboard />} />
            <Route path="social" element={<SocialMediaDashboard />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;