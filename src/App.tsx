import { AppShell } from './components/AppShell';
import { EditorPanel } from './components/EditorPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/toaster';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Edit, Eye } from 'lucide-react';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppShell>
          <div className="h-full hidden lg:grid lg:grid-cols-2">
            <EditorPanel />
            <PreviewPanel />
          </div>

          <div className="h-full lg:hidden">
            <Tabs defaultValue="editor" className="h-full flex flex-col">
              <TabsList className="w-full grid grid-cols-2 rounded-none">
                <TabsTrigger value="editor" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </TabsTrigger>
              </TabsList>
              <TabsContent value="editor" className="flex-1 mt-0 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
                <EditorPanel />
              </TabsContent>
              <TabsContent value="preview" className="flex-1 mt-0 overflow-hidden">
                <PreviewPanel />
              </TabsContent>
            </Tabs>
          </div>
        </AppShell>
        <Toaster />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
