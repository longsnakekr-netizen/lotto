/**
 * Tailwind CSS 공통 설정
 * 모든 페이지에서 사용되는 Tailwind 설정을 정의합니다.
 */

// Tailwind config 객체를 전역 변수로 export
window.LOTTO_TAILWIND_CONFIG = {
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0066FF',
        'primary-blue-dark': '#0052CC',
        'primary-blue-light': '#3385FF',
        'primary-blue-bg': '#E6F0FF',
        'accent-red': '#FF3B30',
        'accent-green': '#34C759',
        'accent-yellow': '#FFD60A',
        'ball-red': '#E63946',
        'ball-blue': '#457B9D',
        'ball-green': '#2A9D8F',
        'ball-orange': '#E76F51',
        'ball-purple': '#8B5CF6',
        'ball-yellow': '#F4A261',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'text-tertiary': '#9CA3AF',
      },
      fontFamily: {
        'kr': ['Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', 'sans-serif'],
        'number': ['Roboto', 'SF Pro Display', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #4A90E2 0%, #0066FF 50%, #00B4D8 100%)',
        'gradient-card': 'linear-gradient(180deg, #0066FF 0%, #0052CC 100%)',
        'gradient-button': 'linear-gradient(135deg, #3385FF 0%, #0066FF 100%)',
      }
    }
  }
};

// Tailwind config를 자동으로 적용
if (typeof tailwind !== 'undefined') {
  tailwind.config = window.LOTTO_TAILWIND_CONFIG;
}
