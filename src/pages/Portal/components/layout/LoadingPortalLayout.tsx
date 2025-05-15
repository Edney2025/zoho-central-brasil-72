
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const LoadingPortalLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-4 w-[250px] mt-4" />
    </div>
  );
};

export default LoadingPortalLayout;
