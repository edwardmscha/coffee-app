#!/bin/bash

# 서버 시작 스크립트
cd "$(dirname "$0")"

echo "🚀 백엔드 서버를 시작합니다..."
echo "📝 데이터베이스 초기화를 수행합니다 (INIT_DB=true)"
echo ""

# 데이터베이스 초기화 플래그 설정
export INIT_DB=true

# 서버 시작
npm run dev

