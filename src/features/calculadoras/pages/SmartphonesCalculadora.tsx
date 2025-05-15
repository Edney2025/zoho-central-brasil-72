
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

const formSchema = z.object({
  modelo: z.string().min(3, 'Modelo do smartphone é obrigatório'),
  marca: z.string().min(2, 'Marca é obrigatória'),
  valorUnitario: z.coerce.number().positive('Valor deve ser positivo'),
  quantidade: z.coerce.number().int().positive('Quantidade deve ser positiva'),
  estado: z.enum(['novo', 'usado'], {
    required_error: 'Estado do produto é obrigatório',
  }),
  parcelas: z.coerce.number().int().min(1, 'Número de parcelas é obrigatório'),
  garantiaEstendida: z.boolean().default(false),
  protecaoDeTela: z.boolean().default(false),
  acessorios: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const SmartphonesCalculadora: React.FC = () => {
  const { getTaxaJuros, calcularPrestacao } = useCalculadoraConfig();
  const [resultado, setResultado] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const calculadoraConfig = getCalculadoraConfig('smartphones');
  
  if (!calculadoraConfig) {
    return <div>Configuração de calculadora não encontrada</div>;
  }
  
  // Configurar o formulário com valores padrão
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelo: '',
      marca: '',
      valorUnitario: 0,
      quantidade: 1,
      estado: 'novo',
      parcelas: 12,
      garantiaEstendida: false,
      protecaoDeTela: false,
      acessorios: false,
    },
  });
  
  const watch = form.watch();
  
  // Calcular resultado
  const handleSubmit = (values: FormValues) => {
    setIsCalculating(true);
    
    try {
      setTimeout(() => {
        // Obter a taxa de juros apropriada
        const taxaJuros = getTaxaJuros('produtos');
        
        // Calcular valor total
        let valorProduto = values.valorUnitario * values.quantidade;
        
        // Adicionar valores adicionais
        let valorGarantia = 0;
        let valorProtecao = 0;
        let valorAcessorios = 0;
        
        // Se tiver garantia estendida (12 meses), adiciona 15% do valor do produto
        if (values.garantiaEstendida) {
          valorGarantia = valorProduto * 0.15;
        }
        
        // Se tiver proteção de tela, adiciona valor fixo por unidade
        if (values.protecaoDeTela) {
          valorProtecao = values.quantidade * 50; // R$ 50,00 por unidade
        }
        
        // Se incluir acessórios, adiciona valor fixo por unidade
        if (values.acessorios) {
          valorAcessorios = values.quantidade * 100; // R$ 100,00 por unidade
        }
        
        const valorTotalBase = valorProduto + valorGarantia + valorProtecao + valorAcessorios;
        
        // Calcular prestação
        const { valorParcela, valorTotalComJuros } = calcularPrestacao(
          valorTotalBase, 
          values.parcelas, 
          taxaJuros
        );
        
        // Definir resultado
        setResultado({
          valorTotal: valorTotalComJuros,
          parcelas: values.parcelas,
          valorParcela,
          taxaJuros,
          valorBase: valorProduto,
          valorGarantia,
          valorProtecao,
          valorAcessorios
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
    form.reset();
    setResultado(null);
  };
  
  // Componente para renderizar um resumo personalizado na seção de resultado
  const renderResumo = () => {
    if (!resultado) return null;
    
    const formatarMoeda = (valor: number) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    };
    
    return (
      <div className="border rounded-lg p-4 space-y-2">
        <h4 className="font-medium">Detalhes da simulação:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="text-sm text-muted-foreground">Smartphone:</p>
            <p>{watch.marca} {watch.modelo}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Estado:</p>
            <p>{watch.estado === 'novo' ? 'Novo' : 'Usado'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Valor do produto:</p>
            <p>{formatarMoeda(resultado.valorBase)}</p>
          </div>
          {resultado.valorGarantia > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">Garantia estendida:</p>
              <p>{formatarMoeda(resultado.valorGarantia)}</p>
            </div>
          )}
          {resultado.valorProtecao > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">Proteção de tela:</p>
              <p>{formatarMoeda(resultado.valorProtecao)}</p>
            </div>
          )}
          {resultado.valorAcessorios > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">Acessórios:</p>
              <p>{formatarMoeda(resultado.valorAcessorios)}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <BaseCalculadora
      config={calculadoraConfig}
      formValues={{
        modelo: watch.modelo,
        marca: watch.marca,
        quantidade: watch.quantidade,
        valorUnitario: watch.valorUnitario,
        estado: watch.estado,
        garantiaEstendida: watch.garantiaEstendida,
        protecaoDeTela: watch.protecaoDeTela,
        acessorios: watch.acessorios
      }}
      resultado={resultado}
      titulo={`${watch.marca} ${watch.modelo}`}
      onSave={() => form.reset()}
      isCalculating={isCalculating}
      showResultado={!!resultado}
      categoria="produtos"
      renderResumo={renderResumo}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="marca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a marca" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Samsung">Samsung</SelectItem>
                        <SelectItem value="Apple">Apple</SelectItem>
                        <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                        <SelectItem value="Motorola">Motorola</SelectItem>
                        <SelectItem value="LG">LG</SelectItem>
                        <SelectItem value="Outra">Outra</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="modelo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: iPhone 14 Pro Max" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado do produto" />
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
                      {[1, 3, 6, 9, 12, 18, 24].map((parcela) => (
                        <SelectItem key={parcela} value={parcela.toString()}>
                          {parcela}x {parcela === 1 ? '(à vista)' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="border rounded-md p-4 space-y-4">
              <h3 className="font-medium">Opcionais</h3>
              
              <FormField
                control={form.control}
                name="garantiaEstendida"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Garantia Estendida (12 meses)</FormLabel>
                      <FormDescription>
                        Adiciona 15% ao valor do produto para garantia estendida
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="protecaoDeTela"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Proteção de Tela</FormLabel>
                      <FormDescription>
                        Adiciona R$ 50,00 por unidade para proteção de tela
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="acessorios"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange} 
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Kit de Acessórios</FormLabel>
                      <FormDescription>
                        Adiciona R$ 100,00 por unidade para kit de acessórios (capa, carregador e fone)
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

export default SmartphonesCalculadora;
