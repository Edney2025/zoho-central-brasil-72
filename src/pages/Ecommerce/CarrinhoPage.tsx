
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Trash2, 
  ChevronLeft,
  CreditCard,
  Bookmark,
  ArrowRight,
  ArrowLeft,
  Star
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { produtosNovos } from './data/produtos';

// Dados de exemplo para o carrinho
const carrinhoInicial = [
  { id: 'produto-1', produto: produtosNovos[0], quantidade: 1 },
  { id: 'produto-2', produto: produtosNovos[2], quantidade: 2 }
];

// Produtos salvos para depois
const salvosInicial = [
  { id: 'produto-3', produto: produtosNovos[1] }
];

const CarrinhoPage = () => {
  const navigate = useNavigate();
  const [itensCarrinho, setItensCarrinho] = useState(carrinhoInicial);
  const [itensSalvos, setItensSalvos] = useState(salvosInicial);
  const [cupomDesconto, setCupomDesconto] = useState('');
  
  // Calcular o total do carrinho
  const subtotal = itensCarrinho.reduce((total, item) => {
    return total + (item.produto.preco * item.quantidade);
  }, 0);
  
  const frete = subtotal > 0 ? 15.90 : 0;
  const desconto = cupomDesconto === 'DESC10' ? subtotal * 0.1 : 0;
  const total = subtotal + frete - desconto;
  
  // Funções do carrinho
  const handleAtualizarQuantidade = (id: string, novaQuantidade: number) => {
    if (novaQuantidade < 1) return;
    
    setItensCarrinho(itensAtuais => 
      itensAtuais.map(item => 
        item.id === id ? { ...item, quantidade: novaQuantidade } : item
      )
    );
  };
  
  const handleRemoverItem = (id: string) => {
    setItensCarrinho(itensAtuais => 
      itensAtuais.filter(item => item.id !== id)
    );
    
    toast({
      title: "Item removido",
      description: "O item foi removido do seu carrinho.",
    });
  };
  
  const handleSalvarParaDepois = (id: string) => {
    const item = itensCarrinho.find(item => item.id === id);
    
    if (item) {
      // Adicionar aos salvos
      setItensSalvos(itensSalvos => [...itensSalvos, { id: item.id, produto: item.produto }]);
      
      // Remover do carrinho
      setItensCarrinho(itensAtuais => 
        itensAtuais.filter(i => i.id !== id)
      );
      
      toast({
        title: "Item salvo para depois",
        description: "O item foi movido para sua lista de desejos.",
      });
    }
  };
  
  const handleMoverParaCarrinho = (id: string) => {
    const item = itensSalvos.find(item => item.id === id);
    
    if (item) {
      // Adicionar ao carrinho
      setItensCarrinho(itensAtuais => 
        [...itensAtuais, { id: item.id, produto: item.produto, quantidade: 1 }]
      );
      
      // Remover dos salvos
      setItensSalvos(itensSalvos => 
        itensSalvos.filter(i => i.id !== id)
      );
      
      toast({
        title: "Item adicionado ao carrinho",
        description: "O item foi movido para seu carrinho de compras.",
      });
    }
  };
  
  const handleRemoverItemSalvo = (id: string) => {
    setItensSalvos(itensSalvos => 
      itensSalvos.filter(item => item.id !== id)
    );
    
    toast({
      title: "Item removido",
      description: "O item foi removido da sua lista de desejos.",
    });
  };
  
  const handleAplicarCupom = () => {
    if (!cupomDesconto) {
      toast({
        title: "Erro",
        description: "Digite um cupom de desconto.",
        variant: "destructive",
      });
      return;
    }
    
    if (cupomDesconto === 'DESC10') {
      toast({
        title: "Cupom aplicado",
        description: "Desconto de 10% aplicado ao pedido.",
      });
    } else {
      toast({
        title: "Cupom inválido",
        description: "O cupom informado não é válido ou já expirou.",
        variant: "destructive",
      });
    }
  };
  
  const handleFinalizarCompra = () => {
    toast({
      title: "Pedido enviado",
      description: "Seu pedido foi enviado com sucesso!",
    });
    
    // Em uma aplicação real, redirecionaria para a página de pagamento
    // Por enquanto, apenas simularemos limpando o carrinho
    setItensCarrinho([]);
  };
  
  // Produtos relacionados/recomendados
  const produtosRecomendados = produtosNovos
    .filter(p => !itensCarrinho.some(item => item.produto.id === p.id))
    .filter(p => !itensSalvos.some(item => item.produto.id === p.id))
    .slice(0, 4);

  return (
    <div className="container mx-auto py-8">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate('/ecommerce/produtos')}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Continuar comprando
      </Button>
      
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <ShoppingCart className="mr-3 h-6 w-6" /> Meu Carrinho
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Itens no Carrinho ({itensCarrinho.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {itensCarrinho.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-lg text-muted-foreground">Seu carrinho está vazio</p>
                  <Button 
                    className="mt-4" 
                    onClick={() => navigate('/ecommerce/produtos')}
                  >
                    Ver produtos
                  </Button>
                </div>
              ) : (
                <div className="divide-y">
                  {itensCarrinho.map(item => (
                    <div key={item.id} className="py-4 grid grid-cols-[100px_1fr] gap-4">
                      <div className="flex-none">
                        <AspectRatio ratio={1/1} className="bg-muted rounded-md overflow-hidden">
                          <img 
                            src={item.produto.imagem} 
                            alt={item.produto.nome} 
                            className="h-full w-full object-cover"
                            onClick={() => navigate(`/ecommerce/produto/${item.produto.id}`)}
                          />
                        </AspectRatio>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <h3 
                            className="font-medium hover:text-primary cursor-pointer"
                            onClick={() => navigate(`/ecommerce/produto/${item.produto.id}`)}
                          >
                            {item.produto.nome}
                          </h3>
                          <span className="font-medium">
                            R$ {(item.produto.preco * item.quantidade).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-2">
                          Preço unitário: R$ {item.produto.preco.toFixed(2).replace('.', ',')}
                        </div>
                        
                        <div className="flex justify-between items-center mt-auto">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleAtualizarQuantidade(item.id, item.quantidade - 1)}
                              disabled={item.quantidade <= 1}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantidade}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleAtualizarQuantidade(item.id, item.quantidade + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleSalvarParaDepois(item.id)}
                            >
                              <Bookmark className="h-4 w-4 mr-1" /> Salvar
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoverItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Remover
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {itensSalvos.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Salvos para depois ({itensSalvos.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {itensSalvos.map(item => (
                    <div key={item.id} className="py-4 grid grid-cols-[80px_1fr] gap-4">
                      <div className="flex-none">
                        <AspectRatio ratio={1/1} className="bg-muted rounded-md overflow-hidden">
                          <img 
                            src={item.produto.imagem} 
                            alt={item.produto.nome} 
                            className="h-full w-full object-cover"
                          />
                        </AspectRatio>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.produto.nome}</h3>
                          <span className="font-medium">
                            R$ {item.produto.preco.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-auto">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMoverParaCarrinho(item.id)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" /> Adicionar ao carrinho
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoverItemSalvo(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {produtosRecomendados.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Produtos Recomendados</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {produtosRecomendados.map(produto => (
                    <Card 
                      key={produto.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => navigate(`/ecommerce/produto/${produto.id}`)}
                    >
                      <AspectRatio ratio={1/1}>
                        <img 
                          src={produto.imagem} 
                          alt={produto.nome} 
                          className="h-full w-full object-cover"
                        />
                      </AspectRatio>
                      <CardContent className="p-3">
                        <h3 className="font-medium line-clamp-1">{produto.nome}</h3>
                        <div className="flex text-amber-500 my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="h-3 w-3" 
                              fill={i < produto.avaliacao ? "currentColor" : "none"} 
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-bold">R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Adicionar ao carrinho diretamente
                              setItensCarrinho(itens => [
                                ...itens, 
                                { id: `produto-${Date.now()}`, produto, quantidade: 1 }
                              ]);
                              toast({
                                title: "Produto adicionado",
                                description: `${produto.nome} adicionado ao carrinho.`,
                              });
                            }}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span>{frete > 0 ? `R$ ${frete.toFixed(2).replace('.', ',')}` : 'Grátis'}</span>
                </div>
                {desconto > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Desconto</span>
                    <span className="text-green-600">- R$ {desconto.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              
              <div className="mt-6 flex gap-2">
                <Input
                  placeholder="Cupom de desconto"
                  value={cupomDesconto}
                  onChange={(e) => setCupomDesconto(e.target.value)}
                />
                <Button 
                  variant="outline"
                  onClick={handleAplicarCupom}
                >
                  Aplicar
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                size="lg"
                disabled={itensCarrinho.length === 0}
                onClick={handleFinalizarCompra}
              >
                <CreditCard className="mr-2 h-4 w-4" /> Finalizar compra
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarrinhoPage;
