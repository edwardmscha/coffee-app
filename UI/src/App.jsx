import { useState } from 'react';
import Header from './components/Header';
import MenuCard from './components/MenuCard';
import ShoppingCart from './components/ShoppingCart';
import './App.css';

// 임시 메뉴 데이터
const initialMenus = [
  {
    id: 1,
    name: '아메리카노(ICE)',
    price: 4000,
    description: '시원하고 깔끔한 아이스 아메리카노',
    imageUrl: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop',
    options: [
      { id: 1, name: '샷 추가', additionalPrice: 500 },
      { id: 2, name: '시럽 추가', additionalPrice: 0 }
    ]
  },
  {
    id: 2,
    name: '아메리카노(HOT)',
    price: 4000,
    description: '따뜻하고 진한 핫 아메리카노',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    options: [
      { id: 1, name: '샷 추가', additionalPrice: 500 },
      { id: 2, name: '시럽 추가', additionalPrice: 0 }
    ]
  },
  {
    id: 3,
    name: '카페라떼',
    price: 5000,
    description: '부드러운 우유와 에스프레소의 조화',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    options: [
      { id: 1, name: '샷 추가', additionalPrice: 500 },
      { id: 2, name: '시럽 추가', additionalPrice: 0 },
      { id: 3, name: '휘핑크림', additionalPrice: 500 }
    ]
  },
  {
    id: 4,
    name: '카푸치노',
    price: 5500,
    description: '거품이 풍부한 카푸치노',
    imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
    options: [
      { id: 1, name: '샷 추가', additionalPrice: 500 },
      { id: 2, name: '시나몬 가루', additionalPrice: 0 }
    ]
  },
  {
    id: 5,
    name: '카라멜 마끼아또',
    price: 6000,
    description: '달콤한 카라멜 시럽이 들어간 마끼아또',
    imageUrl: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop&auto=format',
    options: [
      { id: 1, name: '샷 추가', additionalPrice: 500 },
      { id: 2, name: '휘핑크림', additionalPrice: 500 }
    ]
  },
  {
    id: 6,
    name: '바닐라라떼',
    price: 5500,
    description: '향긋한 바닐라와 우유의 조화',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format',
    options: [
      { id: 1, name: '샷 추가', additionalPrice: 500 },
      { id: 2, name: '시럽 추가', additionalPrice: 0 }
    ]
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('order');
  const [menus] = useState(initialMenus);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems(prev => {
      // 같은 메뉴와 같은 옵션 조합이 있는지 확인
      const existingIndex = prev.findIndex(cartItem => {
        const sameMenu = cartItem.menuId === item.menuId;
        const sameOptions = JSON.stringify(cartItem.selectedOptions) === JSON.stringify(item.selectedOptions);
        return sameMenu && sameOptions;
      });

      if (existingIndex >= 0) {
        // 이미 있으면 수량 증가
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        // 없으면 새로 추가
        return [...prev, item];
      }
    });
  };

  const handleOrder = () => {
    if (cartItems.length === 0) return;
    
    // TODO: 서버에 주문 요청 보내기
    console.log('주문하기:', cartItems);
    alert('주문이 완료되었습니다!');
    
    // 장바구니 비우기
    setCartItems([]);
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {currentPage === 'order' && (
        <>
          <main className="main-content">
            <div className="menu-grid">
              {menus.map(menu => (
                <MenuCard
                  key={menu.id}
                  menu={menu}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </main>
          <ShoppingCart cartItems={cartItems} onOrder={handleOrder} />
        </>
      )}
      
      {currentPage === 'admin' && (
        <div className="admin-placeholder">
          <h2>관리자 화면 (추후 구현 예정)</h2>
        </div>
      )}
    </div>
  );
}

export default App;
