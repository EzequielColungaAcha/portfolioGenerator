import { useState } from 'react';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Upload } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const popularIcons = [
  'Database', 'BarChart3', 'PieChart', 'LineChart', 'TrendingUp',
  'Table', 'FileSpreadsheet', 'Sheet', 'Calculator', 'Binary',
  'Code', 'Terminal', 'FileCode', 'GitBranch', 'Braces',
  'Brain', 'Cpu', 'Network', 'Workflow', 'GitGraph',
  'Activity', 'Zap', 'Target', 'Award', 'Briefcase',
  'Server', 'Cloud', 'Layers', 'Box', 'Package'
];

interface IconPickerProps {
  value: { kind: 'builtin' | 'upload'; name?: string; dataUrl?: string };
  onChange: (value: { kind: 'builtin' | 'upload'; name?: string; dataUrl?: string }) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState<'builtin' | 'upload'>(value.kind || 'builtin');
  const { t } = useLanguage();

  const filteredIcons = popularIcons.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const handleIconSelect = (iconName: string) => {
    onChange({ kind: 'builtin', name: iconName });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ kind: 'upload', dataUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const renderCurrentIcon = () => {
    if (value.kind === 'upload' && value.dataUrl) {
      return (
        <img
          src={value.dataUrl}
          alt="Custom icon"
          className="h-6 w-6 object-contain"
        />
      );
    }

    if (value.kind === 'builtin' && value.name) {
      const IconComponent = Icons[value.name as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
      if (IconComponent) {
        return <IconComponent className="h-6 w-6" />;
      }
    }

    return <Icons.Image className="h-6 w-6 text-muted-foreground" />;
  };

  return (
    <div className="space-y-4">
      <RadioGroup value={mode} onValueChange={(v) => setMode(v as 'builtin' | 'upload')}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="builtin" id="builtin" />
          <Label htmlFor="builtin">{t('icon.builtIn')}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="upload" id="upload" />
          <Label htmlFor="upload">{t('icon.upload')}</Label>
        </div>
      </RadioGroup>

      {mode === 'builtin' ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {renderCurrentIcon()}
              <span className="ml-2">{value.name || t('icon.selectIcon')}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-2">
              <Input
                placeholder={t('icon.searchIcons')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ScrollArea className="h-64">
                <div className="grid grid-cols-5 gap-2">
                  {filteredIcons.map((iconName) => {
                    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                    return (
                      <Button
                        key={iconName}
                        variant={value.name === iconName ? 'default' : 'ghost'}
                        className="h-12 w-12 p-2"
                        onClick={() => handleIconSelect(iconName)}
                      >
                        <IconComponent className="h-6 w-6" />
                      </Button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => document.getElementById('icon-upload')?.click()}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {t('icon.uploadIcon')}
            </Button>
            <input
              id="icon-upload"
              type="file"
              accept="image/png,image/svg+xml"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
          {value.kind === 'upload' && value.dataUrl && (
            <div className="flex items-center gap-2 p-2 border rounded">
              <img
                src={value.dataUrl}
                alt="Preview"
                className="h-12 w-12 object-contain"
              />
              <span className="text-sm text-muted-foreground">{t('icon.customUploaded')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
