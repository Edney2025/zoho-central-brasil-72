
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Package, 
  PackageOpen, 
  Search, 
  SlidersHorizontal,
  ShoppingCart,
  Heart,
  Tag,
  PlusCircle,
  Wrench
} from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { produtosNovos, produtosUsados } from './data/produtos';
import { useNavigate, useLocation } from 'react-router-dom';

// Mock data for services
const servicos = [
  {
    id: 's1',
    nome: 'Instalação de Ar Condicionado',
    descricao: 'Serviço profissional de instalação de ar condicionado split.',
    preco: 'R$ 350,00',
    imagem: 'https://placehold.co/800x600?text=Serviço',
    vendedor: 'Técnico João',
    avaliacao: 4.8
  },
  {
    id: 's2',
    nome: 'Manutenção de Computadores',
    descricao: 'Formatação, limpeza e otimização de desempenho para computadores e notebooks.',
    preco: 'R$ 180,00',
    imagem: 'https://placehold.co/800x600?text=Serviço',
    vendedor: 'TechService',
    avaliacao: 4.5
  },
  {
    id: 's3',
    nome: 'Instalação de TV e Home Theater',
    descricao: 'Montagem, instalação e configuração de TVs e sistemas de home theater.',
    preco: 'R$ 250,00',
    imagem: 'https://placehold.co/800x600?text=Serviço',
    vendedor: 'AudioVideo Express',
    avaliacao: 4.7
  }
];

const ProdutosPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tipoParam = searchParams.get('tipo');
  
  const [activeTab, setActiveTab] = useState(tipoParam === 'usados' ? 'usados' : tipoParam === 'servicos' ? 'servicos' : 'novos');
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const handleAnunciar = () => {
    navigate('/portal/anunciar');
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL without refreshing the page
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('tipo', value);
    navigate({
      pathname: location.pathname,
      search: newSearchParams.toString()
    }, { replace: true });
  };

  const filteredItems = () => {
    if (activeTab === 'novos') {
      return produtosNovos.filter(p => p.nome.toLowerCase().includes(searchQuery.toLowerCase()));
    } else if (activeTab === 'usados') {
      return produtosUsados.filter(p => p.nome.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
      return servicos.filter(s => s.nome.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">Loja Online</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleAnunciar}>
              <Tag className="mr-2 h-4 w-4" />
              Anunciar aqui
            </Button>
            <Button onClick={() => navigate('/ecommerce/carrinho')}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Carrinho (0)
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filtros para desktop */}
          <div className="hidden md:block space-y-6">
            <div className="bg-card rounded-lg border p-4 space-y-4">
              <h3 className="font-medium flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" /> Filtros
              </h3>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Categoria</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="categoria-1" className="mr-2" />
                    <label htmlFor="categoria-1" className="text-sm">Eletrônicos</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="categoria-2" className="mr-2" />
                    <label htmlFor="categoria-2" className="text-sm">Veículos</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="categoria-3" className="mr-2" />
                    <label htmlFor="categoria-3" className="text-sm">Baterias</label>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Preço</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Min" type="number" />
                  <Input placeholder="Max" type="number" />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Ordenar por</h4>
                <Select defaultValue="relevancia">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevancia">Relevância</SelectItem>
                    <SelectItem value="menorpreco">Menor Preço</SelectItem>
                    <SelectItem value="maiorpreco">Maior Preço</SelectItem>
                    <SelectItem value="recentes">Mais Recentes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full">Aplicar Filtros</Button>
            </div>
          </div>
          
          {/* Conteúdo principal */}
          <div className="md:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar produtos ou serviços..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select defaultValue="relevancia">
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevancia">Relevância</SelectItem>
                  <SelectItem value="menorpreco">Menor Preço</SelectItem>
                  <SelectItem value="maiorpreco">Maior Preço</SelectItem>
                  <SelectItem value="recentes">Mais Recentes</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Filtro mobile */}
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
            
            <Tabs defaultValue={activeTab} className="w-full" onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-3 mb-4">
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
              
              <TabsContent value="novos" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredItems().map((produto: any) => (
                    <ProductCard 
                      key={produto.id} 
                      produto={produto} 
                      isNew={true} 
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="usados" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredItems().map((produto: any) => (
                    <ProductCard 
                      key={produto.id} 
                      produto={produto} 
                      isNew={false} 
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="servicos" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredItems().map((servico: any) => (
                    <div key={servico.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-video bg-muted relative">
                        <img 
                          src={servico.imagem} 
                          alt={servico.nome}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium truncate">{servico.nome}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 h-10">{servico.descricao}</p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="font-bold">{servico.preco}</p>
                          <p className="text-sm">{servico.vendedor}</p>
                        </div>
                        <div className="mt-4">
                          <Button className="w-full">Solicitar</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutosPage;
