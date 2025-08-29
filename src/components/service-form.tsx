"use client";

import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Service, serviceIcons } from "@/lib/data";
import { addService, updateService, NewService } from "@/lib/firestore";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters.").refine(s => !s.includes(' '), "Slug cannot contain spaces."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  longDescription: z.string().min(20, "Long description must be at least 20 characters."),
  icon: z.enum(serviceIcons),
});

interface ServiceFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    service: Service | null;
    onFinished: () => void;
}

export function ServiceForm({ isOpen, setIsOpen, service, onFinished }: ServiceFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const defaultValues = {
    title: service?.title || "",
    slug: service?.slug || "",
    description: service?.description || "",
    longDescription: service?.longDescription || "",
    icon: service?.icon || 'Branding',
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  React.useEffect(() => {
    form.reset(service ? defaultValues : {
        title: "",
        slug: "",
        description: "",
        longDescription: "",
        icon: 'Branding',
    });
  }, [service, form, isOpen]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const operation = service
        ? updateService(service.id, values)
        : addService(values as NewService);
    
    operation.then(() => {
        toast({
            title: "Success",
            description: `Service ${service ? 'updated' : 'created'} successfully.`,
        });
        onFinished();
    }).catch((error) => {
        toast({
            title: "Error",
            description: `Failed to ${service ? 'update' : 'add'} service.`,
            variant: "destructive",
        });
    }).finally(() => {
        setIsSubmitting(false);
    });

    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
                <DialogTitle>{service ? "Edit Service" : "Create New Service"}</DialogTitle>
                <DialogDescription>
                    {service ? "Update the details of your service." : "Fill in the details for the new service."}
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Service Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="E.g., Web Development" {...field} 
                                      onChange={(e) => {
                                        field.onChange(e);
                                        const slug = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                                        form.setValue('slug', slug);
                                    }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                     <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="e-g-web-development" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Short Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="A concise description for the service card..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="longDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="The detailed description for the service page..." className="min-h-[150px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Icon</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an icon" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {serviceIcons.map(icon => <SelectItem key={icon} value={icon}>{icon}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="mr-2">Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : (service ? "Save Changes" : "Create Service")}
                        </Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  );
}
