# 데이터베이스 설정 방법

## 문제
터미널에서 SQL 명령어를 직접 입력하면 `command not found` 오류가 발생합니다.

**이유:** `ALTER USER`와 `CREATE DATABASE`는 SQL 명령어이므로, PostgreSQL 클라이언트(`psql`)를 통해 실행해야 합니다.

## 해결 방법 (3가지)

### 방법 1: psql로 직접 실행 (터미널에서)

터미널에서 다음 명령어를 **한 줄씩** 실행하세요:

```bash
# 1. PostgreSQL PATH 추가
export PATH="/Library/PostgreSQL/18/bin:$PATH"

# 2. 비밀번호 설정 (한 줄로 실행)
psql -U postgres -c "ALTER USER postgres PASSWORD 'Edwardsu486!';"

# 3. 데이터베이스 생성 (한 줄로 실행)
psql -U postgres -c "CREATE DATABASE coffee_order_db;"
```

**참고:** 비밀번호를 입력하라는 프롬프트가 나타날 수 있습니다. 현재 PostgreSQL 비밀번호를 입력하세요.

### 방법 2: psql 접속 후 실행 (대화형)

```bash
# 1. PostgreSQL PATH 추가
export PATH="/Library/PostgreSQL/18/bin:$PATH"

# 2. PostgreSQL에 접속
psql -U postgres

# 3. PostgreSQL 프롬프트(postgres=#)가 나타나면 다음 SQL 명령어를 입력:
ALTER USER postgres PASSWORD 'Edwardsu486!';
CREATE DATABASE coffee_order_db;

# 4. 종료
\q
```

### 방법 3: PostgreSQL.app GUI 사용 (가장 쉬움) ⭐

1. **Applications 폴더에서 PostgreSQL.app 실행**
2. 왼쪽 사이드바에서 **"PostgreSQL 18"** 선택
3. 상단 메뉴: **Tools** > **Query Tool** 클릭
4. 다음 SQL을 입력하고 실행 (Cmd+Enter):

```sql
ALTER USER postgres PASSWORD 'Edwardsu486!';
CREATE DATABASE coffee_order_db;
```

## 완료 후 확인

설정이 완료되었는지 확인:

```bash
export PATH="/Library/PostgreSQL/18/bin:$PATH"

# 연결 테스트
PGPASSWORD='Edwardsu486!' psql -U postgres -h localhost -c "SELECT version();"
```

성공하면 PostgreSQL 버전 정보가 표시됩니다.

## 다음 단계

데이터베이스 설정이 완료되면:

```bash
cd "/Users/edwardcha/Desktop/1000. AI_커서/server"
export PATH="/Library/PostgreSQL/18/bin:$PATH"
INIT_DB=true npm run dev
```


