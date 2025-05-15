
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, MoreHorizontal, ExternalLink } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface RecentAd {
  id: string;
  title: string;
  price: number;
  category: string;
  status: 'active' | 'pending' | 'sold';
  image: string;
  createdAt: string;
  views: number;
}

interface RecentAdsSectionProps {
  recentAds: RecentAd[];
}

export const RecentAdsSection = ({ recentAds }: RecentAdsSectionProps) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Ativo</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case 'sold':
        return <Badge className="bg-blue-500">Vendido</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const handleViewAd = (id: string) => {
    navigate(`/ecommerce/produto/${id}`);
  };
  
  const handleEditAd = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/ecommerce/editar/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Anúncios Recentes</h2>
        <Button 
          variant="outline" 
          onClick={() => navigate('/ecommerce/meus-anuncios')}
        >
          Ver Todos <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentAds.map((ad) => (
          <Card 
            key={ad.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleViewAd(ad.id)}
          >
            <CardHeader className="p-0">
              <AspectRatio ratio={4/3}>
                <img 
                  src={ad.image} 
                  alt={ad.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </AspectRatio>
              <div className="absolute top-2 right-2">
                {getStatusBadge(ad.status)}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg truncate">{ad.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{ad.category}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">R$ {ad.price.toFixed(2).replace('.', ',')}</span>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye className="h-3 w-3 mr-1" />
                  {ad.views}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between py-2 px-4 border-t">
              <span className="text-xs text-muted-foreground">
                Criado em {ad.createdAt}
              </span>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={(e) => handleEditAd(e, ad.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
