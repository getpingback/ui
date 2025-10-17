const backgroundColor = {
  default: 'var(--background-default)',
  inverse: 'var(--background-inverse)',
  alt: 'var(--background-alt)',
  success: {
    DEFAULT: 'var(--background-success-default)',
    inverse: 'var(--background-success-inverse)',
    hover: 'var(--background-success-hover)'
  },
  error: {
    DEFAULT: 'var(--background-error-default)',
    inverse: 'var(--background-error-inverse)',
    hover: 'var(--background-error-hover)'
  },
  warning: {
    DEFAULT: 'var(--background-warning-default)',
    inverse: 'var(--background-warning-inverse)'
  },
  caution: {
    DEFAULT: 'var(--background-caution-default)',
    inverse: 'var(--background-caution-inverse)'
  },
  info: {
    DEFAULT: 'var(--background-info-default)',
    inverse: 'var(--background-info-inverse)'
  },
  lime: {
    DEFAULT: 'var(--background-lime-default)',
    inverse: 'var(--background-lime-inverse)'
  },
  mint: {
    DEFAULT: 'var(--background-mint-default)',
    inverse: 'var(--background-mint-inverse)'
  },
  teal: {
    DEFAULT: 'var(--background-teal-default)',
    inverse: 'var(--background-teal-inverse)'
  },
  cyan: {
    DEFAULT: 'var(--background-cyan-default)',
    inverse: 'var(--background-cyan-inverse)'
  },
  blue: {
    DEFAULT: 'var(--background-blue-default)',
    inverse: 'var(--background-blue-inverse)'
  },
  fucshia: {
    DEFAULT: 'var(--background-fucshia-default)',
    inverse: 'var(--background-fucshia-inverse)'
  },
  pink: {
    DEFAULT: 'var(--background-pink-default)',
    inverse: 'var(--background-pink-inverse)'
  },
  neutral: {
    DEFAULT: 'var(--background-neutral-default)',
    inverse: 'var(--background-neutral-inverse)',
    hover: 'var(--background-neutral-hover)',
    active: {
      DEFAULT: 'var(--background-neutral-active)',
      hover: 'var(--background-neutral-active-hover)'
    }
  }
};

const textColor = {
  primary: 'var(--text-default-primary)',
  secondary: 'var(--text-default-secondary)',
  tertiary: 'var(--text-default-tertiary)',
  inverse: {
    primary: 'var(--text-inverse-primary)',
    secondary: 'var(--text-inverse-secondary)',
    tertiary: 'var(--text-inverse-tertiary)'
  },
  success: {
    DEFAULT: 'var(--text-success-default)',
    inverse: 'var(--text-success-inverse)'
  },
  error: {
    DEFAULT: 'var(--text-error-default)',
    inverse: 'var(--text-error-inverse)'
  },
  warning: {
    DEFAULT: 'var(--text-warning-default)',
    inverse: 'var(--text-warning-inverse)'
  },
  caution: {
    DEFAULT: 'var(--text-caution-default)',
    inverse: 'var(--text-caution-inverse)'
  },
  info: {
    DEFAULT: 'var(--text-info-default)',
    inverse: 'var(--text-info-inverse)'
  },
  lime: {
    DEFAULT: 'var(--text-lime-default)',
    inverse: 'var(--text-lime-inverse)'
  },
  mint: {
    DEFAULT: 'var(--text-mint-default)',
    inverse: 'var(--text-mint-inverse)'
  },
  teal: {
    DEFAULT: 'var(--text-teal-default)',
    inverse: 'var(--text-teal-inverse)'
  },
  cyan: {
    DEFAULT: 'var(--text-cyan-default)',
    inverse: 'var(--text-cyan-inverse)'
  },
  blue: {
    DEFAULT: 'var(--text-blue-default)',
    inverse: 'var(--text-blue-inverse)'
  },
  fucshia: {
    DEFAULT: 'var(--text-fucshia-default)',
    inverse: 'var(--text-fucshia-inverse)'
  },
  pink: {
    DEFAULT: 'var(--text-pink-default)',
    inverse: 'var(--text-pink-inverse)'
  },
  neutral: {
    DEFAULT: 'var(--text-neutral-default)',
    inverse: 'var(--text-neutral-inverse)'
  }
};

const borderColor = {
  default: 'var(--border-default)',
  hover: 'var(--border-hover)',
  invalid: 'var(--border-invalid)',
  valid: 'var(--border-valid)',
  filled: 'var(--border-filled)',
  inverse: 'var(--border-default-inverse)'
};

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
      textColor,
      backgroundColor,
      borderColor,
      backgroundImage: {
        'gradient-brand-1': 'var(--gradiente-brand-1)',
        'gradient-brand-2': 'var(--gradiente-brand-2)',
        'gradient-brand-3': 'var(--gradiente-brand-3)',
        'gradient-brand-4': 'var(--gradiente-brand-4)',
        'gradient-brand-5': 'var(--gradiente-brand-5)'
      },
      colors: {
        background: backgroundColor,
        typography: textColor,
        border: borderColor,
        surface: {
          DEFAULT: 'var(--surface-default)',
          inverse: 'var(--surface-inverse)'
        },
        link: {
          DEFAULT: 'var(--link-default-default)',
          inverse: 'var(--link-default-inverse)',
          pressed: {
            DEFAULT: 'var(--link-pressed-default)',
            inverse: 'var(--link-pressed-inverse)'
          }
        },
        icon: {
          primary: 'var(--icon-default-primary)',
          secondary: 'var(--icon-default-secondary)',
          tertiary: 'var(--icon-default-tertiary)',

          inverse: {
            primary: 'var(--icon-inverse-primary)',
            secondary: 'var(--icon-inverse-secondary)',
            tertiary: 'var(--icon-inverse-tertiary)'
          },
          success: {
            DEFAULT: 'var(--icon-success-default)',
            inverse: 'var(--icon-success-inverse)',
            hover: 'var(--icon-success-hover)'
          },
          error: {
            DEFAULT: 'var(--icon-error-default)',
            inverse: 'var(--icon-error-inverse)',
            hover: 'var(--icon-error-hover)'
          },
          warning: {
            DEFAULT: 'var(--icon-warning-default)',
            inverse: 'var(--icon-warning-inverse)'
          },
          caution: {
            DEFAULT: 'var(--icon-caution-default)',
            inverse: 'var(--icon-caution-inverse)'
          },
          info: {
            DEFAULT: 'var(--icon-info-default)',
            inverse: 'var(--icon-info-inverse)'
          },
          lime: {
            DEFAULT: 'var(--icon-lime-default)',
            inverse: 'var(--icon-lime-inverse)'
          },
          mint: {
            DEFAULT: 'var(--icon-mint-default)',
            inverse: 'var(--icon-mint-inverse)'
          },
          teal: {
            DEFAULT: 'var(--icon-teal-default)',
            inverse: 'var(--icon-teal-inverse)'
          },
          cyan: {
            DEFAULT: 'var(--icon-cyan-default)',
            inverse: 'var(--icon-cyan-inverse)'
          },
          blue: {
            DEFAULT: 'var(--icon-blue-default)',
            inverse: 'var(--icon-blue-inverse)'
          },
          fucshia: {
            DEFAULT: 'var(--icon-fucshia-default)',
            inverse: 'var(--icon-fucshia-inverse)'
          },
          pink: {
            DEFAULT: 'var(--icon-pink-default)',
            inverse: 'var(--icon-pink-inverse)'
          }
        },
        neutral: {
          black: 'var(--neutral-black)',
          white: 'var(--neutral-white)'
        },
        button: {
          solid: {
            DEFAULT: 'var(--button-solid-background-default)',
            hover: 'var(--button-solid-background-hover)',
            border: 'var(--button-solid-border-default)',
            label: 'var(--button-solid-label-default)'
          },
          outlined: {
            DEFAULT: 'var(--button-outlined-border-default)',
            hover: 'var(--button-outlined-border-hover)',
            pressed: 'var(--button-outlined-border-pressed)',
            label: 'var(--button-outlined-label-default)'
          },
          clear: {
            label: 'var(--button-clear-label-default)'
          },
          ghost: {
            DEFAULT: 'var(--button-ghost-background-default)',
            hover: 'var(--button-ghost-background-hover)',
            pressed: 'var(--button-ghost-background-pressed)'
          }
        },
        sidebar: {
          item: {
            hover: 'var(--sidebar-item-hover)',
            pressed: 'var(--sidebar-item-pressed)'
          },
          background: 'var(--sidebar-background-default)',
          'key-background': 'var(--sidebar-key-background)',
          'key-label': 'var(--sidebar-key-label)',
          'key-surface': {
            DEFAULT: 'var(--sidebar-key-surface)',
            pressed: 'var(--sidebar-key-surface-pressed)',
            border: 'var(--sidebar-key-surface-border)'
          }
        }
      },
      thickness: {
        1: 'var(--thickness-1)',
        2: 'var(--thickness-2)',
        4: 'var(--thickness-4)',
        6: 'var(--thickness-6)',
        8: 'var(--thickness-8)'
      },
      boxShadow: {
        'modal-1': 'var(--modal-1)',
        'modal-2': 'var(--modal-2)',
        'modal-3': 'var(--modal-3)',
        'modal-4': 'var(--modal-4)',
        'modal-5': 'var(--modal-5)',
        'modal-light-1': 'var(--modal-light-1)',
        'modal-light-2': 'var(--modal-light-2)',
        'modal-light-3': 'var(--modal-light-3)',
        'modal-light-4': 'var(--modal-light-4)',
        'modal-light-5': 'var(--modal-light-5)',
        'modal-dark-1': 'var(--modal-dark-1)',
        'modal-dark-2': 'var(--modal-dark-2)',
        'modal-dark-3': 'var(--modal-dark-3)',
        'modal-dark-4': 'var(--modal-dark-4)',
        'modal-dark-5': 'var(--modal-dark-5)',

        'bottom-sheet-1': 'var(--bottom-sheet-1)',
        'bottom-sheet-2': 'var(--bottom-sheet-2)',
        'bottom-sheet-3': 'var(--bottom-sheet-3)',
        'bottom-sheet-4': 'var(--bottom-sheet-4)',
        'bottom-sheet-5': 'var(--bottom-sheet-5)',

        'bottom-sheet-light-1': 'var(--bottom-sheet-light-1)',
        'bottom-sheet-light-2': 'var(--bottom-sheet-light-2)',
        'bottom-sheet-light-3': 'var(--bottom-sheet-light-3)',
        'bottom-sheet-light-4': 'var(--bottom-sheet-light-4)',
        'bottom-sheet-light-5': 'var(--bottom-sheet-light-5)',

        'bottom-sheet-dark-1': 'var(--bottom-sheet-dark-1)',
        'bottom-sheet-dark-2': 'var(--bottom-sheet-dark-2)',
        'bottom-sheet-dark-3': 'var(--bottom-sheet-dark-3)',
        'bottom-sheet-dark-4': 'var(--bottom-sheet-dark-4)',
        'bottom-sheet-dark-5': 'var(--bottom-sheet-dark-5)',

        solid: 'var(--button-solid-hover)',
        outlined: 'var(--button-outlined-hover)',
        ghost: 'var(--button-ghost-hover)',

        'input-focus-valid': 'var(--input-focus-valid)',
        'input-focus-invalid': 'var(--input-focus-invalid)',
        'input-focus-neutral': 'var(--input-focus-neutral)',
        'selection-hover': 'var(--selection-hover)',
        'selection-active-hover': 'var(--selection-active-hover)',
        'toggle-hover': 'var(--toggle-hover)',
        'toggle-active-hover': 'var(--toggle-active-hover)',
        'toggle-indicator': 'var(--toggle-indicator)'
      },
      animation: {
        'brand-gradient': 'brand-gradient 6s ease-in-out infinite',
        'slide-up': 'slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards',
        'slide-down': 'slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards',
        'slide-left': 'slide-left 300ms cubic-bezier(0.83, 0, 0.17, 1)',
        'slide-right': 'slide-right 300ms cubic-bezier(0.83, 0, 0.17, 1)',
        'drawer-slide-in': 'drawer-slide-in 300ms cubic-bezier(0.83, 0, 0.17, 1)',
        'drawer-slide-out': 'drawer-slide-out 300ms cubic-bezier(0.83, 0, 0.17, 1)',
        'fade-in': 'fade-in 300ms cubic-bezier(0.83, 0, 0.17, 1)',
        'fade-out': 'fade-out 300ms cubic-bezier(0.83, 0, 0.17, 1)',
        'modal-slide-up': 'modal-slide-up 250ms ease-out',
        'modal-slide-down': 'modal-slide-down 250ms ease-in',
        'modal-fade-in': 'modal-fade-in 250ms ease-out',
        'modal-fade-out': 'modal-fade-out 250ms ease-in',
        'progress-bar': 'progress-filler 500ms ease-in',
        spin: 'spin 1.4s linear infinite',
        dash: 'dash 1.4s ease-in-out infinite'
      },
      keyframes: {
        'brand-gradient': {
          '0%': { backgroundImage: 'var(--gradiente-brand-1)', backgroundPosition: '0% 50%', backgroundSize: '150% 150%' },
          '20%': { backgroundImage: 'var(--gradiente-brand-1)', backgroundPosition: '25% 50%', backgroundSize: '150% 150%' },
          '40%': { backgroundImage: 'var(--gradiente-brand-1)', backgroundPosition: '50% 50%', backgroundSize: '150% 150%' },
          '60%': { backgroundImage: 'var(--gradiente-brand-1)', backgroundPosition: '75% 50%', backgroundSize: '150% 150%' },
          '80%': { backgroundImage: 'var(--gradiente-brand-1)', backgroundPosition: '100% 50%', backgroundSize: '150% 150%' },
          '100%': { backgroundImage: 'var(--gradiente-brand-1)', backgroundPosition: '0% 50%', backgroundSize: '150% 150%' }
        },
        'slide-up': {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' }
        },
        'slide-down': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 }
        },
        'slide-left': {
          from: {
            transform: 'translateX(10%)',
            opacity: 0
          },
          to: { transform: 'translateX(0%)', opacity: 1 }
        },
        'slide-right': {
          from: {
            transform: 'translateX(-10%)',
            opacity: 0
          },
          to: { transform: 'translateX(0%)', opacity: 1 }
        },
        'drawer-slide-in': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0%)' }
        },
        'drawer-slide-out': {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(100%)' }
        },
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        'fade-out': {
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
        },
        'switch-hover': {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(24px)' }
        },
        'switch-active-hover': {
          '0%': { transform: 'translateX(24px)' },
          '100%': { transform: 'translateX(0px)' }
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        dash: {
          '0%': { strokeDashoffset: '186' },
          '50%': { strokeDashoffset: '46.75', transform: 'rotate(135deg)' },
          '100%': { strokeDashoffset: '186', transform: 'rotate(360deg)' }
        }
      }
    },
    fontFamily: {
      primary: ['Inter', 'sans-serif'],
      secondary: ['Monigue', 'sans-serif']
    }
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const scrollbarStyles = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none'
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        },
        '.scrollbar-style::-webkit-scrollbar': {
          height: '8px',
          width: '8px'
        },
        '.scrollbar-style::-webkit-scrollbar-track': {
          backgroundColor: '#0000000a'
        },
        '.scrollbar-style::-webkit-scrollbar-thumb': {
          borderRadius: '6px',
          backgroundColor: '#0000001f'
        }
      };
      const colorPickerComponent = {
        '.custom-color-picker .react-colorful': {
          width: '100%',
          height: '152px'
        },
        '.custom-color-picker .react-colorful__saturation': {
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px'
        },
        '.custom-color-picker .react-colorful__last-control': {
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px'
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
        },
        'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: '0'
        },

        'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active': {
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'var(--text-default-tertiary)',
          transition: 'background-color 5000s ease-in-out 0s'
        }
      };
      const rangePickerStyles = {
        '.rdp-today:not(.rdp-outside)': {
          color: 'var(--button-outlined-label-default)',
          border: '2px solid var(--button-outlined-border-default)',
          borderRadius: '50%'
        },
        '.rdp-today:not(.rdp-outside)[aria-selected="true"]': {
          borderRadius: '12px'
        }
      };

      addUtilities({ ...scrollbarStyles, ...colorPickerComponent, ...inputFocusStyles, ...rangePickerStyles });
    }
  ]
};
export default config;
