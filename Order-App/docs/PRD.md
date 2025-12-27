# 커피 주문 앱

## 1. 프로젝트 개요

### 1.1 프로젝트명
커피 주문 앱

### 1.2 프로젝트 목적
사용자가 커피 메뉴를 주문하고, 관리자가 주문을 관리할 수 있는 간단한 풀스택 웹 앱

### 1.3 개발 범위
- 주문하기 메뉴(메뉴 선택 및 장바구니 기능)
- 관리자 화면 (재고 관리 및 주ㄴ 상태 관리)
- 데이터를 생성/조회/수정/삭제할 수 있는 기ㅇ

##2. 기술 선택
- 프런트엔드: HTML, CSS, 리액트, 자바스크립트
- 백엔드: Node.js, Express
- 데이터베이스: Postgre SQL

### 3. 기본 사항
- 프런트엔드와 백엔드를 따로 개발
- 기본적인 웹 기술만 사용
- 학습 목적이므로 사용자 인증이나 결제 기능은 제외
- 메뉴는 커피 메뉴만 있음

## 4. 기능 명세

### 4.1 주문하기 화면

#### 4.1.1 화면 구성
주문하기 화면은 크게 3개의 섹션으로 구성됩니다:
1. **헤더 영역 (Header)**
2. **메뉴 아이템 영역 (Menu Items Section)**
3. **장바구니 영역 (Shopping Cart Section)**

#### 4.1.2 헤더 영역

**구성 요소:**
- **로고**: 좌측 상단에 "COZY" 브랜드명 표시
  - 스타일: 어두운 녹색 배경의 사각형 박스
- **네비게이션 버튼**: 우측 상단에 2개의 버튼 배치
  - **주문하기 버튼**: 현재 화면을 나타내는 버튼 (선택된 상태)
  - **관리자 버튼**: 관리자 화면으로 이동하는 버튼
  - 스타일: 밝은 회색 배경에 어두운 녹색 테두리

**기능:**
- 관리자 버튼 클릭 시 관리자 화면으로 전환

#### 4.1.3 메뉴 아이템 영역

**레이아웃:**
- 메뉴 아이템 카드들이 가로로 배치됨 (그리드 레이아웃)
- 각 카드는 동일한 구조와 스타일을 가짐

**메뉴 카드 구성 요소:**
각 메뉴 카드는 다음 요소들을 포함합니다:

1. **제품 이미지**
   - 위치: 카드 상단
   - 스타일: 흰색 배경 사각형 영역
   - 상태: 이미지가 없을 경우 placeholder 표시

2. **제품 정보**
   - **제품명**: 굵은 글씨로 표시 (예: "아메리카노(ICE)", "아메리카노(HOT)", "카페라떼")
   - **가격**: 원화 단위로 표시 (예: "4,000원", "5,000원")
   - **설명**: 간단한 제품 설명 텍스트 (예: "간단한 설명...")

3. **옵션 선택**
   - 체크박스 형태의 옵션 선택 UI
   - 각 옵션은 옵션명과 추가 가격을 함께 표시
   - 예시 옵션:
     - "샷 추가 (+500원)"
     - "시럽 추가 (+0원)"
   - 여러 옵션을 동시에 선택 가능

4. **담기 버튼**
   - 위치: 카드 하단
   - 텍스트: "담기"
   - 스타일: 밝은 회색 배경의 사각형 버튼

**기능:**
- 옵션 선택 시 해당 옵션의 추가 가격이 최종 가격에 반영됨
- "담기" 버튼 클릭 시:
  - 선택된 옵션 정보와 함께 해당 메뉴가 장바구니에 추가됨
  - 동일한 메뉴와 옵션 조합이 이미 장바구니에 있으면 수량이 증가함
  - 장바구니 영역이 업데이트되어 새로 추가된 항목이 표시됨

#### 4.1.4 장바구니 영역

**레이아웃:**
- 화면 하단에 고정되어 표시
- 스타일: 밝은 회색 배경에 어두운 회색 테두리의 박스

**구성 요소:**

1. **장바구니 제목**
   - 위치: 영역 좌측 상단
   - 텍스트: "장바구니"

2. **장바구니 아이템 목록**
   - 장바구니에 담긴 각 아이템은 다음 정보를 표시:
     - **제품명**: 메뉴 이름
     - **옵션 정보**: 선택된 옵션이 있으면 괄호 안에 표시 (예: "(샷 추가)")
     - **수량**: "X 1", "X 2" 형식으로 표시
     - **가격**: 해당 아이템의 총 가격 (옵션 가격 포함, 예: "4,500원", "8,000원")
   - 예시 표시 형식:
     - "아메리카노(ICE) (샷 추가) X 1 - 4,500원"
     - "아메리카노(HOT) X 2 - 8,000원"

3. **총 금액**
   - 텍스트: "총 금액"
   - 금액: 모든 장바구니 아이템의 가격 합계 (굵은 글씨로 강조, 예: "12,500원")
   - 위치: 장바구니 아이템 목록 하단

4. **주문하기 버튼**
   - 위치: 총 금액 하단
   - 텍스트: "주문하기"
   - 스타일: 밝은 회색 배경에 어두운 회색 테두리의 사각형 버튼

**기능:**
- 장바구니가 비어있을 때:
  - 빈 장바구니 상태를 표시 (예: "장바구니가 비어있습니다")
  - 주문하기 버튼은 비활성화되거나 숨김 처리
- 장바구니 아이템이 있을 때:
  - 모든 아이템의 정보와 가격이 정확히 계산되어 표시됨
  - 총 금액이 실시간으로 계산되어 표시됨
- 주문하기 버튼 클릭 시:
  - 주문이 서버로 전송됨
  - 주문 성공 시 장바구니가 비워짐
  - 주문 완료 메시지 표시 (토스트 메시지 또는 알림)

#### 4.1.5 상호작용 및 상태 관리

**데이터 흐름:**
1. 페이지 로드 시 서버에서 메뉴 목록을 가져와 화면에 표시
2. 사용자가 메뉴를 선택하고 옵션을 선택한 후 "담기" 클릭
3. 선택된 메뉴와 옵션 정보가 로컬 상태(또는 전역 상태)에 저장
4. 장바구니 영역이 즉시 업데이트되어 새로운 아이템이 표시
5. 총 금액이 자동으로 재계산되어 표시

**상태 관리 항목:**
- 메뉴 목록 (서버에서 가져온 데이터)
- 장바구니 아이템 목록
  - 각 아이템 정보: 제품 ID, 제품명, 옵션 목록, 수량, 개별 가격
- 총 금액 (계산된 값)

**예외 처리:**
- 메뉴 목록 로드 실패 시 에러 메시지 표시
- 장바구니에 아이템 추가 실패 시 알림 표시
- 주문 요청 실패 시 에러 메시지 표시 및 장바구니 유지

#### 4.1.6 UI/UX 요구사항

**반응형 디자인:**
- 데스크톱: 메뉴 카드들이 가로로 여러 개 배치
- 모바일: 메뉴 카드들이 세로로 스택되어 배치
- 장바구니는 모든 화면 크기에서 하단에 고정

**색상 스키마:**
- 주 색상: 어두운 녹색 (로고, 버튼 테두리)
- 배경색: 밝은 회색 (버튼, 장바구니)
- 테두리: 어두운 녹색 또는 어두운 회색

**사용자 경험:**
- 버튼 클릭 시 시각적 피드백 제공 (hover, active 상태)
- 장바구니에 아이템 추가 시 즉각적인 시각적 피드백
- 주문 완료 시 명확한 성공 메시지 표시
- 로딩 중일 때 적절한 로딩 인디케이터 표시

#### 4.1.7 기술적 요구사항

**API 엔드포인트:**
- `GET /api/menus`: 메뉴 목록 조회
- `POST /api/orders`: 주문 생성

**데이터 구조:**
```javascript
// 메뉴 아이템
{
  id: number,
  name: string,
  price: number,
  description: string,
  imageUrl: string,
  options: [
    {
      id: number,
      name: string,
      additionalPrice: number
    }
  ]
}

// 장바구니 아이템
{
  menuId: number,
  menuName: string,
  selectedOptions: [optionId],
  quantity: number,
  totalPrice: number
}
```

## 5. 백엔드 PRD

### 5.1 데이터 모델
- **Menu**
  - id (PK), name, description, price, imageUrl, stock
  - 관계: Menu (1) - Options (N)
- **Options**
  - id (PK), menuId (FK), name, additionalPrice
  - 관계: Options (N) - Menu (1)
- **Orders**
  - id (PK), createdAt, totalPrice, status (`received`, `in_progress`, `completed`)
  - orderItems: [{ menuId, menuName, quantity, price, selectedOptions: [optionName], lineTotal }]

### 5.2 사용자 흐름에 따른 데이터 스키마 사용
1. **메뉴 조회**
   - `Menu` 전체를 조회해 주문하기 화면에 표시
   - `stock`은 관리자 화면에도 표시 (재고 상태 판단: 정상/주의/품절)
2. **장바구니 담기**
   - 프런트에서 Menu + Options를 조합해 장바구니에 표시 (백엔드 저장 없음)
3. **주문 생성**
   - 장바구니 → 주문하기 클릭 시 `Orders`에 저장
   - 주문 레코드: 주문 시간(createdAt), 주문 항목(메뉴, 수량, 옵션, 금액), 총액, 초기 상태 `received`
   - 주문 생성 시 해당 `Menu.stock`을 수량만큼 차감 (재고 부족 시 400 에러)
4. **주문 현황 표시**
   - `Orders` 데이터를 관리자 화면 “주문 현황”에 표시
   - 상태 흐름: `received` → `in_progress` → `completed`

### 5.3 API 설계
- **메뉴 조회**
  - `GET /api/menus`
  - 응답: 메뉴 + 옵션 + 재고
- **주문 생성**
  - `POST /api/orders`
  - 요청: { items: [{ menuId, quantity, selectedOptionIds: [] }] }
  - 처리: 재고 검증 및 차감 → 주문 저장 → 생성된 주문 반환
- **재고 업데이트 (관리자)**
  - `PUT /api/admin/inventory/:menuId`
  - 요청: { change: number } (증가/감소)
  - 응답: 업데이트된 재고
- **주문 상세 조회**
  - `GET /api/orders/:orderId`
  - 응답: 주문 시간, 상태, 항목(메뉴/수량/옵션/금액), 총액
- **주문 상태 변경 (관리자)**
  - `PUT /api/admin/orders/:orderId/status`
  - 요청: { status: 'received' | 'in_progress' | 'completed' }
  - 응답: 변경된 주문

### 5.4 유효성 및 예외 처리
- 주문 생성 시:
  - 재고 부족: 400 반환, 부족한 메뉴명과 남은 재고 포함
  - 잘못된 메뉴/옵션 ID: 400 반환
- 재고 업데이트 시:
  - 재고가 0 미만이 되지 않도록 서버에서 방어
- 상태 변경 시:
  - 허용된 상태 전이(`received`→`in_progress`→`completed`)만 허용

### 5.5 추가 고려사항
- 트랜잭션: 주문 생성 시 주문 레코드 삽입과 재고 차감을 단일 트랜잭션으로 처리
- 인덱스: `Menu.id`, `Options.menuId`, `Orders.createdAt`, `Orders.status`
- 응답 성능: 관리자 화면을 위해 `GET /api/orders?status=`로 상태별 필터링 지원

### 4.2 관리자 화면

#### 4.2.1 화면 구성
관리자 화면은 크게 4개의 섹션으로 구성됩니다:
1. **헤더 영역 (Header)**
2. **관리자 대시보드 요약 (Dashboard Summary)**
3. **재고 현황 (Inventory Status)**
4. **주문 현황 (Order Status)**

#### 4.2.2 헤더 영역

**구성 요소:**
- **로고**: 좌측 상단에 "COZY" 브랜드명 표시
  - 스타일: 어두운 테두리의 사각형 박스
- **네비게이션 버튼**: 우측 상단에 2개의 버튼 배치
  - **주문하기 버튼**: 주문하기 화면으로 이동하는 버튼
  - **관리자 버튼**: 현재 화면을 나타내는 버튼 (선택된 상태 - 어두운 테두리로 강조)
  - 스타일: 밝은 배경에 어두운 테두리

**기능:**
- 주문하기 버튼 클릭 시 주문하기 화면으로 전환
- 관리자 버튼은 현재 페이지임을 시각적으로 표시

#### 4.2.3 관리자 대시보드 요약

**레이아웃:**
- 화면 상단에 위치
- 제목: "관리자 대시보드"

**구성 요소:**
주문 통계를 한눈에 볼 수 있는 요약 정보를 표시합니다:

- **총 주문**: 전체 주문 건수
- **주문 접수**: 접수 완료된 주문 건수
- **제조 중**: 현재 제조 진행 중인 주문 건수
- **제조 완료**: 제조가 완료된 주문 건수

**표시 형식:**
"총 주문 1 / 주문 접수 1 / 제조 중 0 / 제조 완료 0" 형식으로 표시

**기능:**
- 페이지 로드 시 서버에서 최신 주문 통계 데이터를 가져와 표시
- 주문 상태가 변경될 때마다 실시간으로 업데이트 (또는 주기적 갱신)
- 각 통계 수치는 숫자로 명확하게 표시

**데이터 소스:**
- 서버 API를 통해 주문 상태별 집계 데이터를 조회

#### 4.2.4 재고 현황

**레이아웃:**
- 대시보드 요약 섹션 하단에 위치
- 제목: "재고 현황"
- 메뉴별 재고 카드들이 가로로 배치됨 (그리드 레이아웃)

**재고 카드 구성 요소:**
각 재고 카드는 다음 요소들을 포함합니다:

1. **메뉴명**
   - 위치: 카드 상단
   - 스타일: 굵은 글씨로 표시
   - 예시: "아메리카노 (ICE)", "아메리카노 (HOT)", "카페라떼"

2. **현재 재고 수량**
   - 위치: 메뉴명 하단
   - 형식: 숫자 + "개" (예: "10개")
   - 스타일: 명확하게 읽을 수 있는 크기와 색상

3. **재고 조정 버튼**
   - 위치: 재고 수량 하단
   - 구성:
     - **증가 버튼 (+)**: 재고 수량을 1씩 증가
     - **감소 버튼 (-)**: 재고 수량을 1씩 감소
   - 스타일: 작은 크기의 버튼으로 배치

**기능:**
- "+" 버튼 클릭 시:
  - 해당 메뉴의 재고 수량이 1 증가
  - 변경된 재고가 즉시 화면에 반영
  - 서버에 재고 업데이트 요청 전송
- "-" 버튼 클릭 시:
  - 해당 메뉴의 재고 수량이 1 감소 (단, 0 이하로 내려가지 않도록 제한)
  - 변경된 재고가 즉시 화면에 반영
  - 서버에 재고 업데이트 요청 전송
- 재고 업데이트 성공 시:
  - 화면에 성공 피드백 표시 (토스트 메시지 또는 시각적 표시)
- 재고 업데이트 실패 시:
  - 에러 메시지 표시
  - 화면의 재고 수량을 원래 값으로 되돌림

**예외 처리:**
- 재고가 0일 때 "-" 버튼은 비활성화 또는 클릭 시 경고 메시지 표시
- 재고 업데이트 API 호출 실패 시 에러 처리 및 롤백

#### 4.2.5 주문 현황

**레이아웃:**
- 재고 현황 섹션 하단에 위치
- 제목: "주문 현황"
- 주문 목록이 세로로 배치됨

**주문 아이템 구성 요소:**
각 주문 아이템은 다음 정보를 표시합니다:

1. **주문 시간**
   - 형식: "월 일 시:분" (예: "7월 31일 13:00")
   - 위치: 주문 아이템 상단 또는 좌측

2. **주문 내역**
   - **메뉴명과 수량**: 메뉴 이름과 수량을 함께 표시 (예: "아메리카노(ICE) x 1")
   - **옵션 정보**: 옵션이 있는 경우 함께 표시 (예: "아메리카노(ICE) (샷 추가) x 1")
   - 위치: 주문 시간 하단 또는 우측

3. **주문 금액**
   - 형식: 숫자 + "원" (예: "4,000원")
   - 위치: 주문 내역 옆 또는 하단

4. **주문 접수 버튼**
   - 텍스트: "주문 접수"
   - 위치: 주문 아이템 우측 또는 하단
   - 스타일: 밝은 배경에 어두운 테두리의 사각형 버튼

**주문 상태:**
주문은 다음 상태를 가질 수 있습니다:
- **주문 대기**: 아직 접수되지 않은 주문 (주문 접수 버튼 표시)
- **주문 접수**: 접수 완료된 주문 (버튼이 "제조 중" 또는 숨김 처리)
- **제조 중**: 현재 제조 진행 중인 주문
- **제조 완료**: 제조가 완료된 주문

**기능:**
- 페이지 로드 시 서버에서 주문 목록을 조회하여 표시
- 주문 목록은 최신 순으로 정렬 (최근 주문이 상단)
- "주문 접수" 버튼 클릭 시:
  - 해당 주문의 상태가 "주문 접수"로 변경
  - 주문 접수 API 요청 전송
  - 성공 시:
    - 버튼이 "제조 중" 또는 다른 상태로 변경되거나 숨김 처리
    - 관리자 대시보드 요약 섹션의 통계가 자동으로 업데이트
    - 주문 아이템의 시각적 상태 변경 (색상 변경 등)
  - 실패 시:
    - 에러 메시지 표시
    - 주문 상태 변경 없이 유지
- 주문이 많을 경우:
  - 스크롤 가능한 목록으로 표시
  - 페이지네이션 또는 무한 스크롤 구현 (선택 사항)

**예외 처리:**
- 주문 목록 로드 실패 시 에러 메시지 표시
- 주문 접수 요청 실패 시 에러 메시지 및 재시도 옵션 제공

#### 4.2.6 상호작용 및 상태 관리

**데이터 흐름:**
1. 페이지 로드 시:
   - 서버에서 주문 통계 데이터 조회
   - 서버에서 재고 현황 데이터 조회
   - 서버에서 주문 목록 데이터 조회
   - 모든 데이터를 화면에 표시

2. 재고 수정 시:
   - 사용자가 +/- 버튼 클릭
   - 로컬 상태에서 재고 수량 변경 (낙관적 업데이트)
   - 서버에 재고 업데이트 요청 전송
   - 성공 시 변경사항 유지, 실패 시 원래 값으로 롤백

3. 주문 접수 시:
   - "주문 접수" 버튼 클릭
   - 서버에 주문 상태 업데이트 요청 전송
   - 성공 시:
     - 주문 목록에서 해당 주문의 상태 변경
     - 대시보드 통계 자동 업데이트
   - 실패 시 에러 처리

**상태 관리 항목:**
- 대시보드 통계 데이터
  - 총 주문 수
  - 주문 접수 수
  - 제조 중 수
  - 제조 완료 수
- 재고 데이터 목록
  - 각 메뉴의 재고 수량
- 주문 목록
  - 각 주문 정보: 주문 ID, 주문 시간, 주문 내역, 주문 금액, 주문 상태

**실시간 업데이트:**
- 주문이 새로 생성되면 주문 현황 목록에 자동으로 추가 (폴링 또는 웹소켓)
- 주문 상태 변경 시 대시보드 통계가 자동으로 업데이트

#### 4.2.7 UI/UX 요구사항

**반응형 디자인:**
- 데스크톱: 재고 카드와 주문 목록이 가로로 넓게 배치
- 모바일: 재고 카드들이 세로로 스택되어 배치, 주문 목록도 세로 스크롤

**색상 스키마:**
- 배경: 흰색
- 텍스트: 어두운 회색
- 테두리: 어두운 회색
- 선택된 버튼: 어두운 테두리로 강조

**사용자 경험:**
- 버튼 클릭 시 즉각적인 시각적 피드백 제공 (hover, active 상태)
- 재고 수정 시 숫자가 즉시 업데이트되어 보임
- 주문 접수 시 버튼 상태가 명확하게 변경됨
- 로딩 중일 때 적절한 로딩 인디케이터 표시
- 작업 성공/실패 시 명확한 피드백 메시지 표시

**접근성:**
- 버튼에 명확한 레이블 제공
- 키보드 네비게이션 지원 (선택 사항)
- 충분한 색상 대비 확보

#### 4.2.8 기술적 요구사항

**API 엔드포인트:**
- `GET /api/admin/dashboard`: 대시보드 통계 조회
- `GET /api/admin/inventory`: 재고 현황 조회
- `PUT /api/admin/inventory/:menuId`: 재고 수정
- `GET /api/admin/orders`: 주문 목록 조회 (상태별 필터링 가능)
- `PUT /api/admin/orders/:orderId/status`: 주문 상태 변경 (주문 접수 등)

**데이터 구조:**
```javascript
// 대시보드 통계
{
  totalOrders: number,
  receivedOrders: number,
  inProgressOrders: number,
  completedOrders: number
}

// 재고 아이템
{
  menuId: number,
  menuName: string,
  stock: number
}

// 주문 아이템
{
  orderId: number,
  orderTime: string, // ISO 8601 형식 또는 타임스탬프
  items: [
    {
      menuId: number,
      menuName: string,
      selectedOptions: [string],
      quantity: number,
      price: number
    }
  ],
  totalPrice: number,
  status: 'pending' | 'received' | 'in_progress' | 'completed'
}
```

**보안 고려사항:**
- 관리자 화면은 인증 없이 접근 가능하지만 (학습 목적), 실제 운영 환경에서는 인증이 필요함
- API 엔드포인트에 적절한 권한 검증 추가 고려 (선택 사항)

## 5. 백엔드 개발 명세

### 5.1 데이터 모델

#### 5.1.1 Menu (메뉴)
메뉴 테이블은 커피 메뉴의 기본 정보를 저장합니다.

**필드:**
- `id` (INTEGER, PRIMARY KEY, AUTO_INCREMENT): 메뉴 고유 ID
- `name` (VARCHAR): 커피 이름 (예: "아메리카노(ICE)", "카페라떼")
- `description` (TEXT): 메뉴 설명
- `price` (INTEGER): 기본 가격 (원 단위)
- `image_url` (VARCHAR): 이미지 URL
- `stock` (INTEGER): 재고 수량 (기본값: 10)
- `created_at` (TIMESTAMP): 생성 일시
- `updated_at` (TIMESTAMP): 수정 일시

**제약 조건:**
- `name`: NOT NULL, UNIQUE
- `price`: NOT NULL, >= 0
- `stock`: NOT NULL, >= 0

#### 5.1.2 Options (옵션)
옵션 테이블은 메뉴에 추가할 수 있는 옵션 정보를 저장합니다.

**필드:**
- `id` (INTEGER, PRIMARY KEY, AUTO_INCREMENT): 옵션 고유 ID
- `menu_id` (INTEGER, FOREIGN KEY): 연결된 메뉴 ID (Menu.id 참조)
- `name` (VARCHAR): 옵션 이름 (예: "샷 추가", "시럽 추가", "휘핑크림")
- `additional_price` (INTEGER): 추가 가격 (원 단위, 기본값: 0)
- `created_at` (TIMESTAMP): 생성 일시
- `updated_at` (TIMESTAMP): 수정 일시

**제약 조건:**
- `menu_id`: NOT NULL, FOREIGN KEY (Menu.id) ON DELETE CASCADE
- `name`: NOT NULL
- `additional_price`: NOT NULL, >= 0

**관계:**
- 하나의 메뉴는 여러 개의 옵션을 가질 수 있음 (1:N 관계)

#### 5.1.3 Orders (주문)
주문 테이블은 고객의 주문 정보를 저장합니다.

**필드:**
- `id` (INTEGER, PRIMARY KEY, AUTO_INCREMENT): 주문 고유 ID
- `order_time` (TIMESTAMP): 주문 일시
- `status` (VARCHAR): 주문 상태 ('received', 'in_progress', 'completed')
- `total_price` (INTEGER): 총 주문 금액 (원 단위)
- `created_at` (TIMESTAMP): 생성 일시
- `updated_at` (TIMESTAMP): 수정 일시

**제약 조건:**
- `order_time`: NOT NULL
- `status`: NOT NULL, DEFAULT 'received'
- `total_price`: NOT NULL, >= 0

**상태 값:**
- `received`: 주문 접수 (기본값)
- `in_progress`: 제조 중
- `completed`: 제조 완료

#### 5.1.4 OrderItems (주문 상세)
주문 상세 테이블은 주문에 포함된 각 메뉴 항목의 상세 정보를 저장합니다.

**필드:**
- `id` (INTEGER, PRIMARY KEY, AUTO_INCREMENT): 주문 상세 고유 ID
- `order_id` (INTEGER, FOREIGN KEY): 주문 ID (Orders.id 참조)
- `menu_id` (INTEGER, FOREIGN KEY): 메뉴 ID (Menu.id 참조)
- `menu_name` (VARCHAR): 메뉴 이름 (주문 시점의 메뉴명 저장)
- `quantity` (INTEGER): 주문 수량
- `item_price` (INTEGER): 해당 항목의 단가 (옵션 포함 가격)
- `created_at` (TIMESTAMP): 생성 일시

**제약 조건:**
- `order_id`: NOT NULL, FOREIGN KEY (Orders.id) ON DELETE CASCADE
- `menu_id`: NOT NULL, FOREIGN KEY (Menu.id)
- `menu_name`: NOT NULL
- `quantity`: NOT NULL, > 0
- `item_price`: NOT NULL, >= 0

**관계:**
- 하나의 주문은 여러 개의 주문 상세를 가질 수 있음 (1:N 관계)

#### 5.1.5 OrderItemOptions (주문 상세 옵션)
주문 상세 옵션 테이블은 주문 상세 항목에 선택된 옵션 정보를 저장합니다.

**필드:**
- `id` (INTEGER, PRIMARY KEY, AUTO_INCREMENT): 주문 상세 옵션 고유 ID
- `order_item_id` (INTEGER, FOREIGN KEY): 주문 상세 ID (OrderItems.id 참조)
- `option_id` (INTEGER, FOREIGN KEY): 옵션 ID (Options.id 참조)
- `option_name` (VARCHAR): 옵션 이름 (주문 시점의 옵션명 저장)
- `additional_price` (INTEGER): 추가 가격 (주문 시점의 가격 저장)
- `created_at` (TIMESTAMP): 생성 일시

**제약 조건:**
- `order_item_id`: NOT NULL, FOREIGN KEY (OrderItems.id) ON DELETE CASCADE
- `option_id`: NOT NULL, FOREIGN KEY (Options.id)
- `option_name`: NOT NULL
- `additional_price`: NOT NULL, >= 0

**관계:**
- 하나의 주문 상세는 여러 개의 옵션을 가질 수 있음 (1:N 관계)

### 5.2 데이터 스키마를 위한 사용자 흐름

#### 5.2.1 메뉴 조회 및 표시 흐름

**가. 메뉴 정보 조회 및 표시**
1. 사용자가 '주문하기' 메뉴를 클릭하면 프런트엔드에서 `GET /api/menus` API를 호출합니다.
2. 백엔드는 데이터베이스에서 Menu 테이블의 모든 메뉴 정보를 조회합니다.
3. 각 메뉴에 연결된 Options 정보도 함께 조회합니다 (JOIN 또는 별도 쿼리).
4. 응답 데이터에는 다음 정보가 포함됩니다:
   - 메뉴 ID, 이름, 설명, 가격, 이미지 URL
   - 각 메뉴의 옵션 목록 (옵션 ID, 이름, 추가 가격)
   - **재고 수량은 제외** (재고는 관리자 화면에서만 표시)
5. 프런트엔드는 받은 메뉴 정보를 화면에 카드 형태로 표시합니다.

**관리자 화면의 재고 표시:**
- 관리자 화면에서는 `GET /api/admin/inventory` API를 호출하여 재고 정보를 조회합니다.
- 이 API는 Menu 테이블의 `stock` 필드를 포함하여 반환합니다.

#### 5.2.2 장바구니 관리 흐름

**나. 메뉴 선택 및 장바구니 추가**
1. 사용자가 메뉴 카드에서 옵션을 선택하고 "담기" 버튼을 클릭합니다.
2. 프런트엔드는 선택된 메뉴와 옵션 정보를 로컬 상태(장바구니)에 저장합니다.
3. 장바구니에는 다음 정보가 저장됩니다:
   - 메뉴 ID, 메뉴 이름
   - 선택된 옵션 ID 목록 및 옵션 정보
   - 수량
   - 계산된 가격 (기본 가격 + 옵션 추가 가격)
4. 장바구니 영역이 즉시 업데이트되어 선택된 항목이 표시됩니다.
5. 동일한 메뉴와 옵션 조합이 이미 장바구니에 있으면 수량만 증가합니다.

**참고:** 장바구니는 프런트엔드에서만 관리되며, 이 단계에서는 서버와 통신하지 않습니다.

#### 5.2.3 주문 생성 흐름

**다. 주문하기 버튼 클릭 및 주문 저장**
1. 사용자가 장바구니에서 "주문하기" 버튼을 클릭합니다.
2. 프런트엔드는 장바구니의 모든 항목 정보를 `POST /api/orders` API로 전송합니다.
3. 요청 본문에는 다음 정보가 포함됩니다:
   ```json
   {
     "items": [
       {
         "menuId": 1,
         "menuName": "아메리카노(ICE)",
         "quantity": 2,
         "selectedOptions": [
           {
             "optionId": 1,
             "optionName": "샷 추가",
             "additionalPrice": 500
           }
         ],
         "itemPrice": 4500
       }
     ],
     "totalPrice": 9000
   }
   ```
4. 백엔드는 다음 작업을 수행합니다:
   - **재고 확인**: 각 메뉴의 재고 수량이 주문 수량보다 충분한지 확인합니다.
   - **재고 부족 처리**: 재고가 부족한 경우 에러 응답을 반환하고 주문을 생성하지 않습니다.
   - **주문 생성**: 재고가 충분한 경우:
     - Orders 테이블에 새 주문 레코드를 생성합니다.
       - `order_time`: 현재 시간
       - `status`: 'received' (주문 접수)
       - `total_price`: 요청된 총 금액
     - OrderItems 테이블에 각 주문 항목을 저장합니다.
       - `order_id`: 생성된 주문 ID
       - `menu_id`: 메뉴 ID
       - `menu_name`: 메뉴 이름 (스냅샷)
       - `quantity`: 주문 수량
       - `item_price`: 항목 단가
     - OrderItemOptions 테이블에 각 항목의 선택된 옵션을 저장합니다.
       - `order_item_id`: 생성된 주문 상세 ID
       - `option_id`: 옵션 ID
       - `option_name`: 옵션 이름 (스냅샷)
       - `additional_price`: 추가 가격 (스냅샷)
   - **재고 차감**: 주문이 성공적으로 생성되면 Menu 테이블의 해당 메뉴들의 `stock` 값을 주문 수량만큼 차감합니다.
5. 성공 응답으로 생성된 주문 ID를 반환합니다.
6. 프런트엔드는 주문 성공 메시지를 표시하고 장바구니를 비웁니다.

#### 5.2.4 주문 현황 조회 및 상태 변경 흐름

**라. 관리자 화면 주문 현황 표시 및 상태 변경**
1. 관리자 화면이 로드되면 `GET /api/admin/orders` API를 호출합니다.
2. 백엔드는 Orders 테이블에서 모든 주문을 조회하고, 각 주문의 OrderItems와 OrderItemOptions도 함께 조회합니다.
3. 주문 목록은 `order_time` 기준 내림차순으로 정렬됩니다 (최신 주문이 먼저).
4. 응답 데이터에는 다음 정보가 포함됩니다:
   ```json
   {
     "orders": [
       {
         "id": 1,
         "orderTime": "2024-07-31T13:00:00Z",
         "status": "received",
         "totalPrice": 9000,
         "items": [
           {
             "menuId": 1,
             "menuName": "아메리카노(ICE)",
             "quantity": 2,
             "itemPrice": 4500,
             "selectedOptions": [
               {
                 "optionId": 1,
                 "optionName": "샷 추가",
                 "additionalPrice": 500
               }
             ]
           }
         ]
       }
     ]
   }
   ```
5. 프런트엔드는 주문 목록을 화면에 표시합니다.
6. 관리자가 "제조 시작" 버튼을 클릭하면 `PUT /api/admin/orders/:orderId/status` API를 호출합니다.
   - 요청 본문: `{ "status": "in_progress" }`
7. 백엔드는 Orders 테이블에서 해당 주문의 `status`를 업데이트합니다.
8. 관리자가 "제조 완료" 버튼을 클릭하면 동일한 API로 `status`를 'completed'로 업데이트합니다.
9. 상태 변경 후 프런트엔드는 주문 목록을 다시 조회하거나 업데이트된 상태를 반영합니다.

### 5.3 API 설계

#### 5.3.1 메뉴 관련 API

**GET /api/menus**
- **설명**: 커피 메뉴 목록을 조회합니다.
- **요청**: 없음
- **응답**:
  ```json
  {
    "menus": [
      {
        "id": 1,
        "name": "아메리카노(ICE)",
        "description": "시원하고 깔끔한 아이스 아메리카노",
        "price": 4000,
        "imageUrl": "https://example.com/image.jpg",
        "options": [
          {
            "id": 1,
            "name": "샷 추가",
            "additionalPrice": 500
          },
          {
            "id": 2,
            "name": "시럽 추가",
            "additionalPrice": 0
          }
        ]
      }
    ]
  }
  ```
- **에러 응답**:
  - `500 Internal Server Error`: 서버 오류

#### 5.3.2 주문 관련 API

**POST /api/orders**
- **설명**: 새로운 주문을 생성하고 재고를 차감합니다.
- **요청 본문**:
  ```json
  {
    "items": [
      {
        "menuId": 1,
        "menuName": "아메리카노(ICE)",
        "quantity": 2,
        "selectedOptions": [
          {
            "optionId": 1,
            "optionName": "샷 추가",
            "additionalPrice": 500
          }
        ],
        "itemPrice": 4500
      }
    ],
    "totalPrice": 9000
  }
  ```
- **응답**:
  ```json
  {
    "orderId": 1,
    "message": "주문이 성공적으로 생성되었습니다."
  }
  ```
- **에러 응답**:
  - `400 Bad Request`: 재고 부족 또는 잘못된 요청 데이터
    ```json
    {
      "error": "재고가 부족합니다.",
      "details": [
        {
          "menuId": 1,
          "menuName": "아메리카노(ICE)",
          "requested": 5,
          "available": 3
        }
      ]
    }
    ```
  - `500 Internal Server Error`: 서버 오류

**GET /api/orders/:orderId**
- **설명**: 주문 ID로 특정 주문 정보를 조회합니다.
- **요청 파라미터**:
  - `orderId` (URL 파라미터): 주문 ID
- **응답**:
  ```json
  {
    "id": 1,
    "orderTime": "2024-07-31T13:00:00Z",
    "status": "received",
    "totalPrice": 9000,
    "items": [
      {
        "menuId": 1,
        "menuName": "아메리카노(ICE)",
        "quantity": 2,
        "itemPrice": 4500,
        "selectedOptions": [
          {
            "optionId": 1,
            "optionName": "샷 추가",
            "additionalPrice": 500
          }
        ]
      }
    ]
  }
  ```
- **에러 응답**:
  - `404 Not Found`: 주문을 찾을 수 없음
  - `500 Internal Server Error`: 서버 오류

#### 5.3.3 관리자 API

**GET /api/admin/inventory**
- **설명**: 모든 메뉴의 재고 현황을 조회합니다.
- **요청**: 없음
- **응답**:
  ```json
  {
    "inventory": [
      {
        "menuId": 1,
        "menuName": "아메리카노(ICE)",
        "stock": 10
      },
      {
        "menuId": 2,
        "menuName": "아메리카노(HOT)",
        "stock": 8
      }
    ]
  }
  ```

**PUT /api/admin/inventory/:menuId**
- **설명**: 특정 메뉴의 재고를 수정합니다.
- **요청 파라미터**:
  - `menuId` (URL 파라미터): 메뉴 ID
- **요청 본문**:
  ```json
  {
    "stock": 15
  }
  ```
- **응답**:
  ```json
  {
    "menuId": 1,
    "menuName": "아메리카노(ICE)",
    "stock": 15,
    "message": "재고가 성공적으로 업데이트되었습니다."
  }
  ```
- **에러 응답**:
  - `400 Bad Request`: 잘못된 재고 값 (음수 등)
  - `404 Not Found`: 메뉴를 찾을 수 없음
  - `500 Internal Server Error`: 서버 오류

**GET /api/admin/orders**
- **설명**: 모든 주문 목록을 조회합니다. 상태별 필터링 가능합니다.
- **요청 쿼리 파라미터** (선택):
  - `status` (string): 주문 상태 필터 ('received', 'in_progress', 'completed')
- **응답**:
  ```json
  {
    "orders": [
      {
        "id": 1,
        "orderTime": "2024-07-31T13:00:00Z",
        "status": "received",
        "totalPrice": 9000,
        "items": [
          {
            "menuId": 1,
            "menuName": "아메리카노(ICE)",
            "quantity": 2,
            "itemPrice": 4500,
            "selectedOptions": [
              {
                "optionId": 1,
                "optionName": "샷 추가",
                "additionalPrice": 500
              }
            ]
          }
        ]
      }
    ]
  }
  ```

**PUT /api/admin/orders/:orderId/status**
- **설명**: 주문의 상태를 변경합니다.
- **요청 파라미터**:
  - `orderId` (URL 파라미터): 주문 ID
- **요청 본문**:
  ```json
  {
    "status": "in_progress"
  }
  ```
- **응답**:
  ```json
  {
    "orderId": 1,
    "status": "in_progress",
    "message": "주문 상태가 성공적으로 변경되었습니다."
  }
  ```
- **에러 응답**:
  - `400 Bad Request`: 잘못된 상태 값
  - `404 Not Found`: 주문을 찾을 수 없음
  - `500 Internal Server Error`: 서버 오류

**GET /api/admin/dashboard**
- **설명**: 관리자 대시보드 통계를 조회합니다.
- **요청**: 없음
- **응답**:
  ```json
  {
    "totalOrders": 10,
    "receivedOrders": 3,
    "inProgressOrders": 5,
    "completedOrders": 2
  }
  ```

### 5.4 데이터베이스 스키마 예시 (PostgreSQL)

```sql
-- Menu 테이블
CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price INTEGER NOT NULL CHECK (price >= 0),
    image_url VARCHAR(500),
    stock INTEGER NOT NULL DEFAULT 10 CHECK (stock >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Options 테이블
CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    menu_id INTEGER NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    additional_price INTEGER NOT NULL DEFAULT 0 CHECK (additional_price >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders 테이블
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'in_progress', 'completed')),
    total_price INTEGER NOT NULL CHECK (total_price >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OrderItems 테이블
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_id INTEGER NOT NULL REFERENCES menus(id),
    menu_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    item_price INTEGER NOT NULL CHECK (item_price >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OrderItemOptions 테이블
CREATE TABLE order_item_options (
    id SERIAL PRIMARY KEY,
    order_item_id INTEGER NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
    option_id INTEGER NOT NULL REFERENCES options(id),
    option_name VARCHAR(255) NOT NULL,
    additional_price INTEGER NOT NULL CHECK (additional_price >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_orders_order_time ON orders(order_time DESC);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_menu_id ON order_items(menu_id);
CREATE INDEX idx_order_item_options_order_item_id ON order_item_options(order_item_id);
CREATE INDEX idx_options_menu_id ON options(menu_id);
```

### 5.5 트랜잭션 처리

**주문 생성 시 트랜잭션:**
- 주문 생성, 주문 상세 저장, 재고 차감은 하나의 트랜잭션으로 처리되어야 합니다.
- 재고 부족이나 다른 오류 발생 시 모든 변경사항이 롤백되어야 합니다.
- 데이터베이스의 ACID 속성을 보장하기 위해 트랜잭션을 사용합니다.

### 5.6 에러 처리

**공통 에러 응답 형식:**
```json
{
  "error": "에러 메시지",
  "details": {} // 선택적 상세 정보
}
```

**HTTP 상태 코드:**
- `200 OK`: 성공
- `400 Bad Request`: 잘못된 요청 (재고 부족, 잘못된 데이터 등)
- `404 Not Found`: 리소스를 찾을 수 없음
- `500 Internal Server Error`: 서버 내부 오류
