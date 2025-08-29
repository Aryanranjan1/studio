"use client";

import React from "react";
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
import { Article } from "@/lib/data";
import { addArticle, updateArticle, NewArticle } from "@/lib/firestore";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Switch } from "./ui/switch";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  slug: z.string().min(2, "Slug must be at least 2 characters.").refine(s => !s.includes(' '), "Slug cannot contain spaces."),
  content: z.string().min(10, "Content must be at least 10 characters."),
  imageUrl: z.string().url("Please enter a valid image URL."),
  status: z.enum(['draft', 'published']),
});

interface ArticleFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    article: Article | null;
    onFinished: () => void;
}

export function ArticleForm({ isOpen, setIsOpen, article, onFinished }: ArticleFormProps) {
  const { toast } = useToast();
  
  const defaultValues = {
    title: article?.title || "",
    slug: article?.slug || "",
    content: article?.content || "",
    imageUrl: article?.imageUrl || "",
    status: article?.status || 'draft',
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues);
  }, [article, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        if (article) {
            await updateArticle(article.id, values);
            toast({
                title: "Success",
                description: "Article updated successfully.",
            });
        } else {
            await addArticle(values as NewArticle);
            toast({
                title: "Success",
                description: "Article created successfully.",
            });
        }
        onFinished();
        setIsOpen(false);
    } catch (error) {
        toast({
            title: "Error",
            description: `Failed to ${article ? 'update' : 'add'} article.`,
            variant: "destructive",
        });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
                <DialogTitle>{article ? "Edit Article" : "Create New Article"}</DialogTitle>
                <DialogDescription>
                    {article ? "Update the details of your article." : "Fill in the details for the new article."}
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Article Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="E.g., The Future of Web Design" {...field} />
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
                                    <Input placeholder="e-g-the-future-of-web-design" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is the URL-friendly version of the title. No spaces allowed.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Write your article content here..." className="min-h-[250px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Featured Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://picsum.photos/800/400" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Status</FormLabel>
                                    <FormDescription>
                                       {field.value === 'published' ? 'Published articles are visible to the public.' : 'Drafts are only visible to you.'}
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value === 'published'}
                                        onCheckedChange={(checked) => field.onChange(checked ? 'published' : 'draft')}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                        />


                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="mr-2">Cancel</Button>
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? 'Saving...' : (article ? "Save Changes" : "Create Article")}
                        </Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  );
}
