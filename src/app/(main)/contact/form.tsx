
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Footer } from '@/components/footer';
import { contactSocials } from '@/lib/social-links';
import { getContactDetails, getFaqs } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const faqItems = getFaqs().filter(faq => ['gen-2', 'dev-2', 'price-1'].includes(faq.id));

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contactValue: '',
    message: '',
  });
  const [contactMethod, setContactMethod] = useState('email');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactDetails = getContactDetails();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Full name is required.';
    if (!formData.contactValue) {
        newErrors.contactValue = contactMethod === 'email' ? 'Email is required.' : 'Phone number is required.';
    } else if (contactMethod === 'email' && !/\S+@\S+\.\S+/.test(formData.contactValue)) {
        newErrors.contactValue = 'Email is invalid.';
    }
    if (!formData.message) newErrors.message = 'Project description is required.';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Form Submitted', { ...formData, contactMethod });
            toast({
                title: "Message Sent!",
                description: "Thanks for reaching out. We'll get back to you shortly.",
            });
            setFormData({ name: '', company: '', contactValue: '', message: '' });
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
                     <div className="space-y-4">
                        <Label>How should we contact you?</Label>
                        <RadioGroup defaultValue="email" value={contactMethod} onValueChange={setContactMethod} className="flex gap-x-8">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="email" id="r-email" />
                                <Label htmlFor="r-email">Email</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="phone" id="r-phone" />
                                <Label htmlFor="r-phone">Phone</Label>
                            </div>
                        </RadioGroup>
                        <div>
                           <Input 
                                id="contactValue"
                                type={contactMethod === 'email' ? 'email' : 'tel'}
                                placeholder={contactMethod === 'email' ? 'you@example.com' : '+1 (555) 123-4567'}
                                value={formData.contactValue}
                                onChange={handleChange}
                                aria-invalid={!!errors.contactValue}
                                className="bg-background border-input h-12"
                            />
                        {errors.contactValue && <p className="text-sm text-destructive">{errors.contactValue}</p>}
                        </div>
                    </div>
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
                    {contactSocials.map(social => (
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
                  <Button
                    asChild
                    variant="outline"
                    className="mt-6 w-full bg-transparent border-input hover:bg-foreground hover:text-background"
                  >
                    <a href={contactDetails.whatsapp} target="_blank">
                      Chat on WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
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
