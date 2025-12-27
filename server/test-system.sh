#!/bin/bash

# 전체 시스템 테스트 스크립트

echo "🔍 커피 주문 앱 시스템 전체 테스트"
echo "=================================="
echo ""

# 1. PostgreSQL 설치 확인
echo "1️⃣  PostgreSQL 설치 확인 중..."
PG_PATH=""
if [ -d "/Library/PostgreSQL/18" ]; then
    PG_PATH="/Library/PostgreSQL/18/bin"
    echo "   ✅ PostgreSQL 18 발견: $PG_PATH"
elif [ -d "/Library/PostgreSQL/16" ]; then
    PG_PATH="/Library/PostgreSQL/16/bin"
    echo "   ✅ PostgreSQL 16 발견: $PG_PATH"
elif [ -d "/Applications/PostgreSQL 18.app" ]; then
    PG_PATH="/Applications/PostgreSQL 18.app/Contents/Versions/latest/bin"
    echo "   ✅ PostgreSQL 18.app 발견"
else
    echo "   ❌ PostgreSQL을 찾을 수 없습니다."
    echo "   PostgreSQL.app을 실행하거나 설치해주세요."
    exit 1
fi

export PATH="$PG_PATH:$PATH"

# 2. PostgreSQL 서비스 확인
echo ""
echo "2️⃣  PostgreSQL 서비스 확인 중..."
if pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "   ✅ PostgreSQL이 실행 중입니다."
else
    echo "   ⚠️  PostgreSQL이 실행되지 않았습니다."
    echo "   PostgreSQL.app을 실행해주세요."
fi

# 3. 데이터베이스 연결 테스트
echo ""
echo "3️⃣  데이터베이스 연결 테스트 중..."
cd "$(dirname "$0")"
source .env 2>/dev/null || true

if [ -z "$DB_PASSWORD" ]; then
    echo "   ❌ .env 파일에서 DB_PASSWORD를 찾을 수 없습니다."
    exit 1
fi

if PGPASSWORD="$DB_PASSWORD" psql -U postgres -h localhost -c "SELECT 1;" > /dev/null 2>&1; then
    echo "   ✅ 데이터베이스 연결 성공!"
else
    echo "   ❌ 데이터베이스 연결 실패"
    echo "   비밀번호를 확인하거나 PostgreSQL 비밀번호를 설정해주세요."
    exit 1
fi

# 4. 데이터베이스 존재 확인
echo ""
echo "4️⃣  데이터베이스 존재 확인 중..."
DB_EXISTS=$(PGPASSWORD="$DB_PASSWORD" psql -U postgres -h localhost -tAc "SELECT 1 FROM pg_database WHERE datname='coffee_order_db';" 2>/dev/null)
if [ "$DB_EXISTS" = "1" ]; then
    echo "   ✅ 데이터베이스 'coffee_order_db'가 존재합니다."
else
    echo "   ⚠️  데이터베이스 'coffee_order_db'가 없습니다."
    echo "   생성 중..."
    PGPASSWORD="$DB_PASSWORD" psql -U postgres -h localhost -c "CREATE DATABASE coffee_order_db;" 2>&1
    if [ $? -eq 0 ]; then
        echo "   ✅ 데이터베이스가 생성되었습니다."
    else
        echo "   ❌ 데이터베이스 생성 실패"
        exit 1
    fi
fi

# 5. 백엔드 서버 테스트
echo ""
echo "5️⃣  백엔드 서버 테스트 중..."
if curl -s http://localhost:3001/ > /dev/null 2>&1; then
    echo "   ✅ 백엔드 서버가 실행 중입니다."
else
    echo "   ⚠️  백엔드 서버가 실행되지 않았습니다."
    echo "   서버를 시작하려면: cd server && npm run dev"
fi

# 6. API 엔드포인트 테스트
echo ""
echo "6️⃣  API 엔드포인트 테스트 중..."
if curl -s http://localhost:3001/api/menus > /dev/null 2>&1; then
    MENU_RESPONSE=$(curl -s http://localhost:3001/api/menus)
    if echo "$MENU_RESPONSE" | grep -q "menus"; then
        echo "   ✅ /api/menus 엔드포인트 정상 작동"
    elif echo "$MENU_RESPONSE" | grep -q "데이터베이스"; then
        echo "   ⚠️  /api/menus: 데이터베이스 연결 오류"
    else
        echo "   ⚠️  /api/menus: 예상치 못한 응답"
    fi
else
    echo "   ❌ /api/menus 엔드포인트에 연결할 수 없습니다."
fi

echo ""
echo "=================================="
echo "✅ 시스템 테스트 완료!"
echo ""
echo "다음 단계:"
echo "1. 데이터베이스 초기화: INIT_DB=true npm run dev"
echo "2. 프런트엔드 시작: cd ../UI && npm run dev"

