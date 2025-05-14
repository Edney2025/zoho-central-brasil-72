
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Bike, Car, Battery, ShoppingCart, Box } from 'lucide-react';

const calculadoras = [
  { id: 'moto-eletrica', nome: 'Moto Elétrica', icon: Calculator },
  { id: 'bicicleta-nova', nome: 'Bicicleta Elétrica Nova', icon: Bike },
  { id: 'bicicleta-usada', nome: 'Bicicleta Elétrica Usada', icon: Bike },
  { id: 'patinete', nome: 'Patinete Elétrico', icon: Bike },
  { id: 'baterias', nome: 'Baterias para Bicicleta', icon: Battery },
  { id: 'automoveis', nome: 'Financiamento de Automóveis e Motos', icon: Car },
  { id: 'produtos-novos', nome: 'Financiamento de Produtos Novos', icon: ShoppingCart },
  { id: 'produtos-usados', nome: 'Financiamento de Produtos Usados', icon: Box }
];

const CalculadorasPage = () => {
  const [calculadoraAtiva, setCalculadoraAtiva] = useState('moto-eletrica');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Calculadoras Financeiras</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Selecione uma Calculadora</CardTitle>
              <CardDescription>8 calculadoras disponíveis</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                {calculadoras.map((calc) => (
                  <button
                    key={calc.id}
                    className={`flex items-center gap-3 px-4 py-3 text-start hover:bg-accent ${
                      calculadoraAtiva === calc.id ? 'bg-accent/50 font-medium' : ''
                    }`}
                    onClick={() => setCalculadoraAtiva(calc.id)}
                  >
                    <calc.icon className="h-5 w-5" />
                    <span>{calc.nome}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                {calculadoras.find((c) => c.id === calculadoraAtiva)?.nome}
              </CardTitle>
              <CardDescription>
                Preencha os campos abaixo para calcular o financiamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center">
                <p className="text-muted-foreground">
                  Implementação da calculadora {calculadoraAtiva} virá aqui.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalculadorasPage;
