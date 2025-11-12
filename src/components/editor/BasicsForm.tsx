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
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const basicsSchema = z.object({
  careerName: z.string().min(1, 'Career name is required'),
  title: z.string().min(1, 'Title is required'),
  presentation: z.string().max(1500, 'Presentation must be 1500 characters or less'),
});

export function BasicsForm() {
  const { portfolio, updateBasics, updateLanguage } = usePortfolioStore();
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof basicsSchema>>({
    resolver: zodResolver(basicsSchema),
    defaultValues: {
      careerName: portfolio.careerName,
      title: portfolio.title,
      presentation: portfolio.presentation,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (form.formState.isValid) {
        updateBasics(value as any);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateBasics]);

  return (
    <Form {...form}>
      <form className="space-y-6 max-h-screen">
        <FormField
          control={form.control}
          name="careerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('basics.careerName')}</FormLabel>
              <FormControl>
                <Input placeholder={t('basics.careerNamePlaceholder')} {...field} />
              </FormControl>
              <FormDescription>{t('basics.careerNameDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('basics.title')}</FormLabel>
              <FormControl>
                <Input placeholder={t('basics.titlePlaceholder')} {...field} />
              </FormControl>
              <FormDescription>{t('basics.titleDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="presentation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('basics.presentation')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('basics.presentationPlaceholder')}
                  className="min-h-[200px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {field.value?.length || 0} / 1500 {t('basics.characters')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <Label>{t('basics.portfolioLanguage')}</Label>
          <RadioGroup
            value={portfolio.language || 'en'}
            onValueChange={(value) => updateLanguage(value as 'en' | 'es')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="en" id="lang-en" />
              <Label htmlFor="lang-en">English</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="es" id="lang-es" />
              <Label htmlFor="lang-es">Español</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-muted-foreground">{t('basics.portfolioLanguageDescription')}</p>
        </div>
      </form>
    </Form>
  );
}
