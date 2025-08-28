import type { Preview } from '@storybook/react';
import { ThemeDecorator } from './theme-decorator';

import '../src/styles/globals.css';

const preview: Preview = {
  decorators: [ThemeDecorator],
  parameters: {
    options: {
      storySort: {
        order: [
          'Overview',
          ['Introduction', 'Getting started', 'Changelog'],
          'Development',
          ['Contributing', 'Code of conduct', 'Release process'],
          'Components'
        ]
      }
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  globalTypes: {
    themes: {
      name: 'Theme',
      description: 'Select the theme for the story',
      defaultValue: 'light',
      toolbar: {
        icon: 'lightbulb',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  }
};

export default preview;
