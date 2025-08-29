"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addIntake } from "@/lib/firestore";
import type { NewIntake } from "@/lib/data";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  companyName: z.string().min(2, "Company name is required."),
  email: z.string().email(),
  phone: z.string().optional(),
  currentWebsite: z.string().url().optional().or(z.literal('')),
  companyDescription: z.string().optional(),
  primaryPurpose: z.string().min(1, "Please select a primary purpose."),
  targetAudience: z.string().optional(),
  visitorActions: z.array(z.string()).optional(),
  successMetrics: z.string().optional(),
  designAdjectives: z.string().optional(),
  likedWebsites: z.string().optional(),
  dislikedWebsites: z.string().optional(),
  logoAndBranding: z.string().min(1, "Please select an option."),
  neededPages: z.array(z.string()).optional(),
  contentProvider: z.string().min(1, "Please select an option."),
  neededFeatures: z.array(z.string()).optional(),
  otherFeatures: z.string().optional(),
  domainAndHosting: z.string().min(1, "Please select an option."),
  budget: z.string().min(1, "Please select a budget range."),
  deadline: z.string().optional(),
  finalThoughts: z.string().optional(),
});

const formSections = {
    contact: {
        title: "Your Contact & Business Information",
        description: "This section helps us understand who you are and what your business does."
    },
    purpose: {
        title: "The Big Picture - Purpose & Goals",
        description: "This section focuses on the 'why' behind your website. What do you want it to achieve?"
    },
    design: {
        title: "Design, Feel & Branding",
        description: "This section helps us understand the aesthetic you're looking for."
    },
    structure: {
        title: "Content & Structure",
        description: "A website is only as good as its content. This helps us plan the site map."
    },
    features: {
        title: "Features & Functionality",
        description: "This is where we get into the technical requirements of your site."
    },
    logistics: {
        title: "Logistics & Final Thoughts",
        description: "Just a few final questions to help us with project scope and planning."
    }
}

const visitorActionsItems = ["Fill out a contact form", "Call my business", "Purchase a product", "Sign up for a newsletter", "Book an appointment", "Download a file (e.g., PDF, guide)", "Create an account", "Read blog posts"];
const neededPagesItems = ["Home", "About Us", "Services / Products (a list of what you offer)", "E-commerce Store", "Portfolio / Gallery", "Blog / News", "Testimonials / Reviews", "FAQ (Frequently Asked Questions)", "Contact Us", "Team Page", "Privacy Policy / Terms & Conditions"];
const neededFeaturesItems = ["E-commerce (shopping cart, payment processing)", "Online booking or scheduling system", "Membership area with user logins", "Blog or news feed", "Photo / Video gallery", "Contact forms", "Newsletter subscription form", "Social media feed integration", "Multilingual capabilities", "Search functionality for the site"];

export function IntakeForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      currentWebsite: "",
      companyDescription: "",
      visitorActions: [],
      neededPages: [],
      neededFeatures: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        await addIntake(values as NewIntake);
        toast({
          title: "Submission Received!",
          description: "Thank you for filling out the discovery form. We'll be in touch with you shortly.",
        });
        form.reset();
    } catch(error) {
        toast({
            title: "Submission Error",
            description: "There was a problem submitting your form. Please try again later.",
            variant: "destructive",
        });
    }
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-2xl">
        <CardContent className="p-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">

                {/* Section 2 */}
                <div className="space-y-6">
                    <CardHeader className="p-0">
                        <CardTitle>{formSections.contact.title}</CardTitle>
                        <CardDescription>{formSections.contact.description}</CardDescription>
                    </CardHeader>
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="companyName" render={({ field }) => (
                        <FormItem><FormLabel>Company Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email Address *</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="currentWebsite" render={({ field }) => (
                        <FormItem><FormLabel>Current Website URL (if you have one)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="companyDescription" render={({ field }) => (
                        <FormItem><FormLabel>Briefly describe your company/organization. What do you do?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>

                {/* Section 3 */}
                <div className="space-y-6">
                    <CardHeader className="p-0">
                        <CardTitle>{formSections.purpose.title}</CardTitle>
                        <CardDescription>{formSections.purpose.description}</CardDescription>
                    </CardHeader>
                    <FormField control={form.control} name="primaryPurpose" render={({ field }) => (
                        <FormItem className="space-y-3"><FormLabel>What is the primary purpose of your new website? *</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Generate leads" /></FormControl><FormLabel className="font-normal">Generate leads for my business</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Sell products" /></FormControl><FormLabel className="font-normal">Sell products or services directly (E-commerce)</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Informational hub" /></FormControl><FormLabel className="font-normal">Serve as an informational hub for my clients/customers</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Build community" /></FormControl><FormLabel className="font-normal">Build a community or membership site</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Showcase portfolio" /></FormControl><FormLabel className="font-normal">Showcase my portfolio or past work</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Other" /></FormControl><FormLabel className="font-normal">Other</FormLabel></FormItem>
                                </RadioGroup>
                            </FormControl>
                        <FormMessage /></FormItem>
                    )}/>
                     <FormField control={form.control} name="targetAudience" render={({ field }) => (
                        <FormItem><FormLabel>Who is your target audience?</FormLabel><FormDescription>Please describe your ideal customer or website visitor.</FormDescription><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="visitorActions" render={() => (
                        <FormItem><FormLabel>What specific actions do you want visitors to take on your website? (Select all that apply)</FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {visitorActionsItems.map((item) => (<FormField key={item} control={form.control} name="visitorActions"
                            render={({ field }) => (
                            <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl><Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {
                                    return checked ? field.onChange([...(field.value || []), item]) : field.onChange(field.value?.filter((value) => value !== item))
                                }} /></FormControl>
                                <FormLabel className="font-normal">{item}</FormLabel>
                            </FormItem>
                            )}
                        />))}
                        </div><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="successMetrics" render={({ field }) => (
                        <FormItem><FormLabel>How will you measure the success of your new website?</FormLabel><FormDescription>For example: an increase in online sales, more contact form submissions, etc.</FormDescription><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>

                {/* Section 4 */}
                <div className="space-y-6">
                    <CardHeader className="p-0">
                        <CardTitle>{formSections.design.title}</CardTitle>
                        <CardDescription>{formSections.design.description}</CardDescription>
                    </CardHeader>
                    <FormField control={form.control} name="designAdjectives" render={({ field }) => (
                        <FormItem><FormLabel>Choose 3-5 adjectives that best describe the desired look and feel of your website.</FormLabel><FormDescription>e.g., Modern, Minimalist, Professional, Fun, Luxurious, Friendly.</FormDescription><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="likedWebsites" render={({ field }) => (
                        <FormItem><FormLabel>Please list 2-3 websites you like. What specifically do you like about them?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="dislikedWebsites" render={({ field }) => (
                        <FormItem><FormLabel>Are there any websites or design styles you particularly DISLIKE?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="logoAndBranding" render={({ field }) => (
                        <FormItem className="space-y-3"><FormLabel>Do you have a logo and existing brand guidelines? *</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Have both" /></FormControl><FormLabel className="font-normal">Yes, I have a high-resolution logo and brand guidelines I can provide.</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Have logo only" /></FormControl><FormLabel className="font-normal">I have a logo, but it's low-resolution / I don't have brand guidelines.</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Need new logo" /></FormControl><FormLabel className="font-normal">No, I will need a new logo designed.</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Not applicable" /></FormControl><FormLabel className="font-normal">Not applicable.</FormLabel></FormItem>
                                </RadioGroup>
                            </FormControl>
                        <FormMessage /></FormItem>
                    )}/>
                </div>

                 {/* Section 5 */}
                 <div className="space-y-6">
                    <CardHeader className="p-0">
                        <CardTitle>{formSections.structure.title}</CardTitle>
                        <CardDescription>{formSections.structure.description}</CardDescription>
                    </CardHeader>
                    <FormField control={form.control} name="neededPages" render={() => (
                        <FormItem><FormLabel>What pages do you anticipate needing on your website? (Select all that apply)</FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {neededPagesItems.map((item) => (<FormField key={item} control={form.control} name="neededPages"
                            render={({ field }) => (
                            <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl><Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {
                                    return checked ? field.onChange([...(field.value || []), item]) : field.onChange(field.value?.filter((value) => value !== item))
                                }} /></FormControl>
                                <FormLabel className="font-normal">{item}</FormLabel>
                            </FormItem>
                            )}
                        />))}
                        </div><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="contentProvider" render={({ field }) => (
                        <FormItem className="space-y-3"><FormLabel>Who will be responsible for providing the website's content (text and images)? *</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Client provides all" /></FormControl><FormLabel className="font-normal">I will provide all the written content and images.</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Client provides some" /></FormControl><FormLabel className="font-normal">I will provide some content, but I need help with the rest.</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Need all content" /></FormControl><FormLabel className="font-normal">I need help with all content (e.g., copywriting, stock photography).</FormLabel></FormItem>
                                </RadioGroup>
                            </FormControl>
                        <FormMessage /></FormItem>
                    )}/>
                </div>

                {/* Section 6 */}
                <div className="space-y-6">
                    <CardHeader className="p-0">
                        <CardTitle>{formSections.features.title}</CardTitle>
                        <CardDescription>{formSections.features.description}</CardDescription>
                    </CardHeader>
                    <FormField control={form.control} name="neededFeatures" render={() => (
                        <FormItem><FormLabel>Please select any special features you will need on the website.</FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {neededFeaturesItems.map((item) => (<FormField key={item} control={form.control} name="neededFeatures"
                            render={({ field }) => (
                            <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl><Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => {
                                    return checked ? field.onChange([...(field.value || []), item]) : field.onChange(field.value?.filter((value) => value !== item))
                                }} /></FormControl>
                                <FormLabel className="font-normal">{item}</FormLabel>
                            </FormItem>
                            )}
                        />))}
                        </div><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="otherFeatures" render={({ field }) => (
                        <FormItem><FormLabel>Is there any other special functionality you can think of that isn't listed above?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>

                {/* Section 7 */}
                <div className="space-y-6">
                    <CardHeader className="p-0">
                        <CardTitle>{formSections.logistics.title}</CardTitle>
                        <CardDescription>{formSections.logistics.description}</CardDescription>
                    </CardHeader>
                    <FormField control={form.control} name="domainAndHosting" render={({ field }) => (
                        <FormItem className="space-y-3"><FormLabel>Do you already own a domain name and a web hosting plan? *</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Have both" /></FormControl><FormLabel className="font-normal">Yes, I have both.</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Have domain" /></FormControl><FormLabel className="font-normal">I have a domain name, but no hosting.</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Have hosting" /></FormControl><FormLabel className="font-normal">I have hosting, but no domain name.</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Need both" /></FormControl><FormLabel className="font-normal">No, I need help with both.</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Not sure" /></FormControl><FormLabel className="font-normal">I'm not sure.</FormLabel></FormItem>
                                </RadioGroup>
                            </FormControl>
                        <FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="budget" render={({ field }) => (
                        <FormItem className="space-y-3"><FormLabel>What is your estimated budget for this project? *</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="<500" /></FormControl><FormLabel className="font-normal">Under RM 500</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="500-1500" /></FormControl><FormLabel className="font-normal">RM 500 - RM 1,500</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="1500-5000" /></FormControl><FormLabel className="font-normal">RM 1,500 - RM 5,000</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="5000+" /></FormControl><FormLabel className="font-normal">RM 5,000+</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="discuss" /></FormControl><FormLabel className="font-normal">I'd prefer to discuss this</FormLabel></FormItem>
                                </RadioGroup>
                            </FormControl>
                        <FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="deadline" render={({ field }) => (
                        <FormItem><FormLabel>Do you have a specific deadline or desired launch date?</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="finalThoughts" render={({ field }) => (
                        <FormItem><FormLabel>Is there anything else you'd like to tell us about your project?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Submitting..." : "Submit Project Inquiry"}
                    </Button>
                </div>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
