import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { BaseCalculadora } from '../components/BaseCalculadora';
import { getCalculadoraConfig } from '../config/calculadoras';
import { RefreshCcw, ArrowLeftRight, AlertTriangle } from 'lucide-react';

// Define o esquema do formulário com Zod
const formSchema = z.object({
  valor: z.coerce.number().positive('Valor deve ser positivo'),
  moedaOrigem: z.string().min(3, 'Selecione a moeda de origem'),
  moedaDestino: z.string().min(3, 'Selecione a moeda de destino'),
});

type FormValues = z.infer<typeof formSchema>;

// Cotações fictícias (em um app real, estas viriam de uma API)
const cotacoes = {
  BRL: { USD: 0.201, EUR: 0.187, GBP: 0.157, JPY: 30.15, ARS: 78.35, CLP: 191.38 },
  USD: { BRL: 4.978, EUR: 0.935, GBP: 0.784, JPY: 149.9, ARS: 389.81, CLP: 952.67 },
  EUR: { BRL: 5.356, USD: 1.070, GBP: 0.840, JPY: 160.7, ARS: 417.98, CLP: 1019.9 },
  GBP: { BRL: 6.373, USD: 1.276, EUR: 1.191, JPY: 191.4, ARS: 497.70, CLP: 1215.0 },
  JPY: { BRL: 0.033, USD: 0.007, EUR: 0.006, GBP: 0.005, ARS: 2.598, CLP: 6.345 },
  ARS: { BRL: 0.013, USD: 0.003, EUR: 0.002, GBP: 0.002, JPY: 0.385, CLP: 2.444 },
  CLP: { BRL: 0.005, USD: 0.001, EUR: 0.001, GBP: 0.001, JPY: 0.158, ARS: 0.409 }
};

// Nomes completos das moedas
const nomesMoedas = {
  BRL: 'Real Brasileiro',
  USD: 'Dólar Americano',
  EUR: 'Euro',
  GBP: 'Libra Esterlina',
  JPY: 'Iene Japonês',
  ARS: 'Peso Argentino',
  CLP: 'Peso Chileno'
};

// Símbolos das moedas
const simbolosMoedas = {
  BRL: 'R$',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  ARS: '$',
  CLP: '$'
};

const ConversaoMoedasCalculadora: React.FC = () => {
  const [resultado, setResultado] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [cotacoesAtualizadas, setCotacoesAtualizadas] = useState<string | null>(null);
  const calculadoraConfig = getCalculadoraConfig('conversao-moedas');
  
  if (!calculadoraConfig) {
    return <div>Configuração de calculadora não encontrada</div>;
  }

  // Configuração do formulário
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      valor: 1000,
      moedaOrigem: 'BRL',
      moedaDestino: 'USD',
    },
  });
  
  // Atualizar a data de atualização das cotações (simulação)
  useEffect(() => {
    const dataAtual = new Date();
    const formatoData = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    setCotacoesAtualizadas(formatoData.format(dataAtual));
  }, []);
  
  // Observar valores do formulário
  const moedaOrigem = form.watch('moedaOrigem');
  const moedaDestino = form.watch('moedaDestino');
  
  // Inverter moedas
  const inverterMoedas = () => {
    const origem = form.getValues('moedaOrigem');
    const destino = form.getValues('moedaDestino');
    form.setValue('moedaOrigem', destino);
    form.setValue('moedaDestino', origem);
  };
  
  // Calcular conversão
  const handleSubmit = (values: FormValues) => {
    setIsCalculating(true);
    
    try {
      // Simular um atraso para mostrar o estado de carregamento
      setTimeout(() => {
        if (values.moedaOrigem === values.moedaDestino) {
          // Mesma moeda
          setResultado({
            valorOriginal: values.valor,
            valorConvertido: values.valor,
            taxa: 1,
            moedaOrigem: values.moedaOrigem,
            moedaDestino: values.moedaDestino,
            cotacaoData: cotacoesAtualizadas
          });
        } else {
          // Obter taxa de conversão
          const taxa = cotacoes[values.moedaOrigem as keyof typeof cotacoes][values.moedaDestino as keyof typeof cotacoes[keyof typeof cotacoes]];
          
          // Calcular valor convertido
          const valorConvertido = values.valor * taxa;
          
          // Definir resultado
          setResultado({
            valorOriginal: values.valor,
            valorConvertido,
            taxa,
            moedaOrigem: values.moedaOrigem,
            moedaDestino: values.moedaDestino,
            cotacaoData: cotacoesAtualizadas
          });
        }
        
        setIsCalculating(false);
      }, 500);
    } catch (error) {
      console.error('Erro ao calcular conversão:', error);
      setIsCalculating(false);
    }
  };
  
  // Reset do formulário
  const handleReset = () => {
    form.reset();
    setResultado(null);
  };
  
  // Formatação de moeda de acordo com o código
  const formatarMoeda = (valor: number, codigoMoeda: string) => {
    // Obter o símbolo da moeda
    const simbolo = simbolosMoedas[codigoMoeda as keyof typeof simbolosMoedas] || '';
    
    // Definir número de casas decimais baseado na moeda
    let casasDecimais = 2;
    if (codigoMoeda === 'JPY') casasDecimais = 0; // Iene japonês normalmente não usa decimais
    if (codigoMoeda === 'CLP') casasDecimais = 0; // Peso chileno não usa decimais
    
    return `${simbolo} ${valor.toLocaleString(undefined, { 
      minimumFractionDigits: casasDecimais, 
      maximumFractionDigits: casasDecimais 
    })}`;
  };
  
  // Renderizar resultado customizado
  const renderResumo = () => {
    if (!resultado) return null;
    
    return (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <p className="text-sm text-muted-foreground">De {nomesMoedas[resultado.moedaOrigem as keyof typeof nomesMoedas]} ({resultado.moedaOrigem})</p>
              <p className="text-2xl font-bold">{formatarMoeda(resultado.valorOriginal, resultado.moedaOrigem)}</p>
            </div>
            <ArrowLeftRight className="hidden md:block h-6 w-6 text-muted-foreground mx-4" />
            <div className="mt-2 md:mt-0 flex items-center md:text-right">
              <p className="text-sm text-muted-foreground">Para {nomesMoedas[resultado.moedaDestino as keyof typeof nomesMoedas]} ({resultado.moedaDestino})</p>
              <p className="text-2xl font-bold text-primary">{formatarMoeda(resultado.valorConvertido, resultado.moedaDestino)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Taxa de conversão</p>
              <p className="font-medium">
                1 {resultado.moedaOrigem} = {resultado.taxa.toFixed(4)} {resultado.moedaDestino}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cotação atualizada em</p>
              <p className="font-medium">{cotacoesAtualizadas}</p>
            </div>
          </div>
        </div>
        
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Aviso importante</AlertTitle>
          <AlertDescription>
            As taxas de conversão são apenas para fins de simulação e podem variar no momento da transação.
          </AlertDescription>
        </Alert>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{calculadoraConfig.nome}</h1>
        <p className="text-muted-foreground">{calculadoraConfig.descricao}</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <calculadoraConfig.icone className="h-5 w-5" />
            Conversor de Moedas
          </CardTitle>
          <CardDescription>
            Converta valores entre diferentes moedas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor a converter</FormLabel>
                      <FormControl>
                        <Input type="number" min="0.01" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-col md:flex-row items-center gap-3">
                  <FormField
                    control={form.control}
                    name="moedaOrigem"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full">
                        <FormLabel>De</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a moeda de origem" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.keys(cotacoes).map(moeda => (
                              <SelectItem key={moeda} value={moeda}>
                                {moeda} - {nomesMoedas[moeda as keyof typeof nomesMoedas]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="mt-6"
                    onClick={inverterMoedas}
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                  
                  <FormField
                    control={form.control}
                    name="moedaDestino"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full">
                        <FormLabel>Para</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a moeda de destino" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.keys(cotacoes).map(moeda => (
                              <SelectItem key={moeda} value={moeda}>
                                {moeda} - {nomesMoedas[moeda as keyof typeof nomesMoedas]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {cotacoesAtualizadas && (
                <p className="text-xs text-muted-foreground">
                  Cotações atualizadas em: {cotacoesAtualizadas}
                </p>
              )}
              
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
        </CardContent>
      </Card>
      
      {/* Resultado da conversão */}
      {resultado && (
        <Card>
          <CardHeader>
            <CardTitle>Resultado da Conversão</CardTitle>
            <CardDescription>
              Confira o valor convertido
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderResumo()}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={() => {
                const textoShare = `Conversão de Moedas:\n` +
                  `${resultado.valorOriginal.toFixed(2)} ${resultado.moedaOrigem} = ` +
                  `${resultado.valorConvertido.toFixed(2)} ${resultado.moedaDestino}\n` +
                  `Taxa: 1 ${resultado.moedaOrigem} = ${resultado.taxa.toFixed(4)} ${resultado.moedaDestino}\n` +
                  `Cotação de ${cotacoesAtualizadas}`;
                
                navigator.clipboard.writeText(textoShare);
              }}
            >
              Copiar resultado
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ConversaoMoedasCalculadora;
