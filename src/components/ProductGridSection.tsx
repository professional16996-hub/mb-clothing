import React, { useState, useMemo } from 'react';
import { Product, Currency } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';

interface ProductGridSectionProps {
  products: Product[];
  currentCurrency: Currency;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product, colorName: string, size: string) => void;
}

export const ProductGridSection: React.FC<ProductGridSectionProps> = ({
  products,
  currentCurrency,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'outerwear', label: 'Outerwear' },
    { id: 'evening', label: 'Silk & Evening' },
    { id: 'blazers', label: 'Blazers' },
    { id: 'knitwear', label: 'Knitwear' },
    { id: 'accessories', label: 'Leather & Objects' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        if (p.price > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, maxPrice, sortBy]);

  return (
    <section id="collections" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold">
            Seasonal Collection
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
            The Atelier Archive
          </h2>
          <p className="text-sm text-stone-600 font-light">
            Timeless architectural silhouettes cut from the world&apos;s most noble raw fibers.
          </p>
        </div>

        {/* Category Filter Bar (Interactive Segmented Control Buttons) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
          
          {/* Segmented Category Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs uppercase tracking-widest font-medium whitespace-nowrap transition-colors rounded-none ${
                  selectedCategory === cat.id
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Controls: Filter toggle & Sort */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            {/* Filter Toggle */}
            <button
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-700 hover:text-stone-950 py-1.5 px-3 border border-stone-300 hover:border-stone-900 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {maxPrice < 2500 ? '(Active)' : ''}</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs uppercase tracking-wider font-medium text-stone-800 border-none focus:outline-none cursor-pointer py-1"
              >
                <option value="featured">Editorial Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Expandable Filter Tray */}
        {filterDrawerOpen && (
          <div className="mb-8 p-6 bg-[#F4EFEA] border border-stone-300/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 flex-1 max-w-sm">
              <div className="flex justify-between text-xs text-stone-800">
                <span className="font-semibold uppercase tracking-wider">Maximum Price:</span>
                <span className="font-mono font-medium">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="500"
                max="2500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-stone-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>$500</span>
                <span>$2,500</span>
              </div>
            </div>

            <div className="flex items-center gap-4 self-end sm:self-auto">
              <button
                onClick={() => {
                  setMaxPrice(2500);
                  setSelectedCategory('all');
                }}
                className="text-xs text-stone-600 hover:text-stone-950 underline"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="p-1.5 text-stone-700 hover:text-black"
                title="Close tray"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Product Count Indicator */}
        <div className="mb-6 flex items-center justify-between text-xs text-stone-500">
          <span>
            Displaying {filteredProducts.length} of {products.length} creations
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-stone-800 underline hover:text-black"
            >
              Clear category filter
            </button>
          )}
        </div>

        {/* 3-Column Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentCurrency={currentCurrency}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-stone-300 p-8">
            <h3 className="font-serif-luxury text-2xl text-stone-800 mb-2">No creations matched your criteria</h3>
            <p className="text-xs text-stone-500 mb-4">Try adjusting your price range or category filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setMaxPrice(2500);
              }}
              className="px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
