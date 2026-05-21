import { useState, useMemo } from 'react';
import type { CSSProperties } from 'react';
import { Search, Coffee, Store } from 'lucide-react';
import type { Category, CartItem, PaymentMethod, Product } from './types';
import { PRODUCTS, CATEGORIES } from './data';
import { ProductCard } from './components/ProductCard';
import { OrderPanel } from './components/OrderPanel';
import { CheckoutModal } from './components/CheckoutModal';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showMobileOrder, setShowMobileOrder] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const incrementItem = (id: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decrementItem = (id: number) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (item && item.quantity <= 1) return prev.filter(i => i.id !== id);
      return prev.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
    });
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setCart([]);
    setShowMobileOrder(false);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartQuantityMap = useMemo(() => {
    const map: Record<number, number> = {};
    cart.forEach(item => { map[item.id] = item.quantity; });
    return map;
  }, [cart]);

  const appStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    background: '#f8fafc',
  };

  const topBarStyle: CSSProperties = {
    background: '#fff',
    borderBottom: '1px solid #e2e8f0',
    padding: '0 20px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexShrink: 0,
    zIndex: 10,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  };

  const logoStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#2563eb',
    fontWeight: 800,
    fontSize: '16px',
    letterSpacing: '-0.3px',
    flexShrink: 0,
    textDecoration: 'none',
  };

  const dividerStyle: CSSProperties = {
    width: '1px',
    height: '24px',
    background: '#e2e8f0',
    flexShrink: 0,
  };

  const searchWrapStyle: CSSProperties = {
    flex: 1,
    position: 'relative',
    maxWidth: '500px',
  };

  const searchInputStyle: CSSProperties = {
    width: '100%',
    background: '#f1f5f9',
    border: '1.5px solid transparent',
    borderRadius: '10px',
    padding: '8px 14px 8px 38px',
    fontSize: '13px',
    color: '#1e293b',
    transition: 'border-color 200ms ease, background 200ms ease',
  };

  const searchIconStyle: CSSProperties = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
    pointerEvents: 'none',
  };

  const mainStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  };

  const leftPanelStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: '16px 16px 16px 16px',
    gap: '12px',
  };

  const categoryBarStyle: CSSProperties = {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    flexShrink: 0,
  };

  const gridStyle: CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '12px',
    alignContent: 'start',
    paddingRight: '4px',
  };

  const mobileOrderBtnStyle: CSSProperties = {
    display: 'none',
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '999px',
    padding: '14px 20px',
    fontSize: '14px',
    fontWeight: 700,
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 8px 20px rgba(37,99,235,0.35)',
    cursor: 'pointer',
    zIndex: 100,
  };

  return (
    <div style={appStyle}>
      {/* Top Bar */}
      <header style={topBarStyle}>
        <div style={logoStyle}>
          <Coffee size={18} />
          <span>BrewPOS</span>
        </div>
        <div style={dividerStyle} />
        <div style={searchWrapStyle}>
          <Search size={15} style={searchIconStyle} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={searchInputStyle}
            onFocus={e => {
              (e.target as HTMLInputElement).style.borderColor = '#3b82f6';
              (e.target as HTMLInputElement).style.background = '#fff';
            }}
            onBlur={e => {
              (e.target as HTMLInputElement).style.borderColor = 'transparent';
              (e.target as HTMLInputElement).style.background = '#f1f5f9';
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto', flexShrink: 0 }}>
          <Store size={14} color="#94a3b8" />
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Cashier Terminal</span>
        </div>
      </header>

      {/* Main Layout */}
      <main style={mainStyle}>
        {/* Left: Product Browser */}
        <div style={leftPanelStyle}>
          {/* Category Filters */}
          <div style={categoryBarStyle}>
            {CATEGORIES.map(cat => (
              <CategoryChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>

          {/* Product Grid */}
          <div style={gridStyle}>
            {filtered.length === 0 ? (
              <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: '12px', color: '#94a3b8' }}>
                <Search size={36} strokeWidth={1.2} />
                <span style={{ fontSize: '14px' }}>No products found</span>
              </div>
            ) : (
              filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                  quantity={cartQuantityMap[product.id] ?? 0}
                />
              ))
            )}
          </div>
        </div>

        {/* Right: Order Panel (desktop) */}
        <div className="order-panel-desktop">
          <OrderPanel
            cart={cart}
            paymentMethod={paymentMethod}
            onSetPayment={setPaymentMethod}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
            onRemove={removeItem}
            onCheckout={handleCheckout}
          />
        </div>

        {/* Mobile Order Drawer */}
        {showMobileOrder && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15,23,42,0.5)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'flex-end',
            }}
            onClick={e => { if (e.target === e.currentTarget) setShowMobileOrder(false); }}
          >
            <div style={{
              background: '#fff',
              borderRadius: '20px 20px 0 0',
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideUp 250ms ease',
            }}>
              <div style={{ padding: '12px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '36px', height: '4px', background: '#e2e8f0', borderRadius: '999px' }} />
              </div>
              <OrderPanel
                cart={cart}
                paymentMethod={paymentMethod}
                onSetPayment={setPaymentMethod}
                onIncrement={incrementItem}
                onDecrement={decrementItem}
                onRemove={removeItem}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}
      </main>

      {/* Mobile FAB */}
      <button
        className="mobile-fab"
        style={{ ...mobileOrderBtnStyle, display: 'flex' }}
        onClick={() => setShowMobileOrder(true)}
      >
        <span>View Order</span>
        {cartCount > 0 && (
          <span style={{
            background: '#fff',
            color: '#2563eb',
            borderRadius: '999px',
            padding: '1px 7px',
            fontSize: '12px',
            fontWeight: 800,
          }}>{cartCount}</span>
        )}
      </button>

      {showCheckout && (
        <CheckoutModal
          cart={cart}
          paymentMethod={paymentMethod}
          onClose={handleCloseCheckout}
        />
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .order-panel-desktop {
          display: flex;
        }

        .mobile-fab {
          display: none !important;
        }

        @media (max-width: 768px) {
          .order-panel-desktop {
            display: none !important;
          }
          .mobile-fab {
            display: flex !important;
          }
        }

        @media (max-width: 480px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const style: CSSProperties = {
    padding: '6px 16px',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: active ? 600 : 500,
    background: active ? '#2563eb' : '#fff',
    color: active ? '#fff' : '#475569',
    border: `1.5px solid ${active ? '#2563eb' : '#e2e8f0'}`,
    cursor: 'pointer',
    transition: 'all 150ms ease',
    userSelect: 'none' as const,
    whiteSpace: 'nowrap' as const,
  };

  return (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={e => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc';
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#cbd5e1';
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = '#fff';
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0';
        }
      }}
    >
      {label}
    </button>
  );
}

export default App;
