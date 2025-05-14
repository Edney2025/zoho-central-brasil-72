
import React from 'react';
import { ClienteFormValues } from './schema';
import { Card, CardContent } from '@/components/ui/card';
import { File, User, MapPin } from 'lucide-react';

interface FormReviewProps {
  data: ClienteFormValues;
  files: File[];
}

const FormReview: React.FC<FormReviewProps> = ({ data, files }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Revisão de Dados</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5 text-primary" />
              <h4 className="font-medium text-sm">Informações Pessoais</h4>
            </div>
            
            <dl className="divide-y divide-border">
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-muted-foreground">Nome</dt>
                <dd className="text-sm font-medium">{data.nome}</dd>
              </div>
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-muted-foreground">Email</dt>
                <dd className="text-sm font-medium">{data.email}</dd>
              </div>
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-muted-foreground">Telefone</dt>
                <dd className="text-sm font-medium">{data.telefone}</dd>
              </div>
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-muted-foreground">Tipo</dt>
                <dd className="text-sm font-medium capitalize">
                  {data.tipoPessoa === 'fisica' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                </dd>
              </div>
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-muted-foreground">
                  {data.tipoPessoa === 'fisica' ? 'CPF' : 'CNPJ'}
                </dt>
                <dd className="text-sm font-medium">{data.cpfCnpj}</dd>
              </div>
              {data.rgInscricao && (
                <div className="py-2 flex justify-between">
                  <dt className="text-sm text-muted-foreground">
                    {data.tipoPessoa === 'fisica' ? 'RG' : 'Inscrição Estadual'}
                  </dt>
                  <dd className="text-sm font-medium">{data.rgInscricao}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-primary" />
              <h4 className="font-medium text-sm">Endereço</h4>
            </div>
            
            <dl className="divide-y divide-border">
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-muted-foreground">CEP</dt>
                <dd className="text-sm font-medium">{data.cep}</dd>
              </div>
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-muted-foreground">Endereço</dt>
                <dd className="text-sm font-medium">{data.endereco}, {data.numero}</dd>
              </div>
              {data.complemento && (
                <div className="py-2 flex justify-between">
                  <dt className="text-sm text-muted-foreground">Complemento</dt>
                  <dd className="text-sm font-medium">{data.complemento}</dd>
                </div>
              )}
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-muted-foreground">Bairro</dt>
                <dd className="text-sm font-medium">{data.bairro}</dd>
              </div>
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-muted-foreground">Cidade/Estado</dt>
                <dd className="text-sm font-medium">{data.cidade}/{data.estado}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3">
              <File className="h-5 w-5 text-primary" />
              <h4 className="font-medium text-sm">Documentos Anexados</h4>
            </div>
            
            {files.length > 0 ? (
              <ul className="divide-y divide-border">
                {files.map((file, index) => (
                  <li key={index} className="py-2 flex justify-between">
                    <span className="text-sm">{file.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum documento anexado</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormReview;
