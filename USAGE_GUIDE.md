# 로또라운지 사용 가이드

## 📚 목차
1. [프로젝트 실행하기](#프로젝트-실행하기)
2. [파일 구조](#파일-구조)
3. [컴포넌트 사용법](#컴포넌트-사용법)
4. [GSAP 애니메이션 가이드](#gsap-애니메이션-가이드)
5. [커스터마이징](#커스터마이징)
6. [배포](#배포)

---

## 🚀 프로젝트 실행하기

### 1. 로컬 서버 실행

이 프로젝트는 순수 HTML/CSS/JS로 작성되었으므로 로컬 서버가 필요합니다.
(jQuery의 `$.load()` 함수가 컴포넌트를 로드하기 위해 HTTP 프로토콜이 필요)

#### Python 사용 (Python 3 설치 필요)
```bash
cd /Users/jd/code/lotto/lotto
python3 -m http.server 8000
```

#### Node.js 사용
```bash
npx serve
```

#### VS Code Live Server 확장 사용
1. VS Code에서 프로젝트 열기
2. Live Server 확장 설치
3. `index.html` 우클릭 → "Open with Live Server"

### 2. 브라우저에서 확인
```
http://localhost:8000
```

---

## 📁 파일 구조

```
lotto/
├── index.html                    # 메인 페이지
├── analysis.html                 # 분석연구실
├── community.html                # 커뮤니티
├── mypage.html                   # 마이페이지
│
├── assets/
│   ├── css/
│   │   └── custom.css           # 커스텀 스타일
│   ├── js/
│   │   ├── components.js        # 컴포넌트 로더
│   │   └── animations.js        # GSAP 애니메이션
│   └── images/                  # 이미지 파일
│
├── components/
│   ├── header.html              # 헤더 컴포넌트
│   ├── navigation.html          # 네비게이션
│   ├── footer.html              # 푸터
│   ├── floating-left.html       # 왼쪽 플로팅 메뉴
│   └── floating-right.html      # 오른쪽 스티키 메뉴
│
├── DESIGN_SYSTEM_GUIDE.md       # 디자인 가이드
├── SPEC.md                      # 프로젝트 스펙
└── README.md                    # 프로젝트 소개
```

---

## 🧩 컴포넌트 사용법

### 1. 새 페이지 만들기

기본 HTML 템플릿:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>페이지 제목</title>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Tailwind Config (색상 설정) -->
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'primary-blue': '#0066FF',
            'primary-blue-dark': '#0052CC',
            // ... 나머지 색상
          }
        }
      }
    }
  </script>

  <!-- Custom CSS -->
  <link rel="stylesheet" href="assets/css/custom.css">

  <!-- jQuery -->
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

  <!-- GSAP + ScrollTrigger -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/ScrollTrigger.min.js"></script>
</head>
<body class="font-kr bg-gray-50">

  <!-- 헤더 -->
  <div id="header"></div>

  <!-- 네비게이션 -->
  <div id="navigation"></div>

  <!-- 메인 컨텐츠 -->
  <main class="py-12">
    <div class="container mx-auto px-4">
      <!-- 여기에 컨텐츠 작성 -->
    </div>
  </main>

  <!-- 푸터 -->
  <div id="footer"></div>

  <!-- Scripts -->
  <script src="assets/js/components.js"></script>
  <script src="assets/js/animations.js"></script>

  <script>
    $(document).ready(function() {
      // 페이지별 스크립트
    });
  </script>
</body>
</html>
```

### 2. 로또 볼 생성하기

**단일 로또 볼:**
```javascript
// createLotteryBall(번호, 보너스여부, 크기)
createLotteryBall(3, false, 'medium');  // 일반 볼
createLotteryBall(21, true, 'large');   // 보너스 볼 (큰 크기)
```

**여러 로또 볼:**
```javascript
// createLotteryBalls(번호배열, 보너스번호, 크기)
$('#balls-container').html(
  createLotteryBalls([3, 16, 18, 24, 40, 44], 21, 'medium')
);

// 로또 볼 등장 애니메이션 (선택)
LotteryBallAnimations.appear('#balls-container');
```

### 3. 히어로 슬라이더 사용하기

HTML 구조:
```html
<div id="my-slider" class="relative">
  <div class="slide">슬라이드 1</div>
  <div class="slide hidden">슬라이드 2</div>
  <div class="slide hidden">슬라이드 3</div>

  <!-- 화살표 버튼 -->
  <button class="slider-prev">◀</button>
  <button class="slider-next">▶</button>

  <!-- 인디케이터 -->
  <div class="slider-indicators"></div>
</div>
```

JavaScript 초기화:
```javascript
HeroSlider.init('#my-slider', {
  autoPlay: true,  // 자동 재생
  delay: 3000      // 3초 간격
});
```

### 4. 탭 전환 기능

HTML:
```html
<!-- 탭 버튼 -->
<button class="tab-button active" data-tab="tab1">탭 1</button>
<button class="tab-button" data-tab="tab2">탭 2</button>

<!-- 탭 컨텐츠 -->
<div id="tab1" class="tab-content">내용 1</div>
<div id="tab2" class="tab-content hidden">내용 2</div>
```

JavaScript:
```javascript
$('.tab-button').on('click', function() {
  const targetTab = $(this).data('tab');

  // 탭 버튼 활성화
  $('.tab-button').removeClass('active bg-primary-blue text-white')
                  .addClass('bg-gray-200 text-gray-700');
  $(this).addClass('active bg-primary-blue text-white');

  // 탭 컨텐츠 표시 (GSAP 애니메이션 포함)
  $('.tab-content').addClass('hidden');
  $('#' + targetTab).removeClass('hidden');
});
```

---

## 🎬 GSAP 애니메이션 가이드

### 기본 사용법

#### 1. 스크롤 시 요소 등장 애니메이션

**자동 적용** (`.animate-on-scroll` 클래스만 추가):
```html
<div class="animate-on-scroll">
  이 요소는 스크롤 시 자동으로 등장합니다
</div>
```

**커스텀 애니메이션**:
```javascript
// 페이드 업 애니메이션
ScrollAnimations.fadeUp('.my-element');

// 스케일 업 애니메이션
ScrollAnimations.scaleUp('.my-card');

// 좌측에서 슬라이드 인
ScrollAnimations.slideIn('.my-box', 'left');

// 우측에서 슬라이드 인
ScrollAnimations.slideIn('.my-box', 'right');
```

#### 2. 기본 GSAP 애니메이션

**페이드 인:**
```javascript
gsap.from('.element', {
  opacity: 0,
  duration: 1,
  ease: 'power2.out'
});
```

**슬라이드 업:**
```javascript
gsap.from('.element', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
});
```

**스케일:**
```javascript
gsap.from('.element', {
  scale: 0.5,
  opacity: 0,
  duration: 0.6,
  ease: 'back.out(1.7)'
});
```

#### 3. ScrollTrigger 직접 사용

```javascript
gsap.from('.hero-title', {
  scrollTrigger: {
    trigger: '.hero-title',
    start: 'top 80%',      // 요소 상단이 뷰포트 80% 위치에 도달할 때
    end: 'top 20%',        // 요소 상단이 뷰포트 20% 위치에 도달할 때
    toggleActions: 'play none none reverse',
    // markers: true,       // 디버깅용 마커 (개발 시 활성화)
  },
  opacity: 0,
  y: 100,
  duration: 1,
  ease: 'power2.out'
});
```

#### 4. 타임라인 (Timeline)

여러 애니메이션을 순차적으로 실행:

```javascript
const tl = gsap.timeline();

tl.from('.title', { opacity: 0, y: 50, duration: 0.8 })
  .from('.subtitle', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')  // 0.4초 앞당김
  .from('.button', { scale: 0, duration: 0.4, ease: 'back.out(1.7)' });
```

#### 5. 스태거 (Stagger) 애니메이션

여러 요소를 순차적으로 애니메이션:

```javascript
gsap.from('.list-item', {
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: 0.1,  // 각 요소마다 0.1초 지연
  ease: 'power2.out'
});
```

#### 6. 호버 애니메이션

```javascript
$('.button').on('mouseenter', function() {
  gsap.to(this, {
    scale: 1.1,
    duration: 0.3,
    ease: 'power2.out'
  });
});

$('.button').on('mouseleave', function() {
  gsap.to(this, {
    scale: 1,
    duration: 0.3,
    ease: 'power2.out'
  });
});
```

### 내장 애니메이션 활용

#### 1. 로또 볼 애니메이션

```javascript
// 로또 볼 등장 애니메이션
LotteryBallAnimations.appear('#winning-numbers-1126');

// 호버 애니메이션 (자동 적용됨)
LotteryBallAnimations.setupHoverEffect();
```

#### 2. 카드 호버 애니메이션

```javascript
// 자동으로 모든 .card에 적용됨
CardAnimations.init();
```

### GSAP Easing 함수

자주 사용하는 easing:

- `power1.out` - 부드러운 감속
- `power2.out` - 중간 감속
- `power3.out` - 강한 감속
- `back.out(1.7)` - 튀는 효과
- `elastic.out(1, 0.3)` - 탄성 효과
- `bounce.out` - 바운스 효과

참고: [GSAP Easing Visualizer](https://greensock.com/ease-visualizer)

---

## 🎨 커스터마이징

### 1. 색상 변경

**Tailwind Config 수정:**

각 HTML 파일의 `<script>` 태그 안에서 색상을 변경하세요:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'primary-blue': '#YOUR_COLOR',  // 여기를 변경
      }
    }
  }
}
```

**Custom CSS 수정:**

`assets/css/custom.css` 파일에서 CSS 변수를 변경:

```css
:root {
  --primary-blue: #YOUR_COLOR;
}
```

### 2. 애니메이션 속도 조절

```javascript
// duration 값을 조절
gsap.from('.element', {
  opacity: 0,
  duration: 2,  // 2초로 변경 (기본 1초)
  ease: 'power2.out'
});
```

### 3. ScrollTrigger 트리거 위치 조절

```javascript
scrollTrigger: {
  start: 'top 90%',  // 더 일찍 시작
  end: 'top 10%',    // 더 늦게 끝남
}
```

---

## 🛠 유틸리티 함수

### 숫자 포맷팅
```javascript
formatNumber(1234567);  // "1,234,567"
```

### 날짜 포맷팅
```javascript
formatDate('2025-11-08', 'YYYY-MM-DD');  // "2025-11-08"
formatDate('2025-11-08', 'YYYY.MM.DD');  // "2025.11.08"
```

---

## 📦 배포

### 1. GitHub Pages

```bash
# Git 초기화 (처음만)
git init
git add .
git commit -m "Initial commit"

# GitHub 저장소 연결
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# GitHub Pages 설정
# Settings → Pages → Source: main branch
```

### 2. Netlify / Vercel

1. GitHub에 프로젝트 푸시
2. Netlify/Vercel 대시보드에서 "New Site from Git"
3. 저장소 선택 → 자동 배포

### 3. 일반 웹 호스팅

모든 파일을 FTP로 업로드하면 됩니다.

---

## 🐛 문제 해결

### 컴포넌트가 로드되지 않아요!
- **원인**: jQuery의 `$.load()`는 HTTP 프로토콜이 필요합니다.
- **해결**: 로컬 서버를 실행하세요. (파일을 직접 열면 안 됩니다)

### GSAP 애니메이션이 작동하지 않아요!
- **원인**: GSAP CDN이 로드되지 않았거나 순서가 잘못되었습니다.
- **해결**: `<script>` 태그 순서를 확인하세요:
  1. jQuery
  2. GSAP
  3. ScrollTrigger
  4. components.js
  5. animations.js
  6. 페이지별 스크립트

### ScrollTrigger가 제대로 작동하지 않아요!
- **원인**: 컴포넌트 로드 후 높이가 변경되어 트리거 위치가 맞지 않습니다.
- **해결**: `ScrollTrigger.refresh()` 호출
  ```javascript
  $(document).ready(function() {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });
  ```

### Tailwind 클래스가 적용되지 않아요!
- **원인**: Tailwind CDN이 로드되지 않았거나 클래스명이 잘못되었습니다.
- **해결**:
  - CDN 링크 확인
  - 브라우저 개발자 도구에서 네트워크 탭 확인

---

## 💡 팁

1. **개발 시 브라우저 캐시 지우기**
   - Chrome: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)

2. **GSAP 디버깅**
   - ScrollTrigger 마커 활성화: `markers: true`
   - 브라우저 개발자 도구 (F12) → Console 탭 확인

3. **이미지 추가**
   - `assets/images/` 폴더에 이미지 저장
   - HTML에서 `<img src="assets/images/your-image.jpg">`

4. **반응형 테스트**
   - 브라우저 개발자 도구 → Device Toolbar (Cmd+Shift+M)

5. **GSAP 성능 최적화**
   - `will-change: transform` CSS 속성 사용
   - 가능하면 `transform`과 `opacity`만 애니메이션
   - 너무 많은 요소를 동시에 애니메이션하지 않기

---

## 📚 추가 학습 자료

- **GSAP 공식 문서**: https://greensock.com/docs/
- **ScrollTrigger 문서**: https://greensock.com/docs/v3/Plugins/ScrollTrigger
- **GSAP Cheat Sheet**: https://greensock.com/cheatsheet/
- **Easing Visualizer**: https://greensock.com/ease-visualizer

---

## 📞 지원

문제가 발생하면:
1. SPEC.md 문서 참조
2. DESIGN_SYSTEM_GUIDE.md 참조
3. 브라우저 콘솔 에러 메시지 확인
4. GSAP 공식 문서 참조

---

**Happy Coding with GSAP! 🎉🎬**
