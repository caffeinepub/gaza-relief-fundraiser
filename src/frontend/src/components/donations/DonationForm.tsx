import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useActor } from '@/hooks/useActor';
import { parseAmount, formatCurrency } from '@/lib/format';

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

export default function DonationForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const submitMutation = useMutation({
    mutationFn: async (data: { amount: bigint; name: string | null; message: string | null }) => {
      if (!actor) throw new Error('Backend not initialized');
      await actor.submitDonation(data.amount, data.name, data.message);
    },
    onSuccess: () => {
      setShowSuccess(true);
      setSelectedAmount(null);
      setCustomAmount('');
      setName('');
      setMessage('');
      setError('');
      
      // Invalidate queries to refresh totals and recent donations
      queryClient.invalidateQueries({ queryKey: ['totalAmount'] });
      queryClient.invalidateQueries({ queryKey: ['donationCount'] });
      queryClient.invalidateQueries({ queryKey: ['recentDonations'] });
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    },
    onError: (err: Error) => {
      setError(err.message || 'Failed to submit donation. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const amountToUse = selectedAmount || parseAmount(customAmount);
    
    if (!amountToUse || amountToUse <= 0) {
      setError('Please enter a valid donation amount greater than 0');
      return;
    }

    submitMutation.mutate({
      amount: BigInt(amountToUse),
      name: name.trim() || null,
      message: message.trim() || null,
    });
  };

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const currentAmount = selectedAmount || parseAmount(customAmount) || 0;

  if (showSuccess) {
    return (
      <Card className="border-2 border-primary/50 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-bold">Thank You!</h3>
              <p className="text-muted-foreground">
                Your generous donation has been recorded. Together, we're making a difference for families in Gaza.
              </p>
            </div>
            <Button onClick={() => setShowSuccess(false)} variant="outline">
              Make Another Donation
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Choose Your Donation Amount</CardTitle>
        <CardDescription>
          Select a preset amount or enter a custom amount
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Preset Amounts */}
          <div className="space-y-3">
            <Label>Quick Select</Label>
            <div className="grid grid-cols-3 gap-3">
              {PRESET_AMOUNTS.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount ? 'default' : 'outline'}
                  className="h-auto py-4 text-lg font-semibold"
                  onClick={() => handlePresetClick(amount)}
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="customAmount">Or Enter Custom Amount ($)</Label>
            <Input
              id="customAmount"
              type="number"
              min="1"
              step="1"
              placeholder="Enter amount"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className="text-lg"
            />
          </div>

          {/* Current Amount Display */}
          {currentAmount > 0 && (
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground">Your donation</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(currentAmount)}</p>
            </div>
          )}

          {/* Optional Fields */}
          <div className="space-y-4 border-t pt-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name (Optional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                Leave blank to donate anonymously
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Share a message of support"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                rows={3}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg font-semibold"
            disabled={submitMutation.isPending || currentAmount <= 0}
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              `Donate ${currentAmount > 0 ? formatCurrency(currentAmount) : ''}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
