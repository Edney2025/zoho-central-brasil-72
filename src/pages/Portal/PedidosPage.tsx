
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import our new components
import { PedidosHeader } from './components/pedidos/PedidosHeader';
import { PedidosFilters } from './components/pedidos/PedidosFilters';
import { PedidosTable } from './components/pedidos/PedidosTable';
import { PedidoDetailsDialog } from './components/pedidos/PedidoDetailsDialog';

// Import our custom hooks
import { usePedidosData } from './hooks/usePedidosData';
import { usePedidosFilters } from './hooks/usePedidosFilters';

const PedidosPage: React.FC = () => {
  // Use our custom hooks
  const {
    pedidos,
    selectedPedido,
    openDetails,
    isGeneratingPdf,
    setOpenDetails,
    viewPedidoDetails,
    handleDownloadPdf,
    handlePrintPedido
  } = usePedidosData();

  const {
    searchTerm,
    selectedDate,
    activeTab,
    showDateFilter,
    filteredPedidos,
    filterApplied,
    setSearchTerm,
    setSelectedDate,
    setActiveTab,
    setShowDateFilter,
    handleDateSelect,
    clearFilters
  } = usePedidosFilters(pedidos);
  
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
                filteredPedidos={filteredPedidos}
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
