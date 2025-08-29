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
import { Project, services } from "@/lib/data";
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

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  longDescription: z.string().min(10, "Description must be at least 10 characters."),
  summary: z.string().min(10, "Summary must be at least 10 characters."),
  imageUrl: z.string().url("Please enter a valid image URL."),
  imageHint: z.string().min(2, "Image hint must be at least 2 characters."),
  services: z.array(z.string()).min(1, "Please select at least one service."),
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project?.title || "",
      longDescription: project?.longDescription || "",
      summary: project?.summary || "",
      imageUrl: project?.imageUrl || "",
      imageHint: project?.imageHint || "",
      services: project?.services || [],
    },
  });

  // Reset form when project changes
  React.useEffect(() => {
    if (project) {
      form.reset(project);
    } else {
      form.reset({
        title: "",
        longDescription: "",
        summary: "",
        imageUrl: "",
        imageHint: "",
        services: [],
      });
    }
  }, [project, form]);

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
    try {
        if (project) {
            await updateProject(project.id, values);
            toast({
                title: "Success",
                description: "Project updated successfully.",
            });
        } else {
            await addProject(values as NewProject);
            toast({
                title: "Success",
                description: "Project added successfully.",
            });
        }
        onFinished();
        setIsOpen(false);
    } catch (error) {
        toast({
            title: "Error",
            description: `Failed to ${project ? 'update' : 'add'} project.`,
            variant: "destructive",
        });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[625px]">
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
                                    <Input placeholder="E.g., Zenith Branding Identity" {...field} />
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
                                    key={item}
                                    control={form.control}
                                    name="services"
                                    render={({ field }) => {
                                        return (
                                        <FormItem
                                            key={item}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(item)}
                                                onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...field.value, item])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                        (value) => value !== item
                                                        )
                                                    )
                                                }}
                                            />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                            {item}
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


                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="mr-2">Cancel</Button>
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? 'Saving...' : (project ? "Save Changes" : "Create Project")}
                        </Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  );
}
