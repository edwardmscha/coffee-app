import './Inventory.css';

function Inventory({ inventory, onStockUpdate }) {
  const getStockStatus = (stock) => {
    if (stock === 0) return { text: '품절', className: 'out-of-stock' };
    if (stock < 5) return { text: '주의', className: 'warning' };
    return { text: '정상', className: 'normal' };
  };

  const handleIncrease = (menuId) => {
    onStockUpdate(menuId, 1);
  };

  const handleDecrease = (menuId) => {
    const currentItem = inventory.find(item => item.menuId === menuId);
    if (currentItem && currentItem.stock > 0) {
      onStockUpdate(menuId, -1);
    }
  };

  return (
    <div className="inventory">
      <h2 className="inventory-title">재고 현황</h2>
      <div className="inventory-grid">
        {inventory.map(item => {
          const status = getStockStatus(item.stock);
          return (
            <div key={item.menuId} className="inventory-card">
              <h3 className="inventory-menu-name">{item.menuName}</h3>
              <div className="inventory-stock-info">
                <span className="inventory-stock">{item.stock}개</span>
                <span className={`inventory-status ${status.className}`}>
                  {status.text}
                </span>
              </div>
              <div className="inventory-controls">
                <button
                  className="stock-btn decrease"
                  onClick={() => handleDecrease(item.menuId)}
                  disabled={item.stock === 0}
                >
                  -
                </button>
                <button
                  className="stock-btn increase"
                  onClick={() => handleIncrease(item.menuId)}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Inventory;

