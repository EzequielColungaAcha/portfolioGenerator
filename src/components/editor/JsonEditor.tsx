import { useState, useEffect } from 'react';
import { usePortfolioStore } from '@/lib/store';
import { PortfolioSchema } from '@/lib/schema';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Check } from 'lucide-react';
import { ZodError } from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';

export function JsonEditor() {
  const { portfolio, setPortfolio } = usePortfolioStore();
  const { t } = useLanguage();
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setJsonText(JSON.stringify(portfolio, null, 2));
  }, [portfolio]);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setError(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (e) {
      setError(t('json.errorSyntax'));
    }
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const validated = PortfolioSchema.parse(parsed);
      setPortfolio(validated);
      setError(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (e) {
      if (e instanceof SyntaxError) {
        setError(`${t('json.errorSyntax')}: ${e.message}`);
      } else if (e instanceof ZodError) {
        const errors = e.errors.map(err => `${err.path.join('.')}: ${err.message}`).join('\n');
        setError(`${t('json.errorValidation')}:\n${errors}`);
      } else {
        setError('Unknown error occurred');
      }
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 p-4 sm:p-6 min-h-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
        <div>
          <h3 className="text-lg font-semibold">{t('json.title')}</h3>
          <p className="text-sm text-muted-foreground">
            {t('json.description')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleFormat} size="sm">
            {t('json.format')}
          </Button>
          <Button onClick={handleApply} size="sm">
            {t('json.apply')}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="flex-shrink-0">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="whitespace-pre-wrap font-mono text-xs">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500 text-green-600 flex-shrink-0">
          <Check className="h-4 w-4" />
          <AlertDescription>
            {t('json.success')}
          </AlertDescription>
        </Alert>
      )}

      <Textarea
        value={jsonText}
        onChange={(e) => {
          setJsonText(e.target.value);
          setError(null);
          setSuccess(false);
        }}
        className="flex-1 font-mono text-xs resize-none min-h-0 overflow-y-scroll"
        spellCheck={false}
      />
    </div>
  );
}
