import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

interface HomeProps {
  onNavigate: (route: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { products } = useShop();

  const newProducts = products.filter(p => p.isNew && !p.isAmmo).slice(0, 4);
  const ammoProducts = products.filter(p => p.isAmmo).slice(0, 4);

  const brandLogos = [
    '/images/9-rh94l2c0yekxmq1qkwup3n6swqyruj3uwca7txly3s.png',
    '/images/11-rh94lfhrm32y59img2jh2jv9855wuak3m5f0jt2foo.png',
    '/images/LEUPOLD-LOGO-rlj1nmijgvoxqeb4w48q9f9ro4j4oi5ybjow4urca0.png',
    '/images/12-rh94lm2mxxbyej92dndv207hdu9hc6a7z1zewqsoh4.png',
    '/images/14-rh94m4veqm1ouqhrbviefvgp9jotm4cupn14ia0t0o.png',
    '/images/18-rh94zopn9mli8ct578drvycxkiwbl15jkpm4kvxhbc.png',
    '/images/19-rh9508g995cj060gzywxubdm1m712obwnfbbnp47oo.png',
    '/images/20-rh950t4pfi4u3l6fn7uqd65r43d3s0m029o07s9jvs.png'
  ];

  return (
    <div className="home-page animate-fade-in">
      
      {/* React 19 Native Document Metadata */}
      <title>POINTER | Početna Trgovina</title>
      <meta name="description" content="Dobrodošli na POINTER Trgovinu - vrhunsko oružje, streljivo, optike i oprema za lov." />

      {/* Hero Banner Section */}
      <section style={{ position: 'relative', width: '100%', cursor: 'pointer', overflow: 'hidden' }} onClick={() => onNavigate('shop')}>
        <img 
          src="/images/2-5.png" 
          alt="Leupold Banner" 
          style={{ width: '100%', height: 'auto', display: 'block', minHeight: '180px', objectFit: 'cover' }}
        />
        {/* Subtle overlay styling */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(to right, rgba(26,29,21,0.4) 0%, rgba(26,29,21,0) 80%)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '8%'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'white', maxWidth: '400px' }} className="animate-slide-up">
            <span style={{ textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.15em', color: 'var(--color-accent)', fontWeight: 700 }}>Ekskluzivni Zastupnik</span>
            <h1 style={{ fontSize: '36px', lineHeight: '1.2' }}>LEUPOLD OPTIKA</h1>
            <p style={{ fontSize: '14px', opacity: 0.9 }}>Istražite vrhunski asortiman najpouzdanijih nišana na svijetu.</p>
            <button className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
              Istraži Ponudu <ArrowRight size={16}/>
            </button>
          </div>
        </div>
      </section>

      {/* Secondary Banner Section (Alaska 1795) */}
      <section style={{ margin: '40px 0' }} className="container">
        <div 
          onClick={() => onNavigate('shop?category=odjeca')}
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-md)',
            height: '280px'
          }}
        >
          <img 
            src="/images/istrazi-ponudu_optimized.webp" 
            alt="Alaska 1795" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px'
          }}>
            <div style={{ color: 'white', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h2 style={{ fontSize: '32px' }}>ALASKA 1795 ODJEĆA</h2>
              <p style={{ fontSize: '15px', fontWeight: 500, letterSpacing: '0.05em' }}>
                Lovac u srcu. Finska lovačka odjeća za sve vremenske uvjete.
              </p>
              <span style={{ fontSize: '14px', textDecoration: 'underline', marginTop: '10px', display: 'block', fontWeight: 'bold' }}>
                Pogledaj Lovačke Kompleti
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Categories Grid */}
      <section className="container" style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '24px', textAlign: 'center', color: 'var(--color-primary)' }}>POPULARNE KATEGORIJE</h2>
        
        {/* Tier 1 Grid */}
        <div className="grid-cols-3" style={{ marginBottom: '24px' }}>
          {[
            { name: 'Dugo Oružje', img: '/images/1-1-rh9qc00uywzq8843qijnicwnpnvxyljp8p4opwib4g.jpg', link: 'shop?category=oruzje&sub=Dugo%20oru%C5%BEje' },
            { name: 'Moderno Oružje', img: '/images/hk-rheqfsuprstrre14w695x6zef623o7sc0j64gawukw.png', link: 'shop?category=oruzje&sub=Moderno%20oru%C5%BEje' },
            { name: 'Kratko Oružje', img: '/images/2-1-rh9qc3s7q94vinyn4k65sbyi37detdyml7qmn0cqfk.jpg', link: 'shop?category=oruzje&sub=Kratko%20oru%C5%BEje' }
          ].map(item => (
            <div 
              key={item.name} 
              onClick={() => onNavigate(item.link)}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                height: '180px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
              className="category-card"
            >
              <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
              <div className="card-overlay" style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'flex-end', padding: '16px'
              }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px', fontFamily: 'var(--font-heading)' }}>
                  {item.name.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Divider Image */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '36px 0' }}>
          <img src="/images/jjj.png" alt="divider" style={{ maxWidth: '100%', height: '12px' }} />
        </div>

        {/* Tier 2 Grid */}
        <div className="grid-cols-4">
          {[
            { name: 'Jakne', img: '/images/1-2-rh9p0gcr9lwkyb6edgo0vuu9z08jlrshpd5ht107v4.jpg', link: 'shop?category=odjeca&sub=Jakne' },
            { name: 'Hlače', img: '/images/2-3-rh9pgwj2v8f84na8bkmzipeo7r5sb33dys5e5cm6z4.jpg', link: 'shop?category=odjeca&sub=Hla%C4%8De' },
            { name: 'Čizme', img: '/images/3-4-rh9ph33y72o8dx0o95hdi5qwdg9csytibopsiacfrk.jpg', link: 'shop?category=obuca&sub=%C4%8Cizme' },
            { name: 'Torbe i Ruksaci', img: '/images/4-rh9p0370lxekfrpiiaz8wy5tnm1em0c8zk0p35jqa8.jpg', link: 'shop?category=oprema&sub=Ruksaci%20i%20torbe' },
            { name: 'Optike', img: '/images/5-2-rh9phk11m3be6wc3icsnr1h72dxyniooe0gj59ncnk.jpg', link: 'shop?category=oprema&sub=Optike' },
            { name: 'Crvene točke', img: '/images/6-1-rh9phpo2r3j44k3wlf8f601ymp65xpb2esdg0xezm8.jpg', link: 'shop?category=oprema&sub=Optike' },
            { name: 'Noževi', img: '/images/7-1-rh9phz2gnfvzcnq92jaouxokkjvu2ocds2watp11w0.jpg', link: 'shop?category=oprema&sub=No%C5%BEevi' },
            { name: 'Futrole', img: '/images/8-1-rkn25blagsi9fabkuxw1j247lpffwqoykz97yl8fdc.jpg', link: 'shop?category=oruzje&sub=Futrole%20i%20navlake' }
          ].map(item => (
            <div 
              key={item.name} 
              onClick={() => onNavigate(item.link)}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                height: '140px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)'
              }}
              className="category-card"
            >
              <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
              <div className="card-overlay" style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'flex-end', padding: '12px'
              }}>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-heading)' }}>
                  {item.name.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Novo u Ponudi Products */}
      <section className="container" style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flame size={24} style={{ color: 'var(--color-accent)' }} /> NOVO U PONUDI
          </h2>
          <button 
            onClick={() => onNavigate('shop')} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--color-accent)', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            onMouseEnter={(e)=>e.currentTarget.style.textDecoration='underline'}
            onMouseLeave={(e)=>e.currentTarget.style.textDecoration='none'}
          >
            Pregledaj Sve <ArrowRight size={14}/>
          </button>
        </div>

        <div className="grid-cols-4">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand carousel / logos slider */}
      <section style={{ backgroundColor: 'white', padding: '40px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', marginBottom: '60px' }}>
        <div className="container">
          <h3 style={{ fontSize: '14px', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginBottom: '30px', fontWeight: 800 }}>
            POPULARNI BRENDOVI
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            {brandLogos.map((logo, idx) => (
              <img 
                key={idx} 
                src={logo} 
                alt="Brand logo" 
                style={{ 
                  maxHeight: '44px', 
                  maxWidth: '120px', 
                  objectFit: 'contain', 
                  opacity: 0.6, 
                  transition: 'opacity 0.2s',
                  cursor: 'pointer' 
                }} 
                onMouseEnter={(e)=>e.currentTarget.style.opacity='1'}
                onMouseLeave={(e)=>e.currentTarget.style.opacity='0.6'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Novo Streljivo */}
      <section className="container" style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--color-primary)' }}>NOVO STRELJIVO</h2>
          <button 
            onClick={() => onNavigate('shop?category=streljivo')} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--color-accent)', 
              fontWeight: 'bold', 
              cursor: 'pointer', 
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            onMouseEnter={(e)=>e.currentTarget.style.textDecoration='underline'}
            onMouseLeave={(e)=>e.currentTarget.style.textDecoration='none'}
          >
            Pregledaj Sve <ArrowRight size={14}/>
          </button>
        </div>

        <div className="grid-cols-4">
          {ammoProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Local interactive styles */}
      <style>{`
        .category-card:hover img {
          transform: scale(1.08);
        }
        .category-card {
          position: relative;
        }
        .category-card .card-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%) !important;
          transition: background 0.3s;
        }
        .category-card:hover .card-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 100%) !important;
        }
      `}</style>

    </div>
  );
};
