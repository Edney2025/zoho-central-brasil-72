
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useSimulacoes } from '../hooks/useSimulacoes';
import { Loader2, Save, Clipboard, Calculator } from 'lucide-react';
import { CalculadoraConfig } from '../types';

export interface BaseCalculadoraProps {
  config: CalculadoraConfig;
  children: React.ReactNode;
  formValues: any;
  resultado: {
    valorTotal: number;
    parcelas?: number;
    valorParcela?: number;
    taxaJuros?: number;
  } | null;
  titulo: string;
  onSave?: () => void;
  isCalculating: boolean;
  showResultado: boolean;
  categoria: string;
  renderResumo?: () => React.ReactNode;
}

export const BaseCalculadora: React.FC<BaseCalculadoraProps> = ({
  config,
  children,
  formValues,
  resultado,
  titulo,
  onSave,
  isCalculating,
  showResultado,
  categoria,
  renderResumo
}) => {
  const { addSimulacao } = useSimulacoes();
  const [isSaving, setIsSaving] = useState(false);
  
  // Formatar valor como moeda
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  
  // Salvar simulação
  const handleSaveSimulacao = () => {
    if (!resultado) return;
    
    setIsSaving(true);
    
    try {
      addSimulacao({
        titulo: titulo,
        categoria: categoria,
        valorTotal: resultado.valorTotal,
        parcelas: resultado.parcelas,
        valorParcela: resultado.valorParcela,
        taxaJuros: resultado.taxaJuros,
        ...formValues
      });
      
      if (onSave) {
        onSave();
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{config.nome}</h1>
        <p className="text-muted-foreground">{config.descricao}</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <config.icone className="h-5 w-5" />
            Calculadora de {config.nome}
          </CardTitle>
          <CardDescription>
            Preencha os dados abaixo para simular {config.nome.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
        </CardContent>
      </Card>
      
      {showResultado && resultado && (
        <Card>
          <CardHeader>
            <CardTitle>Resultado da Simulação</CardTitle>
            <CardDescription>
              Detalhes do financiamento de {titulo}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="text-2xl font-bold">{formatarMoeda(resultado.valorTotal)}</p>
                </div>
                
                {resultado.parcelas && resultado.valorParcela && (
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Parcelas</p>
                    <p className="text-2xl font-bold">
                      {resultado.parcelas}x de {formatarMoeda(resultado.valorParcela)}
                    </p>
                  </div>
                )}
                
                {resultado.taxaJuros && (
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Taxa de Juros</p>
                    <p className="text-2xl font-bold">{resultado.taxaJuros.toFixed(2)}% a.m.</p>
                  </div>
                )}
              </div>
              
              {/* Resumo customizado da simulação, se fornecido */}
              {renderResumo && renderResumo()}
              
              <Alert>
                <Calculator className="h-4 w-4" />
                <AlertTitle>Simulação concluída</AlertTitle>
                <AlertDescription>
                  Esta é uma simulação e os valores podem variar. Consulte um de nossos atendentes para mais detalhes.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={() => {
                navigator.clipboard.writeText(
                  `Simulação: ${titulo}\n` +
                  `Valor Total: ${formatarMoeda(resultado.valorTotal)}\n` +
                  (resultado.parcelas && resultado.valorParcela ? `Parcelas: ${resultado.parcelas}x de ${formatarMoeda(resultado.valorParcela)}\n` : '') +
                  (resultado.taxaJuros ? `Taxa de Juros: ${resultado.taxaJuros.toFixed(2)}% a.m.\n` : '')
                );
              }}
            >
              <Clipboard className="mr-2 h-4 w-4" />
              Copiar resultado
            </Button>
            <Button 
              className="w-full sm:w-auto"
              onClick={handleSaveSimulacao}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar simulação
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {isCalculating && (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};
