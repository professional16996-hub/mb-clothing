import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currentCurrency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product, colorName: string, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currentCurrency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onQuickAdd,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const displayImage = isHovered && product.secondaryImage
    ? product.secondaryImage
    : product.primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'One Size';
    onQuickAdd(product, selectedColor, defaultSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div
      className="group flex flex-col bg-[#FAF8F5] border border-stone-200/80 hover:border-stone-400 hover:shadow-md transition-all duration-300 relative cursor-pointer"
      onClick={() => onQuickView(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Canvas Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2EDE4]">
        
        {/* Editorial Tag (Single quiet unboxed tag, no pill badge) */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.2em] font-medium text-stone-800 bg-white/90 backdrop-blur-xs px-2.5 py-1 shadow-xs border border-stone-200/50">
            {product.tag}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors ${
            isWishlisted
              ? 'bg-stone-900 text-rose-400'
              : 'bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={displayImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-all duration-500"
        />

        {/* Quick Action Overlay (Desktop slide-up on hover) */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`flex-1 py-2.5 px-3 text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm ${
              justAdded
                ? 'bg-emerald-900 text-white'
                : 'bg-[#1C1917] text-white hover:bg-stone-800'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2.5 bg-white/90 hover:bg-white text-stone-900 shadow-sm border border-stone-200 transition-colors"
            title="Inspect Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-3">
        <div>
          {/* Category & Origin (Clean unboxed metadata) */}
          <div className="text-[11px] uppercase tracking-widest text-stone-500 flex items-center gap-1.5 mb-1">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.composition.split('(')[0].trim()}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif-luxury text-lg sm:text-xl text-stone-900 font-medium group-hover:text-stone-700 transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 font-light line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Bottom Baseline: Color Swatches & Price */}
        <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between gap-2">
          {/* Color Swatch Dots */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColor === c.name
                    ? 'ring-1 ring-stone-900 ring-offset-1 scale-110'
                    : 'border-stone-300 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Select ${c.name} color`}
              />
            ))}
          </div>

          {/* Tabular Price */}
          <div className="text-right">
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through mr-1.5 font-mono tabular-nums">
                {formatPrice(product.originalPrice, currentCurrency)}
              </span>
            )}
            <span className="text-sm sm:text-base font-mono font-medium text-stone-900 tabular-nums">
              {formatPrice(product.price, currentCurrency)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
