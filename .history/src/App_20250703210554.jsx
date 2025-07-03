import { Toaster } from "@/components/ui/toaster";
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
import PopulateMachinesButton from "./components/PopulateMachinesButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* TEMP: Button to populate machines in Firebase, remove after use */}
      <PopulateMachinesButton />
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
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
