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

  const handleRemoveItem = (itemToRemove) => {
    if (onCartUpdate) {
      onCartUpdate(cartItems.filter(item => {
        // 같은 메뉴와 같은 옵션 조합인지 확인
        const sameMenu = item.menuId === itemToRemove.menuId;
        const sameOptions = JSON.stringify(item.selectedOptions) === JSON.stringify(itemToRemove.selectedOptions);
        return !(sameMenu && sameOptions);
      }));
    }
  };

  const handleQuantityChange = (itemToChange, change) => {
    if (onCartUpdate) {
      const updated = cartItems.map(item => {
        // 같은 메뉴와 같은 옵션 조합인지 확인
        const sameMenu = item.menuId === itemToChange.menuId;
        const sameOptions = JSON.stringify(item.selectedOptions) === JSON.stringify(itemToChange.selectedOptions);
        if (sameMenu && sameOptions) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) {
            return null; // 삭제할 항목
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item !== null);
      
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
                        onClick={() => handleQuantityChange(item, -1)}
                        aria-label="수량 감소"
                      >
                        -
                      </button>
                      <span className="item-quantity">X {item.quantity}</span>
                      <button 
                        className="quantity-btn" 
                        onClick={() => handleQuantityChange(item, 1)}
                        aria-label="수량 증가"
                      >
                        +
                      </button>
                    </div>
                    <span className="item-price">{(item.price * item.quantity).toLocaleString()}원</span>
                  </div>
                  <button 
                    className="remove-item-btn"
                    onClick={() => handleRemoveItem(item)}
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

