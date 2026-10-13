import React from 'react';
import { Heart, ArrowUp, ShieldCheck } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E8E0D3] text-[#524C49]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#E8E0D3]">
          
          {/* Brand */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5A1626] to-[#3F0E19] flex items-center justify-center border border-[#C69238]/40 shadow-sm shrink-0">
              <Heart className="w-6 h-6 text-[#E8BD6D] fill-[#C69238]/30" />
            </div>
            <div>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#3F0E19]">
                Sacred Heart Convent School
              </h3>
              <p className="text-xs sm:text-sm text-[#7A726D] font-cormorant italic text-base mt-0.5">
                Teacher's Day & Silver Jubilee Celebration Archive • September 4, 2021
              </p>
            </div>
          </div>

          {/* Quick links & Back to Top */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium">
            <a href="#hero" className="hover:text-[#5A1626] transition-colors">Hero</a>
            <a href="#chronicles" className="hover:text-[#5A1626] transition-colors">Chronicles</a>
            <a href="#highlights" className="hover:text-[#5A1626] transition-colors">Highlights</a>
            <a href="#photos" className="hover:text-[#5A1626] transition-colors">Photo Gallery</a>
            <a href="#archive" className="hover:text-[#5A1626] transition-colors">Archive Search</a>
            <a href="#upload" className="hover:text-[#5A1626] transition-colors">Add Files</a>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE2D5] text-[#3F0E19] text-xs font-semibold border border-[#D8CEBE] transition-colors"
              title="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#7A726D]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#A17120] shrink-0" />
            <span>Frontend-Only Architecture • Private Client-Side Session • No Remote Cloud Tracking</span>
          </div>

          <div>
            &copy; {CURRENT_YEAR} Sacred Heart Family Memory Archive. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
