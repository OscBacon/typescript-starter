import { useQuery } from '@tanstack/react-query';
import { CircleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SiteHeader } from '@/components/site-header';
import { Skeleton } from '@/components/ui/skeleton';
import { helloOptions } from './api.ts';

export function App() {
  const { data, isPending, error } = useQuery(helloOptions());

  return (
    <div className="min-h-svh bg-background">
      <SiteHeader />
      <main className="flex items-center justify-center p-6 pt-24">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Hello from the frontend</CardTitle>
            <CardDescription>Message from GET /api/hello</CardDescription>
          </CardHeader>
          <CardContent>
            {isPending && <Skeleton className="h-5 w-40" />}
            {error && (
              <Alert variant="destructive">
                <CircleAlert />
                <AlertTitle>API error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
            {data && <p className="text-sm">{data.message}</p>}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
