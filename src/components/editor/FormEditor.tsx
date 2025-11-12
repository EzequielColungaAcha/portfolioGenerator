import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BasicsForm } from './BasicsForm';
import { ContactForm } from './ContactForm';
import { ThemeForm } from './ThemeForm';
import { ProjectsList } from './ProjectsList';
import { EducationList } from './EducationList';
import { ExperienceList } from './ExperienceList';
import { User, Mail, Palette, FolderKanban, GraduationCap, Briefcase } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function FormEditor() {
  const { t } = useLanguage();

  return (
    <Tabs defaultValue="basics" className="h-full min-h-0 flex flex-col">
      <div className="px-2 sm:px-4 pt-2 sm:pt-4 pb-2 border-b flex-shrink-0 overflow-x-auto">
        <TabsList className="inline-flex w-auto min-w-full sm:grid sm:w-full sm:grid-cols-6 h-auto">
          <TabsTrigger value="basics" className="gap-1.5 sm:gap-2 flex-shrink-0 px-3 sm:px-4">
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm whitespace-nowrap">{t('editor.basics')}</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-1.5 sm:gap-2 flex-shrink-0 px-3 sm:px-4">
            <Mail className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm whitespace-nowrap">{t('editor.contact')}</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="gap-1.5 sm:gap-2 flex-shrink-0 px-3 sm:px-4">
            <GraduationCap className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm whitespace-nowrap">{t('editor.education')}</span>
          </TabsTrigger>
          <TabsTrigger value="experience" className="gap-1.5 sm:gap-2 flex-shrink-0 px-3 sm:px-4">
            <Briefcase className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm whitespace-nowrap">{t('editor.experience')}</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="gap-1.5 sm:gap-2 flex-shrink-0 px-3 sm:px-4">
            <FolderKanban className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm whitespace-nowrap">{t('editor.projects')}</span>
          </TabsTrigger>
          <TabsTrigger value="theme" className="gap-1.5 sm:gap-2 flex-shrink-0 px-3 sm:px-4">
            <Palette className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm whitespace-nowrap">{t('editor.theme')}</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="basics" className="flex-1 mt-0 overflow-y-auto min-h-0 [scrollbar-gutter:stable]">
        <div className="p-4 sm:p-6">
          <BasicsForm />
        </div>
      </TabsContent>

      <TabsContent value="contact" className="flex-1 mt-0 overflow-y-auto min-h-0 [scrollbar-gutter:stable]">
        <div className="p-4 sm:p-6">
          <ContactForm />
        </div>
      </TabsContent>

      <TabsContent value="education" className="flex-1 mt-0 overflow-y-auto min-h-0 [scrollbar-gutter:stable]">
        <div className="p-4 sm:p-6">
          <EducationList />
        </div>
      </TabsContent>

      <TabsContent value="experience" className="flex-1 mt-0 overflow-y-auto min-h-0 [scrollbar-gutter:stable]">
        <div className="p-4 sm:p-6">
          <ExperienceList />
        </div>
      </TabsContent>

      <TabsContent value="projects" className="flex-1 mt-0 overflow-y-auto min-h-0 [scrollbar-gutter:stable]">
        <div className="p-4 sm:p-6">
          <ProjectsList />
        </div>
      </TabsContent>

      <TabsContent value="theme" className="flex-1 mt-0 overflow-y-auto min-h-0 [scrollbar-gutter:stable]">
        <div className="p-4 sm:p-6">
          <ThemeForm />
        </div>
      </TabsContent>
    </Tabs>
  );
}

