
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Redirecionamento direto para o dashboard */}
                <Route path="/login" element={<Navigate to="/dashboard" replace />} />
                
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="clientes" element={<ComingSoon title="Clientes" />} />
                  <Route path="financeiro" element={<ComingSoon title="Financeiro" />} />
                  <Route path="estoque" element={<ComingSoon title="Estoque" />} />
                  <Route path="pedidos" element={<ComingSoon title="Pedidos & Orçamentos" />} />
                  <Route path="calculadoras" element={<ComingSoon title="Calculadoras Financeiras" />} />
                  <Route path="configuracoes" element={<ComingSoon title="Configurações" />} />
                </Route>
                
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

// Temporary component for routes that are still in development
const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[70vh]">
    <h1 className="text-3xl font-bold mb-4">{title}</h1>
    <p className="text-xl text-muted-foreground">Esta funcionalidade está em desenvolvimento.</p>
  </div>
);

export default App;
