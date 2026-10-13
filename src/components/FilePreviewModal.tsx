import React, { useEffect, useState } from 'react';
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  Film,
  Image as ImageIcon,
  Calendar,
  HardDrive,
  Tag,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import type { ArchiveFile } from '../types/archive';
import { formatFileSize, formatDate, triggerFileDownload } from '../utils/fileHelpers';

interface FilePreviewModalProps {
  file: ArchiveFile | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  file,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalCount,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [prevFileId, setPrevFileId] = useState<string | null>(file?.id ?? null);

  if (file?.id !== prevFileId) {
    setPrevFileId(file?.id ?? null);
    setZoomLevel(1);
  }

  // Keyboard navigation: Escape to close, ArrowLeft / ArrowRight to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      }
    };

    if (file) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [file, onClose, onNext, onPrev]);

  if (!file) return null;

  const isImage = file.category === 'photos';
  const isVideo = file.category === 'videos';
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

  const handleDownload = () => {
    triggerFileDownload(file);
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Preview of ${file.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#1A1816]/85 backdrop-blur-md animate-in fade-in-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[94vh] bg-[#FDFCF9] rounded-2xl sm:rounded-3xl border border-[#C69238]/50 shadow-2xl flex flex-col overflow-hidden"
      >
        
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-[#E8E0D3] bg-[#FAF7F2] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#5A1626]/10 text-[#5A1626] border border-[#5A1626]/20 flex items-center justify-center shrink-0">
              {isImage && <ImageIcon className="w-5 h-5 text-[#C69238]" />}
              {isVideo && <Film className="w-5 h-5 text-[#C69238]" />}
              {isPdf && <FileText className="w-5 h-5 text-[#5A1626]" />}
              {!isImage && !isVideo && !isPdf && <FileText className="w-5 h-5 text-[#7A726D]" />}
            </div>
            <div className="min-w-0">
              <h3 className="font-serif-display text-base sm:text-lg font-bold text-[#3F0E19] truncate" title={file.momentTitle || file.name}>
                {file.momentTitle || file.name}
              </h3>
              <p className="text-xs text-[#7A726D] flex items-center gap-2 truncate">
                <span className="font-mono">{file.name}</span>
                <span>•</span>
                <span>{formatFileSize(file.size)}</span>
                {currentIndex !== undefined && totalCount !== undefined && (
                  <>
                    <span>•</span>
                    <span className="font-semibold text-[#A17120]">{currentIndex + 1} of {totalCount}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#E8BD6D]" />
              <span className="hidden sm:inline">Download</span>
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 text-[#524C49] hover:text-[#3F0E19] hover:bg-[#F4EFE6] rounded-xl transition-colors cursor-pointer"
              aria-label="Close preview modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Viewport */}
        <div className="flex-1 overflow-auto bg-[#141312] relative min-h-[350px] max-h-[64vh] flex items-center justify-center p-3 sm:p-6 select-none">
          {isImage ? (
            <div className="overflow-auto max-w-full max-h-full flex items-center justify-center">
              <img
                src={file.objectUrl}
                alt={file.momentTitle || file.name}
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.15s ease-out' }}
                className="max-w-full max-h-[58vh] object-contain shadow-2xl rounded-sm"
              />
            </div>
          ) : isVideo ? (
            <div className="w-full max-w-3xl flex items-center justify-center">
              <video
                src={file.objectUrl}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-[58vh] rounded-lg shadow-lg"
              />
            </div>
          ) : isPdf ? (
            <div className="w-full h-[58vh] flex flex-col items-center justify-center bg-[#FAF7F2] rounded-xl p-4">
              <iframe
                src={file.objectUrl}
                title={file.name}
                className="w-full h-full rounded-lg border border-[#E8E0D3]"
              />
            </div>
          ) : (
            <div className="text-center p-8 bg-[#FAF7F2] rounded-2xl max-w-md border border-[#E8E0D3]">
              <FileText className="w-16 h-16 text-[#5A1626] mx-auto mb-4" />
              <h4 className="font-semibold text-lg text-[#3F0E19] mb-1">{file.name}</h4>
              <p className="text-xs text-[#7A726D] mb-4">
                This document is ready to save to your local device.
              </p>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5A1626] text-[#FAF7F2] rounded-xl text-sm font-semibold"
              >
                <Download className="w-4 h-4 text-[#E8BD6D]" />
                <span>Save to Device</span>
              </button>
            </div>
          )}

          {/* Left Arrow */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg z-20"
              aria-label="Previous image"
              title="Previous (Left arrow key)"
            >
              <ChevronLeft className="w-5 h-5 text-[#E8BD6D]" />
            </button>
          )}

          {/* Right Arrow */}
          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg z-20"
              aria-label="Next image"
              title="Next (Right arrow key)"
            >
              <ChevronRight className="w-5 h-5 text-[#E8BD6D]" />
            </button>
          )}

          {/* Floating Zoom Controls for Images */}
          {isImage && (
            <div className="absolute bottom-4 right-4 bg-[#23201F]/90 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg text-white text-xs z-20">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
                className="p-1 hover:text-[#E8BD6D] disabled:opacity-30 transition-colors cursor-pointer"
                title="Zoom out"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs w-10 text-center">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="p-1 hover:text-[#E8BD6D] disabled:opacity-30 transition-colors cursor-pointer"
                title="Zoom in"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1 hover:text-[#E8BD6D] transition-colors ml-1 border-l border-white/20 pl-2 cursor-pointer"
                title="Reset zoom"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer: Full Technical and Event Metadata */}
        <div className="px-5 py-4 bg-[#FAF7F2] border-t border-[#E8E0D3] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            {file.momentDescription && (
              <p className="text-xs text-[#524C49] font-sans">
                {file.momentDescription}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-[#7A726D]">
              <div className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-[#C69238]" />
                <span>Size: <strong>{formatFileSize(file.size)}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C69238]" />
                <span>Date: <strong>{formatDate(file.lastModified)}</strong></span>
              </div>
              {file.source && (
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C69238]" />
                  <span>Source: <strong>{file.source}</strong></span>
                </div>
              )}
              {file.width && file.height && (
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#C69238]" />
                  <span>Resolution: <strong>{file.width} &times; {file.height}</strong></span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDownload}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] font-semibold text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#E8BD6D]" />
              <span>Download Full Resolution</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
