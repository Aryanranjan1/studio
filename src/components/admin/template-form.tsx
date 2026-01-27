
'use client';

import { useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { slugify } from '@/lib/slugify';
import type { Template } from '@/lib/data';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
  shortDescription: z.string().min(1, 'Short description is required.'),
  longDescription: z.string().min(1, 'Long description is required.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  category: z.string().min(1, 'Category is required.'),
  tags: z.string().transform(val => val.split(',').map(tag => tag.trim()).filter(Boolean)),
  technologies: z.string().transform(val => val.split(',').map(tag => tag.trim()).filter(Boolean)),
  features: z.string().transform(val => val.split(',').map(tag => tag.trim()).filter(Boolean)),
  previewUrl: z.string().url('Must be a valid URL.'),
  version: z.string().min(1, 'Version is required.'),
  
  specs: z.object({
    stack: z.string().min(1, 'Stack is required.'),
    css: z.string().min(1, 'CSS is required.'),
    cms: z.string().min(1, 'CMS is required.'),
    type: z.string().min(1, 'Type is required.'),
  }),

  published: z.boolean().default(false),
  bestSeller: z.boolean().default(false),
  isNew: z.boolean().default(false),
  
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  
  cardImage: z.object({
    url: z.string().url('Must be a valid URL.'),
    alt: z.string().min(1, 'Alt text is required.'),
  }),
  galleryImages: z.array(z.object({
    url: z.string().url('Must be a valid URL.'),
    alt: z.string().min(1, 'Alt text is required.'),
  })).optional(),
});

type TemplateFormValues = z.infer<typeof formSchema>;

interface TemplateFormProps {
  defaultValues?: Partial<Template>;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export function TemplateForm({ defaultValues, onSubmit, isSubmitting }: TemplateFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const mappedDefaultValues: Partial<TemplateFormValues> = defaultValues ? {
    ...defaultValues,
    tags: defaultValues.tags?.join(', '),
    technologies: defaultValues.technologies?.join(', '),
    features: defaultValues.features?.join(', '),
    galleryImages: defaultValues.galleryImages || [],
  } : {
    published: false,
    bestSeller: false,
    isNew: true,
    galleryImages: [],
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TemplateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: mappedDefaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "galleryImages",
  });

  const titleValue = watch('title');

  useEffect(() => {
    if (titleValue) {
      setValue('slug', slugify(titleValue));
    }
  }, [titleValue, setValue]);

  const processSubmit = (data: TemplateFormValues) => {
    onSubmit(data);
    toast({
        title: "Success!",
        description: `Template has been ${defaultValues ? 'updated' : 'created'}.`,
    });
    router.push('/admin/templates');
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">{defaultValues ? 'Edit Template' : 'Create New Template'}</h1>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {defaultValues ? 'Save Changes' : 'Create Template'}
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
            <CardHeader>
              <CardTitle>Core Information</CardTitle>
              <CardDescription>Basic details, pricing, and status of the template.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="flex items-center space-x-2">
                    <Controller control={control} name="published" render={({ field }) => ( <Switch id="published" checked={field.value} onCheckedChange={field.onChange} /> )} />
                    <Label htmlFor="published" className="cursor-pointer">Published</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Controller control={control} name="bestSeller" render={({ field }) => ( <Switch id="bestSeller" checked={field.value} onCheckedChange={field.onChange} /> )} />
                    <Label htmlFor="bestSeller" className="cursor-pointer">Best Seller</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Controller control={control} name="isNew" render={({ field }) => ( <Switch id="isNew" checked={field.value} onCheckedChange={field.onChange} /> )} />
                    <Label htmlFor="isNew" className="cursor-pointer">Is New</Label>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Template Title</Label>
                  <Input id="title" {...register('title')} />
                  {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" {...register('slug')} />
                  {errors.slug && <p className="text-destructive text-sm mt-1">{errors.slug.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="price">Price (MYR)</Label>
                    <Input id="price" type="number" step="0.01" {...register('price')} />
                    {errors.price && <p className="text-destructive text-sm mt-1">{errors.price.message}</p>}
                </div>
                <div>
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" {...register('category')} />
                    {errors.category && <p className="text-destructive text-sm mt-1">{errors.category.message}</p>}
                </div>
                 <div>
                    <Label htmlFor="version">Version</Label>
                    <Input id="version" {...register('version')} />
                    {errors.version && <p className="text-destructive text-sm mt-1">{errors.version.message}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="previewUrl">Live Preview URL</Label>
                <Input id="previewUrl" {...register('previewUrl')} />
                {errors.previewUrl && <p className="text-destructive text-sm mt-1">{errors.previewUrl.message}</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
                <CardTitle>Content & Features</CardTitle>
                <CardDescription>Descriptions, features, and technical specifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="shortDescription">Short Description (for listings)</Label>
                <Textarea id="shortDescription" {...register('shortDescription')} rows={3} />
                {errors.shortDescription && <p className="text-destructive text-sm mt-1">{errors.shortDescription.message}</p>}
              </div>
              <div>
                <Label htmlFor="longDescription">Long Description (Raw HTML)</Label>
                <Textarea id="longDescription" {...register('longDescription')} rows={10} />
                {errors.longDescription && <p className="text-destructive text-sm mt-1">{errors.longDescription.message}</p>}
              </div>
               <div>
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Input id="features" {...register('features')} />
              </div>
               <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input id="tags" {...register('tags')} />
                </div>
                 <div>
                    <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                    <Input id="technologies" {...register('technologies')} />
                </div>
              </div>
               <Card>
                <CardHeader><CardTitle>Specifications</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                     <div>
                        <Label htmlFor="specs.stack">Stack</Label>
                        <Input id="specs.stack" {...register('specs.stack')} />
                        {errors.specs?.stack && <p className="text-destructive text-sm mt-1">{errors.specs.stack.message}</p>}
                    </div>
                     <div>
                        <Label htmlFor="specs.css">CSS</Label>
                        <Input id="specs.css" {...register('specs.css')} />
                         {errors.specs?.css && <p className="text-destructive text-sm mt-1">{errors.specs.css.message}</p>}
                    </div>
                     <div>
                        <Label htmlFor="specs.cms">CMS</Label>
                        <Input id="specs.cms" {...register('specs.cms')} />
                         {errors.specs?.cms && <p className="text-destructive text-sm mt-1">{errors.specs.cms.message}</p>}
                    </div>
                     <div>
                        <Label htmlFor="specs.type">Type</Label>
                        <Input id="specs.type" {...register('specs.type')} />
                         {errors.specs?.type && <p className="text-destructive text-sm mt-1">{errors.specs.type.message}</p>}
                    </div>
                </CardContent>
               </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader><CardTitle>Media Assets</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2 p-4 border rounded-md">
                  <h3 className="font-medium">Card Image (Store Listing Preview)</h3>
                  <Label htmlFor="cardImage.url">URL</Label>
                  <Input id="cardImage.url" {...register('cardImage.url')} placeholder="https://..." />
                  {errors.cardImage?.url && <p className="text-destructive text-sm mt-1">{errors.cardImage.url.message}</p>}
                  <Label htmlFor="cardImage.alt">Alt Text</Label>
                  <Input id="cardImage.alt" {...register('cardImage.alt')} />
                  {errors.cardImage?.alt && <p className="text-destructive text-sm mt-1">{errors.cardImage.alt.message}</p>}
              </div>
               <div className="space-y-4 p-4 border rounded-md">
                  <div className='flex justify-between items-center'>
                    <h3 className="font-medium">Gallery Images (Detail Page)</h3>
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
              <CardTitle>SEO</CardTitle>
              <CardDescription>Optimize how your template appears on search engines.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                <Label htmlFor="metaTitle">Meta Title (Optional)</Label>
                <Input id="metaTitle" {...register('metaTitle')} />
                {errors.metaTitle && <p className="text-destructive text-sm mt-1">{errors.metaTitle.message}</p>}
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta Description (Optional)</Label>
                <Textarea id="metaDescription" {...register('metaDescription')} rows={3} />
                 {errors.metaDescription && <p className="text-destructive text-sm mt-1">{errors.metaDescription.message}</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </form>
  );
}

    