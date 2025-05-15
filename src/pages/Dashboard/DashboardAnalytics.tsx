
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { DashboardCard } from './components/DashboardCard';
import { DashboardHeader } from './components/DashboardHeader';
import { FinancialSummary } from './components/FinancialSummary';
import { OrcamentosSection } from './components/OrcamentosSection';
import { DashboardCharts } from './components/DashboardCharts';
import { ActivityTabs } from './components/ActivityTabs';
import { RecentAdsSection } from './components/RecentAdsSection';
import { DashboardFilters, FilterOptions } from './components/DashboardFilters';
import { vendasMensais, desempenhoCategorias } from './data/dashboard-data';
import { orcamentosMock, resumoFinanceiroMock } from './data/orcamentos-mock';
import { recentAdsMock } from './data/recent-ads-mock';
import { toast } from '@/components/ui/use-toast';

const DashboardAnalytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [filteredOrcamentos, setFilteredOrcamentos] = useState(orcamentosMock);
  const [filteredAds, setFilteredAds] = useState(recentAdsMock);
  const [filteredVendasMensais, setFilteredVendasMensais] = useState(vendasMensais);
  const [filteredDesempenhoCategorias, setFilteredDesempenhoCategorias] = useState(desempenhoCategorias);
  const [dashboardStats, setDashboardStats] = useState({
    totalClientes: 124,
    clientesNovos: 12,
    receitaMensal: resumoFinanceiroMock.receitaMensal,
    crescimentoReceita: '+20,1%',
    produtosEstoque: 1234,
    produtosBaixoEstoque: 45
  });
  
  const handleManageAds = () => {
    navigate('/ecommerce/meus-anuncios');
  };
  
  const handleApplyFilters = (filters: FilterOptions) => {
    console.log("Filtros aplicados:", filters);
    
    // Aplicar filtros aos orçamentos
    let filtered = [...orcamentosMock];
    
    // Filtrar por status de orçamento
    if (filters.budgetStatus.length > 0) {
      filtered = filtered.filter(orc => 
        filters.budgetStatus.includes(orc.status)
      );
    }
    
    // Filtrar por cliente
    if (filters.client) {
      filtered = filtered.filter(orc => 
        orc.cliente.toLowerCase().includes(filters.client.toLowerCase())
      );
    }
    
    // Filtrar por data
    if (filters.dateRange.from || filters.dateRange.to) {
      filtered = filtered.filter(orc => {
        const orcamentoDate = new Date(orc.data.split('/').reverse().join('-'));
        
        if (filters.dateRange.from && filters.dateRange.to) {
          return orcamentoDate >= filters.dateRange.from && orcamentoDate <= filters.dateRange.to;
        }
        
        if (filters.dateRange.from) {
          return orcamentoDate >= filters.dateRange.from;
        }
        
        if (filters.dateRange.to) {
          return orcamentoDate <= filters.dateRange.to;
        }
        
        return true;
      });
    }
    
    setFilteredOrcamentos(filtered);
    
    // Aplicar filtros aos anúncios recentes
    let filteredRecentAds = [...recentAdsMock];
    
    // Filtrar por tipo de produto
    if (filters.productType.length > 0) {
      filteredRecentAds = filteredRecentAds.filter(ad => {
        // Mapeamento simplificado de categorias para tipos de produto
        const adType = 
          ad.category.includes('Novo') ? 'novo' :
          ad.category.includes('Usado') ? 'usado' : 'servico';
        
        return filters.productType.includes(adType);
      });
    }
    
    // Filtrar por data
    if (filters.dateRange.from || filters.dateRange.to) {
      filteredRecentAds = filteredRecentAds.filter(ad => {
        const adDate = new Date(ad.createdAt.split('/').reverse().join('-'));
        
        if (filters.dateRange.from && filters.dateRange.to) {
          return adDate >= filters.dateRange.from && adDate <= filters.dateRange.to;
        }
        
        if (filters.dateRange.from) {
          return adDate >= filters.dateRange.from;
        }
        
        if (filters.dateRange.to) {
          return adDate <= filters.dateRange.to;
        }
        
        return true;
      });
    }
    
    setFilteredAds(filteredRecentAds);
    
    // Aplicar filtros aos gráficos (simplificado - normalmente seria uma chamada API)
    // Este é um exemplo básico que filtra por mês se um filtro de data estiver presente
    if (filters.dateRange.from || filters.dateRange.to) {
      const fromMonth = filters.dateRange.from ? filters.dateRange.from.getMonth() : 0;
      const toMonth = filters.dateRange.to ? filters.dateRange.to.getMonth() : 11;
      
      const filteredSales = vendasMensais.filter((_, index) => 
        index >= fromMonth && index <= toMonth
      );
      
      setFilteredVendasMensais(filteredSales);
      
      // Simulando um filtro no desempenho por categorias
      // Em um caso real, isso seria uma consulta mais complexa ao backend
      setFilteredDesempenhoCategorias(
        desempenhoCategorias.map(item => ({
          ...item,
          valor: Math.floor(item.valor * (filteredSales.length / vendasMensais.length))
        }))
      );
    } else {
      setFilteredVendasMensais(vendasMensais);
      setFilteredDesempenhoCategorias(desempenhoCategorias);
    }
    
    // Simular atualizações nos stats do dashboard com base nos filtros
    // Em uma aplicação real, isso seria calculado a partir dos dados filtrados
    if (Object.keys(filters).some(key => 
      filters[key as keyof FilterOptions] && 
      (Array.isArray(filters[key as keyof FilterOptions]) ? 
        (filters[key as keyof FilterOptions] as any[]).length > 0 : 
        filters[key as keyof FilterOptions])
    )) {
      // Se houver filtros ativos, atualizamos os stats
      setDashboardStats({
        totalClientes: filtered.length > 0 ? Math.floor(124 * (filtered.length / orcamentosMock.length)) : 124,
        clientesNovos: filtered.length > 0 ? Math.floor(12 * (filtered.length / orcamentosMock.length)) : 12,
        receitaMensal: filtered.length > 0 ? 
          `R$ ${(parseInt(resumoFinanceiroMock.receitaMensal.replace(/\D/g, '')) * 
          (filtered.length / orcamentosMock.length)).toFixed(2).replace('.', ',')}` : 
          resumoFinanceiroMock.receitaMensal,
        crescimentoReceita: filtered.length > 0 ? 
          `+${(20.1 * (filtered.length / orcamentosMock.length)).toFixed(1)}%` : 
          '+20,1%',
        produtosEstoque: 1234,
        produtosBaixoEstoque: 45
      });
    } else {
      // Revertemos aos valores originais se não houver filtros
      setDashboardStats({
        totalClientes: 124,
        clientesNovos: 12,
        receitaMensal: resumoFinanceiroMock.receitaMensal,
        crescimentoReceita: '+20,1%',
        produtosEstoque: 1234,
        produtosBaixoEstoque: 45
      });
    }
    
    // Notificar o usuário que os filtros foram aplicados
    toast({
      title: "Filtros aplicados",
      description: `${filtered.length} orçamentos e ${filteredRecentAds.length} anúncios encontrados.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      {/* Filtros Avançados */}
      <DashboardFilters onApplyFilters={handleApplyFilters} />
      
      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard
          title="Total de Clientes"
          value={dashboardStats.totalClientes.toString()}
          icon={Users}
          description={`${dashboardStats.clientesNovos} novos este mês`}
        />
        <DashboardCard
          title="Receita Mensal"
          value={dashboardStats.receitaMensal}
          icon={DollarSign}
          description={`${dashboardStats.crescimentoReceita} em relação ao mês anterior`}
        />
        <DashboardCard
          title="Produtos em Estoque"
          value={dashboardStats.produtosEstoque.toString()}
          icon={Package}
          description={`${dashboardStats.produtosBaixoEstoque} produtos com estoque baixo`}
        />
      </div>
      
      <FinancialSummary resumoFinanceiro={resumoFinanceiroMock} />
      
      <OrcamentosSection orcamentos={filteredOrcamentos} />

      {/* Recent Ads Section */}
      <RecentAdsSection recentAds={filteredAds} />

      {/* Gerenciar Meus Anúncios Button */}
      <div className="flex justify-end">
        <Button onClick={handleManageAds} className="bg-primary hover:bg-primary/90">
          Gerenciar Meus Anúncios
        </Button>
      </div>
      
      <DashboardCharts 
        vendasMensais={filteredVendasMensais} 
        desempenhoCategorias={filteredDesempenhoCategorias} 
      />

      <ActivityTabs />
    </div>
  );
};

export default DashboardAnalytics;
