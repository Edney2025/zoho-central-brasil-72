
import { useState, useCallback, useMemo } from 'react';

interface FiltersState {
  searchTerm: string;
  selectedDate: Date | undefined;
  activeTab: string;
}

export interface PedidosFiltersReturn {
  searchTerm: string;
  selectedDate: Date | undefined;
  activeTab: string;
  showDateFilter: boolean;
  setSearchTerm: (term: string) => void;
  setSelectedDate: (date: Date | undefined) => void;
  setActiveTab: (tab: string) => void;
  setShowDateFilter: (show: boolean) => void;
  handleDateSelect: (date: Date | undefined) => void;
  clearFilters: () => void;
  filterApplied: boolean;
}

export function usePedidosFilters(): PedidosFiltersReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('todos');
  const [showDateFilter, setShowDateFilter] = useState(false);
  
  const handleDateSelect = useCallback((date: Date | undefined) => {
    setSelectedDate(date);
    setShowDateFilter(false);
  }, []);
  
  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedDate(undefined);
    setActiveTab('todos');
  }, []);
  
  const filterApplied = useMemo(() => {
    return searchTerm !== '' || selectedDate !== undefined || activeTab !== 'todos';
  }, [searchTerm, selectedDate, activeTab]);

  return {
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
  };
}
