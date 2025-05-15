
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Trash2, ShoppingBag, CreditCard, ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Simulando itens no carrinho
const carrinhoInicial = [
  {
    id: "pn1",
    nome: "Moto Elétrica X2000",
    preco: 12500.00,
    imagem: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    quantidade: 1
  },
  {
    id: "pn5",
    nome: "Capacete de Segurança Premium",
    preco: 350.00,
    imagem: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    quantidade: 2
  }
];

const CarrinhoPage = () => {
  const navigate = useNavigate();
  const [itens, setItens] = useState(carrinhoInicial);
  const [cupom, setCupom] = useState('');
  const [cupomAplicado, setCupomAplicado] = useState(false);
  
  const subtotal = itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  const desconto = cupomAplicado ? subtotal * 0.1 : 0;
  const frete = 100.00;
  const total = subtotal - desconto + frete;
  
  const handleQuantidadeChange = (id: string, quantidade: number) => {
    if (quantidade < 1) return;
    
    setItens(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantidade } : item
      )
    );
  };
  
  const handleRemoverItem = (id: string) => {
    setItens(prev => prev.filter(item => item.id !== id));
  };
  
  const handleAplicarCupom = () => {
    // Simulando validação de cupom
    if (cupom.toLowerCase() === 'desconto10') {
      setCupomAplicado(true);
    } else {
      setCupomAplicado(false);
      alert('Cupom inválido!');
    }
  };
  
  const handleFinalizarCompra = () => {
    navigate('/ecommerce/checkout');
  };
  
  if (itens.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/ecommerce/produtos')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para a loja
        </Button>
        
        <Card className="max-w-md mx-auto text-center py-12">
          <CardContent>
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-6">
              Parece que você ainda não adicionou nenhum produto ao seu carrinho.
            </p>
            <Button onClick={() => navigate('/ecommerce/produtos')}>
              Continuar Comprando
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate('/ecommerce/produtos')}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para a loja
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Itens do Carrinho ({itens.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {itens.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-4 border-b">
                  <div className="w-full sm:w-32 flex-shrink-0">
                    <AspectRatio ratio={1/1} className="bg-muted">
                      <img 
                        src={item.imagem} 
                        alt={item.nome} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </AspectRatio>
                  </div>
                  
                  <div className="flex-grow space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.nome}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoverItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      Produto em estoque
                    </p>
                    
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleQuantidadeChange(item.id, item.quantidade - 1)}
                        >
                          -
                        </Button>
                        <span className="w-10 text-center">{item.quantidade}</span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantidadeChange(item.id, item.quantidade + 1)}
                        >
                          +
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold">
                          R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          R$ {item.preco.toFixed(2).replace('.', ',')} cada
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => navigate('/ecommerce/produtos')}
              >
                Continuar Comprando
              </Button>
              <Button
                variant="default"
                onClick={handleFinalizarCompra}
              >
                Finalizar Compra
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-muted/30 transition-colors">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="text-sm font-medium">Cartão de Crédito</h3>
                  <p className="text-xs text-muted-foreground">Até 12x sem juros</p>
                </div>
                <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-muted/30 transition-colors">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="text-sm font-medium">Cartão de Débito</h3>
                  <p className="text-xs text-muted-foreground">Débito à vista</p>
                </div>
                <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-muted/30 transition-colors">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="text-sm font-medium">PIX</h3>
                  <p className="text-xs text-muted-foreground">10% de desconto</p>
                </div>
                <div className="border rounded-lg p-3 text-center cursor-pointer hover:bg-muted/30 transition-colors">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="text-sm font-medium">Financiamento</h3>
                  <p className="text-xs text-muted-foreground">Em até 36x</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({itens.length} itens)</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Frete</span>
                <span>R$ {frete.toFixed(2).replace('.', ',')}</span>
              </div>
              
              {cupomAplicado && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto (Cupom)</span>
                  <span>-R$ {desconto.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                <Input
                  placeholder="Cupom de desconto"
                  value={cupom}
                  onChange={(e) => setCupom(e.target.value)}
                  className="col-span-2"
                />
                <Button 
                  variant="outline" 
                  onClick={handleAplicarCupom}
                >
                  Aplicar
                </Button>
              </div>
              
              {cupomAplicado && (
                <Alert className="bg-green-50 border-green-200 text-green-800">
                  <AlertDescription className="text-xs">
                    Cupom <strong>DESCONTO10</strong> aplicado com sucesso!
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label className="text-sm">Calcular Frete</Label>
                <div className="flex space-x-2">
                  <Input placeholder="CEP" className="flex-grow" />
                  <Button variant="outline">Calcular</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={handleFinalizarCompra}
              >
                Finalizar Compra <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Entrega</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="padrao">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de entrega" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="padrao">Entrega Padrão (5-7 dias úteis)</SelectItem>
                  <SelectItem value="express">Entrega Expressa (2-3 dias úteis)</SelectItem>
                  <SelectItem value="retirada">Retirada na Loja</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="mt-4 space-y-2 text-sm">
                <p className="font-medium">Entrega Padrão</p>
                <p className="text-muted-foreground">Prazo estimado: 5-7 dias úteis após a confirmação do pagamento</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Componente de Label simples para campos
const Label = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <label className={`block text-sm font-medium mb-1 ${className || ''}`}>{children}</label>
);

export default CarrinhoPage;
