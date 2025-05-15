
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Menu } from 'lucide-react';
import NotificationDropdown from '../NotificationDropdown';

interface PortalHeaderProps {
  user: any;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  onSignOut: () => void;
}

const PortalHeader: React.FC<PortalHeaderProps> = ({
  user,
  mobileNavOpen,
  setMobileNavOpen,
  onSignOut
}) => {
  const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : '??';

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center gap-2">
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
        </Sheet>
        <h1 className="font-bold text-lg md:hidden">Portal do Cliente</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <NotificationDropdown />
        <Avatar className="h-8 w-8">
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default PortalHeader;
