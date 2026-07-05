import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { CATEGORIES } from '../data/products';
import { Grid, List, SlidersHorizontal, Search, X } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { EmptyState } from '../components/EmptyState';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';

export const Shop: React.FC = () => {
  const { products, addToCart, openQuickView } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';
  const selectedSubCategory = searchParams.get('sub') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Local UI States
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Sync local search input with URL search param changes (e.g. from header)
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Simulate loading state on filters changes for high-fidelity feel
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSubCategory, searchQuery]);

  // Handle local search submit on Enter/Blur
  const triggerSearchUpdate = (val: string) => {
    setSearchParams((prev) => {
      if (!val.trim()) {
        prev.delete('search');
      } else {
        prev.set('search', val.trim());
      }
      return prev;
    });
  };

  // Body scroll lock on mobile when sidebar filters are active
  useEffect(() => {
    if (showFilters) {
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
    }
    return () => document.body.classList.remove('scroll-locked');
  }, [showFilters]);

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    // 1. Category Filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    // 2. Subcategory Filter
    if (selectedSubCategory !== 'all' && product.subCategory !== selectedSubCategory) {
      return false;
    }
    // 3. Price Filter
    if (product.price > priceRange) {
      return false;
    }
    // 4. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(q);
      const brandMatch = product.brand.toLowerCase().includes(q);
      const skuMatch = product.sku.toLowerCase().includes(q);
      const specMatch = Object.values(product.specifications).some(v => v.toLowerCase().includes(q));
      if (!nameMatch && !brandMatch && !skuMatch && !specMatch) {
        return false;
      }
    }
    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0; // "featured" defaults to natural seeding order
    }
  });

  const activeCategoryObject = CATEGORIES.find(c => c.id === selectedCategory);

  const handleResetFilters = () => {
    setSearchParams((prev) => {
      prev.delete('category');
      prev.delete('sub');
      prev.delete('search');
      return prev;
    });
    setPriceRange(5000);
    setLocalSearch('');
  };

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      
      {/* React 19 Native Document Metadata */}
      <title>POINTER | Katalog Proizvoda</title>
      <meta name="description" content="Pregledajte kompletan asortiman oružja, karabina, pištolja i lovačkog streljiva po najpovoljnijim cijenama." />

      {/* Breadcrumb Header PageHeader */}
      <PageHeader 
        title="Katalog Proizvoda"
        subtitle="Pregledajte kompletan asortiman najkvalitetnije lovačke i sportske opreme."
        breadcrumbs={[
          { label: 'Trgovina', route: '/shop' },
          ...(activeCategoryObject ? [{ label: activeCategoryObject.name, route: `/shop?category=${activeCategoryObject.id}` }] : []),
          ...(selectedSubCategory !== 'all' ? [{ label: selectedSubCategory }] : [])
        ]}
      />

      <div className="shop-page-layout">
        
        {/* Mobile Filter Sidebar Backdrop Overlay */}
        {showFilters && (
          <div 
            className="modal-overlay-custom" 
            style={{ zIndex: 290 }} 
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Sidebar Filters */}
        <aside className={`shop-sidebar-aside ${showFilters ? 'mobile-visible' : ''}`}>
          
          {/* Mobile Only Header inside Sidebar */}
          <div className="mobile-only-header" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '14px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)' }}>Filteri</h3>
            <button onClick={() => setShowFilters(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-main)' }}>
              <X size={20} />
            </button>
          </div>

          {/* Categories Tree */}
          <div className="sidebar-filter-card" style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '15px', textTransform: 'uppercase', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '16px', fontWeight: 800 }}>
              Kategorije
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <button 
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.delete('category');
                    prev.delete('sub');
                    return prev;
                  });
                }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  color: selectedCategory === 'all' ? 'var(--color-accent)' : 'var(--color-neutral-dark)',
                  fontWeight: selectedCategory === 'all' ? 'bold' : 500
                }}
              >
                Svi Proizvodi ({products.length})
              </button>
              {CATEGORIES.map(cat => {
                const count = products.filter(p => p.category === cat.id).length;
                return (
                  <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <button 
                      onClick={() => {
                        setSearchParams((prev) => {
                          prev.set('category', cat.id);
                          prev.delete('sub');
                          return prev;
                        });
                      }}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                        color: selectedCategory === cat.id ? 'var(--color-accent)' : 'var(--color-neutral-dark)',
                        fontWeight: selectedCategory === cat.id ? 'bold' : 500,
                        padding: '2px 0'
                      }}
                    >
                      {cat.name} ({count})
                    </button>

                    {/* Subcategories (if main category selected) */}
                    {selectedCategory === cat.id && cat.subCategories && (
                      <div style={{ paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px', marginTop: '4px', borderLeft: '1px solid var(--color-border)' }}>
                        {cat.subCategories.map(sub => {
                          const subCount = products.filter(p => p.category === cat.id && p.subCategory === sub).length;
                          return (
                            <button
                              key={sub}
                              onClick={() => {
                                setSearchParams((prev) => {
                                  prev.set('sub', sub);
                                  return prev;
                                });
                              }}
                              style={{
                                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                                color: selectedSubCategory === sub ? 'var(--color-accent)' : 'var(--color-neutral-muted)',
                                fontWeight: selectedSubCategory === sub ? 'bold' : 500,
                                padding: '2px 0'
                              }}
                            >
                              {sub} ({subCount})
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="sidebar-filter-card">
            <h3 style={{ fontSize: '15px', textTransform: 'uppercase', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '16px', fontWeight: 800 }}>
              Maksimalna Cijena
            </h3>
            <div className="max-price-range-filter">
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="50"
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600 }}>
                <span>€0</span>
                <span style={{ color: 'var(--color-accent)' }}>€{priceRange}</span>
              </div>
            </div>
          </div>

        </aside>

        {/* Product Listing Main View */}
        <div className="shop-main-catalog">
          
          {/* Toolbar Controls */}
          <div className="catalog-toolbar-panel">
            {/* Left toolbar details */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button 
                className="mobile-filter-btn"
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  display: 'none',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '13px'
                }}
              >
                <SlidersHorizontal size={14}/> Filteri
              </button>
              
              <span style={{ fontSize: '14px', color: 'var(--color-neutral-muted)', fontWeight: 500 }}>
                Pronađeno: <strong>{sortedProducts.length}</strong> proizvoda
              </span>
            </div>

            {/* Filter Search inside catalog */}
            <div className="catalog-search-wrapper">
              <input 
                type="text" 
                placeholder="Pretraži rezultate..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') triggerSearchUpdate(localSearch);
                }}
                onBlur={() => triggerSearchUpdate(localSearch)}
              />
              <Search size={14} style={{ position: 'absolute', right: '10px', color: 'var(--color-neutral-muted)' }} />
            </div>

            {/* Sorting choices dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--color-neutral-muted)' }}>Poredaj po:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  backgroundColor: 'var(--color-bg-card)',
                  color: 'var(--color-neutral-dark)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="featured">Istaknuto</option>
                <option value="price-asc">Cijena: od najniže</option>
                <option value="price-desc">Cijena: od najviše</option>
                <option value="name-asc">Naziv: A-Z</option>
                <option value="name-desc">Naziv: Z-A</option>
              </select>

              {/* View Layout Toggles */}
              <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: '4px', overflow: 'hidden', marginLeft: '8px' }}>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`view-mode-button ${viewMode === 'grid' ? 'active' : ''}`}
                >
                  <Grid size={16}/>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`view-mode-button ${viewMode === 'list' ? 'active' : ''}`}
                >
                  <List size={16}/>
                </button>
              </div>

            </div>

          </div>

          {/* Search Result Clear notice */}
          {searchQuery && (
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <span>Aktivna pretraga za: "<strong>{searchQuery}</strong>"</span>
              <button 
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.delete('search');
                    return prev;
                  });
                  setLocalSearch('');
                }}
                style={{
                  background: 'none', border: 'none', color: 'var(--color-accent)', textDecoration: 'underline', cursor: 'pointer', fontSize: '12px'
                }}
              >
                Ukloni pretragu
              </button>
            </div>
          )}

          {/* Main Products Listing with loading shimmer / EmptyState */}
          {isLoading ? (
            <div className="shop-products-grid view-grid">
              {Array.from({ length: 6 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <EmptyState 
              icon={<Search size={48} />}
              title="Nema rezultata"
              description="Nema pronađenih proizvoda koji odgovaraju odabranim kriterijima."
              actionLabel="Poništi sve filtere"
              onAction={handleResetFilters}
            />
          ) : (
            <Reveal delay={0.1}>
              <div className={`shop-products-grid view-${viewMode}`}>
                {sortedProducts.map(product => (
                  viewMode === 'grid' ? (
                    <ProductCard key={product.id} product={product} />
                  ) : (
                    /* List Layout Item */
                    <div key={product.id} className="shop-list-item">
                      <div className="shop-list-item-image">
                        <img src={product.images[0]} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-neutral-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>{product.brand}</span>
                        <h3 style={{ fontSize: '16px', color: 'var(--color-neutral-dark)', margin: '4px 0 8px' }}>{product.name}</h3>
                        <p style={{ fontSize: '13px', color: 'var(--color-neutral-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '12px' }}>{product.description}</p>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: 'auto' }}>
                          <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-primary)' }}>€{product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span style={{ fontSize: '12px', color: 'var(--color-neutral-muted)', textDecoration: 'line-through' }}>€{product.originalPrice.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
                        <button onClick={() => addToCart(product.id, 1)} className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px', whiteSpace: 'nowrap' }}>Dodaj u košaricu</button>
                        <button onClick={() => openQuickView(product)} className="btn-secondary" style={{ padding: '6px 16px', fontSize: '13px', border: '1px solid var(--color-primary)', whiteSpace: 'nowrap' }}>Brzi pregled</button>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </Reveal>
          )}

        </div>

      </div>
    </div>
  );
};
