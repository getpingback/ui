const config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx}',
    './node_modules/@getpingback/ui/dist/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px'
    },
    colors: {
      gray: {
        50: 'var(--gray-50)',
        100: 'var(--gray-100)',
        200: 'var(--gray-200)',
        300: 'var(--gray-300)',
        400: 'var(--gray-400)',
        500: 'var(--gray-500)',
        600: 'var(--gray-600)',
        700: 'var(--gray-700)',
        800: 'var(--gray-800)',
        900: 'var(--gray-900)'
      },
      brown: {
        50: 'var(--brown-50)',
        100: 'var(--brown-100)',
        200: 'var(--brown-200)',
        300: 'var(--brown-300)',
        400: 'var(--brown-400)',
        500: 'var(--brown-500)',
        600: 'var(--brown-600)',
        700: 'var(--brown-700)',
        800: 'var(--brown-800)',
        900: 'var(--brown-900)'
      },
      red: {
        50: 'var(--red-50)',
        100: 'var(--red-100)',
        200: 'var(--red-200)',
        300: 'var(--red-300)',
        400: 'var(--red-400)',
        500: 'var(--red-500)',
        600: 'var(--red-600)',
        700: 'var(--red-700)',
        800: 'var(--red-800)',
        900: 'var(--red-900)'
      },
      orange: {
        50: 'var(--orange-50)',
        100: 'var(--orange-100)',
        200: 'var(--orange-200)',
        300: 'var(--orange-300)',
        400: 'var(--orange-400)',
        500: 'var(--orange-500)',
        600: 'var(--orange-600)',
        700: 'var(--orange-700)',
        800: 'var(--orange-800)',
        900: 'var(--orange-900)'
      },
      yellow: {
        50: 'var(--yellow-50)',
        100: 'var(--yellow-100)',
        200: 'var(--yellow-200)',
        300: 'var(--yellow-300)',
        400: 'var(--yellow-400)',
        500: 'var(--yellow-500)',
        600: 'var(--yellow-600)',
        700: 'var(--yellow-700)',
        800: 'var(--yellow-800)',
        900: 'var(--yellow-900)'
      },
      lime: {
        50: 'var(--lime-50)',
        100: 'var(--lime-100)',
        200: 'var(--lime-200)',
        300: 'var(--lime-300)',
        400: 'var(--lime-400)',
        500: 'var(--lime-500)',
        600: 'var(--lime-600)',
        700: 'var(--lime-700)',
        800: 'var(--lime-800)',
        900: 'var(--lime-900)'
      },
      green: {
        50: 'var(--green-50)',
        100: 'var(--green-100)',
        200: 'var(--green-200)',
        300: 'var(--green-300)',
        400: 'var(--green-400)',
        500: 'var(--green-500)',
        600: 'var(--green-600)',
        700: 'var(--green-700)',
        800: 'var(--green-800)',
        900: 'var(--green-900)'
      },
      mint: {
        50: 'var(--mint-50)',
        100: 'var(--mint-100)',
        200: 'var(--mint-200)',
        300: 'var(--mint-300)',
        400: 'var(--mint-400)',
        500: 'var(--mint-500)',
        600: 'var(--mint-600)',
        700: 'var(--mint-700)',
        800: 'var(--mint-800)',
        900: 'var(--mint-900)'
      },
      teal: {
        50: 'var(--teal-50)',
        100: 'var(--teal-100)',
        200: 'var(--teal-200)',
        300: 'var(--teal-300)',
        400: 'var(--teal-400)',
        500: 'var(--teal-500)',
        600: 'var(--teal-600)',
        700: 'var(--teal-700)',
        800: 'var(--teal-800)',
        900: 'var(--teal-900)'
      },
      cyan: {
        50: 'var(--cyan-50)',
        100: 'var(--cyan-100)',
        200: 'var(--cyan-200)',
        300: 'var(--cyan-300)',
        400: 'var(--cyan-400)',
        500: 'var(--cyan-500)',
        600: 'var(--cyan-600)',
        700: 'var(--cyan-700)',
        800: 'var(--cyan-800)',
        900: 'var(--cyan-900)'
      },
      blue: {
        50: 'var(--blue-50)',
        100: 'var(--blue-100)',
        200: 'var(--blue-200)',
        300: 'var(--blue-300)',
        400: 'var(--blue-400)',
        500: 'var(--blue-500)',
        600: 'var(--blue-600)',
        700: 'var(--blue-700)',
        800: 'var(--blue-800)',
        900: 'var(--blue-900)'
      },
      purple: {
        50: 'var(--purple-50)',
        100: 'var(--purple-100)',
        200: 'var(--purple-200)',
        300: 'var(--purple-300)',
        400: 'var(--purple-400)',
        500: 'var(--purple-500)',
        600: 'var(--purple-600)',
        700: 'var(--purple-700)',
        800: 'var(--purple-800)',
        900: 'var(--purple-900)'
      },
      fucshia: {
        50: 'var(--fucshia-50)',
        100: 'var(--fucshia-100)',
        200: 'var(--fucshia-200)',
        300: 'var(--fucshia-300)',
        400: 'var(--fucshia-400)',
        500: 'var(--fucshia-500)',
        600: 'var(--fucshia-600)',
        700: 'var(--fucshia-700)',
        800: 'var(--fucshia-800)',
        900: 'var(--fucshia-900)'
      },
      pink: {
        50: 'var(--pink-50)',
        100: 'var(--pink-100)',
        200: 'var(--pink-200)',
        300: 'var(--pink-300)',
        400: 'var(--pink-400)',
        500: 'var(--pink-500)',
        600: 'var(--pink-600)',
        700: 'var(--pink-700)',
        800: 'var(--pink-800)',
        900: 'var(--pink-900)'
      }
    },
    extend: {
      boxShadow: {
        'bottom_sheet-2': 'var(--bottom_sheet-2)',
        modal: 'var(--modals-shadow)',
        'modal-large': 'var(--modals-shadow-large)',
        drawer: 'var(--drawer-shadow)',
        custom: '0px 0px 0px 1px rgba(0,0,0,0.15)',
        solid: 'var(--button-hover-solid-color)',
        outlined: 'var(--button-hover-color)',
        ghost: 'var(--button-hover-color)',
        dropdown: 'var(--dropdown-shadow)',
        switch: 'var(--switch-shadow)',
        'text-field': 'var(--input-shadow)',
        'text-field-error': 'var(--input-shadow-error)',
        'card-active': 'var(--card-shadow)',
        'select-item': 'var(--select-item-shadow)'
      },
      backgroundImage: {
        'active-menu': 'var(--palette-gradiente-active_menu)',
        'line-default': 'var(--background-stepper-line)'
      },
      keyframes: {
        accordionSlideUp: {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' }
        },
        accordionSlideDown: {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 }
        },
        slideLeft: {
          from: {
            transform: 'translateX(10%)',
            opacity: 0
          },
          to: { transform: 'translateX(0%)', opacity: 1 }
        },
        slideRight: {
          from: {
            transform: 'translateX(-10%)',
            opacity: 0
          },
          to: { transform: 'translateX(0%)', opacity: 1 }
        },
        drawerSlideIn: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0%)' }
        },
        drawerSlideOut: {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(100%)' }
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 }
        },
        'modal-slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        'modal-slide-down': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' }
        },
        'modal-fade-in': {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'modal-fade-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0)' }
        },
        'progress-filler': {
          '0%': { width: '0%' },
          '50%': { width: 'var(--progress-mid-width)' },
          '100%': { width: 'var(--progress-final-width)' }
        }
      },
      animation: {
        'slide-up': 'accordionSlideUp 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards',
        'slide-down': 'accordionSlideDown 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards',
        'slide-left': 'slideLeft 300ms cubic-bezier(0.83, 0, 0.17, 1)',
        'slide-right': 'slideRight 300ms cubic-bezier(0.83, 0, 0.17, 1)',
        'drawer-slide-in': 'drawerSlideIn 300ms cubic-bezier(0.83, 0, 0.17, 1)',
        'drawer-slide-out': 'drawerSlideOut 300ms cubic-bezier(0.83, 0, 0.17, 1)',
        'fade-in': 'fadeIn 300ms cubic-bezier(0.83, 0, 0.17, 1)',
        'fade-out': 'fadeOut 300ms cubic-bezier(0.83, 0, 0.17, 1)',
        'modal-slide-up': 'modal-slide-up 250ms ease-out',
        'modal-slide-down': 'modal-slide-down 250ms ease-in',
        'modal-fade-in': 'modal-fade-in 250ms ease-out',
        'modal-fade-out': 'modal-fade-out 250ms ease-in',
        'progress-bar': 'progress-filler 500ms ease-in'
      },
      colors: {
        success: {
          foreground: 'var(--text-success)'
        },
        surface: {
          DEFAULT: 'var(--surface-default)'
        },
        caution: {
          foreground: 'var(--text-caution)'
        },
        tertiary: {
          foreground: 'var(--text-tertiary)'
        },
        secondary: {
          foreground: 'rgb(from var(--text-secondary) r g b / <alpha-value>)'
        },
        primary: {
          foreground: 'var(--text-primary)'
        },
        active: {
          foreground: 'var(--text-active)'
        },
        informative: {
          foreground: 'var(--text-informative_accent)'
        },
        highlighted: {
          foreground: 'var(--text-informative)'
        },
        inverse: {
          foreground: 'var(--text-inverse)'
        },
        icons: {
          foreground: 'var(--icons-default)'
        },
        error: {
          foreground: 'var(--text-error_accent)'
        },
        'border-card': 'var(--border-cards-color)',
        'border-card-light': 'var(--border-card-light)',
        divider: {
          DEFAULT: 'var(--border-divider-color)',
          active: 'var(--divider-color-active)',
          error: 'var(--border-input_invalid-color)',
          highlighted: 'var(--border-input_filled-color)',
          disabled: 'var(--divider-color-disabled)'
        },
        'border-card-active': 'var(--border-card-active)',
        list: {
          highlighted: {
            DEFAULT: 'var(--list-hightlight)'
          },
          actived: {
            DEFAULT: 'var(--list-actived)'
          },
          hover: {
            DEFAULT: 'var(--list-hover)'
          },
          label: {
            DEFAULT: 'var(--list-label_default)',
            active: 'var(--list-label_active)'
          }
        },
        input: {
          selected: {
            DEFAULT: 'var(--border-input_filled-color)',
            label: 'var(--buttons-label_color)',
            hover: 'var(--background-informative)'
          },
          outline: {
            DEFAULT: 'rgb(from var(--text-tertiary) r g b / <alpha-value>)',
            hover: 'var(--list-hover)'
          },
          hover: 'var(--input-hover-border)',
          focus: 'var(--input-focus-border)',
          'focus-shadow': 'var(--input-focus-shadow)'
        },
        stepper: {
          line: 'var(--background-stepper-line-completed)'
        },
        badge: {
          gray: {
            DEFAULT: 'var(--badge-gray-bg)',
            foreground: 'var(--badge-gray-text)'
          },
          green: {
            DEFAULT: 'var(--badge-green-bg)',
            foreground: 'var(--badge-green-text)'
          },
          teal: {
            DEFAULT: 'var(--badge-teal-bg)',
            foreground: 'var(--badge-teal-text)'
          },
          red: {
            DEFAULT: 'var(--badge-red-bg)',
            foreground: 'var(--badge-red-text)'
          },
          yellow: {
            DEFAULT: 'var(--badge-yellow-bg)',
            foreground: 'var(--badge-yellow-text)'
          },
          purple: {
            DEFAULT: 'var(--badge-purple-bg)',
            foreground: 'var(--badge-purple-text)'
          },
          orange: {
            DEFAULT: 'var(--badge-orange-bg)',
            foreground: 'var(--badge-orange-text)'
          }
        },
        callout: {
          primary: {
            DEFAULT: 'var(--callout-primary-bg)',
            foreground: 'var(--callout-primary-text)'
          },
          info: {
            DEFAULT: 'var(--callout-info-bg)',
            foreground: 'var(--callout-info-text)'
          },
          success: {
            DEFAULT: 'var(--callout-success-bg)',
            foreground: 'var(--callout-success-text)'
          },
          warning: {
            DEFAULT: 'var(--callout-warning-bg)',
            foreground: 'var(--callout-warning-text)'
          },
          error: {
            DEFAULT: 'var(--callout-error-bg)',
            foreground: 'var(--callout-error-text)'
          }
        },
        switch: {
          bg: {
            DEFAULT: 'var(--switch-bg-default)',
            hover: 'var(--switch-bg-hover)'
          },
          thumb: {
            DEFAULT: 'var(--switch-thumb-bg)',
            disabled: 'var(--switch-thumb-disabled)'
          },
          checked: {
            DEFAULT: 'var(--switch-checked-bg)',
            hover: 'var(--switch-checked-hover)',
            ring: 'var(--switch-checked-ring)'
          },
          highlight: {
            DEFAULT: 'var(--switch-highlight-bg)',
            hover: 'var(--switch-highlight-hover)',
            ring: 'var(--switch-highlight-ring)'
          }
        },
        button: {
          solid: {
            DEFAULT: 'var(--buttons-solid_default)',
            foreground: 'var(--buttons-label_inverse)',
            hover: 'var(--button-solid-hover)',
            disabled: 'var(--buttons-disabled)'
          },
          ghost: {
            DEFAULT: 'var(--buttons-ghost_bg)',
            foreground: 'var(--buttons-label)',
            hover: 'var(--button-ghost-gray-hover)',
            disabled: 'var(--buttons-disabled)'
          },
          danger: {
            DEFAULT: 'var(--buttons-danger-bg)',
            foreground: 'var(--buttons-label_inverse)',
            hover: 'var(--buttons-danger-bg-hover)',
            disabled: 'var(--buttons-danger-disabled)'
          },
          outlined: {
            border: 'var(--border-button_outlined-color)',
            hover: 'var(--button-outlined-hover)'
          },
          done: {
            DEFAULT: 'var(--badge-done-bg)',
            foreground: 'var(--badge-done-text)'
          },
          'page-solid': {
            DEFAULT: 'var(--buttons-solid_default)'
          },
          'page-ghost': {
            DEFAULT: 'var(--buttons-ghost_bg-color)'
          },
          'page-color-solid': {
            DEFAULT: 'var(--buttons-label_inverse)'
          },
          'page-color-clear': {
            DEFAULT: 'var(--buttons-label)'
          }
        },
        background: {
          accent: 'var(--background-accent)'
        },
        border: {
          accent: 'rgba(0, 0, 0, 0.04)'
        }
      },
      borderColor: {
        divider: {
          DEFAULT: 'var(--border-divider-color)',
          active: 'var(--divider-color-active)',
          error: 'var(--divider-color-error)',
          highlighted: 'var(--divider-color-highlighted)',
          disabled: 'var(--divider-color-disabled)'
        }
      }
    },
    fontFamily: {
      primary: ['Inter', 'sans-serif']
    }
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none'
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        }
      };
      const colorPickerComponent = {
        '.custom-color-picker .react-colorful': {
          width: '100%',
          height: '152px'
        },
        '.custom-color-picker .react-colorful__saturation': {
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px'
        },
        '.custom-color-picker .react-colorful__last-control': {
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px'
        },
        '.custom-color-picker .react-colorful__pointer': {
          width: '0.5rem',
          height: '0.5rem'
        }
      };
      const inputFocusStyles = {
        '.input-focus': {
          '&:hover': {
            'border-color': theme('colors.input.hover')
          },
          '&:focus': {
            'border-color': theme('colors.input.focus'),
            'box-shadow': `0px 0px 0px 3px ${theme('colors.input.focus-shadow')}`
          },
          outline: '2px solid transparent',
          outlineOffset: '2px',
          'transition-property': 'all',
          'transition-duration': '200ms',
          'transition-timing-function': 'ease-in-out'
        }
      };

      addUtilities({ ...newUtilities, ...colorPickerComponent, ...inputFocusStyles });
    }
  ]
};
export default config;
