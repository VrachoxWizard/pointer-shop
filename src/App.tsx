import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileNavbar } from './components/MobileNavbar';
import { QuickViewModal } from './components/QuickViewModal';
import { CookieBanner } from './components/CookieBanner';
import { PromoPopup } from './components/PromoPopup';
import { Toast } from './components/Toast';
import { CartDrawer } from './components/CartDrawer';
import { Cursor } from './components/Cursor';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { CartPage } from './pages/CartPage';
import { Account } from './pages/Account';
import { Contact } from './pages/Contact';
import { AboutUs } from './pages/AboutUs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  const [route, setRoute] = useState<string>('home');
  const [routeParam, setRouteParam] = useState<string | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [subCategoryFilter, setSubCategoryFilter] = useState<string | undefined>(undefined);
  const [searchFilter, setSearchFilter] = useState<string | undefined>(undefined);

  // Simple state router function
  const navigate = (path: string, catFilter?: string) => {
    // Scroll to top on navigation
    window.scrollTo(0, 0);

    // Reset filters
    setCategoryFilter(undefined);
    setSubCategoryFilter(undefined);
    setSearchFilter(undefined);
    setRouteParam(undefined);

    if (path.startsWith('shop')) {
      setRoute('shop');
      if (catFilter) {
        setCategoryFilter(catFilter);
      }
      
      // Parse query parameters manually
      if (path.includes('?')) {
        const queryStr = path.split('?')[1];
        const params = new URLSearchParams(queryStr);
        
        const cat = params.get('category');
        if (cat) setCategoryFilter(cat);

        const sub = params.get('sub');
        if (sub) setSubCategoryFilter(sub);

        const search = params.get('search');
        if (search) setSearchFilter(search);
      }
      return;
    }

    if (path.startsWith('product/')) {
      const parts = path.split('/');
      setRoute('product');
      setRouteParam(parts[1]);
      return;
    }

    setRoute(path);
  };

  // Listen to browser hash changes for back-button support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '') || 'home';
      navigate(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial load
    const initialHash = window.location.hash.replace('#/', '') || 'home';
    navigate(initialHash);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Wrap navigate with hash updates so the URL updates and back/forward browser support works
  const navigateWithHashUpdate = (path: string, catFilter?: string) => {
    window.location.hash = `#/${path}`;
    // If it has category filter, trigger navigate directly to carry params
    if (catFilter || path.includes('?')) {
      navigate(path, catFilter);
    }
  };

  const renderPage = () => {
    switch (route) {
      case 'home':
        return <Home onNavigate={navigateWithHashUpdate} />;
      case 'shop':
        return (
          <Shop 
            initialCategory={categoryFilter} 
            initialSubCategory={subCategoryFilter}
            initialSearch={searchFilter}
          />
        );
      case 'product':
        return <ProductDetail productId={routeParam || ''} onNavigate={navigateWithHashUpdate} />;
      case 'cart':
        return <CartPage onNavigate={navigateWithHashUpdate} />;
      case 'account':
        return <Account onNavigate={navigateWithHashUpdate} />;
      case 'contact':
        return <Contact />;
      case 'about-us':
        return <AboutUs />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      default:
        return <NotFound onNavigate={navigateWithHashUpdate} />;
    }
  };

  return (
    <div className="app-wrapper">
      
      {/* Header Layout */}
      <Header currentRoute={route} onNavigate={navigateWithHashUpdate} />

      {/* Main Page Content */}
      <main className="main-content route-transition" key={route}>
        {renderPage()}
      </main>

      {/* Footer Layout */}
      <Footer onNavigate={navigateWithHashUpdate} />

      {/* Dedicated handheld bottom bar on small viewports */}
      <MobileNavbar currentRoute={route} onNavigate={navigateWithHashUpdate} />

      {/* Modals & Overlays */}
      <Cursor />
      <QuickViewModal />
      <CookieBanner />
      <PromoPopup />
      <Toast />
      <CartDrawer onNavigate={navigateWithHashUpdate} />

    </div>
  );
};
export default App;
