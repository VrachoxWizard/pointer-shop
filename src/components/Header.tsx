import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, User } from 'lucide-react';
import { CATEGORIES, Product } from '../data/products';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string, categoryFilter?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const { cart, wishlist, products } = useShop();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setSuggestions([]);
    }
  };

  const handleToggleSearch = () => {
    if (isSearchOpen) {
      setSearchQuery('');
      setSuggestions([]);
    }
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim().length > 1) {
      const q = value.toLowerCase();
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const toggleDropdown = (id: string) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  return (
    <header className="site-header" style={{ position: 'sticky', top: 0, zIndex: 100, boxShadow: 'var(--shadow-sm)' }}>
      {/* Top Banner (Announcement Bar) */}
      <div 
        className="top-banner animate-fade-in" 
        style={{
          backgroundColor: 'var(--color-primary-dark)',
          color: 'var(--color-text-light)',
          textAlign: 'center',
          padding: '8px 12px',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.05em'
        }}
      >
        Besplatna dostava za sve narudžbe iznad 150 €.
      </div>

      {/* Main Header Container */}
      <div className="glassmorphism" style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(250, 249, 246, 0.95)' }}>
        <div className="container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Logo / Brand */}
          <div 
            onClick={() => onNavigate('home')} 
            className="logo" 
            style={{ 
              cursor: 'pointer', 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 800, 
              fontSize: '26px', 
              color: 'var(--color-primary)',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <img 
              src="/images/cropped-logo-32x32.png" 
              alt="Pointer logo" 
              style={{ width: '32px', height: '32px', display: 'block' }}
            />
            POINTER
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '100%' }}>
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                className="nav-item-dropdown"
                onMouseEnter={() => setActiveDropdown(cat.id)}
                onMouseLeave={() => setActiveDropdown(null)}
                style={{ position: 'relative', height: '70px', display: 'flex', alignItems: 'center' }}
              >
                <button 
                  onClick={() => onNavigate('shop', cat.id)}
                  className="premium-nav-link"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: '14px',
                    padding: '8px 12px',
                    color: currentRoute.startsWith('shop') && activeDropdown === cat.id ? 'var(--color-accent)' : 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {cat.name}
                  <ChevronDown size={14} />
                </button>

                {activeDropdown === cat.id && cat.subCategories && (
                  <div 
                    className="dropdown-menu animate-slide-up"
                    style={{
                      position: 'absolute',
                      top: '70px',
                      left: 0,
                      backgroundColor: 'var(--color-bg-card)',
                      boxShadow: 'var(--shadow-md)',
                      borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                      minWidth: '220px',
                      padding: '12px 0',
                      border: '1px solid var(--color-border)',
                      borderTop: 'none',
                      zIndex: 200
                    }}
                  >
                    {cat.subCategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          onNavigate(`shop?category=${cat.id}&sub=${encodeURIComponent(sub)}`);
                          setActiveDropdown(null);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 20px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: 500,
                          color: 'var(--color-text-main)',
                          transition: 'var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-bg-site)';
                          e.currentTarget.style.color = 'var(--color-accent)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'var(--color-text-main)';
                        }}
                      >
                        {sub.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <button 
              onClick={() => onNavigate('about-us')}
              className="premium-nav-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '14px',
                padding: '8px 16px',
                color: currentRoute === 'about-us' ? 'var(--color-accent)' : 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              O NAMA
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="premium-nav-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '14px',
                padding: '8px 16px',
                color: currentRoute === 'contact' ? 'var(--color-accent)' : 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              KONTAKT
            </button>
          </nav>

          {/* Header Action Icons */}
          <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Search Toggle */}
            <button 
              onClick={handleToggleSearch}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }}
              title="Traži"
            >
              <Search size={22} />
            </button>

            {/* Wishlist */}
            <button 
              onClick={() => onNavigate('account')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)', position: 'relative' }}
              title="Lista želja"
            >
              <Heart size={22} fill={wishlist.length > 0 ? 'var(--color-accent)' : 'none'} stroke={wishlist.length > 0 ? 'var(--color-accent)' : 'currentColor'} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  backgroundColor: 'var(--color-accent)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
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

            {/* Account */}
            <button 
              onClick={() => onNavigate('account')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }}
              title="Moj Račun"
            >
              <User size={22} />
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => onNavigate('cart')}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                color: 'var(--color-primary)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Košarica"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
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

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)', display: 'none' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Floating Search Bar */}
      {isSearchOpen && (
        <div 
          className="search-drawer animate-fade-in"
          style={{
            position: 'absolute',
            top: '110px',
            left: 0,
            width: '100%',
            backgroundColor: 'var(--color-bg-card)',
            boxShadow: 'var(--shadow-md)',
            padding: '16px 20px',
            borderBottom: '1px solid var(--color-border)',
            zIndex: 90
          }}
        >
          <div className="container">
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Traži proizvode po nazivu, kalibru ili brendu..." 
                value={searchQuery}
                onChange={handleSearchChange}
                className="input-field"
                style={{ flexGrow: 1 }}
                autoFocus
              />
              <button type="submit" className="btn-primary" style={{ padding: '0 24px' }}>Traži</button>
            </form>

            {/* Live Search Suggestions */}
            {suggestions.length > 0 && (
              <div 
                className="glassmorphism animate-scale-in"
                style={{
                  marginTop: '12px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--color-neutral-border)',
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: 100
                }}
              >
                {suggestions.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => {
                      onNavigate(`product/${p.id}`);
                      setIsSearchOpen(false);
                      setSuggestions([]);
                      setSearchQuery('');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '10px 16px',
                      cursor: 'pointer',
                      borderBottom: '1px solid var(--color-neutral-border)',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-neutral-light)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <img src={p.images[0]} alt="" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                    <div style={{ flexGrow: 1, textAlign: 'left' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-neutral-dark)' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-neutral-muted)' }}>{p.brand} | €{p.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-nav-drawer animate-slide-up"
          style={{
            position: 'fixed',
            top: '110px',
            left: 0,
            width: '100%',
            height: 'calc(100vh - 110px)',
            backgroundColor: 'var(--color-bg-card)',
            zIndex: 400,
            overflowY: 'auto',
            padding: '20px 16px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {CATEGORIES.map((cat) => (
              <div key={cat.id} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                <button
                  onClick={() => toggleDropdown(cat.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '16px',
                    color: 'var(--color-primary)',
                    textTransform: 'uppercase',
                    textAlign: 'left'
                  }}
                >
                  {cat.name}
                  <ChevronDown size={18} style={{ transform: activeDropdown === cat.id ? 'rotate(180deg)' : 'none', transition: 'var(--transition-fast)' }} />
                </button>
                
                {activeDropdown === cat.id && cat.subCategories && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px', paddingLeft: '16px' }}>
                    <button 
                      onClick={() => { onNavigate('shop', cat.id); setIsMobileMenuOpen(false); }}
                      style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '14px', color: 'var(--color-text-muted)', fontWeight: 600 }}
                    >
                      SVI PROIZVODI
                    </button>
                    {cat.subCategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          onNavigate(`shop?category=${cat.id}&sub=${encodeURIComponent(sub)}`);
                          setIsMobileMenuOpen(false);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          textAlign: 'left',
                          fontSize: '14px',
                          color: 'var(--color-text-main)',
                          padding: '4px 0'
                        }}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <button 
              onClick={() => { onNavigate('about-us'); setIsMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: '16px', color: 'var(--color-primary)', textTransform: 'uppercase', textAlign: 'left', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}
            >
              O NAMA
            </button>
            <button 
              onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: '16px', color: 'var(--color-primary)', textTransform: 'uppercase', textAlign: 'left', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}
            >
              KONTAKTIRAJTE NAS
            </button>
          </div>
        </div>
      )}

      {/* Injection of mobile styles for Header */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
