import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Globe, Menu, X } from 'lucide-react';
import { Currency, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/products';
import { formatPrice } from '../utils/format';

interface HeaderProps {
  currentCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  cartCount: number;
  cartSubtotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  cartCount,
  cartSubtotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onNavigateSection,
}) => {
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Collections', target: 'collections' },
    { label: 'The Style Edit', target: 'style-edit' },
    { label: 'Atelier Craft', target: 'atelier' },
    { label: 'Lookbook', target: 'lookbook' },
    { label: 'Client Services', target: 'services' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E3DC] transition-colors">
      {/* Top Announcement Bar */}
      <div className="bg-[#1C1917] text-[#FAF8F5] py-2 px-4 text-center text-xs tracking-widest uppercase font-medium">
        <span>COMPLIMENTARY WHITE-GLOVE EXPRESS ON ORDERS OVER $500</span>
        <span className="mx-2 text-stone-500">·</span>
        <span className="hidden sm:inline">BESPOKE ATELIER FITTINGS AVAILABLE</span>
        <span className="mx-2 hidden sm:inline text-stone-500">·</span>
        <span className="hidden md:inline">CARBON-NEUTRAL DELIVERIES</span>
      </div>

      {/* Main Top Bar (Standard 3-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-800 hover:text-black focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex flex-col items-start leading-none"
          >
            <span className="font-serif-luxury text-2xl sm:text-3xl tracking-[0.25em] font-medium text-stone-900 group-hover:text-stone-700 transition-colors uppercase">
              VELORA
            </span>
            <span className="text-[9px] tracking-[0.35em] text-stone-500 uppercase mt-0.5 font-light">
              THE STYLE EDIT
            </span>
          </a>
        </div>

        {/* Zone 2: 4-5 Clean single-line text links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.15em] font-medium text-stone-700">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => onNavigateSection(link.target)}
              className="hover:text-stone-950 transition-colors py-2 relative group whitespace-nowrap shrink-0"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-stone-900 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 Primary action / utility actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-950 py-1.5 px-2 rounded hover:bg-stone-200/50 transition-colors"
              aria-expanded={currencyDropdownOpen}
              aria-label="Select currency"
            >
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <span className="font-medium tracking-wider">{currentCurrency.code}</span>
            </button>

            {currencyDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setCurrencyDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-36 bg-[#FAF8F5] border border-stone-200 rounded shadow-xl py-1 z-50 text-xs">
                  {Object.values(CURRENCIES).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onCurrencyChange(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-stone-100 transition-colors ${
                        c.code === currentCurrency.code ? 'font-semibold text-stone-950 bg-stone-100/70' : 'text-stone-600'
                      }`}
                    >
                      <span>{c.label}</span>
                      <span>{c.symbol}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/50 rounded transition-colors"
            aria-label="Search collection"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/50 rounded transition-colors"
            aria-label="View wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-stone-900 text-white rounded-full text-[10px] font-medium flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag Trigger (Primary Action) */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-stone-800 px-3.5 py-2 rounded text-xs uppercase tracking-wider font-medium transition-colors shadow-sm"
            aria-label="Open shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-mono tabular-nums">
              {cartCount}
            </span>
            {cartSubtotal > 0 && (
              <span className="hidden md:inline text-stone-300 font-mono text-[11px] tabular-nums pl-1 border-l border-white/20">
                {formatPrice(cartSubtotal, currentCurrency)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FAF8F5] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm uppercase tracking-widest font-medium text-stone-800">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigateSection(link.target);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-black transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <span>Atelier Concierge: +1 (800) 835-6721</span>
            <span>Worldwide Delivery</span>
          </div>
        </div>
      )}
    </header>
  );
};
