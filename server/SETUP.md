# 데이터베이스 설정 가이드

## 문제 해결: 데이터베이스 연결 오류

현재 "password authentication failed" 오류가 발생하고 있습니다. 다음 단계를 따라 해결하세요.

### 1. PostgreSQL 서비스 확인

```bash
# PostgreSQL이 실행 중인지 확인
brew services list | grep postgres

# PostgreSQL 시작 (실행 중이 아닌 경우)
brew services start postgresql@14  # 또는 설치된 버전
```

### 2. PostgreSQL 비밀번호 확인/설정

#### 옵션 A: 비밀번호 없이 연결 시도 (로컬 개발 환경)

`.env` 파일에서 비밀번호를 비워두고, PostgreSQL의 `pg_hba.conf` 파일을 수정하여 로컬 연결을 `trust` 방식으로 변경할 수 있습니다:

```bash
# pg_hba.conf 파일 위치 찾기
psql -U postgres -c "SHOW hba_file;"

# 파일 편집 (일반적으로 /usr/local/var/postgres/pg_hba.conf)
# 다음 줄을 찾아서:
# local   all             all                                     md5
# 또는
# host    all             all             127.0.0.1/32            md5
# 
# 다음으로 변경:
# local   all             all                                     trust
# host    all             all             127.0.0.1/32            trust

# PostgreSQL 재시작
brew services restart postgresql@14
```

#### 옵션 B: 비밀번호 설정

```bash
# PostgreSQL에 접속 (비밀번호 없이 또는 현재 비밀번호로)
psql -U postgres

# 비밀번호 설정
ALTER USER postgres PASSWORD '원하는비밀번호';

# .env 파일의 DB_PASSWORD를 위에서 설정한 비밀번호로 변경
```

### 3. 데이터베이스 생성

```bash
# PostgreSQL에 접속
psql -U postgres

# 데이터베이스 생성
CREATE DATABASE coffee_order_db;

# 종료
\q
```

### 4. 서버 재시작

```bash
cd server
INIT_DB=true npm run dev
```

## 빠른 테스트

데이터베이스 연결을 테스트하려면:

```bash
cd server
node check-db.js
```

