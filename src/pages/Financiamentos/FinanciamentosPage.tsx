
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Bike, Car, Home, Smartphone, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FinanciamentosPage = () => {
  const navigate = useNavigate();
  
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financiamentos</h1>
      
      <Tabs defaultValue="veiculos-eletricos">
        <TabsList className="mb-4">
          <TabsTrigger value="veiculos-eletricos">
            <Zap className="h-4 w-4 mr-2" />
            Veículos Elétricos
          </TabsTrigger>
          <TabsTrigger value="automoveis">
            <Car className="h-4 w-4 mr-2" />
            Automóveis
          </TabsTrigger>
          <TabsTrigger value="imoveis">
            <Home className="h-4 w-4 mr-2" />
            Imóveis
          </TabsTrigger>
          <TabsTrigger value="produtos">
            <Smartphone className="h-4 w-4 mr-2" />
            Produtos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="veiculos-eletricos">
          <Card>
            <CardHeader>
              <CardTitle>Financiamentos de Veículos Elétricos</CardTitle>
              <CardDescription>
                Selecione um tipo de veículo elétrico para simular seu financiamento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 hover:border-primary hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Moto Elétrica
                    </CardTitle>
                    <CardDescription>
                      A partir de R$ 3.500,00 em até 96x
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Financie sua moto elétrica com condições especiais e descubra o melhor plano para você.
                    </p>
                    <Button 
                      className="w-full" 
                      onClick={() => handleNavigate('/calculadoras/moto-eletrica')}
                    >
                      Simular
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-2 hover:border-primary hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bike className="h-5 w-5" />
                      Bicicleta Elétrica Nova
                    </CardTitle>
                    <CardDescription>
                      A partir de R$ 2.500,00 em até 96x
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Adquira sua bicicleta elétrica nova com planos de financiamento flexíveis.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleNavigate('/calculadoras/bicicleta-eletrica-nova')}
                    >
                      Simular
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-2 hover:border-primary hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bike className="h-5 w-5" />
                      Bicicleta Elétrica Usada
                    </CardTitle>
                    <CardDescription>
                      A partir de R$ 2.500,00 em até 96x
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Financie uma bicicleta elétrica usada com taxas diferenciadas.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleNavigate('/calculadoras/bicicleta-eletrica-usada')}
                    >
                      Simular
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-2 hover:border-primary hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Patinete Elétrico
                    </CardTitle>
                    <CardDescription>
                      A partir de R$ 1.000,00 em até 96x
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Financie seu patinete elétrico com parcelas que cabem no seu bolso.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleNavigate('/calculadoras/patinete-eletrico')}
                    >
                      Simular
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-2 hover:border-primary hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Baterias para Veículos
                    </CardTitle>
                    <CardDescription>
                      Parcelamento em até 24x com garantia
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Financie baterias para veículos elétricos com condições especiais.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleNavigate('/calculadoras/baterias')}
                    >
                      Simular
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="automoveis">
          <Card>
            <CardHeader>
              <CardTitle>Financiamentos de Automóveis</CardTitle>
              <CardDescription>
                Financiamentos para carros e motos com as melhores condições do mercado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2 hover:border-primary hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      Veículos Novos
                    </CardTitle>
                    <CardDescription>
                      Carros a partir de R$ 20.000,00 e motos a partir de R$ 6.500,00
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Financie seu veículo novo em até 96x com condições especiais.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleNavigate('/calculadoras/financiamento-veiculos')}
                    >
                      Simular
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-2 hover:border-primary hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      Veículos Usados
                    </CardTitle>
                    <CardDescription>
                      Parcelamento em até 48x
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Financie seu veículo usado com parcelas que cabem no seu orçamento.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleNavigate('/calculadoras/financiamento-veiculos-usados')}
                    >
                      Simular
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="imoveis">
          <Card>
            <CardHeader>
              <CardTitle>Financiamentos de Imóveis</CardTitle>
              <CardDescription>
                Financie seu imóvel com as melhores condições do mercado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2 hover:border-primary hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      Imóveis Residenciais
                    </CardTitle>
                    <CardDescription>
                      Casas e apartamentos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Simule o financiamento do seu imóvel residencial com condições especiais.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleNavigate('/calculadoras/financiamento-imoveis')}
                    >
                      Simular
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="produtos">
          <Card>
            <CardHeader>
              <CardTitle>Financiamentos de Produtos</CardTitle>
              <CardDescription>
                Financie diversos produtos com as melhores condições do mercado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2 hover:border-primary hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      Produtos Novos
                    </CardTitle>
                    <CardDescription>
                      Parcelamento em até 96x para múltiplos produtos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Financie seus produtos novos com parcelas que cabem no seu orçamento.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleNavigate('/calculadoras/produtos-novos')}
                    >
                      Simular
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-2 hover:border-primary hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      Produtos Usados
                    </CardTitle>
                    <CardDescription>
                      Parcelamento personalizado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Simule o financiamento de produtos usados com taxas diferenciadas.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleNavigate('/calculadoras/produtos-usados')}
                    >
                      Simular
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanciamentosPage;
