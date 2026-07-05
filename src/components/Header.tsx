import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, User, Sun, Moon } from 'lucide-react';
import { CATEGORIES, Product } from '../data/products';

interface HeaderProps {
  currentRoute: string;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute }) => {
  const { cart, wishlist, products, theme, toggleTheme, openCartDrawer } = useShop();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Smart Header Hide-on-Scroll States
  const [showHeader, setShowHeader] = useState(true);

  // Rotating premium announcements list
  const announcements = [
    "Besplatna dostava za sve narudžbe iznad 150 €.",
    "Mogućnost osobnog preuzimanja u poslovnici Koledinečka 1a, Zagreb.",
    "Ekskluzivni zastupnik za vrhunsku Leupold optiku.",
    "Sigurna online kupnja i pouzdano jamstvo."
  ];
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Hide on scroll-down, show on scroll-up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY) {
          setShowHeader(false); // scrolling down
        } else {
          setShowHeader(true); // scrolling up
        }
      } else {
        setShowHeader(true);
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset selected suggestion index whenever suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
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

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        e.preventDefault();
        const product = suggestions[selectedIndex];
        navigate(`/product/${product.id}`);
        setIsSearchOpen(false);
        setSearchQuery('');
        setSuggestions([]);
      }
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery('');
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

  // Helper check for active categories
  const isCategoryActive = (catId: string) => {
    const params = new URLSearchParams(location.search);
    return location.pathname === '/shop' && params.get('category') === catId;
  };

  return (
    <header className={`site-header site-header-sticky ${!showHeader ? 'header-hidden' : ''}`}>
      {/* Dynamic Sliding Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-bar-track">
          <div className="announcement-bar-item" key={announcementIndex}>
            {announcements[announcementIndex]}
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="glassmorphism-header">
        <div className="container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Logo / Brand */}
          <div 
            onClick={() => navigate('/')} 
            className="logo site-logo-container"
          >
            <img 
              src="/images/cropped-logo-32x32.png" 
              alt="Pointer logo" 
              className="logo-image"
            />
            <span>POINTER</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav desktop-navigation-links">
            {CATEGORIES.map((cat) => (
              <div 
                key={cat.id} 
                className="nav-item-dropdown-container"
                onMouseEnter={() => setActiveDropdown(cat.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => navigate(`/shop?category=${cat.id}`)}
                  className={`premium-nav-link ${
                    isCategoryActive(cat.id) || (activeDropdown === cat.id) ? 'active' : ''
                  }`}
                >
                  {cat.name}
                  <ChevronDown 
                    size={14} 
                    style={{ 
                      transform: activeDropdown === cat.id ? 'rotate(180deg)' : 'none', 
                      transition: 'transform 0.25s ease' 
                    }} 
                  />
                </button>

                {activeDropdown === cat.id && cat.subCategories && (
                  <div className="nav-dropdown-menu">
                    {cat.subCategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          navigate(`/shop?category=${cat.id}&sub=${encodeURIComponent(sub)}`);
                          setActiveDropdown(null);
                        }}
                        className="nav-dropdown-item"
                      >
                        {sub.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <button 
              onClick={() => navigate('/about-us')}
              className={`premium-nav-link ${currentRoute === 'about-us' ? 'active' : ''}`}
              style={{ padding: '8px 16px' }}
            >
              O NAMA
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className={`premium-nav-link ${currentRoute === 'contact' ? 'active' : ''}`}
              style={{ padding: '8px 16px' }}
            >
              KONTAKT
            </button>
          </nav>

          {/* Header Action Icons */}
          <div className="header-actions actions-group">
            {/* Theme Toggle Switch */}
            <button 
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label={theme === 'light' ? "Aktiviraj tamni način rada" : "Aktiviraj svijetli način rada"}
              title={theme === 'light' ? 'Tamni način rada' : 'Svijetli način rada'}
            >
              {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
            </button>

            {/* Search Toggle */}
            <button 
              onClick={handleToggleSearch}
              aria-label="Pretraži trgovinu"
              aria-expanded={isSearchOpen}
              title="Traži"
            >
              <Search size={22} />
            </button>

            {/* Wishlist */}
            <button 
              onClick={() => navigate('/account')}
              aria-label={`Lista želja, ${wishlist.length} proizvoda`}
              title="Lista želja"
            >
              <Heart size={22} fill={wishlist.length > 0 ? 'var(--color-accent)' : 'none'} stroke={wishlist.length > 0 ? 'var(--color-accent)' : 'currentColor'} />
              {wishlist.length > 0 && (
                <span className="action-badge-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account */}
            <button 
              onClick={() => navigate('/account')}
              aria-label="Moj račun"
              title="Moj Račun"
            >
              <User size={22} />
            </button>

            {/* Cart Icon */}
            <button 
              onClick={openCartDrawer}
              aria-label={`Košarica, ${cartCount} proizvoda`}
              aria-haspopup="dialog"
              title="Košarica"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="action-badge-pulse badge-primary">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Glavni izbornik"
              aria-expanded={isMobileMenuOpen}
              style={{ display: 'none' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Floating Search Bar */}
      {isSearchOpen && (
        <div className="search-panel-drawer animate-fade-in">
          <div className="container">
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Traži proizvode po nazivu, kalibru ili brendu..." 
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                className="input-field"
                style={{ flexGrow: 1 }}
                autoFocus
                aria-autocomplete="list"
                aria-controls="search-results-listbox"
                aria-activedescendant={selectedIndex >= 0 ? `suggestion-item-${selectedIndex}` : undefined}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0 24px' }}>Traži</button>
            </form>

            {/* Live Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="suggestions-panel animate-scale-in" id="search-results-listbox" role="listbox">
                {suggestions.map((p, idx) => (
                  <div 
                    key={p.id}
                    id={`suggestion-item-${idx}`}
                    role="option"
                    aria-selected={idx === selectedIndex}
                    onClick={() => {
                      navigate(`/product/${p.id}`);
                      setIsSearchOpen(false);
                      setSuggestions([]);
                      setSearchQuery('');
                    }}
                    className="suggestion-item-row"
                    style={{
                      backgroundColor: idx === selectedIndex ? 'var(--color-neutral-light)' : 'transparent',
                      outline: idx === selectedIndex ? '1px solid var(--color-accent)' : 'none'
                    }}
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
        <div className="mobile-navigation-drawer animate-slide-up">
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
                    color: 'inherit',
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
                      onClick={() => { navigate(`/shop?category=${cat.id}`); setIsMobileMenuOpen(false); }}
                      style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '14px', color: 'var(--color-text-muted)', fontWeight: 600 }}
                    >
                      SVI PROIZVODI
                    </button>
                    {cat.subCategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          navigate(`/shop?category=${cat.id}&sub=${encodeURIComponent(sub)}`);
                          setIsMobileMenuOpen(false);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          textAlign: 'left',
                          fontSize: '14px',
                          color: 'inherit',
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
              onClick={() => { navigate('/about-us'); setIsMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: '16px', color: 'inherit', textTransform: 'uppercase', textAlign: 'left', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}
            >
              O NAMA
            </button>
            <button 
              onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
              style={{ background: 'none', border: 'none', fontWeight: 700, fontSize: '16px', color: 'inherit', textTransform: 'uppercase', textAlign: 'left', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}
            >
              KONTAKTIRAJTE NAS
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
