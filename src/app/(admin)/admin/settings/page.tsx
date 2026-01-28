
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
import { useFirestore } from '@/firebase';
import { updateSiteSettings, type SiteConfiguration } from '@/lib/firestore/settings';
import { usePublicSettings } from '@/hooks/use-settings';

const formSchema = z.object({
  brandingConfig: z.object({
    websiteName: z.string().optional(),
    brandName: z.string().optional(),
    logoUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
    squareLogoUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
    faviconUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
    defaultOgImageUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  }),
  contactConfig: z.object({
    primaryEmail: z.string().email().optional().or(z.literal('')),
    supportEmail: z.string().email().optional().or(z.literal('')),
    phone: z.string().optional(),
    address: z.string().optional(),
    country: z.string().optional(),
    businessHours: z.string().optional(),
    socialLinks: z.object({
      linkedin: z.string().url().optional().or(z.literal('')),
      instagram: z.string().url().optional().or(z.literal('')),
      facebook: z.string().url().optional().or(z.literal('')),
      twitter: z.string().url().optional().or(z.literal('')),
      youtube: z.string().url().optional().or(z.literal('')),
      pinterest: z.string().url().optional().or(z.literal('')),
      dribbble: z.string().url().optional().or(z.literal('')),
    }).optional()
  }),
  seoConfig: z.object({
      baseSiteUrl: z.string().url().optional().or(z.literal('')),
      defaultMetaTitleTemplate: z.string().optional(),
      defaultMetaDescription: z.string().optional(),
      globalIndexingEnabled: z.boolean(),
      pageTypeRules: z.any(),
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
});

type SettingsFormValues = z.infer<typeof formSchema>;

const defaultValues: SettingsFormValues = {
  brandingConfig: { websiteName: '', brandName: '', logoUrl: '', squareLogoUrl: '', faviconUrl: '', defaultOgImageUrl: '' },
  contactConfig: { primaryEmail: '', supportEmail: '', phone: '', address: '', country: '', businessHours: '', socialLinks: { linkedin: '', instagram: '', facebook: '', twitter: '', youtube: '', pinterest: '', dribbble: '' } },
  seoConfig: { baseSiteUrl: '', defaultMetaTitleTemplate: '%s | Ampire Studio', defaultMetaDescription: '', globalIndexingEnabled: true, pageTypeRules: {} },
  emailConfig: { enabled: false, senderName: '', senderEmail: '' },
  aiConfig: { enabled: false, provider: 'gemini' },
};

export default function SettingsPage() {
    const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();
    const { toast } = useToast();
    const firestore = useFirestore();

    const { settings: settingsData, isLoading: settingsLoading } = usePublicSettings();
    
    const methods = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });
    
    React.useEffect(() => {
        if (settingsData) {
            // Deep merge to avoid losing nested object structures if they are missing from Firestore
            const mergedValues = {
                ...defaultValues,
                ...settingsData,
                brandingConfig: { ...defaultValues.brandingConfig, ...settingsData.brandingConfig },
                contactConfig: { ...defaultValues.contactConfig, ...settingsData.contactConfig, socialLinks: { ...defaultValues.contactConfig.socialLinks, ...settingsData.contactConfig?.socialLinks } },
                seoConfig: { ...defaultValues.seoConfig, ...settingsData.seoConfig },
                emailConfig: { ...defaultValues.emailConfig, ...settingsData.emailConfig },
                aiConfig: { ...defaultValues.aiConfig, ...settingsData.aiConfig },
            };
            methods.reset(mergedValues as SettingsFormValues);
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
                  <h1 className="text-lg font-semibold md:text-2xl">Site Settings</h1>
                  <p className="text-muted-foreground">Manage site-wide branding, contact info, integrations, and SEO.</p>
              </div>
              <Button type="submit" disabled={methods.formState.isSubmitting}>
                  {methods.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save All Settings
              </Button>
          </div>
          
          <div className="space-y-12">
              <SettingsForm />
          </div>
        </form>
      </FormProvider>
    );
}
    

    