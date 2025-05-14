
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pedidosExemplo = [
  { 
    id: 'PED001', 
    cliente: 'Empresa ABC Ltda', 
    valor: 'R$ 12.500,00', 
    data: '15/05/2023', 
    status: 'aprovado' 
  },
  { 
    id: 'PED002', 
    cliente: 'João Silva', 
    valor: 'R$ 5.800,00', 
    data: '18/05/2023', 
    status: 'pendente' 
  },
  { 
    id: 'PED003', 
    cliente: 'Maria Souza', 
    valor: 'R$ 8.200,00', 
    data: '20/05/2023', 
    status: 'reprovado' 
  },
  { 
    id: 'PED004', 
    cliente: 'Comércio XYZ', 
    valor: 'R$ 15.300,00', 
    data: '22/05/2023', 
    status: 'pendente' 
  },
  { 
    id: 'PED005', 
    cliente: 'Carlos Oliveira', 
    valor: 'R$ 3.700,00', 
    data: '25/05/2023', 
    status: 'aprovado' 
  },
];

const orcamentosExemplo = [
  { 
    id: 'ORC001', 
    cliente: 'Empresa XYZ Inc', 
    valor: 'R$ 22.500,00', 
    data: '10/05/2023', 
    validade: '10/06/2023', 
    status: 'pendente' 
  },
  { 
    id: 'ORC002', 
    cliente: 'Pedro Almeida', 
    valor: 'R$ 7.800,00', 
    data: '12/05/2023', 
    validade: '12/06/2023', 
    status: 'aprovado' 
  },
  { 
    id: 'ORC003', 
    cliente: 'Ana Ferreira', 
    valor: 'R$ 9.200,00', 
    data: '14/05/2023', 
    validade: '14/06/2023', 
    status: 'reprovado' 
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  switch(status) {
    case 'aprovado':
      return <Badge className="bg-green-500"><Check className="mr-1 h-3 w-3" /> Aprovado</Badge>;
    case 'reprovado':
      return <Badge className="bg-red-500"><X className="mr-1 h-3 w-3" /> Reprovado</Badge>;
    default:
      return <Badge className="bg-yellow-500"><Clock className="mr-1 h-3 w-3" /> Pendente</Badge>;
  }
};

const PedidosPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pedidos & Orçamentos</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Novo Orçamento
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Pedido
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pedidos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
          <TabsTrigger value="orcamentos">Orçamentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pedidos">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Valor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {pedidosExemplo.map((pedido) => (
                      <tr key={pedido.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{pedido.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{pedido.cliente}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{pedido.valor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{pedido.data}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <StatusBadge status={pedido.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orcamentos">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Orçamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Valor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Validade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {orcamentosExemplo.map((orcamento) => (
                      <tr key={orcamento.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{orcamento.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{orcamento.cliente}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{orcamento.valor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{orcamento.data}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{orcamento.validade}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <StatusBadge status={orcamento.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PedidosPage;
