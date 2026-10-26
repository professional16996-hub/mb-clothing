import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Compass, Scissors } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onLookbookClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onLookbookClick,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-[#E8E3DC] bg-[#FAF8F5]">
      {/* Main Campaign Split View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Editorial Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold">
                Autumn / Winter 2026 Atelier
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
                Sculpted Silhouettes. <br />
                <span className="italic font-light text-stone-600">Quiet Authority.</span>
              </h1>
            </div>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light max-w-xl">
              An intentional study in tactile double-faced Mongolian cashmere,
              heavyweight Lyon silk, and Italian fresco wool tailoring. Each silhouette is
              hand-finished with obsessive discipline for enduring presence.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-all group rounded-none"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={onLookbookClick}
                className="inline-flex items-center justify-center px-6 py-4 border border-stone-300 text-stone-900 text-xs uppercase tracking-[0.2em] font-medium hover:border-stone-900 transition-colors"
              >
                View The Style Edit
              </button>
            </div>

            {/* Editorial Metadata */}
            <div className="pt-6 border-t border-stone-200/80 flex items-center gap-6 text-xs text-stone-500 font-light">
              <div>
                <span className="block font-medium text-stone-900">Drop 04</span>
                <span>Limited Atelier Run</span>
              </div>
              <span className="h-6 w-[1px] bg-stone-300" />
              <div>
                <span className="block font-medium text-stone-900">Biella & Lyon</span>
                <span>Historic Heritage Mills</span>
              </div>
              <span className="h-6 w-[1px] bg-stone-300" />
              <div>
                <span className="block font-medium text-stone-900">Made to Endure</span>
                <span>Lifetime Atelier Repairs</span>
              </div>
            </div>
          </div>

          {/* Campaign Visual Column */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden bg-stone-200 shadow-sm border border-stone-200/60 group">
              <img
                src="/images/hero_velora_editorial.jpg"
                alt="Velora Autumn/Winter Campaign - Sculptural Wool Coat and Tailored Silhouettes"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              
              {/* Subtle Editorial Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-black/60 backdrop-blur-md px-4 py-3 text-white flex items-center justify-between text-xs tracking-wider">
                <span className="font-serif-luxury text-sm italic font-light">Look 01: The Monolith Coat in Charcoal Noir</span>
                <span className="uppercase text-[10px] tracking-widest text-stone-300 font-mono">Curated Edit</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4-Pillar Trust / Craft Strip */}
      <div className="border-t border-[#E8E3DC] bg-[#F4EFEA]/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Scissors className="w-4 h-4 text-stone-700 shrink-0" />
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-900">Hand-Stitched Seams</h4>
                <p className="text-[11px] text-stone-500 font-light mt-0.5">Biella double-face finish</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0" />
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-900">Zero Overproduction</h4>
                <p className="text-[11px] text-stone-500 font-light mt-0.5">Strict limited batch ateliers</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Compass className="w-4 h-4 text-stone-700 shrink-0" />
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-900">Complimentary Courier</h4>
                <p className="text-[11px] text-stone-500 font-light mt-0.5">Express dispatch & easy returns</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Sparkles className="w-4 h-4 text-stone-700 shrink-0" />
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-900">Bespoke Fit Service</h4>
                <p className="text-[11px] text-stone-500 font-light mt-0.5">Complimentary atelier tailoring</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
