
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  FileText,
  ShoppingBag,
  CreditCard,
  Truck,
  HelpCircle,
  UserCog
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: 'faq1',
    question: 'Como acompanho o status do meu pedido?',
    answer: 'Você pode acompanhar o status do seu pedido na seção "Pedidos" do seu painel. Lá você encontrará informações detalhadas sobre o processamento, aprovação, produção e entrega do seu pedido. Também enviamos atualizações por email quando há mudanças significativas no status.',
    category: 'pedidos'
  },
  {
    id: 'faq2',
    question: 'Qual o prazo de entrega dos pedidos?',
    answer: 'O prazo de entrega varia de acordo com o tipo de produto e a região de entrega. Normalmente, nosso prazo médio é de 7 a 15 dias úteis após a aprovação do pedido. Você pode verificar o prazo específico do seu pedido na página de detalhes do pedido.',
    category: 'pedidos'
  },
  {
    id: 'faq3',
    question: 'Como funciona o processo de orçamento?',
    answer: 'O processo de orçamento começa com uma solicitação que pode ser feita pelo portal ou diretamente com nossa equipe comercial. Após analisarmos suas necessidades, enviamos uma proposta detalhada com valores e prazos. Você pode revisar, solicitar ajustes e, quando estiver satisfeito, aprovar o orçamento diretamente pelo portal.',
    category: 'orcamentos'
  },
  {
    id: 'faq4',
    question: 'Quais são as formas de pagamento aceitas?',
    answer: 'Aceitamos diversas formas de pagamento, incluindo boleto bancário, transferência bancária, cartões de crédito (parcelamento em até 12x) e PIX para pagamentos à vista. Empresas com cadastro aprovado também podem ter acesso a condições especiais como pagamento a prazo.',
    category: 'pagamentos'
  },
  {
    id: 'faq5',
    question: 'Como solicitar suporte técnico?',
    answer: 'Para solicitar suporte técnico, acesse a seção "Suporte" no seu painel de cliente e abra um ticket descrevendo detalhadamente sua situação. Nossa equipe responderá em até 24 horas úteis. Para casos urgentes, o chat ao vivo está disponível em horário comercial (segunda a sexta, das 8h às 18h).',
    category: 'suporte'
  },
  {
    id: 'faq6',
    question: 'Como atualizar meus dados cadastrais?',
    answer: 'Para atualizar seus dados cadastrais, acesse a seção "Meu Perfil" no painel do cliente. Lá você poderá editar suas informações pessoais, endereço, dados de contato e preferências. É importante manter seus dados sempre atualizados para garantir entregas corretas e comunicação eficiente.',
    category: 'conta'
  },
  {
    id: 'faq7',
    question: 'Quais documentos preciso fornecer para compras como pessoa jurídica?',
    answer: 'Para compras como pessoa jurídica, solicitamos: CNPJ ativo, contrato social ou documento equivalente, comprovante de endereço da empresa, documentos pessoais do responsável legal e, dependendo do volume de compras, documentação financeira adicional pode ser solicitada para análise de crédito.',
    category: 'conta'
  },
  {
    id: 'faq8',
    question: 'Como funcionam os prazos de garantia?',
    answer: 'Todos os nossos produtos possuem garantia mínima de 90 dias, conforme o Código de Defesa do Consumidor. Produtos específicos podem ter garantias estendidas de até 2 anos, dependendo da categoria. As condições de garantia estão detalhadas no certificado que acompanha o produto e também podem ser consultadas na página do produto.',
    category: 'produtos'
  },
  {
    id: 'faq9',
    question: 'O que fazer em caso de divergências no pedido recebido?',
    answer: 'Se houver qualquer divergência no pedido recebido (produtos incorretos, quantidades diferentes ou avarias), entre em contato com nosso suporte em até 7 dias após o recebimento. Registre a ocorrência com fotos e descrição detalhada do problema através da abertura de um ticket na seção de Suporte.',
    category: 'pedidos'
  },
  {
    id: 'faq10',
    question: 'Como solicitar uma segunda via de nota fiscal?',
    answer: 'Para solicitar uma segunda via da nota fiscal, acesse a seção "Pedidos", localize o pedido desejado e clique na opção "Documentos". Caso a nota fiscal não esteja disponível para download, abra um ticket no Suporte solicitando o reenvio, informando o número do pedido.',
    category: 'pagamentos'
  },
];

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredFAQs = faqItems.filter((item) => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'todos' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = [
    { id: 'todos', name: 'Todos', icon: HelpCircle },
    { id: 'pedidos', name: 'Pedidos', icon: ShoppingBag },
    { id: 'orcamentos', name: 'Orçamentos', icon: FileText },
    { id: 'pagamentos', name: 'Pagamentos', icon: CreditCard },
    { id: 'produtos', name: 'Produtos', icon: Truck },
    { id: 'conta', name: 'Minha Conta', icon: UserCog },
    { id: 'suporte', name: 'Suporte', icon: HelpCircle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Central de Ajuda</h1>
      </div>
      
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 pb-4">
            <h2 className="text-2xl font-semibold">Como podemos ajudar?</h2>
            <p className="text-muted-foreground">
              Encontre respostas para as perguntas mais frequentes ou entre em contato com nosso suporte.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar perguntas frequentes..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-64 space-y-2">
          <h3 className="text-lg font-medium mb-2">Categorias</h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveCategory(category.id)}
              >
                <category.icon className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
          
          <Card className="mt-6">
            <CardHeader className="pb-3">
              <CardTitle>Precisa de mais ajuda?</CardTitle>
              <CardDescription>
                Nossa equipe de suporte está pronta para ajudar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Contatar Suporte
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>
                Encontre respostas para as dúvidas mais comuns
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-10">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Nenhum resultado encontrado</h3>
                  <p className="text-muted-foreground mt-2">
                    Não encontramos respostas para sua pesquisa. Tente outros termos ou entre em contato com nosso suporte.
                  </p>
                  <Button className="mt-4" variant="outline">
                    Contatar Suporte
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
