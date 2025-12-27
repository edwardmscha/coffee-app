# SQL 명령어 실행 방법

## ⚠️ 중요
`ALTER USER`와 `CREATE DATABASE`는 **SQL 명령어**입니다. 
터미널에서 직접 입력하면 `command not found` 오류가 발생합니다.

SQL 명령어를 실행하려면 **PostgreSQL 클라이언트(psql)**를 사용해야 합니다.

## 올바른 실행 방법

### 방법 1: psql 명령어로 한 줄 실행

```bash
# PostgreSQL PATH 추가
export PATH="/Library/PostgreSQL/18/bin:$PATH"

# 비밀번호 설정 (한 줄로)
psql -U postgres -c "ALTER USER postgres PASSWORD 'Edwardsu486!';"

# 데이터베이스 생성 (한 줄로)
psql -U postgres -c "CREATE DATABASE coffee_order_db;"
```

### 방법 2: psql 접속 후 실행

```bash
# 1. PostgreSQL PATH 추가
export PATH="/Library/PostgreSQL/18/bin:$PATH"

# 2. PostgreSQL에 접속
psql -U postgres

# 3. PostgreSQL 프롬프트(postgres=#)에서 SQL 실행:
ALTER USER postgres PASSWORD 'Edwardsu486!';
CREATE DATABASE coffee_order_db;
\q  # 종료
```

### 방법 3: 자동 스크립트 사용

```bash
cd "/Users/edwardcha/Desktop/1000. AI_커서/server"
export PATH="/Library/PostgreSQL/18/bin:$PATH"
./setup-db-simple.sh
```

### 방법 4: PostgreSQL.app GUI 사용 (가장 쉬움) ⭐

1. Applications > PostgreSQL.app 실행
2. PostgreSQL 18 선택
3. Tools > Query Tool
4. 다음 SQL 입력 후 실행:

```sql
ALTER USER postgres PASSWORD 'Edwardsu486!';
CREATE DATABASE coffee_order_db;
```

## 차이점 이해하기

❌ **잘못된 방법:**
```bash
ALTER USER postgres PASSWORD 'Edwardsu486!';  # 터미널에서 직접 실행 ❌
```

✅ **올바른 방법:**
```bash
psql -U postgres -c "ALTER USER postgres PASSWORD 'Edwardsu486!';"  # psql을 통해 실행 ✅
```

또는

```bash
psql -U postgres  # 접속
# postgres=# 프롬프트에서
ALTER USER postgres PASSWORD 'Edwardsu486!';  # SQL 실행 ✅
```


