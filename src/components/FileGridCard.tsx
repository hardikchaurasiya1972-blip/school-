import React from 'react';
import { Download, Eye, Trash2, Image as ImageIcon, Film, FileText, File as FileIcon } from 'lucide-react';
import type { ArchiveFile } from '../types/archive';
import { formatFileSize, formatDate, triggerFileDownload } from '../utils/fileHelpers';

interface FileGridCardProps {
  file: ArchiveFile;
  onPreview: (file: ArchiveFile) => void;
  onRemove: (fileId: string) => void;
}

export const FileGridCard: React.FC<FileGridCardProps> = ({ file, onPreview, onRemove }) => {
  const isImage = file.category === 'photos';
  const isVideo = file.category === 'videos';
  const isDocument = file.category === 'documents';

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerFileDownload(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(file.id);
  };

  return (
    <div className="group relative bg-[#FDFCF9] rounded-2xl border border-[#E8E0D3] hover:border-[#C69238]/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Media Preview Header */}
      <div
        onClick={() => onPreview(file)}
        className="relative w-full aspect-4/3 bg-[#F4EFE6] cursor-pointer overflow-hidden flex items-center justify-center border-b border-[#E8E0D3]/80"
      >
        {isImage ? (
          <img
            src={file.objectUrl}
            alt={file.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : isVideo ? (
          <div className="relative w-full h-full flex items-center justify-center bg-[#2A2826]/90 group-hover:bg-[#2A2826] transition-colors">
            <video
              src={file.objectUrl}
              className="w-full h-full object-cover opacity-60"
              preload="metadata"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#5A1626]/80 text-[#FAF7F2] border border-[#E8BD6D] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Film className="w-6 h-6 text-[#E8BD6D]" />
              </div>
            </div>
          </div>
        ) : isDocument ? (
          <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#5A1626]/10 text-[#5A1626] border border-[#5A1626]/20 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <FileText className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A17120] bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#E8E0D3]">
              {file.name.split('.').pop() || 'DOC'}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#F4EFE6] text-[#7A726D] border border-[#E8E0D3] flex items-center justify-center shadow-xs">
              <FileIcon className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A726D]">
              {file.name.split('.').pop() || 'FILE'}
            </span>
          </div>
        )}

        {/* Category Tag pill */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FAF7F2]/90 backdrop-blur-md text-[#3F0E19] border border-[#E8E0D3] shadow-xs flex items-center gap-1">
          {isImage && <ImageIcon className="w-3 h-3 text-[#C69238]" />}
          {isVideo && <Film className="w-3 h-3 text-[#C69238]" />}
          {isDocument && <FileText className="w-3 h-3 text-[#C69238]" />}
          {!isImage && !isVideo && !isDocument && <FileIcon className="w-3 h-3 text-[#C69238]" />}
          <span className="capitalize">{file.category}</span>
        </span>

        {/* Quick Preview overlay on hover */}
        <div className="absolute inset-0 bg-[#3F0E19]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] text-[#3F0E19] text-xs font-semibold shadow-md">
            <Eye className="w-3.5 h-3.5 text-[#C69238]" />
            Preview
          </span>
        </div>
      </div>

      {/* Card Body & Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Filename with title tooltip */}
          <h4
            title={file.name}
            className="font-medium text-sm sm:text-base text-[#2A2826] line-clamp-1 group-hover:text-[#5A1626] transition-colors"
          >
            {file.name}
          </h4>

          {/* Size & Date metadata */}
          <div className="mt-1.5 flex items-center justify-between text-xs text-[#7A726D]">
            <span className="font-semibold text-[#524C49]">{formatFileSize(file.size)}</span>
            <span>{formatDate(file.lastModified)}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-4 pt-3 border-t border-[#E8E0D3] flex items-center gap-2">
          {/* Real Native Download Button */}
          <button
            onClick={handleDownload}
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] text-xs sm:text-sm font-semibold rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-[#C69238]"
            title={`Download ${file.name} to this device`}
            aria-label={`Download ${file.name}`}
          >
            <Download className="w-4 h-4 text-[#E8BD6D]" />
            <span>Download</span>
          </button>

          {/* Preview Button */}
          <button
            onClick={() => onPreview(file)}
            type="button"
            className="p-2.5 text-[#524C49] hover:text-[#3F0E19] bg-[#F4EFE6] hover:bg-[#EAE2D5] rounded-xl border border-[#E8E0D3] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#C69238]"
            title="Inspect preview"
            aria-label="Inspect preview"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            type="button"
            className="p-2.5 text-[#A17120] hover:text-[#5A1626] hover:bg-[#5A1626]/10 rounded-xl transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#5A1626]"
            title="Remove from session"
            aria-label="Remove from session"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
