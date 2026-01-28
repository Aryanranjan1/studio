
'use client';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useIsAdmin } from '@/hooks/useIsAdmin';
import { Loader2, Save } from 'lucide-react';
import { SettingsForm } from '@/components/admin/settings-form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { updateSiteSettings, type SiteConfiguration } from '@/lib/firestore/settings';

const formSchema = z.object({
  brandingConfig: z.object({
    logoUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
    faviconUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
    defaultOgImageUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  }),
  emailConfig: z.object({
    enabled: z.boolean(),
    senderName: z.string().optional(),
    senderEmail: z.string().email({ message: "Please enter a valid email." }).optional().or(z.literal('')),
  }),
  aiConfig: z.object({
    enabled: z.boolean(),
    provider: z.enum(['gemini', 'openai']),
  }),
  indexingConfig: z.object({
    globalIndexingEnabled: z.boolean(),
    pageTypeRules: z.any(), // Not validating deeply here, handled in component
  }),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const navItems = [
  { id: 'branding', label: 'Branding & Media' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'indexing', label: 'SEO & Indexing' },
]

export default function SettingsPage() {
    const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();
    const { toast } = useToast();
    const firestore = useFirestore();

    const settingsRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return doc(firestore, 'site_settings', 'config');
    }, [firestore]);
    
    const { data: settingsData, isLoading: settingsLoading } = useDoc<SiteConfiguration>(settingsRef);
    
    const methods = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            brandingConfig: { logoUrl: '', faviconUrl: '', defaultOgImageUrl: '' },
            emailConfig: { enabled: false, senderName: '', senderEmail: '' },
            aiConfig: { enabled: false, provider: 'gemini' },
            indexingConfig: { globalIndexingEnabled: true, pageTypeRules: {} },
        }
    });
    
    React.useEffect(() => {
        if (settingsData) {
            methods.reset(settingsData as SettingsFormValues);
        }
    }, [settingsData, methods]);
    
    const onSubmit = async (data: SettingsFormValues) => {
        if (!firestore) return;
        await updateSiteSettings(firestore, data);
        toast({
          title: 'Settings saved!',
          description: 'Your changes have been successfully saved.',
        });
    };

    const isLoading = isAdminLoading || settingsLoading;
    
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8 h-full">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="ml-2">Loading Settings...</p>
        </div>
      );
    }
  
    if (!isAdmin) {
      return (
        <div className="text-center p-8">
          <h2 className="text-xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground">You do not have permission to view this page.</p>
        </div>
      );
    }

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between mb-8 pb-4 border-b">
              <div>
                  <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
                  <p className="text-muted-foreground">Manage site-wide branding, integrations, and features.</p>
              </div>
              <Button type="submit" disabled={methods.formState.isSubmitting}>
                  {methods.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save All Settings
              </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <aside className="md:col-span-3 lg:col-span-2">
                  <nav className="sticky top-24">
                      <ul className="space-y-2">
                        {navItems.map(item => (
                           <li key={item.id}>
                               <a href={`#${item.id}`} className="block text-muted-foreground hover:text-foreground font-medium p-2 rounded-md transition-colors">
                                   {item.label}
                               </a>
                           </li>
                        ))}
                      </ul>
                  </nav>
              </aside>
              <div className="md:col-span-9 lg:col-span-10">
                  <SettingsForm />
              </div>
          </div>
        </form>
      </FormProvider>
    );
}

    