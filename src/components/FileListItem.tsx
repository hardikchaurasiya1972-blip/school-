import React from 'react';
import { Download, Eye, Trash2, Film, FileText, File as FileIcon } from 'lucide-react';
import type { ArchiveFile } from '../types/archive';
import { formatFileSize, formatDate, triggerFileDownload } from '../utils/fileHelpers';

interface FileListItemProps {
  file: ArchiveFile;
  onPreview: (file: ArchiveFile) => void;
  onRemove: (fileId: string) => void;
}

export const FileListItem: React.FC<FileListItemProps> = ({ file, onPreview, onRemove }) => {
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
    <div className="group bg-[#FDFCF9] hover:bg-[#FAF7F2] border border-[#E8E0D3] hover:border-[#C69238]/60 rounded-xl p-3 sm:p-4 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
      
      {/* File Info & Thumbnail */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
        {/* Tiny preview thumbnail */}
        <div
          onClick={() => onPreview(file)}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#F4EFE6] border border-[#E8E0D3] shrink-0 overflow-hidden flex items-center justify-center cursor-pointer group-hover:border-[#C69238]"
        >
          {isImage ? (
            <img src={file.objectUrl} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
          ) : isVideo ? (
            <div className="w-full h-full bg-[#2A2826] flex items-center justify-center">
              <Film className="w-5 h-5 text-[#E8BD6D]" />
            </div>
          ) : isDocument ? (
            <FileText className="w-6 h-6 text-[#5A1626]" />
          ) : (
            <FileIcon className="w-6 h-6 text-[#7A726D]" />
          )}
        </div>

        {/* Text Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4
              onClick={() => onPreview(file)}
              title={file.name}
              className="text-sm sm:text-base font-semibold text-[#2A2826] hover:text-[#5A1626] truncate cursor-pointer transition-colors"
            >
              {file.name}
            </h4>
            <span className="hidden md:inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F4EFE6] text-[#524C49] capitalize shrink-0">
              {file.category}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#7A726D] mt-1">
            <span className="font-medium text-[#3F0E19]">{formatFileSize(file.size)}</span>
            <span>•</span>
            <span>{formatDate(file.lastModified)}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline truncate max-w-[150px]">{file.type}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8E0D3]/60">
        <button
          onClick={handleDownload}
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] rounded-lg text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-[#C69238]"
          title={`Download ${file.name}`}
          aria-label={`Download ${file.name}`}
        >
          <Download className="w-3.5 h-3.5 text-[#E8BD6D]" />
          <span>Download</span>
        </button>

        <button
          onClick={() => onPreview(file)}
          type="button"
          className="p-2 text-[#524C49] hover:text-[#3F0E19] bg-[#F4EFE6] hover:bg-[#EAE2D5] rounded-lg border border-[#E8E0D3] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#C69238]"
          title="Inspect preview"
          aria-label="Inspect preview"
        >
          <Eye className="w-4 h-4" />
        </button>

        <button
          onClick={handleRemove}
          type="button"
          className="p-2 text-[#A17120] hover:text-[#5A1626] hover:bg-[#5A1626]/10 rounded-lg transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#5A1626]"
          title="Remove from session"
          aria-label="Remove from session"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
