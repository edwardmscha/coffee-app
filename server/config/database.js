const { Pool } = require('pg');

// 데이터베이스 연결 풀 생성
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'coffee_order_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  // SSL 설정: 프로덕션 환경(Render 등)에서는 SSL 필수
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false // Render PostgreSQL의 경우 자체 서명 인증서 사용
  } : false,
  // 연결 풀 설정
  max: 20, // 최대 연결 수
  idleTimeoutMillis: 30000, // 유휴 연결 타임아웃
  connectionTimeoutMillis: 2000, // 연결 타임아웃
});

// 연결 이벤트 핸들러
pool.on('connect', () => {
  console.log('✅ PostgreSQL 데이터베이스에 연결되었습니다.');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL 데이터베이스 연결 오류:', err.message);
  // 프로세스를 종료하지 않고 계속 실행 (개발 환경에서 유용)
  // process.exit(-1);
});

// 연결 테스트 함수
const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('📊 데이터베이스 연결 테스트 성공:', result.rows[0].now);
    client.release();
    return true;
  } catch (error) {
    console.error('❌ 데이터베이스 연결 테스트 실패:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection
};

