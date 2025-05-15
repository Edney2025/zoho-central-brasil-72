
import React, { useState } from 'react';
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
  PlusCircle
} from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { produtosNovos, produtosUsados } from './data/produtos';
import { useNavigate } from 'react-router-dom';

const ProdutosPage = () => {
  const [activeTab, setActiveTab] = useState("novos");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const handleAnunciar = () => {
    navigate('/ecommerce/anunciar');
  };

  const filteredProdutos = activeTab === "novos" 
    ? produtosNovos.filter(p => p.nome.toLowerCase().includes(searchQuery.toLowerCase()))
    : produtosUsados.filter(p => p.nome.toLowerCase().includes(searchQuery.toLowerCase()));

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
                  placeholder="Buscar produtos..." 
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
            
            <Tabs defaultValue="novos" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="novos" className="flex items-center">
                  <Package className="mr-2 h-4 w-4" />
                  Produtos Novos
                </TabsTrigger>
                <TabsTrigger value="usados" className="flex items-center">
                  <PackageOpen className="mr-2 h-4 w-4" />
                  Produtos Usados
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="novos" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProdutos.map((produto) => (
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
                  {filteredProdutos.map((produto) => (
                    <ProductCard 
                      key={produto.id} 
                      produto={produto} 
                      isNew={false} 
                    />
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
