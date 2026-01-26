'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/slugify';
import type { Article } from '@/lib/data';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  slug: z.string().min(1, 'Slug is required.'),
  content: z.string().min(1, 'Content is required.'),
  status: z.enum(['draft', 'published']),
  category: z.string().min(1, 'Category is required.'),
  tags: z.string().transform(val => val.split(',').map(tag => tag.trim()).filter(Boolean)),
  author: z.string().min(1, "Author is required."),
  metaTitle: z.string().max(60, 'Meta Title should be 60 characters or less.'),
  metaDescription: z.string().max(160, 'Meta Description should be 160 characters or less.'),
  focusKeyword: z.string().optional(),
  canonicalUrl: z.string().url().optional().or(z.literal('')),
  robotsMeta: z.enum(['index', 'noindex']),
  featuredImageUrl: z.string().url('Must be a valid URL.'),
  featuredImageAlt: z.string().min(1, 'Alt text is required.'),
  cardImageUrl: z.string().url('Must be a valid URL.'),
  cardImageAlt: z.string().min(1, 'Alt text is required.'),
  ogImageUrl: z.string().url('Must be a valid URL.'),
  ogImageAlt: z.string().min(1, 'Alt text is required.'),
});

type BlogFormValues = z.infer<typeof formSchema>;

interface BlogFormProps {
  defaultValues?: Partial<Article>;
  onSubmit: (data: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  isSubmitting: boolean;
}

export function BlogForm({ defaultValues, onSubmit, isSubmitting }: BlogFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const mappedDefaultValues = defaultValues ? {
    ...defaultValues,
    tags: defaultValues.tags?.join(', '),
    featuredImageUrl: defaultValues.featuredImage?.url,
    featuredImageAlt: defaultValues.featuredImage?.alt,
    cardImageUrl: defaultValues.cardImage?.url,
    cardImageAlt: defaultValues.cardImage?.alt,
    ogImageUrl: defaultValues.ogImage?.url,
    ogImageAlt: defaultValues.ogImage?.alt,
  } : {};

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: mappedDefaultValues,
  });

  const titleValue = watch('title');
  const metaTitleValue = watch('metaTitle');
  const metaDescriptionValue = watch('metaDescription');

  useEffect(() => {
    if (titleValue) {
      setValue('slug', slugify(titleValue));
    }
  }, [titleValue, setValue]);

  const processSubmit = (data: BlogFormValues) => {
    // Destructure the form data to separate the image URLs/alt text from the rest.
    const {
      featuredImageUrl,
      featuredImageAlt,
      cardImageUrl,
      cardImageAlt,
      ogImageUrl,
      ogImageAlt,
      ...restOfData
    } = data;

    // Construct the final data object for Firestore, creating the nested image objects
    // and ensuring the flat image properties are not included.
    const finalData = {
      ...restOfData,
      date: defaultValues?.date || new Date().toISOString(),
      featuredImage: { url: featuredImageUrl, alt: featuredImageAlt },
      cardImage: { url: cardImageUrl, alt: cardImageAlt },
      ogImage: { url: ogImageUrl, alt: ogImageAlt },
      readingTime: defaultValues?.readingTime || 5,
      authorImage: defaultValues?.authorImage || 'https://picsum.photos/seed/author-img-default/40/40',
    };
    
    onSubmit(finalData);
    toast({
        title: "Success!",
        description: `Blog post has been ${defaultValues ? 'updated' : 'created'}.`,
    });
    router.push('/admin/blog');
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">{defaultValues ? 'Edit Post' : 'Create New Post'}</h1>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {defaultValues ? 'Save Changes' : 'Publish Post'}
        </Button>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content">
          <Card>
            <CardHeader><CardTitle>Main Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title')} />
                {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" {...register('slug')} />
                {errors.slug && <p className="text-destructive text-sm mt-1">{errors.slug.message}</p>}
              </div>
              <div>
                <Label htmlFor="content">Content (Raw HTML)</Label>
                <Textarea id="content" {...register('content')} rows={20} />
                {errors.content && <p className="text-destructive text-sm mt-1">{errors.content.message}</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata">
          <Card>
            <CardHeader><CardTitle>Article Metadata</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                 <div>
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" {...register('author')} />
                  {errors.author && <p className="text-destructive text-sm mt-1">{errors.author.message}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" {...register('category')} />
                {errors.category && <p className="text-destructive text-sm mt-1">{errors.category.message}</p>}
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" {...register('tags')} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO & Social Previews</CardTitle>
              <CardDescription>Optimize how your post appears on search engines and social media.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                <Label htmlFor="metaTitle">Meta Title ({metaTitleValue?.length || 0} / 60)</Label>
                <Input id="metaTitle" {...register('metaTitle')} />
                {errors.metaTitle && <p className="text-destructive text-sm mt-1">{errors.metaTitle.message}</p>}
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta Description ({metaDescriptionValue?.length || 0} / 160)</Label>
                <Textarea id="metaDescription" {...register('metaDescription')} rows={3} />
                 {errors.metaDescription && <p className="text-destructive text-sm mt-1">{errors.metaDescription.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="focusKeyword">Focus Keyword</Label>
                  <Input id="focusKeyword" {...register('focusKeyword')} />
                </div>
                <div>
                  <Label>Robots Meta</Label>
                   <Controller
                    name="robotsMeta"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger><SelectValue placeholder="Select robots setting" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="index">Index</SelectItem>
                          <SelectItem value="noindex">No Index</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input id="canonicalUrl" {...register('canonicalUrl')} placeholder="https://example.com/original-article" />
                {errors.canonicalUrl && <p className="text-destructive text-sm mt-1">{errors.canonicalUrl.message}</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

         <TabsContent value="media">
          <Card>
            <CardHeader><CardTitle>Media Assets</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2 p-4 border rounded-md">
                  <h3 className="font-medium">Featured Image (Blog Banner)</h3>
                  <Label htmlFor="featuredImageUrl">URL</Label>
                  <Input id="featuredImageUrl" {...register('featuredImageUrl')} placeholder="https://..." />
                  {errors.featuredImageUrl && <p className="text-destructive text-sm mt-1">{errors.featuredImageUrl.message}</p>}
                  <Label htmlFor="featuredImageAlt">Alt Text</Label>
                  <Input id="featuredImageAlt" {...register('featuredImageAlt')} />
                  {errors.featuredImageAlt && <p className="text-destructive text-sm mt-1">{errors.featuredImageAlt.message}</p>}
              </div>
               <div className="space-y-2 p-4 border rounded-md">
                  <h3 className="font-medium">Card Image (Listing Preview)</h3>
                  <Label htmlFor="cardImageUrl">URL</Label>
                  <Input id="cardImageUrl" {...register('cardImageUrl')} placeholder="https://..." />
                   {errors.cardImageUrl && <p className="text-destructive text-sm mt-1">{errors.cardImageUrl.message}</p>}
                  <Label htmlFor="cardImageAlt">Alt Text</Label>
                  <Input id="cardImageAlt" {...register('cardImageAlt')} />
                   {errors.cardImageAlt && <p className="text-destructive text-sm mt-1">{errors.cardImageAlt.message}</p>}
              </div>
               <div className="space-y-2 p-4 border rounded-md">
                  <h3 className="font-medium">OG Image (Social Sharing)</h3>
                  <Label htmlFor="ogImageUrl">URL</Label>
                  <Input id="ogImageUrl" {...register('ogImageUrl')} placeholder="https://..." />
                   {errors.ogImageUrl && <p className="text-destructive text-sm mt-1">{errors.ogImageUrl.message}</p>}
                  <Label htmlFor="ogImageAlt">Alt Text</Label>
                  <Input id="ogImageAlt" {...register('ogImageAlt')} />
                   {errors.ogImageAlt && <p className="text-destructive text-sm mt-1">{errors.ogImageAlt.message}</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </form>
  );
}
