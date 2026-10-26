import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { formatPrice, SIZE_CHART } from '../utils/format';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Ruler, Truck, RotateCcw, Star } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  currentCurrency: Currency;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, colorName: string, size: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currentCurrency,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'S');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [sizeUnit, setSizeUnit] = useState<'cm' | 'in'>('cm');
  const [activeTab, setActiveTab] = useState<'details' | 'craft' | 'reviews'>('details');
  const [justAdded, setJustAdded] = useState(false);

  const images = [
    product.primaryImage,
    ...(product.secondaryImage && product.secondaryImage !== product.primaryImage ? [product.secondaryImage] : [])
  ];
  const [activeImage, setActiveImage] = useState(images[0]);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF8F5] w-full max-w-5xl max-h-[92vh] overflow-y-auto border border-stone-300 shadow-2xl z-10 flex flex-col my-auto">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-600 hover:text-black bg-white/80 hover:bg-white rounded-full transition-colors border border-stone-200"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-full">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 bg-[#F2EDE4] p-4 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 border border-stone-200/80 mb-4">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {product.tag && (
                <div className="absolute top-3 left-3 bg-[#1C1917] text-white text-[10px] uppercase tracking-widest px-2.5 py-1 font-mono">
                  {product.tag}
                </div>
              )}
            </div>

            {/* Thumbnail switcher if multiple images exist */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-20 border-2 overflow-hidden transition-all ${
                      activeImage === img ? 'border-stone-900 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${i + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="uppercase tracking-[0.2em] font-medium text-stone-700">
                  {product.categoryLabel}
                </span>

                <div className="flex items-center gap-1 text-stone-800">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="font-mono text-xs tabular-nums">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-stone-900 leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs text-stone-500 font-light mt-1">
                  {product.subtitle}
                </p>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-mono font-semibold text-stone-900 tabular-nums">
                    {formatPrice(product.price, currentCurrency)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono text-stone-400 line-through tabular-nums">
                      {formatPrice(product.originalPrice, currentCurrency)}
                    </span>
                  )}
                  <span className="text-[11px] text-emerald-800 uppercase tracking-wider font-medium">
                    Complimentary Express Delivery
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="uppercase tracking-wider font-semibold text-stone-800">
                    Selected Colorway:
                  </span>
                  <span className="text-stone-600 font-medium">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`h-8 px-3 rounded-none border text-xs flex items-center gap-2 transition-all ${
                        selectedColor === c.name
                          ? 'border-stone-900 bg-stone-100 font-medium text-stone-900'
                          : 'border-stone-300 text-stone-600 hover:border-stone-500'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-stone-300"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection & Size Guide */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="uppercase tracking-wider font-semibold text-stone-800">
                    Select Size:
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="flex items-center gap-1 text-stone-600 hover:text-stone-950 underline"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Atelier Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[48px] h-10 px-3 border text-xs uppercase tracking-wider font-medium transition-all ${
                        selectedSize === sz
                          ? 'bg-[#1C1917] text-white border-stone-900'
                          : 'border-stone-300 text-stone-800 hover:border-stone-900 bg-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Collapsible Size Guide Drawer */}
              {showSizeGuide && (
                <div className="p-4 bg-stone-100 border border-stone-200 text-xs">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold uppercase tracking-wider text-stone-900">
                      Measurement Matrix
                    </span>
                    <div className="flex items-center gap-1 bg-stone-200 p-0.5 rounded text-[10px]">
                      <button
                        onClick={() => setSizeUnit('cm')}
                        className={`px-2 py-0.5 rounded ${sizeUnit === 'cm' ? 'bg-white font-bold' : ''}`}
                      >
                        CM
                      </button>
                      <button
                        onClick={() => setSizeUnit('in')}
                        className={`px-2 py-0.5 rounded ${sizeUnit === 'in' ? 'bg-white font-bold' : ''}`}
                      >
                        IN
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-[11px] tabular-nums font-mono">
                      <thead>
                        <tr className="border-b border-stone-300 text-stone-500 font-sans uppercase">
                          <th className="py-1">Size</th>
                          <th className="py-1">Bust</th>
                          <th className="py-1">Waist</th>
                          <th className="py-1">Hip</th>
                          <th className="py-1">IT/FR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {SIZE_CHART.map((sc) => (
                          <tr key={sc.size} className={sc.size === selectedSize ? 'bg-stone-200/50 font-bold' : ''}>
                            <td className="py-1.5">{sc.size}</td>
                            <td className="py-1.5">{sizeUnit === 'cm' ? sc.bustCm : sc.bustIn}</td>
                            <td className="py-1.5">{sizeUnit === 'cm' ? sc.waistCm : sc.waistIn}</td>
                            <td className="py-1.5">{sizeUnit === 'cm' ? sc.hipCm : sc.hipIn}</td>
                            <td className="py-1.5">{sc.it}/{sc.fr}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag Module */}
              <div className="pt-2 flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-stone-300 bg-white h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 text-stone-600 hover:text-black hover:bg-stone-100 h-full"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-medium tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 text-stone-600 hover:text-black hover:bg-stone-100 h-full"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  disabled={justAdded}
                  className={`flex-1 h-12 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all shadow-sm ${
                    justAdded
                      ? 'bg-emerald-900 text-white'
                      : 'bg-[#1C1917] text-white hover:bg-stone-800'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · {formatPrice(product.price * quantity, currentCurrency)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`h-12 w-12 border flex items-center justify-center transition-colors ${
                    isWishlisted
                      ? 'bg-stone-900 border-stone-900 text-rose-400'
                      : 'border-stone-300 hover:border-stone-900 text-stone-700 bg-white'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

            </div>

            {/* Bottom Accordion / Tabs: Details, Mill Craft, Reviews */}
            <div className="pt-4 border-t border-stone-200">
              <div className="flex border-b border-stone-200 text-xs uppercase tracking-wider font-medium text-stone-600">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 mr-4 border-b-2 transition-colors ${
                    activeTab === 'details' ? 'border-stone-900 text-stone-950 font-bold' : 'border-transparent hover:text-stone-900'
                  }`}
                >
                  Details & Composition
                </button>
                <button
                  onClick={() => setActiveTab('craft')}
                  className={`pb-2 mr-4 border-b-2 transition-colors ${
                    activeTab === 'craft' ? 'border-stone-900 text-stone-950 font-bold' : 'border-transparent hover:text-stone-900'
                  }`}
                >
                  Mill Provenance
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'reviews' ? 'border-stone-900 text-stone-950 font-bold' : 'border-transparent hover:text-stone-900'
                  }`}
                >
                  Reviews ({product.reviews.length})
                </button>
              </div>

              <div className="pt-3 text-xs text-stone-600 leading-relaxed font-light">
                {activeTab === 'details' && (
                  <div className="space-y-2">
                    <p><strong className="font-semibold text-stone-800">Composition:</strong> {product.composition}</p>
                    <ul className="list-disc list-inside space-y-1 text-stone-500">
                      {product.details.map((d, idx) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'craft' && (
                  <div className="space-y-2">
                    <p><strong className="font-semibold text-stone-800">Atelier Origin:</strong> {product.millOrigin}</p>
                    <p>Sourced under ethical slow-fashion mandates. Our fiber producers adhere to strict environmental standards, zero plastic microfibers, and living-wage artisan contracts.</p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    {product.reviews.length > 0 ? (
                      product.reviews.map((rev) => (
                        <div key={rev.id} className="border-b border-stone-200/60 pb-2.5">
                          <div className="flex justify-between items-center text-[11px] text-stone-500 mb-1">
                            <span className="font-semibold text-stone-800">{rev.author} ({rev.location})</span>
                            <span>{rev.fit}</span>
                          </div>
                          <p className="italic text-stone-700">&ldquo;{rev.comment}&rdquo;</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-stone-400 italic">No reviews yet for this limited release.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Guarantees strip */}
              <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500 font-light">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" /> Worldwide Express
                </span>
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" /> 30-Day Returns
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Lifetime Repairs
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
