
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import { RefreshCcw, Shield } from 'lucide-react';

// Define o esquema do formulário com Zod
const formSchema = z.object({
  nomeProduto: z.string().min(3, 'Nome do produto é obrigatório'),
  valorProduto: z.coerce.number().positive('Valor deve ser positivo'),
  categoriaProduto: z.enum(['eletronico', 'eletrodomestico', 'movel', 'smartphone', 'outro'], {
    required_error: 'Categoria do produto é obrigatória',
  }),
  prazoGarantia: z.coerce.number().int().min(6, 'Prazo mínimo de 6 meses').max(36, 'Prazo máximo de 36 meses'),
  tipoCobertura: z.enum(['basica', 'completa', 'premium'], {
    required_error: 'Tipo de cobertura é obrigatório',
  }),
  formaPagamento: z.enum(['avista', 'parcelado'], {
    required_error: 'Forma de pagamento é obrigatória',
  }),
  numeroParcelas: z.coerce.number().int().min(1).max(12).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const GarantiaEstendidaCalculadora: React.FC = () => {
  const { getTaxaJuros } = useCalculadoraConfig();
  const [resultado, setResultado] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const calculadoraConfig = getCalculadoraConfig('garantia-estendida');
  
  if (!calculadoraConfig) {
    return <div>Configuração de calculadora não encontrada</div>;
  }
  
  // Configurar o formulário com valores padrão
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeProduto: '',
      valorProduto: 0,
      categoriaProduto: 'eletronico',
      prazoGarantia: 12,
      tipoCobertura: 'basica',
      formaPagamento: 'avista',
      numeroParcelas: 1,
    },
  });
  
  // Observar a forma de pagamento para mostrar/ocultar o campo de parcelas
  const formaPagamento = form.watch('formaPagamento');
  
  // Calcular resultado
  const handleSubmit = (values: FormValues) => {
    setIsCalculating(true);
    
    try {
      setTimeout(() => {
        // Obter taxa base para garantia
        const taxaBase = getTaxaJuros('garantias');
        
        // Percentual base de acordo com o prazo
        let percentualBase = 0;
        if (values.prazoGarantia <= 12) {
          percentualBase = 0.10; // 10% para até 1 ano
        } else if (values.prazoGarantia <= 24) {
          percentualBase = 0.15; // 15% para até 2 anos
        } else {
          percentualBase = 0.20; // 20% para até 3 anos
        }
        
        // Ajustar de acordo com a categoria
        let multiplicadorCategoria = 1;
        switch (values.categoriaProduto) {
          case 'eletronico':
            multiplicadorCategoria = 1.2;
            break;
          case 'smartphone':
            multiplicadorCategoria = 1.5;
            break;
          case 'eletrodomestico':
            multiplicadorCategoria = 1.0;
            break;
          case 'movel':
            multiplicadorCategoria = 0.8;
            break;
          case 'outro':
            multiplicadorCategoria = 1.0;
            break;
        }
        
        // Ajustar pelo tipo de cobertura
        let multiplicadorCobertura = 1;
        switch (values.tipoCobertura) {
          case 'basica':
            multiplicadorCobertura = 1.0;
            break;
          case 'completa':
            multiplicadorCobertura = 1.3;
            break;
          case 'premium':
            multiplicadorCobertura = 1.6;
            break;
        }
        
        // Calcular valor base da garantia
        const valorBaseGarantia = values.valorProduto * percentualBase * multiplicadorCategoria * multiplicadorCobertura;
        
        // Verificar forma de pagamento
        let valorTotalGarantia = valorBaseGarantia;
        let valorParcela = 0;
        let taxaJuros = 0;
        
        if (values.formaPagamento === 'parcelado' && values.numeroParcelas && values.numeroParcelas > 1) {
          // Aplicar juros no parcelamento
          taxaJuros = taxaBase;
          const taxaMensal = taxaJuros / 100;
          
          // Calcular parcela utilizando Sistema Price
          valorParcela = valorBaseGarantia * 
            (taxaMensal * Math.pow(1 + taxaMensal, values.numeroParcelas)) / 
            (Math.pow(1 + taxaMensal, values.numeroParcelas) - 1);
          
          valorTotalGarantia = valorParcela * values.numeroParcelas;
        } else {
          // À vista (parcela única)
          valorParcela = valorBaseGarantia;
        }
        
        // Definir resultado
        setResultado({
          valorTotal: valorTotalGarantia,
          parcelas: values.formaPagamento === 'parcelado' ? values.numeroParcelas : 1,
          valorParcela,
          taxaJuros,
          valorProduto: values.valorProduto,
          percentualSobreValor: (valorBaseGarantia / values.valorProduto) * 100,
          prazoGarantia: values.prazoGarantia,
          descricaoCobertura: values.tipoCobertura
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
    
    // Mapear tipo de cobertura para label mais amigável
    const tiposCobertura = {
      'basica': 'Básica (defeitos funcionais)',
      'completa': 'Completa (defeitos funcionais e danos acidentais)',
      'premium': 'Premium (funcional, danos e roubo)'
    };
    
    return (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 space-y-2">
          <h4 className="font-medium">Detalhes da garantia estendida:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Produto:</p>
              <p>{form.getValues('nomeProduto')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor do produto:</p>
              <p>{formatarMoeda(resultado.valorProduto)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prazo da garantia:</p>
              <p>{resultado.prazoGarantia} meses</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tipo de cobertura:</p>
              <p>{tiposCobertura[resultado.descricaoCobertura as keyof typeof tiposCobertura]}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Percentual sobre valor do produto:</p>
              <p>{resultado.percentualSobreValor.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-green-600 mr-2 mt-1" />
            <div>
              <h4 className="font-medium text-green-800">Benefícios da garantia estendida:</h4>
              <ul className="mt-2 space-y-1 text-sm text-green-700">
                <li>✓ Assistência técnica especializada</li>
                <li>✓ Peças originais garantidas</li>
                <li>✓ Atendimento prioritário</li>
                {resultado.descricaoCobertura === 'completa' || resultado.descricaoCobertura === 'premium' ? (
                  <li>✓ Cobertura para danos acidentais</li>
                ) : null}
                {resultado.descricaoCobertura === 'premium' ? (
                  <li>✓ Cobertura para roubo e furto qualificado</li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <BaseCalculadora
      config={calculadoraConfig}
      formValues={{
        nomeProduto: form.getValues('nomeProduto'),
        valorProduto: form.getValues('valorProduto'),
        categoriaProduto: form.getValues('categoriaProduto'),
        prazoGarantia: form.getValues('prazoGarantia'),
        tipoCobertura: form.getValues('tipoCobertura'),
        formaPagamento: form.getValues('formaPagamento'),
        numeroParcelas: form.getValues('numeroParcelas')
      }}
      resultado={resultado}
      titulo={`Garantia para ${form.getValues('nomeProduto') || 'produto'}`}
      onSave={() => form.reset()}
      isCalculating={isCalculating}
      showResultado={!!resultado}
      categoria="garantias"
      renderResumo={renderResumo}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="nomeProduto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Smart TV Samsung 55'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="valorProduto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor do produto (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="categoriaProduto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria do produto</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="eletronico">Eletrônico</SelectItem>
                        <SelectItem value="smartphone">Smartphone</SelectItem>
                        <SelectItem value="eletrodomestico">Eletrodoméstico</SelectItem>
                        <SelectItem value="movel">Móvel</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="prazoGarantia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prazo da garantia (meses)</FormLabel>
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
                      <SelectItem value="6">6 meses</SelectItem>
                      <SelectItem value="12">12 meses (1 ano)</SelectItem>
                      <SelectItem value="24">24 meses (2 anos)</SelectItem>
                      <SelectItem value="36">36 meses (3 anos)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tipoCobertura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de cobertura</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
                    >
                      <FormItem className="flex flex-col items-start space-x-0 space-y-1 rounded-md border p-4">
                        <FormControl>
                          <RadioGroupItem value="basica" className="sr-only" />
                        </FormControl>
                        <FormLabel className="font-medium cursor-pointer">
                          <Shield className="h-4 w-4 inline mr-1 text-green-600" /> Básica
                        </FormLabel>
                        <FormDescription>
                          Cobre apenas defeitos funcionais
                        </FormDescription>
                      </FormItem>
                      
                      <FormItem className="flex flex-col items-start space-x-0 space-y-1 rounded-md border p-4">
                        <FormControl>
                          <RadioGroupItem value="completa" className="sr-only" />
                        </FormControl>
                        <FormLabel className="font-medium cursor-pointer">
                          <Shield className="h-4 w-4 inline mr-1 text-blue-600" /> Completa
                        </FormLabel>
                        <FormDescription>
                          Defeitos funcionais + danos acidentais
                        </FormDescription>
                      </FormItem>
                      
                      <FormItem className="flex flex-col items-start space-x-0 space-y-1 rounded-md border p-4">
                        <FormControl>
                          <RadioGroupItem value="premium" className="sr-only" />
                        </FormControl>
                        <FormLabel className="font-medium cursor-pointer">
                          <Shield className="h-4 w-4 inline mr-1 text-purple-600" /> Premium
                        </FormLabel>
                        <FormDescription>
                          Funcional + danos + roubo
                        </FormDescription>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="formaPagamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma de pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a forma de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="avista">À vista</SelectItem>
                      <SelectItem value="parcelado">Parcelado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {formaPagamento === 'parcelado' && (
              <FormField
                control={form.control}
                name="numeroParcelas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de parcelas</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString() || '1'}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o número de parcelas" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(parcela => (
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
            )}
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

export default GarantiaEstendidaCalculadora;
