# Render.com 배포 단계별 가이드

## 🚀 배포 순서 요약

```
1. PostgreSQL 데이터베이스 생성 (Render.com)
   ↓
2. 백엔드 배포 (Render.com Web Service)
   ↓
3. 데이터베이스 초기화
   ↓
4. 프런트엔드 배포 (Render.com Static Site)
```

---

## 1단계: PostgreSQL 데이터베이스 생성

### Render.com에서 데이터베이스 생성

1. **Render.com 대시보드 접속**
   - https://dashboard.render.com 접속
   - 로그인 또는 회원가입

2. **새 PostgreSQL 데이터베이스 생성**
   - 우측 상단 "New +" 버튼 클릭
   - "PostgreSQL" 선택

3. **데이터베이스 정보 입력**
   ```
   Name: coffee-order-db
   Database: coffee_order_db
   User: (자동 생성 또는 postgres)
   Region: Singapore (또는 가까운 지역)
   PostgreSQL Version: 14 이상
   Plan: Free (개발용) 또는 Starter (프로덕션용)
   ```

4. **생성 완료 후 연결 정보 확인**
   - "Connections" 탭에서 다음 정보 확인:
     - **Host**: `dpg-xxxxx-a.singapore-postgres.render.com`
     - **Port**: `5432`
     - **Database**: `coffee_order_db`
     - **User**: 생성된 사용자
     - **Password**: Internal Database URL에서 확인
   - ⚠️ **이 정보는 2단계에서 환경 변수로 사용됩니다!**

---

## 2단계: 백엔드 배포

### GitHub에 코드 푸시 (아직 안 했다면)

```bash
cd "/Users/edwardcha/Desktop/1000. AI_커서"
git init
git add .
git commit -m "Initial commit for deployment"
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

### Render.com에서 Web Service 생성

1. **Render.com 대시보드**
   - "New +" > "Web Service" 선택

2. **GitHub 저장소 연결**
   - "Connect GitHub" 클릭
   - 저장소 선택
   - "Connect" 클릭

3. **서비스 기본 설정**
   ```
   Name: coffee-order-api
   Region: (데이터베이스와 같은 지역)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **환경 변수 설정**
   - "Environment" 섹션에서 "Add Environment Variable" 클릭
   - 다음 변수들을 하나씩 추가:
   
   ```
   NODE_ENV = production
   PORT = 10000
   DB_HOST = <1단계에서 확인한 Host>
   DB_PORT = 5432
   DB_NAME = coffee_order_db
   DB_USER = <1단계에서 확인한 User>
   DB_PASSWORD = <1단계에서 확인한 Password>
   ```

5. **서비스 생성**
   - "Create Web Service" 클릭
   - 배포 완료까지 대기 (2-5분)

6. **백엔드 URL 확인**
   - 배포 완료 후 "Settings" 탭에서 URL 확인
   - 예: `https://coffee-order-api.onrender.com`
   - 브라우저에서 접속하여 `{"message":"커피 주문 앱 서버가 실행 중입니다."}` 확인

---

## 3단계: 데이터베이스 초기화

### 방법 1: Render.com Shell 사용 (권장)

1. **백엔드 서비스의 Shell 탭 열기**
   - Render.com 대시보드에서 백엔드 서비스 선택
   - "Shell" 탭 클릭

2. **데이터베이스 초기화 실행**
   ```bash
   INIT_DB=true npm start
   ```
   - 초기화 완료 후 Ctrl+C로 중지
   - 서버가 자동으로 재시작됨

### 방법 2: 로컬에서 직접 초기화

1. **Render.com Internal Database URL 사용**
   - PostgreSQL 데이터베이스의 "Connections" 탭
   - "Internal Database URL" 복사

2. **로컬에서 연결**
   ```bash
   cd "/Users/edwardcha/Desktop/1000. AI_커서/server"
   # Internal Database URL을 .env 파일에 설정
   psql <INTERNAL_DATABASE_URL>
   ```

3. **스키마 및 데이터 삽입**
   ```sql
   -- schema.sql 내용 실행
   -- seed.sql 내용 실행
   ```

---

## 4단계: 프런트엔드 배포

### 1. API URL 확인

- 백엔드 URL + `/api`
- 예: `https://coffee-order-api.onrender.com/api`

### 2. Render.com에서 Static Site 생성

1. **Render.com 대시보드**
   - "New +" > "Static Site" 선택

2. **GitHub 저장소 연결**
   - "Connect GitHub" 클릭
   - 같은 저장소 선택
   - "Connect" 클릭

3. **서비스 설정**
   ```
   Name: coffee-order-app
   Branch: main
   Root Directory: UI
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. **환경 변수 설정** (선택사항)
   - "Environment" 섹션에서 추가:
   ```
   VITE_API_BASE_URL = https://coffee-order-api.onrender.com/api
   ```
   - ⚠️ **주의**: 환경 변수 이름은 `VITE_`로 시작해야 합니다!

5. **서비스 생성**
   - "Create Static Site" 클릭
   - 배포 완료까지 대기 (2-5분)

6. **프런트엔드 URL 확인**
   - 배포 완료 후 URL 확인
   - 예: `https://coffee-order-app.onrender.com`

---

## ✅ 배포 확인

### 백엔드 확인
- [ ] `https://coffee-order-api.onrender.com` 접속
- [ ] `{"message":"커피 주문 앱 서버가 실행 중입니다."}` 확인
- [ ] `https://coffee-order-api.onrender.com/api/menus` 접속
- [ ] 메뉴 목록 JSON 확인

### 프런트엔드 확인
- [ ] 프런트엔드 URL 접속
- [ ] 메뉴 목록이 표시되는지 확인
- [ ] 브라우저 개발자 도구 > Console 확인 (오류 없음)
- [ ] 브라우저 개발자 도구 > Network 확인 (API 호출 성공)

### 기능 테스트
- [ ] 메뉴 선택 및 장바구니 추가
- [ ] 주문하기 버튼 클릭
- [ ] 주문 완료 확인
- [ ] 관리자 화면 접속 및 주문 확인

---

## 🔧 문제 해결

### 백엔드가 시작되지 않는 경우

1. **로그 확인**
   - Render.com 서비스 > "Logs" 탭
   - 오류 메시지 확인

2. **환경 변수 확인**
   - "Environment" 탭에서 모든 변수가 올바르게 설정되었는지 확인

3. **데이터베이스 연결 확인**
   - 로그에서 데이터베이스 연결 오류 확인
   - 환경 변수 값 재확인

### 프런트엔드가 API를 호출하지 못하는 경우

1. **브라우저 개발자 도구 확인**
   - Console 탭: JavaScript 오류 확인
   - Network 탭: API 요청 상태 확인

2. **API URL 확인**
   - 환경 변수 `VITE_API_BASE_URL` 설정 확인
   - 또는 `UI/src/utils/api.js`의 기본값 확인

3. **CORS 오류 확인**
   - Network 탭에서 CORS 관련 오류 확인
   - 백엔드 CORS 설정 확인

### 데이터베이스 연결 오류

1. **환경 변수 재확인**
   - DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
   - Render.com PostgreSQL의 실제 값과 일치하는지 확인

2. **PostgreSQL 상태 확인**
   - Render.com PostgreSQL 대시보드에서 상태 확인
   - "Available" 상태인지 확인

---

## 📝 추가 참고사항

### 무료 플랜 제한사항

- **Sleep 모드**: 15분 비활성 시 자동 sleep
- **첫 요청 지연**: Sleep 상태에서 깨어날 때 최대 30초 소요
- **월 제한**: 일정 트래픽 제한 (충분히 테스트용으로 사용 가능)

### 환경 변수 보안

- ✅ `.env` 파일은 Git에 커밋하지 않음
- ✅ Render.com 환경 변수에만 설정
- ✅ 비밀번호는 절대 코드에 포함하지 않음

### 데이터베이스 초기화

- ⚠️ 초기화는 **한 번만** 실행
- ⚠️ 재실행 시 기존 데이터가 삭제될 수 있음
- ✅ `INIT_DB=true` 환경 변수로 제어 가능

---

## 🎉 배포 완료!

모든 단계를 완료하면 커피 주문 앱이 인터넷에서 접근 가능합니다!

- **프런트엔드**: `https://coffee-order-app.onrender.com`
- **백엔드 API**: `https://coffee-order-api.onrender.com`
- **데이터베이스**: Render.com PostgreSQL

문제가 발생하면 로그를 확인하고 위의 문제 해결 가이드를 참고하세요!

