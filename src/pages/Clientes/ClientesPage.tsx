
import React, { useState } from 'react';
import ClientesTable from './components/ClientesTable';
import ClienteForm from './components/ClienteForm';
import { Card, CardContent } from '@/components/ui/card';

const ClientesPage = () => {
  const [isAddingCliente, setIsAddingCliente] = useState(false);

  // Function to toggle between table view and form view
  const toggleAddCliente = () => {
    setIsAddingCliente(!isAddingCliente);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Clientes</h1>
      </div>
      
      {isAddingCliente ? (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Cadastrar Novo Cliente</h2>
            <button 
              onClick={toggleAddCliente}
              className="text-sm text-primary hover:underline"
            >
              Voltar para lista
            </button>
          </div>
          <ClienteForm />
        </>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <ClientesTable onAddClick={toggleAddCliente} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientesPage;
