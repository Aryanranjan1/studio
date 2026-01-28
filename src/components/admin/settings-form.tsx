
'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal, Info, Lock, Image as ImageIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { PageTypeRules, IndexingRule } from '@/lib/firestore/settings';

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
  const { control, register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-12">
      {/* Branding & Media Card */}
      <Card id="branding">
        <CardHeader>
          <CardTitle>Branding & Media</CardTitle>
          <CardDescription>Manage your site's logo, favicon, and default social sharing image.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <Alert>
              <ImageIcon className="h-4 w-4" />
              <AlertTitle>Image URLs</AlertTitle>
              <AlertDescription>
                Please provide direct URLs to your hosted image assets.
              </AlertDescription>
            </Alert>
          <div>
            <Label htmlFor="brandingConfig.logoUrl">Logo URL</Label>
            <Input id="brandingConfig.logoUrl" {...register('brandingConfig.logoUrl')} placeholder="https://..." />
            {errors.brandingConfig?.logoUrl && <p className="text-sm text-destructive mt-1">{(errors.brandingConfig.logoUrl as any).message}</p>}
          </div>
          <div>
            <Label htmlFor="brandingConfig.faviconUrl">Favicon URL (.svg, .ico, or .png)</Label>
            <Input id="brandingConfig.faviconUrl" {...register('brandingConfig.faviconUrl')} placeholder="https://..." />
            {errors.brandingConfig?.faviconUrl && <p className="text-sm text-destructive mt-1">{(errors.brandingConfig.faviconUrl as any).message}</p>}
          </div>
          <div>
            <Label htmlFor="brandingConfig.defaultOgImageUrl">Default OG Image URL (for social sharing)</Label>
            <Input id="brandingConfig.defaultOgImageUrl" {...register('brandingConfig.defaultOgImageUrl')} placeholder="https://..." />
            {errors.brandingConfig?.defaultOgImageUrl && <p className="text-sm text-destructive mt-1">{(errors.brandingConfig.defaultOgImageUrl as any).message}</p>}
          </div>
        </CardContent>
      </Card>
      
      {/* Integrations Card */}
      <Card id="integrations">
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Enable and configure third-party services like email and AI.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {/* Email Sending Section */}
            <div className="space-y-4 p-4 border rounded-md">
                <h4 className="font-medium">Email Sending</h4>
                 <div className="flex items-center space-x-2">
                    <Controller name="emailConfig.enabled" control={control} render={({ field }) => ( <Switch id="email-enabled" checked={field.value} onCheckedChange={field.onChange} /> )} />
                    <Label htmlFor="email-enabled">Enable Email Sending (for Inbox replies)</Label>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="emailConfig.senderName">Sender Name</Label>
                        <Input id="emailConfig.senderName" {...register('emailConfig.senderName')} placeholder="Ampire Studio" />
                    </div>
                    <div>
                        <Label htmlFor="emailConfig.senderEmail">Sender Email</Label>
                        <Input id="emailConfig.senderEmail" {...register('emailConfig.senderEmail')} placeholder="noreply@ampire.studio" />
                        {errors.emailConfig?.senderEmail && <p className="text-sm text-destructive mt-1">{(errors.emailConfig.senderEmail as any).message}</p>}
                    </div>
                 </div>
                 <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Security Notice!</AlertTitle>
                    <AlertDescription>
                        API keys for your email provider (e.g., Resend) must be stored as server-side environment variables and should NOT be entered here.
                    </AlertDescription>
                </Alert>
            </div>

            {/* AI Assistance Section */}
            <div className="space-y-4 p-4 border rounded-md">
                <h4 className="font-medium">AI Assistance</h4>
                <div className="flex items-center space-x-2">
                    <Controller name="aiConfig.enabled" control={control} render={({ field }) => ( <Switch id="ai-enabled" checked={field.value} onCheckedChange={field.onChange} /> )}/>
                    <Label htmlFor="ai-enabled">Enable AI Assistance (for Inbox replies)</Label>
                </div>
                <div>
                    <Label htmlFor="aiConfig.provider">AI Provider</Label>
                    <Controller name="aiConfig.provider" control={control} render={({ field }) => ( <Select onValueChange={field.onChange} defaultValue={field.value}> <SelectTrigger> <SelectValue placeholder="Select a provider" /> </SelectTrigger> <SelectContent> <SelectItem value="gemini">Google Gemini</SelectItem> <SelectItem value="openai">OpenAI</SelectItem> </SelectContent> </Select> )}/>
                </div>
                 <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Security Notice!</AlertTitle>
                    <AlertDescription>
                        Your AI provider API key (e.g., Gemini API Key) must be stored securely as a server-side environment variable.
                    </AlertDescription>
                </Alert>
            </div>
        </CardContent>
      </Card>

      {/* Indexing Settings Card */}
      <Card id="indexing">
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
    </div>
  );
}

    