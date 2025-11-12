import { useState } from 'react';
import { Plus, Star, Pencil, Trash2, GripVertical } from 'lucide-react';
import { usePortfolioStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectEditor } from './ProjectEditor';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Project } from '@/lib/schema';
import { useLanguage } from '@/contexts/LanguageContext';

export function ProjectsList() {
  const { portfolio, addProject, deleteProject } = usePortfolioStore();
  const { t } = useLanguage();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: '',
      description: '',
      url: '',
      appType: 'Dashboard',
      icon: { kind: 'builtin', name: 'BarChart3' },
      tags: [],
      tech: [],
      featured: false,
    };
    setEditingProject(newProject);
    setIsCreating(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
    setDeleteId(null);
  };

  const handleSave = (project: Project) => {
    if (isCreating) {
      addProject(project);
    }
    setEditingProject(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-semibold">Projects</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {portfolio.projects.length} / 24 {t('projects.count')}
          </p>
        </div>
        <Button onClick={handleCreate} disabled={portfolio.projects.length >= 24} className="w-full sm:w-auto" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          <span className="text-sm">{t('projects.addProject')}</span>
        </Button>
      </div>

      <div className="space-y-3 max-h-screen">
        {portfolio.projects.map((project) => (
          <Card key={project.id} className="p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <GripVertical className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground cursor-move mt-1 flex-shrink-0" />

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm sm:text-base truncate">{project.title || t('projects.untitled')}</h4>
                      {project.featured && (
                        <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {project.description || t('projects.noDescription')}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(project)}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(project.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge variant="outline">{project.appType}</Badge>
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {portfolio.projects.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">{t('projects.noProjects')}</p>
          </Card>
        )}
      </div>

      {editingProject && (
        <ProjectEditor
          project={editingProject}
          isNew={isCreating}
          onSave={handleSave}
          onCancel={() => {
            setEditingProject(null);
            setIsCreating(false);
          }}
        />
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('projects.deleteProject')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('projects.deleteConfirm')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('projects.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
              {t('projects.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
