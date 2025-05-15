
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Note {
  id: string;
  text: string;
  date: string;
}

const FormNotes: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const [newNote, setNewNote] = useState("");
  const notes = watch("notes") || [];
  const [isOpen, setIsOpen] = useState(false);

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const newNoteObject = {
      id: Date.now().toString(),
      text: newNote.trim(),
      date: new Date().toISOString(),
    };

    setValue("notes", [newNoteObject, ...notes], { 
      shouldValidate: true,
      shouldDirty: true 
    });
    
    setNewNote("");
  };

  const handleRemoveNote = (noteId: string) => {
    setValue(
      "notes",
      notes.filter((note: Note) => note.id !== noteId),
      { shouldValidate: true, shouldDirty: true }
    );
  };

  return (
    <div className="space-y-3">
      <Textarea
        placeholder="Adicione uma nota sobre este cliente..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        className="min-h-[100px]"
      />
      
      <div className="flex justify-end">
        <Button 
          type="button" 
          onClick={handleAddNote}
          disabled={!newNote.trim()}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Nota
        </Button>
      </div>

      {notes.length > 0 && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {notes.length} {notes.length === 1 ? "nota" : "notas"} registradas
              <span className="text-xs text-muted-foreground">
                {isOpen ? "Ocultar" : "Mostrar"}
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ScrollArea className="h-auto max-h-60 mt-3">
              <div className="space-y-3">
                {notes.map((note: Note) => (
                  <Card key={note.id} className="p-3 text-sm">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <p className="whitespace-pre-wrap">{note.text}</p>
                        <p className="text-xs flex items-center mt-2 text-muted-foreground">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {format(new Date(note.date), "PPp", { locale: ptBR })}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveNote(note.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default FormNotes;
