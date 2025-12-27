const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// POST /api/orders - 주문 생성
router.post('/', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { items, totalPrice } = req.body;

    // 입력 검증
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: '주문 항목이 필요합니다.'
      });
    }

    if (!totalPrice || totalPrice < 0) {
      return res.status(400).json({
        error: '올바른 총 금액이 필요합니다.'
      });
    }

    await client.query('BEGIN');

    // 재고 확인 및 부족 항목 수집
    const insufficientItems = [];
    for (const item of items) {
      const stockResult = await client.query(
        'SELECT stock, name FROM menus WHERE id = $1',
        [item.menuId]
      );

      if (stockResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          error: `메뉴 ID ${item.menuId}를 찾을 수 없습니다.`
        });
      }

      const { stock, name } = stockResult.rows[0];
      if (stock < item.quantity) {
        insufficientItems.push({
          menuId: item.menuId,
          menuName: name,
          requested: item.quantity,
          available: stock
        });
      }
    }

    // 재고 부족 시 롤백 및 에러 반환
    if (insufficientItems.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        error: '재고가 부족합니다.',
        details: insufficientItems
      });
    }

    // 주문 생성
    const orderResult = await client.query(
      'INSERT INTO orders (order_time, status, total_price) VALUES (CURRENT_TIMESTAMP, $1, $2) RETURNING id',
      ['received', totalPrice]
    );
    const orderId = orderResult.rows[0].id;

    // 주문 상세 항목 및 재고 차감
    for (const item of items) {
      // 주문 상세 항목 저장
      const orderItemResult = await client.query(
        `INSERT INTO order_items (order_id, menu_id, menu_name, quantity, item_price)
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [orderId, item.menuId, item.menuName, item.quantity, item.itemPrice]
      );
      const orderItemId = orderItemResult.rows[0].id;

      // 옵션 저장
      if (item.selectedOptions && item.selectedOptions.length > 0) {
        for (const option of item.selectedOptions) {
          await client.query(
            `INSERT INTO order_item_options (order_item_id, option_id, option_name, additional_price)
             VALUES ($1, $2, $3, $4)`,
            [orderItemId, option.optionId, option.optionName, option.additionalPrice]
          );
        }
      }

      // 재고 차감
      await client.query(
        'UPDATE menus SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.menuId]
      );
    }

    await client.query('COMMIT');

    res.status(201).json({
      orderId,
      message: '주문이 성공적으로 생성되었습니다.'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('주문 생성 오류:', error);
    res.status(500).json({
      error: '서버 내부 오류가 발생했습니다.',
      message: error.message
    });
  } finally {
    client.release();
  }
});

// GET /api/orders/:orderId - 주문 조회
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // 주문 기본 정보 조회
    const orderResult = await pool.query(
      'SELECT id, order_time as "orderTime", status, total_price as "totalPrice" FROM orders WHERE id = $1',
      [orderId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        error: '주문을 찾을 수 없습니다.'
      });
    }

    const order = orderResult.rows[0];

    // 주문 상세 항목 조회 (옵션 포함)
    const itemsResult = await pool.query(
      `SELECT oi.id, oi.menu_id as "menuId", oi.menu_name as "menuName", oi.quantity, oi.item_price as "itemPrice"
       FROM order_items oi WHERE oi.order_id = $1`,
      [orderId]
    );

    // 각 항목의 옵션 조회
    const items = await Promise.all(
      itemsResult.rows.map(async (item) => {
        const optionsResult = await pool.query(
          `SELECT option_id as "optionId", option_name as "optionName", additional_price as "additionalPrice"
           FROM order_item_options
           WHERE order_item_id = $1`,
          [item.id]
        );

        // id 필드 제거하고 반환
        const { id, ...itemWithoutId } = item;
        return {
          ...itemWithoutId,
          selectedOptions: optionsResult.rows
        };
      })
    );

    res.json({
      ...order,
      items
    });
  } catch (error) {
    console.error('주문 조회 오류:', error);
    res.status(500).json({
      error: '서버 내부 오류가 발생했습니다.',
      message: error.message
    });
  }
});

module.exports = router;

