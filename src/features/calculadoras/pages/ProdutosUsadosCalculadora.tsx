
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
import { RefreshCcw } from 'lucide-react';

// Define o esquema do formulário com Zod
const formSchema = z.object({
  nome: z.string().min(3, 'Nome do produto é obrigatório'),
  valorUnitario: z.coerce.number().positive('Valor deve ser positivo'),
  quantidade: z.coerce.number().int().positive('Quantidade deve ser positiva'),
  estado: z.enum(['bom', 'medio', 'ruim'], {
    required_error: 'Estado do produto é obrigatório',
  }),
  parcelas: z.coerce.number().int().min(1, 'Número de parcelas é obrigatório'),
  valorEntrada: z.coerce.number().min(0, 'Valor da entrada não pode ser negativo'),
});

type FormValues = z.infer<typeof formSchema>;

const ProdutosUsadosCalculadora = () => {
  const { config, getTaxaJuros, calcularPrestacao } = useCalculadoraConfig();
  const [resultado, setResultado] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [percentualEntrada, setPercentualEntrada] = useState(0);
  const calculadoraConfig = getCalculadoraConfig('produtos-usados');
  
  if (!calculadoraConfig) {
    return <div>Configuração de calculadora não encontrada</div>;
  }
  
  // Configurar o formulário com valores padrão
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      valorUnitario: 0,
      quantidade: 1,
      estado: 'bom',
      parcelas: 12,
      valorEntrada: 0,
    },
  });
  
  const valorUnitario = form.watch('valorUnitario') || 0;
  const quantidade = form.watch('quantidade') || 1;
  const valorTotal = valorUnitario * quantidade;
  
  // Recalcula o valor da entrada quando o percentual ou valor total mudam
  useEffect(() => {
    const novoValorEntrada = (valorTotal * percentualEntrada) / 100;
    form.setValue('valorEntrada', novoValorEntrada);
  }, [percentualEntrada, valorTotal, form]);
  
  // Quando o valor da entrada é alterado, atualiza o percentual
  const handleEntradaChange = (novoValor: number) => {
    form.setValue('valorEntrada', novoValor);
    if (valorTotal > 0) {
      setPercentualEntrada((novoValor / valorTotal) * 100);
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
        // Obter a taxa de juros específica para produtos usados
        const taxaBase = getTaxaJuros('produtos');
        let taxaJuros = taxaBase;
        
        // Ajustar taxa com base no estado do produto usado
        switch (values.estado) {
          case 'bom':
            // Estado bom usa a taxa base
            break;
          case 'medio':
            // Estado médio tem um acréscimo na taxa
            taxaJuros = taxaBase + 0.5;
            break;
          case 'ruim':
            // Estado ruim tem um acréscimo maior na taxa
            taxaJuros = taxaBase + 1.0;
            break;
        }
        
        // Calcular valor total sem entrada
        const valorTotal = values.valorUnitario * values.quantidade;
        
        // Calcular prestação
        const { valorParcela, valorTotalComJuros } = calcularPrestacao(
          valorTotal,
          values.parcelas,
          taxaJuros,
          values.valorEntrada
        );
        
        // Definir resultado
        setResultado({
          valorTotal: valorTotalComJuros,
          valorFinanciado: valorTotal - values.valorEntrada,
          parcelas: values.parcelas,
          valorParcela: valorParcela,
          taxaJuros: taxaJuros,
          valorEntrada: values.valorEntrada
        });
        
        setIsCalculating(false);
      }, 500);
    } catch (error) {
      console.error('Erro ao calcular:', error);
      setIsCalculating(false);
    }
  };
  
  // Reset do formulário
  const handleReset = () => {
    form.reset({
      nome: '',
      valorUnitario: 0,
      quantidade: 1,
      estado: 'bom',
      parcelas: 12,
      valorEntrada: 0,
    });
    setPercentualEntrada(0);
    setResultado(null);
  };
  
  // Componente para renderizar um resumo personalizado na seção de resultado
  const renderResumo = () => {
    if (!resultado) return null;
    
    return (
      <div className="border rounded-lg p-4 space-y-2">
        <h4 className="font-medium">Detalhes da simulação:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="text-sm text-muted-foreground">Produto:</p>
            <p>{form.getValues('nome')}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Estado:</p>
            <p>{form.getValues('estado') === 'bom' ? 'Bom' : form.getValues('estado') === 'medio' ? 'Médio' : 'Ruim'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Valor do produto:</p>
            <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Entrada:</p>
            <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resultado.valorEntrada)} ({percentualEntrada.toFixed(0)}%)</p>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <BaseCalculadora
      config={calculadoraConfig}
      formValues={{
        nome: form.getValues('nome'),
        quantidade: form.getValues('quantidade'),
        valorUnitario: form.getValues('valorUnitario'),
        estado: form.getValues('estado'),
        valorEntrada: form.getValues('valorEntrada')
      }}
      resultado={resultado}
      titulo={form.getValues('nome') || 'Produto usado'}
      onSave={() => form.reset()}
      isCalculating={isCalculating}
      showResultado={!!resultado}
      categoria="produtos"
      renderResumo={renderResumo}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Smartphone usado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="valorUnitario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor unitário (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="quantidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado do produto</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado do produto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bom">Bom estado</SelectItem>
                      <SelectItem value="medio">Estado médio</SelectItem>
                      <SelectItem value="ruim">Estado ruim</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="parcelas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de parcelas</FormLabel>
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
                      {config.parcelasDisponiveis.filter(p => p <= config.parcelasMax).map((parcela) => (
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
            
            <FormField
              control={form.control}
              name="valorEntrada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Entrada ({percentualEntrada.toFixed(0)}%): 
                    {' '}
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(field.value)}
                  </FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={valorTotal}
                      step={valorTotal / 100}
                      value={[field.value]}
                      onValueChange={(values) => handleEntradaChange(values[0])}
                      disabled={valorTotal <= 0}
                    />
                  </FormControl>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
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

export default ProdutosUsadosCalculadora;
