
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import Docs from "./pages/Docs";
import AboutUs from "./pages/AboutUs";
import ForgotPassword from "./pages/ForgotPassword";
import CoreUserRegistration from "./pages/CoreUserRegistration";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserManagement from "./pages/AdminUserManagement";
import AdminBilling from "./pages/AdminBilling";
import AdminAuditLogs from "./pages/AdminAuditLogs";
import CoreDashboard from "./pages/CoreDashboard";
import CoreProfile from "./pages/CoreProfile";
import CoreClients from "./pages/CoreClients";
import CoreReports from "./pages/CoreReports";
import CoreInsights from "./pages/CoreInsights";
import ClientDashboard from "./pages/ClientDashboard";
import ClientProfile from "./pages/ClientProfile";
import ClientSharing from "./pages/ClientSharing";
import ClientReport from "./pages/ClientReport";
import GuestLogin from "./pages/GuestLogin";
import GuestOTPVerification from "./pages/GuestOTPVerification";
import GuestDashboard from "./pages/GuestDashboard";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Index />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<CoreUserRegistration />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-users" element={<AdminUserManagement />} />
          <Route path="/admin-billing" element={<AdminBilling />} />
          <Route path="/admin-logs" element={<AdminAuditLogs />} />
          <Route path="/core-dashboard" element={<CoreDashboard />} />
          <Route path="/core-profile" element={<CoreProfile />} />
          <Route path="/core-clients" element={<CoreClients />} />
          <Route path="/core-reports" element={<CoreReports />} />
          <Route path="/core-insights" element={<CoreInsights />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/client-profile" element={<ClientProfile />} />
          <Route path="/client-sharing" element={<ClientSharing />} />
          <Route path="/client-report/:id" element={<ClientReport />} />
          <Route path="/guest-login" element={<GuestLogin />} />
          <Route path="/guest-otp" element={<GuestOTPVerification />} />
          <Route path="/guest-dashboard" element={<GuestDashboard />} />
          <Route path="/subscription" element={<Subscription />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
