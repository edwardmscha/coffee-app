#!/bin/bash

# PostgreSQL PATH 추가 스크립트

echo "📝 PostgreSQL PATH를 추가하는 중..."

# zsh 설정 파일 확인
ZSH_RC="$HOME/.zshrc"
BASHPROFILE="$HOME/.bash_profile"

# PostgreSQL 18 경로 (최신 버전 사용)
PG_PATH="/Library/PostgreSQL/18/bin"

# zsh 사용 시
if [ -f "$ZSH_RC" ]; then
    # 이미 추가되어 있는지 확인
    if ! grep -q "PostgreSQL.*bin" "$ZSH_RC"; then
        echo "" >> "$ZSH_RC"
        echo "# PostgreSQL PATH" >> "$ZSH_RC"
        echo "export PATH=\"$PG_PATH:\$PATH\"" >> "$ZSH_RC"
        echo "✅ ~/.zshrc에 PostgreSQL PATH가 추가되었습니다."
    else
        echo "ℹ️  ~/.zshrc에 이미 PostgreSQL PATH가 설정되어 있습니다."
    fi
fi

# bash_profile 사용 시
if [ -f "$BASHPROFILE" ]; then
    if ! grep -q "PostgreSQL.*bin" "$BASHPROFILE"; then
        echo "" >> "$BASHPROFILE"
        echo "# PostgreSQL PATH" >> "$BASHPROFILE"
        echo "export PATH=\"$PG_PATH:\$PATH\"" >> "$BASHPROFILE"
        echo "✅ ~/.bash_profile에 PostgreSQL PATH가 추가되었습니다."
    else
        echo "ℹ️  ~/.bash_profile에 이미 PostgreSQL PATH가 설정되어 있습니다."
    fi
fi

# 현재 셸에 즉시 적용
export PATH="$PG_PATH:$PATH"

echo ""
echo "✅ 완료! 다음 명령어로 확인하세요:"
echo "   source ~/.zshrc  (또는 새 터미널 열기)"
echo "   psql --version"
echo ""

