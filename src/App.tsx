import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileNavbar } from './components/MobileNavbar';
import { QuickViewModal } from './components/QuickViewModal';
import { CookieBanner } from './components/CookieBanner';
import { PromoPopup } from './components/PromoPopup';
import { Toast } from './components/Toast';
import { CartDrawer } from './components/CartDrawer';
import { Cursor } from './components/Cursor';
import { ScrollToTop } from './components/ScrollToTop';
import { ErrorBoundary } from './components/ErrorBoundary';

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
  const location = useLocation();

  // Normalize path for Header/MobileNavbar active route states
  const currentRoute = location.pathname.substring(1) || 'home';

  return (
    <div className="app-wrapper">
      {/* Header Layout */}
      <Header currentRoute={currentRoute} />

      {/* Main Page Content wrapper with route transitions */}
      <ErrorBoundary>
        <main className="main-content route-transition" key={location.pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </ErrorBoundary>

      {/* Footer Layout */}
      <Footer />

      {/* Dedicated handheld bottom bar on small viewports */}
      <MobileNavbar />

      {/* Modals & Overlays */}
      <ScrollToTop />
      <Cursor />
      <QuickViewModal />
      <CookieBanner />
      <PromoPopup />
      <Toast />
      <CartDrawer />
    </div>
  );
};

export default App;
