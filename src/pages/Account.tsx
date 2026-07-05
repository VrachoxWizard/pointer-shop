import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, Package, MapPin } from 'lucide-react';

interface AccountProps {
  onNavigate: (route: string) => void;
}

export const Account: React.FC<AccountProps> = ({ onNavigate }) => {
  const { products, wishlist } = useShop();
  const [activeTab, setActiveTab] = useState<'wishlist' | 'orders' | 'profile'>('wishlist');

  const favoritedProducts = products.filter(p => wishlist.includes(p.id));

  const mockOrders = [
    { id: 'PO-947264', date: '12.05.2026', total: 720.00, status: 'Dostavljeno', items: 'HS Produkt Echelon SS x 1' },
    { id: 'PO-284917', date: '04.03.2026', total: 38.00, status: 'Dostavljeno', items: 'Real Avid Bore Boss x 2' }
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      
      {/* React 19 Native Document Metadata */}
      <title>POINTER | Moj Račun</title>

      <h1 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '30px', borderBottom: '2px solid var(--color-primary)', paddingBottom: '12px' }}>
        Moj Račun
      </h1>

      <div style={{ display: 'flex', gap: '30px' }} className="account-layout">
        
        {/* Left Side: Tabs Selection */}
        <div style={{ width: '220px', flexShrink: 0 }} className="account-menu">
          <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '12px 0', display: 'flex', flexDirection: 'column' }}>
            <button
              onClick={() => setActiveTab('wishlist')}
              style={{
                textAlign: 'left', padding: '12px 20px', background: 'none', border: 'none', cursor: 'pointer',
                fontWeight: activeTab === 'wishlist' ? 'bold' : 500,
                color: activeTab === 'wishlist' ? 'var(--color-accent)' : 'var(--color-text-main)',
                backgroundColor: activeTab === 'wishlist' ? 'var(--color-bg-site)' : 'transparent',
                display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px'
              }}
            >
              <Heart size={16}/> Lista Želja ({favoritedProducts.length})
            </button>
            
            <button
              onClick={() => setActiveTab('orders')}
              style={{
                textAlign: 'left', padding: '12px 20px', background: 'none', border: 'none', cursor: 'pointer',
                fontWeight: activeTab === 'orders' ? 'bold' : 500,
                color: activeTab === 'orders' ? 'var(--color-accent)' : 'var(--color-text-main)',
                backgroundColor: activeTab === 'orders' ? 'var(--color-bg-site)' : 'transparent',
                display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px'
              }}
            >
              <Package size={16}/> Moje Narudžbe
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              style={{
                textAlign: 'left', padding: '12px 20px', background: 'none', border: 'none', cursor: 'pointer',
                fontWeight: activeTab === 'profile' ? 'bold' : 500,
                color: activeTab === 'profile' ? 'var(--color-accent)' : 'var(--color-text-main)',
                backgroundColor: activeTab === 'profile' ? 'var(--color-bg-site)' : 'transparent',
                display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px'
              }}
            >
              <MapPin size={16}/> Adresa i Podaci
            </button>
          </div>
        </div>

        {/* Right Side: Tab Contents */}
        <div style={{ flexGrow: 1 }} className="account-content">
          
          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              <h2 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '20px' }}>Moja Lista Želja</h2>
              {favoritedProducts.length === 0 ? (
                <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '40px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>Još niste dodali niti jedan proizvod na listu želja.</p>
                  <button onClick={() => onNavigate('shop')} className="btn-secondary" style={{ fontSize: '13px' }}>Pregledaj katalog</button>
                </div>
              ) : (
                <div className="grid-cols-3">
                  {favoritedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '20px' }}>Povijest Narudžbi</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {mockOrders.map(order => (
                  <div 
                    key={order.id}
                    style={{
                      backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px 20px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '15px', color: 'var(--color-text-main)' }}>Narudžba {order.id}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Datum: {order.date} | Proizvodi: {order.items}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--color-primary)' }}>€{order.total.toFixed(2)}</div>
                      <span style={{ fontSize: '12px', color: '#2F5935', backgroundColor: '#E1EBE2', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '4px', fontWeight: 600 }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div style={{ backgroundColor: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
              <h2 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 700 }}>Moja Adresa</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>Puno Ime:</span>
                  <span style={{ fontWeight: 600 }}>Ivan Horvat</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>Ulica i kućni broj:</span>
                  <span style={{ fontWeight: 600 }}>Koledinečka ulica 1a</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>Grad i Poštanski broj:</span>
                  <span style={{ fontWeight: 600 }}>Zagreb, 10000</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>Telefon:</span>
                  <span style={{ fontWeight: 600 }}>+385 91 123 4567</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px' }}>Predefinirani način plaćanja:</span>
                  <span style={{ fontWeight: 600 }}>Plaćanje pouzećem (gotovina)</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .account-layout {
            flex-direction: column !important;
          }
          .account-menu {
            width: 100% !important;
          }
        }
      `}</style>

    </div>
  );
};
