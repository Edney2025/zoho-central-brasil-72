
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Importação dos componentes refatorados
import { PedidosHeader } from './components/PedidosHeader';
import { PedidosFilters } from './components/PedidosFilters';
import { PedidosTable } from './components/PedidosTable';
import { PedidoDetailsDialog } from './components/PedidoDetailsDialog';

// Importação dos hooks customizados
import { usePedidosData } from './hooks/usePedidosData';
import { usePedidosFilters } from './hooks/usePedidosFilters';

const PedidosPage: React.FC = () => {
  // Usando os hooks customizados
  const {
    searchTerm,
    selectedDate,
    activeTab,
    showDateFilter,
    setSearchTerm,
    setSelectedDate,
    setActiveTab,
    setShowDateFilter,
    handleDateSelect,
    clearFilters,
    filterApplied
  } = usePedidosFilters();
  
  const {
    pedidos,
    selectedPedido,
    openDetails,
    isGeneratingPdf,
    setOpenDetails,
    viewPedidoDetails,
    handleDownloadPdf,
    handlePrintPedido,
    filterPedidos
  } = usePedidosData();
  
  // Usando memoização para evitar recálculos desnecessários da filtragem
  const filteredPedidos = useMemo(() => {
    return filterPedidos(searchTerm, activeTab, selectedDate);
  }, [filterPedidos, searchTerm, activeTab, selectedDate]);
  
  return (
    <div className="space-y-6">
      <PedidosHeader onDownloadPdf={handleDownloadPdf} />
      
      <PedidosFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        showDateFilter={showDateFilter}
        setShowDateFilter={setShowDateFilter}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        activeTab={activeTab}
        filterApplied={filterApplied}
        onClearFilters={clearFilters}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="pendente">Pendentes</TabsTrigger>
              <TabsTrigger value="aprovado">Aprovados</TabsTrigger>
              <TabsTrigger value="concluido">Concluídos</TabsTrigger>
            </TabsList>
            
            <div className="mt-4">
              <PedidosTable
                pedidos={filteredPedidos}
                onViewDetails={viewPedidoDetails}
                onDownloadPdf={handleDownloadPdf}
                isGeneratingPdf={isGeneratingPdf}
              />
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      <PedidoDetailsDialog
        open={openDetails}
        pedido={selectedPedido}
        onOpenChange={setOpenDetails}
        onDownload={handleDownloadPdf}
        onPrint={handlePrintPedido}
        isGeneratingPdf={isGeneratingPdf}
      />
    </div>
  );
};

export default PedidosPage;
