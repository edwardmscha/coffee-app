# 서버 시작 가이드

## 현재 문제
"Load failed" 오류가 발생합니다. 이는 백엔드 서버가 실행되지 않았거나 데이터베이스 연결이 실패했기 때문입니다.

## 해결 단계

### 1단계: PostgreSQL 비밀번호 설정 (필수)

PostgreSQL.app을 사용하여 비밀번호를 설정하세요:

1. **Applications 폴더에서 PostgreSQL.app 실행**
2. 왼쪽 사이드바에서 "PostgreSQL 18" 선택
3. 상단 메뉴: **Tools** > **Query Tool** 클릭
4. 다음 SQL 명령어를 실행:

```sql
ALTER USER postgres PASSWORD 'Edwardsu486!';
CREATE DATABASE coffee_order_db;
```

### 2단계: 서버 시작

터미널에서 다음 명령어를 실행:

```bash
# 서버 폴더로 이동
cd "/Users/edwardcha/Desktop/1000. AI_커서/server"

# PostgreSQL PATH 추가 (아직 안 했다면)
export PATH="/Library/PostgreSQL/18/bin:$PATH"

# 데이터베이스 설정 확인
node check-db.js

# 서버 시작 (데이터베이스 초기화 포함)
INIT_DB=true npm run dev
```

### 3단계: 확인

서버가 정상적으로 시작되면 다음 메시지가 표시됩니다:

```
✅ PostgreSQL 데이터베이스에 연결되었습니다.
📊 데이터베이스 연결 테스트 성공: ...
✅ 데이터베이스 스키마가 생성되었습니다.
✅ 초기 데이터가 삽입되었습니다.
🚀 서버가 포트 3001에서 실행 중입니다.
```

그러면 프런트엔드(http://localhost:5173)에서 메뉴가 정상적으로 로드됩니다.

## 문제 해결

### 비밀번호 설정이 안 되는 경우

PostgreSQL.app이 실행되지 않으면:
1. Applications 폴더에서 PostgreSQL.app을 실행
2. 또는 터미널에서:
   ```bash
   export PATH="/Library/PostgreSQL/18/bin:$PATH"
   psql -U postgres
   # 비밀번호 입력 후
   ALTER USER postgres PASSWORD 'Edwardsu486!';
   CREATE DATABASE coffee_order_db;
   \q
   ```

### 서버가 시작되지 않는 경우

1. 포트 3001이 이미 사용 중인지 확인:
   ```bash
   lsof -ti:3001
   ```
2. 사용 중이면 종료:
   ```bash
   kill -9 $(lsof -ti:3001)
   ```
3. 다시 서버 시작

