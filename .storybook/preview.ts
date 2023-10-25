import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          "Overview",
          ["Introduction", "Getting started", "Changelog"],
          "Development",
          ["Contributing", "Code of conduct", "Release process"],
          "Components",
        ],
      },
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
