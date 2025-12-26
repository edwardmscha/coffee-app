import { useState } from 'react';
import './MenuCard.css';

function MenuCard({ menu, onAddToCart }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [imageError, setImageError] = useState(false);

  const handleOptionChange = (optionId) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  const calculateTotalPrice = () => {
    const basePrice = menu.price;
    const optionsPrice = menu.options
      .filter(opt => selectedOptions.includes(opt.id))
      .reduce((sum, opt) => sum + opt.additionalPrice, 0);
    return basePrice + optionsPrice;
  };

  const handleAddToCart = () => {
    const selectedOpts = menu.options.filter(opt => selectedOptions.includes(opt.id));
    onAddToCart({
      menuId: menu.id,
      menuName: menu.name,
      selectedOptions: selectedOpts,
      price: calculateTotalPrice(),
      quantity: 1
    });
    // 옵션 초기화
    setSelectedOptions([]);
  };

  return (
    <div className="menu-card">
      <div className="menu-image">
        {menu.imageUrl && !imageError ? (
          <img 
            src={menu.imageUrl} 
            alt={menu.name}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="image-placeholder">이미지</div>
        )}
      </div>
      <div className="menu-info">
        <h3 className="menu-name">{menu.name}</h3>
        <p className="menu-price">{calculateTotalPrice().toLocaleString()}원</p>
        <p className="menu-description">{menu.description}</p>
      </div>
      <div className="menu-options">
        {menu.options.map(option => (
          <label key={option.id} className="option-label">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleOptionChange(option.id)}
            />
            <span>
              {option.name} {option.additionalPrice > 0 && `(+${option.additionalPrice.toLocaleString()}원)`}
            </span>
          </label>
        ))}
      </div>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        담기
      </button>
    </div>
  );
}

export default MenuCard;

