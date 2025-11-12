# Portfolio Generator for Data Analysts

A powerful, interactive web application that lets data analysts create, customize, and export professional portfolios through a configurable JSON file with live preview.

## Features

### Core Functionality
- **Dual Editor Modes**: Switch between a user-friendly form editor and raw JSON editor
- **Live Preview**: See changes instantly as you edit your portfolio
- **Two Layout Variants**: Choose between Minimalistic and Showcase layouts
- **Complete Customization**: Configure everything from colors to typography to spacing
- **Auto-save**: Changes are automatically saved to browser localStorage
- **Import/Export**: Load and save portfolio configurations as JSON files

### Portfolio Content
- **Personal Information**: Career name, title, about section, contact details
- **Projects Management**: Add up to 24 projects with full CRUD operations
- **Rich Project Details**: URLs, descriptions, icons, screenshots, tags, and tech stacks
- **Featured Projects**: Highlight your best work with featured project support
- **Social Links**: Add multiple social media profiles (LinkedIn, GitHub, Kaggle, etc.)

### Theming
- **Color Schemes**: Customize primary, accent, background, and foreground colors
- **Typography**: Adjust font scale from 85% to 125%
- **Spacing Density**: Choose between compact and comfortable layouts
- **Dark/Light Mode**: Support for dark, light, and system preference modes

### Icons & Images
- **Built-in Icons**: 20+ pre-selected Lucide icons for common data analyst project types
- **Custom Icons**: Upload your own PNG/SVG icons
- **Project Screenshots**: Add cover images to showcase your projects visually

## Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Zustand** for state management with persistence
- **Zod** for schema validation
- **react-hook-form** for form handling
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons

## Project Structure

```
src/
├── components/
│   ├── editor/
│   │   ├── BasicsForm.tsx          # Career name, title, about
│   │   ├── ContactForm.tsx         # Email, phone, location, socials
│   │   ├── ThemeForm.tsx           # Color, typography, spacing
│   │   ├── ProjectsList.tsx        # Projects CRUD list
│   │   ├── ProjectEditor.tsx       # Individual project editor
│   │   ├── IconPicker.tsx          # Icon selection interface
│   │   ├── FormEditor.tsx          # Tabbed form interface
│   │   └── JsonEditor.tsx          # Raw JSON editor
│   ├── portfolio/
│   │   ├── MinimalisticLayout.tsx  # Clean, minimal portfolio view
│   │   └── ShowcaseLayout.tsx      # Feature-rich portfolio view
│   ├── ui/                         # shadcn/ui components
│   ├── AppShell.tsx                # Top navigation and layout
│   ├── EditorPanel.tsx             # Left editor panel
│   ├── PreviewPanel.tsx            # Right preview panel
│   └── ThemeProvider.tsx           # Dynamic theme application
├── lib/
│   ├── schema.ts                   # Zod schemas and TypeScript types
│   ├── store.ts                    # Zustand state management
│   ├── theme-utils.ts              # Color conversion utilities
│   └── utils.ts                    # General utilities
├── App.tsx                         # Main application component
└── main.tsx                        # Application entry point
```

## Data Schema

The portfolio is defined by a JSON schema with the following structure:

```typescript
{
  careerName: string;              // e.g., "Data Analyst"
  title: string;                   // e.g., "Turning data into decisions"
  presentation: string;            // About section (max 1500 chars)
  contact: {
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    socials: Array<{
      label: string;               // e.g., "LinkedIn"
      url: string;
    }>;
  };
  theme: {
    layout: "minimalistic" | "showcase";
    mode: "light" | "dark" | "system";
    primary: string;               // Hex color
    accent: string;                // Hex color
    background: string;            // Hex color
    foreground: string;            // Hex color
    fontScale: number;             // 0.85 - 1.25
    density: "compact" | "comfortable";
  };
  projects: Array<{
    id: string;
    title: string;
    description?: string;          // Max 280 chars
    url: string;                   // Required, validated URL
    appType: "Notebook" | "Dashboard" | "BI Report" | "SQL" | "ML Model" | "API" | "Other";
    icon: {
      kind: "builtin" | "upload";
      name?: string;               // Lucide icon name
      dataUrl?: string;            // Custom icon data URL
    };
    image?: string;                // Screenshot data URL
    tags: string[];
    tech: string[];
    featured: boolean;
  }>;
}
```

## Layout Variants

### Minimalistic
- Clean, professional design
- Uniform project grid
- Subtle colors and spacing
- Perfect for traditional corporate portfolios

### Showcase
- Bold, prominent hero section
- Featured projects with larger cards
- Visual hierarchy with images
- Ideal for creative/visual portfolios

## Usage Guide

### Basics Tab
1. Enter your career name (e.g., "Data Analyst")
2. Add a compelling title or tagline
3. Write your presentation/about section

### Contact Tab
1. Add your email address (required)
2. Optionally add phone, location, and website
3. Add social media links (LinkedIn, GitHub, Kaggle, etc.)

### Theme Tab
1. Select color mode (light/dark/system)
2. Choose primary and accent colors using color pickers
3. Set background and foreground colors
4. Adjust font scale with the slider
5. Choose spacing density

### Projects Tab
1. Click "Add Project" to create a new project
2. Fill in title, description, and URL
3. Select project type
4. Choose an icon (built-in or upload custom)
5. Optionally upload a screenshot
6. Add tags and tech stack
7. Toggle "Featured" to highlight the project
8. Save and repeat for more projects

### JSON Editor Tab
- View and edit the raw JSON directly
- Click "Format" to prettify JSON
- Click "Apply Changes" to update the portfolio
- Validation errors are shown inline

### Import & Export
- **Import**: Click Import button to load a saved JSON file
- **Export**: Click Export button to download current portfolio as JSON
- **Reset**: Reset to default example portfolio

## Validation

All inputs are validated in real-time:
- Email addresses must be valid
- URLs must include protocol (https://)
- Character limits are enforced
- Required fields are highlighted
- JSON must match the schema

## Browser Support

The application automatically saves your work to localStorage. Your portfolio persists between sessions in the same browser.

## Accessibility

- Keyboard navigable
- Screen reader friendly
- Semantic HTML
- Focus indicators
- ARIA labels

## Performance

- Lazy loading for images
- Debounced autosave (500ms)
- Optimized re-renders
- Handles up to 24 projects smoothly

## Future Enhancements

Potential features for future versions:
- Drag-and-drop project reordering
- Tag/tech stack filters in preview
- Print-to-PDF export
- Share via compressed URL
- Multiple portfolio management
- Template library
- Analytics integration

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.
