로또라운지 디자인 시스템 가이드
📋 목차

컬러 시스템
타이포그래피
컴포넌트 스타일
사용 예시


🎨 컬러 시스템
Primary Colors (메인 컬러)
css/* 블루 계열 - 메인 브랜드 컬러 */
--primary-blue: #0066FF;           /* 메인 블루 */
--primary-blue-dark: #0052CC;      /* 다크 블루 (hover, active) */
--primary-blue-light: #3385FF;     /* 라이트 블루 (secondary actions) */
--primary-blue-bg: #E6F0FF;        /* 블루 배경 (subtle backgrounds) */
Secondary Colors (보조 컬러)
css/* 강조 색상 */
--accent-red: #FF3B30;             /* 강조/경고 (당첨번호, 중요 알림) */
--accent-green: #34C759;           /* 성공/확인 */
--accent-yellow: #FFD60A;          /* 주의/하이라이트 */

/* 로또 볼 컬러 */
--ball-red: #E63946;               /* 빨강 볼 (1-10) */
--ball-blue: #457B9D;              /* 파랑 볼 (11-20) */
--ball-green: #2A9D8F;             /* 초록 볼 (21-30) */
--ball-orange: #E76F51;            /* 주황 볼 (31-40) */
--ball-purple: #8B5CF6;            /* 보라 볼 (41-45) */
--ball-yellow: #F4A261;            /* 노랑 볼 (bonus) */
Neutral Colors (중립 컬러)
css/* 그레이 스케일 */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;

/* 텍스트 컬러 */
--text-primary: #111827;           /* 주요 텍스트 */
--text-secondary: #6B7280;         /* 보조 텍스트 */
--text-tertiary: #9CA3AF;          /* 비활성 텍스트 */
--text-inverse: #FFFFFF;           /* 다크 배경 위 텍스트 */
Background Colors (배경 컬러)
css/* 배경 */
--bg-primary: #FFFFFF;             /* 기본 배경 */
--bg-secondary: #F9FAFB;           /* 보조 배경 */
--bg-tertiary: #F3F4F6;            /* 카드/섹션 배경 */
--bg-dark: #2D3748;                /* 다크 섹션 배경 */
--bg-overlay: rgba(0, 0, 0, 0.5);  /* 오버레이 */
Gradient Colors (그라데이션)
css/* 히어로 배경 그라데이션 */
--gradient-hero: linear-gradient(135deg, #4A90E2 0%, #0066FF 50%, #00B4D8 100%);

/* 카드 그라데이션 */
--gradient-card: linear-gradient(180deg, #0066FF 0%, #0052CC 100%);

/* 버튼 그라데이션 */
--gradient-button: linear-gradient(135deg, #3385FF 0%, #0066FF 100%);

📝 타이포그래피
Font Family
css/* 한글 폰트 */
--font-family-kr: 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;

/* 숫자 폰트 */
--font-family-number: 'Roboto', 'SF Pro Display', sans-serif;

/* 기본 폰트 스택 */
body {
font-family: var(--font-family-kr);
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}

.number {
font-family: var(--font-family-number);
}
Font Sizes (폰트 크기)
css/* Heading Sizes */
--text-h1: 48px;          /* 메인 타이틀 */
--text-h2: 36px;          /* 섹션 타이틀 */
--text-h3: 28px;          /* 서브 타이틀 */
--text-h4: 24px;          /* 카드 타이틀 */
--text-h5: 20px;          /* 작은 제목 */
--text-h6: 18px;          /* 최소 제목 */

/* Body Sizes */
--text-xl: 20px;          /* 강조 본문 */
--text-lg: 18px;          /* 큰 본문 */
--text-base: 16px;        /* 기본 본문 */
--text-sm: 14px;          /* 작은 텍스트 */
--text-xs: 12px;          /* 보조 텍스트 */
--text-2xs: 10px;         /* 최소 텍스트 */
Font Weights (폰트 굵기)
css--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
Line Heights (행간)
css--leading-tight: 1.2;     /* 제목용 */
--leading-normal: 1.5;    /* 본문용 */
--leading-relaxed: 1.75;  /* 긴 텍스트용 */
Typography Classes
css/* Heading Styles */
.heading-1 {
font-size: var(--text-h1);
font-weight: var(--font-bold);
line-height: var(--leading-tight);
color: var(--text-primary);
letter-spacing: -0.02em;
}

.heading-2 {
font-size: var(--text-h2);
font-weight: var(--font-bold);
line-height: var(--leading-tight);
color: var(--text-primary);
letter-spacing: -0.01em;
}

.heading-3 {
font-size: var(--text-h3);
font-weight: var(--font-semibold);
line-height: var(--leading-tight);
color: var(--text-primary);
}

/* Body Text Styles */
.body-large {
font-size: var(--text-lg);
font-weight: var(--font-regular);
line-height: var(--leading-normal);
color: var(--text-primary);
}

.body-base {
font-size: var(--text-base);
font-weight: var(--font-regular);
line-height: var(--leading-normal);
color: var(--text-primary);
}

.body-small {
font-size: var(--text-sm);
font-weight: var(--font-regular);
line-height: var(--leading-normal);
color: var(--text-secondary);
}

/* Caption & Label */
.caption {
font-size: var(--text-xs);
font-weight: var(--font-regular);
line-height: var(--leading-normal);
color: var(--text-tertiary);
}

.label {
font-size: var(--text-sm);
font-weight: var(--font-medium);
line-height: var(--leading-normal);
color: var(--text-secondary);
}

/* Number Display */
.number-large {
font-family: var(--font-family-number);
font-size: 48px;
font-weight: var(--font-bold);
line-height: 1;
}

.number-medium {
font-family: var(--font-family-number);
font-size: 32px;
font-weight: var(--font-semibold);
line-height: 1;
}

.number-small {
font-family: var(--font-family-number);
font-size: 20px;
font-weight: var(--font-medium);
line-height: 1;
}

🧩 컴포넌트 스타일
Buttons (버튼)
css/* Primary Button */
.btn-primary {
background: var(--primary-blue);
color: var(--text-inverse);
font-size: var(--text-base);
font-weight: var(--font-semibold);
padding: 12px 24px;
border-radius: 8px;
border: none;
cursor: pointer;
transition: all 0.2s ease;
}

.btn-primary:hover {
background: var(--primary-blue-dark);
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
}

.btn-primary:active {
transform: translateY(0);
}

/* Secondary Button */
.btn-secondary {
background: var(--bg-primary);
color: var(--primary-blue);
font-size: var(--text-base);
font-weight: var(--font-semibold);
padding: 12px 24px;
border-radius: 8px;
border: 2px solid var(--primary-blue);
cursor: pointer;
transition: all 0.2s ease;
}

.btn-secondary:hover {
background: var(--primary-blue-bg);
border-color: var(--primary-blue-dark);
}

/* Large Button */
.btn-large {
padding: 16px 32px;
font-size: var(--text-lg);
border-radius: 12px;
}

/* Small Button */
.btn-small {
padding: 8px 16px;
font-size: var(--text-sm);
border-radius: 6px;
}

/* Icon Button */
.btn-icon {
width: 40px;
height: 40px;
padding: 0;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
}
Cards (카드)
css/* Base Card */
.card {
background: var(--bg-primary);
border-radius: 16px;
padding: 24px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
transition: all 0.3s ease;
}

.card:hover {
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
transform: translateY(-4px);
}

/* Blue Card (당첨번호 카드) */
.card-blue {
background: var(--gradient-card);
color: var(--text-inverse);
border-radius: 16px;
padding: 32px;
box-shadow: 0 4px 16px rgba(0, 102, 255, 0.2);
}

/* Info Card */
.card-info {
background: var(--bg-tertiary);
border-radius: 12px;
padding: 20px;
border-left: 4px solid var(--primary-blue);
}
Lottery Ball (로또 번호 볼)
css/* Base Ball Style */
.lottery-ball {
width: 48px;
height: 48px;
border-radius: 50%;
display: inline-flex;
align-items: center;
justify-content: center;
font-family: var(--font-family-number);
font-size: 20px;
font-weight: var(--font-bold);
color: var(--text-inverse);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
position: relative;
}

.lottery-ball::before {
content: '';
position: absolute;
top: 10%;
left: 20%;
width: 30%;
height: 30%;
background: rgba(255, 255, 255, 0.3);
border-radius: 50%;
filter: blur(4px);
}

/* Ball Colors by Number Range */
.lottery-ball.range-1-10 { background: var(--ball-red); }
.lottery-ball.range-11-20 { background: var(--ball-blue); }
.lottery-ball.range-21-30 { background: var(--ball-green); }
.lottery-ball.range-31-40 { background: var(--ball-orange); }
.lottery-ball.range-41-45 { background: var(--ball-purple); }
.lottery-ball.bonus { background: var(--ball-yellow); }

/* Ball Sizes */
.lottery-ball-large {
width: 64px;
height: 64px;
font-size: 28px;
}

.lottery-ball-small {
width: 36px;
height: 36px;
font-size: 16px;
}
Input Fields (입력 필드)
css/* Text Input */
.input-text {
width: 100%;
padding: 12px 16px;
font-size: var(--text-base);
border: 2px solid var(--gray-300);
border-radius: 8px;
background: var(--bg-primary);
color: var(--text-primary);
transition: all 0.2s ease;
}

.input-text:focus {
outline: none;
border-color: var(--primary-blue);
box-shadow: 0 0 0 3px var(--primary-blue-bg);
}

.input-text::placeholder {
color: var(--text-tertiary);
}

/* Input with Label */
.input-group {
display: flex;
flex-direction: column;
gap: 8px;
}

.input-label {
font-size: var(--text-sm);
font-weight: var(--font-medium);
color: var(--text-secondary);
}
Badges (배지)
css/* Base Badge */
.badge {
display: inline-flex;
align-items: center;
padding: 4px 12px;
border-radius: 16px;
font-size: var(--text-xs);
font-weight: var(--font-semibold);
}

.badge-primary {
background: var(--primary-blue-bg);
color: var(--primary-blue);
}

.badge-success {
background: #D1FAE5;
color: #065F46;
}

.badge-warning {
background: #FEF3C7;
color: #92400E;
}

.badge-danger {
background: #FEE2E2;
color: #991B1B;
}
Navigation (네비게이션)
css/* Top Navigation */
.nav-main {
background: var(--bg-primary);
border-bottom: 1px solid var(--gray-200);
padding: 16px 0;
}

.nav-link {
color: var(--text-primary);
font-size: var(--text-base);
font-weight: var(--font-medium);
text-decoration: none;
padding: 8px 16px;
border-radius: 8px;
transition: all 0.2s ease;
}

.nav-link:hover {
background: var(--primary-blue-bg);
color: var(--primary-blue);
}

.nav-link.active {
background: var(--primary-blue);
color: var(--text-inverse);
}
Tables (테이블)
css/* Table Container */
.table-container {
background: var(--bg-primary);
border-radius: 12px;
overflow: hidden;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Table */
.table {
width: 100%;
border-collapse: collapse;
}

.table th {
background: var(--bg-tertiary);
color: var(--text-secondary);
font-size: var(--text-sm);
font-weight: var(--font-semibold);
text-align: left;
padding: 12px 16px;
}

.table td {
padding: 16px;
border-bottom: 1px solid var(--gray-200);
color: var(--text-primary);
font-size: var(--text-base);
}

.table tr:hover {
background: var(--bg-secondary);
}

💡 사용 예시
HTML 예시
html<!-- 당첨번호 카드 -->
<div class="card-blue">
  <h2 class="heading-2">1126회 당첨결과</h2>
  <p class="body-small">2025-07-12 추첨</p>

  <div class="lottery-numbers">
    <span class="lottery-ball range-1-10">3</span>
    <span class="lottery-ball range-11-20">16</span>
    <span class="lottery-ball range-11-20">18</span>
    <span class="lottery-ball range-21-30">24</span>
    <span class="lottery-ball range-31-40">40</span>
    <span class="lottery-ball range-41-45">44</span>
    <span class="lottery-ball bonus">21</span>
  </div>

  <div class="prize-info">
    <p class="number-large">2,195,289,199 원</p>
    <p class="caption">1등 당첨금</p>
  </div>
</div>

<!-- 버튼 그룹 -->
<div class="button-group">
  <button class="btn-primary btn-large">1번 판매점</button>
  <button class="btn-secondary btn-large">누적 판매점</button>
</div>

<!-- 입력 폼 -->
<div class="input-group">
  <label class="input-label">회차 번호</label>
  <input type="text" class="input-text" placeholder="010">
</div>
CSS 변수 적용 예시
css/* 전역 스타일 설정 */
:root {
  /* Colors */
  --primary-blue: #0066FF;
  --primary-blue-dark: #0052CC;
  --text-primary: #111827;

/* Typography */
--font-family-kr: 'Pretendard', sans-serif;
--text-base: 16px;
--font-regular: 400;
}

/* 커스텀 컴포넌트 */
.custom-section {
background: var(--primary-blue);
color: var(--text-inverse);
padding: 48px 24px;
border-radius: 16px;
}

.custom-title {
font-size: var(--text-h2);
font-weight: var(--font-bold);
margin-bottom: 16px;
}

📱 반응형 가이드
Breakpoints
css/* Mobile First Approach */
--breakpoint-sm: 640px;   /* 모바일 */
--breakpoint-md: 768px;   /* 태블릿 */
--breakpoint-lg: 1024px;  /* 데스크톱 */
--breakpoint-xl: 1280px;  /* 대형 데스크톱 */

/* 미디어 쿼리 예시 */
@media (min-width: 768px) {
.heading-1 {
font-size: 60px;
}

.card {
padding: 32px;
}
}
모바일 우선 타이포그래피
css/* 모바일 (기본) */
.heading-1 { font-size: 32px; }
.heading-2 { font-size: 24px; }

/* 태블릿 이상 */
@media (min-width: 768px) {
.heading-1 { font-size: 48px; }
.heading-2 { font-size: 36px; }
}

🎯 디자인 원칙
1. 일관성 유지

모든 페이지에서 동일한 컬러 변수 사용
통일된 간격(spacing) 시스템 적용 (8px 단위 권장)

2. 접근성 고려

텍스트와 배경 간 명도 대비 최소 4.5:1 유지
버튼 최소 크기 44x44px 이상

3. 성능 최적화

웹폰트는 필요한 굵기만 로드
CSS 변수로 중복 코드 최소화

4. 유지보수성

컴포넌트 단위로 스타일 분리
명확한 네이밍 컨벤션 사용


📦 구현 권장사항
CSS 파일 구조
styles/
├── variables.css      # 컬러, 폰트 변수
├── typography.css     # 타이포그래피 스타일
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── lottery-ball.css
│   └── tables.css
└── main.css          # 전체 임포트