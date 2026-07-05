import React, { createContext, useContext, useState, useEffect, useTransition, ReactNode } from 'react';
import { Product, PRODUCTS } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  image?: string;
}

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  quickViewProduct: Product | null;
  isCartAdding: boolean;
  toasts: ToastMessage[];
  theme: 'light' | 'dark';
  isCartDrawerOpen: boolean;
  addToCart: (productId: string, qty?: number) => Promise<void>;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  clearCart: () => void;
  showToast: (title: string, message: string, image?: string) => void;
  removeToast: (id: string) => void;
  toggleTheme: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const cached = localStorage.getItem('pointer_theme');
    if (cached === 'dark' || cached === 'light') return cached;
    return 'light'; // Default Light
  });

  // Sync theme attribute in HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pointer_theme', theme);
  }, [theme]);

  // React 19 transition to handle asynchronous adding animation state
  const [isCartAdding, startCartAddingTransition] = useTransition();

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const showToast = (title: string, message: string, image?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, image }]);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (productId: string, qty = 1): Promise<void> => {
    return new Promise((resolve) => {
      startCartAddingTransition(async () => {
        // Simulate database/API delay
        await new Promise((res) => setTimeout(res, 500));
        
        const product = PRODUCTS.find((p) => p.id === productId);
        if (product) {
          setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((item) => item.product.id === productId);
            if (existingItemIndex > -1) {
              const newCart = [...prevCart];
              newCart[existingItemIndex].quantity += qty;
              return newCart;
            } else {
              return [...prevCart, { product, quantity: qty }];
            }
          });
          
          showToast('Dodano u košaricu', product.name, product.images[0]);
          // Auto-slide open the mini cart drawer
          setIsCartDrawerOpen(true);
        }
        
        resolve();
      });
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prevWishlist) => {
      const isAdding = !prevWishlist.includes(productId);
      const product = PRODUCTS.find((p) => p.id === productId);
      
      if (product) {
        if (isAdding) {
          showToast('Dodano na listu želja', product.name, product.images[0]);
        } else {
          showToast('Uklonjeno s liste želja', product.name, product.images[0]);
        }
      }
      
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        products: PRODUCTS,
        cart,
        wishlist,
        quickViewProduct,
        isCartAdding,
        toasts,
        theme,
        isCartDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        openQuickView,
        closeQuickView,
        clearCart,
        showToast,
        removeToast,
        toggleTheme,
        openCartDrawer,
        closeCartDrawer
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
