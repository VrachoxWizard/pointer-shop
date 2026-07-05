import React from 'react';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface MobileNavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({ currentRoute, onNavigate }) => {
  const { cart, wishlist } = useShop();
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div 
      className="mobile-handheld-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '56px',
        backgroundColor: 'rgba(250, 249, 246, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--color-border)',
        zIndex: 99,
        display: 'none',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
      }}
    >
      <button 
        onClick={() => onNavigate('home')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          color: currentRoute === 'home' ? 'var(--color-accent)' : 'var(--color-primary)',
          fontSize: '10px',
          fontWeight: 600
        }}
      >
        <Home size={20} />
        <span>Početna</span>
      </button>

      <button 
        onClick={() => onNavigate('shop')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          color: currentRoute.startsWith('shop') ? 'var(--color-accent)' : 'var(--color-primary)',
          fontSize: '10px',
          fontWeight: 600
        }}
      >
        <Search size={20} />
        <span>Pretraga</span>
      </button>

      <button 
        onClick={() => onNavigate('cart')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          color: currentRoute === 'cart' ? 'var(--color-accent)' : 'var(--color-primary)',
          fontSize: '10px',
          fontWeight: 600,
          position: 'relative'
        }}
      >
        <ShoppingBag size={20} />
        <span>Košarica</span>
        {cartCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '8px',
            backgroundColor: 'var(--color-accent)',
            color: 'white',
            borderRadius: '50%',
            width: '15px',
            height: '15px',
            fontSize: '9px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {cartCount}
          </span>
        )}
      </button>

      <button 
        onClick={() => onNavigate('account')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          color: currentRoute === 'account' ? 'var(--color-accent)' : 'var(--color-primary)',
          fontSize: '10px',
          fontWeight: 600,
          position: 'relative'
        }}
      >
        <Heart size={20} fill={wishlist.length > 0 ? 'var(--color-accent)' : 'none'} stroke={wishlist.length > 0 ? 'var(--color-accent)' : 'currentColor'} />
        <span>Želje</span>
        {wishlist.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '4px',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            borderRadius: '50%',
            width: '15px',
            height: '15px',
            fontSize: '9px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {wishlist.length}
          </span>
        )}
      </button>

      <button 
        onClick={() => onNavigate('account')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          color: currentRoute === 'account' ? 'var(--color-accent)' : 'var(--color-primary)',
          fontSize: '10px',
          fontWeight: 600
        }}
      >
        <User size={20} />
        <span>Profil</span>
      </button>

      <style>{`
        @media (max-width: 768px) {
          .mobile-handheld-bar {
            display: flex !important;
          }
          body {
            padding-bottom: 56px !important;
          }
        }
      `}</style>
    </div>
  );
};
