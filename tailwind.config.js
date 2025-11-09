/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./components/**/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      // 디자인 시스템 컬러 팔레트
      colors: {
        // Primary Colors
        primary: {
          blue: '#0066FF',
          'blue-dark': '#0052CC',
          'blue-light': '#3385FF',
          'blue-bg': '#E6F0FF',
        },
        // Accent Colors
        accent: {
          red: '#FF3B30',
          green: '#34C759',
          yellow: '#FFD60A',
        },
        // Lottery Ball Colors
        ball: {
          red: '#E63946',      // 1-10
          blue: '#457B9D',     // 11-20
          green: '#2A9D8F',    // 21-30
          orange: '#E76F51',   // 31-40
          purple: '#8B5CF6',   // 41-45
          yellow: '#F4A261',   // bonus
        },
        // Background Colors
        bg: {
          primary: '#FFFFFF',
          secondary: '#F9FAFB',
          tertiary: '#F3F4F6',
          dark: '#2D3748',
        },
        // Text Colors
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          tertiary: '#9CA3AF',
          inverse: '#FFFFFF',
        }
      },
      // 폰트 패밀리
      fontFamily: {
        kr: ['Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', 'sans-serif'],
        number: ['Roboto', 'SF Pro Display', 'sans-serif'],
      },
      // 폰트 크기
      fontSize: {
        '2xs': '10px',
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        'h6': '18px',
        'h5': '20px',
        'h4': '24px',
        'h3': '28px',
        'h2': '36px',
        'h1': '48px',
      },
      // 폰트 굵기
      fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      // 행간
      lineHeight: {
        tight: '1.2',
        normal: '1.5',
        relaxed: '1.75',
      },
      // 간격 (8px 단위)
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
      },
      // Border Radius
      borderRadius: {
        'sm': '6px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
      // Box Shadow
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'DEFAULT': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'md': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'lg': '0 12px 32px rgba(0, 0, 0, 0.15)',
        'blue': '0 4px 12px rgba(0, 102, 255, 0.3)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      // 그라데이션
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #4A90E2 0%, #0066FF 50%, #00B4D8 100%)',
        'gradient-card': 'linear-gradient(180deg, #0066FF 0%, #0052CC 100%)',
        'gradient-button': 'linear-gradient(135deg, #3385FF 0%, #0066FF 100%)',
      },
      // 애니메이션
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'fade-out': 'fadeOut 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
