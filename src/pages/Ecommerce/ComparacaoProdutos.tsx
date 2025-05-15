
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  Star,
  Check,
  X,
  ShoppingCart,
  Trash2
} from 'lucide-react';
import { produtosNovos, produtosUsados } from './data/produtos';
import { toast } from '@/components/ui/use-toast';

const ComparacaoProdutos = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productIds = searchParams.get('ids')?.split(',') || [];
  
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    
    if (productIds.length > 0) {
      const todosProdutos = [...produtosNovos, ...produtosUsados];
      const produtosEncontrados = productIds.map(id => 
        todosProdutos.find(p => p.id === id)
      ).filter(p => p !== undefined);
      
      setProdutos(produtosEncontrados);
    }
    
    setLoading(false);
  }, [productIds]);
  
  const handleAddToCart = (produto: any) => {
    toast({
      title: "Adicionado ao carrinho",
      description: `${produto.nome} foi adicionado ao carrinho.`,
    });
  };
  
  const handleRemoveProduto = (id: string) => {
    const novosProdutos = produtos.filter(p => p.id !== id);
    if (novosProdutos.length === 0) {
      navigate('/ecommerce/produtos');
      return;
    }
    
    const novaURL = `/ecommerce/comparar?ids=${novosProdutos.map(p => p.id).join(',')}`;
    navigate(novaURL);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-muted rounded"></div>
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-24 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (produtos.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Nenhum produto selecionado para comparação</h1>
        <Button onClick={() => navigate('/ecommerce/produtos')}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para a loja
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <Button 
        variant="outline" 
        className="mb-6"
        onClick={() => navigate('/ecommerce/produtos')}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para produtos
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">Comparação de Produtos</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 w-1/5">Especificações</th>
              {produtos.map(produto => (
                <th key={produto.id} className="p-4">
                  <div className="flex flex-col items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-0 right-0"
                      onClick={() => handleRemoveProduto(produto.id)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    
                    <div className="w-40 h-40 mb-3 relative">
                      <AspectRatio ratio={1/1} className="bg-muted rounded-md overflow-hidden">
                        <img 
                          src={produto.imagem} 
                          alt={produto.nome} 
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                    
                    <h3 className="font-semibold text-lg">{produto.nome}</h3>
                    <div className="flex items-center justify-center mt-1 mb-2">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-4 w-4" 
                            fill={i < produto.avaliacao ? "currentColor" : "none"} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-1">
                        ({produto.avaliacao.toFixed(1)})
                      </span>
                    </div>
                    <p className="font-bold text-xl mb-2">
                      R$ {produto.preco.toFixed(2).replace('.', ',')}
                    </p>
                    <Button 
                      className="w-full" 
                      size="sm"
                      onClick={() => handleAddToCart(produto)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" /> Adicionar
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-t p-4 font-medium">Categoria</td>
              {produtos.map(produto => (
                <td key={produto.id} className="border-t p-4 text-center">{produto.categoria}</td>
              ))}
            </tr>
            <tr>
              <td className="border-t p-4 font-medium">Condição</td>
              {produtos.map(produto => (
                <td key={produto.id} className="border-t p-4 text-center">
                  <Badge variant={produto.tipo === 'novo' ? 'default' : 'secondary'}>
                    {produto.tipo === 'novo' ? 'Novo' : 'Usado'}
                  </Badge>
                </td>
              ))}
            </tr>
            <tr>
              <td className="border-t p-4 font-medium">Estoque</td>
              {produtos.map(produto => (
                <td key={produto.id} className="border-t p-4 text-center">{produto.estoque} unidades</td>
              ))}
            </tr>
            <tr>
              <td className="border-t p-4 font-medium">Potência</td>
              {produtos.map(produto => (
                <td key={produto.id} className="border-t p-4 text-center">
                  {produto.especificacoes?.potencia || "N/A"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border-t p-4 font-medium">Autonomia</td>
              {produtos.map(produto => (
                <td key={produto.id} className="border-t p-4 text-center">
                  {produto.especificacoes?.autonomia || "N/A"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border-t p-4 font-medium">Peso</td>
              {produtos.map(produto => (
                <td key={produto.id} className="border-t p-4 text-center">
                  {produto.especificacoes?.peso || "N/A"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border-t p-4 font-medium">Garantia</td>
              {produtos.map(produto => (
                <td key={produto.id} className="border-t p-4 text-center">
                  {produto.especificacoes?.garantia || (produto.tipo === 'novo' ? '12 meses' : '3 meses')}
                </td>
              ))}
            </tr>
            <tr>
              <td className="border-t p-4 font-medium">Entrega Grátis</td>
              {produtos.map(produto => (
                <td key={produto.id} className="border-t p-4 text-center">
                  {produto.entregaGratis ? 
                    <Check className="h-5 w-5 text-green-500 mx-auto" /> : 
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  }
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparacaoProdutos;
