import React from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { X, Trash2, ShoppingBag, Eye } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currentCurrency: Currency;
  onRemoveFromWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currentCurrency,
  onRemoveFromWishlist,
  onQuickView,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-stone-300 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h3 className="font-serif-luxury text-2xl font-normal text-stone-900">
                Your Saved Pieces
              </h3>
              <span className="text-xs text-stone-500 font-light">
                {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} in your wishlist
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-600 hover:text-black rounded-full hover:bg-stone-200/50"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-stone-200">
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <p className="font-serif-luxury text-xl text-stone-600">Your wishlist is empty</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the heart icon on any creation to save it for your upcoming season edit.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800"
                >
                  Explore Creations
                </button>
              </div>
            ) : (
              wishlistProducts.map((prod) => (
                <div key={prod.id} className="pt-4 first:pt-0 flex gap-4 group">
                  <img
                    src={prod.primaryImage}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover border border-stone-200 bg-stone-100 shrink-0 cursor-pointer"
                    onClick={() => {
                      onQuickView(prod);
                      onClose();
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => {
                            onQuickView(prod);
                            onClose();
                          }}
                          className="text-sm font-medium text-stone-900 leading-snug cursor-pointer hover:underline"
                        >
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(prod)}
                          className="text-stone-400 hover:text-stone-900 p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs text-stone-500 mt-1">
                        {prod.categoryLabel}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <span className="font-mono text-sm font-medium text-stone-900 tabular-nums">
                        {formatPrice(prod.price, currentCurrency)}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            onQuickView(prod);
                            onClose();
                          }}
                          className="p-1.5 border border-stone-300 text-stone-700 hover:border-black"
                          title="Quick View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            onMoveToCart(prod);
                          }}
                          className="px-3 py-1.5 bg-[#1C1917] text-white text-[11px] uppercase tracking-wider font-medium hover:bg-stone-800 flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-[#F5F1EB]">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => onMoveToCart(p));
                }}
                className="w-full py-3.5 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors"
              >
                Move All to Bag
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
