"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { services, SiteSettings } from "@/lib/data";
import { Card } from "./ui/card";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, LucideIcon } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";
import { addMessage } from "@/lib/firestore";
import { getSettings } from "@/lib/data";
import { useEffect, useState } from "react";
import type { SocialLink, NewMessage } from "@/lib/data";


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service."),
  details: z.string().min(10, "Details must be at least 10 characters."),
});

const socialIcons: { [key in SocialLink['platform']]: LucideIcon } = {
    Facebook: Facebook,
    Twitter: Twitter,
    Instagram: Instagram,
    Linkedin: Linkedin,
  };

interface ContactSectionProps {
    className?: string;
}

export function ContactSection({ className }: ContactSectionProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const unsubscribe = getSettings((settingsData) => {
        setSettings(settingsData);
    });
    return () => unsubscribe();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      details: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        await addMessage(values as NewMessage);
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. We'll get back to you shortly.",
          variant: "default"
        });
        form.reset();
    } catch(error) {
        toast({
            title: "Error",
            description: "Failed to send message. Please try again later.",
            variant: "destructive",
        });
    }
  }

  return (
    <section id="contact" className={cn("py-24 sm:py-32", className)}>
        <div className="container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
                <p className="font-headline text-sm font-semibold uppercase tracking-wider text-primary">Get in touch</p>
                <h2 className="font-headline mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Ready to Start Your Project?
                </h2>
                <p className="mt-6 text-lg text-foreground/80">
                  Fill out the form below and we'll get back to you within 24 hours to discuss your project.
                </p>
            </div>
          </ScrollReveal>

            <ScrollReveal delay={200}>
              <Card className="mt-16 overflow-hidden">
                  <div className="grid lg:grid-cols-5">
                      <div className="lg:col-span-3 p-8">
                          <h3 className="text-2xl font-bold font-headline mb-6">Send Us a Message</h3>
                          <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                  <div className="grid sm:grid-cols-2 gap-6">
                                  <FormField
                                      control={form.control}
                                      name="name"
                                      render={({ field }) => (
                                          <FormItem>
                                              <FormLabel>Your Name</FormLabel>
                                              <FormControl>
                                                  <Input placeholder="John Doe" {...field} />
                                              </FormControl>
                                              <FormMessage />
                                          </FormItem>
                                      )}
                                      />
                                  <FormField
                                      control={form.control}
                                      name="email"
                                      render={({ field }) => (
                                          <FormItem>
                                              <FormLabel>Email Address</FormLabel>
                                              <FormControl>
                                                  <Input placeholder="john.doe@example.com" {...field} />
                                              </FormControl>
                                              <FormMessage />
                                          </FormItem>
                                      )}
                                      />
                                  </div>
                                  <div className="grid sm:grid-cols-2 gap-6">
                                      <FormField
                                          control={form.control}
                                          name="phone"
                                          render={({ field }) => (
                                              <FormItem>
                                                  <FormLabel>Phone Number (Optional)</FormLabel>
                                                  <FormControl>
                                                      <Input placeholder="+1 (555) 123-4567" {...field} />
                                                  </FormControl>
                                                  <FormMessage />
                                              </FormItem>
                                          )}
                                          />
                                      <FormField
                                          control={form.control}
                                          name="service"
                                          render={({ field }) => (
                                              <FormItem>
                                              <FormLabel>Service Needed</FormLabel>
                                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                  <FormControl>
                                                  <SelectTrigger>
                                                      <SelectValue placeholder="Select a service" />
                                                  </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                      {services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                                  </SelectContent>
                                              </Select>
                                              <FormMessage />
                                              </FormItem>
                                          )}
                                          />
                                  </div>
                                  <FormField
                                      control={form.control}
                                      name="details"
                                      render={({ field }) => (
                                          <FormItem>
                                              <FormLabel>Project Details</FormLabel>
                                              <FormControl>
                                                  <Textarea
                                                      placeholder="Tell us a little bit about your project..."
                                                      className="min-h-[120px]"
                                                      {...field}
                                                      />
                                              </FormControl>
                                              <FormMessage />
                                          </FormItem>
                                      )}
                                      />
                                  <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? "Sending..." : "Submit Request"}
                                  </Button>
                              </form>
                          </Form>
                      </div>
                      <div className="lg:col-span-2 bg-primary/90 text-primary-foreground p-8">
                          <h3 className="text-2xl font-bold font-headline mb-6">Contact Information</h3>
                          {settings ? (
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <MapPin className="h-6 w-6 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Our Office</h4>
                                        <p className="text-primary-foreground/80">{settings.address}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Mail className="h-6 w-6 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Email Us</h4>
                                        <a href={`mailto:${settings.contactEmail}`} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{settings.contactEmail}</a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Phone className="h-6 w-6 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">Call Us</h4>
                                        <a href={`tel:${settings.contactPhone}`} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">{settings.contactPhone}</a>
                                    </div>
                                </li>
                            </ul>
                          ) : (
                            <div className="space-y-4">
                                <div className="h-5 bg-primary/50 rounded w-3/4"></div>
                                <div className="h-5 bg-primary/50 rounded w-full"></div>
                                <div className="h-5 bg-primary/50 rounded w-1/2"></div>
                            </div>
                          )}

                          <div className="mt-8 pt-8 border-t border-primary-foreground/20">
                              <h4 className="font-semibold mb-4">Follow Us</h4>
                              <div className="flex items-center gap-3">
                                {settings?.socials?.map((link) => {
                                    const Icon = socialIcons[link.platform];
                                    return(
                                        <Button key={link.platform} size="icon" variant="outline" className="text-primary-foreground bg-transparent border-primary-foreground/50 hover:bg-primary-foreground/10" asChild>
                                            <Link href={link.href}><Icon className="h-5 w-5" /></Link>
                                        </Button>
                                    )
                                })}
                              </div>
                          </div>
                      </div>
                  </div>
              </Card>
            </ScrollReveal>
        </div>
    </section>
  );
}
