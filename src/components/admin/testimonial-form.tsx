'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import type { Testimonial } from '@/lib/data';

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

const formSchema = z.object({
  quote: z.string().min(1, 'Quote is required.'),
  name: z.string().min(1, 'Name is required.'),
  role: z.string().min(1, 'Role is required.'),
  company: z.string().min(1, 'Company is required.'),
  image: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
  projectId: z.string().optional(),
});

type TestimonialFormValues = z.infer<typeof formSchema>;

interface TestimonialFormProps {
  defaultValues?: Partial<Testimonial>;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export function TestimonialForm({ defaultValues, onSubmit, isSubmitting }: TestimonialFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const processSubmit = (data: TestimonialFormValues) => {
    onSubmit(data);
    toast({
        title: "Success!",
        description: `Testimonial has been ${defaultValues ? 'updated' : 'created'}.`,
    });
    router.push('/admin/testimonials');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold md:text-2xl">{defaultValues ? 'Edit Testimonial' : 'Create New Testimonial'}</h1>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {defaultValues ? 'Save Changes' : 'Create Testimonial'}
        </Button>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Testimonial Details</CardTitle>
            <CardDescription>Fill out the information for the client testimonial.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="quote">Quote</Label>
            <Textarea id="quote" {...register('quote')} rows={5} />
            {errors.quote && <p className="text-destructive text-sm mt-1">{errors.quote.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Client Name</Label>
              <Input id="name" {...register('name')} />
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="role">Client Role</Label>
              <Input id="role" {...register('role')} />
              {errors.role && <p className="text-destructive text-sm mt-1">{errors.role.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" {...register('company')} />
              {errors.company && <p className="text-destructive text-sm mt-1">{errors.company.message}</p>}
            </div>
             <div>
              <Label htmlFor="image">Client Image URL (Optional)</Label>
              <Input id="image" {...register('image')} placeholder="https://..." />
              {errors.image && <p className="text-destructive text-sm mt-1">{errors.image.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="projectId">Associated Project ID (Optional)</Label>
            <Input id="projectId" {...register('projectId')} placeholder="e.g., kopi-dua-darjat" />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
