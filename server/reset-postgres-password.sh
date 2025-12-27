#!/bin/bash

# PostgreSQL 비밀번호 재설정 스크립트

export PATH="/Library/PostgreSQL/18/bin:$PATH"

echo "🔐 PostgreSQL 비밀번호 재설정"
echo ""
echo "현재 .env 파일의 비밀번호: Edwardsu486!"
echo ""

# PostgreSQL에 비밀번호 없이 접속 시도 (trust 인증이 설정되어 있다면)
# 그렇지 않으면 사용자가 직접 입력해야 합니다.

echo "PostgreSQL에 접속하여 비밀번호를 재설정하려면:"
echo ""
echo "1. PostgreSQL에 접속:"
echo "   psql -U postgres"
echo ""
echo "2. 비밀번호 설정 (PostgreSQL 프롬프트에서):"
echo "   ALTER USER postgres PASSWORD 'Edwardsu486!';"
echo ""
echo "3. 데이터베이스 생성:"
echo "   CREATE DATABASE coffee_order_db;"
echo ""
echo "4. 종료:"
echo "   \\q"
echo ""

# 자동으로 시도
echo "자동으로 비밀번호 재설정을 시도합니다..."
PGPASSWORD='' psql -U postgres -c "ALTER USER postgres PASSWORD 'Edwardsu486!';" 2>&1 || echo "수동으로 실행해야 할 수 있습니다."

