
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { type ClientesFiltersOptions } from '../../hooks/useClientesData';

interface ClientesFiltersProps {
  filters: ClientesFiltersOptions;
  onFilterChange: (newFilters: Partial<ClientesFiltersOptions>) => void;
  allTags: string[];
}

const ClientesFilters: React.FC<ClientesFiltersProps> = ({
  filters,
  onFilterChange,
  allTags
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <Select 
        value={filters.statusFilter} 
        onValueChange={(value) => onFilterChange({ statusFilter: value })}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos os Status</SelectItem>
          <SelectItem value="ativo">Ativo</SelectItem>
          <SelectItem value="inativo">Inativo</SelectItem>
          <SelectItem value="em análise">Em Análise</SelectItem>
        </SelectContent>
      </Select>
      
      <Select 
        value={filters.tipoFilter} 
        onValueChange={(value) => onFilterChange({ tipoFilter: value })}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Tipo de Pessoa" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos os Tipos</SelectItem>
          <SelectItem value="pessoa física">Pessoa Física</SelectItem>
          <SelectItem value="pessoa jurídica">Pessoa Jurídica</SelectItem>
        </SelectContent>
      </Select>
      
      <Select 
        value={filters.tagFilter} 
        onValueChange={(value) => onFilterChange({ tagFilter: value })}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Etiquetas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todas as Etiquetas</SelectItem>
          {allTags.map(tag => (
            <SelectItem key={tag} value={tag}>{tag}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select 
        value={filters.classificacaoFilter} 
        onValueChange={(value) => onFilterChange({ classificacaoFilter: value })}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Classificação" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todas</SelectItem>
          <SelectItem value="regular">Regular</SelectItem>
          <SelectItem value="premium">Premium</SelectItem>
          <SelectItem value="platinum">Platinum</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ClientesFilters;
