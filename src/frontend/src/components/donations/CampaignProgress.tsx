import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, Users, Target } from 'lucide-react';
import { useActor } from '@/hooks/useActor';
import { formatCurrency } from '@/lib/format';
import { CAMPAIGN_GOAL } from '@/config/campaign';

export default function CampaignProgress() {
  const { actor, isFetching: actorLoading } = useActor();

  const { data: totalAmount, isLoading: totalLoading } = useQuery({
    queryKey: ['totalAmount'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return await actor.getTotalAmount();
    },
    enabled: !!actor && !actorLoading,
  });

  const { data: donationCount, isLoading: countLoading } = useQuery({
    queryKey: ['donationCount'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return await actor.getDonationCount();
    },
    enabled: !!actor && !actorLoading,
  });

  const isLoading = totalLoading || countLoading;
  const total = Number(totalAmount || BigInt(0));
  const count = Number(donationCount || BigInt(0));
  const progressPercentage = Math.min((total / CAMPAIGN_GOAL) * 100, 100);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl">Campaign Progress</CardTitle>
        <CardDescription>
          Together, we're making a real difference for families in Gaza
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-primary">{formatCurrency(total)}</p>
              <p className="text-sm text-muted-foreground">raised</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold">{formatCurrency(CAMPAIGN_GOAL)}</p>
              <p className="text-sm text-muted-foreground">goal</p>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-center text-sm font-medium text-muted-foreground">
            {progressPercentage.toFixed(1)}% of goal reached
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(total)}</p>
              <p className="text-xs text-muted-foreground">Total Raised</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs text-muted-foreground">Donations</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(CAMPAIGN_GOAL - total)}</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
