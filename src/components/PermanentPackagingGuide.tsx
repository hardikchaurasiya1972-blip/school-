import React, { useState } from 'react';
import { Package, HardDrive, Globe, Check, Copy, Code } from 'lucide-react';

export const PermanentPackagingGuide: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleSnippet = `// Example: src/data/bundledArchives.ts
// Add permanent family heirlooms here for all visitors:
export const BUNDLED_FAMILY_FILES = [
  {
    name: "Sacred-Heart-Founders-Portrait-1945.jpg",
    category: "photos",
    size: 2450000, // 2.45 MB
    downloadUrl: "/archives/Sacred-Heart-Founders-Portrait-1945.jpg"
  },
  {
    name: "Sacred-Heart-Genealogy-Record.pdf",
    category: "documents",
    size: 1850000,
    downloadUrl: "/archives/Sacred-Heart-Genealogy-Record.pdf"
  }
];`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <section id="packaging-guide" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C69238]/15 text-[#A17120] text-xs font-semibold uppercase tracking-wider mb-2">
          <Package className="w-3.5 h-3.5" />
          <span>Family Curator Guide</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#3F0E19]">
          Permanent Family Memory Archiving
        </h2>
        <p className="text-sm sm:text-base text-[#524C49] mt-2 leading-relaxed">
          How to package real photos, videos, and documents into the website so all family members can view and download them without requiring a backend server.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        
        {/* Session Card */}
        <div className="bg-[#FDFCF9] rounded-2xl p-6 sm:p-7 border border-[#E8E0D3] shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#5A1626]/10 text-[#5A1626] border border-[#5A1626]/20 flex items-center justify-center mb-4">
              <HardDrive className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-xl font-bold text-[#3F0E19] mb-2">
              1. Local Browser Session Files
            </h3>
            <p className="text-sm text-[#524C49] leading-relaxed mb-4">
              When someone uses <strong>&ldquo;Add Files&rdquo;</strong>, the files are loaded strictly into that visitor&apos;s current browser memory.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#7A726D]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C69238]" />
                <span>100% private: no data is sent to the internet.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C69238]" />
                <span>Instant client-side downloads without server limits.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5A1626]" />
                <span>Will vanish when the browser tab is closed or refreshed.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8E0D3] text-xs text-[#7A726D]">
            Ideal for: Quick individual testing, private viewing, and instant device downloads.
          </div>
        </div>

        {/* Permanent Assets Card */}
        <div className="bg-gradient-to-br from-[#FDFCF9] to-[#FAF7F2] rounded-2xl p-6 sm:p-7 border-2 border-[#C69238]/40 shadow-md flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#C69238]/15 text-[#A17120] border border-[#C69238]/30 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-xl font-bold text-[#3F0E19] mb-2">
              2. Permanent Bundled Family Assets
            </h3>
            <p className="text-sm text-[#524C49] leading-relaxed mb-4">
              To make heirloom files available to every family visitor permanently across the globe, package them directly into the static project directory.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#524C49]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#A17120] shrink-0" />
                <span>Zero server fees: host for free on GitHub Pages, Vercel, or Netlify.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#A17120] shrink-0" />
                <span>Permanent: never expires, no database downtime.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#A17120] shrink-0" />
                <span>Every family member gets fast, direct 1-click downloads.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8E0D3] text-xs font-semibold text-[#A17120]">
            Recommended for: Publishing the official permanent Sacred Heart Family Archive.
          </div>
        </div>

      </div>

      {/* Step-by-Step Instructions */}
      <div className="bg-[#FAF7F2] border border-[#E8E0D3] rounded-3xl p-6 sm:p-8">
        <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#3F0E19] mb-6">
          How to Add Permanent Downloadable Files in 3 Steps:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#FDFCF9] rounded-2xl p-5 border border-[#E8E0D3]">
            <span className="w-8 h-8 rounded-full bg-[#5A1626] text-[#FAF7F2] font-bold text-sm flex items-center justify-center mb-3">
              1
            </span>
            <h4 className="font-semibold text-base text-[#3F0E19] mb-2">Create Archive Folder</h4>
            <p className="text-xs sm:text-sm text-[#524C49] leading-relaxed">
              Place your family photos, videos, and PDFs inside the project&apos;s <code className="bg-[#F4EFE6] px-1.5 py-0.5 rounded text-[#5A1626]">public/archives/</code> directory.
            </p>
          </div>

          <div className="bg-[#FDFCF9] rounded-2xl p-5 border border-[#E8E0D3]">
            <span className="w-8 h-8 rounded-full bg-[#5A1626] text-[#FAF7F2] font-bold text-sm flex items-center justify-center mb-3">
              2
            </span>
            <h4 className="font-semibold text-base text-[#3F0E19] mb-2">Define File Metadata</h4>
            <p className="text-xs sm:text-sm text-[#524C49] leading-relaxed">
              List the file name, category, and real download URL in your bundled archive configuration file.
            </p>
          </div>

          <div className="bg-[#FDFCF9] rounded-2xl p-5 border border-[#E8E0D3]">
            <span className="w-8 h-8 rounded-full bg-[#5A1626] text-[#FAF7F2] font-bold text-sm flex items-center justify-center mb-3">
              3
            </span>
            <h4 className="font-semibold text-base text-[#3F0E19] mb-2">Publish Static Site</h4>
            <p className="text-xs sm:text-sm text-[#524C49] leading-relaxed">
              Deploy the static bundle. All visitors can immediately browse previews and download real files onto their phones.
            </p>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="bg-[#1C1A18] rounded-2xl p-4 sm:p-5 text-white/90 overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-white/70">
              <Code className="w-4 h-4 text-[#E8BD6D]" />
              <span className="font-mono">Example Bundled Archive Configuration</span>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="font-mono text-xs sm:text-sm text-[#E8BD6D] overflow-x-auto p-2 leading-relaxed">
            {sampleSnippet}
          </pre>
        </div>

      </div>

    </section>
  );
};
