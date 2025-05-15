
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
import { Checkbox } from '@/components/ui/checkbox';
import { useCalculadoraConfig } from '../hooks/useCalculadoraConfig';
import { BaseCalculadora } from '../components/BaseCalculadora';
import { getCalculadoraConfig } from '../config/calculadoras';
import { RefreshCcw, Car } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Define o esquema do formulário com Zod
const formSchema = z.object({
  tipoVeiculo: z.enum(['carro', 'moto', 'caminhao', 'outro'], {
    required_error: 'Tipo de veículo é obrigatório',
  }),
  valorVeiculo: z.coerce.number().min(1000, 'O valor mínimo é R$ 1.000,00'),
  valorEntrada: z.coerce.number().min(0, 'Valor não pode ser negativo'),
  prazo: z.coerce.number().int().min(12, 'Prazo mínimo de 12 meses').max(84, 'Prazo máximo de 84 meses'),
  taxaJuros: z.coerce.number().min(0.1, 'Taxa deve ser maior que 0.1').max(30, 'Taxa deve ser menor que 30'),
  incluirSeguro: z.boolean().default(false),
  incluirGarantiaEstendida: z.boolean().default(false),
  rendaMensal: z.coerce.number().min(0, 'Renda não pode ser negativa'),
});

type FormValues = z.infer<typeof formSchema>;

const FinanciamentoVeiculosCalculadora = () => {
  const { config } = useCalculadoraConfig();
  const [resultado, setResultado] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [percentualEntrada, setPercentualEntrada] = useState(20); // 20% entrada padrão
  const calculadoraConfig = getCalculadoraConfig('financiamento-veiculos');
  
  if (!calculadoraConfig) {
    return <div>Configuração de calculadora não encontrada</div>;
  }
  
  // Configurar o formulário com valores padrão
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoVeiculo: 'carro',
      valorVeiculo: 50000,
      valorEntrada: 10000,
      prazo: 48,
      taxaJuros: 12.9,
      incluirSeguro: false,
      incluirGarantiaEstendida: false,
      rendaMensal: 4000,
    },
  });
  
  const valorVeiculo = form.watch('valorVeiculo') || 0;
  const rendaMensal = form.watch('rendaMensal') || 0;
  const incluirSeguro = form.watch('incluirSeguro');
  const incluirGarantiaEstendida = form.watch('incluirGarantiaEstendida');
  
  // Recalcular o valor da entrada quando o percentual muda
  useEffect(() => {
    const novoValorEntrada = Math.round((valorVeiculo * percentualEntrada) / 100);
    form.setValue('valorEntrada', novoValorEntrada);
  }, [percentualEntrada, valorVeiculo, form]);
  
  // Quando o valor da entrada é alterado, atualiza o percentual
  const handleEntradaChange = (novoValor: number) => {
    form.setValue('valorEntrada', novoValor);
    if (valorVeiculo > 0) {
      setPercentualEntrada((novoValor / valorVeiculo) * 100);
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
        const valorFinanciado = values.valorVeiculo - values.valorEntrada;
        
        // Taxa de juros mensal (anual / 12)
        const taxaMensal = values.taxaJuros / 12 / 100;
        
        // Calcular valor do seguro (se aplicável)
        const taxaSeguro = 0.035; // 3.5% do valor do veículo ao ano
        const valorSeguroAnual = values.incluirSeguro ? values.valorVeiculo * taxaSeguro : 0;
        const valorSeguroMensal = valorSeguroAnual / 12;
        
        // Calcular valor da garantia estendida (se aplicável)
        const taxaGarantia = 0.05; // 5% do valor do veículo
        const valorGarantia = values.incluirGarantiaEstendida ? values.valorVeiculo * taxaGarantia : 0;
        const valorGarantiaMensal = values.prazo > 0 ? valorGarantia / values.prazo : 0;
        
        // Cálculo da parcela (Sistema de Amortização Francesa)
        const parcela = valorFinanciado * 
          (taxaMensal * Math.pow(1 + taxaMensal, values.prazo)) /
          (Math.pow(1 + taxaMensal, values.prazo) - 1);
        
        // Parcela com adicionais
        const parcelaTotal = parcela + valorSeguroMensal + valorGarantiaMensal;
        
        // Cálculo do CET (Custo Efetivo Total) - simplificado
        const cet = values.taxaJuros + 3.2; // Taxa + custos administrativos estimados
        
        // Comprometimento da renda
        const comprometimentoRenda = (parcelaTotal / values.rendaMensal) * 100;
        
        // Valor total do financiamento
        const valorTotal = parcelaTotal * values.prazo + values.valorEntrada;
        
        // Definir resultado
        setResultado({
          valorTotal,
          parcelas: values.prazo,
          valorParcela: parcelaTotal,
          valorParcelaSemAdicionais: parcela,
          taxaJuros: values.taxaJuros,
          valorFinanciado,
          valorEntrada: values.valorEntrada,
          valorVeiculo: values.valorVeiculo,
          valorSeguroMensal,
          valorGarantiaMensal,
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
              <p className="text-sm text-muted-foreground">Valor do veículo:</p>
              <p>{formatarMoeda(resultado.valorVeiculo)}</p>
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

          {(incluirSeguro || incluirGarantiaEstendida) && (
            <>
              <h4 className="font-medium mt-4">Detalhamento da parcela:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Parcela do financiamento:</p>
                  <p>{formatarMoeda(resultado.valorParcelaSemAdicionais)}</p>
                </div>
                {incluirSeguro && (
                  <div>
                    <p className="text-sm text-muted-foreground">Seguro mensal:</p>
                    <p>{formatarMoeda(resultado.valorSeguroMensal)}</p>
                  </div>
                )}
                {incluirGarantiaEstendida && (
                  <div>
                    <p className="text-sm text-muted-foreground">Garantia estendida mensal:</p>
                    <p>{formatarMoeda(resultado.valorGarantiaMensal)}</p>
                  </div>
                )}
                <div className="font-medium">
                  <p className="text-sm text-muted-foreground">Parcela total:</p>
                  <p>{formatarMoeda(resultado.valorParcela)}</p>
                </div>
              </div>
            </>
          )}
        </div>
        
        {resultado.comprometimentoRenda > 30 && (
          <Alert variant="warning">
            <Car className="h-4 w-4" />
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
        tipoVeiculo: form.getValues('tipoVeiculo'),
        valorVeiculo: form.getValues('valorVeiculo'),
        valorEntrada: form.getValues('valorEntrada'),
        prazo: form.getValues('prazo'),
        rendaMensal: form.getValues('rendaMensal'),
        taxaJuros: form.getValues('taxaJuros'),
        incluirSeguro: form.getValues('incluirSeguro'),
        incluirGarantiaEstendida: form.getValues('incluirGarantiaEstendida')
      }}
      resultado={resultado}
      titulo={`Financiamento de ${form.getValues('tipoVeiculo')}`}
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
              name="tipoVeiculo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Veículo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de veículo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="carro">Carro</SelectItem>
                      <SelectItem value="moto">Moto</SelectItem>
                      <SelectItem value="caminhao">Caminhão</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="valorVeiculo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do Veículo (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1000" step="1000" {...field} />
                  </FormControl>
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
                      max={valorVeiculo}
                      step={valorVeiculo / 100}
                      value={[field.value]}
                      onValueChange={(values) => handleEntradaChange(values[0])}
                      disabled={valorVeiculo <= 0}
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
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o prazo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="12">12 meses (1 ano)</SelectItem>
                        <SelectItem value="24">24 meses (2 anos)</SelectItem>
                        <SelectItem value="36">36 meses (3 anos)</SelectItem>
                        <SelectItem value="48">48 meses (4 anos)</SelectItem>
                        <SelectItem value="60">60 meses (5 anos)</SelectItem>
                        <SelectItem value="72">72 meses (6 anos)</SelectItem>
                        <SelectItem value="84">84 meses (7 anos)</SelectItem>
                      </SelectContent>
                    </Select>
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
                        max="30" 
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
                  <FormLabel>Renda mensal (R$)</FormLabel>
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
            
            <div className="border rounded-md p-4 space-y-4">
              <h3 className="font-medium">Opcionais</h3>
              
              <FormField
                control={form.control}
                name="incluirSeguro"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Incluir seguro do veículo</FormLabel>
                      <FormDescription>
                        Adiciona 3,5% do valor do veículo ao ano
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="incluirGarantiaEstendida"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Incluir garantia estendida</FormLabel>
                      <FormDescription>
                        Adiciona 5% do valor do veículo
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
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

export default FinanciamentoVeiculosCalculadora;
