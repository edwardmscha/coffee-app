# Render.com 배포 체크리스트

## ✅ 배포 전 확인사항

### 1. 코드 준비
- [ ] 모든 코드가 Git에 커밋되어 있는지 확인
- [ ] `.env` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] `node_modules`가 `.gitignore`에 포함되어 있는지 확인

### 2. 데이터베이스 (PostgreSQL)
- [ ] Render.com에서 PostgreSQL 데이터베이스 생성
- [ ] 데이터베이스 연결 정보 확인 (Host, Port, User, Password, Database)

### 3. 백엔드 준비
- [ ] `server/package.json`에 `start` 스크립트가 있는지 확인
- [ ] 환경 변수 목록 확인 (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD)
- [ ] 포트가 환경 변수 또는 기본값으로 설정되어 있는지 확인

### 4. 프런트엔드 준비
- [ ] `UI/package.json`에 `build` 스크립트가 있는지 확인
- [ ] API URL이 환경 변수로 설정 가능한지 확인 (`VITE_API_BASE_URL`)
- [ ] 빌드 출력 디렉토리 확인 (`dist`)

---

## 📋 배포 단계별 체크리스트

### Step 1: PostgreSQL 데이터베이스 생성

1. [ ] Render.com 대시보드 접속
2. [ ] "New +" > "PostgreSQL" 선택
3. [ ] 데이터베이스 이름 입력 (예: `coffee-order-db`)
4. [ ] Database: `coffee_order_db` 입력
5. [ ] Region 선택 (가까운 지역)
6. [ ] Plan 선택 (Free 또는 Starter)
7. [ ] "Create Database" 클릭
8. [ ] 연결 정보 확인 및 저장:
   - [ ] Host
   - [ ] Port (보통 5432)
   - [ ] Database (`coffee_order_db`)
   - [ ] User
   - [ ] Password (Internal Database URL에서 확인)

### Step 2: 백엔드 배포

1. [ ] GitHub 저장소에 코드 푸시
2. [ ] Render.com 대시보드에서 "New +" > "Web Service" 선택
3. [ ] GitHub 저장소 연결
4. [ ] 서비스 설정:
   - [ ] Name: `coffee-order-api`
   - [ ] Region: 데이터베이스와 같은 지역
   - [ ] Branch: `main`
   - [ ] Root Directory: `server`
   - [ ] Runtime: `Node`
   - [ ] Build Command: `npm install`
   - [ ] Start Command: `npm start`
5. [ ] 환경 변수 추가:
   - [ ] `NODE_ENV=production`
   - [ ] `PORT=10000`
   - [ ] `DB_HOST` (PostgreSQL Host)
   - [ ] `DB_PORT=5432`
   - [ ] `DB_NAME=coffee_order_db`
   - [ ] `DB_USER` (PostgreSQL User)
   - [ ] `DB_PASSWORD` (PostgreSQL Password)
6. [ ] "Create Web Service" 클릭
7. [ ] 배포 완료 대기
8. [ ] 백엔드 URL 확인 (예: `https://coffee-order-api.onrender.com`)

### Step 3: 데이터베이스 초기화

1. [ ] Render.com 백엔드 서비스의 "Shell" 탭 열기
2. [ ] 다음 명령어 실행:
   ```bash
   INIT_DB=true npm start
   ```
3. [ ] 초기화 완료 확인 (로그에서 확인)
4. [ ] 서버 재시작 (초기화 후에는 INIT_DB 없이 실행)

또는

1. [ ] 로컬에서 Render.com PostgreSQL에 연결
2. [ ] `server/config/schema.sql` 실행
3. [ ] `server/config/seed.sql` 실행

### Step 4: 프런트엔드 배포

1. [ ] 백엔드 URL 확인 (예: `https://coffee-order-api.onrender.com`)
2. [ ] Render.com 대시보드에서 "New +" > "Static Site" 선택
3. [ ] GitHub 저장소 연결
4. [ ] 서비스 설정:
   - [ ] Name: `coffee-order-app`
   - [ ] Branch: `main`
   - [ ] Root Directory: `UI`
   - [ ] Build Command: `npm install && npm run build`
   - [ ] Publish Directory: `dist`
5. [ ] 환경 변수 추가 (필요한 경우):
   - [ ] `VITE_API_BASE_URL` (백엔드 API URL + `/api`)
6. [ ] "Create Static Site" 클릭
7. [ ] 배포 완료 대기
8. [ ] 프런트엔드 URL 확인

---

## 🧪 배포 후 테스트

### 백엔드 테스트
- [ ] `https://coffee-order-api.onrender.com` 접속
- [ ] `{"message":"커피 주문 앱 서버가 실행 중입니다."}` 응답 확인
- [ ] `https://coffee-order-api.onrender.com/api/menus` 접속
- [ ] 메뉴 목록이 정상적으로 반환되는지 확인

### 프런트엔드 테스트
- [ ] 프런트엔드 URL 접속
- [ ] 메뉴 목록이 정상적으로 표시되는지 확인
- [ ] 장바구니에 메뉴 추가 테스트
- [ ] 주문하기 기능 테스트
- [ ] 관리자 화면 테스트

### 데이터베이스 테스트
- [ ] Render.com PostgreSQL 대시보드에서 테이블 확인
- [ ] 데이터가 정상적으로 저장되는지 확인

---

## 🔧 문제 해결

### 백엔드가 시작되지 않는 경우
- [ ] 로그 확인 (Render.com 서비스의 "Logs" 탭)
- [ ] 환경 변수 확인
- [ ] 데이터베이스 연결 확인
- [ ] 포트 설정 확인

### 프런트엔드가 API를 호출하지 못하는 경우
- [ ] 브라우저 개발자 도구 > Network 탭 확인
- [ ] API URL 확인
- [ ] CORS 오류 확인
- [ ] 환경 변수 `VITE_API_BASE_URL` 확인

### 데이터베이스 연결 오류
- [ ] 환경 변수 확인 (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD)
- [ ] Render.com PostgreSQL이 실행 중인지 확인
- [ ] Internal Database URL 확인

---

## 📝 참고사항

1. **무료 플랜 제한**
   - Render.com 무료 플랜은 15분 비활성 시 sleep 됩니다
   - 첫 요청 시 깨어나는 데 시간이 걸릴 수 있습니다 (최대 30초)

2. **환경 변수 보안**
   - 환경 변수는 Render.com 대시보드에서만 설정
   - `.env` 파일을 Git에 커밋하지 마세요

3. **데이터베이스 초기화**
   - 초기화는 배포 후 한 번만 실행
   - `INIT_DB=true` 환경 변수로 제어

4. **CORS 설정**
   - 현재 모든 도메인 허용
   - 프로덕션에서는 특정 도메인만 허용하는 것을 권장

