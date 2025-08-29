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
import { services } from "@/lib/data";
import { Card } from "./ui/card";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service."),
  details: z.string().min(10, "Details must be at least 10 characters."),
});

export function ContactSection() {
  const { toast } = useToast();
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
    console.log("Form submitted:", values);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you shortly.",
      variant: "default"
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
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
                                  <Button type="submit" size="lg">Submit Request</Button>
                              </form>
                          </Form>
                      </div>
                      <div className="lg:col-span-2 bg-primary/90 text-primary-foreground p-8">
                          <h3 className="text-2xl font-bold font-headline mb-6">Contact Information</h3>
                          <ul className="space-y-6">
                              <li className="flex items-start gap-4">
                                  <MapPin className="h-6 w-6 mt-1 flex-shrink-0" />
                                  <div>
                                      <h4 className="font-semibold">Our Office</h4>
                                      <p className="text-primary-foreground/80">Kuala Lumpur, Malaysia</p>
                                  </div>
                              </li>
                              <li className="flex items-start gap-4">
                                  <Mail className="h-6 w-6 mt-1 flex-shrink-0" />
                                  <div>
                                      <h4 className="font-semibold">Email Us</h4>
                                      <a href="mailto:contact@ampirestudio.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">contact@ampirestudio.com</a>
                                  </div>
                              </li>
                              <li className="flex items-start gap-4">
                                  <Phone className="h-6 w-6 mt-1 flex-shrink-0" />
                                  <div>
                                      <h4 className="font-semibold">Call Us</h4>
                                      <a href="tel:+15551234567" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">+1 (555) 123-4567</a>
                                  </div>
                              </li>
                          </ul>

                          <div className="mt-8 pt-8 border-t border-primary-foreground/20">
                              <h4 className="font-semibold mb-4">Follow Us</h4>
                              <div className="flex items-center gap-3">
                                  <Button size="icon" variant="outline" className="text-primary-foreground bg-transparent border-primary-foreground/50 hover:bg-primary-foreground/10" asChild>
                                      <Link href="/"><Facebook className="h-5 w-5" /></Link>
                                  </Button>
                                  <Button size="icon" variant="outline" className="text-primary-foreground bg-transparent border-primary-foreground/50 hover:bg-primary-foreground/10" asChild>
                                      <Link href="/"><Twitter className="h-5 w-5" /></Link>
                                  </Button>
                                  <Button size="icon" variant="outline" className="text-primary-foreground bg-transparent border-primary-foreground/50 hover:bg-primary-foreground/10" asChild>
                                      <Link href="/"><Instagram className="h-5 w-5" /></Link>
                                  </Button>
                                  <Button size="icon" variant="outline" className="text-primary-foreground bg-transparent border-primary-foreground/50 hover:bg-primary-foreground/10" asChild>
                                      <Link href="/"><Linkedin className="h-5 w-5" /></Link>
                                  </Button>
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
