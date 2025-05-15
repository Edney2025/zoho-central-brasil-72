
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface PedidosFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showDateFilter: boolean;
  setShowDateFilter: (show: boolean) => void;
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  activeTab: string;
  filterApplied: boolean;
  onClearFilters: () => void;
}

export const PedidosFilters: React.FC<PedidosFiltersProps> = ({ 
  searchTerm,
  onSearchChange,
  showDateFilter,
  setShowDateFilter,
  selectedDate,
  onDateSelect,
  activeTab,
  filterApplied,
  onClearFilters
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar pedidos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <Popover open={showDateFilter} onOpenChange={setShowDateFilter}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              {selectedDate ? new Date(selectedDate).toLocaleDateString('pt-BR') : "Filtrar por data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onDateSelect}
              initialFocus
              className="pointer-events-auto"
            />
            <div className="p-3 border-t">
              <Button variant="ghost" size="sm" onClick={() => onDateSelect(undefined)} className="w-full">
                Limpar data
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        {filterApplied && (
          <Button variant="ghost" size="icon" onClick={onClearFilters} className="sm:hidden">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {filterApplied && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtros ativos:</span>
          {searchTerm && (
            <Badge variant="outline" className="flex items-center gap-1">
              Busca: {searchTerm}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => onSearchChange('')} />
            </Badge>
          )}
          {selectedDate && (
            <Badge variant="outline" className="flex items-center gap-1">
              Data: {new Date(selectedDate).toLocaleDateString('pt-BR')}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => onDateSelect(undefined)} />
            </Badge>
          )}
          {activeTab !== 'todos' && (
            <Badge variant="outline" className="flex items-center gap-1">
              Status: {activeTab}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={onClearFilters} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="ml-auto hidden sm:flex">
            Limpar filtros
          </Button>
        </div>
      )}
    </>
  );
};
