// 데이터베이스 연결 확인 스크립트
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: 'postgres', // 기본 데이터베이스에 연결
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

async function checkDatabase() {
  try {
    console.log('📊 데이터베이스 연결 테스트 중...');
    console.log(`   호스트: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`   포트: ${process.env.DB_PORT || 5432}`);
    console.log(`   사용자: ${process.env.DB_USER || 'postgres'}`);
    
    const client = await pool.connect();
    console.log('✅ PostgreSQL에 연결되었습니다!');
    
    // 데이터베이스 존재 확인
    const dbCheck = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DB_NAME || 'coffee_order_db']
    );
    
    if (dbCheck.rows.length === 0) {
      console.log('\n⚠️  데이터베이스가 존재하지 않습니다.');
      console.log(`데이터베이스를 생성하려면 다음 명령을 실행하세요:`);
      console.log(`   psql -U ${process.env.DB_USER || 'postgres'} -c "CREATE DATABASE ${process.env.DB_NAME || 'coffee_order_db'};"`);
    } else {
      console.log(`✅ 데이터베이스 '${process.env.DB_NAME || 'coffee_order_db'}'가 존재합니다.`);
    }
    
    client.release();
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ 데이터베이스 연결 실패:', error.message);
    console.error('\n해결 방법:');
    console.error('1. PostgreSQL이 실행 중인지 확인하세요: brew services list (macOS)');
    console.error('2. .env 파일의 DB_PASSWORD가 올바른지 확인하세요');
    console.error('3. PostgreSQL 비밀번호를 확인하거나 재설정하세요');
    await pool.end();
    process.exit(1);
  }
}

checkDatabase();

