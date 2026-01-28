
'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal, Info, Lock, Image as ImageIcon, Contact, Megaphone, Link as LinkIcon, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { PageTypeRules } from '@/lib/firestore/settings';
import Link from 'next/link';

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
      {/* Branding & Identity Card */}
      <Card>
        <CardHeader>
          <CardTitle>Brand & Identity</CardTitle>
          <CardDescription>Manage your site's name, logo, favicon, and default social sharing image.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <Alert>
              <ImageIcon className="h-4 w-4" />
              <AlertTitle>Image URLs</AlertTitle>
              <AlertDescription>
                Provide direct URLs to hosted image assets. These are used globally for SEO and branding.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brandingConfig.websiteName">Website Name</Label>
                <Input id="brandingConfig.websiteName" {...register('brandingConfig.websiteName')} placeholder="Ampire Studio" />
              </div>
              <div>
                <Label htmlFor="brandingConfig.brandName">Brand Name (Short)</Label>
                <Input id="brandingConfig.brandName" {...register('brandingConfig.brandName')} placeholder="Ampire" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brandingConfig.logoUrl">Primary Logo URL</Label>
                <Input id="brandingConfig.logoUrl" {...register('brandingConfig.logoUrl')} placeholder="https://..." />
                {(errors.brandingConfig as any)?.logoUrl && <p className="text-sm text-destructive mt-1">{(errors.brandingConfig as any).logoUrl.message}</p>}
              </div>
              <div>
                <Label htmlFor="brandingConfig.faviconUrl">Favicon URL (.svg, .ico, or .png)</Label>
                <Input id="brandingConfig.faviconUrl" {...register('brandingConfig.faviconUrl')} placeholder="https://..." />
                {(errors.brandingConfig as any)?.faviconUrl && <p className="text-sm text-destructive mt-1">{(errors.brandingConfig as any).faviconUrl.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="brandingConfig.defaultOgImageUrl">Default Social Share (OG) Image URL</Label>
              <Input id="brandingConfig.defaultOgImageUrl" {...register('brandingConfig.defaultOgImageUrl')} placeholder="https://..." />
              {(errors.brandingConfig as any)?.defaultOgImageUrl && <p className="text-sm text-destructive mt-1">{(errors.brandingConfig as any).defaultOgImageUrl.message}</p>}
            </div>
        </CardContent>
      </Card>
      
      {/* Contact & Business Information Card */}
      <Card>
        <CardHeader>
            <CardTitle>Contact & Business Information</CardTitle>
            <CardDescription>Global contact details used in the footer, contact pages, and metadata.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="contactConfig.primaryEmail">Primary Contact Email</Label>
                    <Input id="contactConfig.primaryEmail" {...register('contactConfig.primaryEmail')} placeholder="contact@ampire.studio" />
                    {(errors.contactConfig as any)?.primaryEmail && <p className="text-sm text-destructive mt-1">{(errors.contactConfig as any).primaryEmail.message}</p>}
                </div>
                 <div>
                    <Label htmlFor="contactConfig.phone">Phone Number</Label>
                    <Input id="contactConfig.phone" {...register('contactConfig.phone')} placeholder="+60 12-345 6789" />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="contactConfig.address">Business Address</Label>
                    <Input id="contactConfig.address" {...register('contactConfig.address')} placeholder="Kuala Lumpur, Malaysia" />
                </div>
                 <div>
                    <Label htmlFor="contactConfig.businessHours">Business Hours</Label>
                    <Input id="contactConfig.businessHours" {...register('contactConfig.businessHours')} placeholder="Mon-Fri, 9am-6pm" />
                </div>
            </div>
            <div>
                <h4 className="font-medium mb-4">Social Media Links</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input {...register('contactConfig.socialLinks.linkedin')} placeholder="LinkedIn URL" />
                    <Input {...register('contactConfig.socialLinks.instagram')} placeholder="Instagram URL" />
                    <Input {...register('contactConfig.socialLinks.pinterest')} placeholder="Pinterest URL" />
                    <Input {...register('contactConfig.socialLinks.dribbble')} placeholder="Dribbble URL" />
                </div>
            </div>
        </CardContent>
      </Card>

      {/* Integrations Card */}
      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Enable and configure third-party services like email and AI.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
                        {(errors.emailConfig as any)?.senderEmail && <p className="text-sm text-destructive mt-1">{(errors.emailConfig as any).senderEmail.message}</p>}
                    </div>
                 </div>
                 <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Security Notice!</AlertTitle>
                    <AlertDescription>
                        API keys for your email provider must be stored as server-side environment variables and should NOT be entered here.
                    </AlertDescription>
                </Alert>
            </div>
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
                        Your AI provider API key must be stored securely as a server-side environment variable.
                    </AlertDescription>
                </Alert>
            </div>
        </CardContent>
      </Card>

      {/* SEO & Indexing Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>SEO & Crawling</CardTitle>
          <CardDescription>Control how search engines and AI crawlers index your site. Incorrect settings can harm your SEO.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <Label htmlFor="seoConfig.baseSiteUrl">Base Site URL</Label>
                <Input id="seoConfig.baseSiteUrl" {...register('seoConfig.baseSiteUrl')} placeholder="https://www.ampire.studio" />
                {(errors.seoConfig as any)?.baseSiteUrl && <p className="text-sm text-destructive mt-1">{(errors.seoConfig as any).baseSiteUrl.message}</p>}
            </div>
             <div>
                <Label htmlFor="seoConfig.defaultMetaTitleTemplate">Default Meta Title Template</Label>
                <Input id="seoConfig.defaultMetaTitleTemplate" {...register('seoConfig.defaultMetaTitleTemplate')} placeholder="%s | Ampire Studio" />
                <p className="text-xs text-muted-foreground mt-1">`%s` will be replaced with the page's specific title.</p>
            </div>
             <div>
                <Label htmlFor="seoConfig.defaultMetaDescription">Default Meta Description</Label>
                <Input id="seoConfig.defaultMetaDescription" {...register('seoConfig.defaultMetaDescription')} />
            </div>
           <Alert variant="destructive">
              <Info className="h-4 w-4" />
              <AlertTitle>Global Kill-Switch</AlertTitle>
              <AlertDescription>
                Disabling this will add a "noindex, nofollow" tag to all pages, effectively hiding your entire site from search engines. Use with caution.
              </AlertDescription>
            </Alert>
          <div className="flex items-center space-x-2 p-4 border rounded-md">
             <Controller name="seoConfig.globalIndexingEnabled" control={control} render={({ field }) => ( <Switch id="global-indexing-enabled" checked={field.value} onCheckedChange={field.onChange} /> )}/>
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
                          <Controller name={`seoConfig.pageTypeRules.${pageType}.index`} control={control} render={({ field }) => ( <Switch id={`index-${pageType}`} checked={field.value} onCheckedChange={field.onChange} disabled={isLocked} /> )}/>
                          <Label htmlFor={`index-${pageType}`} className="text-sm text-muted-foreground">Index</Label>
                      </div>
                      <div className="flex items-center gap-2">
                           <Controller name={`seoConfig.pageTypeRules.${pageType}.follow`} control={control} render={({ field }) => ( <Switch id={`follow-${pageType}`} checked={field.value} onCheckedChange={field.onChange} disabled={isLocked} /> )}/>
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
      
      {/* Generated SEO Files Card */}
      <Card>
        <CardHeader>
          <CardTitle>Live SEO Files</CardTitle>
          <CardDescription>
            These files are generated dynamically based on your settings. Click to verify their current content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                      <p className="font-semibold">robots.txt</p>
                      <p className="text-sm text-muted-foreground">Rules for web crawlers.</p>
                  </div>
              </div>
              <Button asChild variant="outline" size="sm">
                  <Link href="/robots.txt" target="_blank">
                      View File <LinkIcon className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                      <p className="font-semibold">sitemap.xml</p>
                      <p className="text-sm text-muted-foreground">Index of all public pages.</p>
                  </div>
              </div>
              <Button asChild variant="outline" size="sm">
                  <Link href="/sitemap.xml" target="_blank">
                      View File <LinkIcon className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                      <p className="font-semibold">llms.txt</p>
                      <p className="text-sm text-muted-foreground">Instructions for AI crawlers.</p>
                  </div>
              </div>
              <Button asChild variant="outline" size="sm">
                  <Link href="/llms.txt" target="_blank">
                      View File <LinkIcon className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
