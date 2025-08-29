"use client";

import React from "react";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { useToast } from "@/hooks/use-toast";
import { SiteSettings, SocialLink, socialPlatforms } from "@/lib/data";
import { updateSettings, seedSettings } from "@/lib/firestore";
import { getSettings } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, PlusCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const socialLinkSchema = z.object({
    platform: z.enum(socialPlatforms),
    href: z.string().url("Please enter a valid URL."),
});

const formSchema = z.object({
  contactEmail: z.string().email("Please enter a valid email address."),
  contactPhone: z.string().min(1, "Phone number is required."),
  address: z.string().min(1, "Address is required."),
  socials: z.array(socialLinkSchema)
});

export default function SettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactEmail: "",
      contactPhone: "",
      address: "",
      socials: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socials"
  });


  useEffect(() => {
    const initAndFetch = async () => {
        setLoading(true);
        await seedSettings();
        const unsubscribe = getSettings((settings) => {
            if (settings) {
                form.reset(settings);
            }
            setLoading(false);
        });
        return () => unsubscribe && unsubscribe();
    }
    initAndFetch();
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        await updateSettings(values);
        toast({
            title: "Success",
            description: "Settings updated successfully.",
        });
    } catch (error) {
        toast({
            title: "Error",
            description: "Failed to update settings.",
            variant: "destructive",
        });
    }
  }

  if (loading) {
      return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your site-wide settings here.</p>
            </div>
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
      )
  }

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your site-wide settings here.</p>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>Update the primary contact details displayed on your site.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="contactEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="contact@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contactPhone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+1 (555) 123-4567" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123 Main St, Anytown, USA" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Social Media Links</CardTitle>
                        <CardDescription>Manage the social media links displayed in the footer.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-end gap-4">
                               <FormField
                                    control={form.control}
                                    name={`socials.${index}.platform`}
                                    render={({ field }) => (
                                        <FormItem className="w-1/3">
                                            <FormLabel>Platform</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {socialPlatforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                               <FormField
                                    control={form.control}
                                    name={`socials.${index}.href`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>URL</FormLabel>
                                            <FormControl><Input {...field} placeholder="https://facebook.com/..."/></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <Button type="button" variant="outline" onClick={() => append({ platform: "Facebook", href: "" })}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Social Link
                        </Button>
                    </CardFooter>
                </Card>
                
                <div className="flex justify-end">
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Saving..." : "Save All Settings"}
                    </Button>
                </div>
            </form>
        </Form>
    </div>
  )
}
