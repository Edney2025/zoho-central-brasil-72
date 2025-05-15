
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import AvaliacaoEstrelas from './AvaliacaoEstrelas';

interface Comentario {
  id: string;
  nome: string;
  avatar?: string;
  avaliacao: number;
  texto: string;
  data: Date;
}

interface ComentariosAvaliacoesProps {
  produtoId: string;
  comentarios: Comentario[];
}

const ComentariosAvaliacoes: React.FC<ComentariosAvaliacoesProps> = ({ 
  produtoId, 
  comentarios: comentariosIniciais 
}) => {
  const [comentarios, setComentarios] = useState<Comentario[]>(comentariosIniciais);
  const [novoComentario, setNovoComentario] = useState('');
  const [avaliacao, setAvaliacao] = useState(5);
  
  const handleSubmitComentario = () => {
    if (!novoComentario.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, escreva um comentário antes de enviar.",
        variant: "destructive",
      });
      return;
    }
    
    const novoItem: Comentario = {
      id: `comentario-${Date.now()}`,
      nome: "Usuário Atual", // Em um sistema real, viria do usuário logado
      avaliacao: avaliacao,
      texto: novoComentario,
      data: new Date()
    };
    
    setComentarios([novoItem, ...comentarios]);
    setNovoComentario('');
    setAvaliacao(5);
    
    toast({
      title: "Avaliação enviada",
      description: "Sua avaliação foi publicada com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Avaliações e Comentários</h2>
        
        <div className="bg-muted/30 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-3">Deixe sua avaliação</h3>
          <div className="flex items-center mb-4">
            <span className="mr-2">Sua nota:</span>
            <AvaliacaoEstrelas 
              avaliacao={avaliacao}
              tamanho={5}
              interativo={true}
              onChange={setAvaliacao}
            />
          </div>
          <Textarea
            placeholder="Escreva aqui seu comentário sobre o produto..."
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            rows={4}
            className="mb-3"
          />
          <Button onClick={handleSubmitComentario}>Enviar Avaliação</Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-xl font-medium">
          {comentarios.length} {comentarios.length === 1 ? 'Avaliação' : 'Avaliações'}
        </h3>
        
        {comentarios.length === 0 ? (
          <p className="text-muted-foreground italic">Seja o primeiro a avaliar este produto!</p>
        ) : (
          <div className="space-y-4">
            {comentarios.map((comentario) => (
              <Card key={comentario.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        {comentario.avatar ? (
                          <AvatarImage src={comentario.avatar} alt={comentario.nome} />
                        ) : null}
                        <AvatarFallback>{comentario.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{comentario.nome}</h4>
                        <AvaliacaoEstrelas avaliacao={comentario.avaliacao} />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {format(comentario.data, 'dd/MM/yyyy')}
                    </span>
                  </div>
                  <p className="mt-3 text-sm">{comentario.texto}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComentariosAvaliacoes;
