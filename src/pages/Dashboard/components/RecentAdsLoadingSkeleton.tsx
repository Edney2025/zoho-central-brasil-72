
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const RecentAdsLoadingSkeleton = () => {
  return (
    <>
      {Array(4).fill(0).map((_, index) => (
        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="p-0">
            <Skeleton className="w-full h-48 rounded-t-lg" />
            <div className="absolute top-2 right-2">
              <Skeleton className="h-5 w-16" />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-3" />
            <div className="flex justify-between items-center mt-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-10" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between py-2 px-4 border-t">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
