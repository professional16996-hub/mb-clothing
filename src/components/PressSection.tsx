import React from 'react';
import { PRESS_QUOTES } from '../data/products';

export const PressSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-semibold block">
            Critical Reception & Press
          </span>
          <h2 className="font-serif-luxury text-3xl font-normal text-stone-900 mt-2">
            The Industry Perspective
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRESS_QUOTES.map((pq, idx) => (
            <div
              key={idx}
              className="bg-[#F6F2EC] p-8 border border-stone-200/80 flex flex-col justify-between space-y-6"
            >
              <blockquote className="font-serif-luxury text-lg text-stone-800 leading-relaxed italic">
                &ldquo;{pq.quote}&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-stone-300/80">
                <span className="font-mono text-xs uppercase tracking-widest font-semibold text-stone-900 block">
                  {pq.publication}
                </span>
                <span className="text-[11px] text-stone-500 font-light">
                  {pq.issue}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
