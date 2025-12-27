# 커피 주문 앱 백엔드 서버

Express.js를 사용한 커피 주문 앱의 백엔드 API 서버입니다.

## 설치 및 실행

### 의존성 설치
```bash
npm install
```

### 개발 모드로 실행

#### 방법 1: 자동 스크립트 사용 (권장)
```bash
./start.sh              # 일반 시작
./start.sh --init       # 데이터베이스 초기화와 함께 시작
```

#### 방법 2: npm 명령어 사용
```bash
# PostgreSQL PATH 추가 (한 번만)
export PATH="/Library/PostgreSQL/18/bin:$PATH"

# 서버 시작
npm run dev

# 데이터베이스 초기화와 함께 시작
INIT_DB=true npm run dev
```

### 프로덕션 모드로 실행
```bash
npm start
```

**자세한 내용은 `TERMINAL_GUIDE.md` 파일을 참고하세요.**

## 환경 변수

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```
PORT=3001
NODE_ENV=development
```

## API 엔드포인트

### 메뉴 관련
- `GET /api/menus` - 메뉴 목록 조회

### 주문 관련
- `POST /api/orders` - 주문 생성
- `GET /api/orders/:orderId` - 주문 조회

### 관리자 관련
- `GET /api/admin/inventory` - 재고 현황 조회
- `PUT /api/admin/inventory/:menuId` - 재고 수정
- `GET /api/admin/orders` - 주문 목록 조회
- `PUT /api/admin/orders/:orderId/status` - 주문 상태 변경
- `GET /api/admin/dashboard` - 대시보드 통계 조회

## 프로젝트 구조

```
server/
├── config/          # 설정 파일
├── controllers/     # 컨트롤러
├── models/          # 데이터 모델
├── routes/          # 라우트 정의
├── index.js         # 서버 진입점
├── .env             # 환경 변수 (gitignore)
└── package.json
```

