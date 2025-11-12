import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project, ProjectSchema } from '@/lib/schema';
import { usePortfolioStore } from '@/lib/store';
import { X, Plus, Upload, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { IconPicker } from './IconPicker';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectEditorProps {
  project: Project;
  isNew: boolean;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

export function ProjectEditor({ project, isNew, onSave, onCancel }: ProjectEditorProps) {
  const { updateProject } = usePortfolioStore();
  const { t } = useLanguage();
  const [tagInput, setTagInput] = useState('');
  const [techInput, setTechInput] = useState('');

  const form = useForm<Project>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: project,
  });

  const tags = form.watch('tags');
  const tech = form.watch('tech');

  const handleSubmit = (data: Project) => {
    if (isNew) {
      onSave(data);
    } else {
      updateProject(data.id, data);
      onSave(data);
    }
  };

  const addTag = () => {
    if (tagInput.trim()) {
      const current = form.getValues('tags');
      if (!current.includes(tagInput.trim())) {
        form.setValue('tags', [...current, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    const current = form.getValues('tags');
    form.setValue('tags', current.filter(t => t !== tag));
  };

  const addTech = () => {
    if (techInput.trim()) {
      const current = form.getValues('tech');
      if (!current.includes(techInput.trim())) {
        form.setValue('tech', [...current, techInput.trim()]);
      }
      setTechInput('');
    }
  };

  const removeTech = (techItem: string) => {
    const current = form.getValues('tech');
    form.setValue('tech', current.filter(t => t !== techItem));
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{isNew ? t('projects.addNewProject') : t('projects.editProject')}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-scroll min-h-0 pr-2 sm:pr-4 -mr-2 sm:-mr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('projects.projectTitle')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('projects.projectTitlePlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('projects.description')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('projects.descriptionPlaceholder')}
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length || 0} / 280 {t('basics.characters')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('projects.projectUrl')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('projects.projectUrlPlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="appType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('projects.projectType')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('projects.selectType')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Notebook">{t('projectTypes.notebook')}</SelectItem>
                        <SelectItem value="Dashboard">{t('projectTypes.dashboard')}</SelectItem>
                        <SelectItem value="BI Report">{t('projectTypes.biReport')}</SelectItem>
                        <SelectItem value="SQL">{t('projectTypes.sql')}</SelectItem>
                        <SelectItem value="ML Model">{t('projectTypes.mlModel')}</SelectItem>
                        <SelectItem value="API">{t('projectTypes.api')}</SelectItem>
                        <SelectItem value="Other">{t('projectTypes.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('projects.icon')}</FormLabel>
                    <FormControl>
                      <IconPicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('projects.screenshot')}</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {field.value ? (
                          <div className="relative">
                            <img
                              src={field.value}
                              alt="Project preview"
                              className="w-full h-48 object-cover rounded border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => field.onChange(undefined)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full"
                              onClick={() => document.getElementById('project-image-upload')?.click()}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              {t('projects.uploadScreenshot')}
                            </Button>
                            <input
                              id="project-image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    field.onChange(reader.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      {t('projects.screenshotDescription')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>{t('projects.tags')}</FormLabel>
                <div className="flex gap-2">
                  <Input
                    placeholder={t('projects.addTag')}
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <FormLabel>{t('projects.techStack')}</FormLabel>
                <div className="flex gap-2">
                  <Input
                    placeholder={t('projects.addTech')}
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTech();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTech} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tech?.map((techItem) => (
                    <Badge key={techItem} variant="outline" className="gap-1">
                      {techItem}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTech(techItem)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">{t('projects.featured')}</FormLabel>
                      <FormDescription>
                        {t('projects.featuredDescription')}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter className="flex-shrink-0">
          <Button variant="outline" onClick={onCancel}>
            {t('projects.cancel')}
          </Button>
          <Button onClick={form.handleSubmit(handleSubmit)}>
            {isNew ? t('projects.addNewProject') : t('projects.saveChanges')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
