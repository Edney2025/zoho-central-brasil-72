
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Package, 
  PackageOpen, 
  Wrench, 
  Upload, 
  ArrowLeft,
  Info,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AnunciarPage = () => {
  const [activeTab, setActiveTab] = useState('produto-novo');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Anúncio enviado",
      description: "Seu anúncio foi enviado para aprovação e será publicado em breve.",
    });
    setFormSubmitted(true);
  };
  
  const handleBack = () => {
    navigate('/portal/dashboard');
  };
  
  const handleStartNew = () => {
    setFormSubmitted(false);
  };
  
  if (formSubmitted) {
    return (
      <Card className="max-w-3xl mx-auto mt-8">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">Anúncio Enviado com Sucesso!</h2>
            <p className="text-muted-foreground">
              Seu anúncio foi recebido e está sendo revisado. Você receberá uma notificação quando ele for aprovado.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o Dashboard
              </Button>
              <Button onClick={handleStartNew}>
                Criar Novo Anúncio
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold">Anunciar Item</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="produto-novo" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            Produto Novo
          </TabsTrigger>
          <TabsTrigger value="produto-usado" className="flex items-center">
            <PackageOpen className="mr-2 h-4 w-4" />
            Produto Usado
          </TabsTrigger>
          <TabsTrigger value="servico" className="flex items-center">
            <Wrench className="mr-2 h-4 w-4" />
            Serviço
          </TabsTrigger>
        </TabsList>
        
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Dica</AlertTitle>
          <AlertDescription>
            Anúncios com fotos de boa qualidade e descrições detalhadas têm 70% mais chances de venda.
          </AlertDescription>
        </Alert>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === 'produto-novo' && 'Anunciar Produto Novo'}
              {activeTab === 'produto-usado' && 'Anunciar Produto Usado'}
              {activeTab === 'servico' && 'Anunciar Serviço'}
            </CardTitle>
            <CardDescription>
              {activeTab === 'produto-novo' && 'Preencha as informações do produto novo que deseja anunciar'}
              {activeTab === 'produto-usado' && 'Preencha as informações do produto usado que deseja anunciar'}
              {activeTab === 'servico' && 'Preencha as informações do serviço que deseja anunciar'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título do Anúncio *</Label>
                    <Input id="titulo" placeholder="Ex: Smartphone Samsung Galaxy S23 Ultra" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                        <SelectItem value="veiculos">Veículos</SelectItem>
                        <SelectItem value="imoveis">Imóveis</SelectItem>
                        <SelectItem value="servicos">Serviços</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço *</Label>
                    <Input id="price" placeholder="R$ 0,00" required />
                  </div>
                  
                  {activeTab === 'produto-novo' && (
                    <div className="space-y-2">
                      <Label htmlFor="estoque">Quantidade em Estoque *</Label>
                      <Input id="estoque" type="number" min="1" defaultValue="1" required />
                    </div>
                  )}
                  
                  {activeTab === 'produto-usado' && (
                    <div className="space-y-2">
                      <Label htmlFor="condicao">Condição do Produto *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a condição" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="novo-na-caixa">Novo na caixa</SelectItem>
                          <SelectItem value="semi-novo">Semi-novo</SelectItem>
                          <SelectItem value="usado-bom">Usado em bom estado</SelectItem>
                          <SelectItem value="usado-regular">Usado em estado regular</SelectItem>
                          <SelectItem value="para-pecas">Para peças/Não funcional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {activeTab === 'servico' && (
                    <div className="space-y-2">
                      <Label htmlFor="disponibilidade">Disponibilidade *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a disponibilidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="imediata">Imediata</SelectItem>
                          <SelectItem value="agendamento">Mediante agendamento</SelectItem>
                          <SelectItem value="sob-demanda">Sob demanda</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição Detalhada *</Label>
                    <Textarea 
                      id="descricao" 
                      placeholder="Descreva o produto ou serviço em detalhes..." 
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Fotos (até 5)</Label>
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Arraste imagens ou clique para fazer upload
                      </p>
                      <Button variant="outline" type="button" className="mt-2">
                        Selecionar Arquivos
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="flex justify-end gap-4">
                  <Button variant="outline" type="button" onClick={handleBack}>Cancelar</Button>
                  <Button type="submit">Enviar Anúncio</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default AnunciarPage;
