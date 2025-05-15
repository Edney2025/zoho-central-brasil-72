
import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ClienteTagsProps {
  tags: string[] | undefined;
}

const ClienteTags: React.FC<ClienteTagsProps> = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return <span className="text-muted-foreground text-xs">Sem etiquetas</span>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {tags.slice(0, 2).map(tag => (
        <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0 gap-1 flex items-center">
          <span className="h-2 w-2 rounded-full bg-primary/60 mr-1"></span>
          {tag}
        </Badge>
      ))}
      
      {tags.length > 2 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="text-xs px-1.5 py-0">
                +{tags.length - 2}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                {tags.slice(2).map(tag => (
                  <div key={tag} className="text-xs">{tag}</div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default ClienteTags;
