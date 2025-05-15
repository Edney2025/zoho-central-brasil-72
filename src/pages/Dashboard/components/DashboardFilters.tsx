
import React, { useState } from 'react';
import { Calendar, Filter, Tag, BadgeDollarSign, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';

export interface FilterOptions {
  dateRange: {
    from?: Date;
    to?: Date;
  };
  productType: string[];
  budgetStatus: string[];
  client: string;
}

interface DashboardFiltersProps {
  onApplyFilters: (filters: FilterOptions) => void;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [productType, setProductType] = useState<string[]>([]);
  const [budgetStatus, setBudgetStatus] = useState<string[]>([]);
  const [client, setClient] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const productTypeOptions = [
    { id: 'novo', label: 'Produto Novo' },
    { id: 'usado', label: 'Produto Usado' },
    { id: 'servico', label: 'Serviço' }
  ];
  
  const budgetStatusOptions = [
    { id: 'aprovado', label: 'Aprovado' },
    { id: 'pendente', label: 'Pendente' },
    { id: 'rejeitado', label: 'Rejeitado' }
  ];

  const handleApplyFilters = () => {
    const filters: FilterOptions = {
      dateRange,
      productType,
      budgetStatus,
      client
    };
    
    // Atualiza os badges de filtros ativos
    const newActiveFilters: string[] = [];
    
    if (dateRange.from || dateRange.to) {
      let dateFilter = 'Data: ';
      if (dateRange.from && dateRange.to) {
        dateFilter += `${format(dateRange.from, 'dd/MM/yyyy')} a ${format(dateRange.to, 'dd/MM/yyyy')}`;
      } else if (dateRange.from) {
        dateFilter += `após ${format(dateRange.from, 'dd/MM/yyyy')}`;
      } else if (dateRange.to) {
        dateFilter += `até ${format(dateRange.to, 'dd/MM/yyyy')}`;
      }
      newActiveFilters.push(dateFilter);
    }
    
    if (productType.length > 0) {
      const selectedTypes = productTypeOptions
        .filter(opt => productType.includes(opt.id))
        .map(opt => opt.label)
        .join(', ');
      newActiveFilters.push(`Tipo: ${selectedTypes}`);
    }
    
    if (budgetStatus.length > 0) {
      const selectedStatuses = budgetStatusOptions
        .filter(opt => budgetStatus.includes(opt.id))
        .map(opt => opt.label)
        .join(', ');
      newActiveFilters.push(`Status: ${selectedStatuses}`);
    }
    
    if (client) {
      newActiveFilters.push(`Cliente: ${client}`);
    }
    
    setActiveFilters(newActiveFilters);
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setDateRange({});
    setProductType([]);
    setBudgetStatus([]);
    setClient('');
    setActiveFilters([]);
    
    onApplyFilters({
      dateRange: {},
      productType: [],
      budgetStatus: [],
      client: ''
    });
  };
  
  const handleRemoveFilter = (filterToRemove: string) => {
    const filterType = filterToRemove.split(':')[0].trim();
    
    if (filterType === 'Data') {
      setDateRange({});
    } else if (filterType === 'Tipo') {
      setProductType([]);
    } else if (filterType === 'Status') {
      setBudgetStatus([]);
    } else if (filterType === 'Cliente') {
      setClient('');
    }
    
    const updatedFilters = activeFilters.filter(
      filter => !filter.startsWith(filterType)
    );
    
    setActiveFilters(updatedFilters);
    
    onApplyFilters({
      dateRange: filterType === 'Data' ? {} : dateRange,
      productType: filterType === 'Tipo' ? [] : productType,
      budgetStatus: filterType === 'Status' ? [] : budgetStatus,
      client: filterType === 'Cliente' ? '' : client
    });
  };
  
  const toggleProductType = (type: string) => {
    setProductType(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  const toggleBudgetStatus = (status: string) => {
    setBudgetStatus(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros Avançados
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-4" align="start">
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Filtrar por:</h3>
              
              {/* Filtro de Data */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <h4 className="font-medium text-sm">Período</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">De</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full justify-start text-left font-normal">
                          {dateRange.from ? (
                            format(dateRange.from, 'dd/MM/yyyy')
                          ) : (
                            <span className="text-muted-foreground">Selecione</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Até</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full justify-start text-left font-normal">
                          {dateRange.to ? (
                            format(dateRange.to, 'dd/MM/yyyy')
                          ) : (
                            <span className="text-muted-foreground">Selecione</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              
              {/* Filtro de Tipo de Produto */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <h4 className="font-medium text-sm">Tipo de Produto</h4>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {productTypeOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`type-${option.id}`} 
                        checked={productType.includes(option.id)}
                        onCheckedChange={() => toggleProductType(option.id)}
                      />
                      <label 
                        htmlFor={`type-${option.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Filtro de Status */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BadgeDollarSign className="h-4 w-4" />
                  <h4 className="font-medium text-sm">Status do Orçamento</h4>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {budgetStatusOptions.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`status-${option.id}`} 
                        checked={budgetStatus.includes(option.id)}
                        onCheckedChange={() => toggleBudgetStatus(option.id)}
                      />
                      <label 
                        htmlFor={`status-${option.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Filtro de Cliente */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <h4 className="font-medium text-sm">Cliente</h4>
                </div>
                <Input
                  placeholder="Nome do cliente"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={handleClearFilters}>
                  Limpar Filtros
                </Button>
                <Button size="sm" onClick={handleApplyFilters}>
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Mostrar filtros ativos como badges */}
        {activeFilters.map((filter, index) => (
          <Badge key={index} variant="outline" className="flex items-center gap-1 bg-primary/10">
            {filter}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
              onClick={() => handleRemoveFilter(filter)}
            >
              <span className="sr-only">Remover filtro</span>
              &times;
            </Button>
          </Badge>
        ))}
        
        {activeFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-8 px-2 text-xs">
            Limpar todos
          </Button>
        )}
      </div>
    </div>
  );
};
