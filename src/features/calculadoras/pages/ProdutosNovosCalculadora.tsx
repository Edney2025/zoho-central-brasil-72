
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ShoppingBag, Calculator, Save, ArrowLeft, Share2, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSimulacoes } from '../hooks/useSimulacoes';
import { ProdutoSimulacao } from '../types';
import { toast } from '@/components/ui/sonner';
import { formatarMoeda } from '@/lib/utils';

const formSchema = z.object({
  titulo: z.string().min(1, 'O título é obrigatório'),
  nome: z.string().min(1, 'O nome do produto é obrigatório'),
  quantidade: z.number().min(1, 'A quantidade deve ser pelo menos 1'),
  valorUnitario: z.number().min(0.01, 'O valor deve ser maior que zero'),
  estado: z.enum(['novo', 'usado']),
  garantiaEstendida: z.boolean().default(false),
  valorGarantia: z.number().optional(),
  parcelas: z.number().min(1).max(96),
  taxaJuros: z.number().min(0),
  valorEntrada: z.number().min(0),
});

type FormValues = z.infer<typeof formSchema>;

const ProdutosNovosCalculadora = () => {
  const navigate = useNavigate();
  const { addSimulacao } = useSimulacoes();
  const [resultado, setResultado] = useState<{
    valorTotal: number;
    valorParcela: number;
    valorProdutos: number;
    valorGarantia?: number;
    juros: number;
  } | null>(null);
  const [simulacaoSalva, setSimulacaoSalva] = useState<ProdutoSimulacao | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: 'Simulação de Financiamento de Produto Novo',
      nome: '',
      quantidade: 1,
      valorUnitario: 0,
      estado: 'novo',
      garantiaEstendida: false,
      valorGarantia: 0,
      parcelas: 12,
      taxaJuros: 1.99,
      valorEntrada: 0,
    },
  });
  
  // Observar campos para cálculo em tempo real
  const watchQuantidade = form.watch('quantidade');
  const watchValorUnitario = form.watch('valorUnitario');
  const watchGarantiaEstendida = form.watch('garantiaEstendida');
  const watchValorGarantia = form.watch('valorGarantia');
  const watchParcelas = form.watch('parcelas');
  const watchTaxaJuros = form.watch('taxaJuros');
  const watchValorEntrada = form.watch('valorEntrada');
  
  // Calcular valores em tempo real
  React.useEffect(() => {
    if (watchQuantidade && watchValorUnitario) {
      const valorProdutos = watchQuantidade * watchValorUnitario;
      let valorGarantia = 0;
      
      if (watchGarantiaEstendida && watchValorGarantia) {
        valorGarantia = watchValorGarantia;
      }
      
      let valorBase = valorProdutos + valorGarantia;
      
      // Subtrair entrada
      valorBase -= watchValorEntrada;
      
      if (valorBase <= 0) {
        valorBase = 0;
      }
      
      // Calcular juros compostos
      const taxaMensal = watchTaxaJuros / 100;
      const jurosTotais = valorBase * (Math.pow(1 + taxaMensal, watchParcelas) - 1);
      const valorTotal = valorBase + jurosTotais + watchValorEntrada;
      const valorParcela = valorBase === 0 ? 0 : (valorBase + jurosTotais) / watchParcelas;
      
      setResultado({
        valorTotal,
        valorParcela,
        valorProdutos,
        valorGarantia: watchGarantiaEstendida ? watchValorGarantia : undefined,
        juros: jurosTotais,
      });
    }
  }, [
    watchQuantidade, 
    watchValorUnitario, 
    watchGarantiaEstendida, 
    watchValorGarantia, 
    watchParcelas, 
    watchTaxaJuros,
    watchValorEntrada
  ]);
  
  const onSubmit = (data: FormValues) => {
    if (!resultado) return;
    
    const simulacao: Omit<ProdutoSimulacao, 'id' | 'data'> = {
      titulo: data.titulo,
      nome: data.nome,
      quantidade: data.quantidade,
      valorUnitario: data.valorUnitario,
      estado: data.estado,
      garantiaEstendida: data.garantiaEstendida,
      valorGarantia: data.garantiaEstendida ? data.valorGarantia : undefined,
      parcelas: data.parcelas,
      taxaJuros: data.taxaJuros,
      valorEntrada: data.valorEntrada,
      valorParcela: resultado.valorParcela,
      valorTotal: resultado.valorTotal,
      categoria: 'produtos'
    };
    
    const novaSim = addSimulacao(simulacao);
    setSimulacaoSalva(novaSim as ProdutoSimulacao);
  };
  
  const handleShare = () => {
    if (!simulacaoSalva || !resultado) return;
    
    try {
      const text = `
Simulação: ${simulacaoSalva.titulo}
Produto: ${simulacaoSalva.nome}
Valor Total: ${formatarMoeda(resultado.valorTotal)}
Parcelamento: ${simulacaoSalva.parcelas}x de ${formatarMoeda(resultado.valorParcela)}
Taxa de Juros: ${simulacaoSalva.taxaJuros}% ao mês
Valor dos Produtos: ${formatarMoeda(resultado.valorProdutos)}
${resultado.valorGarantia ? `Valor da Garantia: ${formatarMoeda(resultado.valorGarantia)}` : ''}
      `;
      
      navigator.clipboard.writeText(text);
      toast.success('Informações copiadas para a área de transferência!');
    } catch (error) {
      toast.error('Erro ao compartilhar simulação.');
    }
  };
  
  const handleCreateOrcamento = () => {
    if (!simulacaoSalva) return;
    
    toast.success('Redirecionando para criação de orçamento...');
    // Aqui seria a integração com o sistema de orçamentos
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/calculadoras')}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold">Calculadora de Produtos Novos</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle>Dados do Produto</CardTitle>
            <CardDescription>
              Preencha as informações para simular o financiamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título da Simulação</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Produto</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="valorUnitario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor Unitário</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01" 
                            min="0" 
                            {...field} 
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} 
                          />
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
                          <Input 
                            type="number" 
                            min="1" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)} 
                          />
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
                      <FormLabel>Estado do Produto</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="novo">Novo</SelectItem>
                          <SelectItem value="usado">Usado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="garantiaEstendida"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Adicionar Garantia Estendida</FormLabel>
                        <FormDescription>
                          Proteção adicional para seu produto
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                {form.watch('garantiaEstendida') && (
                  <FormField
                    control={form.control}
                    name="valorGarantia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor da Garantia</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01" 
                            min="0" 
                            {...field} 
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <Separator className="my-4" />
                
                <h3 className="text-lg font-medium">Condições de Pagamento</h3>
                
                <FormField
                  control={form.control}
                  name="valorEntrada"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor de Entrada (R$)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          min="0" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="parcelas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Parcelas</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione as parcelas" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1x</SelectItem>
                            <SelectItem value="3">3x</SelectItem>
                            <SelectItem value="6">6x</SelectItem>
                            <SelectItem value="12">12x</SelectItem>
                            <SelectItem value="18">18x</SelectItem>
                            <SelectItem value="24">24x</SelectItem>
                            <SelectItem value="36">36x</SelectItem>
                            <SelectItem value="48">48x</SelectItem>
                            <SelectItem value="60">60x</SelectItem>
                            <SelectItem value="72">72x</SelectItem>
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
                        <FormLabel>Taxa de Juros (% a.m.)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01" 
                            min="0" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator className="my-4" />
                
                <Button type="submit" className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Simulação
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Resultados */}
        <div className="space-y-6">
          <Card className={resultado ? "border-primary" : ""}>
            <CardHeader className={resultado ? "bg-primary/5 border-b border-primary/10" : ""}>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Resultado da Simulação
              </CardTitle>
              <CardDescription>
                Confira os valores calculados para esta simulação
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {resultado ? (
                <div className="space-y-6">
                  <div className="flex items-baseline justify-between">
                    <div className="text-sm text-muted-foreground">Valor dos Produtos:</div>
                    <div className="text-xl font-medium">{formatarMoeda(resultado.valorProdutos)}</div>
                  </div>
                  
                  {resultado.valorGarantia && (
                    <div className="flex items-baseline justify-between">
                      <div className="text-sm text-muted-foreground">Valor da Garantia:</div>
                      <div className="text-xl font-medium">{formatarMoeda(resultado.valorGarantia)}</div>
                    </div>
                  )}
                  
                  {watchValorEntrada > 0 && (
                    <div className="flex items-baseline justify-between">
                      <div className="text-sm text-muted-foreground">Valor de Entrada:</div>
                      <div className="text-xl font-medium">{formatarMoeda(watchValorEntrada)}</div>
                    </div>
                  )}
                  
                  <div className="flex items-baseline justify-between">
                    <div className="text-sm text-muted-foreground">Juros Totais:</div>
                    <div className="text-xl font-medium">{formatarMoeda(resultado.juros)}</div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-baseline justify-between">
                    <div className="text-sm font-medium">Valor da Parcela:</div>
                    <div className="text-2xl font-bold text-primary">
                      {watchParcelas}x de {formatarMoeda(resultado.valorParcela)}
                    </div>
                  </div>
                  
                  <div className="flex items-baseline justify-between">
                    <div className="text-sm font-medium">Valor Total:</div>
                    <div className="text-2xl font-bold">{formatarMoeda(resultado.valorTotal)}</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Preencha os dados do produto para visualizar a simulação</p>
                </div>
              )}
            </CardContent>
            {simulacaoSalva && (
              <CardFooter className="flex justify-between border-t bg-muted/50 gap-2">
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar
                </Button>
                <Button onClick={handleCreateOrcamento}>
                  <FileText className="mr-2 h-4 w-4" />
                  Criar Orçamento
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProdutosNovosCalculadora;
