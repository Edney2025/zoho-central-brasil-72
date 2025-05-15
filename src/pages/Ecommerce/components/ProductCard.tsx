
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  precoAntigo?: number;
  imagem: string;
  descricao: string;
  categoria: string;
  avaliacao: number;
  estoque: number;
}

export interface ProductCardProps {
  produto: Produto;
  isNew: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ produto, isNew }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/ecommerce/produto/${produto.id}?tipo=${isNew ? 'novo' : 'usado'}`);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Lógica para adicionar ao carrinho
    console.log(`Adicionando produto ${produto.id} ao carrinho`);
  };
  
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Lógica para adicionar à lista de desejos
    console.log(`Adicionando produto ${produto.id} à lista de desejos`);
  };
  
  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative">
        <AspectRatio ratio={4/3}>
          {produto.imagem ? (
            <img 
              src={produto.imagem} 
              alt={produto.nome} 
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Sem imagem</span>
            </div>
          )}
        </AspectRatio>
        
        {produto.precoAntigo && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            {Math.round((1 - produto.preco / produto.precoAntigo) * 100)}% OFF
          </Badge>
        )}
        
        {!isNew && (
          <Badge className="absolute top-2 left-2 bg-amber-500">
            Usado
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center mb-1">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="h-3 w-3" 
                fill={i < produto.avaliacao ? "currentColor" : "none"} 
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">({produto.avaliacao.toFixed(1)})</span>
        </div>
        
        <h3 className="font-medium leading-tight mb-1 truncate">{produto.nome}</h3>
        
        <p className="text-xs text-muted-foreground mb-2 truncate">
          {produto.categoria}
        </p>
        
        <div className="flex items-baseline mb-3">
          <span className="text-lg font-bold">
            R$ {produto.preco.toFixed(2).replace('.', ',')}
          </span>
          {produto.precoAntigo && (
            <span className="text-sm text-muted-foreground line-through ml-2">
              R$ {produto.precoAntigo.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-1" /> Comprar
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddToWishlist}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const ProductCardSkeleton = () => (
  <Card className="overflow-hidden">
    <AspectRatio ratio={4/3}>
      <Skeleton className="w-full h-full" />
    </AspectRatio>
    <CardContent className="p-4">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-4 w-16 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 w-9" />
      </div>
    </CardContent>
  </Card>
);
