// API 기본 URL 설정
// 개발 환경: 로컬 서버
// 프로덕션 환경: 환경 변수에서 가져오거나 기본값 사용
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// 디버깅: API URL 확인
console.log('API_BASE_URL:', API_BASE_URL);

// 공통 fetch 함수
const fetchAPI = async (endpoint, options = {}) => {
  const fullUrl = `${API_BASE_URL}${endpoint}`;
  console.log('API 호출:', fullUrl);
  
  try {
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      let errorMessage = '요청 실패';
      let errorData = null;
      try {
        errorData = await response.json();
        errorMessage = errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`;
      } catch (e) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      const error = new Error(errorMessage);
      error.status = response.status;
      error.details = errorData;
      throw error;
    }

    const data = await response.json();
    console.log('API 응답 성공:', endpoint, data);
    return data;
  } catch (error) {
    // 네트워크 오류인 경우 (서버가 실행되지 않았거나 연결 불가)
    if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch') || error.message.includes('Load failed'))) {
      console.error('네트워크 오류:', {
        url: fullUrl,
        error: error.message,
        apiBaseUrl: API_BASE_URL
      });
      const networkError = new Error(`서버에 연결할 수 없습니다. 백엔드 서버(${API_BASE_URL})가 실행 중인지 확인해주세요.`);
      networkError.isNetworkError = true;
      throw networkError;
    }
    console.error('API 호출 오류:', {
      url: fullUrl,
      error: error.message,
      status: error.status
    });
    throw error;
  }
};

// 메뉴 API
export const getMenus = () => fetchAPI('/menus');

// 주문 API
export const createOrder = (orderData) => 
  fetchAPI('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });

export const getOrder = (orderId) => fetchAPI(`/orders/${orderId}`);

// 관리자 API
export const getInventory = () => fetchAPI('/admin/inventory');

export const updateInventory = (menuId, stock) =>
  fetchAPI(`/admin/inventory/${menuId}`, {
    method: 'PUT',
    body: JSON.stringify({ stock }),
  });

export const getAdminOrders = (status) => {
  const query = status ? `?status=${status}` : '';
  return fetchAPI(`/admin/orders${query}`);
};

export const updateOrderStatus = (orderId, status) =>
  fetchAPI(`/admin/orders/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });

export const getDashboard = () => fetchAPI('/admin/dashboard');
