require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');
const { initDatabase } = require('./config/initDb');

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: '커피 주문 앱 서버가 실행 중입니다.' });
});

// API 라우트
app.use('/api/menus', require('./routes/menus'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: '서버 내부 오류가 발생했습니다.',
    message: err.message
  });
});

// 404 핸들링
app.use((req, res) => {
  res.status(404).json({
    error: '요청한 리소스를 찾을 수 없습니다.'
  });
});

// 서버 시작
const startServer = async () => {
  // 데이터베이스 연결 테스트
  const dbConnected = await testConnection();
  if (!dbConnected) {
    console.log('⚠️  데이터베이스 연결 실패. 서버는 시작되지만 데이터베이스 기능은 사용할 수 없습니다.');
    console.log('⚠️  데이터베이스 설정을 확인하고 재시작해주세요.');
  } else {
    // 데이터베이스 초기화 (테이블 생성 및 초기 데이터 삽입)
    // 주의: 처음 한 번만 실행하거나, 개발 환경에서만 사용
    if (process.env.INIT_DB === 'true') {
      try {
        await initDatabase();
      } catch (error) {
        console.error('데이터베이스 초기화 오류:', error);
      }
    }
  }

  app.listen(PORT, () => {
    console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`📍 http://localhost:${PORT}`);
    if (dbConnected) {
      console.log(`📝 API 엔드포인트:`);
      console.log(`   - GET  /api/menus`);
      console.log(`   - POST /api/orders`);
      console.log(`   - GET  /api/orders/:orderId`);
      console.log(`   - GET  /api/admin/inventory`);
      console.log(`   - PUT  /api/admin/inventory/:menuId`);
      console.log(`   - GET  /api/admin/orders`);
      console.log(`   - PUT  /api/admin/orders/:orderId/status`);
      console.log(`   - GET  /api/admin/dashboard`);
    }
  });
};

startServer();

