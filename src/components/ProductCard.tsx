import { Plus } from 'lucide-react';
import type { Product } from '../types';
import type { CSSProperties } from 'react';

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
  quantity: number;
}

const placeholderColors: Record<string, string> = {
  Coffee: '#c8a882',
  Tea: '#8fb87a',
  Pastries: '#e8c87a',
  Food: '#a8c8e8',
};

export function ProductCard({ product, onAdd, quantity }: Props) {
  const bgColor = placeholderColors[product.category] ?? '#d1d5db';

  const cardStyle: CSSProperties = {
    background: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
    transition: 'transform 200ms ease, box-shadow 200ms ease',
    cursor: 'default',
    display: 'flex',
    flexDirection: 'column',
  };

  const imageContainerStyle: CSSProperties = {
    position: 'relative',
    aspectRatio: '4/3',
    overflow: 'hidden',
    background: bgColor,
  };

  const placeholderStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: '0.3px',
  };

  const imgStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    inset: 0,
    transition: 'transform 300ms ease',
  };

  const badgeStyle: CSSProperties = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    background: '#2563eb',
    color: '#fff',
    borderRadius: '999px',
    width: '22px',
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 700,
    boxShadow: '0 2px 4px rgba(37,99,235,0.4)',
    transition: 'transform 200ms ease, opacity 200ms ease',
    opacity: quantity > 0 ? 1 : 0,
    transform: quantity > 0 ? 'scale(1)' : 'scale(0.5)',
    pointerEvents: 'none',
  };

  const bodyStyle: CSSProperties = {
    padding: '10px 12px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  };

  const nameStyle: CSSProperties = {
    fontSize: '13px',
    fontWeight: 600,
    color: '#1e293b',
    lineHeight: 1.3,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const footerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const priceStyle: CSSProperties = {
    fontSize: '14px',
    fontWeight: 700,
    color: '#2563eb',
  };

  const addBtnStyle: CSSProperties = {
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'background 150ms ease, transform 100ms ease',
    letterSpacing: '0.2px',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)';
      }}
    >
      <div style={imageContainerStyle}>
        {product.image ? (
          <img src={product.image} alt={product.name} style={imgStyle} />
        ) : (
          <div style={placeholderStyle}>{product.name}</div>
        )}
        <div style={badgeStyle}>{quantity}</div>
      </div>

      <div style={bodyStyle}>
        <div style={nameStyle}>{product.name}</div>
        <div style={footerStyle}>
          <span style={priceStyle}>${product.price.toFixed(2)}</span>
          <button
            style={addBtnStyle}
            onClick={() => onAdd(product)}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#1d4ed8';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#2563eb';
            }}
            onMouseDown={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.95)';
            }}
            onMouseUp={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            <Plus size={13} strokeWidth={2.5} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
