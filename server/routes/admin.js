const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// GET /api/admin/inventory - 재고 현황 조회
router.get('/inventory', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id as "menuId", name as "menuName", stock FROM menus ORDER BY id'
    );

    res.json({ inventory: result.rows });
  } catch (error) {
    console.error('재고 현황 조회 오류:', error);
    res.status(500).json({
      error: '서버 내부 오류가 발생했습니다.',
      message: error.message
    });
  }
});

// PUT /api/admin/inventory/:menuId - 재고 수정
router.put('/inventory/:menuId', async (req, res) => {
  try {
    const { menuId } = req.params;
    const { stock } = req.body;

    // 입력 검증
    if (stock === undefined || stock < 0) {
      return res.status(400).json({
        error: '올바른 재고 값이 필요합니다 (0 이상).'
      });
    }

    // 메뉴 존재 확인 및 재고 업데이트
    const result = await pool.query(
      'UPDATE menus SET stock = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, name as "menuName", stock',
      [stock, menuId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: '메뉴를 찾을 수 없습니다.'
      });
    }

    res.json({
      ...result.rows[0],
      message: '재고가 성공적으로 업데이트되었습니다.'
    });
  } catch (error) {
    console.error('재고 수정 오류:', error);
    res.status(500).json({
      error: '서버 내부 오류가 발생했습니다.',
      message: error.message
    });
  }
});

// GET /api/admin/orders - 주문 목록 조회 (상태별 필터링 가능)
router.get('/orders', async (req, res) => {
  try {
    const { status } = req.query;

    let query = `
      SELECT id, order_time as "orderTime", status, total_price as "totalPrice"
      FROM orders
    `;
    const params = [];

    if (status) {
      query += ' WHERE status = $1';
      params.push(status);
    }

    query += ' ORDER BY order_time DESC';

    const ordersResult = await pool.query(query, params);
    const orders = ordersResult.rows;

        // 각 주문의 상세 항목 조회
        const ordersWithItems = await Promise.all(
          orders.map(async (order) => {
            const itemsResult = await pool.query(
              `SELECT oi.id, oi.menu_id as "menuId", oi.menu_name as "menuName", oi.quantity, oi.item_price as "itemPrice"
               FROM order_items oi WHERE oi.order_id = $1`,
              [order.id]
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

            return {
              ...order,
              items
            };
          })
        );

    res.json({ orders: ordersWithItems });
  } catch (error) {
    console.error('주문 목록 조회 오류:', error);
    res.status(500).json({
      error: '서버 내부 오류가 발생했습니다.',
      message: error.message
    });
  }
});

// PUT /api/admin/orders/:orderId/status - 주문 상태 변경
router.put('/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // 입력 검증
    const validStatuses = ['received', 'in_progress', 'completed'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        error: '올바른 상태 값이 필요합니다. (received, in_progress, completed)'
      });
    }

    // 주문 상태 업데이트
    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id',
      [status, orderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: '주문을 찾을 수 없습니다.'
      });
    }

    res.json({
      orderId: parseInt(orderId),
      status,
      message: '주문 상태가 성공적으로 변경되었습니다.'
    });
  } catch (error) {
    console.error('주문 상태 변경 오류:', error);
    res.status(500).json({
      error: '서버 내부 오류가 발생했습니다.',
      message: error.message
    });
  }
});

// GET /api/admin/dashboard - 대시보드 통계 조회
router.get('/dashboard', async (req, res) => {
  try {
    const totalOrdersResult = await pool.query('SELECT COUNT(*) as count FROM orders');
    const receivedOrdersResult = await pool.query(
      "SELECT COUNT(*) as count FROM orders WHERE status = 'received'"
    );
    const inProgressOrdersResult = await pool.query(
      "SELECT COUNT(*) as count FROM orders WHERE status = 'in_progress'"
    );
    const completedOrdersResult = await pool.query(
      "SELECT COUNT(*) as count FROM orders WHERE status = 'completed'"
    );

    res.json({
      totalOrders: parseInt(totalOrdersResult.rows[0].count),
      receivedOrders: parseInt(receivedOrdersResult.rows[0].count),
      inProgressOrders: parseInt(inProgressOrdersResult.rows[0].count),
      completedOrders: parseInt(completedOrdersResult.rows[0].count)
    });
  } catch (error) {
    console.error('대시보드 통계 조회 오류:', error);
    res.status(500).json({
      error: '서버 내부 오류가 발생했습니다.',
      message: error.message
    });
  }
});

module.exports = router;

