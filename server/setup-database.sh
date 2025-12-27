#!/bin/bash

# 데이터베이스 설정 스크립트

export PATH="/Library/PostgreSQL/18/bin:$PATH"

DB_NAME="coffee_order_db"
DB_USER="postgres"
DB_PASSWORD="Edwardsu486!"

echo "🗄️  데이터베이스 설정을 시작합니다..."
echo ""

# PostgreSQL이 실행 중인지 확인
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "❌ PostgreSQL이 실행되지 않고 있습니다."
    echo "   PostgreSQL.app을 실행하거나 다음 명령어를 사용하세요:"
    echo "   brew services start postgresql@18"
    exit 1
fi

echo "✅ PostgreSQL이 실행 중입니다."
echo ""

# 방법 1: PGPASSWORD 환경 변수 사용 (비밀번호가 맞는 경우)
echo "데이터베이스 연결 테스트 중..."
if PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -h localhost -d postgres -c "SELECT 1;" > /dev/null 2>&1; then
    echo "✅ 비밀번호가 올바릅니다!"
    
    # 데이터베이스 생성
    echo "데이터베이스 생성 중..."
    if PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -h localhost -d postgres -c "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME';" | grep -q 1; then
        echo "✅ 데이터베이스 '$DB_NAME'가 이미 존재합니다."
    else
        PGPASSWORD="$DB_PASSWORD" psql -U "$DB_USER" -h localhost -d postgres -c "CREATE DATABASE $DB_NAME;" 2>&1
        if [ $? -eq 0 ]; then
            echo "✅ 데이터베이스 '$DB_NAME'가 생성되었습니다."
        else
            echo "❌ 데이터베이스 생성 실패"
        fi
    fi
else
    echo "❌ 비밀번호가 맞지 않습니다."
    echo ""
    echo "수동으로 비밀번호를 재설정하세요:"
    echo ""
    echo "1. PostgreSQL에 접속 (비밀번호를 모르면 비밀번호 없이 시도):"
    echo "   psql -U postgres"
    echo ""
    echo "2. 비밀번호 설정:"
    echo "   ALTER USER postgres PASSWORD 'Edy1821712!';"
    echo ""
    echo "3. 데이터베이스 생성:"
    echo "   CREATE DATABASE coffee_order_db;"
    echo ""
    echo "4. 종료:"
    echo "   \\q"
    echo ""
    echo "그 다음 이 스크립트를 다시 실행하세요."
    exit 1
fi

echo ""
echo "✅ 데이터베이스 설정이 완료되었습니다!"
echo ""
echo "다음 단계:"
echo "   cd server"
echo "   INIT_DB=true npm run dev"

