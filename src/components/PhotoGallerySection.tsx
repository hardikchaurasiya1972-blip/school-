import React, { useState, useMemo } from 'react';
import {
  Image as ImageIcon,
  Download,
  Eye,
  PlusCircle,
  Search,
  X,
  Sparkles,
  Flame,
  Award,
  Music,
  Users,
  Grid3X3,
  ChevronDown,
} from 'lucide-react';
import type { ArchiveFile } from '../types/archive';
import { formatFileSize, triggerFileDownload } from '../utils/fileHelpers';

interface PhotoGallerySectionProps {
  photos: ArchiveFile[];
  onPreview: (file: ArchiveFile) => void;
  onOpenAddFiles: () => void;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({
  photos,
  onPreview,
  onOpenAddFiles,
}) => {
  const [selectedSubCat, setSelectedSubCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const subCategories = [
    { id: 'all', label: 'All Photos', icon: Grid3X3 },
    { id: 'ceremony', label: 'Diya & Invocations', icon: Flame },
    { id: 'jubilee', label: 'Silver Jubilee', icon: Award },
    { id: 'performances', label: 'Choir & Stage', icon: Music },
    { id: 'teachers', label: 'Faculty & Mentors', icon: Users },
    { id: 'classmates', label: 'Classmates & Candid', icon: Sparkles },
  ];

  // Filter photos based on subcategory and search query
  const filteredPhotos = useMemo(() => {
    let result = photos;

    if (selectedSubCat !== 'all') {
      result = result.filter((p) => p.subCategory === selectedSubCat);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.momentTitle && p.momentTitle.toLowerCase().includes(q)) ||
          (p.momentDescription && p.momentDescription.toLowerCase().includes(q)) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [photos, selectedSubCat, searchQuery]);

  // Paginated visible list
  const displayedPhotos = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 24, filteredPhotos.length));
  };

  const handleShowAll = () => {
    setVisibleCount(filteredPhotos.length);
  };

  return (
    <section id="photos" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6]/40 to-[#FAF7F2] border-t border-b border-[#E8E0D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C69238]/15 text-[#A17120] text-xs font-semibold uppercase tracking-wider mb-2">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Sacred Heart Visual Vault</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#3F0E19]">
              The Master Photographic Gallery
            </h2>
            <p className="text-sm sm:text-base text-[#524C49] mt-1 max-w-2xl">
              Browse over 400 original photographs capturing the Diya lighting, Silver Jubilee honors, stage musicals, and campus laughter.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#5A1626] bg-[#5A1626]/10 px-3.5 py-1.5 rounded-full border border-[#5A1626]/20">
              {filteredPhotos.length} of {photos.length} Photographs
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#FDFCF9] rounded-2xl border border-[#E8E0D3] p-4 shadow-xs mb-8 space-y-4">
          
          {/* Subcategory Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {subCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedSubCat === cat.id;
              const count = cat.id === 'all'
                ? photos.length
                : photos.filter((p) => p.subCategory === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedSubCat(cat.id);
                    setVisibleCount(24);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#5A1626] text-[#FAF7F2] shadow-xs'
                      : 'bg-[#FAF7F2] text-[#524C49] hover:text-[#3F0E19] hover:bg-[#F4EFE6] border border-[#E8E0D3]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E8BD6D]' : 'text-[#7A726D]'}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-[#7E2437] text-white' : 'bg-[#E8E0D3] text-[#524C49]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar inside Gallery */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#7A726D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(24);
              }}
              placeholder="Search by keyword (e.g. choir, saree, dance, silver jubilee)..."
              className="w-full pl-10 pr-9 py-2 bg-[#FAF7F2] border border-[#E8E0D3] rounded-xl text-xs sm:text-sm text-[#23201F] placeholder-[#9E958E] focus:outline-hidden focus:ring-2 focus:ring-[#C69238]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#7A726D] hover:text-[#3F0E19]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Gallery Content */}
        {displayedPhotos.length === 0 ? (
          <div className="border border-dashed border-[#D8CEBE] rounded-3xl bg-[#FDFCF9] p-12 text-center">
            <Search className="w-10 h-10 text-[#C69238] mx-auto mb-3" />
            <h3 className="font-serif-display text-xl font-bold text-[#3F0E19] mb-1">
              No matching photographs found
            </h3>
            <p className="text-sm text-[#7A726D] mb-4">
              Try adjusting your search terms or selecting another category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubCat('all');
              }}
              className="px-4 py-2 bg-[#F4EFE6] hover:bg-[#EAE2D5] text-[#3F0E19] rounded-xl text-xs font-semibold border border-[#D8CEBE]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative bg-[#FDFCF9] rounded-2xl overflow-hidden border border-[#E8E0D3] hover:border-[#C69238] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Photo Viewport */}
                  <div
                    onClick={() => onPreview(photo)}
                    className="relative aspect-4/3 overflow-hidden cursor-pointer bg-[#F4EFE6]"
                  >
                    <img
                      src={photo.objectUrl}
                      alt={photo.momentTitle || photo.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3.5 text-white">
                      <span className="text-xs font-medium">Click to preview in zoom</span>
                      <Eye className="w-4 h-4 text-[#E8BD6D]" />
                    </div>

                    {/* Category pill on photo */}
                    {photo.tags && photo.tags[0] && (
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-semibold text-[#E8BD6D] border border-white/10">
                          {photo.tags[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Metadata and Download */}
                  <div className="p-4 flex-1 flex flex-col justify-between bg-[#FDFCF9]">
                    <div>
                      <h4
                        className="font-serif-display font-bold text-sm text-[#23201F] group-hover:text-[#5A1626] transition-colors truncate mb-0.5"
                        title={photo.momentTitle || photo.name}
                      >
                        {photo.momentTitle || photo.name}
                      </h4>
                      <p className="text-xs text-[#7A726D] truncate mb-2" title={photo.name}>
                        {photo.name} • {formatFileSize(photo.size)}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E8E0D3]/80 flex items-center gap-2">
                      <button
                        onClick={() => triggerFileDownload(photo)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] text-xs font-semibold rounded-lg shadow-2xs transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-[#E8BD6D]" />
                        <span>Download</span>
                      </button>

                      <button
                        onClick={() => onPreview(photo)}
                        className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#F4EFE6] border border-[#D8CEBE] text-[#3F0E19] hover:text-[#5A1626] transition-colors"
                        title="View photo preview"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#A17120]" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Load More / Show All Bar */}
            {visibleCount < filteredPhotos.length && (
              <div className="mt-12 text-center space-y-3">
                <p className="text-xs text-[#7A726D]">
                  Showing <strong>{displayedPhotos.length}</strong> of {filteredPhotos.length} matching photographs
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAF7F2] hover:bg-[#F4EFE6] text-[#3F0E19] border border-[#C69238]/60 font-semibold text-sm rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <ChevronDown className="w-4 h-4 text-[#C69238]" />
                    <span>Load More Photos (+24)</span>
                  </button>

                  <button
                    onClick={handleShowAll}
                    className="inline-flex items-center gap-1.5 px-5 py-3 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] font-semibold text-sm rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#E8BD6D]" />
                    <span>Display All ({filteredPhotos.length})</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Option to contribute more photos */}
        <div className="mt-16 text-center border-t border-[#E8E0D3] pt-10">
          <p className="text-sm text-[#524C49] mb-3">
            Have more pictures from this celebration or other school milestones?
          </p>
          <button
            onClick={onOpenAddFiles}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAF7F2] hover:bg-[#F4EFE6] border border-[#D8CEBE] text-[#5A1626] rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-xs"
          >
            <PlusCircle className="w-4 h-4 text-[#C69238]" />
            <span>Add Additional Photos to Session Vault</span>
          </button>
        </div>

      </div>
    </section>
  );
};
