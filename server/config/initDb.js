const fs = require('fs');
const path = require('path');
const { pool } = require('./database');

const initDatabase = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // 스키마 파일 읽기
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // 스키마 실행 (여러 SQL 문을 세미콜론으로 분리하여 실행)
    const schemaStatements = schemaSql.split(';').filter(stmt => stmt.trim().length > 0);
    for (const statement of schemaStatements) {
      if (statement.trim()) {
        await client.query(statement);
      }
    }
    console.log('✅ 데이터베이스 스키마가 생성되었습니다.');
    
    // 시드 파일 읽기
    const seedPath = path.join(__dirname, 'seed.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    
    // 시드 데이터 삽입 (여러 SQL 문을 세미콜론으로 분리하여 실행)
    const seedStatements = seedSql.split(';').filter(stmt => stmt.trim().length > 0);
    for (const statement of seedStatements) {
      if (statement.trim()) {
        await client.query(statement);
      }
    }
    console.log('✅ 초기 데이터가 삽입되었습니다.');
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ 데이터베이스 초기화 오류:', error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { initDatabase };

