
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Package, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const produtosExemplo = [
  {
    id: 'PROD001',
    nome: 'Bicicleta Elétrica Modelo X',
    categoria: 'Bicicletas',
    preco: 'R$ 5.999,00',
    estoque: 12,
    status: 'normal'
  },
  {
    id: 'PROD002',
    nome: 'Patinete Elétrico Modelo Y',
    categoria: 'Patinetes',
    preco: 'R$ 3.499,00',
    estoque: 8,
    status: 'normal'
  },
  {
    id: 'PROD003',
    nome: 'Bateria de Lítio 48V',
    categoria: 'Peças',
    preco: 'R$ 1.899,00',
    estoque: 3,
    status: 'baixo'
  },
  {
    id: 'PROD004',
    nome: 'Kit Motor 1000W',
    categoria: 'Peças',
    preco: 'R$ 2.299,00',
    estoque: 0,
    status: 'esgotado'
  },
  {
    id: 'PROD005',
    nome: 'Carregador Rápido Universal',
    categoria: 'Acessórios',
    preco: 'R$ 349,00',
    estoque: 23,
    status: 'normal'
  },
];

const EstoqueStatusBadge = ({ status, quantidade }: { status: string, quantidade: number }) => {
  switch(status) {
    case 'baixo':
      return <Badge className="bg-yellow-500"><AlertTriangle className="mr-1 h-3 w-3" /> Baixo ({quantidade})</Badge>;
    case 'esgotado':
      return <Badge className="bg-red-500">Esgotado</Badge>;
    default:
      return <Badge className="bg-green-500">Em Estoque ({quantidade})</Badge>;
  }
};

const EstoquePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Controle de Estoque</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Novo Produto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Package className="h-6 w-6 text-primary mr-2" />
              <span className="text-3xl font-bold">482</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Em 8 categorias diferentes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produtos com Estoque Baixo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="text-3xl font-bold">24</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Necessitam reposição
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produtos Esgotados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
              <span className="text-3xl font-bold">7</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Sem estoque disponível
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lista de Produtos</CardTitle>
          <div className="flex gap-2 pt-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="w-full bg-background pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todos">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="bicicletas">Bicicletas</TabsTrigger>
              <TabsTrigger value="pecas">Peças</TabsTrigger>
              <TabsTrigger value="acessorios">Acessórios</TabsTrigger>
            </TabsList>
            <TabsContent value="todos" className="mt-4">
              <div className="rounded-md border overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Produto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Categoria</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Preço</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {produtosExemplo.map((produto) => (
                      <tr key={produto.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{produto.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{produto.nome}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{produto.categoria}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{produto.preco}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <EstoqueStatusBadge status={produto.status} quantidade={produto.estoque} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                          <Button variant="outline" size="sm">Editar</Button>
                          <Button variant="ghost" size="sm">Ver</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="bicicletas" className="mt-4">
              <p className="text-center text-muted-foreground py-8">
                Lista de bicicletas aparecerá aqui
              </p>
            </TabsContent>
            <TabsContent value="pecas" className="mt-4">
              <p className="text-center text-muted-foreground py-8">
                Lista de peças aparecerá aqui
              </p>
            </TabsContent>
            <TabsContent value="acessorios" className="mt-4">
              <p className="text-center text-muted-foreground py-8">
                Lista de acessórios aparecerá aqui
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstoquePage;
