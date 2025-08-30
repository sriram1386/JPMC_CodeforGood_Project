import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import VillageOnboarding from "./pages/VillageOnboarding";
import VillageList from "./pages/VillageList";
import FarmerRegistry from "./pages/FarmerRegistry";
import CommunityStructures from "./pages/CommunityStructures";
import VLEOnboarding from "./pages/VLEOnboarding";
import VendorOnboarding from "./pages/VendorOnboarding";
import MachineRegistration from "./pages/MachineRegistration";
import TrainingCenter from "./pages/TrainingCenter";
import ConductSurvey from "./pages/ConductSurvey";
import TopVillages from "./pages/TopVillages";
import NotFound from "./pages/NotFound";
import SurveyResults from "./pages/SurveyResults";
import LogIncome from "./pages/LogIncome";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// App Layout Component
const AppLayout = () => {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center border-b border-border bg-background px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1" />
            {user && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Welcome, {user.name}</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs capitalize">
                  {user.role}
                </span>
              </div>
            )}
          </header>
          <main className="flex-1 p-6 bg-muted/20">
            <Routes>
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/village-onboarding" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <VillageOnboarding />
                </ProtectedRoute>
              } />
              <Route path="/village-list" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <VillageList />
                </ProtectedRoute>
              } />
              <Route path="/farmer-registry" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <FarmerRegistry />
                </ProtectedRoute>
              } />
              <Route path="/community-structures" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <CommunityStructures />
                </ProtectedRoute>
              } />
              <Route path="/vle-onboarding" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <VLEOnboarding />
                </ProtectedRoute>
              } />
              <Route path="/vendor-onboarding" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <VendorOnboarding />
                </ProtectedRoute>
              } />
              <Route path="/machine-registration" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <MachineRegistration />
                </ProtectedRoute>
              } />
              <Route path="/training-center" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <TrainingCenter />
                </ProtectedRoute>
              } />
              <Route path="/conduct-survey" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ConductSurvey />
                </ProtectedRoute>
              } />
              <Route path="/top-villages" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <TopVillages />
                </ProtectedRoute>
              } />
              <Route path="/survey-results" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <SurveyResults />
                </ProtectedRoute>
              } />
              <Route path="/log-income" element={
                <ProtectedRoute allowedRoles={['vle']}>
                  <LogIncome />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected app routes */}
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
