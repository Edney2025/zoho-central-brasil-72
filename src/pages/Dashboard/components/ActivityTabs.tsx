
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActivityList } from './ActivityList';
import { TaskList } from './TaskList';

export const ActivityTabs = () => {
  return (
    <Tabs defaultValue="atividades" className="w-full">
      <TabsList>
        <TabsTrigger value="atividades">Atividades Recentes</TabsTrigger>
        <TabsTrigger value="tarefas">Tarefas</TabsTrigger>
      </TabsList>
      <TabsContent value="atividades" className="pt-4">
        <ActivityList />
      </TabsContent>
      <TabsContent value="tarefas" className="pt-4">
        <TaskList />
      </TabsContent>
    </Tabs>
  );
};
