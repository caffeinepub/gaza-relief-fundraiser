import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Heart, Droplet, Home, Cross, Users, Shield, ArrowDown } from 'lucide-react';
import DonationForm from '@/components/donations/DonationForm';
import CampaignProgress from '@/components/donations/CampaignProgress';
import RecentDonations from '@/components/donations/RecentDonations';

export default function LandingPage() {
  const donationFormRef = useRef<HTMLDivElement>(null);

  const scrollToDonation = () => {
    donationFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/campaign-logo.dim_512x512.png" 
              alt="True Hope Foundation Logo" 
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold tracking-tight">True Hope Foundation</h1>
              <p className="text-xs text-muted-foreground">Humanitarian Relief & Development</p>
            </div>
          </div>
          <Button onClick={scrollToDonation} size="lg" className="font-semibold">
            Donate Now
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container relative py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Bringing Hope to Communities in Need
                </h2>
                <p className="text-xl text-muted-foreground md:text-2xl">
                  Your donation provides emergency aid, food, clean water, medical care, and shelter to vulnerable families around the world.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={scrollToDonation} size="lg" className="text-base font-semibold">
                  Make a Donation
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
                <Button onClick={scrollToDonation} variant="outline" size="lg" className="text-base font-semibold">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border shadow-2xl lg:aspect-auto lg:h-full lg:min-h-[400px]">
              <img 
                src="/assets/generated/hero-truehope.dim_1200x600.png" 
                alt="True Hope Foundation - Humanitarian Relief" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Progress */}
      <section className="border-b bg-muted/30 py-12">
        <div className="container">
          <CampaignProgress />
        </div>
      </section>

      {/* Impact Categories */}
      <section className="border-b py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Your Impact
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Every donation directly supports critical humanitarian aid for communities in crisis
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Droplet className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Clean Water</CardTitle>
                <CardDescription>
                  Access to safe drinking water and sanitation facilities
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Food Aid</CardTitle>
                <CardDescription>
                  Nutritious meals and food packages for families in need
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Cross className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Medical Care</CardTitle>
                <CardDescription>
                  Essential medicines, medical supplies, and healthcare services
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Shelter</CardTitle>
                <CardDescription>
                  Emergency housing and shelter materials for displaced families
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section ref={donationFormRef} className="scroll-mt-16 border-b bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Make Your Donation
              </h2>
              <p className="text-lg text-muted-foreground">
                Every contribution makes a difference in the lives of families in crisis
              </p>
            </div>
            <DonationForm />
          </div>
        </div>
      </section>

      {/* Recent Donations */}
      <section className="border-b py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <RecentDonations />
          </div>
        </div>
      </section>

      {/* Trust & FAQ Section */}
      <section className="border-b py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How will my donation be used?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Your donation goes directly to providing emergency humanitarian aid including food, clean water, medical supplies, shelter materials, and support services for vulnerable communities worldwide. We work with trusted partners on the ground to ensure aid reaches those who need it most.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Is my donation secure?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Yes, all donations are processed securely through the Internet Computer blockchain. Your pledge is recorded transparently and immutably, ensuring accountability and trust in the donation process.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Can I remain anonymous?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Absolutely. You can choose to donate anonymously by leaving the name field blank. Your donation will still be recorded and counted toward our campaign goal, but your identity will remain private.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Who is True Hope Foundation?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  True Hope Foundation is dedicated to providing humanitarian assistance to communities in crisis around the world. We work with local partners and international organizations to deliver aid efficiently and transparently to those who need it most.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Card className="mt-12 border-2 bg-primary/5">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="mb-2">Transparency & Trust</CardTitle>
                    <CardDescription className="text-base">
                      All donations are recorded on the blockchain for complete transparency. We are committed to ensuring every contribution reaches families in need and makes a real impact.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img 
                  src="/assets/generated/campaign-logo.dim_512x512.png" 
                  alt="True Hope Foundation Logo" 
                  className="h-8 w-8 object-contain"
                />
                <span className="font-bold">True Hope Foundation</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Providing emergency humanitarian aid to communities in crisis worldwide
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">About</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Our Mission</li>
                <li>Impact Reports</li>
                <li>Partners</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">Connect</h3>
              <div className="flex gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1">
              © {new Date().getFullYear()} True Hope Foundation. Built with{' '}
              <Heart className="h-4 w-4 fill-primary text-primary" /> using{' '}
              <a 
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'truehopefoundation')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
