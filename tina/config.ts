import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: 'main',
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'pages',
        label: 'Seiten',
        path: 'src/content/pages',
        format: 'mdx',
        fields: [
          { type: 'string', name: 'title', label: 'Titel', required: true },
          { type: 'string', name: 'description', label: 'Beschreibung (SEO)', required: false },
          { type: 'rich-text', name: 'body', label: 'Inhalt', templates: ['hero', 'services', 'about', 'contact', 'cta'] },
        ],
        ui: {
          router: ({ document }) => `/${document._sys.filename}`,
        },
      },
      {
        name: 'services',
        label: 'Leistungen (DGUV V3)',
        path: 'src/content/services',
        format: 'mdx',
        fields: [
          { type: 'string', name: 'title', label: 'Titel', required: true },
          { type: 'string', name: 'icon', label: 'Icon-Name (lucide)', required: false },
          { type: 'rich-text', name: 'description', label: 'Beschreibung', required: true },
          { type: 'boolean', name: 'featured', label: 'Auf Startseite hervorheben', default: false },
          { type: 'number', name: 'order', label: 'Reihenfolge', default: 0 },
        ],
      },
      {
        name: 'team',
        label: 'Team / Über mich',
        path: 'src/content/team',
        format: 'mdx',
        fields: [
          { type: 'string', name: 'name', label: 'Name', required: true },
          { type: 'string', name: 'role', label: 'Rolle', required: true },
          { type: 'image', name: 'photo', label: 'Foto', required: false },
          { type: 'rich-text', name: 'bio', label: 'Lebenslauf / Text', required: true },
          { type: 'boolean', name: 'featured', label: 'Auf Startseite zeigen', default: true },
        ],
      },
      {
        name: 'settings',
        label: 'Einstellungen',
        path: 'src/content/settings',
        format: 'json',
        fields: [
          { type: 'string', name: 'siteTitle', label: 'Seiten-Titel', required: true },
          { type: 'string', name: 'siteDescription', label: 'Seiten-Beschreibung', required: true },
          { type: 'string', name: 'primaryColor', label: 'Primärfarbe (Hex)', required: true },
          { type: 'string', name: 'secondaryColor', label: 'Sekundärfarbe (Hex)', required: true },
          { type: 'string', name: 'accentColor', label: 'Akzentfarbe (Hex)', required: true },
          { type: 'string', name: 'logo', label: 'Logo-Pfad (in /public/images)', required: false },
          { type: 'string', name: 'contactEmail', label: 'Kontakt-E-Mail', required: true },
          { type: 'string', name: 'contactPhone', label: 'Telefon', required: false },
          { type: 'string', name: 'address', label: 'Adresse', required: false },
          { type: 'string', name: 'imprintText', label: 'Impressum-Text', required: true },
          { type: 'string', name: 'privacyText', label: 'Datenschutz-Text', required: true },
        ],
        match: { include: 'site.json' },
      },
    ],
  },
});