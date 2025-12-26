import { useState, useMemo } from 'react';
import Header from './components/Header';
import MenuCard from './components/MenuCard';
import ShoppingCart from './components/ShoppingCart';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import OrderList from './components/OrderList';
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
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([
    { menuId: 1, menuName: '아메리카노(ICE)', stock: 10 },
    { menuId: 2, menuName: '아메리카노(HOT)', stock: 10 },
    { menuId: 3, menuName: '카페라떼', stock: 10 }
  ]);

  // 주문 통계 계산
  const dashboardStats = useMemo(() => {
    const totalOrders = orders.length;
    const receivedOrders = orders.filter(o => o.status === 'received').length;
    const inProgressOrders = orders.filter(o => o.status === 'in_progress').length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;

    return {
      totalOrders,
      receivedOrders,
      inProgressOrders,
      completedOrders
    };
  }, [orders]);

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
    
    // 주문 생성
    const newOrder = {
      orderId: Date.now(), // 임시 ID 생성
      orderTime: new Date().toISOString(),
      items: cartItems.map(item => ({
        menuId: item.menuId,
        menuName: item.menuName,
        selectedOptions: item.selectedOptions,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'received' // 초기 상태는 주문접수
    };

    setOrders(prev => [newOrder, ...prev]);
    alert('주문이 완료되었습니다!');
    
    // 장바구니 비우기
    setCartItems([]);
  };

  const handleStockUpdate = (menuId, change) => {
    setInventory(prev => 
      prev.map(item => {
        if (item.menuId === menuId) {
          const newStock = Math.max(0, item.stock + change);
          return { ...item, stock: newStock };
        }
        return item;
      })
    );
  };

  const handleOrderStatusChange = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.orderId === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
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
        <div className="admin-page">
          <Dashboard stats={dashboardStats} />
          <Inventory inventory={inventory} onStockUpdate={handleStockUpdate} />
          <OrderList orders={orders} onStatusChange={handleOrderStatusChange} />
        </div>
      )}
    </div>
  );
}

export default App;
