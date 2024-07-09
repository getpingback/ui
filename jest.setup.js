import { defaultFallbackInView } from 'react-intersection-observer';
import '@testing-library/react';
import '@testing-library/user-event';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';

global.IntersectionObserver = jest.fn();
defaultFallbackInView(false);

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
