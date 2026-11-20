/**
 * API Test Pilot — Shared Tailwind Preset
 * Maps Tailwind utilities to CSS custom properties defined in tokens.css
 * Synchronized with shadcn/ui Preset b6Wxuc3c3f (base-mira)
 */

const preset = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      shell: '901px', // Unified shell breakpoint: <=900px is mobile, >=901px is desktop
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          hover: 'var(--color-primary-hover)',
          active: 'var(--color-primary-active)',
          subtle: 'var(--color-primary-subtle)',
          glow: 'var(--color-primary-glow)',
          'glow-subtle': 'var(--color-primary-glow-subtle)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          raised: 'var(--color-surface-raised)',
          subtle: 'var(--color-surface-subtle)',
          overlay: 'var(--color-surface-overlay)',
          accent: 'var(--color-surface-accent)',
        },
        line: {
          DEFAULT: 'var(--color-line)',
          strong: 'var(--color-line-strong)',
          focus: 'var(--color-line-focus)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        semantic: {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          info: 'var(--color-info)',
        },
        state: {
          queued: {
            bg: 'var(--color-state-queued-bg)',
            fg: 'var(--color-state-queued-fg)',
            border: 'var(--color-state-queued-border)',
          },
          running: {
            bg: 'var(--color-state-running-bg)',
            fg: 'var(--color-state-running-fg)',
            border: 'var(--color-state-running-border)',
          },
          passed: {
            bg: 'var(--color-state-passed-bg)',
            fg: 'var(--color-state-passed-fg)',
            border: 'var(--color-state-passed-border)',
          },
          failed: {
            bg: 'var(--color-state-failed-bg)',
            fg: 'var(--color-state-failed-fg)',
            border: 'var(--color-state-failed-border)',
          },
          error: {
            bg: 'var(--color-state-error-bg)',
            fg: 'var(--color-state-error-fg)',
            border: 'var(--color-state-error-border)',
          },
          retrying: {
            bg: 'var(--color-state-retrying-bg)',
            fg: 'var(--color-state-retrying-fg)',
            border: 'var(--color-state-retrying-border)',
          },
          recovered: {
            bg: 'var(--color-state-recovered-bg)',
            fg: 'var(--color-state-recovered-fg)',
            border: 'var(--color-state-recovered-border)',
          },
          uncertain: {
            bg: 'var(--color-state-uncertain-bg)',
            fg: 'var(--color-state-uncertain-fg)',
            border: 'var(--color-state-uncertain-border)',
          },
        },
        ai: {
          'badge-bg': 'var(--color-ai-badge-bg)',
          'badge-fg': 'var(--color-ai-badge-fg)',
          'badge-border': 'var(--color-ai-badge-border)',
          'card-bg': 'var(--color-ai-card-bg)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        control: 'var(--radius-control)',
        card: 'var(--radius-card)',
        panel: 'var(--radius-panel)',
        pill: 'var(--radius-pill)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        heading: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        arabic: ['var(--font-arabic)'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['var(--text-2xs)', { lineHeight: 'var(--leading-tight)' }],
        xs: ['var(--text-xs)', { lineHeight: 'var(--leading-tight)' }],
        sm: ['var(--text-sm)', { lineHeight: 'var(--leading-tight)' }],
        base: ['var(--text-base)', { lineHeight: 'var(--leading-normal)' }],
        md: ['var(--text-md)', { lineHeight: 'var(--leading-normal)' }],
        lg: ['var(--text-lg)', { lineHeight: 'var(--leading-tight)' }],
        xl: ['var(--text-xl)', { lineHeight: 'var(--leading-tight)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--leading-none)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--leading-none)' }],
        '4xl': ['var(--text-4xl)', { lineHeight: 'var(--leading-none)' }],
      },
      spacing: {
        control: 'var(--control-height)',
        'control-sm': 'var(--control-height-sm)',
        'control-lg': 'var(--control-height-lg)',
        topbar: 'var(--topbar-height)',
        sidebar: 'var(--sidebar-width)',
        'sidebar-collapsed': 'var(--sidebar-collapsed-width)',
        drawer: 'var(--drawer-width)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        panel: 'var(--shadow-panel)',
        card: 'var(--shadow-card)',
        'scalar-1': 'var(--shadow-scalar-1)',
        'scalar-2': 'var(--shadow-scalar-2)',
        hero: 'var(--shadow-hero)',
        glow: 'var(--shadow-glow)',
        'glow-purple': 'var(--shadow-glow-purple)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
      },
    },
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = preset;
}
