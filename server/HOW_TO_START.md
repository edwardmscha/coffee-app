# 터미널에서 서버 시작하기

## 기본 서버 시작 방법

### 1. 서버 폴더로 이동

```bash
cd "/Users/edwardcha/Desktop/1000. AI_커서/server"
```

### 2. PostgreSQL PATH 추가 (한 번만 하면 됨)

```bash
export PATH="/Library/PostgreSQL/18/bin:$PATH"
```

⚠️ **참고:** 이 설정은 현재 터미널 세션에서만 유효합니다. 
영구적으로 설정하려면 `~/.zshrc` 파일에 추가하세요:
```bash
echo 'export PATH="/Library/PostgreSQL/18/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 3. 서버 시작

#### 방법 A: 개발 모드 (권장)
```bash
npm run dev
```

#### 방법 B: 데이터베이스 초기화와 함께 시작
```bash
INIT_DB=true npm run dev
```

#### 방법 C: 프로덕션 모드
```bash
npm start
```

## 서버가 정상적으로 시작되면

다음 메시지들이 표시됩니다:

```
✅ PostgreSQL 데이터베이스에 연결되었습니다.
📊 데이터베이스 연결 테스트 성공: ...
✅ 데이터베이스 스키마가 생성되었습니다. (INIT_DB=true인 경우)
✅ 초기 데이터가 삽입되었습니다. (INIT_DB=true인 경우)
🚀 서버가 포트 3001에서 실행 중입니다.
📍 http://localhost:3001
📝 API 엔드포인트:
   - GET  /api/menus
   - POST /api/orders
   ...
```

## 서버 중지하기

터미널에서 `Ctrl + C`를 누르면 서버가 중지됩니다.

## 서버 상태 확인

다른 터미널 창에서:

```bash
# 서버가 실행 중인지 확인
curl http://localhost:3001/

# 메뉴 API 테스트
curl http://localhost:3001/api/menus
```

## 문제 해결

### 포트가 이미 사용 중인 경우

```bash
# 포트 3001을 사용하는 프로세스 확인
lsof -ti:3001

# 프로세스 종료
kill -9 $(lsof -ti:3001)
```

### 데이터베이스 연결 오류가 발생하는 경우

1. PostgreSQL 비밀번호 설정 (PostgreSQL.app 사용)
2. `.env` 파일의 `DB_PASSWORD` 확인
3. 데이터베이스가 생성되었는지 확인

자세한 내용은 `QUICK_START.md` 파일을 참고하세요.


