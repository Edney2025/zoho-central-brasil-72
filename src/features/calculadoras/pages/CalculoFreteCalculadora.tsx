
import React, { useState } from 'react';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCalculadoraConfig } from '../hooks/useCalculadoraConfig';
import { BaseCalculadora } from '../components/BaseCalculadora';
import { getCalculadoraConfig } from '../config/calculadoras';
import { RefreshCcw, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Define o esquema do formulário com Zod
const formSchema = z.object({
  tipoFrete: z.enum(['rodoviario', 'aereo', 'maritimo', 'expressa', 'padrao']),
  origem: z.string().min(2, 'Origem precisa ter pelo menos 2 caracteres'),
  destino: z.string().min(2, 'Destino precisa ter pelo menos 2 caracteres'),
  distancia: z.coerce.number().min(1, 'Distância deve ser maior que 0'),
  unidadeDistancia: z.enum(['km', 'milhas']),
  peso: z.coerce.number().min(0.1, 'Peso deve ser maior que 0'),
  unidadePeso: z.enum(['kg', 'lb']),
  volume: z.coerce.number().min(0.1, 'Volume deve ser maior que 0'),
  unidadeVolume: z.enum(['m3', 'cm3']),
  tipoEntrega: z.enum(['normal', 'expressa', 'economica']),
  seguro: z.coerce.number().min(0, 'O valor do seguro não pode ser negativo'),
});

type FormValues = z.infer<typeof formSchema>;

const CalculoFreteCalculadora = () => {
  const { getTaxaJuros } = useCalculadoraConfig();
  const [resultado, setResultado] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const calculadoraConfig = getCalculadoraConfig('calculo-frete');
  
  if (!calculadoraConfig) {
    return <div>Configuração de calculadora não encontrada</div>;
  }
  
  // Configurar o formulário com valores padrão
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoFrete: 'rodoviario',
      origem: '',
      destino: '',
      distancia: 0,
      unidadeDistancia: 'km',
      peso: 0,
      unidadePeso: 'kg',
      volume: 0,
      unidadeVolume: 'm3',
      tipoEntrega: 'normal',
      seguro: 0,
    },
  });
  
  // Observar campos
  const tipoFrete = form.watch('tipoFrete');
  const tipoEntrega = form.watch('tipoEntrega');
  const unidadeDistancia = form.watch('unidadeDistancia');
  const unidadePeso = form.watch('unidadePeso');
  
  // Calcular resultado
  const handleSubmit = (values: FormValues) => {
    setIsCalculating(true);
    
    try {
      // Simular um atraso de processamento para mostrar o estado de carregamento
      setTimeout(() => {
        // Converter unidades para padrão (km e kg)
        let distanciaKm = values.distancia;
        if (values.unidadeDistancia === 'milhas') {
          distanciaKm = values.distancia * 1.60934;
        }
        
        let pesoKg = values.peso;
        if (values.unidadePeso === 'lb') {
          pesoKg = values.peso * 0.453592;
        }
        
        let volumeM3 = values.volume;
        if (values.unidadeVolume === 'cm3') {
          volumeM3 = values.volume / 1000000;
        }
        
        // Calcular valor base do frete por km
        let valorPorKm = 0;
        switch (values.tipoFrete) {
          case 'rodoviario':
            valorPorKm = 2.5;
            break;
          case 'aereo':
            valorPorKm = 15;
            break;
          case 'maritimo':
            valorPorKm = 1.2;
            break;
          case 'expressa':
            valorPorKm = 8;
            break;
          case 'padrao':
            valorPorKm = 3.8;
            break;
        }
        
        // Calcular valor base do frete
        let valorBase = distanciaKm * valorPorKm;
        
        // Adicionar valor pelo peso e volume
        const fatorPeso = pesoKg * 0.5;
        const fatorVolume = volumeM3 * 100;
        
        // Usar o maior entre peso e volume (peso cubado)
        const fatorDimensional = Math.max(fatorPeso, fatorVolume);
        valorBase += fatorDimensional;
        
        // Adicionar valor por tipo de entrega
        let multiplicadorEntrega = 1;
        switch (values.tipoEntrega) {
          case 'expressa':
            multiplicadorEntrega = 1.5;
            break;
          case 'normal':
            multiplicadorEntrega = 1;
            break;
          case 'economica':
            multiplicadorEntrega = 0.8;
            break;
        }
        
        // Aplicar multiplicador de entrega
        valorBase *= multiplicadorEntrega;
        
        // Adicionar valor do seguro
        const valorSeguro = values.seguro > 0 ? values.seguro * 0.01 : 0; // 1% do valor declarado
        
        // Calcular impostos e taxas (simplificado)
        const taxasAdicionais = valorBase * 0.12; // 12% de taxas
        
        // Calcular valor total
        const valorTotal = valorBase + valorSeguro + taxasAdicionais;
        
        // Prazo de entrega estimado
        let prazoBase = 0;
        switch (values.tipoFrete) {
          case 'rodoviario':
            prazoBase = Math.ceil(distanciaKm / 800); // ~800km por dia
            break;
          case 'aereo':
            prazoBase = 1 + Math.ceil(distanciaKm / 8000); // 8000km por dia + 1 dia
            break;
          case 'maritimo':
            prazoBase = 5 + Math.ceil(distanciaKm / 1000); // ~1000km por dia + 5 dias
            break;
          case 'expressa':
            prazoBase = 1 + Math.ceil(distanciaKm / 2000); // 2000km por dia + 1 dia
            break;
          case 'padrao':
            prazoBase = 2 + Math.ceil(distanciaKm / 600); // 600km por dia + 2 dias
            break;
        }
        
        // Ajustar prazo conforme tipo de entrega
        let prazoFinal = prazoBase;
        if (values.tipoEntrega === 'expressa') {
          prazoFinal = Math.max(1, Math.ceil(prazoBase * 0.6));
        } else if (values.tipoEntrega === 'economica') {
          prazoFinal = Math.ceil(prazoBase * 1.5);
        }
        
        // Definir resultado
        setResultado({
          valorTotal,
          valorBase,
          valorSeguro,
          taxasAdicionais,
          prazoEntrega: prazoFinal,
          distanciaKm,
          pesoKg,
          volumeM3,
          valorPorKm,
          origem: values.origem,
          destino: values.destino,
          tipoFrete: values.tipoFrete,
          tipoEntrega: values.tipoEntrega
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
    
    // Mapear tipo de frete para texto amigável
    const tiposFrete: Record<string, string> = {
      'rodoviario': 'Rodoviário',
      'aereo': 'Aéreo',
      'maritimo': 'Marítimo',
      'expressa': 'Entrega expressa',
      'padrao': 'Entrega padrão'
    };
    
    // Mapear tipo de entrega para texto amigável
    const tiposEntrega: Record<string, string> = {
      'normal': 'Normal',
      'expressa': 'Expressa',
      'economica': 'Econômica'
    };
    
    return (
      <div className="space-y-4">
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between mb-2">
            <Badge variant="outline">{tiposFrete[resultado.tipoFrete]}</Badge>
            <Badge variant={resultado.tipoEntrega === 'expressa' ? 'destructive' : 
                   resultado.tipoEntrega === 'economica' ? 'secondary' : 'default'}>
              {tiposEntrega[resultado.tipoEntrega]}
            </Badge>
          </div>
          
          <div className="space-y-2 border-b pb-4">
            <div className="flex justify-between text-sm">
              <span>De: <span className="font-medium">{resultado.origem}</span></span>
              <span>Para: <span className="font-medium">{resultado.destino}</span></span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Distância: <span className="font-medium">{resultado.distanciaKm.toFixed(1)} km</span></span>
              <span>Prazo: <span className="font-medium">{resultado.prazoEntrega} {resultado.prazoEntrega === 1 ? 'dia' : 'dias'}</span></span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Valor base:</p>
              <p>{formatarMoeda(resultado.valorBase)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Valor km:</p>
              <p>{formatarMoeda(resultado.valorPorKm)} por km</p>
            </div>
            {resultado.valorSeguro > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Seguro:</p>
                <p>{formatarMoeda(resultado.valorSeguro)}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Taxas adicionais:</p>
              <p>{formatarMoeda(resultado.taxasAdicionais)}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">Detalhes físicos:</p>
              <p>{resultado.pesoKg.toFixed(2)} kg | {resultado.volumeM3.toFixed(3)} m³</p>
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
        tipoFrete: form.getValues('tipoFrete'),
        origem: form.getValues('origem'),
        destino: form.getValues('destino'),
        distancia: form.getValues('distancia'),
        unidadeDistancia: form.getValues('unidadeDistancia'),
        peso: form.getValues('peso'),
        unidadePeso: form.getValues('unidadePeso'),
        volume: form.getValues('volume'),
        unidadeVolume: form.getValues('unidadeVolume'),
        tipoEntrega: form.getValues('tipoEntrega'),
        seguro: form.getValues('seguro')
      }}
      resultado={resultado}
      titulo={`${form.getValues('origem') || 'Origem'} para ${form.getValues('destino') || 'Destino'}`}
      onSave={() => form.reset()}
      isCalculating={isCalculating}
      showResultado={!!resultado}
      categoria="transportes"
      renderResumo={renderResumo}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="tipoFrete"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Frete</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="rodoviario" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Rodoviário
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="aereo" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Aéreo
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="maritimo" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Marítimo
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="expressa" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Entrega expressa
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="padrao" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Entrega padrão
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="origem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origem</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: São Paulo - SP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="destino"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destino</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Rio de Janeiro - RJ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="distancia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distância</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="unidadeDistancia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="km">km</SelectItem>
                        <SelectItem value="milhas">milhas</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="peso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso</FormLabel>
                      <FormControl>
                        <Input type="number" min="0.1" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="unidadePeso"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lb">lb</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="volume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Volume</FormLabel>
                      <FormControl>
                        <Input type="number" min="0.1" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="unidadeVolume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m3">m³</SelectItem>
                        <SelectItem value="cm3">cm³</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="tipoEntrega"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Entrega</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de entrega" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="expressa">Expressa (mais rápida, +50%)</SelectItem>
                      <SelectItem value="economica">Econômica (mais lenta, -20%)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="seguro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor para seguro (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="10" {...field} />
                  </FormControl>
                  <FormDescription>
                    Valor declarado para seguro (taxa de 1%)
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

export default CalculoFreteCalculadora;
