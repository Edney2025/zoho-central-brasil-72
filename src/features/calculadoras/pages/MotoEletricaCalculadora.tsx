
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useCalculadoraConfig } from '../hooks/useCalculadoraConfig';
import { BaseCalculadora } from '../components/BaseCalculadora';
import { getCalculadoraConfig } from '../config/calculadoras';
import { RefreshCcw, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

// Define o esquema do formulário com Zod
const formSchema = z.object({
  modelo: z.string().min(3, 'Nome do modelo é obrigatório'),
  valorMoto: z.coerce.number().min(3500, 'Valor mínimo é R$ 3.500,00'),
  parcelas: z.coerce.number().int().min(3, 'Mínimo de 3 parcelas'),
  percentualEntrada: z.coerce.number().min(0, 'Percentual de entrada não pode ser negativo'),
  valorEntrada: z.coerce.number().min(0, 'Valor da entrada não pode ser negativo'),
});

type FormValues = z.infer<typeof formSchema>;

const MotoEletricaCalculadora = () => {
  const { config } = useCalculadoraConfig();
  const [resultado, setResultado] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const calculadoraConfig = getCalculadoraConfig('moto-eletrica');
  
  if (!calculadoraConfig) {
    return <div>Configuração de calculadora não encontrada</div>;
  }
  
  // Configurar o formulário com valores padrão
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelo: '',
      valorMoto: 3500,
      parcelas: 12,
      percentualEntrada: 0,
      valorEntrada: 0,
    },
  });
  
  const valorMoto = form.watch('valorMoto') || 3500;
  const percentualEntrada = form.watch('percentualEntrada') || 0;
  
  // Atualizar valor da entrada quando o percentual ou valor da moto mudar
  useEffect(() => {
    const novoValorEntrada = (valorMoto * percentualEntrada) / 100;
    form.setValue('valorEntrada', novoValorEntrada);
  }, [percentualEntrada, valorMoto, form]);
  
  // Quando o valor da entrada é alterado manualmente, atualizar o percentual
  const handleEntradaChange = (novoValor: number) => {
    form.setValue('valorEntrada', novoValor);
    if (valorMoto > 0) {
      form.setValue('percentualEntrada', (novoValor / valorMoto) * 100);
    } else {
      form.setValue('percentualEntrada', 0);
    }
  };
  
  // Calcular taxa com base no percentual de entrada
  const calcularTaxaAdicional = (percentualEntrada: number): number => {
    if (percentualEntrada === 0) return 4; // 0% de entrada: taxa 4% a mais
    return 0; // Com entrada não há taxa adicional
  };
  
  // Calcular prazo de entrega com base no percentual de entrada
  const calcularPrazoEntrega = (percentualEntrada: number): number => {
    if (percentualEntrada === 0) return 150; // 0% de entrada: 150 dias
    if (percentualEntrada < 30) return 90;   // 15% de entrada: 90 dias
    if (percentualEntrada < 45) return 45;   // 30% de entrada: 45 dias
    return 30;                               // 45% ou mais: 30 dias
  };
  
  // Calcular resultado
  const handleSubmit = (values: FormValues) => {
    setIsCalculating(true);
    
    try {
      // Simular um atraso de processamento para mostrar o estado de carregamento
      setTimeout(() => {
        // Obter a taxa base de juros
        const taxaBase = 1.99; // Taxa base padrão (poderia vir de configuração)
        
        // Calcular taxa adicional com base na entrada
        const taxaAdicional = calcularTaxaAdicional(values.percentualEntrada);
        const taxaTotal = taxaBase + taxaAdicional;
        
        // Calcular prazo de entrega
        const prazoEntrega = calcularPrazoEntrega(values.percentualEntrada);
        
        // Valor financiado (valor total - entrada)
        const valorFinanciado = values.valorMoto - values.valorEntrada;
        
        // Calcular prestação usando a fórmula de juros compostos
        // PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
        // onde PMT = valor da parcela, P = principal, r = taxa de juros (mensal), n = número de parcelas
        const taxaMensal = taxaTotal / 100;
        const valorParcela = valorFinanciado * 
          (taxaMensal * Math.pow(1 + taxaMensal, values.parcelas)) / 
          (Math.pow(1 + taxaMensal, values.parcelas) - 1);
        
        // Calcular valor total
        const valorTotal = valorParcela * values.parcelas + values.valorEntrada;
        
        // Definir resultado
        setResultado({
          valorTotal: valorTotal,
          valorFinanciado: valorFinanciado,
          parcelas: values.parcelas,
          valorParcela: valorParcela,
          taxaJuros: taxaTotal,
          valorEntrada: values.valorEntrada,
          prazoEntrega: prazoEntrega
        });
        
        toast({
          title: "Simulação concluída",
          description: "Os valores foram calculados com sucesso.",
        });
        
        setIsCalculating(false);
      }, 500);
    } catch (error) {
      console.error('Erro ao calcular:', error);
      toast({
        title: "Erro na simulação",
        description: "Ocorreu um erro ao calcular os valores.",
        variant: "destructive"
      });
      setIsCalculating(false);
    }
  };
  
  // Reset do formulário
  const handleReset = () => {
    form.reset({
      modelo: '',
      valorMoto: 3500,
      parcelas: 12,
      percentualEntrada: 0,
      valorEntrada: 0,
    });
    setResultado(null);
  };
  
  // Definir opções de entrada pré-definidas
  const opcoesEntrada = [
    { valor: 0, label: "Sem entrada (+4% taxa)" },
    { valor: 15, label: "15% de entrada" },
    { valor: 30, label: "30% de entrada" },
    { valor: 45, label: "45% de entrada" }
  ];
  
  // Componente para renderizar um resumo personalizado na seção de resultado
  const renderResumo = () => {
    if (!resultado) return null;
    
    return (
      <div className="border rounded-lg p-4 space-y-3">
        <h4 className="font-medium">Detalhes do financiamento:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Modelo:</p>
            <p>{form.getValues('modelo')}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Valor do veículo:</p>
            <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorMoto)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Entrada:</p>
            <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resultado.valorEntrada)} 
               ({percentualEntrada.toFixed(0)}%)</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Valor financiado:</p>
            <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resultado.valorFinanciado)}</p>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 p-3 bg-primary/10 rounded-lg">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-medium">Prazo estimado de entrega:</span>
          </div>
          <Badge variant="outline" className="px-3 py-1 text-base">
            {resultado.prazoEntrega} dias
          </Badge>
        </div>
      </div>
    );
  };
  
  return (
    <BaseCalculadora
      config={calculadoraConfig}
      formValues={{
        modelo: form.getValues('modelo'),
        valorMoto: form.getValues('valorMoto'),
        parcelas: form.getValues('parcelas'),
        percentualEntrada: form.getValues('percentualEntrada'),
        valorEntrada: form.getValues('valorEntrada')
      }}
      resultado={resultado}
      titulo={form.getValues('modelo') || 'Moto Elétrica'}
      onSave={() => {
        toast({
          title: "Simulação salva",
          description: "A simulação foi salva com sucesso.",
        });
      }}
      isCalculating={isCalculating}
      showResultado={!!resultado}
      categoria="financiamentos"
      renderResumo={renderResumo}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="modelo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo da Moto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Sport 3000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="valorMoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor da Moto (R$)</FormLabel>
                  <FormDescription>
                    Valor mínimo: R$ 3.500,00
                  </FormDescription>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="3500" 
                      step="100" 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        // Recalcular a entrada quando o valor mudar
                        const novoValor = Number(e.target.value);
                        const novaEntrada = (novoValor * percentualEntrada) / 100;
                        form.setValue('valorEntrada', novaEntrada);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="percentualEntrada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opções de Entrada</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {opcoesEntrada.map(opcao => (
                      <Button
                        key={opcao.valor}
                        type="button"
                        variant={percentualEntrada === opcao.valor ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          form.setValue('percentualEntrada', opcao.valor);
                          form.setValue('valorEntrada', (valorMoto * opcao.valor) / 100);
                        }}
                      >
                        {opcao.label}
                      </Button>
                    ))}
                  </div>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Slider
                        min={0}
                        max={60}
                        step={1}
                        value={[field.value]}
                        onValueChange={(values) => {
                          field.onChange(values[0]);
                          const novaEntrada = (valorMoto * values[0]) / 100;
                          form.setValue('valorEntrada', novaEntrada);
                        }}
                        className="flex-1"
                      />
                      <div className="w-16 text-right">
                        {field.value.toFixed(0)}%
                      </div>
                    </div>
                  </FormControl>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>15%</span>
                    <span>30%</span>
                    <span>45%</span>
                    <span>60%</span>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="valorEntrada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor de Entrada (R$)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      step="50" 
                      {...field} 
                      onChange={(e) => {
                        const novoValor = parseFloat(e.target.value);
                        handleEntradaChange(isNaN(novoValor) ? 0 : novoValor);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="parcelas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Parcelas</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o número de parcelas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[3, 6, 9, 12, 18, 24, 36, 48, 60, 72, 84, 96].map((parcela) => (
                        <SelectItem key={parcela} value={parcela.toString()}>
                          {parcela}x
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              type="submit" 
              disabled={isCalculating} 
              className="w-full"
            >
              Calcular
            </Button>
            <Button 
              type="button"
              variant="outline"
              onClick={handleReset}
              className="w-full"
              disabled={isCalculating}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Limpar
            </Button>
          </div>
        </form>
      </Form>
    </BaseCalculadora>
  );
};

export default MotoEletricaCalculadora;
