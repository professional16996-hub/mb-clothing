import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Statement Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-normal tracking-wide text-white">
              VELORA
            </h3>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
              The Style Edit · Atelier Archive
            </p>
            <p className="text-xs text-stone-400 leading-relaxed font-light max-w-sm">
              Curated silhouettes for the discerning contemporary wardrobe.
              Crafted in limited seasonal ateliers across Biella and Lyon.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold block">
              Private Client Gazette
            </span>
            <p className="text-sm text-stone-300 font-light max-w-lg">
              Receive private invitations to confidential atelier drops, seasonal lookbooks, and bespoke fitting salon dates.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs py-3">
                <Check className="w-4 h-4" />
                <span>You have been entered into the Private Client Directory.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-stone-900 border border-stone-700 px-4 py-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FAF8F5] text-stone-900 text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors flex items-center gap-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-stone-800 text-xs">
          <div>
            <h4 className="uppercase tracking-widest font-semibold text-stone-300 mb-4 text-[11px]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-stone-400 font-light">
              <li><a href="#collections" className="hover:text-white transition-colors">Autumn/Winter 2026</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Double-Faced Cashmere</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Bias Mulberry Silk</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Architectural Tailoring</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Fine French Leather</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest font-semibold text-stone-300 mb-4 text-[11px]">
              The Style Edit
            </h4>
            <ul className="space-y-2.5 text-stone-400 font-light">
              <li><a href="#style-edit" className="hover:text-white transition-colors">Look 01: Monolith Tailoring</a></li>
              <li><a href="#style-edit" className="hover:text-white transition-colors">Look 02: Midnight Silk Reverie</a></li>
              <li><a href="#style-edit" className="hover:text-white transition-colors">Look 03: Cashmere Sanctuary</a></li>
              <li><a href="#style-edit" className="hover:text-white transition-colors">Capsule Wardrobe Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest font-semibold text-stone-300 mb-4 text-[11px]">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-stone-400 font-light">
              <li><span className="cursor-default">Bespoke Fit Consultation</span></li>
              <li><span className="cursor-default">White-Glove Shipping & Delivery</span></li>
              <li><span className="cursor-default">Complimentary 30-Day Returns</span></li>
              <li><span className="cursor-default">Lifetime Atelier Garment Care</span></li>
              <li><span className="cursor-default">Concierge: concierge@velora.luxury</span></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest font-semibold text-stone-300 mb-4 text-[11px]">
              Atelier & Ethics
            </h4>
            <ul className="space-y-2.5 text-stone-400 font-light">
              <li><a href="#atelier" className="hover:text-white transition-colors">Biella & Lyon Provenance</a></li>
              <li><span className="cursor-default">Zero Overproduction Mandate</span></li>
              <li><span className="cursor-default">Certified Traceable Wool</span></li>
              <li><span className="cursor-default">Modern Slavery & Living Wages</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright & Currency info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-light gap-4">
          <div>
            &copy; {new Date().getFullYear()} VELORA ATELIER S.p.A. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Cookie Preferences</span>
            <span>Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
