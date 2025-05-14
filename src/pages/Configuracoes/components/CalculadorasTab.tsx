
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Calculator } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CalculadorasTab = () => {
  const [calculadorasAtivas, setCalculadorasAtivas] = useState({
    produtosNovos: true,
    produtosUsados: true,
    transportes: true,
    emprestimos: true,
    renegociacao: true,
    garantias: true,
    frete: true,
    utilitarios: true
  });

  const handleCalculatorToggle = (calculator) => {
    setCalculadorasAtivas(prev => ({
      ...prev,
      [calculator]: !prev[calculator]
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As preferências do sistema foram atualizadas com sucesso."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuração das Calculadoras</CardTitle>
        <CardDescription>
          Ative ou desative calculadoras e defina suas configurações específicas.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-6">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">Produtos Novos</p>
              <p className="text-sm text-muted-foreground">Calculadoras para produtos novos com e sem entrada</p>
            </div>
            <Switch 
              checked={calculadorasAtivas.produtosNovos} 
              onCheckedChange={() => handleCalculatorToggle('produtosNovos')} 
            />
          </div>
          
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">Produtos Usados</p>
              <p className="text-sm text-muted-foreground">Calculadoras para produtos usados com e sem entrada</p>
            </div>
            <Switch 
              checked={calculadorasAtivas.produtosUsados} 
              onCheckedChange={() => handleCalculatorToggle('produtosUsados')} 
            />
          </div>
          
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">Transportes</p>
              <p className="text-sm text-muted-foreground">Automóveis, bicicletas elétricas, patinetes</p>
            </div>
            <Switch 
              checked={calculadorasAtivas.transportes} 
              onCheckedChange={() => handleCalculatorToggle('transportes')} 
            />
          </div>
          
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">Empréstimos</p>
              <p className="text-sm text-muted-foreground">Empréstimos parcelados e de parcela única</p>
            </div>
            <Switch 
              checked={calculadorasAtivas.emprestimos} 
              onCheckedChange={() => handleCalculatorToggle('emprestimos')} 
            />
          </div>
          
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">Renegociação</p>
              <p className="text-sm text-muted-foreground">Parcelas atrasadas, a vencer e total</p>
            </div>
            <Switch 
              checked={calculadorasAtivas.renegociacao} 
              onCheckedChange={() => handleCalculatorToggle('renegociacao')} 
            />
          </div>
          
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">Garantias Estendidas</p>
              <p className="text-sm text-muted-foreground">Produtos nacionais, importados, bicicletas</p>
            </div>
            <Switch 
              checked={calculadorasAtivas.garantias} 
              onCheckedChange={() => handleCalculatorToggle('garantias')} 
            />
          </div>
          
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-medium">Frete</p>
              <p className="text-sm text-muted-foreground">Caminhão, carro, moto, retirada</p>
            </div>
            <Switch 
              checked={calculadorasAtivas.frete} 
              onCheckedChange={() => handleCalculatorToggle('frete')} 
            />
          </div>
          
          <div className="flex items-center justify-between pb-3">
            <div>
              <p className="font-medium">Utilitários</p>
              <p className="text-sm text-muted-foreground">Conversor de moedas e outras utilidades</p>
            </div>
            <Switch 
              checked={calculadorasAtivas.utilitarios} 
              onCheckedChange={() => handleCalculatorToggle('utilitarios')} 
            />
          </div>
        </div>
        
        <Button onClick={handleSaveSettings} className="mt-4">Salvar Preferências</Button>
      </CardContent>
    </Card>
  );
};

export default CalculadorasTab;
