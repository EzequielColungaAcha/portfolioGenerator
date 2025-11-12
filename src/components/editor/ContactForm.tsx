import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePortfolioStore } from '@/lib/store';
import { Plus, Trash2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const contactSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  socials: z.array(z.object({
    label: z.string().min(1, 'Social label is required'),
    url: z.string().url('Invalid social media URL'),
  })),
});

export function ContactForm() {
  const { portfolio, updateContact } = usePortfolioStore();
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: portfolio.contact,
  });

  const socials = form.watch('socials');

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (form.formState.isValid) {
        updateContact(value as any);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateContact]);

  const addSocial = () => {
    const current = form.getValues('socials');
    form.setValue('socials', [...current, { label: '', url: '' }]);
  };

  const removeSocial = (index: number) => {
    const current = form.getValues('socials');
    form.setValue('socials', current.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact.email')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t('contact.emailPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact.phone')}</FormLabel>
              <FormControl>
                <Input placeholder={t('contact.phonePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact.location')}</FormLabel>
              <FormControl>
                <Input placeholder={t('contact.locationPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact.website')}</FormLabel>
              <FormControl>
                <Input placeholder={t('contact.websitePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <FormLabel>{t('contact.socialLinks')}</FormLabel>
            <Button type="button" variant="outline" size="sm" onClick={addSocial}>
              <Plus className="h-4 w-4 mr-2" />
              {t('contact.addSocial')}
            </Button>
          </div>

          {socials?.map((_, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name={`socials.${index}.label`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.platformName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('contact.platformPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`socials.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.url')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('contact.urlPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSocial(index)}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t('contact.remove')}
                </Button>
              </div>
            </Card>
          ))}

          {socials?.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              {t('contact.noSocials')}
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}
