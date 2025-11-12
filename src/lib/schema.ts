import { z } from 'zod';

export const ContactSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  socials: z
    .array(
      z.object({
        label: z.string().min(1, 'Social label is required'),
        url: z.string().url('Invalid social media URL'),
      })
    )
    .default([]),
});

export const ThemeSchema = z.object({
  layout: z.enum(['minimalistic', 'showcase']).default('minimalistic'),
  mode: z.enum(['light', 'dark', 'system']).default('system'),
  primary: z.string().default('#0ea5e9'),
  accent: z.string().default('#22c55e'),
  background: z.string().default('#0b1020'),
  foreground: z.string().default('#e5e7eb'),
  lightPrimary: z.string().default('#0ea5e9'),
  lightAccent: z.string().default('#22c55e'),
  lightBackground: z.string().default('#ffffff'),
  lightForeground: z.string().default('#1f2937'),
  fontScale: z.number().min(0.85).max(1.25).default(1.0),
  density: z.enum(['compact', 'comfortable']).default('comfortable'),
  textAlign: z.enum(['left', 'center']).default('left'),
  portfolioTheme: z.enum(['light', 'dark']).default('dark'),
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z
    .string()
    .max(280, 'Description must be 280 characters or less')
    .optional(),
  url: z.string().url('Invalid project URL'),
  appType: z
    .enum([
      'Notebook',
      'Dashboard',
      'BI Report',
      'SQL',
      'ML Model',
      'API',
      'Other',
    ])
    .default('Dashboard'),
  icon: z.object({
    kind: z.enum(['builtin', 'upload']),
    name: z.string().optional(),
    dataUrl: z.string().optional(),
  }),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  tech: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export const EducationSchema = z.object({
  id: z.string(),
  title: z.string().min(2, 'Title is required'),
  institution: z.string().min(2, 'Institution is required'),
  from: z.string().min(1, 'Start date is required'),
  to: z.string().optional(),
  current: z.boolean().default(false),
  description: z
    .string()
    .max(280, 'Description must be 280 characters or less')
    .optional(),
});

export const ExperienceSchema = z.object({
  id: z.string(),
  title: z.string().min(2, 'Title is required'),
  company: z.string().min(2, 'Company is required'),
  from: z.string().min(1, 'Start date is required'),
  to: z.string().optional(),
  current: z.boolean().default(false),
  description: z
    .string()
    .max(280, 'Description must be 280 characters or less')
    .optional(),
});

export const PortfolioSchema = z.object({
  careerName: z.string().min(1, 'Career name is required'),
  title: z.string().min(1, 'Title is required'),
  presentation: z
    .string()
    .max(1500, 'Presentation must be 1500 characters or less'),
  contact: ContactSchema,
  theme: ThemeSchema,
  projects: z.array(ProjectSchema).max(24, 'Maximum 24 projects allowed'),
  education: z
    .array(EducationSchema)
    .max(10, 'Maximum 10 education entries allowed')
    .default([]),
  experience: z
    .array(ExperienceSchema)
    .max(20, 'Maximum 20 experience entries allowed')
    .default([]),
  language: z.enum(['en', 'es']).default('en'),
});

export type Contact = z.infer<typeof ContactSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Portfolio = z.infer<typeof PortfolioSchema>;

export const DEFAULT_PORTFOLIO: Portfolio = {
  careerName: 'Data Analyst',
  title: 'Data-driven insights that move the needle',
  presentation:
    "Hi, I'm Ezequiel. I specialize in SQL, Python, and dashboarding. I love transforming messy data into clear stories.",
  contact: {
    email: 'ezequiel.ca@example.com',
    phone: '',
    location: 'Buenos Aires, AR',
    website: 'https://google.com',
    socials: [
      { label: 'LinkedIn', url: 'www.linkedin.com/in/ezequiel-colunga-acha' },
      { label: 'GitHub', url: 'https://github.com/EzequielColungaAcha' },
      { label: 'Kaggle', url: 'https://www.kaggle.com/ezequielcolungaacha' },
    ],
  },
  theme: {
    layout: 'minimalistic',
    mode: 'system',
    primary: '#0ea5e9',
    accent: '#22c55e',
    background: '#0b1020',
    foreground: '#e5e7eb',
    lightPrimary: '#0ea5e9',
    lightAccent: '#22c55e',
    lightBackground: '#ffffff',
    lightForeground: '#1f2937',
    fontScale: 1.0,
    density: 'comfortable',
    textAlign: 'left',
    portfolioTheme: 'dark',
  },
  projects: [
    {
      id: 'sales-insights',
      title: 'Sales Insights Dashboard',
      description:
        'Power BI dashboard tracking weekly revenue, retention, and product mix.',
      url: 'https://example.com/sales-dashboard',
      appType: 'Dashboard',
      icon: { kind: 'builtin', name: 'BarChart3' },
      tags: ['BI', 'DAX'],
      tech: ['Power BI', 'SQL', 'DAX'],
      featured: true,
    },
    {
      id: 'churn-model',
      title: 'Customer Churn Model',
      description: 'XGBoost model and explainer notebook.',
      url: 'https://example.com/churn-notebook',
      appType: 'ML Model',
      icon: { kind: 'builtin', name: 'Brain' },
      tags: ['ML', 'Churn'],
      tech: ['Python', 'XGBoost', 'SHAP'],
      featured: false,
    },
  ],
  education: [],
  experience: [],
  language: 'en',
};
