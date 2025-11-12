import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Portfolio, PortfolioSchema, Project, Education, Experience, DEFAULT_PORTFOLIO } from './schema';

interface PortfolioState {
  portfolio: Portfolio;
  setPortfolio: (portfolio: Portfolio) => void;
  updateBasics: (data: Partial<Pick<Portfolio, 'careerName' | 'title' | 'presentation'>>) => void;
  updateContact: (data: Partial<Portfolio['contact']>) => void;
  updateTheme: (data: Partial<Portfolio['theme']>) => void;
  updateLanguage: (language: 'en' | 'es') => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (projects: Project[]) => void;
  addEducation: (education: Education) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  importPortfolio: (json: string) => { success: boolean; error?: string };
  exportPortfolio: () => string;
  resetPortfolio: () => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      portfolio: DEFAULT_PORTFOLIO,

      setPortfolio: (portfolio) => set({ portfolio }),

      updateBasics: (data) => set((state) => ({
        portfolio: { ...state.portfolio, ...data }
      })),

      updateContact: (data) => set((state) => ({
        portfolio: {
          ...state.portfolio,
          contact: { ...state.portfolio.contact, ...data }
        }
      })),

      updateTheme: (data) => set((state) => ({
        portfolio: {
          ...state.portfolio,
          theme: { ...state.portfolio.theme, ...data }
        }
      })),

      updateLanguage: (language) => set((state) => ({
        portfolio: {
          ...state.portfolio,
          language
        }
      })),

      addProject: (project) => set((state) => ({
        portfolio: {
          ...state.portfolio,
          projects: [...state.portfolio.projects, project]
        }
      })),

      updateProject: (id, projectData) => set((state) => ({
        portfolio: {
          ...state.portfolio,
          projects: state.portfolio.projects.map((p) =>
            p.id === id ? { ...p, ...projectData } : p
          )
        }
      })),

      deleteProject: (id) => set((state) => ({
        portfolio: {
          ...state.portfolio,
          projects: state.portfolio.projects.filter((p) => p.id !== id)
        }
      })),

      reorderProjects: (projects) => set((state) => ({
        portfolio: { ...state.portfolio, projects }
      })),

      addEducation: (education) => set((state) => ({
        portfolio: {
          ...state.portfolio,
          education: [...(state.portfolio.education || []), education]
        }
      })),

      updateEducation: (id, educationData) => set((state) => ({
        portfolio: {
          ...state.portfolio,
          education: (state.portfolio.education || []).map((e) =>
            e.id === id ? { ...e, ...educationData } : e
          )
        }
      })),

      deleteEducation: (id) => set((state) => ({
        portfolio: {
          ...state.portfolio,
          education: (state.portfolio.education || []).filter((e) => e.id !== id)
        }
      })),

      addExperience: (experience) => set((state) => ({
        portfolio: {
          ...state.portfolio,
          experience: [...(state.portfolio.experience || []), experience]
        }
      })),

      updateExperience: (id, experienceData) => set((state) => ({
        portfolio: {
          ...state.portfolio,
          experience: (state.portfolio.experience || []).map((e) =>
            e.id === id ? { ...e, ...experienceData } : e
          )
        }
      })),

      deleteExperience: (id) => set((state) => ({
        portfolio: {
          ...state.portfolio,
          experience: (state.portfolio.experience || []).filter((e) => e.id !== id)
        }
      })),

      importPortfolio: (json) => {
        try {
          const parsed = JSON.parse(json);
          const validated = PortfolioSchema.parse(parsed);
          set({ portfolio: validated });
          return { success: true };
        } catch (error) {
          if (error instanceof SyntaxError) {
            return { success: false, error: `Invalid JSON: ${error.message}` };
          }
          if (error instanceof Error) {
            return { success: false, error: `Validation error: ${error.message}` };
          }
          return { success: false, error: 'Unknown error occurred' };
        }
      },

      exportPortfolio: () => {
        const { portfolio } = get();
        return JSON.stringify(portfolio, null, 2);
      },

      resetPortfolio: () => set({ portfolio: DEFAULT_PORTFOLIO }),
    }),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({ portfolio: state.portfolio }),
      onRehydrateStorage: () => (state) => {
        if (state && state.portfolio) {
          if (!state.portfolio.education) {
            state.portfolio.education = [];
          }
          if (!state.portfolio.experience) {
            state.portfolio.experience = [];
          }
          if (!state.portfolio.language) {
            state.portfolio.language = "en";
          }
          if (!state.portfolio.theme.textAlign) {
            state.portfolio.theme.textAlign = "left";
          }
          if (!state.portfolio.theme.portfolioTheme) {
            state.portfolio.theme.portfolioTheme = "dark";
          }
          if (!state.portfolio.theme.lightBackground) {
            state.portfolio.theme.lightBackground = "#ffffff";
          }
          if (!state.portfolio.theme.lightForeground) {
            state.portfolio.theme.lightForeground = "#1f2937";
          }
          if (!state.portfolio.theme.lightPrimary) {
            state.portfolio.theme.lightPrimary = "#0ea5e9";
          }
          if (!state.portfolio.theme.lightAccent) {
            state.portfolio.theme.lightAccent = "#22c55e";
          }
        }
      },
    }
  )
);

let debounceTimer: NodeJS.Timeout;

export function useDebouncedSave() {
  const portfolio = usePortfolioStore((state) => state.portfolio);

  if (typeof window !== 'undefined') {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      localStorage.setItem('portfolio-storage', JSON.stringify({
        state: { portfolio },
        version: 0
      }));
    }, 500);
  }
}
