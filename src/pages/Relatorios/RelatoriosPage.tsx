
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Download, FilterX, Filter } from 'lucide-react';
import { VendasReportSection } from './components/VendasReportSection';
import { ClientesReportSection } from './components/ClientesReportSection';
import { ProdutosReportSection } from './components/ProdutosReportSection';
import { FinanceiroReportSection } from './components/FinanceiroReportSection';
import { ReportFilters } from './components/ReportFilters';

const RelatoriosPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Relatórios</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={toggleFilters}>
            {isFilterOpen ? 
              <><FilterX className="mr-2 h-4 w-4" /> Fechar Filtros</> : 
              <><Filter className="mr-2 h-4 w-4" /> Filtros</>
            }
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> Período
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </div>
      </div>

      {isFilterOpen && <ReportFilters />}

      <Tabs defaultValue="vendas" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vendas">Vendas</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="produtos">Produtos</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vendas">
          <VendasReportSection />
        </TabsContent>
        
        <TabsContent value="clientes">
          <ClientesReportSection />
        </TabsContent>
        
        <TabsContent value="produtos">
          <ProdutosReportSection />
        </TabsContent>
        
        <TabsContent value="financeiro">
          <FinanceiroReportSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RelatoriosPage;
