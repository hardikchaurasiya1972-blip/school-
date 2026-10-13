import React, { useState, useMemo } from 'react';
import {
  FolderHeart,
  Search,
  ArrowUpDown,
  LayoutGrid,
  List,
  Download,
  FolderOpen,
  Image as ImageIcon,
  Film,
  FileText,
  Files,
  X,
  Trash2,
  FolderPlus,
} from 'lucide-react';
import type { ArchiveFile, FileCategory, SortField, ViewMode } from '../types/archive';
import { FileGridCard } from './FileGridCard';
import { FileListItem } from './FileListItem';
import { formatFileSize, triggerFileDownload } from '../utils/fileHelpers';

interface FileManagerProps {
  files: ArchiveFile[];
  onOpenAddFiles: () => void;
  onPreviewFile: (file: ArchiveFile) => void;
  onRemoveFile: (fileId: string) => void;
  onClearAll: () => void;
  activeCategory: FileCategory;
  onSelectCategory: (cat: FileCategory) => void;
}

export const FileManager: React.FC<FileManagerProps> = ({
  files,
  onOpenAddFiles,
  onPreviewFile,
  onRemoveFile,
  onClearAll,
  activeCategory,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('date-newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isBatchDownloading, setIsBatchDownloading] = useState(false);
  const [visibleLimit, setVisibleLimit] = useState(24);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: files.length,
      photos: files.filter((f) => f.category === 'photos').length,
      videos: files.filter((f) => f.category === 'videos').length,
      documents: files.filter((f) => f.category === 'documents').length,
      other: files.filter((f) => f.category === 'other').length,
    };
  }, [files]);

  // Filtered and sorted files
  const filteredFiles = useMemo(() => {
    let result = [...files];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((f) => f.category === activeCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((f) =>
        f.name.toLowerCase().includes(q) ||
        (f.momentTitle && f.momentTitle.toLowerCase().includes(q)) ||
        (f.momentDescription && f.momentDescription.toLowerCase().includes(q)) ||
        (f.tags && f.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortField) {
        case 'name-asc':
          return a.name.localeCompare(b.name, undefined, { numeric: true });
        case 'name-desc':
          return b.name.localeCompare(a.name, undefined, { numeric: true });
        case 'size-asc':
          return a.size - b.size;
        case 'size-desc':
          return b.size - a.size;
        case 'date-newest':
          return b.lastModified - a.lastModified;
        case 'date-oldest':
          return a.lastModified - b.lastModified;
        default:
          return 0;
      }
    });

    return result;
  }, [files, activeCategory, searchQuery, sortField]);

  // Total filtered size
  const filteredSize = useMemo(() => {
    return filteredFiles.reduce((acc, f) => acc + f.size, 0);
  }, [filteredFiles]);

  // Batch download handler
  const handleDownloadAll = async () => {
    if (filteredFiles.length === 0 || isBatchDownloading) return;
    setIsBatchDownloading(true);

    for (let i = 0; i < filteredFiles.length; i++) {
      triggerFileDownload(filteredFiles[i]);
      // Small pause so mobile and desktop browsers don't block simultaneous download tabs
      if (i < filteredFiles.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }

    setIsBatchDownloading(false);
  };

  const categories: { id: FileCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', label: 'All Files', icon: Files },
    { id: 'photos', label: 'Photos', icon: ImageIcon },
    { id: 'videos', label: 'Videos', icon: Film },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'other', label: 'Other', icon: FolderOpen },
  ];

  return (
    <section id="archive" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A1626]/10 text-[#5A1626] text-xs font-semibold uppercase tracking-wider mb-2">
            <FolderHeart className="w-3.5 h-3.5 text-[#C69238]" />
            <span>Digital Repository</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#3F0E19]">
            Sacred Heart Event Archive
          </h2>
          <p className="text-sm sm:text-base text-[#524C49] mt-1 max-w-2xl">
            Browse the complete repository of 400+ high-resolution photographs, stage musicals, and jubilee honor moments. Download any photo directly in Full HD.
          </p>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-3">
          {files.length > 0 && (
            <button
              onClick={handleDownloadAll}
              disabled={isBatchDownloading || filteredFiles.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FAF7F2] hover:bg-[#F4EFE6] text-[#3F0E19] border border-[#D8CEBE] rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 disabled:opacity-40 shadow-xs"
              title="Download all currently visible files"
            >
              <Download className="w-4 h-4 text-[#C69238]" />
              <span>{isBatchDownloading ? 'Downloading...' : `Download All (${filteredFiles.length})`}</span>
            </button>
          )}

          <button
            onClick={onOpenAddFiles}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] rounded-xl text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-95"
            id="archive-add-files-btn"
          >
            <FolderPlus className="w-4 h-4 text-[#E8BD6D]" />
            <span>Add Files</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Categories, Search, Sort & Views */}
      <div className="bg-[#FAF7F2] border border-[#E8E0D3] rounded-2xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count = categoryCounts[cat.id];
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#5A1626] text-[#FAF7F2] shadow-xs'
                    : 'bg-[#FDFCF9] text-[#524C49] hover:text-[#3F0E19] hover:bg-[#F4EFE6] border border-[#E8E0D3]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#E8BD6D]' : 'text-[#7A726D]'}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-[#7E2437] text-[#FAF7F2]' : 'bg-[#E8E0D3]/80 text-[#524C49]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search, Sort, and View Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-[#E8E0D3]/80">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#7A726D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files by filename..."
              className="w-full pl-10 pr-9 py-2.5 bg-[#FDFCF9] border border-[#E8E0D3] rounded-xl text-xs sm:text-sm text-[#2A2826] placeholder-[#A39B95] focus:outline-hidden focus:ring-2 focus:ring-[#C69238] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#7A726D] hover:text-[#3F0E19]"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 justify-between sm:justify-end">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#FDFCF9] border border-[#E8E0D3] rounded-xl px-3 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C69238]" />
              <label htmlFor="sort-select" className="sr-only">Sort archive files</label>
              <select
                id="sort-select"
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="bg-transparent text-xs font-semibold text-[#524C49] focus:outline-hidden cursor-pointer"
              >
                <option value="date-newest">Date: Newest First</option>
                <option value="date-oldest">Date: Oldest First</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="size-asc">Size: Smallest First</option>
                <option value="size-desc">Size: Largest First</option>
              </select>
            </div>

            {/* Grid / List View Toggle */}
            <div className="flex items-center bg-[#FDFCF9] border border-[#E8E0D3] rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#5A1626] text-[#FAF7F2]'
                    : 'text-[#7A726D] hover:text-[#3F0E19]'
                }`}
                title="Grid view"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#5A1626] text-[#FAF7F2]'
                    : 'text-[#7A726D] hover:text-[#3F0E19]'
                }`}
                title="List view"
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Clear All Button if files exist */}
            {files.length > 0 && (
              <button
                onClick={onClearAll}
                className="p-2 text-[#7A726D] hover:text-[#5A1626] hover:bg-[#5A1626]/10 rounded-xl transition-colors cursor-pointer"
                title="Clear all session files"
                aria-label="Clear all session files"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Status count indicator */}
        {files.length > 0 && (
          <div className="flex items-center justify-between text-xs text-[#7A726D] pt-1">
            <span>
              Showing <strong>{filteredFiles.length}</strong> of {files.length} {files.length === 1 ? 'file' : 'files'}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            <span>Total size: <strong>{formatFileSize(filteredSize)}</strong></span>
          </div>
        )}

      </div>

      {/* Main Files Display Area */}
      {files.length === 0 ? (
        /* Empty State: Initial state when no files have been loaded yet */
        <div className="border border-dashed border-[#D8CEBE] rounded-3xl bg-[#FDFCF9] p-10 sm:p-16 text-center">
          <div className="max-w-md mx-auto flex flex-col items-center">
            
            <div className="w-20 h-20 rounded-2xl bg-[#5A1626]/10 border border-[#5A1626]/20 flex items-center justify-center mb-6">
              <FolderHeart className="w-10 h-10 text-[#5A1626]" />
            </div>

            <h3 className="font-serif-display text-2xl font-bold text-[#3F0E19] mb-3">
              The Family Archive is Ready
            </h3>

            <p className="text-sm sm:text-base text-[#524C49] mb-6 leading-relaxed">
              No family memories are currently loaded. Add photos, video clips, or family documents from your device to browse, preview, and download them.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenAddFiles}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] font-semibold text-sm rounded-xl shadow-md transition-all active:scale-95"
              >
                <FolderPlus className="w-4 h-4 text-[#E8BD6D]" />
                <span>Select Files from Device</span>
              </button>

              <a
                href="#packaging-guide"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#FAF7F2] hover:bg-[#F4EFE6] text-[#3F0E19] border border-[#D8CEBE] font-semibold text-sm rounded-xl transition-all"
              >
                <span>Learn How to Bundle Files</span>
              </a>
            </div>

            <p className="text-xs text-[#7A726D] mt-6">
              In accordance with strict client-side privacy, files remain solely in your current browser session.
            </p>

          </div>
        </div>
      ) : filteredFiles.length === 0 ? (
        /* Filtered Empty State: When search or category produces 0 results */
        <div className="border border-[#E8E0D3] rounded-2xl bg-[#FDFCF9] p-12 text-center">
          <div className="max-w-sm mx-auto flex flex-col items-center">
            <Search className="w-12 h-12 text-[#A17120] mb-4" />
            <h3 className="font-serif-display text-lg font-bold text-[#3F0E19] mb-2">
              No Files Found
            </h3>
            <p className="text-sm text-[#7A726D] mb-6">
              No files in the <strong>{activeCategory}</strong> category match your current query &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="px-4 py-2 bg-[#F4EFE6] hover:bg-[#EAE2D5] text-[#3F0E19] text-xs font-semibold rounded-lg border border-[#D8CEBE]"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredFiles.slice(0, visibleLimit).map((file) => (
                <FileGridCard
                  key={file.id}
                  file={file}
                  onPreview={onPreviewFile}
                  onRemove={onRemoveFile}
                />
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-2.5">
              {filteredFiles.slice(0, visibleLimit).map((file) => (
                <FileListItem
                  key={file.id}
                  file={file}
                  onPreview={onPreviewFile}
                  onRemove={onRemoveFile}
                />
              ))}
            </div>
          )}

          {/* Load More Bar */}
          {visibleLimit < filteredFiles.length && (
            <div className="mt-10 text-center space-y-2">
              <p className="text-xs text-[#7A726D]">
                Showing <strong>{Math.min(visibleLimit, filteredFiles.length)}</strong> of {filteredFiles.length} files
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setVisibleLimit((v) => Math.min(v + 24, filteredFiles.length))}
                  className="px-5 py-2.5 bg-[#FAF7F2] hover:bg-[#F4EFE6] text-[#3F0E19] border border-[#C69238]/60 font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                >
                  Load More Files (+24)
                </button>
                <button
                  onClick={() => setVisibleLimit(filteredFiles.length)}
                  className="px-4 py-2.5 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                >
                  Show All ({filteredFiles.length})
                </button>
              </div>
            </div>
          )}
        </>
      )}

    </section>
  );
};
