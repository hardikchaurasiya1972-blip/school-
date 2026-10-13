import React, { useState } from 'react';
import { ChevronRight, Lock, HardDrive, PackageCheck, AlertCircle } from 'lucide-react';

export const PrivacyBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside aria-label="Privacy and storage advisory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="bg-[#FAF7F2] border border-[#E8E0D3] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#5A1626]/10 text-[#5A1626] shrink-0 mt-0.5 sm:mt-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm text-[#3F0E19]">
                  Frontend-Only Digital Archive Architecture
                </span>
                <span className="px-2 py-0.5 text-[11px] font-medium bg-[#C69238]/15 text-[#A17120] rounded-full border border-[#C69238]/30">
                  Client-Side Session
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#524C49] mt-0.5">
                Files you select stay strictly on this device inside your browser. No files are uploaded to any external server, cloud database, or third party.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
            <a
              href="#packaging-guide"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A1626] hover:text-[#7E2437] underline underline-offset-2 transition-colors"
            >
              <PackageCheck className="w-3.5 h-3.5 text-[#C69238]" />
              <span>How to package permanent files</span>
            </a>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-[#7A726D] hover:text-[#3F0E19] flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-[#F4EFE6] transition-colors"
            >
              <span>{expanded ? 'Hide details' : 'More details'}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-[#E8E0D3] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#524C49] animate-in fade-in-50 duration-200">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FDFCF9] border border-[#E8E0D3]/60">
              <HardDrive className="w-4 h-4 text-[#C69238] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#3F0E19] font-medium mb-1">Local Browser Memory</strong>
                <span>Files chosen using &ldquo;Add Files&rdquo; reside in temporary browser memory. Refreshing or closing the tab clears the session without leaving residue.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FDFCF9] border border-[#E8E0D3]/60">
              <AlertCircle className="w-4 h-4 text-[#5A1626] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#3F0E19] font-medium mb-1">No Remote Sharing</strong>
                <span>Selecting a file does not publish or transmit it to other visitors on the internet because this website operates without a server or database.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FDFCF9] border border-[#E8E0D3]/60">
              <PackageCheck className="w-4 h-4 text-[#A17120] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#3F0E19] font-medium mb-1">Permanent Family Vault</strong>
                <span>To provide permanent downloadable family albums to everyone, place files into the project&apos;s static assets folder as explained below.</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </aside>
  );
};
