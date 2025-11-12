import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormEditor } from './editor/FormEditor';
import { JsonEditor } from './editor/JsonEditor';
import { DownloadButtons } from './editor/DownloadButtons';
import { FileJson, FileEdit } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function EditorPanel() {
  const { t } = useLanguage();

  return (
    <div className="h-full min-h-0 flex flex-col border-r bg-card">
      <Tabs defaultValue="form" className="h-full min-h-0 flex flex-col">
        <div className="border-b px-4 pt-4 pb-2 flex-none">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground">Portfolio Editor</h2>
            <DownloadButtons />
          </div>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form" className="gap-2">
              <FileEdit className="h-4 w-4" />
              {t('editor.formEditor')}
            </TabsTrigger>
            <TabsTrigger value="json" className="gap-2">
              <FileJson className="h-4 w-4" />
              {t('editor.jsonEditor')}
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Let the child manage its own scrolling (FormEditor already does) */}
        <TabsContent
          value="form"
          className="flex-1 min-h-0 mt-0 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col"
        >
          <FormEditor />
        </TabsContent>

        {/* If JsonEditor needs scrolling, give it overflow-y-auto or manage inside JsonEditor */}
        <TabsContent
          value="json"
          className="flex-1 min-h-0 mt-0 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col"
        >
          <JsonEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
