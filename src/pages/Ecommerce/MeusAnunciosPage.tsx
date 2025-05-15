
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  PackageOpen, 
  Wrench, 
  Edit, 
  Trash, 
  Eye, 
  Filter,
  Plus,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Mock data for products
const produtosNovos = [
  {
    id: 'pn1',
    nome: 'Smartphone Galaxy S23',
    categoria: 'Eletrônicos',
    preco: 'R$ 4.999,00',
    estoque: 15,
    status: 'ativo',
    visualizacoes: 245,
    dataCriacao: '10/05/2023'
  },
  {
    id: 'pn2',
    nome: 'Notebook Dell Inspiron',
    categoria: 'Eletrônicos',
    preco: 'R$ 3.799,00',
    estoque: 8,
    status: 'ativo',
    visualizacoes: 187,
    dataCriacao: '08/05/2023'
  }
];

const produtosUsados = [
  {
    id: 'pu1',
    nome: 'iPhone 12 (Usado)',
    categoria: 'Eletrônicos',
    preco: 'R$ 2.500,00',
    status: 'ativo',
    visualizacoes: 156,
    dataCriacao: '12/05/2023'
  },
  {
    id: 'pu2',
    nome: 'TV Samsung 50" (Usada)',
    categoria: 'Eletrônicos',
    preco: 'R$ 1.800,00',
    status: 'ativo',
    visualizacoes: 92,
    dataCriacao: '09/05/2023'
  }
];

const servicos = [
  {
    id: 's1',
    nome: 'Instalação de Ar Condicionado',
    categoria: 'Serviços',
    preco: 'R$ 350,00',
    status: 'ativo',
    visualizacoes: 78,
    dataCriacao: '11/05/2023'
  },
  {
    id: 's2',
    nome: 'Manutenção de Computadores',
    categoria: 'Serviços',
    preco: 'R$ 180,00',
    status: 'ativo',
    visualizacoes: 63,
    dataCriacao: '07/05/2023'
  }
];

const MeusAnunciosPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('novos');
  
  const handleEditItem = (id: string) => {
    toast({
      title: "Editar item",
      description: `Editando item ${id}`,
    });
  };
  
  const handleDeleteItem = (id: string) => {
    toast({
      title: "Remover item",
      description: `Item ${id} removido com sucesso`,
    });
  };
  
  const handleViewItem = (id: string) => {
    navigate(`/ecommerce/produto/${id}`);
  };
  
  const handleAddItem = () => {
    navigate('/ecommerce/anunciar');
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Meus Anúncios</h1>
        <Button onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Criar Novo Anúncio
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="novos" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="novos" className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                Produtos Novos
              </TabsTrigger>
              <TabsTrigger value="usados" className="flex items-center">
                <PackageOpen className="mr-2 h-4 w-4" />
                Produtos Usados
              </TabsTrigger>
              <TabsTrigger value="servicos" className="flex items-center">
                <Wrench className="mr-2 h-4 w-4" />
                Serviços
              </TabsTrigger>
            </TabsList>
            
            <div className="flex justify-end mb-4">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </div>
            
            <TabsContent value="novos">
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Nome</th>
                      <th className="px-4 py-3 text-left font-medium">Preço</th>
                      <th className="px-4 py-3 text-left font-medium">Estoque</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Visualizações</th>
                      <th className="px-4 py-3 text-left font-medium">Data</th>
                      <th className="px-4 py-3 text-left font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtosNovos.map((produto) => (
                      <tr key={produto.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3">{produto.nome}</td>
                        <td className="px-4 py-3">{produto.preco}</td>
                        <td className="px-4 py-3">{produto.estoque}</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-green-500">{produto.status}</Badge>
                        </td>
                        <td className="px-4 py-3">{produto.visualizacoes}</td>
                        <td className="px-4 py-3">{produto.dataCriacao}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleViewItem(produto.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleEditItem(produto.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDeleteItem(produto.id)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="usados">
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Nome</th>
                      <th className="px-4 py-3 text-left font-medium">Preço</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Visualizações</th>
                      <th className="px-4 py-3 text-left font-medium">Data</th>
                      <th className="px-4 py-3 text-left font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtosUsados.map((produto) => (
                      <tr key={produto.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3">{produto.nome}</td>
                        <td className="px-4 py-3">{produto.preco}</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-green-500">{produto.status}</Badge>
                        </td>
                        <td className="px-4 py-3">{produto.visualizacoes}</td>
                        <td className="px-4 py-3">{produto.dataCriacao}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleViewItem(produto.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleEditItem(produto.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDeleteItem(produto.id)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="servicos">
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Nome</th>
                      <th className="px-4 py-3 text-left font-medium">Preço</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Visualizações</th>
                      <th className="px-4 py-3 text-left font-medium">Data</th>
                      <th className="px-4 py-3 text-left font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicos.map((servico) => (
                      <tr key={servico.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3">{servico.nome}</td>
                        <td className="px-4 py-3">{servico.preco}</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-green-500">{servico.status}</Badge>
                        </td>
                        <td className="px-4 py-3">{servico.visualizacoes}</td>
                        <td className="px-4 py-3">{servico.dataCriacao}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => handleViewItem(servico.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleEditItem(servico.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDeleteItem(servico.id)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeusAnunciosPage;
