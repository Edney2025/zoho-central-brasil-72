
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardAnalytics from "./pages/Dashboard/DashboardAnalytics";
import ClientesPage from "./pages/Clientes/ClientesPage";
import FinanceiroPage from "./pages/Financeiro/FinanceiroPage";
import EstoquePage from "./pages/Estoque/EstoquePage";
import PedidosPage from "./pages/Pedidos/PedidosPage";
import CalculadorasPage from "./pages/Calculadoras/CalculadorasPage";
import ProdutosNovosCalculadora from "./features/calculadoras/pages/ProdutosNovosCalculadora";
import ConfiguracoesPage from "./pages/Configuracoes/ConfiguracoesPage";
import ContratosPage from "./pages/Contratos/ContratosPage";
import RelatoriosPage from "./pages/Relatorios/RelatoriosPage";
import PrevisoesPage from "./pages/Previsoes/PrevisoesPage";
import AnaliseCredito from "./pages/AnaliseCredito/AnaliseCredito";
import AgendamentosPage from "./pages/Agendamentos/AgendamentosPage";
import PortalConfigPage from "./pages/PortalConfig/PortalConfigPage";
import ComunicacoesPage from "./pages/Comunicacoes/ComunicacoesPage";
import CnpjPage from "./pages/Cnpj/CnpjPage";
import EmprestimosPage from "./pages/Emprestimos/EmprestimosPage";
import FinanciamentosPage from "./pages/Financiamentos/FinanciamentosPage";
import GarantiasPage from "./pages/Garantias/GarantiasPage";
import OutrosProdutosPage from "./pages/OutrosProdutos/OutrosProdutosPage";

// Portal do Cliente pages
import AuthPage from "./pages/Portal/AuthPage";
import PortalLayout from "./pages/Portal/PortalLayout";
import DashboardPage from "./pages/Portal/DashboardPage";
import PedidosPortalPage from "./pages/Portal/PedidosPage";
import OrcamentosPage from "./pages/Portal/OrcamentosPage";
import SuportePage from "./pages/Portal/SuportePage";
import FAQPage from "./pages/Portal/FAQPage";
import ProfilePage from "./pages/Portal/ProfilePage";

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
                {/* Admin/Staff Routes */}
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="dashboard/analytics" element={<DashboardAnalytics />} />
                  <Route path="clientes" element={<ClientesPage />} />
                  <Route path="financeiro" element={<FinanceiroPage />} />
                  <Route path="estoque" element={<EstoquePage />} />
                  <Route path="pedidos" element={<PedidosPage />} />
                  <Route path="calculadoras" element={<CalculadorasPage />} />
                  <Route path="calculadoras/produtos-novos" element={<ProdutosNovosCalculadora />} />
                  <Route path="configuracoes/*" element={<ConfiguracoesPage />} />
                  <Route path="contratos" element={<ContratosPage />} />
                  <Route path="relatorios" element={<RelatoriosPage />} />
                  <Route path="previsoes" element={<PrevisoesPage />} />
                  <Route path="analise-credito" element={<AnaliseCredito />} />
                  <Route path="agendamentos" element={<AgendamentosPage />} />
                  <Route path="portal-config" element={<PortalConfigPage />} />
                  <Route path="comunicacoes" element={<ComunicacoesPage />} />
                  <Route path="cnpj" element={<CnpjPage />} />
                  <Route path="emprestimos" element={<EmprestimosPage />} />
                  <Route path="financiamentos" element={<FinanciamentosPage />} />
                  <Route path="garantias" element={<GarantiasPage />} />
                  <Route path="outros-produtos" element={<OutrosProdutosPage />} />
                </Route>
                
                {/* Customer Portal Routes */}
                <Route path="/portal/login" element={<AuthPage />} />
                <Route path="/portal" element={<PortalLayout />}>
                  <Route index element={<Navigate to="/portal/dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="pedidos" element={<PedidosPortalPage />} />
                  <Route path="orcamentos" element={<OrcamentosPage />} />
                  <Route path="suporte" element={<SuportePage />} />
                  <Route path="faq" element={<FAQPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>
                
                {/* Redirect all unknown routes */}
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
