
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CreditCard, Save } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const FinanceiroTab = () => {
  const [isDirty, setIsDirty] = useState(false);
  
  const handleChange = () => {
    setIsDirty(true);
  };
  
  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações financeiras foram atualizadas com sucesso."
    });
    setIsDirty(false);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações Financeiras</CardTitle>
        <CardDescription>
          Configure parâmetros financeiros, taxas e regras de cálculo para as calculadoras e simulações.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Taxas Padrão</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxa-padrao">Taxa de Juros Padrão (%)</Label>
              <Input id="taxa-padrao" type="number" defaultValue="1.99" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parcelas-max">Parcelas Máximas</Label>
              <Input id="parcelas-max" type="number" defaultValue="96" onChange={handleChange} />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-2">Veículos Elétricos</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="moto-eletrica-min">Valor Mínimo Moto Elétrica (R$)</Label>
              <Input id="moto-eletrica-min" type="number" defaultValue="3500" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bicicleta-eletrica-min">Valor Mínimo Bicicleta Elétrica (R$)</Label>
              <Input id="bicicleta-eletrica-min" type="number" defaultValue="2500" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patinete-eletrico-min">Valor Mínimo Patinete Elétrico (R$)</Label>
              <Input id="patinete-eletrico-min" type="number" defaultValue="1000" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxa-adicional-sem-entrada">Taxa Adicional Sem Entrada (%)</Label>
              <Input id="taxa-adicional-sem-entrada" type="number" defaultValue="4" onChange={handleChange} />
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <h4 className="font-medium">Prazos de Entrega</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prazo-sem-entrada">Sem Entrada (dias)</Label>
                <Input id="prazo-sem-entrada" type="number" defaultValue="150" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prazo-15-entrada">15% de Entrada (dias)</Label>
                <Input id="prazo-15-entrada" type="number" defaultValue="90" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prazo-30-entrada">30% de Entrada (dias)</Label>
                <Input id="prazo-30-entrada" type="number" defaultValue="45" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prazo-45-entrada">45% de Entrada (dias)</Label>
                <Input id="prazo-45-entrada" type="number" defaultValue="30" onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-2">Automóveis e Motos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carro-novo-min">Valor Mínimo Carro Novo (R$)</Label>
              <Input id="carro-novo-min" type="number" defaultValue="20000" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moto-nova-min">Valor Mínimo Moto Nova (R$)</Label>
              <Input id="moto-nova-min" type="number" defaultValue="6500" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parcelas-carro-usado">Parcelas Máximas Carro Usado</Label>
              <Input id="parcelas-carro-usado" type="number" defaultValue="48" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parcelas-moto-usada">Parcelas Máximas Moto Usada</Label>
              <Input id="parcelas-moto-usada" type="number" defaultValue="48" onChange={handleChange} />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-2">Produtos e Serviços</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="parcelas-produto-unico">Parcelas Máximas Produto Único</Label>
              <Input id="parcelas-produto-unico" type="number" defaultValue="48" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parcelas-multiplos-produtos">Parcelas Máximas Múltiplos Produtos</Label>
              <Input id="parcelas-multiplos-produtos" type="number" defaultValue="96" onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parcelas-servicos">Parcelas Máximas Serviços</Label>
              <Input id="parcelas-servicos" type="number" defaultValue="48" onChange={handleChange} />
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <h4 className="font-medium">Acréscimos para Garantia Estendida</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <Label htmlFor="garantia-6x" className="text-xs">6x</Label>
                <Input id="garantia-6x" type="number" defaultValue="5" size={4} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="garantia-12x" className="text-xs">12x</Label>
                <Input id="garantia-12x" type="number" defaultValue="6" size={4} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="garantia-18x" className="text-xs">18x</Label>
                <Input id="garantia-18x" type="number" defaultValue="7" size={4} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="garantia-24x" className="text-xs">24x</Label>
                <Input id="garantia-24x" type="number" defaultValue="8" size={4} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="garantia-30x" className="text-xs">30x</Label>
                <Input id="garantia-30x" type="number" defaultValue="9" size={4} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="garantia-33x" className="text-xs">33x</Label>
                <Input id="garantia-33x" type="number" defaultValue="10" size={4} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="garantia-36x" className="text-xs">36x</Label>
                <Input id="garantia-36x" type="number" defaultValue="11" size={4} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-center space-x-2">
          <Switch id="simular-automatico" />
          <Label htmlFor="simular-automatico">Simular automaticamente ao abrir calculadoras</Label>
        </div>
        
        <Button 
          className="w-full md:w-auto" 
          onClick={handleSave}
          disabled={!isDirty}
        >
          <Save className="mr-2 h-4 w-4" />
          Salvar Alterações
        </Button>
      </CardContent>
    </Card>
  );
};

export default FinanceiroTab;
