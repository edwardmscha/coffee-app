import { useState } from 'react';
import './OrderList.css';

function OrderList({ orders, onStatusChange }) {
  const [filter, setFilter] = useState('all'); // all, received, in_progress, completed
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}월 ${day}일 ${hours}:${minutes}`;
  };


  const getStatusButton = (order) => {
    if (order.status === 'received') {
      return (
        <button
          className="order-status-btn start"
          onClick={() => onStatusChange(order.orderId, 'in_progress')}
        >
          제조 시작
        </button>
      );
    } else if (order.status === 'in_progress') {
      return (
        <button
          className="order-status-btn complete"
          onClick={() => onStatusChange(order.orderId, 'completed')}
        >
          제조 완료
        </button>
      );
    } else {
      return <span className="order-completed">완료됨</span>;
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  return (
    <div className="order-list">
      <div className="order-list-header">
        <h2 className="order-list-title">주문 현황</h2>
        <div className="order-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            전체
          </button>
          <button
            className={`filter-btn ${filter === 'received' ? 'active' : ''}`}
            onClick={() => setFilter('received')}
          >
            주문 접수
          </button>
          <button
            className={`filter-btn ${filter === 'in_progress' ? 'active' : ''}`}
            onClick={() => setFilter('in_progress')}
          >
            제조 중
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            제조 완료
          </button>
        </div>
      </div>
      {filteredOrders.length === 0 ? (
        <p className="empty-orders">주문이 없습니다</p>
      ) : (
        <div className="orders">
          {filteredOrders.map(order => (
            <div key={order.orderId} className="order-item">
              <div className="order-header">
                <div className="order-time">{formatDate(order.orderTime)}</div>
                <div className="order-price">{order.totalPrice.toLocaleString()}원</div>
              </div>
              <div className="order-content">
                <div className="order-items">
                  {order.items.map((item, index) => {
                    let itemText = item.menuName;
                    if (item.selectedOptions && item.selectedOptions.length > 0) {
                      const optionNames = item.selectedOptions.map(opt => opt.name).join(', ');
                      itemText += ` (${optionNames})`;
                    }
                    itemText += ` x ${item.quantity}`;
                    return (
                      <div key={`${order.orderId}-${item.menuId}-${index}`} className="order-item-detail">
                        {itemText}
                      </div>
                    );
                  })}
                </div>
                <div className="order-actions">
                  {getStatusButton(order)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderList;

