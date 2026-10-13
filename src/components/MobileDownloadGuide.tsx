import React from 'react';
import { Smartphone, Apple, Share2 } from 'lucide-react';

export const MobileDownloadGuide: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2] border-t border-[#E8E0D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A1626]/10 text-[#5A1626] text-xs font-semibold uppercase tracking-wider mb-2">
              <Smartphone className="w-3.5 h-3.5 text-[#C69238]" />
              <span>Mobile-First Downloads</span>
            </div>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#3F0E19]">
              Saving to Mobile Phones &amp; Tablets
            </h3>
            <p className="text-sm text-[#524C49] mt-1">
              Instructions for saving family photos, videos, and PDFs directly on your mobile device.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* iOS / iPhone card */}
          <div className="bg-[#FDFCF9] rounded-2xl p-6 border border-[#E8E0D3] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#2A2826] text-white flex items-center justify-center">
                <Apple className="w-5 h-5 text-[#FAF7F2]" />
              </div>
              <div>
                <h4 className="font-semibold text-base text-[#3F0E19]">iPhone &amp; iPad (Safari / Chrome)</h4>
                <p className="text-xs text-[#7A726D]">Saving photos and PDFs</p>
              </div>
            </div>

            <ol className="space-y-3 text-xs sm:text-sm text-[#524C49]">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#F4EFE6] text-[#3F0E19] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>Tap the large <strong>Download</strong> button next to any file.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#F4EFE6] text-[#3F0E19] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>When prompted by Safari, tap &ldquo;Download&rdquo; to save directly to your Files app.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#F4EFE6] text-[#3F0E19] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>If a photo opens in a new preview tab instead, tap the iOS <strong>Share button</strong> <Share2 className="w-3.5 h-3.5 inline text-[#5A1626]" /> and choose <strong>Save Image</strong> to add it to your Photos album.</span>
              </li>
            </ol>
          </div>

          {/* Android card */}
          <div className="bg-[#FDFCF9] rounded-2xl p-6 border border-[#E8E0D3] shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#3DDC84] text-white flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-[#2A2826]" />
              </div>
              <div>
                <h4 className="font-semibold text-base text-[#3F0E19]">Android (Chrome / Samsung Internet)</h4>
                <p className="text-xs text-[#7A726D]">Direct device download</p>
              </div>
            </div>

            <ol className="space-y-3 text-xs sm:text-sm text-[#524C49]">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#F4EFE6] text-[#3F0E19] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>Tap the <strong>Download</strong> button for the desired picture or document.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#F4EFE6] text-[#3F0E19] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>Android will automatically save the file to your device&apos;s <strong>Downloads</strong> directory.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#F4EFE6] text-[#3F0E19] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>You can access the saved file through your notifications panel, Google Files, or Gallery app.</span>
              </li>
            </ol>
          </div>

        </div>

      </div>
    </section>
  );
};
