import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePortfolioStore } from '@/lib/store';
import { downloadJSON, downloadHTMLTemplate } from '@/lib/download-utils';
import { useLanguage } from '@/contexts/LanguageContext';

export function DownloadButtons() {
  const portfolio = usePortfolioStore((state) => state.portfolio);
  const { t } = useLanguage();

  const handleDownloadJSON = () => {
    downloadJSON(portfolio, 'portfolio.json');
  };

  const handleDownloadMinimalistic = () => {
    downloadHTMLTemplate('minimalistic', 'index.html');
  };

  const handleDownloadShowcase = () => {
    downloadHTMLTemplate('showcase', 'index.html');
  };

  const handleDownloadBoth = () => {
    downloadJSON(portfolio, 'portfolio.json');
    setTimeout(() => {
      downloadHTMLTemplate(portfolio.theme.layout, 'index.html');
    }, 100);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          {t('download.button')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{t('download.title')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDownloadJSON}>
          {t('download.jsonOnly')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          {t('download.htmlTemplates')}
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={handleDownloadMinimalistic}>
          {t('download.minimalisticTemplate')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownloadShowcase}>
          {t('download.showcaseTemplate')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDownloadBoth}>
          {t('download.complete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
