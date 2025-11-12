import { Portfolio } from '@/lib/schema';
import { Mail, Phone, MapPin, ExternalLink, Star, ArrowRight, Briefcase, GraduationCap, Moon, Sun } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getPortfolioTranslation, PortfolioLanguage } from '@/lib/portfolio-i18n';
import { useState } from 'react';

interface ShowcaseLayoutProps {
  portfolio: Portfolio;
}

export function ShowcaseLayout({ portfolio }: ShowcaseLayoutProps) {
  const { careerName, title, presentation, contact, projects, education = [], experience = [], language = 'en', theme } = portfolio;
  const t = (key: Parameters<typeof getPortfolioTranslation>[1]) => getPortfolioTranslation(language as PortfolioLanguage, key);

  const [isDark, setIsDark] = useState(theme.portfolioTheme === 'dark');

  const isLight = !isDark;
  const textAlign = theme.textAlign || 'left';

  const primaryColor = isLight ? (theme.lightPrimary || theme.primary) : theme.primary;
  const accentColor = isLight ? (theme.lightAccent || theme.accent) : theme.accent;
  const backgroundColor = isLight ? (theme.lightBackground || '#ffffff') : theme.background;
  const foregroundColor = isLight ? (theme.lightForeground || '#1f2937') : theme.foreground;

  const featuredProjects = projects.filter(p => p.featured);
  const regularProjects = projects.filter(p => !p.featured);

  const renderIcon = (icon: { kind: string; name?: string; dataUrl?: string }, size: string = 'h-10 w-10') => {
    if (icon.kind === 'upload' && icon.dataUrl) {
      return (
        <img
          src={icon.dataUrl}
          alt="Project icon"
          className={`${size} object-contain`}
        />
      );
    }

    if (icon.kind === 'builtin' && icon.name) {
      const IconComponent = Icons[icon.name as keyof typeof Icons] as any;
      if (IconComponent) {
        return <IconComponent className={size} style={{ color: primaryColor }} />;
      }
    }

    return <Icons.FileCode className={size} style={{ color: primaryColor }} />;
  };

  return (
    <div
      className={`min-h-screen relative ${textAlign === 'center' ? 'text-center' : ''}`}
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

      <div
        className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background: `linear-gradient(135deg, ${backgroundColor} 0%, ${primaryColor}15 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <div>
              <Badge
                className="mb-4 text-sm px-4 py-1"
                style={{
                  backgroundColor: `${accentColor}20`,
                  color: accentColor,
                  borderColor: accentColor,
                }}
              >
                {careerName}
              </Badge>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                style={{ color: primaryColor }}
              >
                {title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  style={{ color: accentColor }}
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <span className="flex items-center gap-2 opacity-80">
                  <Phone className="h-4 w-4" />
                  {contact.phone}
                </span>
              )}
              {contact.location && (
                <span className="flex items-center gap-2 opacity-80">
                  <MapPin className="h-4 w-4" />
                  {contact.location}
                </span>
              )}
            </div>

            {contact.socials.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-6">
                {contact.socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 hover:underline"
                    style={{ color: accentColor }}
                  >
                    {social.label}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12 sm:space-y-16">
        <section>
          <div
            className="p-8 rounded-lg"
            style={{
              backgroundColor: `${primaryColor}10`,
              borderLeft: `4px solid ${primaryColor}`,
            }}
          >
            <h2 className="text-2xl font-semibold mb-4" style={{ color: primaryColor }}>
              {t('aboutMe')}
            </h2>
            <p className="text-lg leading-relaxed opacity-90 whitespace-pre-wrap">
              {presentation}
            </p>
          </div>
        </section>

        {experience.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8" style={{ color: primaryColor }}>
              {t('experience')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experience.map((exp) => (
                <Card
                  key={exp.id}
                  className="p-6"
                  style={{
                    backgroundColor: `${foregroundColor}05`,
                    borderColor: `${foregroundColor}20`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-6 w-6 mt-1" style={{ color: accentColor }} />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{exp.title}</h3>
                      <p className="opacity-80">{exp.company}</p>
                      <p className="text-sm opacity-60 mt-1">
                        {exp.from && new Date(exp.from + '-01').toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short' })}
                        {' - '}
                        {exp.current ? t('present') : (exp.to && new Date(exp.to + '-01').toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short' }))}
                      </p>
                      {exp.description && (
                        <p className="mt-3 opacity-70">{exp.description}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8" style={{ color: primaryColor }}>
              {t('education')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <Card
                  key={edu.id}
                  className="p-6"
                  style={{
                    backgroundColor: `${foregroundColor}05`,
                    borderColor: `${foregroundColor}20`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-6 w-6 mt-1" style={{ color: accentColor }} />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{edu.title}</h3>
                      <p className="opacity-80">{edu.institution}</p>
                      <p className="text-sm opacity-60 mt-1">
                        {edu.from && new Date(edu.from + '-01').toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short' })}
                        {' - '}
                        {edu.current ? t('present') : (edu.to && new Date(edu.to + '-01').toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short' }))}
                      </p>
                      {edu.description && (
                        <p className="mt-3 opacity-70">{edu.description}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {featuredProjects.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Star className="h-6 w-6 fill-current" style={{ color: accentColor }} />
              <h2 className="text-3xl font-bold" style={{ color: primaryColor }}>
                {t('featured')} {t('projects')}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group cursor-pointer transition-all hover:shadow-2xl overflow-hidden"
                  style={{
                    backgroundColor: `${foregroundColor}08`,
                    borderColor: accentColor,
                    borderWidth: '2px',
                  }}
                  onClick={() => window.open(project.url, '_blank')}
                >
                  {project.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {renderIcon(project.icon, 'h-12 w-12')}
                        <div>
                          <h3 className="font-bold text-xl">{project.title}</h3>
                          <Badge variant="outline" style={{ color: accentColor, borderColor: accentColor }}>
                            {project.appType}
                          </Badge>
                        </div>
                      </div>
                      <ExternalLink className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {project.description && (
                      <p className="text-base opacity-80">{project.description}</p>
                    )}

                    {project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full font-medium"
                            style={{
                              backgroundColor: `${accentColor}20`,
                              color: accentColor,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded"
                            style={{
                              backgroundColor: `${primaryColor}15`,
                              color: foregroundColor,
                              opacity: 0.7,
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {regularProjects.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8" style={{ color: primaryColor }}>
              {t('allProjects')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                  style={{
                    backgroundColor: `${foregroundColor}05`,
                    borderColor: `${foregroundColor}20`,
                  }}
                  onClick={() => window.open(project.url, '_blank')}
                >
                  {project.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        {renderIcon(project.icon, 'h-8 w-8')}
                      </div>
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                      {project.description && (
                        <p className="text-sm opacity-70 line-clamp-2">{project.description}</p>
                      )}
                    </div>

                    <Badge
                      variant="outline"
                      className="text-xs"
                      style={{ borderColor: accentColor, color: accentColor }}
                    >
                      {project.appType}
                    </Badge>

                    {project.tags.length > 0 && (
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
        )}

        <footer className="text-center pt-12 border-t opacity-50" style={{ borderColor: `${foregroundColor}20` }}>
          <p className="text-sm">Crafted with Portfolio Generator</p>
        </footer>
      </div>
    </div>
  );
}
