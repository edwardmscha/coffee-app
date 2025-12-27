#!/bin/bash

# 새로 설치된 PostgreSQL 설정 스크립트

echo "🔧 새로 설치된 PostgreSQL 설정"
echo "================================"
echo ""

# Postgres.app 경로 찾기
PG_APP="/Applications/Postgres.app"
PG_BIN=""

if [ -d "$PG_APP" ]; then
    # Postgres.app의 bin 경로 찾기
    VERSIONS_DIR="$PG_APP/Contents/Versions"
    if [ -d "$VERSIONS_DIR" ]; then
        LATEST_VERSION=$(ls -1 "$VERSIONS_DIR" | sort -V | tail -1)
        PG_BIN="$VERSIONS_DIR/$LATEST_VERSION/bin"
        if [ -f "$PG_BIN/psql" ]; then
            echo "✅ Postgres.app 발견: $PG_BIN"
            export PATH="$PG_BIN:$PATH"
        fi
    fi
fi

# PostgreSQL이 없으면 종료
if [ -z "$PG_BIN" ] || [ ! -f "$PG_BIN/psql" ]; then
    echo "❌ PostgreSQL을 찾을 수 없습니다."
    echo "   Postgres.app을 실행해주세요."
    exit 1
fi

# PostgreSQL 서비스 확인
echo ""
echo "PostgreSQL 서비스 확인 중..."
if pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "✅ PostgreSQL이 실행 중입니다."
else
    echo "⚠️  PostgreSQL이 실행되지 않았습니다."
    echo "   Postgres.app을 실행해주세요."
    exit 1
fi

# .env 파일에서 비밀번호 읽기
cd "$(dirname "$0")"
if [ ! -f ".env" ]; then
    echo "❌ .env 파일을 찾을 수 없습니다."
    exit 1
fi

source .env 2>/dev/null || true

if [ -z "$DB_PASSWORD" ]; then
    echo "❌ .env 파일에서 DB_PASSWORD를 찾을 수 없습니다."
    exit 1
fi

echo ""
echo "데이터베이스 설정 중..."
echo "비밀번호: $DB_PASSWORD"

# 기본 데이터베이스에 연결 테스트
echo ""
echo "1. PostgreSQL 연결 테스트..."
if psql -U postgres -h localhost -d postgres -c "SELECT 1;" > /dev/null 2>&1; then
    echo "   ✅ PostgreSQL에 연결되었습니다."
elif PGPASSWORD="$DB_PASSWORD" psql -U postgres -h localhost -d postgres -c "SELECT 1;" > /dev/null 2>&1; then
    echo "   ✅ PostgreSQL에 연결되었습니다 (비밀번호 사용)."
else
    echo "   ⚠️  PostgreSQL 연결 실패"
    echo "   비밀번호를 설정해야 할 수 있습니다."
    echo ""
    echo "   Postgres.app > Tools > psql 에서 실행:"
    echo "   ALTER USER postgres PASSWORD '$DB_PASSWORD';"
    echo ""
    read -p "비밀번호를 설정했나요? (y/n) " -n 1 -r
    echo
    if [[ ! $REply =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 데이터베이스 생성
echo ""
echo "2. 데이터베이스 생성 확인..."
DB_EXISTS=$(PGPASSWORD="$DB_PASSWORD" psql -U postgres -h localhost -tAc "SELECT 1 FROM pg_database WHERE datname='coffee_order_db';" 2>/dev/null || psql -U postgres -h localhost -tAc "SELECT 1 FROM pg_database WHERE datname='coffee_order_db';" 2>/dev/null)

if [ "$DB_EXISTS" = "1" ]; then
    echo "   ✅ 데이터베이스 'coffee_order_db'가 이미 존재합니다."
else
    echo "   데이터베이스 생성 중..."
    if PGPASSWORD="$DB_PASSWORD" psql -U postgres -h localhost -c "CREATE DATABASE coffee_order_db;" 2>&1; then
        echo "   ✅ 데이터베이스가 생성되었습니다."
    elif psql -U postgres -h localhost -c "CREATE DATABASE coffee_order_db;" 2>&1; then
        echo "   ✅ 데이터베이스가 생성되었습니다."
    else
        echo "   ❌ 데이터베이스 생성 실패"
        echo "   수동으로 생성해주세요:"
        echo "   psql -U postgres -c \"CREATE DATABASE coffee_order_db;\""
        exit 1
    fi
fi

echo ""
echo "================================"
echo "✅ PostgreSQL 설정 완료!"
echo ""
echo "다음 단계:"
echo "1. 서버 시작: INIT_DB=true npm run dev"
echo "2. 프런트엔드 시작: cd ../UI && npm run dev"

