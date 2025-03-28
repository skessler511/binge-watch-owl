
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard"; 
import Connect from "./pages/Connect";
import Show from "./pages/Show";
import CalendarPage from "./pages/CalendarPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

// Initialize Capacitor if available
const initCapacitor = () => {
  // This is a placeholder for any future Capacitor plugin initialization
  console.log("Capacitor initialized");
  
  // Add any additional Capacitor plugin initialization here
  try {
    // Check if running in a Capacitor context
    if (typeof window !== 'undefined' && window.hasOwnProperty('Capacitor')) {
      console.log("Running in Capacitor environment");
      
      // Set the status bar color for iOS (if StatusBar plugin is added later)
      document.documentElement.classList.add('capacitor-environment');
    }
  } catch (error) {
    console.error("Capacitor initialization error:", error);
  }
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize Capacitor when the app loads
    initCapacitor();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="/show/:id" element={<Show />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
