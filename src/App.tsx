
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ClientesPage from "./pages/Clientes/ClientesPage";
import FinanceiroPage from "./pages/Financeiro/FinanceiroPage";
import EstoquePage from "./pages/Estoque/EstoquePage";
import PedidosPage from "./pages/Pedidos/PedidosPage";
import CalculadorasPage from "./pages/Calculadoras/CalculadorasPage";
import ConfiguracoesPage from "./pages/Configuracoes/ConfiguracoesPage";
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
                  <Route path="clientes" element={<ClientesPage />} />
                  <Route path="financeiro" element={<FinanceiroPage />} />
                  <Route path="estoque" element={<EstoquePage />} />
                  <Route path="pedidos" element={<PedidosPage />} />
                  <Route path="calculadoras" element={<CalculadorasPage />} />
                  <Route path="configuracoes" element={<ConfiguracoesPage />} />
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

export default App;
