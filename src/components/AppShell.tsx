import { Download, Upload, RotateCcw, HelpCircle, Layout, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePortfolioStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const { importPortfolio, exportPortfolio, resetPortfolio, portfolio, updateTheme } = usePortfolioStore();
  const { language, setLanguage, t } = useLanguage();

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const text = await file.text();
      const result = importPortfolio(text);

      if (result.success) {
        toast({
          title: t('toast.importSuccess'),
          description: t('toast.importSuccessDesc'),
        });
      } else {
        toast({
          title: t('toast.importFailed'),
          description: result.error,
          variant: 'destructive',
        });
      }
    };
    input.click();
  };

  const handleExport = () => {
    const json = exportPortfolio();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.json';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: t('toast.exportSuccess'),
      description: t('toast.exportSuccessDesc'),
    });
  };

  const handleReset = () => {
    resetPortfolio();
    toast({
      title: t('toast.resetSuccess'),
      description: t('toast.resetSuccessDesc'),
    });
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="w-full px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Layout className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
              <h1 className="text-base sm:text-xl font-semibold truncate">{t('app.title')}</h1>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <ToggleGroup
                type="single"
                value={portfolio.theme.layout}
                onValueChange={(value) => {
                  if (value) updateTheme({ layout: value as 'minimalistic' | 'showcase' });
                }}
                className="border rounded-md hidden sm:flex"
              >
                <ToggleGroupItem value="minimalistic" aria-label="Minimalistic layout" className="text-xs">
                  {t('nav.minimalistic')}
                </ToggleGroupItem>
                <ToggleGroupItem value="showcase" aria-label="Showcase layout" className="text-xs">
                  {t('nav.showcase')}
                </ToggleGroupItem>
              </ToggleGroup>

              <Button variant="outline" size="sm" onClick={handleImport} className="hidden sm:flex">
                <Upload className="h-4 w-4 mr-2" />
                {t('nav.import')}
              </Button>
              <Button variant="outline" size="sm" onClick={handleImport} className="sm:hidden">
                <Upload className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="sm" onClick={handleExport} className="hidden sm:flex">
                <Download className="h-4 w-4 mr-2" />
                {t('nav.export')}
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport} className="sm:hidden">
                <Download className="h-4 w-4" />
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {t('nav.reset')}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('dialog.resetTitle')}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('dialog.resetDescription')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('projects.cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset}>{t('nav.reset')}</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Languages className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage('en')}>
                    English {language === 'en' && '✓'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('es')}>
                    Español {language === 'es' && '✓'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{t('dialog.helpTitle')}</DialogTitle>
                    <DialogDescription>
                      {t('dialog.helpDescription')}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h3 className="font-semibold mb-2">{t('dialog.gettingStarted')}</h3>
                      <p className="text-muted-foreground">
                        {t('dialog.gettingStartedText')}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{t('dialog.layoutVariants')}</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {t('dialog.layoutVariantsText')}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{t('dialog.projectsHelp')}</h3>
                      <p className="text-muted-foreground">
                        {t('dialog.projectsHelpText')}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{t('dialog.importExportHelp')}</h3>
                      <p className="text-muted-foreground">
                        {t('dialog.importExportHelpText')}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
