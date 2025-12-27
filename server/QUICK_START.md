# 빠른 시작 가이드

## 현재 상태
- ✅ 서버는 실행 중입니다 (http://localhost:3001)
- ❌ 데이터베이스 연결 실패 (비밀번호 필요)

## 즉시 해결 방법

### PostgreSQL.app 사용 (가장 쉬움)

1. **Applications 폴더에서 PostgreSQL.app 실행**
   
2. 왼쪽 사이드바에서 **"PostgreSQL 18"** (또는 설치된 버전) 클릭

3. 상단 메뉴에서 **Tools** > **Query Tool** 클릭

4. 다음 SQL 명령어를 복사하여 붙여넣고 실행 (Cmd+Enter):

```sql
ALTER USER postgres PASSWORD 'Edwardsu486!';
CREATE DATABASE coffee_order_db;
```

5. 서버 재시작 (터미널에서 Ctrl+C 후):

```bash
cd "/Users/edwardcha/Desktop/1000. AI_커서/server"
export PATH="/Library/PostgreSQL/18/bin:$PATH"
INIT_DB=true npm run dev
```

### 확인

서버 로그에서 다음 메시지가 보이면 성공입니다:

```
✅ PostgreSQL 데이터베이스에 연결되었습니다.
📊 데이터베이스 연결 테스트 성공
✅ 데이터베이스 스키마가 생성되었습니다.
✅ 초기 데이터가 삽입되었습니다.
```

그러면 프런트엔드에서 메뉴가 정상적으로 로드됩니다!

