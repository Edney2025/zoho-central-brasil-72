
import { useState, useMemo } from 'react';
import { Pedido } from './usePedidosData';

export function usePedidosFilters(pedidos: Pedido[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('todos');
  const [showDateFilter, setShowDateFilter] = useState(false);
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setShowDateFilter(false);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDate(undefined);
    setActiveTab('todos');
  };
  
  const filteredPedidos = useMemo(() => {
    return pedidos.filter(pedido => {
      // Apply status filter
      if (activeTab !== 'todos' && pedido.status !== activeTab) {
        return false;
      }
      
      // Apply search filter
      if (
        !pedido.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !pedido.valor.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !pedido.data.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      
      // Apply date filter
      if (selectedDate) {
        const pedidoDate = new Date(pedido.data.split('/').reverse().join('-'));
        const filterDate = new Date(selectedDate);
        
        if (
          pedidoDate.getDate() !== filterDate.getDate() ||
          pedidoDate.getMonth() !== filterDate.getMonth() ||
          pedidoDate.getFullYear() !== filterDate.getFullYear()
        ) {
          return false;
        }
      }
      
      return true;
    });
  }, [pedidos, searchTerm, activeTab, selectedDate]);

  const filterApplied = useMemo(() => {
    return searchTerm !== '' || selectedDate !== undefined || activeTab !== 'todos';
  }, [searchTerm, selectedDate, activeTab]);
  
  return {
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
  };
}
