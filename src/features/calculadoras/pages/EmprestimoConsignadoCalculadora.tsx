
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { RefreshCcw, Wallet, CheckCircle2, XCircle, Info } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Define o esquema do formulário com Zod
const formSchema = z.object({
  valorSolicitado: z.coerce.number().min(300, 'O valor mínimo é R$ 300,00').max(500000, 'O valor máximo é R$ 500.000,00'),
  prazo: z.coerce.number().int().min(1, 'Prazo mínimo de 1 mês'),
  tipoConsignado: z.enum(['inss', 'servidor', 'militar', 'privado'], {
    required_error: 'Tipo de empréstimo é obrigatório',
  }),
  rendaMensal: z.coerce.number().min(500, 'Renda mínima: R$ 500,00'),
  possuiOutrosConsignados: z.boolean().default(false),
  valorOutrosConsignados: z.coerce.number().min(0, 'Valor não pode ser negativo').optional(),
  incluirSeguro: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const EmprestimoConsignadoCalculadora = () => {
  const { getTaxaJuros } = useCalculadoraConfig();
  const [resultado, setResultado] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const calculadoraConfig = getCalculadoraConfig('emprestimo-consignado');
  
  if (!calculadoraConfig) {
    return <div>Configuração de calculadora não encontrada</div>;
  }
  
  // Configurar o formulário com valores padrão
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      valorSolicitado: 10000,
      prazo: 48,
      tipoConsignado: 'inss',
      rendaMensal: 2000,
      possuiOutrosConsignados: false,
      valorOutrosConsignados: 0,
      incluirSeguro: false,
    },
  });
  
  // Watch para campos dinâmicos
  const possuiOutrosConsignados = form.watch('possuiOutrosConsignados');
  const tipoConsignado = form.watch('tipoConsignado');
  const rendaMensal = form.watch('rendaMensal');
  
  // Calcular resultado
  const handleSubmit = (values: FormValues) => {
    setIsCalculating(true);
    
    try {
      // Simular um atraso de processamento para mostrar o estado de carregamento
      setTimeout(() => {
        // Definir taxa base por tipo de consignado
        let taxaBase = 0;
        let margemConsignavel = 0;
        
        switch (values.tipoConsignado) {
          case 'inss':
            taxaBase = 1.7;  // 1.7% ao mês
            margemConsignavel = 0.35; // 35% da renda
            break;
          case 'servidor':
            taxaBase = 1.4;  // 1.4% ao mês
            margemConsignavel = 0.30; // 30% da renda
            break;
          case 'militar':
            taxaBase = 1.3;  // 1.3% ao mês
            margemConsignavel = 0.35; // 35% da renda
            break;
          case 'privado':
            taxaBase = 1.9;  // 1.9% ao mês
            margemConsignavel = 0.30; // 30% da renda
            break;
        }
        
        // Taxa mensal (% para decimal)
        const taxaMensal = taxaBase / 100;
        
        // Calcular valor do seguro (se aplicável)
        const valorSeguro = values.incluirSeguro ? values.valorSolicitado * 0.02 : 0;
        
        // Calcular parcela mensal (Sistema Price)
        const valorParcela = values.valorSolicitado * 
          (taxaMensal * Math.pow(1 + taxaMensal, values.prazo)) / 
          (Math.pow(1 + taxaMensal, values.prazo) - 1);
        
        // Calcular valor líquido
        const tarifas = values.valorSolicitado * 0.01; // 1% de tarifas administrativas
        const valorLiquido = values.valorSolicitado - tarifas - valorSeguro;
        
        // Calcular valor total com juros
        const valorTotal = valorParcela * values.prazo;
        
        // Calcular margem disponível
        const margemMaxima = values.rendaMensal * margemConsignavel;
        const margemUtilizada = values.possuiOutrosConsignados ? (values.valorOutrosConsignados || 0) : 0;
        const margemDisponivel = margemMaxima - margemUtilizada;
        const margemAposEmprestimo = margemDisponivel - valorParcela;
        const aprovado = margemAposEmprestimo >= 0;
        
        // Calcular CET (Custo Efetivo Total) - simplificado
        const taxaAnual = Math.pow(1 + taxaMensal, 12) - 1;
        const cet = taxaAnual * 100 + 1.5; // Taxa anual + 1.5pp de outros custos
        
        // Preparar parcelamento detalhado
        const parcelamento = [];
        let saldoDevedor = values.valorSolicitado;
        
        for (let i = 1; i <= Math.min(values.prazo, 24); i++) { // Limitar a 24 parcelas na visualização
          // Cálculo dos juros da parcela
          const juros = saldoDevedor * taxaMensal;
          // Cálculo da amortização
          const amortizacao = valorParcela - juros;
          // Atualização do saldo devedor
          saldoDevedor -= amortizacao;
          
          parcelamento.push({
            parcela: i,
            valor: valorParcela,
            juros,
            amortizacao,
            saldoDevedor: Math.max(0, saldoDevedor)
          });
        }
        
        // Definir resultado
        setResultado({
          valorTotal,
          parcelas: values.prazo,
          valorParcela,
          taxaJuros: taxaBase,
          taxaAnual,
          valorSolicitado: values.valorSolicitado,
          valorLiquido,
          tarifas,
          valorSeguro,
          cet,
          parcelamento,
          tipoConsignado: values.tipoConsignado,
          margemMaxima,
          margemUtilizada,
          margemDisponivel,
          margemAposEmprestimo,
          aprovado
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
  };
  
  // Componente para renderizar um resumo personalizado na seção de resultado
  const renderResumo = () => {
    if (!resultado) return null;
    
    const formatarMoeda = (valor: number) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    };
    
    // Mapear tipo de consignado para label mais amigável
    const tiposConsignado = {
      'inss': 'Aposentados e Pensionistas (INSS)',
      'servidor': 'Servidor Público',
      'militar': 'Militar',
      'privado': 'Empresa Privada'
    };
    
    return (
      <div className="space-y-4">
        {resultado.aprovado ? (
          <Alert className="border-green-500 bg-green-50/50">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <AlertTitle className="text-green-700">Empréstimo pré-aprovado</AlertTitle>
            <AlertDescription className="text-green-700">
              Sua margem consignável é suficiente para este empréstimo.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="destructive">
            <XCircle className="h-5 w-5" />
            <AlertTitle>Empréstimo não aprovado</AlertTitle>
            <AlertDescription>
              Sua margem consignável não é suficiente para este empréstimo.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="border rounded-lg p-4 space-y-2">
          <h4 className="font-medium">Detalhes do empréstimo consignado:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Tipo de consignado:</p>
              <p>{tiposConsignado[resultado.tipoConsignado as keyof typeof tiposConsignado]}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor solicitado:</p>
              <p>{formatarMoeda(resultado.valorSolicitado)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor líquido:</p>
              <p>{formatarMoeda(resultado.valorLiquido)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Taxa de juros:</p>
              <p>{resultado.taxaJuros.toFixed(2)}% a.m. ({resultado.taxaAnual.toFixed(2)}% a.a.)</p>
            </div>
            {resultado.valorSeguro > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Seguro prestamista:</p>
                <p>{formatarMoeda(resultado.valorSeguro)}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Tarifas:</p>
              <p>{formatarMoeda(resultado.tarifas)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CET (Custo Efetivo Total):</p>
              <p>{resultado.cet.toFixed(2)}% a.a.</p>
            </div>
          </div>
        </div>
        
        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50/50">
          <h4 className="font-medium text-blue-800 flex items-center">
            <Wallet className="mr-2 h-4 w-4" />
            Análise de margem consignável
          </h4>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Margem máxima:</p>
              <p className="font-medium">{formatarMoeda(resultado.margemMaxima)}</p>
            </div>
            {resultado.margemUtilizada > 0 && (
              <div>
                <p className="text-muted-foreground">Margem já utilizada:</p>
                <p className="font-medium">{formatarMoeda(resultado.margemUtilizada)}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground">Margem disponível:</p>
              <p className="font-medium">{formatarMoeda(resultado.margemDisponivel)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Valor da parcela:</p>
              <p className="font-medium">{formatarMoeda(resultado.valorParcela)}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-muted-foreground">Margem após este empréstimo:</p>
              <p className={`font-medium ${resultado.margemAposEmprestimo < 0 ? 'text-red-500' : 'text-green-600'}`}>
                {formatarMoeda(resultado.margemAposEmprestimo)}
              </p>
            </div>
          </div>
        </div>
        
        <Accordion type="single" collapsible>
          <AccordionItem value="parcelamento">
            <AccordionTrigger>Ver detalhamento das parcelas</AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Parcela</th>
                      <th className="text-right p-2">Valor</th>
                      <th className="text-right p-2">Juros</th>
                      <th className="text-right p-2">Amortização</th>
                      <th className="text-right p-2">Saldo Devedor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultado.parcelamento.map((p: any) => (
                      <tr key={p.parcela} className="border-b">
                        <td className="p-2">{p.parcela}ª</td>
                        <td className="text-right p-2">{formatarMoeda(p.valor)}</td>
                        <td className="text-right p-2">{formatarMoeda(p.juros)}</td>
                        <td className="text-right p-2">{formatarMoeda(p.amortizacao)}</td>
                        <td className="text-right p-2">{formatarMoeda(p.saldoDevedor)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {resultado.parcelas > 24 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    * Exibindo as primeiras 24 parcelas de {resultado.parcelas}.
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };
  
  return (
    <BaseCalculadora
      config={calculadoraConfig}
      formValues={{
        valorSolicitado: form.getValues('valorSolicitado'),
        prazo: form.getValues('prazo'),
        tipoConsignado: form.getValues('tipoConsignado'),
        rendaMensal: form.getValues('rendaMensal'),
        possuiOutrosConsignados: form.getValues('possuiOutrosConsignados'),
        valorOutrosConsignados: form.getValues('valorOutrosConsignados'),
        incluirSeguro: form.getValues('incluirSeguro')
      }}
      resultado={resultado}
      titulo={`Empréstimo consignado - ${form.getValues('tipoConsignado')}`}
      onSave={() => form.reset()}
      isCalculating={isCalculating}
      showResultado={!!resultado}
      categoria="emprestimos"
      renderResumo={renderResumo}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Empréstimo consignado tem as melhores taxas do mercado pois o valor é descontado diretamente da folha de pagamento.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="tipoConsignado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de consignado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de consignado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="inss">Aposentados e Pensionistas (INSS)</SelectItem>
                      <SelectItem value="servidor">Servidor Público</SelectItem>
                      <SelectItem value="militar">Militar</SelectItem>
                      <SelectItem value="privado">Empresa Privada</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="valorSolicitado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor solicitado (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" min="300" max="500000" step="100" {...field} />
                  </FormControl>
                  <FormDescription>
                    Entre R$ 300,00 e R$ 500.000,00
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
                      <SelectItem value="96">96 meses (8 anos)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rendaMensal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Renda mensal (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" min="500" step="100" {...field} />
                  </FormControl>
                  <FormDescription>
                    Renda mensal bruta
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="possuiOutrosConsignados"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Possuo outros empréstimos consignados</FormLabel>
                    <FormDescription>
                      Marque se já possui outro consignado ativo na folha
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            {possuiOutrosConsignados && (
              <FormField
                control={form.control}
                name="valorOutrosConsignados"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor das parcelas de outros consignados (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="10" {...field} />
                    </FormControl>
                    <FormDescription>
                      Total mensal já descontado na folha
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
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
                    <FormLabel>Incluir seguro prestamista</FormLabel>
                    <FormDescription>
                      Proteção que quita o empréstimo em caso de morte ou invalidez (+2%)
                    </FormDescription>
                  </div>
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

export default EmprestimoConsignadoCalculadora;
