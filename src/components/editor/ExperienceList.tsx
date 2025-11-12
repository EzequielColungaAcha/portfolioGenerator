import { Plus, Briefcase, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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
import { usePortfolioStore } from '@/lib/store';
import { Experience } from '@/lib/schema';
import { useLanguage } from '@/contexts/LanguageContext';

export function ExperienceList() {
  const { t } = useLanguage();
  const experience = usePortfolioStore((state) => state.portfolio.experience || []);
  const addExperience = usePortfolioStore((state) => state.addExperience);
  const updateExperience = usePortfolioStore((state) => state.updateExperience);
  const deleteExperience = usePortfolioStore((state) => state.deleteExperience);

  const handleAdd = () => {
    const newExperience: Experience = {
      id: `exp-${Date.now()}`,
      title: '',
      company: '',
      from: '',
      to: '',
      current: false,
      description: '',
    };
    addExperience(newExperience);
  };

  const handleUpdate = (id: string, data: Partial<Experience>) => {
    updateExperience(id, data);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 flex-shrink-0" />
          <h3 className="font-semibold text-base sm:text-lg">{t('experience.title')}</h3>
          <span className="text-xs sm:text-sm text-muted-foreground">
            ({experience.length})
          </span>
        </div>
        <Button onClick={handleAdd} size="sm" variant="outline" className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          <span className="text-sm">{t('experience.add')}</span>
        </Button>
      </div>

      {experience.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>{t('experience.empty')}</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {experience.map((exp) => (
            <Card key={exp.id} className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{t('experience.position')}</Label>
                    <Input
                      value={exp.title}
                      onChange={(e) => handleUpdate(exp.id, { title: e.target.value })}
                      placeholder={t('experience.positionPlaceholder')}
                    />
                  </div>
                  <div>
                    <Label>{t('experience.company')}</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => handleUpdate(exp.id, { company: e.target.value })}
                      placeholder={t('experience.companyPlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">{t('experience.from')}</Label>
                    <Input
                      type="month"
                      value={exp.from}
                      onChange={(e) => handleUpdate(exp.id, { from: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">{t('experience.to')}</Label>
                    <Input
                      type="month"
                      value={exp.to}
                      onChange={(e) => handleUpdate(exp.id, { to: e.target.value })}
                      disabled={exp.current}
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onCheckedChange={(checked) =>
                      handleUpdate(exp.id, { current: checked as boolean, to: checked ? '' : exp.to })
                    }
                  />
                  <label
                    htmlFor={`current-${exp.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t('experience.current')}
                  </label>
                </div>

                <div>
                  <Label>{t('experience.description')}</Label>
                  <Textarea
                    value={exp.description || ''}
                    onChange={(e) => handleUpdate(exp.id, { description: e.target.value })}
                    placeholder={t('experience.descriptionPlaceholder')}
                    rows={2}
                  />
                </div>

                <div className="flex justify-end">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t('experience.delete')}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('experience.deleteConfirmTitle')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('experience.deleteConfirm')}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('experience.cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteExperience(exp.id)}>
                          {t('experience.delete')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
