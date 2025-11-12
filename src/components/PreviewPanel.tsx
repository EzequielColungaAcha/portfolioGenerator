import { usePortfolioStore } from '@/lib/store';
import { PortfolioSchema } from '@/lib/schema';
import { MinimalisticLayout } from './portfolio/MinimalisticLayout';
import { ShowcaseLayout } from './portfolio/ShowcaseLayout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ZodError } from 'zod';

export function PreviewPanel() {
  const portfolio = usePortfolioStore((state) => state.portfolio);

  let validationError: string | null = null;
  try {
    PortfolioSchema.parse(portfolio);
  } catch (e) {
    if (e instanceof ZodError) {
      validationError = e.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
    }
  }

  if (validationError) {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-muted/20">
        <Alert variant="destructive" className="max-w-2xl">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Preview unavailable:</strong> {validationError}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      {portfolio.theme.layout === 'minimalistic' ? (
        <MinimalisticLayout portfolio={portfolio} />
      ) : (
        <ShowcaseLayout portfolio={portfolio} />
      )}
    </ScrollArea>
  );
}
