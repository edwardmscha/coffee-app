# 데이터베이스 연결 오류 해결 가이드

## 문제
비밀번호 인증 실패 오류가 발생합니다.

## 해결 방법

### 방법 1: PostgreSQL 비밀번호 재설정 (권장)

터미널에서 다음 명령어를 실행하세요:

```bash
# 1. PostgreSQL PATH 추가 (아직 안 했다면)
export PATH="/Library/PostgreSQL/18/bin:$PATH"

# 2. PostgreSQL에 접속 시도 (비밀번호 프롬프트가 나올 수 있습니다)
psql -U postgres

# 만약 비밀번호를 모른다면, 비밀번호 없이 접속을 시도하거나
# PostgreSQL.app의 GUI를 통해 접속할 수 있습니다
```

PostgreSQL 프롬프트(`postgres=#`)가 나타나면:

```sql
-- 비밀번호 설정
ALTER USER postgres PASSWORD 'Edy1821712!';

-- 데이터베이스 생성
CREATE DATABASE coffee_order_db;

-- 종료
\q
```

### 방법 2: PostgreSQL.app GUI 사용

1. **Applications 폴더에서 PostgreSQL.app 실행**
2. **SQL 쿼리 에디터 열기**
3. 다음 SQL 실행:

```sql
ALTER USER postgres PASSWORD 'Edy1821712!';
CREATE DATABASE coffee_order_db;
```

### 방법 3: 비밀번호 없이 로컬 접속 허용 (개발 환경용)

보안상 권장하지 않지만, 개발 환경에서 편의를 위해 사용할 수 있습니다.

1. `pg_hba.conf` 파일 찾기:
```bash
export PATH="/Library/PostgreSQL/18/bin:$PATH"
psql -U postgres -c "SHOW hba_file;"
```

2. 파일 편집:
```bash
sudo nano /Library/PostgreSQL/18/data/pg_hba.conf
```

3. 다음 줄을 찾아서:
```
local   all             all                                     md5
host    all             all             127.0.0.1/32            md5
```

다음으로 변경:
```
local   all             all                                     trust
host    all             all             127.0.0.1/32            trust
```

4. PostgreSQL 재시작:
```bash
# PostgreSQL.app 재시작 또는
brew services restart postgresql@18
```

### 방법 4: .env 파일의 비밀번호를 실제 비밀번호로 변경

만약 PostgreSQL의 실제 비밀번호를 알고 있다면, `.env` 파일의 `DB_PASSWORD`를 변경하세요.

## 설정 확인

비밀번호를 설정한 후:

```bash
cd "/Users/edwardcha/Desktop/1000. AI_커서/server"
export PATH="/Library/PostgreSQL/18/bin:$PATH"
./setup-database.sh
```

또는 수동으로:

```bash
export PATH="/Library/PostgreSQL/18/bin:$PATH"
PGPASSWORD='Edy1821712!' psql -U postgres -h localhost -c "SELECT version();"
```

## 서버 시작

데이터베이스 설정이 완료되면:

```bash
cd "/Users/edwardcha/Desktop/1000. AI_커서/server"
INIT_DB=true npm run dev
```

