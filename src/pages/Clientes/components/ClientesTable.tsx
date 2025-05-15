
import React from 'react';
import { useClientesData } from '../hooks/useClientesData';
import ClientesSearchBar from './clientes-table/ClientesSearchBar';
import ClientesFilters from './clientes-table/ClientesFilters';
import ClientesTableContent from './clientes-table/ClientesTableContent';
import DeleteClienteDialog from './clientes-table/DeleteClienteDialog';

interface ClientesTableProps {
  onAddClick: () => void;
  onEditClick: (id: string) => void;
  onViewClick: (id: string) => void;
}

const ClientesTable: React.FC<ClientesTableProps> = ({ onAddClick, onEditClick, onViewClick }) => {
  const {
    clientes,
    allTags,
    deleteClienteId,
    setDeleteClienteId,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    filters,
    updateFilters,
    handleDeleteCliente,
    handleAddReminder,
    handleExportData
  } = useClientesData();
  
  return (
    <div className="space-y-4">
      <ClientesSearchBar 
        searchTerm={filters.searchTerm}
        onSearchChange={(value) => updateFilters({ searchTerm: value })}
        onExportData={handleExportData}
      />

      <ClientesFilters 
        filters={filters}
        onFilterChange={updateFilters}
        allTags={allTags}
      />

      <ClientesTableContent 
        clientes={clientes}
        onViewClick={onViewClick}
        onEditClick={onEditClick}
        onAddReminder={handleAddReminder}
        onDeleteClick={(id) => {
          setDeleteClienteId(id);
          setIsDeleteDialogOpen(true);
        }}
      />

      <DeleteClienteDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDeleteConfirm={handleDeleteCliente}
      />
    </div>
  );
};

export default ClientesTable;
