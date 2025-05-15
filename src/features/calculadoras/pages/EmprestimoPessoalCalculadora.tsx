
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
import { RefreshCcw } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const formSchema = z.object({
  valorSolicitado: z.coerce.number().min(300, 'O valor mínimo é R$ 300,00').max(100000, 'O valor máximo é R$ 100.000,00'),
  prazo: z.coerce.number().int().min(1, 'Prazo mínimo de 1 mês'),
  tipoEmprestimo: z.enum(['pessoal', 'consignado', 'garantia'], {
    required_error: 'Tipo de empréstimo é obrigatório',
  }),
  possuiSeguro: z.boolean().default(false),
  incluirIOF: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const EmprestimoPessoalCalculadora: React.FC = () => {
  const { getTaxaJuros } = useCalculadoraConfig();
  const [resultado, setResultado] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const calculadoraConfig = getCalculadoraConfig('emprestimo-pessoal');
  
  if (!calculadoraConfig) {
    return <div>Configuração de calculadora não encontrada</div>;
  }
  
  // Configurar o formulário com valores padrão
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      valorSolicitado: 5000,
      prazo: 12,
      tipoEmprestimo: 'pessoal',
      possuiSeguro: false,
      incluirIOF: true,
    },
  });
  
  // Calcular resultado
  const handleSubmit = (values: FormValues) => {
    setIsCalculating(true);
    
    try {
      // Simular um atraso de processamento para mostrar o estado de carregamento
      setTimeout(() => {
        // Obter taxa de juros base para empréstimos
        let taxaBase = getTaxaJuros('emprestimos');
        let taxaJuros = taxaBase;
        
        // Ajustar taxa com base no tipo de empréstimo
        switch (values.tipoEmprestimo) {
          case 'pessoal':
            // Taxa padrão
            break;
          case 'consignado':
            // Taxa reduzida para consignado
            taxaJuros = taxaBase * 0.7;
            break;
          case 'garantia':
            // Taxa reduzida para garantia
            taxaJuros = taxaBase * 0.8;
            break;
        }
        
        // Taxa mensal (% para decimal)
        const taxaMensal = taxaJuros / 100;
        
        // Calcular valor do seguro (se aplicável)
        const valorSeguro = values.possuiSeguro ? values.valorSolicitado * 0.03 : 0;
        
        // Calcular IOF (estimado, simplificado)
        const valorIOF = values.incluirIOF ? values.valorSolicitado * 0.0038 + (values.valorSolicitado * 0.000082 * 30 * values.prazo / 30) : 0;
        
        // Calcular valor liberado
        const valorLiberado = values.valorSolicitado - valorIOF - valorSeguro;
        
        // Calcular parcela mensal (Sistema Price)
        const valorParcela = values.valorSolicitado * 
          (taxaMensal * Math.pow(1 + taxaMensal, values.prazo)) / 
          (Math.pow(1 + taxaMensal, values.prazo) - 1);
        
        // Calcular valor total com juros
        const valorTotal = valorParcela * values.prazo;
        
        // Calcular CET (Custo Efetivo Total) - simplificado
        const cet = ((valorTotal / valorLiberado) - 1) * (12 / values.prazo) * 100;
        
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
          taxaJuros,
          valorSolicitado: values.valorSolicitado,
          valorLiberado,
          valorSeguro,
          valorIOF,
          cet,
          parcelamento,
          tipoEmprestimo: values.tipoEmprestimo
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
    
    // Mapear tipo de empréstimo para label mais amigável
    const tiposEmprestimo = {
      'pessoal': 'Empréstimo Pessoal',
      'consignado': 'Empréstimo Consignado',
      'garantia': 'Empréstimo com Garantia'
    };
    
    return (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 space-y-2">
          <h4 className="font-medium">Detalhes do empréstimo:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Tipo de empréstimo:</p>
              <p>{tiposEmprestimo[resultado.tipoEmprestimo as keyof typeof tiposEmprestimo]}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor solicitado:</p>
              <p>{formatarMoeda(resultado.valorSolicitado)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor liberado:</p>
              <p>{formatarMoeda(resultado.valorLiberado)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Taxa de juros:</p>
              <p>{resultado.taxaJuros.toFixed(2)}% a.m.</p>
            </div>
            {resultado.valorSeguro > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Seguro prestamista:</p>
                <p>{formatarMoeda(resultado.valorSeguro)}</p>
              </div>
            )}
            {resultado.valorIOF > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">IOF:</p>
                <p>{formatarMoeda(resultado.valorIOF)}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">CET (Custo Efetivo Total):</p>
              <p>{resultado.cet.toFixed(2)}% a.a.</p>
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
        tipoEmprestimo: form.getValues('tipoEmprestimo'),
        possuiSeguro: form.getValues('possuiSeguro'),
        incluirIOF: form.getValues('incluirIOF')
      }}
      resultado={resultado}
      titulo={`Empréstimo ${form.getValues('tipoEmprestimo')}`}
      onSave={() => form.reset()}
      isCalculating={isCalculating}
      showResultado={!!resultado}
      categoria="emprestimos"
      renderResumo={renderResumo}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="valorSolicitado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor solicitado (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" min="300" max="100000" step="100" {...field} />
                  </FormControl>
                  <FormDescription>
                    Entre R$ 300,00 e R$ 100.000,00
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tipoEmprestimo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de empréstimo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de empréstimo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pessoal">Empréstimo Pessoal</SelectItem>
                      <SelectItem value="consignado">Empréstimo Consignado</SelectItem>
                      <SelectItem value="garantia">Empréstimo com Garantia</SelectItem>
                    </SelectContent>
                  </Select>
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
                      {[1, 3, 6, 9, 12, 18, 24, 36, 48, 60].map(prazo => (
                        <SelectItem key={prazo} value={prazo.toString()}>
                          {prazo} {prazo === 1 ? 'mês' : 'meses'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2 border rounded-md p-4">
              <h3 className="font-medium mb-2">Opcionais</h3>
              
              <FormField
                control={form.control}
                name="possuiSeguro"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Seguro prestamista</FormLabel>
                      <FormDescription>
                        Proteção que quita o empréstimo em caso de morte ou invalidez (+3% do valor)
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="incluirIOF"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Incluir IOF</FormLabel>
                      <FormDescription>
                        Imposto sobre Operações Financeiras (0,38% + 0,0082% ao dia)
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

export default EmprestimoPessoalCalculadora;
