// 프로덕션 환경에서 데이터베이스 초기화 스크립트
require('dotenv').config();
const { initDatabase } = require('../config/initDb');

const initializeProductionDB = async () => {
  try {
    console.log('🗄️  프로덕션 데이터베이스 초기화 시작...');
    await initDatabase();
    console.log('✅ 데이터베이스 초기화 완료!');
    process.exit(0);
  } catch (error) {
    console.error('❌ 데이터베이스 초기화 실패:', error);
    process.exit(1);
  }
};

initializeProductionDB();

