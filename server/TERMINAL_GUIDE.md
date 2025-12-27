# 터미널에서 서버 실행하기 - 간단 가이드

## 빠른 시작 (3단계)

### 1단계: 터미널 열기
터미널(Terminal) 앱을 실행하세요.

### 2단계: 서버 폴더로 이동
```bash
cd "/Users/edwardcha/Desktop/1000. AI_커서/server"
```

### 3단계: 서버 시작

#### 옵션 A: 자동 스크립트 사용 (가장 쉬움)
```bash
# 일반 시작
./start.sh

# 데이터베이스 초기화와 함께 시작 (처음 한 번만)
./start.sh --init
```

#### 옵션 B: 수동으로 시작
```bash
# PostgreSQL PATH 추가
export PATH="/Library/PostgreSQL/18/bin:$PATH"

# 서버 시작
npm run dev

# 또는 데이터베이스 초기화와 함께
INIT_DB=true npm run dev
```

## 실행 확인

서버가 시작되면 다음과 같은 메시지가 나타납니다:

```
🚀 서버가 포트 3001에서 실행 중입니다.
📍 http://localhost:3001
```

이 메시지가 보이면 **성공**입니다! 

## 서버 중지

서버를 중지하려면 터미널에서:
```
Ctrl + C
```
를 누르세요.

## 다음 단계

서버가 실행되면:
1. 브라우저에서 http://localhost:5173 접속 (프런트엔드)
2. 또는 http://localhost:3001 접속 (백엔드 API)

## 자주 묻는 질문

### Q: "command not found: npm" 오류가 발생해요
A: Node.js가 설치되지 않았습니다. Node.js를 설치하세요.

### Q: "포트 3001이 이미 사용 중" 오류가 발생해요
A: 다른 터미널에서 서버가 실행 중일 수 있습니다. 다음 명령어로 종료하세요:
```bash
kill -9 $(lsof -ti:3001)
```

### Q: 데이터베이스 연결 오류가 발생해요
A: PostgreSQL 비밀번호를 설정해야 합니다. `QUICK_START.md` 파일을 참고하세요.

## 전체 명령어 요약

```bash
# 1. 서버 폴더로 이동
cd "/Users/edwardcha/Desktop/1000. AI_커서/server"

# 2. PostgreSQL PATH 추가 (한 번만)
export PATH="/Library/PostgreSQL/18/bin:$PATH"

# 3. 서버 시작
npm run dev

# 또는 자동 스크립트 사용
./start.sh
```


