/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
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
          "Einleitung",
          ["Hintergrund MIO Anzeigen", "Prototyp MIO Viewer Impfpass"],
          "Nutzung & Integration",
          "Entwicklung",
          [
            "Development Setup",
            "Development Workflow",
            "Dependencies",
            "Arbeit mit Github",
            "Komponentenbasiertes Arbeiten",
            "MIO Parser",
          ],
          "Komponenten",
        ],
      },
    },
  },
};

export default preview;
