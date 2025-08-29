"use client";

import React from "react";
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
import { Testimonial } from "@/lib/data";
import { addTestimonial, updateTestimonial, NewTestimonial } from "@/lib/firestore";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  title: z.string().min(2, "Title must be at least 2 characters."),
  company: z.string().min(2, "Company must be at least 2 characters."),
  quote: z.string().min(10, "Quote must be at least 10 characters."),
  avatarUrl: z.string().url("Please enter a valid image URL."),
});

interface TestimonialFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    testimonial: Testimonial | null;
    onFinished: () => void;
}

export function TestimonialForm({ isOpen, setIsOpen, testimonial, onFinished }: TestimonialFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: testimonial?.name || "",
      title: testimonial?.title || "",
      company: testimonial?.company || "",
      quote: testimonial?.quote || "",
      avatarUrl: testimonial?.avatarUrl || "",
    },
  });

  React.useEffect(() => {
    if (testimonial) {
      form.reset(testimonial);
    } else {
      form.reset({
        name: "",
        title: "",
        company: "",
        quote: "",
        avatarUrl: "",
      });
    }
  }, [testimonial, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        if (testimonial) {
            await updateTestimonial(testimonial.id, values);
            toast({
                title: "Success",
                description: "Testimonial updated successfully.",
            });
        } else {
            await addTestimonial(values as NewTestimonial);
            toast({
                title: "Success",
                description: "Testimonial added successfully.",
            });
        }
        onFinished();
        setIsOpen(false);
    } catch (error) {
        toast({
            title: "Error",
            description: `Failed to ${testimonial ? 'update' : 'add'} testimonial.`,
            variant: "destructive",
        });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
                <DialogTitle>{testimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
                <DialogDescription>
                    {testimonial ? "Update the details of this testimonial." : "Fill in the details for the new testimonial."}
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E.g., Sarah Johnson" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E.g., Marketing Director" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                    </div>
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input placeholder="E.g., QuantumLeap" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="quote"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quote</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="The full testimonial quote..." className="min-h-[120px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="avatarUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Avatar Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://picsum.photos/100/100" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="mr-2">Cancel</Button>
                        <Button type="submit">
                            {testimonial ? "Save Changes" : "Create Testimonial"}
                        </Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  );
}
