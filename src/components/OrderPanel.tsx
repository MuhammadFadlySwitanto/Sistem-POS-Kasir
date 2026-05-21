import { Plus, Minus, ShoppingCart, Banknote, CreditCard, QrCode, X } from 'lucide-react';
import type { CartItem, PaymentMethod } from '../types';
import { TAX_RATE } from '../data';
import { useState } from 'react';
import type { CSSProperties } from 'react';

interface Props {
  cart: CartItem[];
  paymentMethod: PaymentMethod;
  onSetPayment: (method: PaymentMethod) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

const paymentMethods: { key: PaymentMethod; icon: React.ReactNode; label: string }[] = [
  { key: 'Cash', icon: <Banknote size={18} />, label: 'Cash' },
  { key: 'QRIS', icon: <QrCode size={18} />, label: 'QRIS' },
  { key: 'Card', icon: <CreditCard size={18} />, label: 'Card' },
];

export function OrderPanel({ cart, paymentMethod, onSetPayment, onIncrement, onDecrement, onRemove, onCheckout }: Props) {
  const [checkoutAnim, setCheckoutAnim] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutAnim(true);
    setTimeout(() => setCheckoutAnim(false), 300);
    onCheckout();
  };

  const panelStyle: CSSProperties = {
    width: '340px',
    minWidth: '300px',
    background: '#fff',
    borderLeft: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const headerStyle: CSSProperties = {
    padding: '20px 20px 16px',
    borderBottom: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const headerTitleStyle: CSSProperties = {
    fontSize: '16px',
    fontWeight: 700,
    color: '#0f172a',
    flex: 1,
  };

  const countBadgeStyle: CSSProperties = {
    background: '#eff6ff',
    color: '#2563eb',
    borderRadius: '999px',
    padding: '2px 8px',
    fontSize: '12px',
    fontWeight: 600,
    transition: 'transform 200ms ease',
  };

  const cartBodyStyle: CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '12px 0',
  };

  const emptyStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: '12px',
    color: '#94a3b8',
    padding: '40px 20px',
  };

  const footerStyle: CSSProperties = {
    borderTop: '1px solid #f1f5f9',
    padding: '16px 20px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const summaryRowStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const totalRowStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10px',
    borderTop: '1px solid #e2e8f0',
    marginTop: '2px',
  };

  const checkoutBtnStyle: CSSProperties = {
    background: cart.length === 0 ? '#e2e8f0' : (checkoutAnim ? '#1d4ed8' : '#2563eb'),
    color: cart.length === 0 ? '#94a3b8' : '#fff',
    borderRadius: '10px',
    padding: '14px',
    fontSize: '14px',
    fontWeight: 700,
    width: '100%',
    transition: 'background 150ms ease, transform 100ms ease',
    letterSpacing: '0.3px',
    transform: checkoutAnim ? 'scale(0.98)' : 'scale(1)',
    cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
  };

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <ShoppingCart size={18} color="#2563eb" />
        <span style={headerTitleStyle}>Current Order</span>
        {itemCount > 0 && (
          <span style={countBadgeStyle}>{itemCount}</span>
        )}
      </div>

      <div style={cartBodyStyle}>
        {cart.length === 0 ? (
          <div style={emptyStyle}>
            <ShoppingCart size={40} strokeWidth={1.2} color="#cbd5e1" />
            <span style={{ fontSize: '13px' }}>No items in cart</span>
          </div>
        ) : (
          cart.map(item => (
            <CartRow
              key={item.id}
              item={item}
              onIncrement={() => onIncrement(item.id)}
              onDecrement={() => onDecrement(item.id)}
              onRemove={() => onRemove(item.id)}
            />
          ))
        )}
      </div>

      <div style={footerStyle}>
        <div style={summaryRowStyle}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Subtotal</span>
          <span style={{ fontSize: '13px', color: '#334155', fontWeight: 500 }}>${subtotal.toFixed(2)}</span>
        </div>
        <div style={summaryRowStyle}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
          <span style={{ fontSize: '13px', color: '#334155', fontWeight: 500 }}>${tax.toFixed(2)}</span>
        </div>

        <div style={totalRowStyle}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Total</span>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#2563eb' }}>${total.toFixed(2)}</span>
        </div>

        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '8px' }}>Payment Method</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {paymentMethods.map(pm => (
              <PaymentButton
                key={pm.key}
                icon={pm.icon}
                label={pm.label}
                active={paymentMethod === pm.key}
                onClick={() => onSetPayment(pm.key)}
              />
            ))}
          </div>
        </div>

        <button
          style={checkoutBtnStyle}
          onClick={handleCheckout}
          onMouseEnter={e => {
            if (cart.length > 0) (e.currentTarget as HTMLButtonElement).style.background = '#1d4ed8';
          }}
          onMouseLeave={e => {
            if (cart.length > 0) (e.currentTarget as HTMLButtonElement).style.background = '#2563eb';
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

function CartRow({ item, onIncrement, onDecrement, onRemove }: {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}) {
  const rowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    gap: '10px',
    transition: 'background 150ms ease',
  };

  const nameStyle: CSSProperties = {
    flex: 1,
    fontSize: '13px',
    fontWeight: 600,
    color: '#1e293b',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const priceStyle: CSSProperties = {
    fontSize: '13px',
    fontWeight: 600,
    color: '#2563eb',
    minWidth: '48px',
    textAlign: 'right',
  };

  const qtyControlStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: '#f8fafc',
    borderRadius: '8px',
    padding: '3px 6px',
    border: '1px solid #e2e8f0',
  };

  const qtyBtnStyle: CSSProperties = {
    background: 'transparent',
    border: 'none',
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    color: '#475569',
    transition: 'background 120ms ease, color 120ms ease',
  };

  return (
    <div
      style={rowStyle}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = '#f8fafc'}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'transparent'}
    >
      <button
        style={{ ...qtyBtnStyle, color: '#ef4444' }}
        onClick={onRemove}
        title="Remove item"
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fef2f2'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
      >
        <X size={13} strokeWidth={2.5} />
      </button>

      <span style={nameStyle}>{item.name}</span>

      <div style={qtyControlStyle}>
        <button
          style={qtyBtnStyle}
          onClick={onDecrement}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#e2e8f0'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
        >
          <Minus size={12} strokeWidth={2.5} />
        </button>
        <span style={{ fontSize: '13px', fontWeight: 700, minWidth: '16px', textAlign: 'center', color: '#0f172a' }}>
          {item.quantity}
        </span>
        <button
          style={qtyBtnStyle}
          onClick={onIncrement}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#e2e8f0'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
        >
          <Plus size={12} strokeWidth={2.5} />
        </button>
      </div>

      <span style={priceStyle}>${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  );
}

function PaymentButton({ icon, label, active, onClick }: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const btnStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 8px',
    borderRadius: '10px',
    background: active ? '#eff6ff' : '#f8fafc',
    border: `1.5px solid ${active ? '#2563eb' : '#e2e8f0'}`,
    color: active ? '#2563eb' : '#64748b',
    fontSize: '11px',
    fontWeight: active ? 600 : 500,
    transition: 'all 150ms ease',
    cursor: 'pointer',
  };

  return (
    <button
      style={btnStyle}
      onClick={onClick}
      onMouseEnter={e => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9';
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#cbd5e1';
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc';
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0';
        }
      }}
    >
      {icon}
      {label}
    </button>
  );
}
