#!/bin/bash

# 데이터베이스 설정 스크립트 (간단 버전)

export PATH="/Library/PostgreSQL/18/bin:$PATH"

DB_PASSWORD="Edwardsu486!"
DB_NAME="coffee_order_db"

echo "🗄️  PostgreSQL 데이터베이스 설정을 시작합니다..."
echo ""

# 현재 비밀번호 확인 (비밀번호 없이 접속 시도)
echo "현재 PostgreSQL 비밀번호로 접속을 시도합니다..."
echo "비밀번호 프롬프트가 나타나면 현재 비밀번호를 입력하세요."
echo ""

# 비밀번호 설정
echo "1. 비밀번호 설정 중..."
if psql -U postgres -c "ALTER USER postgres PASSWORD '$DB_PASSWORD';" 2>&1; then
    echo "✅ 비밀번호가 설정되었습니다."
else
    echo "❌ 비밀번호 설정 실패"
    echo ""
    echo "다음 중 하나를 시도하세요:"
    echo "1. PostgreSQL.app > Tools > Query Tool에서 실행"
    echo "2. psql -U postgres 로 접속 후 ALTER USER 명령어 실행"
    exit 1
fi

echo ""
echo "2. 데이터베이스 생성 중..."
if psql -U postgres -c "CREATE DATABASE $DB_NAME;" 2>&1; then
    echo "✅ 데이터베이스 '$DB_NAME'가 생성되었습니다."
else
    # 이미 존재할 수도 있으므로 확인
    DB_EXISTS=$(PGPASSWORD="$DB_PASSWORD" psql -U postgres -h localhost -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME';" 2>/dev/null)
    if [ "$DB_EXISTS" = "1" ]; then
        echo "ℹ️  데이터베이스 '$DB_NAME'가 이미 존재합니다."
    else
        echo "❌ 데이터베이스 생성 실패"
        exit 1
    fi
fi

echo ""
echo "✅ 데이터베이스 설정이 완료되었습니다!"
echo ""
echo "다음 명령어로 서버를 시작하세요:"
echo "   cd $(pwd)"
echo "   export PATH=\"/Library/PostgreSQL/18/bin:\$PATH\""
echo "   INIT_DB=true npm run dev"


