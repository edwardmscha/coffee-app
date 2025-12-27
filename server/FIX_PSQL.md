# psql 명령어 오류 해결 방법

## 문제
`psql: command not found` 오류가 발생합니다.

## 원인
PostgreSQL이 설치되어 있지만, 명령어 라인 도구(`psql`)가 시스템 PATH에 등록되어 있지 않습니다.

## 해결 방법

### 방법 1: PostgreSQL.app에서 직접 실행 (가장 간단)

PostgreSQL.app을 사용하는 경우, 다음 경로에서 직접 실행할 수 있습니다:

```bash
# PostgreSQL 16 사용하는 경우
/Applications/PostgreSQL\ 16.app/Contents/Versions/*/bin/psql -U postgres

# PostgreSQL 18 사용하는 경우
/Applications/PostgreSQL\ 18.app/Contents/Versions/*/bin/psql -U postgres
```

### 방법 2: PATH에 추가 (권장)

터미널 설정 파일에 PostgreSQL bin 경로를 추가합니다:

1. **zsh 사용 시** (macOS 기본):
   ```bash
   # ~/.zshrc 파일 편집
   nano ~/.zshrc
   
   # 다음 줄 추가 (PostgreSQL 16인 경우)
   export PATH="/Applications/PostgreSQL 16.app/Contents/Versions/latest/bin:$PATH"
   
   # 또는 PostgreSQL 18인 경우
   export PATH="/Applications/PostgreSQL 18.app/Contents/Versions/latest/bin:$PATH"
   
   # 저장 후 설정 적용
   source ~/.zshrc
   ```

2. **bash 사용 시**:
   ```bash
   # ~/.bash_profile 또는 ~/.bashrc 파일 편집
   nano ~/.bash_profile
   
   # 다음 줄 추가
   export PATH="/Applications/PostgreSQL 16.app/Contents/Versions/latest/bin:$PATH"
   
   # 저장 후 설정 적용
   source ~/.bash_profile
   ```

### 방법 3: 심볼릭 링크 생성

```bash
# /usr/local/bin에 심볼릭 링크 생성 (PostgreSQL 16인 경우)
sudo ln -s /Applications/PostgreSQL\ 16.app/Contents/Versions/latest/bin/psql /usr/local/bin/psql
sudo ln -s /Applications/PostgreSQL\ 16.app/Contents/Versions/latest/bin/pg_config /usr/local/bin/pg_config
```

### 방법 4: Homebrew로 PostgreSQL 클라이언트만 설치

```bash
# Homebrew 설치되어 있다면
brew install postgresql@16

# PATH에 추가
echo 'export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

## 확인

설정 후 다음 명령어로 확인:

```bash
# psql 위치 확인
which psql

# 버전 확인
psql --version

# PostgreSQL 연결 테스트
psql -U postgres -c "SELECT version();"
```

## 참고 사항

- PostgreSQL.app을 사용하는 경우, GUI 애플리케이션이므로 명령어 라인 도구를 별도로 설치해야 할 수 있습니다.
- PostgreSQL.app의 "Command Line Tools" 옵션을 통해 설치할 수도 있습니다.
- 설치된 PostgreSQL의 정확한 경로를 확인하려면:
  ```bash
  find /Applications -name psql 2>/dev/null
  ```

