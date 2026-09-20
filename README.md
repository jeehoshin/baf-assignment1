# ☁️ KAIST 디지털금융 MBA - 금융 클라우드 컴퓨팅 개인 과제 1

본 프로젝트는 클라우드 컴퓨팅 실습의 일환으로 제작된 **풀스택 웹 애플리케이션**입니다.  
FastAPI 기반 백엔드 API와 React 기반 프론트엔드를 구축하고, 각각 **Render**와 **Vercel**에 분리 배포하여 클라우드 통신을 구현하였습니다.

---

## 📌 주요 제출 링크 (3가지)

| 구분 | 링크 주소 | 설명 |
| :--- | :--- | :--- |
| **1. GitHub 저장소** | [https://github.com/jeehoshin/baf-assignment1](https://github.com/jeehoshin/baf-assignment1) | 전체 프로젝트 소스 코드 및 문서 |
| **2. Vercel 웹 페이지** | [https://baf-assignment1.vercel.app](https://baf-assignment1.vercel.app) | 개인 소개 및 백엔드 연동 실시간 메모장 |
| **3. Swagger UI (Render)** | [https://baf-assignment1.onrender.com/docs](https://baf-assignment1.onrender.com/docs) | 배포된 FastAPI 대화형 API 테스트 문서 |

---

## 🏗️ 시스템 아키텍처 및 기술 스택

```text
[ 브라우저 (사용자) ]
        │
        ▼
[ 프론트엔드 : Vercel ]
  - React 19 (Vite)
  - 개인 소개 프로필 카드 (다크모드 지원)
  - 비동기 fetch()를 통한 백엔드 API 연동
        │
        │ HTTP / JSON 통신 (REST API)
        ▼
[ 백엔드 : Render ]
  - Python 3 / FastAPI
  - Uvicorn 비동기 웹 서버
  - CORS 미들웨어 적용
  - 인메모리 메모 CRUD 엔드포인트 (/memos)
```

## 📂 프로젝트 구조 (Repository Structure)
  01_assignment1/
├── backend/                  # FastAPI 백엔드
│   ├── main.py               # API 라우트 및 비즈니스 로직
│   └── requirements.txt      # Render 배포용 의존성 명세서
├── frontend/                 # React 프론트엔드
│   ├── src/
│   │   ├── App.jsx           # 개인 소개 + 메모장 통합 UI 컴포넌트
│   │   └── main.jsx
│   ├── .env                  # 백엔드 API 주소 환경변수
│   └── package.json
├── .gitignore                # 가상환경 및 모듈 제외 설정
└── README.md                 # 프로젝트 안내 문서

## 👨‍💻 작성자
이름: 신지호
소속: KAIST 디지털금융 MBA
GitHub: @jeehoshin