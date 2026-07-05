import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const MobileNavbar: React.FC = () => {
  const { cart, wishlist } = useShop();
  const navigate = useNavigate();
  const location = useLocation();
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="mobile-bottom-navbar">
      <div className="mobile-bottom-navbar-inner">
        <button 
          onClick={() => navigate('/')}
          className={`mobile-nav-btn ${isActive('/') ? 'active' : ''}`}
        >
          <Home size={20} />
          <span>Početna</span>
        </button>

        <button 
          onClick={() => navigate('/shop')}
          className={`mobile-nav-btn ${isActive('/shop') ? 'active' : ''}`}
        >
          <Search size={20} />
          <span>Pretraga</span>
        </button>

        <button 
          onClick={() => navigate('/cart')}
          className={`mobile-nav-btn ${isActive('/cart') ? 'active' : ''}`}
        >
          <ShoppingBag size={20} />
          <span>Košarica</span>
          {cartCount > 0 && (
            <span className="mobile-nav-badge">
              {cartCount}
            </span>
          )}
        </button>

        <button 
          onClick={() => navigate('/account')}
          className={`mobile-nav-btn ${isActive('/account') ? 'active' : ''}`}
        >
          <Heart size={20} fill={wishlist.length > 0 ? 'var(--color-accent)' : 'none'} stroke={wishlist.length > 0 ? 'var(--color-accent)' : 'currentColor'} />
          <span>Želje</span>
          {wishlist.length > 0 && (
            <span className="mobile-nav-badge" style={{ backgroundColor: 'var(--color-primary)' }}>
              {wishlist.length}
            </span>
          )}
        </button>

        <button 
          onClick={() => navigate('/account')}
          className={`mobile-nav-btn ${isActive('/account') ? 'active' : ''}`}
        >
          <User size={20} />
          <span>Profil</span>
        </button>
      </div>
    </div>
  );
};
