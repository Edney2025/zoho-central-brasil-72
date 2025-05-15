
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
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
import { useCalculadoraConfig } from '../hooks/useCalculadoraConfig';
import { BaseCalculadora } from '../components/BaseCalculadora';
import { getCalculadoraConfig } from '../config/calculadoras';
import { RefreshCcw, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
  tipoImovel: z.enum(['casa', 'apartamento', 'terreno', 'comercial'], {
    required_error: 'Tipo de imóvel é obrigatório',
  }),
  valorImovel: z.coerce.number().min(50000, 'O valor mínimo é R$ 50.000,00'),
  valorEntrada: z.coerce.number().min(0, 'Valor não pode ser negativo'),
  prazo: z.coerce.number().int().min(60, 'Prazo mínimo de 60 meses').max(420, 'Prazo máximo de 420 meses'),
  taxaJuros: z.coerce.number().min(0.1, 'Taxa deve ser maior que 0.1').max(20, 'Taxa deve ser menor que 20'),
  rendaMensal: z.coerce.number().min(0, 'Renda não pode ser negativa'),
});

type FormValues = z.infer<typeof formSchema>;

const FinanciamentoImoveisCalculadora: React.FC = () => {
  const { config } = useCalculadoraConfig();
  const [resultado, setResultado] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [percentualEntrada, setPercentualEntrada] = useState(20); // 20% entrada padrão
  const calculadoraConfig = getCalculadoraConfig('financiamento-imoveis');
  
  if (!calculadoraConfig) {
    return <div>Configuração de calculadora não encontrada</div>;
  }
  
  // Configurar o formulário com valores padrão
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoImovel: 'apartamento',
      valorImovel: 300000,
      valorEntrada: 60000,
      prazo: 240,
      taxaJuros: 9.5,
      rendaMensal: 5000,
    },
  });
  
  const valorImovel = form.watch('valorImovel') || 0;
  const rendaMensal = form.watch('rendaMensal') || 0;
  
  // Recalcular o valor da entrada quando o percentual muda
  useEffect(() => {
    const novoValorEntrada = (valorImovel * percentualEntrada) / 100;
    form.setValue('valorEntrada', novoValorEntrada);
  }, [percentualEntrada, valorImovel, form]);
  
  // Quando o valor da entrada é alterado, atualiza o percentual
  const handleEntradaChange = (novoValor: number) => {
    form.setValue('valorEntrada', novoValor);
    if (valorImovel > 0) {
      setPercentualEntrada((novoValor / valorImovel) * 100);
    } else {
      setPercentualEntrada(0);
    }
  };
  
  // Calcular resultado
  const handleSubmit = (values: FormValues) => {
    setIsCalculating(true);
    
    try {
      // Simular um atraso de processamento para mostrar o estado de carregamento
      setTimeout(() => {
        // Valor financiado
        const valorFinanciado = values.valorImovel - values.valorEntrada;
        
        // Taxa de juros mensal (anual / 12)
        const taxaMensal = values.taxaJuros / 12 / 100;
        
        // Cálculo da parcela (Sistema de Amortização Francesa)
        const parcela = valorFinanciado * 
          (taxaMensal * Math.pow(1 + taxaMensal, values.prazo)) /
          (Math.pow(1 + taxaMensal, values.prazo) - 1);
        
        // Cálculo do CET (Custo Efetivo Total) - simplificado
        const cet = values.taxaJuros + 2.5; // Taxa + custos administrativos estimados
        
        // Comprometimento da renda
        const comprometimentoRenda = (parcela / values.rendaMensal) * 100;
        
        // Valor total do financiamento
        const valorTotal = parcela * values.prazo + values.valorEntrada;
        
        // Definir resultado
        setResultado({
          valorTotal,
          parcelas: values.prazo,
          valorParcela: parcela,
          taxaJuros: values.taxaJuros,
          valorFinanciado,
          valorEntrada: values.valorEntrada,
          valorImovel: values.valorImovel,
          cet,
          comprometimentoRenda
        });
        
        setIsCalculating(false);
      }, 700);
    } catch (error) {
      console.error('Erro ao calcular:', error);
      setIsCalculating(false);
    }
  };
  
  // Reset do formulário
  const handleReset = () => {
    form.reset();
    setResultado(null);
    setPercentualEntrada(20);
  };
  
  // Componente para renderizar um resumo personalizado na seção de resultado
  const renderResumo = () => {
    if (!resultado) return null;
    
    const formatarMoeda = (valor: number) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    };
    
    const formatarPrazo = (meses: number) => {
      const anos = Math.floor(meses / 12);
      const mesesRestantes = meses % 12;
      
      if (anos > 0 && mesesRestantes > 0) {
        return `${anos} anos e ${mesesRestantes} meses`;
      } else if (anos > 0) {
        return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
      } else {
        return `${mesesRestantes} meses`;
      }
    };
    
    return (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 space-y-2">
          <h4 className="font-medium">Detalhes do financiamento:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Valor do imóvel:</p>
              <p>{formatarMoeda(resultado.valorImovel)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor financiado:</p>
              <p>{formatarMoeda(resultado.valorFinanciado)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Entrada:</p>
              <p>{formatarMoeda(resultado.valorEntrada)} ({percentualEntrada.toFixed(1)}%)</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prazo de pagamento:</p>
              <p>{formatarPrazo(resultado.parcelas)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CET (Custo Efetivo Total):</p>
              <p>{resultado.cet.toFixed(2)}% a.a.</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Comprometimento de renda:</p>
              <p className={resultado.comprometimentoRenda > 30 ? "text-red-500 font-medium" : ""}>
                {resultado.comprometimentoRenda.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
        
        {resultado.comprometimentoRenda > 30 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              O comprometimento da renda mensal está acima de 30%, o que pode dificultar a aprovação do financiamento.
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  };
  
  return (
    <BaseCalculadora
      config={calculadoraConfig}
      formValues={{
        tipoImovel: form.getValues('tipoImovel'),
        valorImovel: form.getValues('valorImovel'),
        valorEntrada: form.getValues('valorEntrada'),
        prazo: form.getValues('prazo'),
        rendaMensal: form.getValues('rendaMensal'),
        taxaJuros: form.getValues('taxaJuros')
      }}
      resultado={resultado}
      titulo={`Financiamento de ${form.getValues('tipoImovel')}`}
      onSave={() => form.reset()}
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
              name="tipoImovel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Imóvel</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de imóvel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="apartamento">Apartamento</SelectItem>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="terreno">Terreno</SelectItem>
                      <SelectItem value="comercial">Imóvel Comercial</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="valorImovel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do Imóvel (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" min="50000" step="1000" {...field} />
                  </FormControl>
                  <FormDescription>
                    Valor mínimo: R$ 50.000,00
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="valorEntrada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Entrada ({percentualEntrada.toFixed(1)}%): 
                    {' '}
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(field.value)}
                  </FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={valorImovel}
                      step={valorImovel / 100}
                      value={[field.value]}
                      onValueChange={(values) => handleEntradaChange(values[0])}
                      disabled={valorImovel <= 0}
                    />
                  </FormControl>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                  </div>
                  <FormDescription>
                    Recomendado: ao menos 20%
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="prazo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prazo (meses)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="60" 
                        max="420" 
                        step="12" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Entre 60 (5 anos) e 420 (35 anos)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="taxaJuros"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taxa de juros anual (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0.1" 
                        max="20" 
                        step="0.1" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="rendaMensal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Renda mensal familiar (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="100" {...field} />
                  </FormControl>
                  <FormDescription>
                    Para análise de comprometimento de renda
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button type="submit" disabled={isCalculating} className="w-full">
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

export default FinanciamentoImoveisCalculadora;
