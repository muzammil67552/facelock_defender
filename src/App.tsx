import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import AccessGranted from "./pages/AccessGranted";
import IntruderDetected from "./pages/IntruderDetected";
import NotFound from "./pages/NotFound";
import Gallery from "./components/Gallery";
import Settings from "./components/Settings";
import Nav from "./components/Nav";
import { getEmail, getTheme, setTheme as saveTheme } from "./utils/storage";

const queryClient = new QueryClient();

const App = () => {
  const [email, setEmail] = useState(getEmail());
  const [theme, setThemeState] = useState(getTheme());

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    saveTheme(newTheme);
  };

  const handleEmailSet = (newEmail) => {
    setEmail(newEmail);
  };

  // Show navigation only after email is set
  const showNav = !!email;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {showNav && <Nav theme={theme} setTheme={setTheme} />}
          <Routes>
            <Route path="/" element={<Index emailSet={email} onEmailSet={handleEmailSet} />} />
            <Route path="/access-granted" element={email ? <AccessGranted /> : <Navigate to="/" />} />
            <Route path="/intruder-detected" element={email ? <IntruderDetected /> : <Navigate to="/" />} />
            <Route path="/gallery" element={email ? <Gallery /> : <Navigate to="/" />} />
            <Route path="/settings" element={email ? <Settings /> : <Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
