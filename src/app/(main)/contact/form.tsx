'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Loader2, Dribbble, Instagram, Linkedin } from 'lucide-react';
import { Footer } from '@/components/footer';
import { useToast } from '@/hooks/use-toast';
import { usePublicFaqs } from '@/hooks/useFaqs';
import { useFirestore } from '@/firebase';
import { addMessage } from '@/lib/firestore/messages';
import { usePublicSettings } from '@/hooks/use-settings';

// This is an inline SVG component for the Pinterest icon.
const PinterestIcon = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.103 3.203 9.422 7.625 11.23.02-.42.043-.98.043-1.16 0-.44-.288-.97-.288-.97s-.683-2.73.27-4.55c.866-1.66 2.73-5.4 2.73-7.44 0-3.23-2.25-6.04-5.08-6.04-4.09 0-6.78 3.06-6.78 6.59 0 2.11.81 5.08 2.84 5.08.81 0 1.6-8.56 1.6-2.5 0-2.25-1.32-3.98-2.67-3.98-2.16 0-3.64 1.52-3.64 4.02 0 1.34.5 2.38 1.2 3.1.09.09.09.19.06.27l-.24.91c-.05.19-.22.24-.4.15a8.21 8.21 0 0 1-4.02-5.7C.32 8.71 3 3.14 8.03 3.14c5.63 0 9.77 3.82 9.77 9.17 0 5.15-3.06 10.05-7.14 10.05-1.39 0-2.7-.72-3.14-1.55l-.01.01c-.13-.3-.12-.31-.1-.45l.6-2.58.01-.01c.14-.59.5-1.12.5-1.12.44.8 1.48 1.48 2.5 1.48 2.9 0 5.2-2.7 5.2-6.23 0-2.45-1.3-4.3-3.95-4.3-2.9 0-4.7 2.1-4.7 4.5 0 1.1.3 2.1.9 2.8.3.4.3.5.2 1l-.2 1.1c-.1.5-.1.6-.2 1l-1.3 5.4c-.4 1.8-1.5 4.3-1.5 4.3-.2.8.2 1.7.2 1.7s.4-1.8.5-2.2c.2-.5.5-1.4.5-1.4a12.18 12.18 0 0 0 7.6-11.23C24 5.373 18.627 0 12 0z"/>
    </svg>
);

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const { data: allFaqs } = usePublicFaqs();
  const { settings } = usePublicSettings();
  const contact = settings?.contactConfig;
  const socialLinks = contact?.socialLinks;

  const socialIcons = [
    { name: 'LinkedIn', href: socialLinks?.linkedin, Icon: Linkedin },
    { name: 'Instagram', href: socialLinks?.instagram, Icon: Instagram },
    { name: 'Dribbble', href: socialLinks?.dribbble, Icon: Dribbble },
    { name: 'Pinterest', href: socialLinks?.pinterest, Icon: PinterestIcon },
  ].filter(link => link.href);

  const faqItems = allFaqs?.filter(faq => ['gen-2', 'dev-2', 'price-1'].includes(faq.id)) || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Full name is required.';
    
    if (!formData.email && !formData.phone) {
      newErrors.contact = 'Please provide either an email or a phone number.';
    } else {
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (formData.phone && !/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number.';
        }
    }

    if (!formData.message) newErrors.message = 'Project description is required.';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) {
        toast({
            title: "Error",
            description: "Cannot connect to the database. Please try again later.",
            variant: "destructive",
        });
        return;
    }

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        setIsSubmitting(true);
        try {
            addMessage(firestore, {
                senderName: formData.name,
                senderEmail: formData.email,
                senderPhone: formData.phone,
                senderCompany: formData.company,
                subject: `New Project Brief from ${formData.name}`,
                body: formData.message,
                source: 'Contact Form',
            });
            
            toast({
                title: "Message Sent!",
                description: "Thanks for reaching out. We'll get back to you shortly.",
            });
            setFormData({ name: '', company: '', email: '', phone: '', message: '' });
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    }
  };

  return (
    <div className="w-full bg-background text-foreground min-h-screen">
      <main>
        <div className="grid grid-cols-12 gap-px border-l border-r border-border bg-background">
          
          {/* Hero Header */}
          <div className="col-span-12 bg-background p-8 border-b border-border relative overflow-hidden">
             <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 py-12">
              <h1 className="font-headline text-7xl md:text-9xl font-bold">Start a<br/>Project<span className="text-primary">.</span></h1>
               <div className='max-w-md'>
                <p className="mt-4 md:mt-0 text-muted-foreground">
                  Have an idea? Let's turn it into a reality. Fill out the form, and we'll be in touch to discuss your project in detail.
                </p>
              </div>
            </div>
            <div className="absolute top-1/2 right-0 w-72 h-72 border-t-2 border-r-2 border-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-px bg-border">
            {/* Form Section */}
            <div className="col-span-12 lg:col-span-7 bg-background p-4 md:p-8">
              <Card className="bg-card border-border shadow-none rounded-none">
                <CardHeader>
                  <CardTitle className="font-headline text-3xl text-foreground">Project Brief</CardTitle>
                  <CardDescription className="text-muted-foreground">Tell us about your vision.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} aria-invalid={!!errors.name} className="bg-background border-input h-12" />
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input id="company" placeholder="Acme Inc." value={formData.company} onChange={handleChange} className="bg-background border-input h-12"/>
                      </div>
                    </div>
                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                         <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                aria-invalid={!!errors.email}
                                className="bg-background border-input h-12"
                            />
                           {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                                id="phone"
                                type="tel"
                                placeholder="+60123456789"
                                value={formData.phone}
                                onChange={handleChange}
                                aria-invalid={!!errors.phone}
                                className="bg-background border-input h-12"
                            />
                           {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                        </div>
                    </div>
                    {errors.contact && <p className="text-sm text-destructive -mt-2">{errors.contact}</p>}
                    <div className="space-y-2">
                      <Label htmlFor="message">Project Description</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project, goals, timeline, and budget..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={!!errors.message}
                        className="bg-background border-input"
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                    </div>
                    <div className="pt-4">
                      <Button type="submit" size="lg" className="w-full h-14 text-lg" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Send Project Brief'}
                        {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <aside className="col-span-12 lg:col-span-5 bg-background p-4 md:p-8 space-y-8">
              <Card className='bg-card border-border shadow-none rounded-none'>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Other Ways to Connect</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground mb-6">
                    Follow our journey, chat with us directly, or explore our work on other platforms.
                  </p>
                  <div className="flex items-center space-x-6 text-muted-foreground">
                    {socialIcons.map(social => (
                      <a
                        key={social.name}
                        href={social.href}
                        className="transition-colors hover:text-primary"
                        aria-label={social.name}
                      >
                        <social.Icon className="h-6 w-6" />
                      </a>
                    ))}
                  </div>
                  {contact?.phone && (
                  <Button
                    asChild
                    variant="outline"
                    className="mt-6 w-full bg-transparent border-input hover:bg-foreground hover:text-background"
                  >
                    <a href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  )}
                </CardContent>
              </Card>

              {/* Mini FAQ */}
              <Card className='bg-card border-border shadow-none rounded-none'>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Quick Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b border-border last:border-b-0"
                      >
                        <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary no-underline hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </aside>
          </div>

          <div className="col-span-12 bg-background">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
