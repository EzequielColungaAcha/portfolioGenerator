export const portfolioTranslations = {
  en: {
    about: 'About',
    aboutMe: 'About Me',
    featured: 'Featured',
    allProjects: 'All Projects',
    projects: 'Projects',
    viewProject: 'View Project',
    education: 'Education',
    experience: 'Experience',
    present: 'Present',
    contact: 'Contact',
    skills: 'Skills & Technologies',
    noProjects: 'No projects to display',
  },
  es: {
    about: 'Acerca de',
    aboutMe: 'Sobre Mí',
    featured: 'Destacado',
    allProjects: 'Todos los Proyectos',
    projects: 'Proyectos',
    viewProject: 'Ver Proyecto',
    education: 'Educación',
    experience: 'Experiencia',
    present: 'Presente',
    contact: 'Contacto',
    skills: 'Habilidades y Tecnologías',
    noProjects: 'No hay proyectos para mostrar',
  },
};

export type PortfolioLanguage = 'en' | 'es';

export function getPortfolioTranslation(lang: PortfolioLanguage, key: keyof typeof portfolioTranslations.en): string {
  return portfolioTranslations[lang][key];
}
