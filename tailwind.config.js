/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background hierarchy
        bg: {
          primary: '#000000',        // pure black
          surface: '#111111',        // cards, modals
          elevated: '#1A1A1E',       // elevated surfaces
        },

        // Text hierarchy
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
          tertiary: '#71717A',
          inverse: '#000000',
        },

        // Brand colors
        brand: {
          DEFAULT: '#FFD400',        // Grindr yellow
          hover: '#E6BF00',
          pressed: '#CCAA00',
          subtle: 'rgba(255,212,0,0.15)',
        },

        // Status colors
        status: {
          online: '#10B981',
          offline: '#6B7280',
          error: '#EF4444',
          warning: '#F97316',
        },

        // Chat bubbles
        chat: {
          sent: '#FFD400',           // outgoing bubble
          received: '#1F1F23',       // incoming bubble
          sentText: '#000000',
          receivedText: '#FFFFFF',
        },

        // Borders
        border: {
          DEFAULT: '#26262A',
          subtle: '#1A1A1E',
          focus: '#FFD400',
        },

        // Overlays
        overlay: {
          DEFAULT: 'rgba(0,0,0,0.65)',
          strong: 'rgba(0,0,0,0.85)',
        },
      },

      borderRadius: {
        none: '0px',
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        full: '9999px',
      },

      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
        'header': '56px',
        'tab': '64px',
      },

      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '26px' }],
        xl: ['22px', { lineHeight: '30px' }],
      },

      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.4)',
        modal: '0 10px 40px rgba(0,0,0,0.7)',
        glow: '0 0 0 2px rgba(255,212,0,0.35)',
      },

      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        slideUp: 'slideUp 0.25s ease-out',
        pulseSoft: 'pulseSoft 1.6s infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};