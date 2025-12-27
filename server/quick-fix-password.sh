#!/bin/bash

# 빠른 비밀번호 재설정 스크립트

export PATH="/Library/PostgreSQL/18/bin:$PATH"

echo "🔐 PostgreSQL 비밀번호 재설정"
echo ""
echo "이 스크립트는 PostgreSQL에 접속하여 비밀번호를 'Edy1821712!'로 설정합니다."
echo ""

# pg_hba.conf를 trust로 변경하여 비밀번호 없이 접속 가능하도록 함
PG_HBA="/Library/PostgreSQL/18/data/pg_hba.conf"

if [ -f "$PG_HBA" ]; then
    echo "pg_hba.conf 파일을 찾았습니다: $PG_HBA"
    echo ""
    echo "⚠️  보안을 위해 로컬 접속을 trust 방식으로 변경합니다."
    echo "   (개발 환경에서만 사용하세요)"
    echo ""
    
    # 백업 생성
    sudo cp "$PG_HBA" "${PG_HBA}.backup"
    echo "✅ 백업 생성: ${PG_HBA}.backup"
    
    # md5를 trust로 변경
    sudo sed -i '' 's/^local   all             all.*md5/local   all             all                                     trust/' "$PG_HBA"
    sudo sed -i '' 's/^host    all             all.*127.0.0.1\/32.*md5/host    all             all             127.0.0.1\/32            trust/' "$PG_HBA"
    
    echo "✅ pg_hba.conf 파일이 수정되었습니다."
    echo ""
    echo "PostgreSQL을 재시작해야 합니다."
    echo "PostgreSQL.app을 재시작하거나 다음 명령어를 사용하세요:"
    echo ""
    echo "   sudo -u _postgres /Library/PostgreSQL/18/bin/pg_ctl restart -D /Library/PostgreSQL/18/data"
    echo ""
    echo "재시작 후 다음 명령어로 비밀번호를 설정하세요:"
    echo ""
    echo "   psql -U postgres -c \"ALTER USER postgres PASSWORD 'Edy1821712!';\""
    echo "   psql -U postgres -c \"CREATE DATABASE coffee_order_db;\""
    echo ""
else
    echo "❌ pg_hba.conf 파일을 찾을 수 없습니다: $PG_HBA"
    echo ""
    echo "수동으로 PostgreSQL에 접속하여 비밀번호를 설정하세요:"
    echo ""
    echo "   psql -U postgres"
    echo "   ALTER USER postgres PASSWORD 'Edy1821712!';"
    echo "   CREATE DATABASE coffee_order_db;"
    echo "   \\q"
fi

