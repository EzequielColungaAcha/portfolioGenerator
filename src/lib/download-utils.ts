import { Portfolio } from './schema';

export function downloadJSON(data: Portfolio, filename: string = 'portfolio.json') {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateHTMLTemplate(layout: 'minimalistic' | 'showcase'): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .card {
      border-radius: 0.5rem;
      border: 1px solid;
      transition: all 0.3s;
    }

    .card:hover {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .badge {
      display: inline-flex;
      align-items: center;
      border-radius: 9999px;
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      border: 1px solid;
    }

    .line-clamp-2 {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  </style>
</head>
<body>
  <div id="portfolio-root"></div>

  <script>
    async function loadPortfolio() {
      try {
        const response = await fetch('portfolio.json');
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const data = await response.json();
        console.log('Portfolio data loaded:', data);
        renderPortfolio(data);
        lucide.createIcons();
      } catch (error) {
        console.error('Error loading portfolio:', error);
        document.getElementById('portfolio-root').innerHTML =
          '<div class="min-h-screen flex items-center justify-center p-6"><div class="text-center"><p class="text-red-500 text-xl mb-2">Error loading portfolio data</p><p class="text-gray-600">Make sure portfolio.json is in the same directory as this HTML file.</p><p class="text-sm text-gray-500 mt-4">Error details: ' + error.message + '</p></div></div>';
      }
    }

    function renderPortfolio(data) {
      const root = document.getElementById('portfolio-root');
      const layout = '${layout}';

      if (layout === 'minimalistic') {
        root.innerHTML = renderMinimalisticLayout(data);
      } else {
        root.innerHTML = renderShowcaseLayout(data);
      }

      lucide.createIcons();
    }

    function renderIcon(icon) {
      if (icon.kind === 'upload' && icon.dataUrl) {
        return \`<img src="\${icon.dataUrl}" alt="Project icon" class="h-8 w-8 object-contain">\`;
      }

      if (icon.kind === 'builtin' && icon.name) {
        const iconName = icon.name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
        return \`<i data-lucide="\${iconName}" class="h-8 w-8"></i>\`;
      }

      return '<i data-lucide="file-code" class="h-8 w-8"></i>';
    }

    function renderMinimalisticLayout(data) {
      const { careerName, title, presentation, contact, theme, projects } = data;

      const sortedProjects = [...projects].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });

      return \`
        <div class="min-h-screen p-4 sm:p-6 lg:p-8" style="background-color: \${theme.background}; color: \${theme.foreground}; font-size: \${theme.fontScale}rem;">
          <div class="max-w-7xl mx-auto space-y-8 sm:space-y-12">

            <header class="text-center space-y-4 pb-8 border-b" style="border-color: \${theme.foreground}33;">
              <div>
                <p class="text-sm uppercase tracking-wider opacity-70">\${careerName}</p>
                <h1 class="text-4xl md:text-5xl font-bold mt-2" style="color: \${theme.primary};">
                  \${title}
                </h1>
              </div>

              <div class="flex flex-wrap items-center justify-center gap-4 text-sm opacity-80">
                \${contact.email ? \`
                  <a href="mailto:\${contact.email}" class="flex items-center gap-2 hover:opacity-100 transition-opacity">
                    <i data-lucide="mail" class="h-4 w-4"></i>
                    \${contact.email}
                  </a>
                \` : ''}
                \${contact.phone ? \`
                  <span class="flex items-center gap-2">
                    <i data-lucide="phone" class="h-4 w-4"></i>
                    \${contact.phone}
                  </span>
                \` : ''}
                \${contact.location ? \`
                  <span class="flex items-center gap-2">
                    <i data-lucide="map-pin" class="h-4 w-4"></i>
                    \${contact.location}
                  </span>
                \` : ''}
              </div>

              \${contact.socials?.length ? \`
                <div class="flex flex-wrap items-center justify-center gap-4 text-sm">
                  \${contact.socials.map(social => \`
                    <a href="\${social.url}" target="_blank" rel="noopener noreferrer" class="hover:underline" style="color: \${theme.accent};">
                      \${social.label}
                    </a>
                  \`).join('')}
                </div>
              \` : ''}
            </header>

            <section class="max-w-3xl mx-auto">
              <h2 class="text-2xl font-semibold mb-4" style="color: \${theme.primary};">About</h2>
              <p class="text-lg leading-relaxed opacity-90 whitespace-pre-wrap">\${presentation}</p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold mb-6" style="color: \${theme.primary};">Projects</h2>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                \${sortedProjects.map(project => \`
                  <div class="card group cursor-pointer hover:scale-105"
                       style="background-color: \${theme.foreground}0d; border-color: \${theme.foreground}33;"
                       onclick="window.open('\${project.url}', '_blank')">
                    <div class="p-6 space-y-4">
                      <div class="flex items-start justify-between gap-2">
                        <div class="flex items-center gap-3" style="color: \${theme.primary};">
                          \${renderIcon(project.icon)}
                          \${project.featured ? \`<i data-lucide="star" class="h-5 w-5 fill-current" style="color: \${theme.accent};"></i>\` : ''}
                        </div>
                        <i data-lucide="external-link" class="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                      </div>

                      <div>
                        <h3 class="font-semibold text-lg mb-1">\${project.title}</h3>
                        \${project.description ? \`<p class="text-sm opacity-70 line-clamp-2">\${project.description}</p>\` : ''}
                      </div>

                      <div>
                        <span class="badge" style="border-color: \${theme.accent}; color: \${theme.accent};">
                          \${project.appType}
                        </span>
                      </div>

                      \${project.tags?.length || project.tech?.length ? \`
                        <div class="flex flex-wrap gap-2">
                          \${(project.tags || []).slice(0, 3).map(tag => \`
                            <span class="text-xs px-2 py-1 rounded" style="background-color: \${theme.primary}33; color: \${theme.primary};">
                              \${tag}
                            </span>
                          \`).join('')}
                        </div>
                      \` : ''}
                    </div>
                  </div>
                \`).join('')}
              </div>
            </section>

            <footer class="text-center pt-8 border-t opacity-60 text-sm" style="border-color: \${theme.foreground}33;">
              <p>Built with Portfolio Generator</p>
            </footer>
          </div>
        </div>
      \`;
    }

    function renderShowcaseLayout(data) {
      const { careerName, title, presentation, contact, theme, projects } = data;

      const featuredProjects = projects.filter(p => p.featured);
      const regularProjects = projects.filter(p => !p.featured);

      return \`
        <div class="min-h-screen" style="background-color: \${theme.background}; color: \${theme.foreground}; font-size: \${theme.fontScale}rem;">

          <div class="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
               style="background: linear-gradient(135deg, \${theme.background} 0%, \${theme.primary}26 100%);">
            <div class="max-w-7xl mx-auto">
              <div class="text-center space-y-6">
                <div>
                  <span class="badge mb-4 inline-block text-sm px-4 py-1"
                        style="background-color: \${theme.accent}33; color: \${theme.accent}; border-color: \${theme.accent};">
                    \${careerName}
                  </span>
                  <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight" style="color: \${theme.primary};">
                    \${title}
                  </h1>
                </div>

                <div class="flex flex-wrap items-center justify-center gap-6 text-sm">
                  \${contact.email ? \`
                    <a href="mailto:\${contact.email}" class="flex items-center gap-2 hover:opacity-80 transition-opacity" style="color: \${theme.accent};">
                      <i data-lucide="mail" class="h-4 w-4"></i>
                      \${contact.email}
                    </a>
                  \` : ''}
                  \${contact.phone ? \`
                    <span class="flex items-center gap-2 opacity-80">
                      <i data-lucide="phone" class="h-4 w-4"></i>
                      \${contact.phone}
                    </span>
                  \` : ''}
                  \${contact.location ? \`
                    <span class="flex items-center gap-2 opacity-80">
                      <i data-lucide="map-pin" class="h-4 w-4"></i>
                      \${contact.location}
                    </span>
                  \` : ''}
                </div>

                \${contact.socials?.length ? \`
                  <div class="flex flex-wrap items-center justify-center gap-6">
                    \${contact.socials.map(social => \`
                      <a href="\${social.url}" target="_blank" rel="noopener noreferrer"
                         class="group flex items-center gap-2 hover:underline" style="color: \${theme.accent};">
                        \${social.label}
                        <i data-lucide="arrow-right" class="h-4 w-4"></i>
                      </a>
                    \`).join('')}
                  </div>
                \` : ''}
              </div>
            </div>
          </div>

          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12 sm:space-y-16">

            <section>
              <div class="p-8 rounded-lg" style="background-color: \${theme.primary}1a; border-left: 4px solid \${theme.primary};">
                <h2 class="text-2xl font-semibold mb-4" style="color: \${theme.primary};">About Me</h2>
                <p class="text-lg leading-relaxed opacity-90 whitespace-pre-wrap">\${presentation}</p>
              </div>
            </section>

            \${featuredProjects.length ? \`
              <section>
                <div class="flex items-center gap-3 mb-8">
                  <i data-lucide="star" class="h-6 w-6 fill-current" style="color: \${theme.accent};"></i>
                  <h2 class="text-3xl font-bold" style="color: \${theme.primary};">Featured Projects</h2>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  \${featuredProjects.map(project => \`
                    <div class="card group cursor-pointer overflow-hidden"
                         style="background-color: \${theme.foreground}14; border-color: \${theme.accent}; border-width: 2px;"
                         onclick="window.open('\${project.url}', '_blank')">
                      \${project.image ? \`
                        <div class="aspect-video overflow-hidden">
                          <img src="\${project.image}" alt="\${project.title}"
                               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                        </div>
                      \` : ''}
                      <div class="p-6 space-y-4">
                        <div class="flex items-start justify-between gap-4">
                          <div class="flex items-center gap-4">
                            <div style="color: \${theme.primary};">
                              \${renderIcon(project.icon)}
                            </div>
                            <div>
                              <h3 class="font-bold text-xl">\${project.title}</h3>
                              <span class="badge" style="color: \${theme.accent}; border-color: \${theme.accent};">
                                \${project.appType}
                              </span>
                            </div>
                          </div>
                          <i data-lucide="external-link" class="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </div>

                        \${project.description ? \`<p class="text-base opacity-80">\${project.description}</p>\` : ''}

                        \${project.tech?.length ? \`
                          <div class="flex flex-wrap gap-2">
                            \${project.tech.map(tech => \`
                              <span class="text-xs px-3 py-1 rounded-full font-medium"
                                    style="background-color: \${theme.accent}33; color: \${theme.accent};">
                                \${tech}
                              </span>
                            \`).join('')}
                          </div>
                        \` : ''}

                        \${project.tags?.length ? \`
                          <div class="flex flex-wrap gap-2">
                            \${project.tags.map(tag => \`
                              <span class="text-xs px-2 py-1 rounded"
                                    style="background-color: \${theme.primary}26; color: \${theme.foreground}; opacity: 0.7;">
                                #\${tag}
                              </span>
                            \`).join('')}
                          </div>
                        \` : ''}
                      </div>
                    </div>
                  \`).join('')}
                </div>
              </section>
            \` : ''}

            \${regularProjects.length ? \`
              <section>
                <h2 class="text-3xl font-bold mb-8" style="color: \${theme.primary};">All Projects</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  \${regularProjects.map(project => \`
                    <div class="card group cursor-pointer hover:scale-105"
                         style="background-color: \${theme.foreground}0d; border-color: \${theme.foreground}33;"
                         onclick="window.open('\${project.url}', '_blank')">
                      \${project.image ? \`
                        <div class="aspect-video overflow-hidden">
                          <img src="\${project.image}" alt="\${project.title}"
                               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                        </div>
                      \` : ''}
                      <div class="p-5 space-y-3">
                        <div class="flex items-start justify-between gap-2">
                          <div class="flex items-center gap-3" style="color: \${theme.primary};">
                            \${renderIcon(project.icon)}
                          </div>
                          <i data-lucide="external-link" class="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </div>

                        <div>
                          <h3 class="font-semibold text-lg mb-1">\${project.title}</h3>
                          \${project.description ? \`<p class="text-sm opacity-70 line-clamp-2">\${project.description}</p>\` : ''}
                        </div>

                        <span class="badge" style="border-color: \${theme.accent}; color: \${theme.accent};">
                          \${project.appType}
                        </span>

                        \${project.tags?.length ? \`
                          <div class="flex flex-wrap gap-2">
                            \${project.tags.slice(0, 3).map(tag => \`
                              <span class="text-xs px-2 py-1 rounded"
                                    style="background-color: \${theme.primary}33; color: \${theme.primary};">
                                \${tag}
                              </span>
                            \`).join('')}
                          </div>
                        \` : ''}
                      </div>
                    </div>
                  \`).join('')}
                </div>
              </section>
            \` : ''}

            <footer class="text-center pt-12 border-t opacity-50" style="border-color: \${theme.foreground}33;">
              <p class="text-sm">Crafted with Portfolio Generator</p>
            </footer>
          </div>
        </div>
      \`;
    }

    loadPortfolio();
  </script>
</body>
</html>`;
}

export function downloadHTMLTemplate(layout: 'minimalistic' | 'showcase', filename: string = 'index.html') {
  const htmlString = generateHTMLTemplate(layout);
  const blob = new Blob([htmlString], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
