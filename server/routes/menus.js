const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// GET /api/menus - 메뉴 목록 조회 (재고 제외)
router.get('/', async (req, res) => {
  try {
    // 메뉴 조회 (재고 제외)
    const menusResult = await pool.query(
      'SELECT id, name, description, price, image_url as "imageUrl" FROM menus ORDER BY id'
    );

    // 각 메뉴의 옵션 조회
    const menus = await Promise.all(
      menusResult.rows.map(async (menu) => {
        const optionsResult = await pool.query(
          'SELECT id, name, additional_price as "additionalPrice" FROM options WHERE menu_id = $1 ORDER BY id',
          [menu.id]
        );

        return {
          ...menu,
          options: optionsResult.rows
        };
      })
    );

    res.json({ menus });
  } catch (error) {
    console.error('메뉴 목록 조회 오류:', error);
    
    // 데이터베이스 연결 오류인 경우
    if (error.code === 'ECONNREFUSED' || error.code === '28P01' || error.message.includes('password authentication') || error.message.includes('connection')) {
      res.status(503).json({
        error: '데이터베이스 연결 오류',
        message: '데이터베이스에 연결할 수 없습니다. 데이터베이스 설정을 확인해주세요.'
      });
    } else {
      res.status(500).json({
        error: '서버 내부 오류가 발생했습니다.',
        message: error.message
      });
    }
  }
});

module.exports = router;

