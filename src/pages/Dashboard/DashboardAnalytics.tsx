
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardFilters } from './components/DashboardFilters';
import { FinancialSummary } from './components/FinancialSummary';
import { DashboardCharts } from './components/DashboardCharts';
import { ActivityTabs } from './components/ActivityTabs';

const DashboardAnalytics = () => {
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });
  
  // Exemplos de dados de vendas mensais para o gráfico
  const vendasMensais = [
    { nome: 'Jan', valor: 12000 },
    { nome: 'Fev', valor: 14500 },
    { nome: 'Mar', valor: 18000 },
    { nome: 'Abr', valor: 16500 },
    { nome: 'Mai', valor: 21000 },
    { nome: 'Jun', valor: 19800 }
  ];
  
  // Exemplos de desempenho de categorias
  const desempenhoCategorias = [
    { nome: 'Serviços', atual: 21000, anterior: 18500 },
    { nome: 'Produtos', atual: 16800, anterior: 15200 },
    { nome: 'Consultoria', atual: 8500, anterior: 7200 },
    { nome: 'Suporte', atual: 5200, anterior: 4800 }
  ];
  
  // Dados financeiros exemplo
  const financialData = {
    receitas: 'R$ 85.750,00',
    despesas: 'R$ 42.350,00',
    lucroLiquido: 'R$ 43.400,00',
    ticketMedio: 'R$ 1.250,00',
    taxaConversao: '23,5%',
    crescimento: '+12,3%'
  };

  const handleDateChange = (range: any) => {
    setDateRange(range);
    // Aqui você implementaria a lógica para atualizar os dados com base na data
  };
  
  return (
    <div className="space-y-8">
      <DashboardHeader 
        title="Analytics" 
        description="Visão geral do desempenho do seu negócio"
      />
      
      <DashboardFilters 
        onDateChange={handleDateChange}
      />
      
      <FinancialSummary 
        data={financialData}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance de Vendas</CardTitle>
            <CardDescription>Ultimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardCharts 
              vendasMensais={vendasMensais}
              desempenhoCategorias={desempenhoCategorias}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Ações realizadas no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="orders">Pedidos</TabsTrigger>
                <TabsTrigger value="customers">Clientes</TabsTrigger>
                <TabsTrigger value="products">Produtos</TabsTrigger>
              </TabsList>
              <ActivityTabs />
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
