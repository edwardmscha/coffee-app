// 데이터베이스 스키마만 생성하는 스크립트 (시드 데이터 없이)
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

const createSchema = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    console.log('🗄️  데이터베이스 스키마 생성 시작...');
    
    // 스키마 파일 읽기
    const schemaPath = path.join(__dirname, '../config/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // 스키마 실행 (여러 SQL 문을 세미콜론으로 분리하여 실행)
    const schemaStatements = schemaSql.split(';').filter(stmt => stmt.trim().length > 0);
    for (const statement of schemaStatements) {
      if (statement.trim()) {
        await client.query(statement);
      }
    }
    
    console.log('✅ 데이터베이스 스키마가 생성되었습니다.');
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ 데이터베이스 스키마 생성 오류:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
    process.exit(0);
  }
};

createSchema().catch((error) => {
  console.error('❌ 스크립트 실행 실패:', error);
  process.exit(1);
});

