
import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { localStorageService } from '@/services/localStorageService';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  createdAt: string;
  read: boolean;
}

export const NotificationsSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Carregar notificações do localStorage
  useEffect(() => {
    const savedNotifications = localStorageService.getData('notifications') || [];
    setNotifications(savedNotifications);
    
    // Contar notificações não lidas
    const unread = savedNotifications.filter((notification: Notification) => !notification.read).length;
    setUnreadCount(unread);
  }, []);

  // Adicionar uma nova notificação (exemplo de uso)
  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      id: `notification-${Date.now()}`,
      ...notification,
      createdAt: new Date().toISOString(),
      read: false
    };
    
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    setUnreadCount(unreadCount + 1);
    localStorageService.setData('notifications', updatedNotifications);
    
    // Mostrar toast para notificação
    toast({
      title: notification.title,
      description: notification.message,
    });
  };
  
  // Marcar uma notificação como lida
  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    
    setNotifications(updatedNotifications);
    const unread = updatedNotifications.filter(notification => !notification.read).length;
    setUnreadCount(unread);
    localStorageService.setData('notifications', updatedNotifications);
  };
  
  // Marcar todas como lidas
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    localStorageService.setData('notifications', updatedNotifications);
  };
  
  // Formatar a data para exibição
  const formatNotificationDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'agora mesmo';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `há ${hours} hora${hours > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 172800) {
      return 'há 1 dia';
    } else {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[300px] md:w-[400px]">
          <DropdownMenuLabel className="flex justify-between items-center">
            <span>Notificações</span>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs h-7"
              >
                Marcar todas como lidas
              </Button>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {notifications.length > 0 ? (
            <div className="max-h-[400px] overflow-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem 
                  key={notification.id} 
                  className="cursor-pointer flex items-start p-3 hover:bg-muted"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-2 w-full">
                    {!notification.read && (
                      <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                    )}
                    <div className={`flex-1 ${notification.read ? "text-muted-foreground" : ""}`}>
                      <p className={`text-sm ${notification.read ? "" : "font-semibold"}`}>{notification.title}</p>
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatNotificationDate(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Nenhuma notificação
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Esta função está disponível globalmente para adicionar notificações de qualquer lugar da aplicação */}
      {window && (window as any).addNotification = addNotification}
    </>
  );
};
