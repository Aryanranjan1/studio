
'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import type { FaqItem } from '@/lib/data';

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
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
  question: z.string().min(1, 'Question is required.'),
  answer: z.string().min(1, 'Answer is required.'),
  preview: z.string().min(1, 'Preview text is required.'),
  category: z.string().min(1, 'Category is required.'),
  order: z.coerce.number().min(0, 'Order must be a positive number.'),
  published: z.boolean().default(false),
  linkHref: z.string().url().optional().or(z.literal('')),
  linkText: z.string().optional(),
});

type FaqFormValues = z.infer<typeof formSchema>;

interface FaqFormProps {
  defaultValues?: Partial<FaqItem>;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export function FaqForm({ defaultValues, onSubmit, isSubmitting }: FaqFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const mappedDefaultValues = defaultValues ? {
    ...defaultValues,
    linkHref: defaultValues.link?.href || '',
    linkText: defaultValues.link?.text || '',
  } : {
    published: false,
    order: 0,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FaqFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: mappedDefaultValues,
  });

  const processSubmit = (data: FaqFormValues) => {
    const { linkHref, linkText, ...restOfData } = data;
    
    const finalData: { [key: string]: any } = {
      ...restOfData,
      link: linkHref && linkText ? { href: linkHref, text: linkText } : null,
    };
    
    // Sanitize data before submitting to remove undefined/null values
    Object.keys(finalData).forEach(key => {
      if (finalData[key] === undefined || finalData[key] === null) {
        delete finalData[key];
      }
    });

    onSubmit(finalData);
    toast({
        title: "Success!",
        description: `FAQ item has been ${defaultValues ? 'updated' : 'created'}.`,
    });
    router.push('/admin/faq');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">{defaultValues ? 'Edit FAQ' : 'Create New FAQ'}</h1>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {defaultValues ? 'Save Changes' : 'Create FAQ'}
        </Button>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>FAQ Details</CardTitle>
            <CardDescription>Fill out the information for the FAQ item.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center space-x-2 pt-2">
                <Controller
                name="published"
                control={control}
                render={({ field }) => ( <Switch id="published" checked={field.value} onCheckedChange={field.onChange} /> )}
                />
                <Label htmlFor="published" className="cursor-pointer">Published</Label>
            </div>
          <div>
            <Label htmlFor="question">Question</Label>
            <Input id="question" {...register('question')} />
            {errors.question && <p className="text-destructive text-sm mt-1">{errors.question.message}</p>}
          </div>
           <div>
            <Label htmlFor="answer">Answer (HTML allowed)</Label>
            <Textarea id="answer" {...register('answer')} rows={5} />
            {errors.answer && <p className="text-destructive text-sm mt-1">{errors.answer.message}</p>}
          </div>
           <div>
            <Label htmlFor="preview">Preview Text</Label>
            <Textarea id="preview" {...register('preview')} rows={2} />
            {errors.preview && <p className="text-destructive text-sm mt-1">{errors.preview.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" {...register('category')} />
              {errors.category && <p className="text-destructive text-sm mt-1">{errors.category.message}</p>}
            </div>
            <div>
              <Label htmlFor="order">Display Order</Label>
              <Input id="order" type="number" {...register('order')} />
              {errors.order && <p className="text-destructive text-sm mt-1">{errors.order.message}</p>}
            </div>
          </div>
           <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkHref">Link URL (Optional)</Label>
              <Input id="linkHref" {...register('linkHref')} placeholder="https://example.com" />
              {errors.linkHref && <p className="text-destructive text-sm mt-1">{errors.linkHref.message}</p>}
            </div>
            <div>
              <Label htmlFor="linkText">Link Text (Optional)</Label>
              <Input id="linkText" {...register('linkText')} placeholder="Learn More" />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

    