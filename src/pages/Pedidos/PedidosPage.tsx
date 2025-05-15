
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, PlusCircle } from 'lucide-react';
import OrcamentosTable from './components/OrcamentosTable';
import { orcamentosMock } from './data/orcamentos-mock';

const PedidosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('orcamentos');
  
  const filteredOrcamentos = orcamentosMock.filter(orcamento => 
    orcamento.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orcamento.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Pedidos e Orçamentos</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Novo Orçamento
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente, número..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="orcamentos" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="orcamentos">Orçamentos</TabsTrigger>
          <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
          <TabsTrigger value="vendas">Vendas Finalizadas</TabsTrigger>
        </TabsList>
        <TabsContent value="orcamentos" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Orçamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <OrcamentosTable orcamentos={filteredOrcamentos} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pedidos" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Não há pedidos disponíveis.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="vendas" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendas Finalizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Não há vendas finalizadas disponíveis.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PedidosPage;
