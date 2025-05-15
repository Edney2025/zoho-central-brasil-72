import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  Truck,
  Clock,
  Shield,
  MessageCircle,
  Bookmark
} from 'lucide-react';
import { produtosNovos, produtosUsados } from './data/produtos';
import { toast } from '@/components/ui/use-toast';
import AvaliacaoEstrelas from '@/components/produtos/AvaliacaoEstrelas';
import ComentariosAvaliacoes from '@/components/produtos/ComentariosAvaliacoes';

const ProdutoDetalhe = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const tipo = searchParams.get('tipo') || 'novo';
  const navigate = useNavigate();
  
  const [produto, setProduto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  
  useEffect(() => {
    setLoading(true);
    
    // Simulando busca de produto
    setTimeout(() => {
      const produtosSource = tipo === 'novo' ? produtosNovos : produtosUsados;
      const found = produtosSource.find(p => p.id === id);
      
      if (found) {
        setProduto(found);
      }
      
      setLoading(false);
    }, 500);
  }, [id, tipo]);
  
  const handleAddToCart = () => {
    // Lógica para adicionar ao carrinho
    toast({
      title: "Produto adicionado",
      description: `${quantidade} unidade(s) de ${produto.nome} adicionada(s) ao carrinho`,
    });
  };
  
  const handleSaveForLater = () => {
    toast({
      title: "Produto salvo",
      description: `${produto.nome} foi salvo para comprar depois`,
    });
  };
  
  const handleCompareProduct = () => {
    navigate(`/ecommerce/comparar?ids=${produto.id}`);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-24 bg-muted rounded w-full"></div>
              <div className="h-12 bg-muted rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!produto) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <Button onClick={() => navigate('/ecommerce/produtos')}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para a loja
        </Button>
      </div>
    );
  }
  
  // Simular imagens adicionais
  const imagens = [
    produto.imagem,
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  ];
  
  const comentariosExemplo = [
    { 
      id: 'comentario1', 
      nome: 'João Silva', 
      avaliacao: 5, 
      texto: 'Produto excelente! Superou minhas expectativas. A entrega foi rápida e o produto chegou em perfeito estado.',
      data: new Date(2023, 3, 15)
    },
    { 
      id: 'comentario2', 
      nome: 'Maria Oliveira', 
      avaliacao: 4, 
      texto: 'Muito bom, mas achei o preço um pouco elevado para o que oferece. De qualquer forma, estou satisfeita com a compra.',
      data: new Date(2023, 2, 28)
    },
    { 
      id: 'comentario3', 
      nome: 'Carlos Rodrigues', 
      avaliacao: 5, 
      texto: 'Ótimo custo-benefício! Já é o segundo que compro deste modelo.',
      data: new Date(2023, 1, 10)
    }
  ];
  
  return (
    <div className="container mx-auto py-6">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate('/ecommerce/produtos')}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para a loja
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galeria de imagens */}
        <div className="space-y-4">
          <AspectRatio ratio={1/1} className="bg-muted overflow-hidden rounded-lg border">
            <img 
              src={imagens[activeImage]} 
              alt={produto.nome} 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          
          <div className="grid grid-cols-4 gap-2">
            {imagens.map((img, index) => (
              <div 
                key={index}
                className={`cursor-pointer border rounded-lg overflow-hidden ${index === activeImage ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <AspectRatio ratio={1/1}>
                  <img 
                    src={img} 
                    alt={`${produto.nome} - imagem ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        </div>
        
        {/* Informações do produto */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center mb-2">
              <Badge variant={tipo === 'novo' ? 'default' : 'secondary'}>
                {tipo === 'novo' ? 'Novo' : 'Usado'}
              </Badge>
              <span className="text-sm text-muted-foreground ml-2">{produto.categoria}</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{produto.nome}</h1>
            
            <div className="flex items-center mb-4">
              <AvaliacaoEstrelas avaliacao={produto.avaliacao} tamanho={4} />
              <span className="text-sm text-muted-foreground ml-1">
                ({produto.avaliacao.toFixed(1)}) • {produto.estoque} em estoque
              </span>
            </div>
            
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold">
                R$ {produto.preco.toFixed(2).replace('.', ',')}
              </span>
              {produto.precoAntigo && (
                <span className="text-lg text-muted-foreground line-through ml-3">
                  R$ {produto.precoAntigo.toFixed(2).replace('.', ',')}
                </span>
              )}
              
              {produto.precoAntigo && (
                <Badge className="ml-2 bg-red-500">
                  {Math.round((1 - produto.preco / produto.precoAntigo) * 100)}% OFF
                </Badge>
              )}
            </div>
            
            <p className="text-muted-foreground mb-6">
              {produto.descricao}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Quantidade:</span>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantidade(q => Math.max(1, q - 1))}
                  disabled={quantidade <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantidade}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantidade(q => Math.min(produto.estoque, q + 1))}
                  disabled={quantidade >= produto.estoque}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar ao carrinho
              </Button>
              <Button variant="outline" onClick={handleSaveForLater}>
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="pt-6 space-y-3 border-t">
              <div className="flex items-center text-sm">
                <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  Entrega em até {tipo === 'novo' ? '10 dias úteis' : '5 dias úteis'}
                </span>
              </div>
              
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  {tipo === 'novo' 
                    ? 'Garantia de 12 meses do fabricante' 
                    : 'Garantia de 3 meses da loja'}
                </span>
              </div>
              
              <div className="flex items-center text-sm">
                <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Compra 100% segura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Abas de informações adicionais */}
      <div className="mt-12">
        <Tabs defaultValue="descricao" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="descricao">Descrição</TabsTrigger>
            <TabsTrigger value="especificacoes">Especificações</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
            <TabsTrigger value="pagamento">Formas de Pagamento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="descricao" className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Descrição do Produto</h2>
            <p>{produto.descricao}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, 
              nisi eu tincidunt ultricies, nisl nisl lacinia nisl, eu lacinia nisl nisl eu nisl.
            </p>
          </TabsContent>
          
          <TabsContent value="especificacoes" className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Especificações Técnicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Marca</span>
                  <span>EcoMobility</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Modelo</span>
                  <span>2023</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Potência</span>
                  <span>1500W</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Autonomia</span>
                  <span>80km</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Peso</span>
                  <span>25kg</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Garantia</span>
                  <span>{tipo === 'novo' ? '12 meses' : '3 meses'}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="avaliacoes" className="space-y-6">
            <ComentariosAvaliacoes 
              produtoId={produto.id}
              comentarios={comentariosExemplo}
            />
          </TabsContent>
          
          <TabsContent value="pagamento" className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Formas de Pagamento</h2>
            <div className="space-y-4">
              <p>Aceitamos as seguintes formas de pagamento:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-medium">Cartão de Crédito</h3>
                  <p className="text-sm text-muted-foreground">Até 12x sem juros</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-medium">Boleto Bancário</h3>
                  <p className="text-sm text-muted-foreground">5% de desconto</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-medium">PIX</h3>
                  <p className="text-sm text-muted-foreground">10% de desconto</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <h3 className="font-medium">Financiamento</h3>
                  <p className="text-sm text-muted-foreground">Em até 36x</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Produtos relacionados */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {(tipo === 'novo' ? produtosNovos : produtosUsados)
            .filter(p => p.id !== produto.id)
            .slice(0, 4)
            .map(p => (
              <Card 
                key={p.id}
                className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
                onClick={() => navigate(`/ecommerce/produto/${p.id}?tipo=${tipo}`)}
              >
                <AspectRatio ratio={4/3}>
                  <img 
                    src={p.imagem} 
                    alt={p.nome} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <CardContent className="p-3">
                  <h3 className="font-medium truncate">{p.nome}</h3>
                  <div className="flex text-amber-500 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-3 w-3" 
                        fill={i < p.avaliacao ? "currentColor" : "none"} 
                      />
                    ))}
                  </div>
                  <p className="font-bold">
                    R$ {p.preco.toFixed(2).replace('.', ',')}
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
      
      {/* Chat de suporte */}
      <div className="fixed bottom-6 right-6">
        <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default ProdutoDetalhe;
