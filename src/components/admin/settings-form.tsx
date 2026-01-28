
'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { SiteConfiguration } from '@/lib/firestore/settings';
import { updateSiteSettings } from '@/lib/firestore/settings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';


const formSchema = z.object({
  emailConfig: z.object({
    enabled: z.boolean(),
    senderName: z.string().optional(),
    senderEmail: z.string().email().optional(),
  }),
  aiConfig: z.object({
    enabled: z.boolean(),
    provider: z.enum(['gemini', 'openai']),
  }),
});

type SettingsFormValues = z.infer<typeof formSchema>;

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
    }
  });

  React.useEffect(() => {
    if (settingsData) {
      reset({
        emailConfig: settingsData.emailConfig || { enabled: false, senderName: '', senderEmail: '' },
        aiConfig: settingsData.aiConfig || { enabled: false, provider: 'gemini' },
      });
    }
  }, [settingsData, reset]);

  const onSubmit = async (data: SettingsFormValues) => {
    if (!firestore) return;

    // Validate email fields only if email is enabled
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
      <Card>
        <CardHeader>
          <CardTitle>Email Sending</CardTitle>
          <CardDescription>Configure how replies are sent from the message inbox. Credentials must be set as environment variables.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Controller
              name="emailConfig.enabled"
              control={control}
              render={({ field }) => (
                <Switch
                  id="email-enabled"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
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
      
      <Card>
        <CardHeader>
          <CardTitle>AI-Assisted Replies</CardTitle>
          <CardDescription>Enable AI to help draft replies in the message inbox. The API key must be set as an environment variable.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
             <Controller
              name="aiConfig.enabled"
              control={control}
              render={({ field }) => (
                <Switch
                  id="ai-enabled"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="ai-enabled">Enable AI Assistance</Label>
          </div>
           <div>
            <Label htmlFor="aiConfig.provider">AI Provider</Label>
            <Controller
                name="aiConfig.provider"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini">Google Gemini</SelectItem>
                      <SelectItem value="openai">OpenAI</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
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

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Settings
        </Button>
      </div>
    </form>
  );
}
