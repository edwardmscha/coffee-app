#!/bin/bash

# 비밀번호 설정 및 서버 시작 스크립트

export PATH="/Library/PostgreSQL/18/bin:$PATH"

DB_PASSWORD="Edwardsu486!"
DB_NAME="coffee_order_db"

echo "🔧 PostgreSQL 비밀번호 설정 및 데이터베이스 설정"
echo ""

# PostgreSQL.app을 통해 비밀번호를 설정했다고 가정하고
# 직접 연결을 시도합니다

echo "1. 데이터베이스 연결 테스트..."
if PGPASSWORD="$DB_PASSWORD" psql -U postgres -h localhost -c "SELECT 1;" > /dev/null 2>&1; then
    echo "✅ 비밀번호가 올바릅니다!"
    
    echo ""
    echo "2. 데이터베이스 생성 확인..."
    DB_EXISTS=$(PGPASSWORD="$DB_PASSWORD" psql -U postgres -h localhost -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME';")
    
    if [ "$DB_EXISTS" = "1" ]; then
        echo "✅ 데이터베이스 '$DB_NAME'가 이미 존재합니다."
    else
        echo "데이터베이스 생성 중..."
        PGPASSWORD="$DB_PASSWORD" psql -U postgres -h localhost -c "CREATE DATABASE $DB_NAME;" 2>&1
        if [ $? -eq 0 ]; then
            echo "✅ 데이터베이스 '$DB_NAME'가 생성되었습니다."
        else
            echo "❌ 데이터베이스 생성 실패"
            exit 1
        fi
    fi
    
    echo ""
    echo "✅ 모든 설정이 완료되었습니다!"
    echo ""
    echo "서버를 시작하려면:"
    echo "   cd $(pwd)"
    echo "   INIT_DB=true npm run dev"
    
else
    echo "❌ 비밀번호가 맞지 않습니다."
    echo ""
    echo "PostgreSQL 비밀번호를 설정해야 합니다."
    echo ""
    echo "방법 1: PostgreSQL.app 사용"
    echo "   1. Applications > PostgreSQL.app 실행"
    echo "   2. Tools > Query Tool"
    echo "   3. 다음 SQL 실행:"
    echo "      ALTER USER postgres PASSWORD 'Edwardsu486!';"
    echo "      CREATE DATABASE coffee_order_db;"
    echo ""
    echo "방법 2: 터미널에서 (비밀번호를 알고 있다면)"
    echo "   psql -U postgres"
    echo "   ALTER USER postgres PASSWORD 'Edwardsu486!';"
    echo "   CREATE DATABASE coffee_order_db;"
    echo "   \\q"
    echo ""
    exit 1
fi

