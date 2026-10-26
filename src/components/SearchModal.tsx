import React, { useState, useMemo } from 'react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currentCurrency: Currency;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  currentCurrency,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const quickTerms = ['Cashmere', 'Silk', 'Blazer', 'Tote', 'Coat', 'Trousers'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.composition.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.colors.some((c) => c.name.toLowerCase().includes(q))
    );
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#FAF8F5] w-full max-w-2xl border border-stone-300 shadow-2xl z-10 p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-black rounded-full"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative mb-6">
          <Search className="w-5 h-5 text-stone-400 absolute left-3 top-3.5" />
          <input
            type="text"
            autoFocus
            placeholder="Search creations by silhouette, fiber, or color..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border border-stone-300 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-stone-900"
          />
        </div>

        {/* Quick Suggestion Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-[11px] uppercase tracking-wider text-stone-500">Popular:</span>
          {quickTerms.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="text-xs bg-stone-200/70 hover:bg-stone-300/80 text-stone-800 px-2.5 py-1 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="space-y-4">
            <span className="text-xs text-stone-500 block">
              Found {results.length} {results.length === 1 ? 'match' : 'matches'} for &ldquo;{query}&rdquo;
            </span>

            {results.length > 0 ? (
              <div className="divide-y divide-stone-200 max-h-96 overflow-y-auto pr-1">
                {results.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-100/60 px-2 -mx-2 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.primaryImage}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-14 object-cover border border-stone-200"
                      />
                      <div>
                        <h4 className="text-xs font-medium text-stone-900 group-hover:underline">
                          {prod.name}
                        </h4>
                        <span className="text-[11px] text-stone-500 font-light">
                          {prod.composition.split(';')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-xs font-medium text-stone-900 tabular-nums">
                        {formatPrice(prod.price, currentCurrency)}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-500 py-6 text-center italic">
                No atelier pieces found matching &ldquo;{query}&rdquo;.
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
