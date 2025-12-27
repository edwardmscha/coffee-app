# 시스템 전체 검토 및 테스트 결과

## 현재 상태

### ✅ 확인 완료
1. **백엔드 서버**: 포트 3001에서 실행 중
2. **프런트엔드**: 포트 5173 사용 가능
3. **환경 변수**: .env 파일에 DB 설정 존재
4. **코드 구조**: 프런트엔드, 백엔드, API 연결 코드 정상

### ⚠️ 확인 필요
1. **PostgreSQL 설치**: 설치 위치 확인 필요
2. **데이터베이스 연결**: PostgreSQL이 실행 중인지 확인 필요
3. **데이터베이스 초기화**: 스키마 및 초기 데이터 생성 필요

## PostgreSQL 설치 확인

PostgreSQL이 새로 설치되었다면 다음 중 하나의 방법으로 확인하세요:

### 방법 1: PostgreSQL.app 확인
```bash
ls -la /Applications | grep -i postgres
```

### 방법 2: Homebrew로 설치된 경우
```bash
brew list | grep postgres
```

### 방법 3: 수동 설치 확인
```bash
find /usr/local -name psql 2>/dev/null
find /opt -name psql 2>/dev/null
```

## 다음 단계

### 1. PostgreSQL 설치 확인 및 PATH 설정

PostgreSQL이 설치되어 있다면:

```bash
# PostgreSQL.app 사용 시
export PATH="/Applications/PostgreSQL 18.app/Contents/Versions/latest/bin:$PATH"

# 또는 /Library/PostgreSQL에 설치된 경우
export PATH="/Library/PostgreSQL/18/bin:$PATH"
```

### 2. PostgreSQL 서비스 시작

PostgreSQL.app을 실행하거나:
```bash
# Homebrew로 설치된 경우
brew services start postgresql@18
```

### 3. 데이터베이스 설정

```bash
cd "/Users/edwardcha/Desktop/1000. AI_커서/server"

# PostgreSQL PATH 추가 (위에서 확인한 경로 사용)
export PATH="[PostgreSQL 경로]:$PATH"

# 비밀번호 설정 및 데이터베이스 생성
psql -U postgres -c "ALTER USER postgres PASSWORD 'Edwardsu486!';"
psql -U postgres -c "CREATE DATABASE coffee_order_db;"
```

### 4. 시스템 테스트

```bash
cd "/Users/edwardcha/Desktop/1000. AI_커서/server"
./test-system.sh
```

### 5. 서버 시작 및 데이터베이스 초기화

```bash
cd "/Users/edwardcha/Desktop/1000. AI_커서/server"
export PATH="[PostgreSQL 경로]:$PATH"
INIT_DB=true npm run dev
```

### 6. 프런트엔드 시작

새 터미널에서:
```bash
cd "/Users/edwardcha/Desktop/1000. AI_커서/UI"
npm run dev
```

## 테스트 체크리스트

- [ ] PostgreSQL 설치 확인
- [ ] PostgreSQL PATH 설정
- [ ] PostgreSQL 서비스 실행
- [ ] 데이터베이스 비밀번호 설정
- [ ] 데이터베이스 생성
- [ ] 백엔드 서버 시작
- [ ] 데이터베이스 초기화 (INIT_DB=true)
- [ ] API 엔드포인트 테스트
- [ ] 프런트엔드 시작
- [ ] 프런트엔드-백엔드 연결 테스트

