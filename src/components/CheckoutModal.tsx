import { CircleCheck as CheckCircle, X } from 'lucide-react';
import type { CartItem, PaymentMethod } from '../types';
import { TAX_RATE } from '../data';
import type { CSSProperties } from 'react';

interface Props {
  cart: CartItem[];
  paymentMethod: PaymentMethod;
  onClose: () => void;
}

export function CheckoutModal({ cart, paymentMethod, onClose }: Props) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(15,23,42,0.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px',
    animation: 'fadeIn 200ms ease',
  };

  const modalStyle: CSSProperties = {
    background: '#fff',
    borderRadius: '16px',
    padding: '32px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    animation: 'slideUp 250ms ease',
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(16px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
      <div style={overlayStyle} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <div style={modalStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={22} color="#22c55e" />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Order Confirmed!</span>
              </div>
              <span style={{ fontSize: '13px', color: '#64748b', paddingLeft: '30px' }}>Payment via {paymentMethod}</span>
            </div>
            <button
              onClick={onClose}
              style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '6px', display: 'flex', cursor: 'pointer', color: '#64748b', transition: 'background 150ms' }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#e2e8f0'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9'}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#334155' }}>{item.name} <span style={{ color: '#94a3b8' }}>×{item.quantity}</span></span>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: '#64748b' }}>Subtotal</span>
              <span style={{ color: '#334155' }}>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: '#64748b' }}>Tax (10%)</span>
              <span style={{ color: '#334155' }}>${tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1.5px solid #e2e8f0' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Total Paid</span>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#2563eb' }}>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', padding: '13px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'background 150ms ease' }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#1d4ed8'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#2563eb'}
          >
            New Order
          </button>
        </div>
      </div>
    </>
  );
}
