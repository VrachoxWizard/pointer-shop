import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { ArrowRight, Flame } from 'lucide-react';

export const Home: React.FC = () => {
  const { products } = useShop();
  const heroImageRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (heroImageRef.current) {
        heroImageRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <Reveal duration={0.8} direction="none">
        <section className="hero-banner-wrap" onClick={() => navigate('/shop')}>
          <img 
            ref={heroImageRef}
            src="/images/2-5.png" 
            alt="Leupold Banner" 
            style={{ 
              width: '100%', 
              height: '120%', 
              display: 'block', 
              objectFit: 'cover',
              transform: 'translateY(0px)',
              willChange: 'transform'
            }}
          />
          {/* Cinematic overlay with editorial left column */}
          <div className="hero-overlay-mask">
            <div className="hero-content-box">
              <span className="hero-badge">Ekskluzivni Zastupnik</span>
              <h1>Leupold Optika</h1>
              <div className="hero-accent-rule" aria-hidden="true" />
              <p>Istražite vrhunski asortiman najpouzdanijih optičkih nišana na svijetu.</p>
              <div className="hero-cta-row">
                <button className="hero-btn-primary">
                  Istraži Ponudu <ArrowRight size={16}/>
                </button>
                <button
                  className="btn-ghost"
                  onClick={(e) => { e.stopPropagation(); navigate('/contact'); }}
                >
                  Kontaktirajte Nas
                </button>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Secondary Banner Section (Alaska 1795) */}
      <Reveal delay={0.1}>
        <section className="container section" style={{ marginTop: 'var(--space-6)' }}>
          <div 
            onClick={() => navigate('/shop?category=odjeca')}
            className="secondary-banner-wrap"
          >
            <img 
              src="/images/istrazi-ponudu_optimized.webp" 
              alt="Alaska 1795" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="secondary-banner-overlay">
              <div style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h2 style={{ fontSize: '28px', color: 'white', margin: 0 }}>ALASKA 1795 ODJEĆA</h2>
                <p style={{ fontSize: '14.5px', fontWeight: 500, opacity: 0.95, color: '#e8e8e8', margin: 0 }}>
                  Lovac u srcu. Finska lovačka odjeća za sve vremenske uvjete.
                </p>
                <span className="banner-btn-secondary">
                  Pogledaj Lovačke Kompleti
                </span>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Core Categories Grid */}
      <Reveal delay={0.2}>
        <section className="container section">
          <SectionHeading centered eyebrow="Istražite Asortiman" title="Popularne Kategorije" />
          
          {/* Tier 1 Grid */}
          <div className="grid-cols-3" style={{ marginBottom: '24px' }}>
            {[
              { name: 'Dugo Oružje', img: '/images/1-1-rh9qc00uywzq8843qijnicwnpnvxyljp8p4opwib4g.jpg', link: '/shop?category=oruzje&sub=Dugo%20oru%C5%BEje', span: true },
              { name: 'Moderno Oružje', img: '/images/hk-rheqfsuprstrre14w695x6zef623o7sc0j64gawukw.png', link: '/shop?category=oruzje&sub=Moderno%20oru%C5%BEje' },
              { name: 'Kratko Oružje', img: '/images/2-1-rh9qc3s7q94vinyn4k65sbyi37detdyml7qmn0cqfk.jpg', link: '/shop?category=oruzje&sub=Kratko%20oru%C5%BEje' }
            ].map(item => (
              <div 
                key={item.name} 
                onClick={() => navigate(item.link)}
                className={`category-card ${item.span ? 'col-span-2' : ''}`}
                style={{ height: '220px', border: '1px solid var(--color-border)' }}
              >
                <img src={item.img} alt={item.name} />
                <div className="card-overlay">
                  <span className="category-card-text">
                    {item.name}
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
              { name: 'Jakne', img: '/images/1-2-rh9p0gcr9lwkyb6edgo0vuu9z08jlrshpd5ht107v4.jpg', link: '/shop?category=odjeca&sub=Jakne' },
              { name: 'Hlače', img: '/images/2-3-rh9pgwj2v8f84na8bkmzipeo7r5sb33dys5e5cm6z4.jpg', link: '/shop?category=odjeca&sub=Hla%C4%8De' },
              { name: 'Čizme', img: '/images/3-4-rh9ph33y72o8dx0o95hdi5qwdg9csytibopsiacfrk.jpg', link: '/shop?category=obuca&sub=%C4%8Cizme' },
              { name: 'Torbe i Ruksaci', img: '/images/4-rh9p0370lxekfrpiiaz8wy5tnm1em0c8zk0p35jqa8.jpg', link: '/shop?category=oprema&sub=Ruksaci%20i%20torbe' },
              { name: 'Optike', img: '/images/5-2-rh9phk11m3be6wc3icsnr1h72dxyniooe0gj59ncnk.jpg', link: '/shop?category=oprema&sub=Optike' },
              { name: 'Crvene točke', img: '/images/6-1-rh9phpo2r3j44k3wlf8f601ymp65xpb2esdg0xezm8.jpg', link: '/shop?category=oprema&sub=Optike' },
              { name: 'Noževi', img: '/images/7-1-rh9phz2gnfvzcnq92jaouxokkjvu2ocds2watp11w0.jpg', link: '/shop?category=oprema&sub=No%C5%BEevi' },
              { name: 'Futrole', img: '/images/8-1-rkn25blagsi9fabkuxw1j247lpffwqoykz97yl8fdc.jpg', link: '/shop?category=oruzje&sub=Futrole%20i%20navlake' }
            ].map(item => (
              <div 
                key={item.name} 
                onClick={() => navigate(item.link)}
                className="category-card"
                style={{ height: '160px', border: '1px solid var(--color-border)' }}
              >
                <img src={item.img} alt={item.name} />
                <div className="card-overlay">
                  <span className="category-card-text" style={{ fontSize: '13px' }}>
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Novo u Ponudi Products */}
      <Reveal delay={0.1}>
        <section className="container section">
          <SectionHeading
            eyebrow="Svježe u Trgovini"
            title="Novo u Ponudi"
            icon={<Flame size={22} aria-hidden="true" />}
            actionLabel="Pregledaj Sve"
            onAction={() => navigate('/shop')}
          />

          <div className="product-scroll-carousel">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Reveal>

      {/* Brand carousel / logos slider */}
      <Reveal delay={0.1}>
        <section className="section" style={{ backgroundColor: 'var(--color-bg-card)', padding: '40px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
          <div className="container">
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '0.1em', color: 'var(--color-neutral-muted)', marginBottom: '30px', fontWeight: 800 }}>
              POPULARNI BRENDOVI
            </h3>
            
            <div className="brand-logo-carousel-container">
              <div className="brand-marquee-track">
                {brandLogos.map((logo, idx) => (
                  <img 
                    key={idx} 
                    src={logo} 
                    alt="Brand logo" 
                    className="brand-logo-card"
                  />
                ))}
                {/* Duplicate logos to create a seamless looping marquee slider */}
                {brandLogos.map((logo, idx) => (
                  <img 
                    key={`dup-${idx}`} 
                    src={logo} 
                    alt="Brand logo" 
                    className="brand-logo-card"
                  />
                ))}
              </div>
            </div>

          </div>
        </section>
      </Reveal>

      {/* Novo Streljivo */}
      <Reveal delay={0.1}>
        <section className="container section">
          <SectionHeading
            eyebrow="Kalibri za Svaki Lov"
            title="Novo Streljivo"
            actionLabel="Pregledaj Sve"
            onAction={() => navigate('/shop?category=streljivo')}
          />

          <div className="product-scroll-carousel">
            {ammoProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Reveal>

    </div>
  );
};
