import React, { useState } from 'react';
import { StyleLook, Product, Currency } from '../types';
import { formatPrice } from '../utils/format';
import { ArrowRight, Check, Eye, Plus } from 'lucide-react';

interface StyleEditSectionProps {
  looks: StyleLook[];
  products: Product[];
  currentCurrency: Currency;
  onSelectProduct: (product: Product) => void;
  onAddLookToBag: (lookProducts: Product[]) => void;
}

export const StyleEditSection: React.FC<StyleEditSectionProps> = ({
  looks,
  products,
  currentCurrency,
  onSelectProduct,
  onAddLookToBag,
}) => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [addedLookSuccess, setAddedLookSuccess] = useState(false);

  const activeLook = looks[activeLookIndex] || looks[0];

  // Retrieve products for this look
  const lookProducts = activeLook.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  const totalLookValue = lookProducts.reduce((sum, p) => sum + p.price, 0);

  const handleAddLook = () => {
    onAddLookToBag(lookProducts);
    setAddedLookSuccess(true);
    setTimeout(() => setAddedLookSuccess(false), 2400);
  };

  return (
    <section id="style-edit" className="py-16 sm:py-24 bg-[#F5F1EB] border-b border-[#E8E3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold block mb-2">
              The Style Edit · Capsule Lookbook
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
              Curated Complete Ensembles
            </h2>
          </div>

          {/* Look Selector Tabs */}
          <div className="flex items-center gap-2 border border-stone-300 bg-stone-100/80 p-1 rounded-none self-start md:self-auto">
            {looks.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => setActiveLookIndex(idx)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-all ${
                  activeLookIndex === idx
                    ? 'bg-[#1C1917] text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                Look {look.lookNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Look Presentation Card */}
        <div className="bg-[#FAF8F5] border border-stone-300/80 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-stone-200 border border-stone-200 group">
                <img
                  src={activeLook.editorialImage}
                  alt={activeLook.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#1C1917]/90 text-white px-3 py-1 text-[11px] uppercase tracking-widest font-mono">
                  LOOK {activeLook.lookNumber} / {activeLook.season}
                </div>
              </div>
            </div>

            {/* Editorial breakdown & constituent items */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
                  Curated Silhouette
                </span>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 mt-1 mb-2 font-normal">
                  {activeLook.title}
                </h3>
                <p className="text-sm text-stone-600 font-light mb-4">
                  {activeLook.subtitle}
                </p>

                <blockquote className="border-l border-stone-400 pl-4 py-1 italic font-serif-luxury text-lg text-stone-700 mb-6">
                  &ldquo;{activeLook.quote}&rdquo;
                </blockquote>

                <p className="text-xs text-stone-600 leading-relaxed font-light mb-6 bg-stone-100/70 p-3.5 border border-stone-200">
                  <strong className="font-semibold text-stone-900 uppercase tracking-wider block mb-1 text-[10px]">
                    Stylist Directive:
                  </strong>
                  {activeLook.stylistNote}
                </p>
              </div>

              {/* Items in this look */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest font-semibold text-stone-800 block">
                  Constituent Pieces ({lookProducts.length} Items)
                </span>

                <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
                  {lookProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="py-3 flex items-center justify-between gap-4 group cursor-pointer hover:bg-stone-100/50 px-2 -mx-2 transition-colors"
                      onClick={() => onSelectProduct(prod)}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.primaryImage}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-14 object-cover border border-stone-200 bg-stone-100 shrink-0"
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
                        <span className="text-xs font-mono font-medium text-stone-900 tabular-nums">
                          {formatPrice(prod.price, currentCurrency)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProduct(prod);
                          }}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded"
                          title="Quick View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bundle Purchase Module */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-stone-200">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 block">
                    Complete Ensemble Value
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-mono font-semibold text-stone-900 tabular-nums">
                      {formatPrice(totalLookValue, currentCurrency)}
                    </span>
                    <span className="text-xs text-stone-500 font-light">
                      · Includes complimentary White-Glove delivery
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddLook}
                  disabled={addedLookSuccess}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs uppercase tracking-widest font-medium transition-all ${
                    addedLookSuccess
                      ? 'bg-emerald-800 text-white'
                      : 'bg-[#1C1917] text-white hover:bg-stone-800'
                  }`}
                >
                  {addedLookSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Shop Complete Look</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
