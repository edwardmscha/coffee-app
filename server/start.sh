#!/bin/bash

# 서버 시작 스크립트

# 서버 폴더로 이동
cd "$(dirname "$0")"

echo "🚀 커피 주문 앱 서버를 시작합니다..."
echo ""

# PostgreSQL PATH 추가
export PATH="/Library/PostgreSQL/18/bin:$PATH"

# 환경 변수 확인
if [ ! -f ".env" ]; then
    echo "❌ .env 파일을 찾을 수 없습니다."
    exit 1
fi

echo "📝 환경 변수 확인 완료"
echo ""

# 데이터베이스 초기화 여부 확인
if [ "$1" == "--init" ] || [ "$1" == "-i" ]; then
    echo "🗄️  데이터베이스 초기화 모드로 시작합니다..."
    INIT_DB=true npm run dev
else
    echo "🔄 일반 모드로 시작합니다..."
    echo "   (데이터베이스 초기화를 원하면: ./start.sh --init)"
    echo ""
    npm run dev
fi


