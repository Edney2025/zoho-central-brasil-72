
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { ChevronLeft, Package, PackageOpen, AlertCircle, Upload } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const AnunciarPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("novo");
  
  const [produto, setProduto] = useState({
    nome: '',
    categoria: '',
    preco: '',
    descricao: '',
    estado: 'novo',
    quantidade: '1'
  });
  
  const [imagens, setImagens] = useState<string[]>([]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduto(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProduto(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Em um cenário real, você faria upload para um serviço como Cloudinary
      // Aqui estamos apenas simulando com URLs locais
      const newImages = Array.from(e.target.files).map(file => 
        URL.createObjectURL(file)
      );
      
      setImagens(prev => [...prev, ...newImages]);
    }
  };
  
  const removeImage = (index: number) => {
    setImagens(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast({
        title: "Termos e Condições",
        description: "Você precisa aceitar os termos e condições para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    if (imagens.length === 0) {
      toast({
        title: "Imagens obrigatórias",
        description: "Adicione pelo menos uma imagem do produto.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulando o envio do anúncio
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Anúncio enviado com sucesso!",
        description: "Seu anúncio foi enviado para aprovação e estará disponível em breve.",
      });
      
      navigate('/ecommerce/produtos');
    }, 1500);
  };
  
  return (
    <div className="container mx-auto py-6">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate('/ecommerce/produtos')}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para a loja
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Anunciar Produto</h1>
            <p className="text-muted-foreground">
              Preencha os detalhes do produto que você deseja anunciar na nossa loja.
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <Tabs 
              defaultValue="novo" 
              className="w-full mb-6"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="novo" className="flex items-center">
                  <Package className="mr-2 h-4 w-4" />
                  Produto Novo
                </TabsTrigger>
                <TabsTrigger value="usado" className="flex items-center">
                  <PackageOpen className="mr-2 h-4 w-4" />
                  Produto Usado
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Card>
              <CardHeader>
                <CardTitle>Informações do Produto</CardTitle>
                <CardDescription>
                  Informe os detalhes básicos do produto que você deseja anunciar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome do Produto*</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={produto.nome}
                      onChange={handleInputChange}
                      placeholder="Ex: Bicicleta Elétrica Mountain Pro"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="categoria">Categoria*</Label>
                      <Select 
                        name="categoria" 
                        value={produto.categoria}
                        onValueChange={(value) => handleSelectChange('categoria', value)}
                      >
                        <SelectTrigger id="categoria">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="veiculos">Veículos Elétricos</SelectItem>
                          <SelectItem value="bicicletas">Bicicletas</SelectItem>
                          <SelectItem value="patinetes">Patinetes</SelectItem>
                          <SelectItem value="pecas">Peças e Componentes</SelectItem>
                          <SelectItem value="baterias">Baterias</SelectItem>
                          <SelectItem value="acessorios">Acessórios</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="quantidade">Quantidade*</Label>
                      <Input 
                        id="quantidade"
                        name="quantidade"
                        value={produto.quantidade}
                        onChange={handleInputChange}
                        type="number"
                        min="1"
                        placeholder="1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="preco">Preço (R$)*</Label>
                    <Input
                      id="preco"
                      name="preco"
                      value={produto.preco}
                      onChange={handleInputChange}
                      placeholder="0,00"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="descricao">Descrição do Produto*</Label>
                    <Textarea
                      id="descricao"
                      name="descricao"
                      value={produto.descricao}
                      onChange={handleInputChange}
                      placeholder="Descreva detalhes sobre o produto, características, estado de conservação, etc."
                      rows={5}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Imagens do Produto</CardTitle>
                <CardDescription>
                  Adicione fotos do seu produto. A primeira imagem será a capa do anúncio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label htmlFor="imagens" className="block mb-2">
                    Selecione até 6 imagens
                  </Label>
                  <div className="flex items-center justify-center border-2 border-dashed border-muted rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Arraste imagens aqui ou clique para selecionar
                      </p>
                      <Input
                        id="imagens"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => document.getElementById('imagens')?.click()}
                      >
                        Escolher Imagens
                      </Button>
                    </div>
                  </div>
                </div>
                
                {imagens.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {imagens.map((img, index) => (
                      <div key={index} className="relative">
                        <AspectRatio ratio={1/1}>
                          <img 
                            src={img} 
                            alt={`Imagem ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </AspectRatio>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          &times;
                        </Button>
                        {index === 0 && (
                          <span className="absolute bottom-0 left-0 right-0 text-center text-xs bg-primary text-primary-foreground p-1">
                            Imagem Principal
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {activeTab === "usado" && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Estado de Conservação</CardTitle>
                  <CardDescription>
                    Informe detalhes sobre o estado de conservação do produto usado.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select 
                    name="estado" 
                    value={produto.estado}
                    onValueChange={(value) => handleSelectChange('estado', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seminovo">Seminovo (até 3 meses de uso)</SelectItem>
                      <SelectItem value="poucouso">Pouco uso (até 1 ano)</SelectItem>
                      <SelectItem value="bomestado">Bom estado (1-3 anos)</SelectItem>
                      <SelectItem value="usado">Usado (mais de 3 anos)</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div>
                    <Label htmlFor="detalhes">Detalhes Adicionais</Label>
                    <Textarea
                      id="detalhes"
                      placeholder="Descreva detalhes específicos sobre o estado do produto, possíveis marcas de uso, etc."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Termos e Condições</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={setAcceptTerms}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    Concordo com os <a href="#" className="text-primary underline">termos e condições</a> para anunciar produtos na loja.
                  </Label>
                </div>
                
                <div className="flex items-start mt-4 p-3 bg-amber-50 text-amber-800 rounded-lg">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Atenção:</p>
                    <p>
                      Todos os anúncios passarão por uma avaliação da nossa equipe antes de serem publicados.
                      O prazo para aprovação é de até 48 horas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 text-right">
              <Button
                type="button"
                variant="outline"
                className="mr-2"
                onClick={() => navigate('/ecommerce/produtos')}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar Anúncio"}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Dicas para um bom anúncio</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
              <div>
                <h3 className="font-medium">Título claro e descritivo</h3>
                <p className="text-muted-foreground">
                  Use um título que descreva bem o produto, incluindo marca e características principais.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Imagens de qualidade</h3>
                <p className="text-muted-foreground">
                  Tire fotos com boa iluminação, mostrando o produto de vários ângulos.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Descrição detalhada</h3>
                <p className="text-muted-foreground">
                  Inclua todas as especificações técnicas, dimensões e características relevantes.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Preço justo</h3>
                <p className="text-muted-foreground">
                  Pesquise o valor de mercado para produtos similares antes de definir o preço.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Processo de Aprovação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Envio do Anúncio</h3>
                    <p className="text-sm text-muted-foreground">
                      Preencha todas as informações e envie
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Análise</h3>
                    <p className="text-sm text-muted-foreground">
                      Nossa equipe irá revisar seu anúncio
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Publicação</h3>
                    <p className="text-sm text-muted-foreground">
                      Anúncio aprovado estará disponível na loja
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium">Gerenciamento</h3>
                    <p className="text-sm text-muted-foreground">
                      Acompanhe e gerencie seus anúncios
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnunciarPage;
