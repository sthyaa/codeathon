import { Toaster as HotToaster } from "react-hot-toast"; 
import { Toaster as CustomToaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";
import OperatorDashboard from "./pages/OperatorDashboard.jsx";
import Training from "./pages/Training.jsx";
import OperatorLayout from "./components/OperatorLayout";
import AdminDashboard from "./components/admin/adminDashboard";
import AlertsPage from "./pages/alert.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HotToaster position="bottom-center" reverseOrder={false} />
      <CustomToaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route
            path="/operator"
            element={
              <OperatorLayout>
                <OperatorDashboard />
              </OperatorLayout>
            }
          />

          <Route
            path="/training"
            element={
              <OperatorLayout>
                <Training />
              </OperatorLayout>
            }
          />

  
          <Route
            path="/operator/three-alerts"
            element={
              <OperatorLayout>
                <AlertsPage />
              </OperatorLayout>
            }
          />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
