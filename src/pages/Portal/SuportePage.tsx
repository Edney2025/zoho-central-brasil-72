
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  MessageCircle, 
  Send, 
  Clock, 
  CheckCircle, 
  PlusCircle, 
  AlertTriangle,
  Search,
  RefreshCw
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';

// Mock data for tickets
const ticketsExemplo = [
  {
    id: 'TIC001',
    assunto: 'Dúvida sobre pedido #12345',
    status: 'aberto',
    dataCriacao: '15/05/2023',
    ultimaAtualizacao: '16/05/2023',
    mensagens: [
      {
        remetente: 'cliente',
        texto: 'Gostaria de saber o status atual do meu pedido #12345',
        data: '15/05/2023 14:32'
      },
      {
        remetente: 'suporte',
        texto: 'Olá! Seu pedido está em fase de produção. A previsão de entrega é dia 25/05/2023.',
        data: '16/05/2023 10:15'
      }
    ]
  },
  {
    id: 'TIC002',
    assunto: 'Problema com pagamento',
    status: 'fechado',
    dataCriacao: '10/05/2023',
    ultimaAtualizacao: '12/05/2023',
    mensagens: [
      {
        remetente: 'cliente',
        texto: 'Estou tentando efetuar o pagamento do pedido #54321 mas está dando erro.',
        data: '10/05/2023 09:45'
      },
      {
        remetente: 'suporte',
        texto: 'Por favor, poderia nos informar qual o erro que está aparecendo?',
        data: '10/05/2023 11:20'
      },
      {
        remetente: 'cliente',
        texto: 'Aparece "Transação não autorizada".',
        data: '10/05/2023 13:05'
      },
      {
        remetente: 'suporte',
        texto: 'Verificamos e o problema está resolvido. Por favor, tente novamente.',
        data: '12/05/2023 14:30'
      },
      {
        remetente: 'cliente',
        texto: 'Funcionou! Obrigado pela ajuda.',
        data: '12/05/2023 15:15'
      },
      {
        remetente: 'suporte',
        texto: 'Ótimo! Estamos à disposição para qualquer outra dúvida.',
        data: '12/05/2023 15:30'
      }
    ]
  }
];

const ticketSchema = z.object({
  assunto: z.string().min(5, 'Assunto deve ter pelo menos 5 caracteres'),
  mensagem: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

const messageSchema = z.object({
  mensagem: z.string().min(1, 'Mensagem não pode estar vazia'),
});

type MessageFormValues = z.infer<typeof messageSchema>;

const SuportePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedTicket, setSelectedTicket] = useState<typeof ticketsExemplo[0] | null>(null);
  const [newTicket, setNewTicket] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const ticketForm = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      assunto: '',
      mensagem: '',
    },
  });

  const messageForm = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      mensagem: '',
    },
  });

  const handleTicketSubmit = (values: TicketFormValues) => {
    toast({
      title: "Ticket criado com sucesso",
      description: "Em breve nossa equipe entrará em contato.",
    });
    
    // Reset form and go back to tickets list
    ticketForm.reset();
    setNewTicket(false);
  };

  const handleMessageSubmit = (values: MessageFormValues) => {
    toast({
      title: "Mensagem enviada",
      description: "Sua mensagem foi enviada com sucesso.",
    });
    
    // Reset message form
    messageForm.reset();
  };

  const filteredTickets = ticketsExemplo.filter(ticket =>
    ticket.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'aberto':
        return <Badge className="bg-green-500"><Clock className="mr-1 h-3 w-3" /> Aberto</Badge>;
      case 'fechado':
        return <Badge className="bg-gray-500"><CheckCircle className="mr-1 h-3 w-3" /> Fechado</Badge>;
      case 'pendente':
        return <Badge className="bg-yellow-500"><AlertTriangle className="mr-1 h-3 w-3" /> Pendente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Suporte ao Cliente</h1>
        
        {!newTicket && !selectedTicket && activeTab === 'tickets' && (
          <Button onClick={() => setNewTicket(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Ticket
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 h-auto">
          <TabsTrigger value="tickets" className="flex items-center gap-2 py-2">
            <MessageCircle className="h-4 w-4" /> Tickets de Suporte
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2 py-2">
            <MessageCircle className="h-4 w-4" /> Chat ao Vivo
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tickets" className="space-y-4 mt-4">
          {newTicket ? (
            <Card>
              <CardHeader>
                <CardTitle>Novo Ticket de Suporte</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo para criar um novo ticket
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...ticketForm}>
                  <form onSubmit={ticketForm.handleSubmit(handleTicketSubmit)} className="space-y-4">
                    <FormField
                      control={ticketForm.control}
                      name="assunto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assunto</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o assunto do seu ticket" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={ticketForm.control}
                      name="mensagem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descreva detalhadamente sua dúvida ou problema" 
                              className="h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setNewTicket(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit">
                        <Send className="mr-2 h-4 w-4" /> Enviar Ticket
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          ) : selectedTicket ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedTicket.assunto}</CardTitle>
                    <CardDescription className="mt-1">
                      Ticket #{selectedTicket.id} • Criado em {selectedTicket.dataCriacao}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedTicket.status)}
                    <Button variant="outline" size="sm" onClick={() => setSelectedTicket(null)}>
                      Voltar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 max-h-96 overflow-y-auto p-2">
                  {selectedTicket.mensagens.map((mensagem, index) => (
                    <div 
                      key={index} 
                      className={`flex ${mensagem.remetente === 'cliente' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          mensagem.remetente === 'cliente' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{mensagem.texto}</p>
                        <p className={`text-xs mt-1 ${
                          mensagem.remetente === 'cliente' 
                            ? 'text-primary-foreground/80' 
                            : 'text-muted-foreground'
                        }`}>
                          {mensagem.data}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedTicket.status !== 'fechado' && (
                  <Form {...messageForm}>
                    <form onSubmit={messageForm.handleSubmit(handleMessageSubmit)} className="space-y-4">
                      <FormField
                        control={messageForm.control}
                        name="mensagem"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Responder</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                <Textarea 
                                  placeholder="Digite sua mensagem..." 
                                  className="resize-none"
                                  {...field} 
                                />
                                <Button type="submit" size="icon" className="shrink-0">
                                  <Send className="h-4 w-4" />
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                )}
              </CardContent>
              <CardFooter className="justify-between border-t pt-4">
                <div className="text-sm text-muted-foreground">
                  Última atualização: {selectedTicket.ultimaAtualizacao}
                </div>
                {selectedTicket.status === 'aberto' && (
                  <Button variant="outline" size="sm">
                    Fechar Ticket
                  </Button>
                )}
              </CardFooter>
            </Card>
          ) : (
            <>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar tickets..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Meus Tickets</CardTitle>
                  <CardDescription>
                    Visualize e gerencie seus tickets de suporte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Número</TableHead>
                          <TableHead>Assunto</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTickets.length > 0 ? (
                          filteredTickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                              <TableCell className="font-medium">{ticket.id}</TableCell>
                              <TableCell>{ticket.assunto}</TableCell>
                              <TableCell>{ticket.dataCriacao}</TableCell>
                              <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => setSelectedTicket(ticket)}
                                >
                                  Visualizar
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-6">
                              {searchTerm ? 'Nenhum ticket encontrado' : 'Você não possui tickets de suporte'}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="chat" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Chat ao Vivo</CardTitle>
              <CardDescription>
                Converse em tempo real com nossa equipe de suporte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">Chat Indisponível</h3>
                <p className="text-muted-foreground mb-4">
                  Nossos atendentes estão offline no momento.
                  <br />Horário de atendimento: Segunda à Sexta, das 8h às 18h.
                </p>
                <Button>
                  <RefreshCw className="mr-2 h-4 w-4" /> Verificar Disponibilidade
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuportePage;
