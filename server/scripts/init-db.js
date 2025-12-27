require('dotenv').config();
const { initDatabase } = require('../config/initDb');
const { testConnection } = require('../config/database');

const run = async () => {
  try {
    console.log('데이터베이스 초기화를 시작합니다...');
    
    // 연결 테스트
    const connected = await testConnection();
    if (!connected) {
      console.error('데이터베이스 연결 실패');
      process.exit(1);
    }

    // 데이터베이스 초기화
    await initDatabase();
    
    console.log('✅ 데이터베이스 초기화가 완료되었습니다.');
    process.exit(0);
  } catch (error) {
    console.error('❌ 데이터베이스 초기화 오류:', error);
    process.exit(1);
  }
};

run();

