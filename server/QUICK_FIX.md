# 빠른 해결 방법

## 문제
`psql: command not found` 오류

## 즉시 해결 (현재 터미널 세션에서)

다음 명령어를 실행하세요:

```bash
export PATH="/Library/PostgreSQL/18/bin:$PATH"
```

그 다음 `psql` 명령어를 사용할 수 있습니다:

```bash
psql -U postgres
```

## 영구적으로 해결

터미널 설정 파일에 PATH를 추가하세요:

```bash
# zsh 사용 시 (macOS 기본)
echo 'export PATH="/Library/PostgreSQL/18/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 또는 bash 사용 시
echo 'export PATH="/Library/PostgreSQL/18/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile
```

## 자동 스크립트 사용

다음 스크립트를 실행하면 자동으로 설정됩니다:

```bash
cd server
./add-postgresql-to-path.sh
source ~/.zshrc
```

## 확인

```bash
# psql 버전 확인
psql --version

# PostgreSQL 연결 테스트
psql -U postgres -c "SELECT version();"
```

