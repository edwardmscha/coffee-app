import { useState, useEffect } from 'react';
import Header from './components/Header';
import MenuCard from './components/MenuCard';
import ShoppingCart from './components/ShoppingCart';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import OrderList from './components/OrderList';
import { 
  getMenus, 
  createOrder, 
  getInventory, 
  updateInventory, 
  getAdminOrders, 
  updateOrderStatus, 
  getDashboard 
} from './utils/api';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('order');
  const [menus, setMenus] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalOrders: 0,
    receivedOrders: 0,
    inProgressOrders: 0,
    completedOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 메뉴 목록 불러오기
  const loadMenus = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getMenus();
      setMenus(data.menus || []);
      setLoading(false);
    } catch (error) {
      console.error('메뉴 로드 오류:', error);
      let errorMessage = '메뉴를 불러오는 중 오류가 발생했습니다.';
      
      // 오류 메시지에서 실제 내용 추출
      const errorMsg = error.message || error.toString();
      
      if (error.isNetworkError || errorMsg.includes('서버에 연결') || errorMsg.includes('fetch')) {
        errorMessage = '서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.';
      } else if (error.status === 503 || errorMsg.includes('데이터베이스') || errorMsg.includes('데이터베이스 연결')) {
        errorMessage = '데이터베이스 연결 오류가 발생했습니다.';
      } else if (errorMsg.includes('Load failed')) {
        errorMessage = '서버 요청이 실패했습니다. 백엔드 서버가 실행 중인지 확인해주세요.';
      } else {
        errorMessage = `메뉴를 불러오는 중 오류: ${errorMsg}`;
      }
      
      console.error('상세 오류 정보:', error);
      setError(errorMessage);
      setMenus([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenus();
  }, []);

  // 관리자 화면 데이터 불러오기
  useEffect(() => {
    if (currentPage === 'admin') {
      loadAdminData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const loadAdminData = async () => {
    try {
      const [inventoryData, ordersData, dashboardData] = await Promise.all([
        getInventory(),
        getAdminOrders(),
        getDashboard()
      ]);

      setInventory(inventoryData.inventory);
      setOrders(ordersData.orders);
      setDashboardStats(dashboardData);
    } catch (error) {
      console.error('관리자 데이터 로드 오류:', error);
      alert('데이터를 불러오는 중 오류가 발생했습니다.');
    }
  };

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

  const handleOrder = async () => {
    if (cartItems.length === 0) return;
    
    try {
      const orderData = {
        items: cartItems.map(item => ({
          menuId: item.menuId,
          menuName: item.menuName,
          selectedOptions: (item.selectedOptions || []).map(opt => ({
            optionId: opt.id,
            optionName: opt.name,
            additionalPrice: opt.additionalPrice
          })),
          quantity: item.quantity,
          itemPrice: item.price
        })),
        totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };

      const result = await createOrder(orderData);
      alert('주문이 완료되었습니다!');
      
      // 장바구니 비우기
      setCartItems([]);
      
      // 관리자 화면이면 데이터 새로고침
      if (currentPage === 'admin') {
        loadAdminData();
      }
    } catch (error) {
      if (error.message.includes('재고가 부족')) {
        alert(`재고가 부족합니다: ${error.message}`);
      } else {
        alert(`주문 중 오류가 발생했습니다: ${error.message}`);
      }
    }
  };

  const handleStockUpdate = async (menuId, change) => {
    try {
      const currentItem = inventory.find(item => item.menuId === menuId);
      if (!currentItem) return;

      const newStock = Math.max(0, currentItem.stock + change);
      await updateInventory(menuId, newStock);
      
      // 로컬 상태 업데이트
      setInventory(prev => 
        prev.map(item => {
          if (item.menuId === menuId) {
            return { ...item, stock: newStock };
          }
          return item;
        })
      );
    } catch (error) {
      console.error('재고 업데이트 오류:', error);
      alert(`재고 업데이트 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      
      // 로컬 상태 업데이트 및 데이터 새로고침
      await loadAdminData();
    } catch (error) {
      console.error('주문 상태 변경 오류:', error);
      alert(`주문 상태 변경 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {currentPage === 'order' && (
        <>
          <main className="main-content">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>메뉴를 불러오는 중...</div>
            ) : error || menus.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#666' }}>
                  {error || '메뉴를 불러올 수 없습니다.'}
                </p>
                <p style={{ color: '#999', marginBottom: '1rem' }}>
                  백엔드 서버가 실행 중인지 확인해주세요.
                </p>
                <button 
                  onClick={loadMenus}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  다시 시도
                </button>
              </div>
            ) : (
              <div className="menu-grid">
                {menus.map(menu => (
                  <MenuCard
                    key={menu.id}
                    menu={menu}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </main>
          <ShoppingCart 
            cartItems={cartItems} 
            onOrder={handleOrder}
            onCartUpdate={setCartItems}
          />
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
