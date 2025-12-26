import './ShoppingCart.css';

function ShoppingCart({ cartItems, onOrder, onCartUpdate }) {
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const formatItemName = (item) => {
    let name = item.menuName;
    if (item.selectedOptions && item.selectedOptions.length > 0) {
      const optionNames = item.selectedOptions.map(opt => opt.name).join(', ');
      name += ` (${optionNames})`;
    }
    return name;
  };

  const handleRemoveItem = (index) => {
    if (onCartUpdate) {
      onCartUpdate(cartItems.filter((_, i) => i !== index));
    }
  };

  const handleQuantityChange = (index, change) => {
    if (onCartUpdate) {
      const updated = [...cartItems];
      updated[index].quantity += change;
      if (updated[index].quantity <= 0) {
        handleRemoveItem(index);
        return;
      }
      onCartUpdate(updated);
    }
  };

  return (
    <div className="shopping-cart">
      <h2 className="cart-title">장바구니</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">장바구니가 비어있습니다</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={`${item.menuId}-${JSON.stringify(item.selectedOptions)}-${index}`} className="cart-item">
                  <div className="cart-item-main">
                    <span className="item-name">{formatItemName(item)}</span>
                    <div className="item-quantity-controls">
                      <button 
                        className="quantity-btn" 
                        onClick={() => handleQuantityChange(index, -1)}
                        aria-label="수량 감소"
                      >
                        -
                      </button>
                      <span className="item-quantity">X {item.quantity}</span>
                      <button 
                        className="quantity-btn" 
                        onClick={() => handleQuantityChange(index, 1)}
                        aria-label="수량 증가"
                      >
                        +
                      </button>
                    </div>
                    <span className="item-price">{(item.price * item.quantity).toLocaleString()}원</span>
                  </div>
                  <button 
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(index)}
                    aria-label="아이템 삭제"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="cart-summary-section">
            <div className="cart-total">
              <span className="total-label">총 금액</span>
              <span className="total-amount">{calculateTotal().toLocaleString()}원</span>
            </div>
            <button className="order-btn" onClick={onOrder}>
              주문하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;

