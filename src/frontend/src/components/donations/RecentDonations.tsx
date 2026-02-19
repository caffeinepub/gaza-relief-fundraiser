import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Heart } from 'lucide-react';
import { useActor } from '@/hooks/useActor';
import { formatCurrency, formatTimestamp } from '@/lib/format';

const RECENT_LIMIT = 10;

export default function RecentDonations() {
  const { actor, isFetching: actorLoading } = useActor();

  const { data: donations, isLoading } = useQuery({
    queryKey: ['recentDonations', RECENT_LIMIT],
    queryFn: async () => {
      if (!actor) return [];
      return await actor.getRecentDonations(BigInt(RECENT_LIMIT));
    },
    enabled: !!actor && !actorLoading,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-16 w-full" />
                {i < 4 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!donations || donations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Recent Donations</CardTitle>
          <CardDescription>
            Be the first to support this campaign
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No donations yet. Be the first to contribute!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Recent Donations</CardTitle>
        <CardDescription>
          Thank you to our generous supporters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {donations.map((donation, index) => (
            <div key={donation.id.toString()}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 fill-primary text-primary" />
                    <p className="font-semibold">
                      {donation.name || 'Anonymous'}
                    </p>
                  </div>
                  {donation.message && (
                    <p className="text-sm text-muted-foreground italic">
                      "{donation.message}"
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formatTimestamp(Number(donation.timestamp))}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-lg font-bold text-primary">
                    {formatCurrency(Number(donation.amount))}
                  </p>
                </div>
              </div>
              {index < donations.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
