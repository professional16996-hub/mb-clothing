/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, Currency, OrderData } from './types';
import { PRODUCTS, STYLE_LOOKS, CURRENCIES } from './data/products';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StyleEditSection } from './components/StyleEditSection';
import { ProductGridSection } from './components/ProductGridSection';
import { AtelierStorySection } from './components/AtelierStorySection';
import { PressSection } from './components/PressSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Check, ShoppingBag } from 'lucide-react';
import { formatPrice } from './utils/format';

export default function App() {
  // Currency State
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(CURRENCIES.USD);

  // Cart State (initialized with 1 flagship piece for immediate polish)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('velora_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    // Default starter piece
    return [
      {
        id: 'velora-01-Camel Sand-M',
        product: PRODUCTS[0],
        selectedColor: 'Camel Sand',
        selectedSize: 'M',
        quantity: 1,
      },
    ];
  });

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('velora_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return ['velora-02', 'velora-04'];
  });

  // UI Modals & Drawers
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // Promo code
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist Cart & Wishlist
  useEffect(() => {
    try {
      localStorage.setItem('velora_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('velora_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add Item to Cart
  const handleAddToCart = (
    product: Product,
    selectedColor: string,
    selectedSize: string,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${selectedColor}-${selectedSize}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, selectedColor, selectedSize, quantity }];
    });
    showToast(`Added ${product.name} (${selectedColor}, ${selectedSize}) to your bag`);
  };

  // Quick Add handler
  const handleQuickAdd = (product: Product, colorName: string, size: string) => {
    handleAddToCart(product, colorName, size, 1);
  };

  // Add Complete Curated Look to Cart
  const handleAddLookToBag = (lookProducts: Product[]) => {
    lookProducts.forEach((p) => {
      const defaultColor = p.colors[0]?.name || '';
      const defaultSize = p.sizes[0] || 'One Size';
      handleAddToCart(p, defaultColor, defaultSize, 1);
    });
    showToast(`Added Complete Look (${lookProducts.length} pieces) to your bag`);
    setCartOpen(true);
  };

  // Cart Quantities & Deletion
  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Wishlist Toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed ${product.name} from saved pieces`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist`);
        return [...prev, product.id];
      }
    });
  };

  // Apply Discount Code
  const handleApplyDiscount = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VELORA10') {
      setDiscountCode('VELORA10');
      setDiscountPercent(10);
      return true;
    }
    if (clean === 'ATELIER15') {
      setDiscountCode('ATELIER15');
      setDiscountPercent(15);
      return true;
    }
    return false;
  };

  // Order Complete
  const handleOrderComplete = (_order: OrderData) => {
    setCart([]);
    showToast(`Order confirmed! Thank you for choosing Velora.`);
  };

  // Scroll Navigation
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white px-5 py-3 shadow-2xl flex items-center gap-3 text-xs tracking-wider animate-in fade-in slide-in-from-bottom-2 duration-200 border border-stone-700">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setCartOpen(true)}
            className="ml-3 underline text-stone-300 hover:text-white flex items-center gap-1 font-semibold"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>View Bag</span>
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Campaign Hero Section */}
        <HeroSection
          onExploreClick={() => scrollToSection('collections')}
          onLookbookClick={() => scrollToSection('style-edit')}
        />

        {/* The Style Edit Lookbook & Capsule Ensemble Builder */}
        <StyleEditSection
          looks={STYLE_LOOKS}
          products={PRODUCTS}
          currentCurrency={currentCurrency}
          onSelectProduct={(p) => setDetailProduct(p)}
          onAddLookToBag={handleAddLookToBag}
        />

        {/* Product Catalog & Segmented Categories */}
        <ProductGridSection
          products={PRODUCTS}
          currentCurrency={currentCurrency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setDetailProduct(p)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Atelier Craftsmanship & Sourcing Story */}
        <AtelierStorySection />

        {/* Critical Reception & Press Quotes */}
        <PressSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal / PDP */}
      <ProductDetailModal
        product={detailProduct}
        currentCurrency={currentCurrency}
        isOpen={Boolean(detailProduct)}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={detailProduct ? wishlistIds.includes(detailProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        currentCurrency={currentCurrency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        discountCode={discountCode}
        discountPercent={discountPercent}
        onApplyDiscount={handleApplyDiscount}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        currentCurrency={currentCurrency}
        onRemoveFromWishlist={handleToggleWishlist}
        onQuickView={(p) => setDetailProduct(p)}
        onMoveToCart={(p) => {
          const color = p.colors[0]?.name || '';
          const size = p.sizes[0] || 'One Size';
          handleAddToCart(p, color, size, 1);
          setWishlistIds((prev) => prev.filter((id) => id !== p.id));
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={PRODUCTS}
        currentCurrency={currentCurrency}
        onSelectProduct={(p) => setDetailProduct(p)}
      />

      {/* Multi-step Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        currentCurrency={currentCurrency}
        discountPercent={discountPercent}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}
