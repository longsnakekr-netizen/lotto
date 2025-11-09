# 로또라운지 웹사이트 프로젝트 스펙

## 📋 프로젝트 개요
로또 번호 예측 및 분석 서비스를 제공하는 웹사이트

## 🛠 기술 스택
- **HTML5**: 시맨틱 마크업
- **Tailwind CSS**: 스타일링 프레임워크 (CDN)
- **jQuery**: DOM 조작 및 컴포넌트 로딩 (CDN)
- **GSAP + ScrollTrigger**: 고급 애니메이션 및 스크롤 인터랙션 (CDN)

## 🎨 디자인 시스템
`DESIGN_SYSTEM_GUIDE.md` 참조
- Primary Color: #0066FF (블루)
- 로또 볼 색상: 번호대별 차등 적용
- Typography: Pretendard (한글), Roboto (숫자)
- 컴포넌트 기반 디자인

## 📁 디렉토리 구조
```
lotto/
├── index.html                 # 메인 페이지
├── analysis.html              # 분석연구실 페이지
├── community.html             # 커뮤니티 페이지
├── mypage.html                # 마이페이지
├── assets/
│   ├── css/
│   │   ├── tailwind.config.js # Tailwind 설정
│   │   └── custom.css         # 커스텀 스타일
│   ├── js/
│   │   ├── components.js      # 컴포넌트 로더
│   │   ├── animations.js      # 애니메이션
│   │   └── utils.js           # 유틸리티 함수
│   └── images/               # 이미지 파일
├── components/
│   ├── header.html           # 헤더 컴포넌트
│   ├── navigation.html       # 네비게이션 메뉴
│   ├── footer.html           # 푸터
│   ├── floating-left.html    # 왼쪽 플로팅 메뉴
│   ├── floating-right.html   # 오른쪽 플로팅/스티키 메뉴
│   └── ui/
│       ├── lottery-ball.html # 로또 볼 컴포넌트
│       ├── card.html         # 카드 컴포넌트
│       ├── button.html       # 버튼 컴포넌트
│       └── table.html        # 테이블 컴포넌트
└── DESIGN_SYSTEM_GUIDE.md    # 디자인 시스템 가이드
```

## 🧩 컴포넌트 구조

### 1. 공통 컴포넌트 (모듈화)
모든 페이지에서 재사용 가능하도록 설계

#### Header (`components/header.html`)
- 로고
- 마이페이지 링크
- 로그인/로그아웃 버튼

#### Navigation (`components/navigation.html`)
- 메뉴: 홈, 상품안내, 분석연구실, 커뮤니티, 마이페이지
- 활성 메뉴 하이라이팅 (active state)
- 스티키 내비게이션 (스크롤 시 상단 고정)

#### Footer (`components/footer.html`)
- 회사 정보
- 고객센터 정보
- 서비스 이용약관 링크

#### Floating Left Menu (`components/floating-left.html`)
- 왼쪽 고정 플로팅 메뉴
- "빠르고 정확하게 당첨 예상번호 받아보기"
- 휴대폰 번호 입력 폼
- 항상 화면에 고정 (position: fixed)

#### Floating Right Menu (`components/floating-right.html`)
- 오른쪽 스티키 메뉴
- "다이아 무료상담 문의"
- 회차 입력 및 1등 번호찾기
- 스크롤 시 상단에 고정 (position: sticky)

### 2. UI 컴포넌트 (재사용)

#### Lottery Ball Component
- 번호별 색상 자동 적용
- 크기 옵션: small, medium, large
- 보너스 볼 스타일 지원

#### Card Component
- 기본 카드 (white background)
- 블루 카드 (gradient background)
- 인포 카드 (left border accent)
- hover 효과 포함

#### Button Component
- Primary 버튼 (파란색)
- Secondary 버튼 (테두리)
- 크기: small, medium, large
- Icon 버튼 지원

#### Table Component
- 헤더 스타일
- 행 hover 효과
- 반응형 테이블 (모바일 대응)

## 📄 페이지 구성

### 1. 메인 페이지 (`index.html`)
**구성 요소:**
- Header
- Navigation (sticky)
- Hero Section
  - 자동 스와이프 슬라이더 (4개 슬라이드)
  - 이미지 + 텍스트 조합
  - 인디케이터 (dots)
- Floating Left Menu
- Floating Right Menu (sticky)
- Latest Results Section (최근 당첨결과)
  - 1126회, 1125회 당첨 정보
  - 로또 볼 디스플레이
  - 당첨금액 표시
- Premium Service Section
  - "골드" 플랜
  - "다이아" 플랜
- Footer

### 2. 분석연구실 페이지 (`analysis.html`)
**구성 요소:**
- Header
- Navigation (active: 분석연구실)
- Tab Navigation
  - 숫자분석
  - 공과 볼의 숫자
  - 당첨 확률 분석
  - 당첨 공색 분석
- Filter Section
  - 회차별 보기 드롭다운
- Results Table
  - 회차, 추첨일, 당첨번호, 보너스, 번호대분포, 저고, 합계, 홀짝, 끝수
- Footer

### 3. 커뮤니티 페이지 (`community.html`)
**구성 요소:**
- Header
- Navigation (active: 커뮤니티)
- Tab Navigation
  - 당첨 게시판
  - 1:1 문의
  - 자주하는 질문
- Board List Table
  - 번호, 제목, 작성자, 등록일, 조회수
- Pagination
- "닫기" 버튼 (글쓰기)
- Footer

### 4. 마이페이지 (`mypage.html`)
**구성 요소:**
- Header
- Navigation (active: 마이페이지)
- Tab Navigation
  - 마이페이지
  - 나의 당첨 페이지
  - 나의 로또 페이지
  - 회원정보 변경
  - 회원탈퇴
- User Info Section
  - 회원등급: Royal special 회원
  - 이름, 닉네임
  - 휴대폰 번호
  - 회원가입일자
  - 서비스 종료일
  - SMS 서비스 잔여 횟수
  - 대박설정기 잔여 횟수
  - SNS 초화 발송요일
  - 조합개수
  - SMS 수신거부
- Footer

## 🎯 주요 기능

### 1. 컴포넌트 로딩 시스템 (jQuery)
```javascript
// components.js
// HTML 파일에서 컴포넌트를 동적으로 로드
$(document).ready(function() {
  $('#header').load('components/header.html');
  $('#navigation').load('components/navigation.html');
  $('#footer').load('components/footer.html');
  $('#floating-left').load('components/floating-left.html');
  $('#floating-right').load('components/floating-right.html');
});
```

### 2. 히어로 슬라이더 (자동 스와이프)
- 4개 슬라이드 자동 전환 (3초 간격)
- 인디케이터 dots
- 좌우 화살표 네비게이션
- 터치/스와이프 지원 (모바일)

### 3. 스티키 네비게이션
- 스크롤 시 상단 고정
- 배경색 변경 (투명 → 흰색)
- 그림자 효과 추가

### 4. 활성 메뉴 하이라이팅
- 현재 페이지에 해당하는 메뉴 active 클래스 추가
- URL 기반 자동 활성화

### 5. 로또 볼 번호별 색상
- 1-10: 빨강
- 11-20: 파랑
- 21-30: 초록
- 31-40: 주황
- 41-45: 보라
- 보너스: 노랑

## 🎨 Tailwind CSS 커스텀 설정

### 색상 확장
디자인 시스템 가이드의 색상을 Tailwind theme에 추가
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#0066FF',
          'blue-dark': '#0052CC',
          'blue-light': '#3385FF',
          'blue-bg': '#E6F0FF',
        },
        accent: {
          red: '#FF3B30',
          green: '#34C759',
          yellow: '#FFD60A',
        },
        ball: {
          red: '#E63946',
          blue: '#457B9D',
          green: '#2A9D8F',
          orange: '#E76F51',
          purple: '#8B5CF6',
          yellow: '#F4A261',
        }
      },
      fontFamily: {
        'kr': ['Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', 'sans-serif'],
        'number': ['Roboto', 'SF Pro Display', 'sans-serif'],
      }
    }
  }
}
```

## 📱 반응형 디자인
- Mobile First 접근
- Breakpoints:
  - sm: 640px (모바일)
  - md: 768px (태블릿)
  - lg: 1024px (데스크톱)
  - xl: 1280px (대형 데스크톱)

## ⚡ 애니메이션 (GSAP + ScrollTrigger)
- **GSAP Core**: 페이드, 슬라이드, 스케일 애니메이션
- **ScrollTrigger**: 스크롤 기반 인터랙션
  - 요소 등장 애니메이션
  - 스크롤 진행도 기반 애니메이션
  - 패럴랙스 효과
- **Timeline**: 복잡한 시퀀스 애니메이션
- **Easing**: 다양한 이징 함수 지원

## 🔧 개발 가이드라인

### 코드 스타일
- 간단하고 읽기 쉬운 코드 작성
- 주석으로 섹션 명확히 구분
- 일관된 네이밍 컨벤션
- 재사용 가능한 함수/컴포넌트 우선

### 성능 최적화
- 이미지 최적화 (webp 사용 권장)
- CSS/JS 파일 최소화
- 컴포넌트 lazy loading 고려
- 불필요한 라이브러리 배제

### 접근성
- 시맨틱 HTML 태그 사용
- alt 텍스트 필수
- 키보드 네비게이션 지원
- 적절한 color contrast

## 📝 TODO
- [ ] 디렉토리 구조 생성
- [ ] Tailwind CSS 설정
- [ ] 공통 컴포넌트 개발
- [ ] UI 컴포넌트 개발
- [ ] jQuery 유틸리티 스크립트
- [ ] 메인 페이지 구현
- [ ] 분석연구실 페이지 구현
- [ ] 커뮤니티 페이지 구현
- [ ] 마이페이지 구현
- [ ] 반응형 테스트
- [ ] 브라우저 호환성 테스트

## 📚 참고 문서
- DESIGN_SYSTEM_GUIDE.md
- Tailwind CSS 공식 문서: https://tailwindcss.com
- jQuery 공식 문서: https://jquery.com
- GSAP 공식 문서: https://greensock.com/docs/
- ScrollTrigger 문서: https://greensock.com/docs/v3/Plugins/ScrollTrigger

## 📦 CDN 링크
```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- GSAP + ScrollTrigger -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js"></script>
```
