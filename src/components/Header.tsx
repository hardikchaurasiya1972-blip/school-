import React, { useState } from 'react';
import { Heart, FolderHeart, Image, Menu, X, PlusCircle, Sparkles } from 'lucide-react';

interface HeaderProps {
  fileCount: number;
  onOpenAddFiles: () => void;
}

export const Header: React.FC<HeaderProps> = ({ fileCount, onOpenAddFiles }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero', icon: Sparkles },
    { label: 'Chronicles', href: '#chronicles', icon: FolderHeart },
    { label: 'Highlights', href: '#highlights', icon: Image },
    { label: 'Photo Gallery', href: '#photos', icon: Image },
    { label: 'Archive Search', href: '#archive', icon: FolderHeart },
    { label: 'Upload', href: '#upload', icon: PlusCircle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E0D3] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <a href="#hero" className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-[#C69238] rounded-lg p-1">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#5A1626] to-[#3F0E19] flex items-center justify-center shadow-md border border-[#C69238]/40 group-hover:scale-105 transition-transform duration-200">
              <Heart className="w-6 h-6 text-[#E8BD6D] fill-[#C69238]/30 group-hover:fill-[#C69238] transition-colors" />
            </div>
            <div className="text-left">
              <span className="block font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-[#3F0E19] group-hover:text-[#5A1626] transition-colors leading-none">
                Sacred Heart
              </span>
              <span className="block font-cinzel text-[10px] tracking-widest uppercase text-[#A17120] font-semibold mt-1">
                Memory & Jubilee Archive
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[#524C49] hover:text-[#5A1626] hover:bg-[#F4EFE6] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {fileCount > 0 && (
              <a
                href="#archive"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#5A1626]/10 text-[#5A1626] border border-[#5A1626]/20 rounded-full text-xs font-semibold hover:bg-[#5A1626]/15 transition-colors"
              >
                <FolderHeart className="w-3.5 h-3.5" />
                <span>{fileCount} {fileCount === 1 ? 'Memory' : 'Memories'}</span>
              </a>
            )}

            <button
              onClick={onOpenAddFiles}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#5A1626] to-[#7E2437] hover:from-[#4A121E] hover:to-[#6E1E31] text-[#FAF7F2] text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-[#C69238]"
              id="header-add-files-btn"
            >
              <PlusCircle className="w-4 h-4 text-[#E8BD6D]" />
              <span>Add Files</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#524C49] hover:text-[#3F0E19] hover:bg-[#F4EFE6] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#C69238]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8E0D3] px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-[#524C49] hover:text-[#5A1626] hover:bg-[#F4EFE6] transition-colors"
              >
                {Icon && <Icon className="w-5 h-5 text-[#C69238]" />}
                <span>{link.label}</span>
              </a>
            );
          })}
          
          <div className="pt-3 border-t border-[#E8E0D3] mt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAddFiles();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#5A1626] text-[#FAF7F2] rounded-lg font-medium text-sm shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-[#E8BD6D]" />
              <span>Add Family Files to Archive</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
