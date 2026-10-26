import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { X, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currentCurrency: Currency;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  discountCode: string;
  discountPercent: number;
  onApplyDiscount: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currentCurrency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountCode,
  discountPercent,
  onApplyDiscount,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const freeShippingThreshold = 500;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const success = onApplyDiscount(promoInput);
    if (!success) {
      setPromoError('Invalid code. Try VELORA10 or ATELIER15');
    } else {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-stone-300 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-2xl font-normal text-stone-900">
                  Your Atelier Bag
                </h3>
                <span className="text-xs text-stone-500 font-light">
                  {items.length} {items.length === 1 ? 'creation' : 'creations'} selected
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-stone-600 hover:text-black rounded-full hover:bg-stone-200/50 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="mt-4 p-3 bg-[#F4EFEA] border border-stone-200 text-xs text-stone-700">
              {remainingForFreeShipping > 0 ? (
                <p>
                  Add <span className="font-mono font-semibold">{formatPrice(remainingForFreeShipping, currentCurrency)}</span> for complimentary White-Glove delivery
                </p>
              ) : (
                <p className="text-emerald-900 font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-800" />
                  Unlocked: Complimentary White-Glove Global Express
                </p>
              )}
              <div className="w-full bg-stone-300 h-1.5 mt-2 rounded-full overflow-hidden">
                <div
                  className="bg-stone-900 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Itemized List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-stone-200">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <p className="font-serif-luxury text-xl text-stone-600">Your bag is currently empty</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our seasonal drop to curate your signature silhouette.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4 group">
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover border border-stone-200 bg-stone-100 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-stone-900 leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-stone-900 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <div className="text-xs text-stone-500 mt-1 space-x-2">
                        <span>Color: {item.selectedColor}</span>
                        <span>·</span>
                        <span>Size: {item.selectedSize}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-stone-300 bg-white h-7">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 text-stone-600 hover:text-black h-full"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 text-stone-600 hover:text-black h-full"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono text-sm font-medium text-stone-900 tabular-nums">
                        {formatPrice(item.product.price * item.quantity, currentCurrency)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-[#F5F1EB] space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. VELORA10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-stone-300 px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:border-stone-900"
                    />
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 text-white text-xs uppercase tracking-wider font-medium hover:bg-stone-800"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-rose-700">{promoError}</p>
                )}
                {discountPercent > 0 && (
                  <p className="text-[11px] text-emerald-800 font-medium">
                    Promotion &apos;{discountCode}&apos; applied (-{discountPercent}%)
                  </p>
                )}
              </form>

              {/* Subtotal & Totals */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200/80 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">{formatPrice(subtotal, currentCurrency)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Atelier VIP Savings</span>
                    <span className="font-mono tabular-nums">-{formatPrice(discountAmount, currentCurrency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-stone-900 font-medium font-mono">
                    {remainingForFreeShipping === 0 ? 'Complimentary' : formatPrice(25, currentCurrency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-200">
                  <span className="uppercase tracking-wider">Estimated Total</span>
                  <span className="font-mono tabular-nums text-base">
                    {formatPrice(finalTotal, currentCurrency)}
                  </span>
                </div>
              </div>

              {/* Proceed CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 bg-[#1C1917] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-stone-500 text-center tracking-wider font-light">
                Secure 256-bit SSL encrypted checkout · Carbon-neutral logistics
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
