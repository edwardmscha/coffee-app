import './Header.css';

function Header({ currentPage, onPageChange }) {
  return (
    <header className="header">
      <div className="logo">COZY</div>
      <nav className="nav-buttons">
        <button
          className={`nav-button ${currentPage === 'order' ? 'active' : ''}`}
          onClick={() => onPageChange('order')}
        >
          주문하기
        </button>
        <button
          className={`nav-button ${currentPage === 'admin' ? 'active' : ''}`}
          onClick={() => onPageChange('admin')}
        >
          관리자
        </button>
      </nav>
    </header>
  );
}

export default Header;

