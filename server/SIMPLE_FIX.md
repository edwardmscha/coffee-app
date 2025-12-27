# 간단한 해결 방법

## 현재 상황
PostgreSQL은 실행 중이지만 비밀번호가 맞지 않습니다.

## 가장 간단한 해결 방법

### 단계 1: PostgreSQL.app에서 SQL 실행

1. **Applications 폴더에서 PostgreSQL.app 실행**
2. 왼쪽 사이드바에서 "PostgreSQL 18" (또는 설치된 버전) 선택
3. 상단 메뉴에서 "Tools" > "Query Tool" 클릭
4. 다음 SQL 명령어를 실행:

```sql
-- 비밀번호 설정
ALTER USER postgres PASSWORD 'Edy1821712!';

-- 데이터베이스 생성
CREATE DATABASE coffee_order_db;
```

5. 실행 버튼 클릭 (또는 Cmd+Enter)

### 단계 2: 서버 재시작

터미널에서:

```bash
cd "/Users/edwardcha/Desktop/1000. AI_커서/server"

# PostgreSQL PATH 추가
export PATH="/Library/PostgreSQL/18/bin:$PATH"

# 데이터베이스 연결 테스트
node check-db.js

# 서버 시작
INIT_DB=true npm run dev
```

### 단계 3: 확인

브라우저에서 http://localhost:5173 접속하여 메뉴가 정상적으로 로드되는지 확인하세요.

## 문제가 계속되면

`.env` 파일의 비밀번호를 실제 PostgreSQL 비밀번호로 변경하세요:

```bash
cd "/Users/edwardcha/Desktop/1000. AI_커서/server"
nano .env
# DB_PASSWORD=실제비밀번호 로 변경
```

