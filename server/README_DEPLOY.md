# Render.com 배포 체크리스트

## 배포 전 확인사항

### 1. 환경 변수 준비
다음 환경 변수들을 Render.com에 설정해야 합니다:

- `NODE_ENV`: `production`
- `PORT`: `10000` (Render.com이 자동으로 설정하지만 명시 가능)
- `DB_HOST`: Render.com PostgreSQL 호스트
- `DB_PORT`: `5432`
- `DB_NAME`: `coffee_order_db`
- `DB_USER`: Render.com PostgreSQL 사용자
- `DB_PASSWORD`: Render.com PostgreSQL 비밀번호

### 2. 데이터베이스 초기화

배포 후 데이터베이스를 초기화하려면:

**방법 1: Render.com Shell 사용**
1. Render.com 대시보드에서 백엔드 서비스 선택
2. "Shell" 탭 클릭
3. 다음 명령어 실행:
   ```bash
   INIT_DB=true npm start
   ```
4. 초기화 완료 후 서버 재시작

**방법 2: 로컬에서 초기화**
1. Render.com PostgreSQL의 Internal Database URL 사용
2. 로컬에서 연결하여 스키마 및 데이터 삽입

### 3. CORS 설정 확인

현재 `server/index.js`에서 CORS가 모든 도메인을 허용하도록 설정되어 있습니다:
```javascript
app.use(cors());
```

프로덕션에서는 특정 도메인만 허용하도록 변경하는 것을 권장합니다:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://your-frontend-url.onrender.com'
}));
```

## 배포 순서 요약

1. ✅ PostgreSQL 데이터베이스 생성 (Render.com)
2. ✅ 백엔드 Web Service 생성 및 배포
3. ✅ 데이터베이스 초기화
4. ✅ 프런트엔드 Static Site 생성 및 배포
5. ✅ 프런트엔드 환경 변수 설정 (API URL)

## 주요 파일

- `server/index.js`: 메인 서버 파일
- `server/config/database.js`: 데이터베이스 연결 설정
- `server/config/initDb.js`: 데이터베이스 초기화 로직
- `server/config/schema.sql`: 데이터베이스 스키마
- `server/config/seed.sql`: 초기 데이터

