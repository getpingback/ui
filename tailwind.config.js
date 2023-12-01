const config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx}',
    './node_modules/@getpingback/ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    colors: {
      gray: {
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        800: '#27272a',
        900: '#18181b',
      },
      coolGray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      red: {
        50: '#fdf2f2',
        100: '#fde8e8',
        200: '#fbd5d5',
        300: '#f8b4b4',
        400: '#f98080',
        500: '#f05252',
        600: '#e02424',
        700: '#c81e1e',
        800: '#9b1c1c',
        900: '#771d1d',
      },
      blue: {
        50: '#ebf5ff',
        100: '#e1effe',
        200: '#c3ddfd',
        300: '#a4cafe',
        400: '#76a9fa',
        500: '#3f83f8',
        600: '#1c64f2',
        700: '#1a56db',
        800: '#1e429f',
        900: '#233876',
      },
      green: {
        50: '#f3faf7',
        100: '#def7ec',
        200: '#bcf0da',
        300: '#84e1bc',
        400: '#31c48d',
        500: '#0e9f6e',
        600: '#057a55',
        700: '#046c4e',
        800: '#03543f',
        900: '#014737',
      },
      yellow: {
        50: '#fdfdea',
        100: '#fdf6b2',
        200: '#fce96a',
        300: '#faca15',
        400: '#e3a008',
        500: '#c27803',
        600: '#9f580a',
        700: '#8e4b10',
        800: '#723b13',
        900: '#633112',
      },
      orange: {
        50: '#fff8f1',
        100: '#feecdc',
        200: '#fcd9bd',
        300: '#fdba8c',
        400: '#ff8a4c',
        500: '#ff5a1f',
        600: '#d03801',
        700: '#b43403',
        800: '#8a2c0d',
        900: '#771d1d',
      },
      teal: {
        50: '#edfafa',
        100: '#d5f5f6',
        200: '#afecef',
        300: '#7edce2',
        400: '#16bdca',
        500: '#0694a2',
        600: '#047481',
        700: '#036672',
        800: '#05505c',
        900: '#014451',
      },
      purple: {
        50: '#f6f5ff',
        100: '#edebfe',
        200: '#dcd7fe',
        300: '#cabffd',
        400: '#ac94fa',
        500: '#9061f9',
        600: '#7e3af2',
        700: '#6c2bd9',
        800: '#5521b5',
        900: '#4a1d96',
      },
      pink: {
        50: '#fdf2f8',
        100: '#fce8f3',
        200: '#fad1e8',
        300: '#f8b4d9',
        400: '#f17eb8',
        500: '#e74694',
        600: '#d61f69',
        700: '#bf125d',
        800: '#99154b',
        900: '#751a3d',
      },
    },
    extend: {
      boxShadow: {
        'bottom_sheet-2': 'var(--bottom_sheet-2)',
        modal: 'var(--modals-shadow)',
      },
      backgroundImage: {
        'active-menu': 'var(--palette-gradiente-active_menu)',
      },
      keyframes: {
        slideUp: {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        slideDown: {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
        slideLeft: {
          from: {
            transform: 'translateX(10%)',
            opacity: 0,
          },
          to: { transform: 'translateX(0%)', opacity: 1 },
        },
        slideRight: {
          from: {
            transform: 'translateX(-10%)',
            opacity: 0,
          },
          to: { transform: 'translateX(0%)', opacity: 1 },
        },
      },
      animation: {
        'slide-up': 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards',
        'slide-down': 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards',
        'slide-left': 'slideLeft 300ms cubic-bezier(0.83, 0, 0.17, 1)',
        'slide-right': 'slideRight 300ms cubic-bezier(0.83, 0, 0.17, 1)',
      },
      colors: {
        success: {
          foreground: 'var(--text-success)',
        },
        tertiary: {
          foreground: 'var(--text-tertiary)',
        },
        secondary: {
          foreground: 'var(--text-secondary)',
        },
        primary: {
          foreground: 'var(--text-primary)',
        },
        active: {
          foreground: 'var(--text-active)',
        },
        inverse: {
          foreground: 'var(--text-inverse)',
        },
        icons: {
          foreground: 'var(--icons-default)',
        },
        'border-card': 'var(--border-cards-color)',
        list: {
          highlighted: {
            DEFAULT: 'var(--list-hightlight)',
          },
          actived: {
            DEFAULT: 'var(--list-actived)',
          },
          hover: {
            DEFAULT: 'var(--list-hover)',
          },
          label: {
            DEFAULT: 'var(--list-label_default)',
          },
        },
        divider: {
          DEFAULT: 'var(--border-divider-color)',
        },
        badge: {
          counter: {
            DEFAULT: 'var(--badge-counter-bg)',
            foreground: 'var(--badge-counter-text)',
          },
          new: {
            DEFAULT: 'var(--badge-new-bg)',
            foreground: 'var(--badge-new-text)',
          },
          soon: {
            DEFAULT: 'var(--badge-soon-bg)',
            foreground: 'var(--badge-soon-text)',
          },
          suspended: {
            DEFAULT: 'var(--badge-suspended-bg)',
            foreground: 'var(--badge-suspended-text)',
          },
        },
        background: {
          accent: 'var(--background-accent)',
        },
        border: {
          accent: 'rgba(0, 0, 0, 0.04)',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
export default config;
