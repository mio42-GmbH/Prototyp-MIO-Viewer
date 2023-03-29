export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        'Einleitung', [
          'Hintergrund MIO Anzeigen',
          'Prototyp MIO Anzeige Impfpass'
        ],
        'Nutzung & Integration',
        'Entwicklung', [
          'Development Setup',
          'Development Workflow',
          'Dependencies',
          'Arbeit mit Github',
          'Komponentenbasiertes Arbeiten',
          'MIO Parser'
        ],
        'Komponenten'
      ]
    }
  }
}