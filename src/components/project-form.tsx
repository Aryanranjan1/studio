"use client";

import React, { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Project, Service, getServices, projectStatuses, ProjectStatus } from "@/lib/data";
import { addProject, updateProject, NewProject } from "@/lib/firestore";
import { summarizeProject } from "@/ai/flows/portfolio-project-summary";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Checkbox } from "./ui/checkbox";
import { Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters.").refine(s => !s.includes(' '), "Slug cannot contain spaces."),
  longDescription: z.string().min(10, "Description must be at least 10 characters."),
  summary: z.string().min(10, "Summary must be at least 10 characters."),
  imageUrl: z.string().url("Please enter a valid image URL."),
  imageHint: z.string().min(2, "Image hint must be at least 2 characters."),
  services: z.array(z.string()).min(1, "Please select at least one service."),
  status: z.enum(projectStatuses).default('Pending'),
});

interface ProjectFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    project: Project | null;
    onFinished: () => void;
}

export function ProjectForm({ isOpen, setIsOpen, project, onFinished }: ProjectFormProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  
  useEffect(() => {
    const unsubscribe = getServices(setServices);
    return () => unsubscribe();
  }, []);

  const defaultValues = {
    title: "",
    slug: "",
    longDescription: "",
    summary: "",
    imageUrl: "",
    imageHint: "",
    services: [],
    status: 'Pending' as ProjectStatus,
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  React.useEffect(() => {
    if (isOpen) {
        if (project) {
          form.reset({
            ...project,
            slug: project.slug || project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
          });
        } else {
          form.reset(defaultValues);
        }
    }
  }, [project, isOpen, form]);

  const handleGenerateSummary = async () => {
    const longDescription = form.getValues("longDescription");
    if (!longDescription || longDescription.length < 10) {
      toast({
        title: "Description Too Short",
        description: "Please enter a longer project description to generate a summary.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await summarizeProject({ projectDescription: longDescription });
      if (result?.projectSummary) {
        form.setValue("summary", result.projectSummary, { shouldValidate: true });
        toast({
          title: "Summary Generated!",
          description: "The AI-powered summary has been added.",
        });
      }
    } catch (error) {
      console.error("Failed to generate summary", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating the summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const operation = project
        ? updateProject(project.id, values)
        : addProject(values as NewProject);

    operation.then(() => {
        toast({
            title: "Success",
            description: `Project ${project ? 'updated' : 'added'} successfully.`,
        });
        onFinished();
    }).catch((error) => {
        toast({
            title: "Error",
            description: `Failed to ${project ? 'update' : 'add'} project.`,
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
                <DialogTitle>{project ? "Edit Project" : "Add New Project"}</DialogTitle>
                <DialogDescription>
                    {project ? "Update the details of your project." : "Fill in the details for the new project."}
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="E.g., Zenith Branding Identity" {...field} 
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
                                    <Input placeholder="e.g., zenith-branding-identity" {...field} />
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
                                    <Textarea placeholder="The detailed description of the project..." className="min-h-[120px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-center">
                                  <FormLabel>Short Summary</FormLabel>
                                  <Button type="button" size="sm" variant="outline" onClick={handleGenerateSummary} disabled={isGenerating}>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    {isGenerating ? "Generating..." : "Generate with AI"}
                                  </Button>
                                </div>
                                <FormControl>
                                    <Textarea placeholder="A concise summary for the portfolio card..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://picsum.photos/600/400" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageHint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image AI Hint</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. logo brand" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="services"
                        render={() => (
                            <FormItem>
                                <FormLabel>Services</FormLabel>
                                <div className="grid grid-cols-3 gap-2 rounded-lg border p-4">
                                {services.map((item) => (
                                    <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="services"
                                    render={({ field }) => {
                                        return (
                                        <FormItem
                                            key={item.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(item.title)}
                                                onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...(field.value || []), item.title])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                        (value) => value !== item.title
                                                        )
                                                    )
                                                }}
                                            />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                            {item.title}
                                            </FormLabel>
                                        </FormItem>
                                        )
                                    }}
                                    />
                                ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Project Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {projectStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="mr-2">Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : (project ? "Save Changes" : "Create Project")}
                        </Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  );
}
