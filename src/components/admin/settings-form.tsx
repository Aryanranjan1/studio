
'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { SiteConfiguration, PageTypeRules, IndexingRule } from '@/lib/firestore/settings';
import { updateSiteSettings } from '@/lib/firestore/settings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Terminal, Info, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const indexingRuleSchema = z.object({
  index: z.boolean(),
  follow: z.boolean(),
});

const pageTypeRulesSchema = z.object({
  blog: indexingRuleSchema,
  portfolio: indexingRuleSchema,
  services: indexingRuleSchema,
  about: indexingRuleSchema,
  contact: indexingRuleSchema,
  faq: indexingRuleSchema,
  store: indexingRuleSchema,
  offerLetter: indexingRuleSchema,
  contract: indexingRuleSchema,
  timeline: indexingRuleSchema,
});

const formSchema = z.object({
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
    pageTypeRules: pageTypeRulesSchema,
  }),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const defaultIndexingRules: PageTypeRules = {
  blog: { index: true, follow: true },
  portfolio: { index: true, follow: true },
  services: { index: true, follow: true },
  about: { index: true, follow: true },
  contact: { index: true, follow: true },
  faq: { index: true, follow: true },
  store: { index: true, follow: true },
  // Non-configurable defaults for sensitive pages
  offerLetter: { index: false, follow: false },
  contract: { index: false, follow: false },
  timeline: { index: false, follow: false },
};

const pageTypeLabels: Record<keyof PageTypeRules, string> = {
  blog: 'Blog',
  portfolio: 'Portfolio',
  services: 'Services',
  about: 'About',
  contact: 'Contact',
  faq: 'FAQ',
  store: 'Store',
  offerLetter: 'Offer Letters / Proposals',
  contract: 'Contracts',
  timeline: 'Client Timelines / Dashboards',
};

const nonConfigurablePageTypes: (keyof PageTypeRules)[] = ['offerLetter', 'contract', 'timeline'];


export function SettingsForm() {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const settingsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'site_settings', 'config');
  }, [firestore]);
  
  const { data: settingsData, isLoading, error } = useDoc<SiteConfiguration>(settingsRef);
  
  const { control, register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailConfig: { enabled: false, senderName: '', senderEmail: '' },
      aiConfig: { enabled: false, provider: 'gemini' },
      indexingConfig: {
        globalIndexingEnabled: true,
        pageTypeRules: defaultIndexingRules,
      },
    }
  });

  React.useEffect(() => {
    if (settingsData) {
      reset({
        emailConfig: settingsData.emailConfig || { enabled: false, senderName: '', senderEmail: '' },
        aiConfig: settingsData.aiConfig || { enabled: false, provider: 'gemini' },
        indexingConfig: settingsData.indexingConfig || { globalIndexingEnabled: true, pageTypeRules: defaultIndexingRules },
      });
    }
  }, [settingsData, reset]);

  const onSubmit = async (data: SettingsFormValues) => {
    if (!firestore) return;

    if (data.emailConfig.enabled && (!data.emailConfig.senderName || !data.emailConfig.senderEmail)) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Sender Name and Sender Email are required when email sending is enabled.",
        });
        return;
    }

    await updateSiteSettings(firestore, data);
    toast({
      title: 'Settings saved!',
      description: 'Your changes have been successfully saved.',
    });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  if (error) {
    return <div className="text-destructive p-8">Error loading settings: {error.message}</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Email Sending Card */}
      <Card>
        <CardHeader>
          <CardTitle>Email Sending</CardTitle>
          <CardDescription>Configure how replies are sent from the message inbox. Credentials must be set as environment variables.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Controller name="emailConfig.enabled" control={control} render={({ field }) => ( <Switch id="email-enabled" checked={field.value} onCheckedChange={field.onChange} /> )} />
            <Label htmlFor="email-enabled">Enable Email Sending</Label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
                <Label htmlFor="emailConfig.senderName">Sender Name</Label>
                <Input id="emailConfig.senderName" {...register('emailConfig.senderName')} placeholder="Ampire Studio" />
             </div>
             <div>
                <Label htmlFor="emailConfig.senderEmail">Sender Email</Label>
                <Input id="emailConfig.senderEmail" {...register('emailConfig.senderEmail')} placeholder="noreply@ampire.studio" />
                {errors.emailConfig?.senderEmail && <p className="text-sm text-destructive mt-1">{errors.emailConfig.senderEmail.message}</p>}
             </div>
          </div>
           <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Security Notice!</AlertTitle>
              <AlertDescription>
                API keys for your email provider (e.g., Resend, Nodemailer with SMTP) must be stored securely as server-side environment variables and should NOT be entered here.
              </AlertDescription>
            </Alert>
        </CardContent>
      </Card>
      
      {/* AI Assistance Card */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Assisted Replies</CardTitle>
          <CardDescription>Enable AI to help draft replies in the message inbox. The API key must be set as an environment variable.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
             <Controller name="aiConfig.enabled" control={control} render={({ field }) => ( <Switch id="ai-enabled" checked={field.value} onCheckedChange={field.onChange} /> )}/>
            <Label htmlFor="ai-enabled">Enable AI Assistance</Label>
          </div>
           <div>
            <Label htmlFor="aiConfig.provider">AI Provider</Label>
            <Controller name="aiConfig.provider" control={control} render={({ field }) => ( <Select onValueChange={field.onChange} defaultValue={field.value}> <SelectTrigger> <SelectValue placeholder="Select a provider" /> </SelectTrigger> <SelectContent> <SelectItem value="gemini">Google Gemini</SelectItem> <SelectItem value="openai">OpenAI</SelectItem> </SelectContent> </Select> )}/>
          </div>
          <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Security Notice!</AlertTitle>
              <AlertDescription>
                Your AI provider API key (e.g., Gemini API Key) must be stored securely as a server-side environment variable (e.g., `GEMINI_API_KEY`).
              </AlertDescription>
            </Alert>
        </CardContent>
      </Card>

      {/* Indexing Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>Search Engine Indexing & Visibility</CardTitle>
          <CardDescription>Control how search engines like Google crawl and index your site. Incorrect settings can harm your SEO.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <Alert variant="destructive">
              <Info className="h-4 w-4" />
              <AlertTitle>Global Kill-Switch</AlertTitle>
              <AlertDescription>
                Disabling this will add a "noindex, nofollow" tag to all pages, effectively hiding your entire site from search engines. Use with caution.
              </AlertDescription>
            </Alert>
          <div className="flex items-center space-x-2 p-4 border rounded-md">
             <Controller name="indexingConfig.globalIndexingEnabled" control={control} render={({ field }) => ( <Switch id="global-indexing-enabled" checked={field.value} onCheckedChange={field.onChange} /> )}/>
            <Label htmlFor="global-indexing-enabled" className="text-base">Enable Global Site Indexing</Label>
          </div>
          <div>
            <h4 className="font-medium mb-4">Page-Type Indexing Rules</h4>
            <div className="space-y-4">
              {(Object.keys(defaultIndexingRules) as Array<keyof PageTypeRules>).map((pageType) => {
                const isLocked = nonConfigurablePageTypes.includes(pageType);
                return (
                  <div key={pageType} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      {isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                      <Label htmlFor={`index-${pageType}`}>{pageTypeLabels[pageType]}</Label>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                          <Controller name={`indexingConfig.pageTypeRules.${pageType}.index`} control={control} render={({ field }) => ( <Switch id={`index-${pageType}`} checked={field.value} onCheckedChange={field.onChange} disabled={isLocked} /> )}/>
                          <Label htmlFor={`index-${pageType}`} className="text-sm text-muted-foreground">Index</Label>
                      </div>
                      <div className="flex items-center gap-2">
                           <Controller name={`indexingConfig.pageTypeRules.${pageType}.follow`} control={control} render={({ field }) => ( <Switch id={`follow-${pageType}`} checked={field.value} onCheckedChange={field.onChange} disabled={isLocked} /> )}/>
                          <Label htmlFor={`follow-${pageType}`} className="text-sm text-muted-foreground">Follow</Label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>


      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save All Settings
        </Button>
      </div>
    </form>
  );
}

    