import { Plus, GraduationCap, Trash2 } from 'lucide-react';
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
import { Education } from '@/lib/schema';
import { useLanguage } from '@/contexts/LanguageContext';

export function EducationList() {
  const { t } = useLanguage();
  const education = usePortfolioStore((state) => state.portfolio.education || []);
  const addEducation = usePortfolioStore((state) => state.addEducation);
  const updateEducation = usePortfolioStore((state) => state.updateEducation);
  const deleteEducation = usePortfolioStore((state) => state.deleteEducation);

  const handleAdd = () => {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      title: '',
      institution: '',
      from: '',
      to: '',
      current: false,
      description: '',
    };
    addEducation(newEducation);
  };

  const handleUpdate = (id: string, data: Partial<Education>) => {
    updateEducation(id, data);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 flex-shrink-0" />
          <h3 className="font-semibold text-base sm:text-lg">{t('education.title')}</h3>
          <span className="text-xs sm:text-sm text-muted-foreground">
            ({education.length})
          </span>
        </div>
        <Button onClick={handleAdd} size="sm" variant="outline" className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          <span className="text-sm">{t('education.add')}</span>
        </Button>
      </div>

      {education.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>{t('education.empty')}</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {education.map((edu) => (
            <Card key={edu.id} className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{t('education.degree')}</Label>
                    <Input
                      value={edu.title}
                      onChange={(e) => handleUpdate(edu.id, { title: e.target.value })}
                      placeholder={t('education.degreePlaceholder')}
                    />
                  </div>
                  <div>
                    <Label>{t('education.institution')}</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => handleUpdate(edu.id, { institution: e.target.value })}
                      placeholder={t('education.institutionPlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">{t('education.from')}</Label>
                    <Input
                      type="month"
                      value={edu.from}
                      onChange={(e) => handleUpdate(edu.id, { from: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">{t('education.to')}</Label>
                    <Input
                      type="month"
                      value={edu.to}
                      onChange={(e) => handleUpdate(edu.id, { to: e.target.value })}
                      disabled={edu.current}
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${edu.id}`}
                    checked={edu.current}
                    onCheckedChange={(checked) =>
                      handleUpdate(edu.id, { current: checked as boolean, to: checked ? '' : edu.to })
                    }
                  />
                  <label
                    htmlFor={`current-${edu.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t('education.current')}
                  </label>
                </div>

                <div>
                  <Label>{t('education.description')}</Label>
                  <Textarea
                    value={edu.description || ''}
                    onChange={(e) => handleUpdate(edu.id, { description: e.target.value })}
                    placeholder={t('education.descriptionPlaceholder')}
                    rows={2}
                  />
                </div>

                <div className="flex justify-end">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t('education.delete')}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('education.deleteConfirmTitle')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('education.deleteConfirm')}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('education.cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteEducation(edu.id)}>
                          {t('education.delete')}
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
