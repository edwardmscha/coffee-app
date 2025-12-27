# Render.com 배포 가이드

## 배포 순서

### 1단계: PostgreSQL 데이터베이스 생성 (Render.com)

1. **Render.com 대시보드 접속**
   - https://dashboard.render.com 접속
   - 로그인 또는 회원가입

2. **새 PostgreSQL 데이터베이스 생성**
   - "New +" 버튼 클릭
   - "PostgreSQL" 선택
   - 다음 정보 입력:
     - **Name**: `coffee-order-db` (또는 원하는 이름)
     - **Database**: `coffee_order_db`
     - **User**: 자동 생성 (또는 `postgres`)
     - **Region**: 가장 가까운 지역 선택 (예: Singapore)
     - **PostgreSQL Version**: 최신 버전 (14 이상 권장)
     - **Plan**: Free (개발용) 또는 Starter (프로덕션용)
   - "Create Database" 클릭

3. **데이터베이스 정보 확인**
   - 생성 후 "Connections" 탭에서 다음 정보 확인:
     - **Host**: `dpg-xxxxx-a.singapore-postgres.render.com`
     - **Port**: `5432`
     - **Database**: `coffee_order_db`
     - **User**: 생성된 사용자 이름
     - **Password**: 자동 생성된 비밀번호 (Internal Database URL에서 확인)
   - ⚠️ **중요**: 이 정보는 나중에 환경 변수로 사용됩니다!

4. **데이터베이스 초기화 (스키마 및 데이터)**
   - 로컬에서 PostgreSQL 클라이언트를 사용하여 스키마와 초기 데이터 삽입
   - 또는 Render.com의 "Shell" 탭에서 직접 실행

---

### 2단계: 백엔드 배포 (Render.com)

#### 2-1. 필요한 파일 준비

1. **`server/render.yaml` 파일 생성** (선택사항, 자동 배포용)

2. **환경 변수 확인**
   - `.env` 파일의 내용을 참고하여 Render.com 환경 변수로 설정

#### 2-2. GitHub에 코드 푸시

```bash
# Git 저장소 초기화 (아직 안 했다면)
cd "/Users/edwardcha/Desktop/1000. AI_커서"
git init
git add .
git commit -m "Initial commit"
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

#### 2-3. Render.com에서 Web Service 생성

1. **Render.com 대시보드에서 "New +" 클릭**
   - "Web Service" 선택

2. **GitHub 저장소 연결**
   - "Connect GitHub" 클릭
   - 저장소 선택
   - "Connect" 클릭

3. **서비스 설정**
   - **Name**: `coffee-order-api` (또는 원하는 이름)
   - **Region**: 데이터베이스와 같은 지역 선택
   - **Branch**: `main` (또는 기본 브랜치)
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **환경 변수 설정**
   - "Environment" 섹션에서 "Add Environment Variable" 클릭
   - 다음 변수 추가:
     ```
     NODE_ENV=production
     PORT=10000
     DB_HOST=<PostgreSQL Host>
     DB_PORT=5432
     DB_NAME=coffee_order_db
     DB_USER=<PostgreSQL User>
     DB_PASSWORD=<PostgreSQL Password>
     ```
   - ⚠️ **중요**: PostgreSQL 정보는 1단계에서 생성한 데이터베이스 정보 사용

5. **서비스 생성**
   - "Create Web Service" 클릭

#### 2-4. 데이터베이스 초기화

서버가 시작되면 데이터베이스 초기화가 필요합니다:

1. **Render.com Shell 사용**
   - 백엔드 서비스의 "Shell" 탭 클릭
   - 다음 명령어 실행:
   ```bash
   export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"
   INIT_DB=true npm start
   ```

2. **또는 로컬에서 직접 초기화**
   - Render.com의 Internal Database URL을 사용하여 로컬에서 초기화

#### 2-5. 백엔드 URL 확인

- 서비스가 배포되면 "Settings" 탭에서 URL 확인
- 예: `https://coffee-order-api.onrender.com`

---

### 3단계: 프런트엔드 배포 (Render.com)

#### 3-1. 환경 변수 설정

1. **`UI/.env.production` 파일 생성** (또는 Render.com 환경 변수 사용)
   ```env
   VITE_API_BASE_URL=https://coffee-order-api.onrender.com/api
   ```

#### 3-2. API URL 업데이트

1. **`UI/src/utils/api.js` 파일 확인**
   - 개발 환경과 프로덕션 환경을 구분하도록 수정 필요

#### 3-3. GitHub에 푸시 (이미 했다면 생략)

```bash
git add .
git commit -m "Add frontend for deployment"
git push
```

#### 3-4. Render.com에서 Static Site 생성

1. **Render.com 대시보드에서 "New +" 클릭**
   - "Static Site" 선택

2. **GitHub 저장소 연결**
   - "Connect GitHub" 클릭
   - 저장소 선택

3. **서비스 설정**
   - **Name**: `coffee-order-app` (또는 원하는 이름)
   - **Branch**: `main`
   - **Root Directory**: `UI`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **환경 변수 설정** (필요한 경우)
   - `VITE_API_BASE_URL`: 백엔드 API URL

5. **서비스 생성**
   - "Create Static Site" 클릭

---

## 배포 후 확인사항

### 1. 백엔드 확인
- https://coffee-order-api.onrender.com 접속
- `{"message":"커피 주문 앱 서버가 실행 중입니다."}` 메시지 확인
- https://coffee-order-api.onrender.com/api/menus 접속하여 메뉴 목록 확인

### 2. 프런트엔드 확인
- 배포된 프런트엔드 URL 접속
- 메뉴 목록이 정상적으로 표시되는지 확인
- 주문 기능 테스트

### 3. 데이터베이스 확인
- Render.com PostgreSQL 대시보드에서 테이블 확인
- 데이터가 정상적으로 저장되는지 확인

---

## 주의사항

1. **환경 변수 보안**
   - `.env` 파일은 Git에 커밋하지 마세요
   - Render.com 환경 변수에 직접 입력

2. **데이터베이스 초기화**
   - 배포 후 한 번만 실행
   - `INIT_DB=true` 환경 변수로 제어

3. **CORS 설정**
   - 백엔드에서 프런트엔드 도메인을 허용하도록 설정 확인

4. **무료 플랜 제한**
   - Render.com 무료 플랜은 15분 비활성 시 자동으로 sleep 됩니다
   - 첫 요청 시 깨어나는 데 시간이 걸릴 수 있습니다

---

## 문제 해결

### 백엔드가 시작되지 않는 경우
- 로그 확인: Render.com 서비스의 "Logs" 탭
- 환경 변수 확인
- 데이터베이스 연결 확인

### 프런트엔드가 API를 호출하지 못하는 경우
- API URL 확인
- CORS 설정 확인
- 네트워크 탭에서 오류 확인

