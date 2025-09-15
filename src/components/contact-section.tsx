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
import { Card } from "./ui/card";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, LucideIcon } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";
import { addMessage } from "@/lib/data";
import { getSettings, getServices } from "@/lib/data";
import type { SocialLink, SiteSettings, Service } from "@/lib/data";
import { useSuccessPopup } from "@/hooks/use-success-popup";
import DarkVeil from "./ui/dark-veil";

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.75 13.96c.25.13.43.2.5.33.07.14.07.54-.03.73-.09.19-.54.54-.91.73-.37.2-.78.3-1.22.25-.44-.05-1.07-.25-2.02-1.02-.95-.77-1.56-1.56-1.75-1.94-.19-.37-.09-.57.09-.75.16-.16.33-.41.47-.56.14-.14.23-.28.33-.47.1-.19.05-.37-.03-.52-.07-.14-.68-1.64-.93-2.2-.25-.56-.5-.48-.68-.48-.18 0-.37.05-.56.09-.19.05-.47.28-.47.73 0 .45.23.89.28 1.02.05.13.25 1.54.25 1.64s.19 1.48.56 2.02c.37.54.73.78 1.13.97.4.2.77.25 1.02.25.25 0 .73-.05 1.02-.33.29-.28.47-.73.56-1.02.09-.28.09-.56.05-.73-.05-.18-.19-.28-.37-.42-.18-.14-.37-.23-.52-.28-.14-.05-.28-.05-.37.05-.1.09-.19.18-.28.33-.09.14-.14.23-.23.33-.09.1-.18.18-.28.23-.09.05-.23.09-.33.05-.09-.05-.28-.09-.52-.18-.23-.09-.46-.23-.68-.42-.22-.19-.42-.42-.56-.68-.14-.25-.23-.52-.28-.8-.05-.28-.05-.56-.05-.84 0-.28.05-.52.09-.73.05-.22.14-.43.28-.63.14-.19.33-.37.56-.52.23-.14.48-.23.75-.28.27-.05.54-.05.78 0 .25.05.48.14.68.28.19.14.33.33.42.56.09.23.14.48.14.75 0 .27-.05.52-.14.73-.09.22-.23.42-.42.56-.19.14-.42.23-.68.28-.26.05-.52.05-.78-.05zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c1.78 0 3.45-.47 4.93-1.3L22 22l-1.3-4.93C21.53 15.45 22 13.78 22 12c0-5.523-4.477-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </svg>
  );

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service."),
  details: z.string().min(10, "Details must be at least 10 characters."),
});

const socialIcons: { [key in SocialLink['platform']]: LucideIcon | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element) } = {
    Facebook: Facebook,
    Whatsapp: WhatsappIcon,
    Instagram: Instagram,
    Linkedin: Linkedin,
  };

interface ContactSectionProps {
    className?: string;
}

export function ContactSection({ className }: ContactSectionProps) {
  const { toast } = useToast();
  const { showSuccessPopup } = useSuccessPopup();
  const settings: SiteSettings = getSettings();
  const services: Service[] = getServices();

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    addMessage(values).then(() => {
        showSuccessPopup("Message Sent!");
        form.reset();
    }).catch((error) => {
        toast({
            title: "Error",
            description: "Failed to send message. Please try again later.",
            variant: "destructive",
        });
    });
  }

  return (
    <section id="contact" className={cn("relative py-24 sm:py-32 overflow-hidden text-primary-foreground", className)}>
        <div className="absolute inset-0 z-0">
            <DarkVeil 
              hueShift={240}
              noiseIntensity={0.02}
              scanlineIntensity={0.05}
              scanlineFrequency={300}
              warpAmount={0.05}
              speed={0.2}
            />
        </div>
        <div className="container relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
                <p className="font-headline text-sm font-semibold uppercase tracking-wider text-primary">Get in touch</p>
                <h2 className="font-headline mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                    Ready to Start Your Project?
                </h2>
                <p className="mt-6 text-lg text-primary-foreground/80">
                  Fill out the form below and we'll get back to you within 24 hours to discuss your project.
                </p>
            </div>
          </ScrollReveal>

            <ScrollReveal delay={200}>
              <Card className="mt-16 overflow-hidden bg-card/20 backdrop-blur-lg border-border/20 text-foreground">
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
                                                      {services.map(s => <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>)}
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
