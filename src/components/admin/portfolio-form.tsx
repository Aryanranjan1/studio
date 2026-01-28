'use client';

import { useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/slugify';
import type { PortfolioProject } from '@/lib/data';

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
import { Loader2, Save, PlusCircle, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  slug: z.string().min(1, 'Slug is required.'),
  summary: z.string().min(1, 'Summary is required.').max(300, 'Summary must be 300 characters or less.'),
  longDescription: z.string().min(1, 'Project description is required.'),
  category: z.string().min(1, 'Category is required.'),
  technologies: z.string().transform(val => val.split(',').map(tag => tag.trim()).filter(Boolean)),
  clientName: z.string().optional(),
  projectYear: z.string().min(4, 'Enter a valid year.').max(4, 'Enter a valid year.'),
  projectUrl: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
  
  published: z.boolean().default(false),

  metaTitle: z.string().max(60, 'Meta Title should be 60 characters or less.'),
  metaDescription: z.string().max(160, 'Meta Description should be 160 characters or less.'),
  focusKeyword: z.string().optional(),
  canonicalUrl: z.string().url().optional().or(z.literal('')),
  robotsMeta: z.enum(['index', 'noindex']),
  
  featuredImage: z.object({
    url: z.string().url('Must be a valid URL.'),
    alt: z.string().min(1, 'Alt text is required.'),
  }),
  cardImage: z.object({
    url: z.string().url('Must be a valid URL.'),
    alt: z.string().min(1, 'Alt text is required.'),
  }),
  galleryImages: z.array(z.object({
    url: z.string().url('Must be a valid URL.'),
    alt: z.string().min(1, 'Alt text is required.'),
  })).optional(),
});

type PortfolioFormValues = z.infer<typeof formSchema>;

interface PortfolioFormProps {
  defaultValues?: Partial<PortfolioProject>;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export function PortfolioForm({ defaultValues, onSubmit, isSubmitting }: PortfolioFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const mappedDefaultValues: Partial<PortfolioFormValues> = defaultValues ? {
    ...defaultValues,
    technologies: defaultValues.technologies?.join(', '),
    published: defaultValues.published || false,
    galleryImages: defaultValues.galleryImages || [],
  } : {
    published: false,
    robotsMeta: 'noindex',
    galleryImages: [],
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PortfolioFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: mappedDefaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "galleryImages",
  });

  const titleValue = watch('title');
  const publishedValue = watch('published');
  const metaTitleValue = watch('metaTitle');
  const metaDescriptionValue = watch('metaDescription');

  useEffect(() => {
    if (titleValue) {
      setValue('slug', slugify(titleValue));
    }
  }, [titleValue, setValue]);
  
  useEffect(() => {
      setValue('robotsMeta', publishedValue ? 'index' : 'noindex');
  }, [publishedValue, setValue]);

  const processSubmit = (data: PortfolioFormValues) => {
    const finalData: { [key: string]: any } = {
      ...data,
    };
    
    // Sanitize data before submitting to remove undefined values
    Object.keys(finalData).forEach(key => {
      if (finalData[key] === undefined) {
        delete finalData[key];
      }
    });

    onSubmit(finalData);
    toast({
        title: "Success!",
        description: `Project has been ${defaultValues ? 'updated' : 'created'}.`,
    });
    router.push('/admin/portfolio');
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">{defaultValues ? 'Edit Project' : 'Create New Project'}</h1>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {defaultValues ? 'Save Changes' : 'Create Project'}
        </Button>
      </div>

      <Tabs defaultValue="core">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="core">Core Info</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        <TabsContent value="core">
          <Card>
            <CardHeader><CardTitle>Core Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 pt-2 pb-4">
                 <Controller
                    name="published"
                    control={control}
                    render={({ field }) => ( <Switch id="published" checked={field.value} onCheckedChange={field.onChange} /> )}
                  />
                  <Label htmlFor="published" className="cursor-pointer text-lg">{publishedValue ? 'Published' : 'Draft'}</Label>
              </div>
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" {...register('title')} />
                {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" {...register('slug')} />
                {errors.slug && <p className="text-destructive text-sm mt-1">{errors.slug.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="category">Category / Service Type</Label>
                    <Input id="category" {...register('category')} />
                    {errors.category && <p className="text-destructive text-sm mt-1">{errors.category.message}</p>}
                </div>
                <div>
                    <Label htmlFor="projectYear">Project Year</Label>
                    <Input id="projectYear" {...register('projectYear')} />
                    {errors.projectYear && <p className="text-destructive text-sm mt-1">{errors.projectYear.message}</p>}
                </div>
              </div>
               <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="clientName">Client Name (Optional)</Label>
                    <Input id="clientName" type="text" {...register('clientName')} />
                </div>
                <div>
                    <Label htmlFor="projectUrl">Project URL (Optional)</Label>
                    <Input id="projectUrl" {...register('projectUrl')} />
                    {errors.projectUrl && <p className="text-destructive text-sm mt-1">{errors.projectUrl.message}</p>}
                </div>
              </div>
               <div>
                <Label htmlFor="technologies">Tech Stack (comma-separated)</Label>
                <Input id="technologies" {...register('technologies')} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader><CardTitle>Project Description</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="summary">Short Summary (for listings & previews)</Label>
                <Textarea id="summary" {...register('summary')} rows={3} />
                {errors.summary && <p className="text-destructive text-sm mt-1">{errors.summary.message}</p>}
              </div>
              <div>
                <Label htmlFor="longDescription">Long Description (Raw HTML)</Label>
                <Textarea id="longDescription" {...register('longDescription')} rows={20} />
                {errors.longDescription && <p className="text-destructive text-sm mt-1">{errors.longDescription.message}</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader><CardTitle>Media Assets</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2 p-4 border rounded-md">
                  <h3 className="font-medium">Featured Image (Main Banner)</h3>
                  <Label htmlFor="featuredImage.url">URL</Label>
                  <Input id="featuredImage.url" {...register('featuredImage.url')} placeholder="https://..." />
                  {errors.featuredImage?.url && <p className="text-destructive text-sm mt-1">{errors.featuredImage.url.message}</p>}
                  <Label htmlFor="featuredImage.alt">Alt Text</Label>
                  <Input id="featuredImage.alt" {...register('featuredImage.alt')} />
                  {errors.featuredImage?.alt && <p className="text-destructive text-sm mt-1">{errors.featuredImage.alt.message}</p>}
              </div>
               <div className="space-y-2 p-4 border rounded-md">
                  <h3 className="font-medium">Card Image (Portfolio Grid Preview)</h3>
                  <Label htmlFor="cardImage.url">URL</Label>
                  <Input id="cardImage.url" {...register('cardImage.url')} placeholder="https://..." />
                   {errors.cardImage?.url && <p className="text-destructive text-sm mt-1">{errors.cardImage.url.message}</p>}
                  <Label htmlFor="cardImage.alt">Alt Text</Label>
                  <Input id="cardImage.alt" {...register('cardImage.alt')} />
                   {errors.cardImage?.alt && <p className="text-destructive text-sm mt-1">{errors.cardImage.alt.message}</p>}
              </div>
               <div className="space-y-4 p-4 border rounded-md">
                  <div className='flex justify-between items-center'>
                    <h3 className="font-medium">Gallery Images</h3>
                    <Button type="button" size="sm" onClick={() => append({ url: '', alt: '' })}>
                        <PlusCircle className="h-4 w-4 mr-2" /> Add Image
                    </Button>
                  </div>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-2 p-2 border rounded">
                        <div className="flex-grow space-y-2">
                             <Label htmlFor={`galleryImages.${index}.url`}>URL</Label>
                             <Input {...register(`galleryImages.${index}.url`)} />
                             {errors.galleryImages?.[index]?.url && <p className="text-destructive text-sm">{errors.galleryImages[index]!.url!.message}</p>}
                             <Label htmlFor={`galleryImages.${index}.alt`}>Alt Text</Label>
                             <Input {...register(`galleryImages.${index}.alt`)} />
                             {errors.galleryImages?.[index]?.alt && <p className="text-destructive text-sm">{errors.galleryImages[index]!.alt!.message}</p>}
                        </div>
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO & Social Previews</CardTitle>
              <CardDescription>Optimize how your project appears on search engines.</CardDescription>
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
                  <Label>Robots Meta (Auto-set based on published status)</Label>
                   <Controller
                    name="robotsMeta"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value} disabled>
                        <SelectTrigger><SelectValue /></SelectTrigger>
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
                <Input id="canonicalUrl" {...register('canonicalUrl')} placeholder="https://example.com/original-project" />
                {errors.canonicalUrl && <p className="text-destructive text-sm mt-1">{errors.canonicalUrl.message}</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </form>
  );
}
