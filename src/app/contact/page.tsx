import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="w-full bg-background text-foreground">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center">
          <Badge
            variant="outline"
            className="border-primary/50 text-primary"
          >
            Get In Touch
          </Badge>
          <h1 className="mt-4 font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s Build Something Great
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Have a project in mind or just want to say hello? We&apos;d love to
            hear from you.
          </p>
        </section>

        {/* Contact Form and Info */}
        <section className="mt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <Card>
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="first-name">First Name</Label>
                        <Input
                          id="first-name"
                          type="text"
                          className="mt-2"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input
                          id="last-name"
                          type="text"
                          className="mt-2"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        className="mt-2"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        className="mt-2"
                        rows={5}
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <div>
                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                      >
                        Send Message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between rounded-lg bg-card p-8">
                <h3 className="font-headline text-2xl font-bold">
                  Contact Information
                </h3>
                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <a
                        href="mailto:contact@dezine.com"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        contact@dezine.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">WhatsApp</h4>
                      <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Location</h4>
                      <p className="text-muted-foreground">
                        San Francisco, CA
                      </p>
                    </div>
                  </div>
                </div>
                 <div className="mt-8 border-t border-border pt-6">
                   <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      Schedule a Call
                   </Button>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
