import React from 'react';

export const AtelierStorySection: React.FC = () => {
  return (
    <section id="atelier" className="py-20 sm:py-28 bg-[#F4EFEA] border-b border-[#E8E3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Side */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] bg-stone-300 overflow-hidden border border-stone-300 shadow-sm relative group">
              <img
                src="/src/assets/images/product_architectural_blazer_1793032836930.jpg"
                alt="Velora Atelier Craftsmanship"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-stone-900/10" />
            </div>

            {/* Inset Credential Plate */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#FAF8F5] border border-stone-300 p-6 shadow-md max-w-xs">
              <span className="text-[10px] uppercase tracking-widest text-stone-500 font-mono block mb-1">
                Atelier Standard
              </span>
              <p className="font-serif-luxury text-base text-stone-900 font-medium">
                Over 40 hours of master hand-finishing in every tailored piece.
              </p>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold block">
              The Atelier Philosophy
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-tight">
              Tailoring as Architecture. <br />
              <span className="italic font-light text-stone-600">Pure Form Over Ornament.</span>
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">
              Founded on the belief that a woman&apos;s garment should grant her composure rather than demand performance.
              We reject transient micro-trends and synthetics, working exclusively with historical spinning mills
              in Biella, Pratrivero, and Lyon that have perfected pure natural fibers for generations.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-stone-300/80">
              <div>
                <h4 className="font-serif-luxury text-2xl text-stone-900 mb-1">0%</h4>
                <span className="text-xs uppercase tracking-wider text-stone-700 font-semibold block">
                  Synthetic Fibers
                </span>
                <p className="text-[11px] text-stone-500 font-light mt-0.5">
                  100% natural cashmere, silk, wool & certified organic fibers.
                </p>
              </div>

              <div>
                <h4 className="font-serif-luxury text-2xl text-stone-900 mb-1">100%</h4>
                <span className="text-xs uppercase tracking-wider text-stone-700 font-semibold block">
                  Traceable Mills
                </span>
                <p className="text-[11px] text-stone-500 font-light mt-0.5">
                  Direct artisan partnerships across Northern Italy and France.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-xs text-stone-500 font-mono tracking-wider">
                LANIFICIO FRATELLI · VITALE BARBERIS CANONICO · ATELIER LYONNAISE
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
