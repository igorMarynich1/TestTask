// Modern Design System Theme
export const theme = {
  colors: {
    // Primary colors
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
      brand: '#2C14DD', // Design system primary (buttons, accents)
    },
    
    // Secondary colors
    secondary: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
    
    // Accent colors
    accent: {
      purple: '#8B5CF6',
      pink: '#EC4899',
      orange: '#F59E0B',
      green: '#10B981',
      red: '#EF4444',
    },
    
    // Semantic colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Background colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
      tertiary: '#F1F5F9',
    },
    
    // Text colors
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      tertiary: '#94A3B8',
      muted: '#6C727F',
      onSecondary: '#131313', // Text on secondary (e.g. secondary button)
      inverse: '#FFFFFF',
    },
    
    // Border colors
    border: {
      light: '#E2E8F0',
      medium: '#CBD5E1',
      dark: '#94A3B8',
    },
    
    // Shadow colors
    shadow: {
      light: 'rgba(0, 0, 0, 0.05)',
      medium: 'rgba(0, 0, 0, 0.1)',
      dark: 'rgba(0, 0, 0, 0.2)',
    },

    // Pagination / UI
    pagination: {
      inactive: '#BBBBBB',
      active: '#2C14DD',
    },
  },
  
  // Typography
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
    },
    
    fontWeights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    } as const,
    
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.6,
      loose: 1.8,
    },

    letterSpacing: {
      tight: -0.5,
      normal: 0,
    },
  },
  
  // Spacing
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    16: 64,
    18: 72,
    20: 80,
    24: 96,
  },
  
  // Border radius
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 48,
    full: 9999,
    pill: 300,
  },
  
  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    base: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
      elevation: 8,
    },
  },

  // Layout & component sizes
  layout: {
    screenPaddingTop: 74,
    cardPaddingVertical: 26,
    cardPaddingHorizontal: 36,
  },

  sizes: {
    inputHeight: 48,
    iconSm: 18,
    iconMd: 24,
    iconLg: 40,
    avatar: 80,
    heroIcon: 80,
    buttonSm: { minHeight: 33 },
    buttonMd: { minHeight: 44 },
    buttonLg: { height: 56 },
  },

  pagination: {
    dotSize: 6,
    dotActiveHeight: 18,
    gap: 8,
    marginVertical: { marginTop: 16, marginBottom: 32 },
  },
  
  // Animation durations
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
};

export type Theme = typeof theme;