import React, { useEffect } from 'react';
import { StoryContext, StoryFn } from '@storybook/react';

export const ThemeDecorator = (Story: StoryFn, context: StoryContext) => {
  const theme = context.globals.themes;

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return <Story />;
};
