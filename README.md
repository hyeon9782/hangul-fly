# 한글 플라이 (Hangul Fly)

3D 한글 조합 타이핑 게임 - 한글날 기념 프로젝트

## 📖 프로젝트 소개

한글날을 기념하여 한글의 자음과 모음 조합 원리를 시각적이고 재미있게 체험할 수 있는 인터랙티브 3D 웹 게임입니다.

3D 공간에서 날아다니는 자음(파란색 육면체)과 모음(빨간색 구체)을 보면서 키보드로 한글 단어를 입력하는 게임입니다.

## 🎮 Phase 1 - 프로토타입 기능

현재 구현된 기능:

- ✅ Three.js 씬 설정 및 3D 렌더링 (@react-three/fiber 사용)
- ✅ 자음/모음 3D 객체 생성 (색상/모양 구분)
  - 자음: 파란색 육면체 (Box)
  - 모음: 빨간색 구체 (Sphere)
- ✅ 랜덤 움직임 애니메이션 구현
  - 사인파 기반 부드러운 움직임
  - 회전 애니메이션
- ✅ 기본 키보드 입력 처리
  - 한글 입력 인식
  - Backspace로 수정
  - Enter로 제출
- ✅ 게임 UI
  - 타이머, 점수, 콤보 표시
  - 입력창
  - 시작 화면

## 🛠 기술 스택

- **React 19** - UI 프레임워크
- **TypeScript** - 타입 안정성
- **@react-three/fiber** - React용 Three.js 렌더러
- **@react-three/drei** - Three.js 헬퍼 라이브러리
- **Three.js** - 3D 그래픽
- **TailwindCSS** - 스타일링
- **Vite** - 빌드 도구

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 을 열어주세요.

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── GameCanvas.tsx      # 3D 캔버스 메인 컴포넌트
│   └── FloatingChar.tsx    # 날아다니는 자음/모음 객체
├── hooks/
│   └── useKeyboardInput.ts # 키보드 입력 훅
├── utils/
│   └── hangul.ts           # 한글 분해/조합 유틸리티
├── types/
│   └── index.ts            # 타입 정의
├── App.tsx                 # 메인 앱 컴포넌트
├── main.tsx                # 엔트리 포인트
└── index.css               # 글로벌 스타일
```

## 🎯 다음 단계 (Phase 2+)

- [ ] 게임 로직 구현 (단어 검증, 점수 계산)
- [ ] 타이머 기능
- [ ] 정답/오답 애니메이션
- [ ] 파티클 이펙트
- [ ] 난이도 설정
- [ ] 랭킹 시스템
- [ ] 사운드 효과

자세한 내용은 [PRD 문서](./docs/PRD.md)를 참고하세요.

## 🎨 게임 방법

1. **게임 시작** 버튼을 클릭
2. 3D 공간에서 날아다니는 자음과 모음을 확인
3. 키보드로 타겟 단어를 입력
4. Enter 키로 제출
5. 제한 시간 내에 최대한 많은 단어를 맞추기!

## 📝 참고 자료

- [Three.js 공식 문서](https://threejs.org/docs/)
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [한글 유니코드 구조](https://www.unicode.org/charts/PDF/UAC00.pdf)

### 커밋 규칙

기능: 새로운 기능 추가
수정: 버그 수정
문서: 문서 수정 (README, 주석 등)
스타일: 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음)
리팩토링: 코드 리팩토링 (기능 변경 없음)
테스트: 테스트 코드 추가/수정
자잘: 빌드 설정, 패키지 매니저 등 (프로덕션 코드 변경 없음)
성능: 성능 개선
CI: CI/CD 관련 변경
빌드: 빌드 시스템 변경
되돌리기: 이전 커밋 되돌리기
