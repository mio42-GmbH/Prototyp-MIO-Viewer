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
      order: ['Hintergrund', 'Entwicklung', ['Development Setup', 'Arbeit mit Github', 'Komponentenbasiertes Arbeiten', 'MIO Parser'], 'Example']
    }
  }
}