import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePortfolioStore } from '@/lib/store';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const themeSchema = z.object({
  mode: z.enum(['light', 'dark', 'system']),
  primary: z.string(),
  accent: z.string(),
  background: z.string(),
  foreground: z.string(),
  lightPrimary: z.string(),
  lightAccent: z.string(),
  lightBackground: z.string(),
  lightForeground: z.string(),
  fontScale: z.number().min(0.85).max(1.25),
  density: z.enum(['compact', 'comfortable']),
  textAlign: z.enum(['left', 'center']),
  portfolioTheme: z.enum(['light', 'dark']),
});

export function ThemeForm() {
  const { portfolio, updateTheme } = usePortfolioStore();
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof themeSchema>>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      mode: portfolio.theme.mode,
      primary: portfolio.theme.primary,
      accent: portfolio.theme.accent,
      background: portfolio.theme.background,
      foreground: portfolio.theme.foreground,
      lightPrimary: portfolio.theme.lightPrimary || '#0ea5e9',
      lightAccent: portfolio.theme.lightAccent || '#22c55e',
      lightBackground: portfolio.theme.lightBackground || '#ffffff',
      lightForeground: portfolio.theme.lightForeground || '#1f2937',
      fontScale: portfolio.theme.fontScale,
      density: portfolio.theme.density,
      textAlign: portfolio.theme.textAlign || 'left',
      portfolioTheme: portfolio.theme.portfolioTheme || 'dark',
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (form.formState.isValid) {
        updateTheme(value as any);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateTheme]);

  return (
    <Form {...form}>
      <form className="space-y-6 max-h-screen">
        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('theme.colorMode')}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">{t('theme.light')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark">{t('theme.dark')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system">{t('theme.system')}</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="primary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('theme.primaryColor')}</FormLabel>
              <div className="flex gap-2 items-center">
                <FormControl>
                  <Input type="color" {...field} className="w-20 h-10" />
                </FormControl>
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="#0ea5e9"
                  className="flex-1"
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('theme.accentColor')}</FormLabel>
              <div className="flex gap-2 items-center">
                <FormControl>
                  <Input type="color" {...field} className="w-20 h-10" />
                </FormControl>
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="#22c55e"
                  className="flex-1"
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="background"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('theme.backgroundColor')}</FormLabel>
              <div className="flex gap-2 items-center">
                <FormControl>
                  <Input type="color" {...field} className="w-20 h-10" />
                </FormControl>
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="#0b1020"
                  className="flex-1"
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="foreground"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('theme.foregroundColor')}</FormLabel>
              <div className="flex gap-2 items-center">
                <FormControl>
                  <Input type="color" {...field} className="w-20 h-10" />
                </FormControl>
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="#e5e7eb"
                  className="flex-1"
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lightBackground"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('theme.lightBackgroundColor')}</FormLabel>
              <div className="flex gap-2 items-center">
                <FormControl>
                  <Input type="color" {...field} className="w-20 h-10" />
                </FormControl>
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="#ffffff"
                  className="flex-1"
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lightForeground"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('theme.lightForegroundColor')}</FormLabel>
              <div className="flex gap-2 items-center">
                <FormControl>
                  <Input type="color" {...field} className="w-20 h-10" />
                </FormControl>
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="#1f2937"
                  className="flex-1"
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lightPrimary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('theme.lightPrimaryColor')}</FormLabel>
              <div className="flex gap-2 items-center">
                <FormControl>
                  <Input type="color" {...field} className="w-20 h-10" />
                </FormControl>
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="#0ea5e9"
                  className="flex-1"
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lightAccent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('theme.lightAccentColor')}</FormLabel>
              <div className="flex gap-2 items-center">
                <FormControl>
                  <Input type="color" {...field} className="w-20 h-10" />
                </FormControl>
                <Input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="#22c55e"
                  className="flex-1"
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fontScale"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('theme.fontScale')}: {field.value.toFixed(2)}x</FormLabel>
              <FormControl>
                <Slider
                  min={0.85}
                  max={1.25}
                  step={0.05}
                  value={[field.value]}
                  onValueChange={(vals) => field.onChange(vals[0])}
                />
              </FormControl>
              <FormDescription>{t('theme.fontScaleDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="density"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('theme.spacingDensity')}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="compact" />
                    <Label htmlFor="compact">{t('theme.compact')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comfortable" id="comfortable" />
                    <Label htmlFor="comfortable">{t('theme.comfortable')}</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="textAlign"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('theme.textAlign')}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="left" id="align-left" />
                    <Label htmlFor="align-left">{t('theme.textAlignLeft')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="center" id="align-center" />
                    <Label htmlFor="align-center">{t('theme.textAlignCenter')}</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolioTheme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('theme.portfolioTheme')}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="portfolio-light" />
                    <Label htmlFor="portfolio-light">{t('theme.portfolioThemeLight')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="portfolio-dark" />
                    <Label htmlFor="portfolio-dark">{t('theme.portfolioThemeDark')}</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormDescription>{t('theme.portfolioThemeDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
