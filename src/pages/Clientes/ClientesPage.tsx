
import React, { useState } from 'react';
import ClientesTable from './components/ClientesTable';
import ClienteForm from './components/ClienteForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Users, Plus } from 'lucide-react';

const ClientesPage = () => {
  const [isAddingCliente, setIsAddingCliente] = useState(false);
  const [activeTab, setActiveTab] = useState("listagem");
  const [selectedClienteId, setSelectedClienteId] = useState<string | null>(null);

  // Function to toggle between table view and form view
  const toggleAddCliente = () => {
    setIsAddingCliente(!isAddingCliente);
    if (!isAddingCliente) {
      setSelectedClienteId(null);
    }
  };

  // Function to edit a client
  const handleEditCliente = (id: string) => {
    setSelectedClienteId(id);
    setIsAddingCliente(true);
  };

  // Function to view client details
  const handleViewCliente = (id: string) => {
    setSelectedClienteId(id);
    setActiveTab("detalhes");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Gestão de Clientes</h1>
        
        {!isAddingCliente && (
          <Button onClick={toggleAddCliente} className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Cadastrar Novo Cliente
          </Button>
        )}
      </div>
      
      {isAddingCliente ? (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {selectedClienteId ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}
            </h2>
            <Button 
              variant="outline"
              onClick={toggleAddCliente}
              className="text-sm"
            >
              Voltar para lista
            </Button>
          </div>
          <ClienteForm 
            clienteId={selectedClienteId} 
            onSaved={() => {
              setIsAddingCliente(false);
              setSelectedClienteId(null);
            }} 
          />
        </>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 h-auto">
                <TabsTrigger value="listagem" className="flex items-center gap-2 py-2">
                  <Users className="h-4 w-4" /> Listagem
                </TabsTrigger>
                <TabsTrigger value="documentos" className="flex items-center gap-2 py-2">
                  <FileText className="h-4 w-4" /> Documentos
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="listagem" className="mt-4">
                <ClientesTable 
                  onAddClick={toggleAddCliente}
                  onEditClick={handleEditCliente}
                  onViewClick={handleViewCliente}
                />
              </TabsContent>
              
              <TabsContent value="documentos" className="mt-4">
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-xl font-medium">Documentos dos Clientes</h3>
                  <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                    Visualize todos os documentos enviados pelos clientes. Organize por tipo de documento ou por cliente.
                  </p>
                  <Button className="mt-4" variant="outline">
                    Ver Todos os Documentos
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientesPage;
