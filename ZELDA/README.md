## 🛡️ Web Security Learning Platform
- SQL Injection, XSS, CSRF 등 주요 웹 보안 취약점을 단계별로 학습하고 실습할 수 있는 대화형 보안 교육 플랫폼입니다.

## 🚀 Key Features
# 1. 단계별 학습 시스템 (Progressive Learning)
사용자가 체계적으로 보안 지식을 습득할 수 있도록 [이론 학습 → 취약점 실습 → 검증] 프로세스를 제공합니다.

레벨 접근 제어: 이전 레벨의 FLAG를 획득해야만 다음 단계가 해금되는 단계별 잠금 시스템.

학습 가이드: 텍스트와 예시 코드를 활용하여 공격 기법의 원리와 방어 전략 설명.

실습 시뮬레이션: 실제 취약점이 존재하는 환경을 구축하여 사용자가 직접 공격을 시도하고 FLAG를 획득하는 인터랙티브 환경 제공.

외부 API 연동: Level 3(CSRF) 실습 시 실제 환율 Open API를 연동하여 실무에 가까운 시나리오 구성.

# 2. 사용자 관리 및 보안 (User Management & Auth)
Mock API를 활용하여 서버 없이도 정교한 유저 경험과 보안 상태 저장을 구현했습니다.

Auth Flow: 회원가입, 로그인부터 유저 프로필 수정/삭제까지 이어지는 Account CRUD 완성.

진행 사항 저장: 유저별 스테이지 완료 상태와 획득한 FLAG 정보를 Mock API에 동기화하여 유지.

보안 적용: 스테이지 통과용 FLAG 및 유저 비밀번호 암호화 처리 로직 구현.

# 3. 고도화된 UI/UX (Advanced Navigation)
사용자가 학습 흐름을 놓치지 않도록 직관적인 인터페이스를 설계했습니다.

Dynamic Header: 로그인 상태에 따라 '로그인/회원가입'과 '프로필/로그아웃' 메뉴가 유동적으로 전환.

Interactive Sidebar: 본문 스크롤 위치를 감지하여 현재 목차를 강조(Scroll Spy)하고, 클릭 시 즉시 이동(Anchor Navigation) 기능 제공.

Quick Access: 이론 학습 중 언제든 실습 화면으로 전환할 수 있는 CTA 버튼 배치로 학습 동선 최적화.