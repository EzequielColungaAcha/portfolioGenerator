import { Portfolio } from '@/lib/schema';
import { Mail, Phone, MapPin, ExternalLink, Star, Moon, Sun } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getPortfolioTranslation, PortfolioLanguage } from '@/lib/portfolio-i18n';
import { useState } from 'react';

interface MinimalisticLayoutProps {
  portfolio: Portfolio;
}

export function MinimalisticLayout({ portfolio }: MinimalisticLayoutProps) {
  const { careerName, title, presentation, contact, projects, education = [], experience = [], language = 'en', theme } = portfolio;
  const t = (key: Parameters<typeof getPortfolioTranslation>[1]) => getPortfolioTranslation(language as PortfolioLanguage, key);

  const [isDark, setIsDark] = useState(theme.portfolioTheme === 'dark');

  const isLight = !isDark;
  const textAlign = theme.textAlign || 'left';

  const primaryColor = isLight ? (theme.lightPrimary || theme.primary) : theme.primary;
  const accentColor = isLight ? (theme.lightAccent || theme.accent) : theme.accent;
  const backgroundColor = isLight ? (theme.lightBackground || '#ffffff') : theme.background;
  const foregroundColor = isLight ? (theme.lightForeground || '#1f2937') : theme.foreground;

  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const renderIcon = (icon: { kind: string; name?: string; dataUrl?: string }) => {
    if (icon.kind === 'upload' && icon.dataUrl) {
      return (
        <img
          src={icon.dataUrl}
          alt="Project icon"
          className="h-8 w-8 object-contain"
        />
      );
    }

    if (icon.kind === 'builtin' && icon.name) {
      const IconComponent = Icons[icon.name as keyof typeof Icons] as any;
      if (IconComponent) {
        return <IconComponent className="h-8 w-8" style={{ color: primaryColor }} />;
      }
    }

    return <Icons.FileCode className="h-8 w-8" style={{ color: primaryColor }} />;
  };

  return (
    <div
      className="min-h-screen p-4 sm:p-6 lg:p-8 relative"
      style={{
        backgroundColor,
        color: foregroundColor,
        fontSize: `${theme.fontScale}rem`,
      }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsDark(!isDark)}
        className="fixed top-4 right-4 z-50 rounded-full"
        style={{
          backgroundColor,
          borderColor: primaryColor,
          color: foregroundColor,
        }}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>

      <div className={`max-w-7xl mx-auto space-y-8 sm:space-y-12 ${textAlign === 'center' ? 'text-center' : ''}`}>
        <header className="text-center space-y-4 pb-8 border-b" style={{ borderColor: `${foregroundColor}33` }}>
          <div>
            <p className="text-sm uppercase tracking-wider opacity-70">{careerName}</p>
            <h1 className="text-4xl md:text-5xl font-bold mt-2" style={{ color: primaryColor }}>
              {title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm opacity-80">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 hover:opacity-100 transition-opacity"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {contact.phone}
              </span>
            )}
            {contact.location && (
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {contact.location}
              </span>
            )}
          </div>

          {contact.socials.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              {contact.socials.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: accentColor }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </header>

        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: primaryColor }}>
            {t('about')}
          </h2>
          <p className="text-lg leading-relaxed opacity-90 whitespace-pre-wrap">
            {presentation}
          </p>
        </section>

        {experience.length > 0 && (
          <section className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: primaryColor }}>
              {t('experience')}
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: accentColor }}>
                  <h3 className="font-semibold text-lg">{exp.title}</h3>
                  <p className="opacity-80">{exp.company}</p>
                  <p className="text-sm opacity-60 mt-1">
                    {exp.from && new Date(exp.from + '-01').toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short' })}
                    {' - '}
                    {exp.current ? t('present') : (exp.to && new Date(exp.to + '-01').toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short' }))}
                  </p>
                  {exp.description && (
                    <p className="mt-2 opacity-70">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: primaryColor }}>
              {t('education')}
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 pl-4" style={{ borderColor: accentColor }}>
                  <h3 className="font-semibold text-lg">{edu.title}</h3>
                  <p className="opacity-80">{edu.institution}</p>
                  <p className="text-sm opacity-60 mt-1">
                    {edu.from && new Date(edu.from + '-01').toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short' })}
                    {' - '}
                    {edu.current ? t('present') : (edu.to && new Date(edu.to + '-01').toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short' }))}
                  </p>
                  {edu.description && (
                    <p className="mt-2 opacity-70">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: primaryColor }}>
            {t('projects')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project) => (
              <Card
                key={project.id}
                className="group cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                style={{
                  backgroundColor: `${foregroundColor}05`,
                  borderColor: `${foregroundColor}20`,
                }}
                onClick={() => window.open(project.url, '_blank')}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {renderIcon(project.icon)}
                      {project.featured && (
                        <Star className="h-5 w-5 fill-current" style={{ color: accentColor }} />
                      )}
                    </div>
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                    {project.description && (
                      <p className="text-sm opacity-70 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: accentColor,
                        color: accentColor,
                      }}
                    >
                      {project.appType}
                    </Badge>
                  </div>

                  {(project.tags.length > 0 || project.tech.length > 0) && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor: `${primaryColor}20`,
                            color: primaryColor,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <footer className="text-center pt-8 border-t opacity-60 text-sm" style={{ borderColor: `${portfolio.theme.foreground}33` }}>
          <p>Built with Portfolio Generator</p>
        </footer>
      </div>
    </div>
  );
}
