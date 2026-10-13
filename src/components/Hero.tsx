import React, { useState, useEffect } from 'react';
import {
  FolderDown,
  Image as ImageIcon,
  PlusCircle,
  ShieldCheck,
  Download,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  Award,
} from 'lucide-react';
import type { ArchiveFile } from '../types/archive';

interface HeroProps {
  fileCount: number;
  totalSizeFormatted: string;
  onOpenAddFiles: () => void;
  onBrowseArchive: () => void;
  onExploreGallery: () => void;
  onPreviewPhoto?: (file: ArchiveFile) => void;
  heroFiles?: ArchiveFile[];
}

const DEFAULT_HERO_PHOTOS: ArchiveFile[] = [
  {
    id: 'hero-portrait',
    name: 'IMG_20210904_111930.jpg',
    size: 2600000,
    type: 'image/jpeg',
    lastModified: 1630734570000,
    category: 'photos',
    objectUrl: '/phone/IMG_20210904_111930.jpg',
    downloadUrl: '/phone/IMG_20210904_111930.jpg',
    momentTitle: 'Sacred Heart Faculty Grand Ceremonial Portrait',
    momentDescription: 'Sister Superiors, Headmistress, and all distinguished faculty in ceremonial sarees gathered in unity.',
    source: 'Mobile HD Archive',
    width: 4608,
    height: 2076,
    aspect: 'landscape',
  },
  {
    id: 'hero-diya',
    name: 'DSC01820.JPG',
    size: 694000,
    type: 'image/jpeg',
    lastModified: 1630730000000,
    category: 'photos',
    objectUrl: '/cam/DSC01820.JPG',
    downloadUrl: '/cam/DSC01820.JPG',
    momentTitle: 'Auspicious Diya Lighting Ceremony',
    momentDescription: 'Senior teachers and Sisters igniting the ceremonial brass diya lamp with reverence.',
    source: 'Full HD Camera Archive',
    width: 1920,
    height: 1080,
    aspect: 'landscape',
  },
  {
    id: 'hero-stage',
    name: 'IMG_20210904_103425.jpg',
    size: 2800000,
    type: 'image/jpeg',
    lastModified: 1630731000000,
    category: 'photos',
    objectUrl: '/phone/IMG_20210904_103425.jpg',
    downloadUrl: '/phone/IMG_20210904_103425.jpg',
    momentTitle: 'Panoramic Silver Jubilee Celebration Stage',
    momentDescription: "Silver Jubilee felicitation honoring Richa Ma'am & Neeta Ma'am for 25 glorious years.",
    source: 'Mobile HD Archive',
    width: 4608,
    height: 2076,
    aspect: 'landscape',
  },
  {
    id: 'hero-dance',
    name: 'DSC01825.JPG',
    size: 680000,
    type: 'image/jpeg',
    lastModified: 1630730500000,
    category: 'photos',
    objectUrl: '/cam/DSC01825.JPG',
    downloadUrl: '/cam/DSC01825.JPG',
    momentTitle: 'Graceful Classical Prayer Dance Performance',
    momentDescription: 'Students presenting an invocational traditional dance in vibrant costumes.',
    source: 'Full HD Camera Archive',
    width: 1920,
    height: 1080,
    aspect: 'landscape',
  },
  {
    id: 'hero-choir',
    name: 'DSC01840.JPG',
    size: 710000,
    type: 'image/jpeg',
    lastModified: 1630732000000,
    category: 'photos',
    objectUrl: '/cam/DSC01840.JPG',
    downloadUrl: '/cam/DSC01840.JPG',
    momentTitle: 'Rose-Bearing Student Choir & Melodious Tribute',
    momentDescription: 'School choir singing heartfelt hymns dedicated to our beloved teachers.',
    source: 'Full HD Camera Archive',
    width: 1920,
    height: 1080,
    aspect: 'landscape',
  },
  {
    id: 'hero-backstage',
    name: 'IMG_20210904_095945.jpg',
    size: 2500000,
    type: 'image/jpeg',
    lastModified: 1630729000000,
    category: 'photos',
    objectUrl: '/phone/IMG_20210904_095945.jpg',
    downloadUrl: '/phone/IMG_20210904_095945.jpg',
    momentTitle: 'Backstage Corridor: Classmates in Festive Costumes',
    momentDescription: 'Students getting ready backstage before the grand curtain call.',
    source: 'Mobile HD Archive',
    width: 4608,
    height: 2076,
    aspect: 'landscape',
  },
];

export const Hero: React.FC<HeroProps> = ({
  fileCount,
  totalSizeFormatted,
  onOpenAddFiles,
  onBrowseArchive,
  onExploreGallery,
  onPreviewPhoto,
  heroFiles,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const displayPhotos = (heroFiles && heroFiles.length > 0) ? heroFiles : DEFAULT_HERO_PHOTOS;

  // Auto-advance hero carousel every 5.5 seconds if auto-play is enabled
  useEffect(() => {
    if (!isAutoPlaying || displayPhotos.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayPhotos.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, displayPhotos.length]);

  const activePhoto = displayPhotos[activeIndex] || displayPhotos[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % displayPhotos.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + displayPhotos.length) % displayPhotos.length);
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20 bg-gradient-to-b from-[#F5EFE6]/70 via-[#FAF7F2] to-[#FAF7F2] border-b border-[#E8E0D3]">
      {/* Background ornamentation & glow */}
      <div className="absolute inset-0 parchment-pattern pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-[#C69238]/10 via-[#5A1626]/6 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Regal Insignia Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#C69238]/50 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#C69238]" />
            <span className="font-cinzel text-xs font-bold tracking-widest text-[#3F0E19] uppercase">
              Sacred Heart Convent School
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C69238]" />
            <span className="text-xs text-[#524C49] font-medium hidden sm:inline">Motto: Truth & Diligence</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A1626]/10 border border-[#5A1626]/20 text-[#5A1626] text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-[#C69238]" />
            <span>4th September 2021 • Teacher&apos;s Day &amp; Silver Jubilee</span>
          </div>
        </div>

        {/* Hero Grid: Typography on Left, Dynamic Interactive Showcase on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FAF7F2] border border-[#E8E0D3] text-[#A17120] text-xs font-semibold uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5 text-[#C69238]" />
              <span>Milestone Celebration &amp; Memory Archive</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#3F0E19] mb-5 leading-[1.12]">
              Honoring Mentors, <br />
              <span className="gold-gradient-text italic font-normal">
                Cherishing Every Moment
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#524C49] font-cormorant italic font-normal mb-8 leading-relaxed max-w-xl">
              &ldquo;Preserving the timeless heritage of Sacred Heart Convent School. Over 400 original high-resolution photographs documenting our solemn Diya Lighting, the grand Silver Jubilee of Richa Ma&apos;am &amp; Neeta Ma&apos;am, student cultural performances, and the lifelong bonds of our batch.&rdquo;
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <button
                onClick={onExploreGallery}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] font-semibold text-sm sm:text-base rounded-xl shadow-md hover:shadow-xl transition-all active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-[#C69238]"
                id="hero-explore-gallery-btn"
              >
                <ImageIcon className="w-5 h-5 text-[#E8BD6D]" />
                <span>Explore 400+ Photos</span>
              </button>

              <button
                onClick={onBrowseArchive}
                className="inline-flex items-center gap-2.5 px-5 py-3.5 bg-[#F4EFE6] hover:bg-[#EAE2D5] text-[#3F0E19] border border-[#D8CEBE] font-semibold text-sm sm:text-base rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-[#C69238]"
                id="hero-browse-memories-btn"
              >
                <FolderDown className="w-5 h-5 text-[#C69238]" />
                <span>Search Archive</span>
              </button>

              <button
                onClick={onOpenAddFiles}
                className="inline-flex items-center gap-2 px-4 py-3.5 bg-[#FAF7F2] hover:bg-[#F0EAE1] text-[#5A1626] border border-[#5A1626]/30 font-medium text-xs sm:text-sm rounded-xl transition-all active:scale-95"
                id="hero-add-files-btn"
              >
                <PlusCircle className="w-4 h-4 text-[#A17120]" />
                <span>Add Files</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FDFCF9] border border-[#E8E0D3] shadow-xs max-w-lg">
              <div className="text-center sm:text-left">
                <span className="block font-serif-display text-2xl sm:text-3xl font-bold text-[#5A1626]">
                  400+
                </span>
                <span className="text-xs text-[#7A726D]">Real Photographs</span>
              </div>
              <div className="text-center sm:text-left border-x border-[#E8E0D3] px-2 sm:px-3">
                <span className="block font-serif-display text-2xl sm:text-3xl font-bold text-[#A17120]">
                  25 Yrs
                </span>
                <span className="text-xs text-[#7A726D]">Silver Jubilee</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="block font-serif-display text-2xl sm:text-3xl font-bold text-[#3F0E19]">
                  100%
                </span>
                <span className="text-xs text-[#7A726D]">Client-Side Privacy</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Carousel / Showcase Stage */}
          <div className="lg:col-span-6">
            {activePhoto && (
              <div
                className="relative rounded-3xl overflow-hidden bg-[#23201F] border-2 border-[#C69238]/50 shadow-2xl group"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Main Viewport */}
                <div
                  className="relative aspect-16/10 sm:aspect-16/9 overflow-hidden cursor-pointer"
                  onClick={() => onPreviewPhoto?.(activePhoto)}
                >
                  <img
                    src={activePhoto.objectUrl}
                    alt={activePhoto.momentTitle || activePhoto.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#23201F]/90 via-[#23201F]/20 to-transparent pointer-events-none" />

                  {/* Click to expand badge in top right */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[#E8BD6D] text-xs font-semibold border border-white/20 shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Full View</span>
                    </span>
                  </div>

                  {/* Top Left Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#5A1626]/85 backdrop-blur-md text-white text-xs font-semibold border border-[#C69238]/40 shadow-md">
                      <Sparkles className="w-3 h-3 text-[#E8BD6D]" />
                      <span>Featured Highlight</span>
                    </span>
                  </div>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    <h3 className="font-serif-display text-lg sm:text-xl font-bold drop-shadow-md text-[#FAF7F2] mb-1">
                      {activePhoto.momentTitle || activePhoto.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 line-clamp-2 drop-shadow-sm font-sans">
                      {activePhoto.momentDescription || 'Captured during the Sacred Heart Teacher\'s Day and Silver Jubilee Gala.'}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-[#E8BD6D]">
                      <span>{activePhoto.source || 'Original Camera Photo'}</span>
                      <span>•</span>
                      <span>{activePhoto.width} &times; {activePhoto.height} px</span>
                    </div>
                  </div>

                  {/* Previous / Next Navigation Arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all opacity-80 group-hover:opacity-100 hover:scale-110 cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#E8BD6D]" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all opacity-80 group-hover:opacity-100 hover:scale-110 cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5 text-[#E8BD6D]" />
                  </button>
                </div>

                {/* Thumbnails Strip */}
                <div className="bg-[#1C1A18] px-3 py-2.5 border-t border-white/10 flex items-center justify-between gap-2 overflow-x-auto">
                  <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
                    {displayPhotos.map((photo, idx) => (
                      <button
                        key={photo.id}
                        onClick={() => setActiveIndex(idx)}
                        className={`relative w-14 h-10 sm:w-16 sm:h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          idx === activeIndex
                            ? 'border-[#C69238] scale-105 shadow-md ring-2 ring-[#C69238]/40'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                        title={photo.momentTitle || photo.name}
                      >
                        <img
                          src={photo.objectUrl}
                          alt={photo.name}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Counter and Play/Pause indicator */}
                  <div className="shrink-0 text-right pl-2">
                    <span className="font-mono text-xs text-[#E8BD6D] font-bold block">
                      {activeIndex + 1}/{displayPhotos.length}
                    </span>
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="text-[10px] text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      {isAutoPlaying ? 'Auto' : 'Paused'}
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

        {/* Trust Badges */}
        <div className="pt-6 border-t border-[#E8E0D3]/80 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-[#7A726D]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#A17120]" />
            <span>100% Client-Side Privacy (Zero Cloud Upload)</span>
          </div>
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-[#5A1626]" />
            <span>Direct High-Resolution Downloads</span>
          </div>
          <div className="flex items-center gap-2 font-semibold text-[#5A1626]">
            <span className="w-2 h-2 rounded-full bg-[#5A1626] animate-pulse" />
            <span>{fileCount} Total Memories in Archive ({totalSizeFormatted})</span>
          </div>
        </div>

      </div>
    </section>
  );
};
