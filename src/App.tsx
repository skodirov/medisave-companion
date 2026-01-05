import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import ComparePage from "./pages/ComparePage";
import SavedPage from "./pages/SavedPage";
import MedicineDetailPage from "./pages/MedicineDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/results/:brandId" element={<ResultsPage />} />
          <Route path="/compare/:brandId/:genericId" element={<ComparePage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/medicine/:medicineId" element={<MedicineDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
