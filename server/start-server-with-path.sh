#!/bin/bash

# PostgreSQL PATH를 포함한 서버 시작 스크립트

cd "$(dirname "$0")"

# Postgres.app PATH 추가
export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"

echo "🚀 서버를 시작합니다..."
echo "📍 PostgreSQL PATH: /Applications/Postgres.app/Contents/Versions/latest/bin"
echo ""

# 데이터베이스 초기화 옵션
if [ "$1" == "--init" ] || [ "$1" == "-i" ]; then
    echo "🗄️  데이터베이스 초기화 모드"
    INIT_DB=true npm run dev
else
    echo "🔄 일반 모드"
    npm run dev
fi

