# 로또라운지 웹사이트

로또 번호 예측 및 분석 서비스를 제공하는 웹사이트입니다.

## 기술 스택
- HTML5
- Tailwind CSS
- jQuery
- Vanilla JavaScript

## 프로젝트 구조
```
lotto/
├── index.html                 # 메인 페이지
├── analysis.html              # 분석연구실
├── community.html             # 커뮤니티
├── mypage.html                # 마이페이지
├── assets/                    # 에셋 파일
│   ├── css/                   # 스타일 파일
│   ├── js/                    # 자바스크립트 파일
│   └── images/                # 이미지 파일
├── components/                # 재사용 가능한 컴포넌트
│   └── ui/                    # UI 컴포넌트
├── DESIGN_SYSTEM_GUIDE.md     # 디자인 시스템 가이드
└── SPEC.md                    # 프로젝트 스펙
```

## 시작하기

### ⚠️ 중요: 반드시 웹 서버를 통해 실행하세요!

이 프로젝트는 컴포넌트(헤더, 네비게이션, 푸터 등)를 동적으로 로드하기 때문에 **반드시 웹 서버를 통해 실행**해야 합니다.

HTML 파일을 직접 더블클릭하여 브라우저에서 열면 CORS 정책으로 인해 헤더, 네비게이션, 푸터가 표시되지 않습니다.

### 1. 로컬 웹 서버 실행

#### 방법 1: Python 내장 서버 (권장)
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### 방법 2: Node.js npx serve
```bash
npx serve
```

#### 방법 3: VS Code Live Server
1. VS Code에서 "Live Server" 확장 설치
2. index.html 파일에서 우클릭 → "Open with Live Server"

#### 방법 4: PHP 내장 서버
```bash
php -S localhost:8000
```

### 2. 브라우저에서 확인
```
http://localhost:8000
```

## 문서
- [프로젝트 스펙](SPEC.md)
- [디자인 시스템 가이드](DESIGN_SYSTEM_GUIDE.md)

## 주요 기능
- 로또 번호 예측
- 당첨 결과 조회
- 통계 분석
- 커뮤니티 게시판
- 마이페이지

## 개발 가이드
자세한 개발 가이드는 [SPEC.md](SPEC.md)를 참조하세요.
# lotto
