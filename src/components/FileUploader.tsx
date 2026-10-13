import React, { useRef, useState } from 'react';
import { UploadCloud, FolderUp, CheckCircle, ShieldAlert } from 'lucide-react';
import type { ArchiveFile } from '../types/archive';
import { categorizeFile } from '../utils/fileHelpers';

interface FileUploaderProps {
  onFilesAdded: (newFiles: ArchiveFile[]) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFilesAdded, fileInputRef }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const localInputRef = useRef<HTMLInputElement | null>(null);

  // Use either the shared ref or local ref
  const activeInputRef = fileInputRef || localInputRef;

  const handleFileSelection = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const added: ArchiveFile[] = [];

    Array.from(fileList).forEach((file) => {
      // Create object URL for client-side preview and real download
      const objectUrl = URL.createObjectURL(file);
      const category = categorizeFile(file);

      added.push({
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        lastModified: file.lastModified || Date.now(),
        category,
        objectUrl,
        rawFile: file,
        isBundled: false,
      });
    });

    if (added.length > 0) {
      onFilesAdded(added);
      setNotification(`Added ${added.length} ${added.length === 1 ? 'file' : 'files'} to this browser session.`);
      setTimeout(() => setNotification(null), 4000);
    }

    // Reset input value so same files can be re-selected if removed
    if (activeInputRef.current) {
      activeInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer && e.dataTransfer.files) {
      handleFileSelection(e.dataTransfer.files);
    }
  };

  return (
    <div className="w-full">
      {/* Hidden real native HTML file input */}
      <input
        type="file"
        ref={activeInputRef}
        onChange={(e) => handleFileSelection(e.target.files)}
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,video/mp4,video/webm,video/quicktime,application/pdf,text/plain,.doc,.docx"
        className="hidden"
        id="native-family-file-input"
        aria-label="Select family files from device"
      />

      {/* Elegant Dropzone Card */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => activeInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 ${
          isDragging
            ? 'border-[#C69238] bg-[#F6ECCF]/40 scale-[1.01] shadow-lg ring-4 ring-[#C69238]/20'
            : 'border-[#D8CEBE] hover:border-[#C69238] bg-[#FDFCF9] hover:bg-[#FAF7F2] shadow-xs hover:shadow-md'
        }`}
      >
        <div className="max-w-xl mx-auto flex flex-col items-center">
          {/* Emblem Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#5A1626]/10 border border-[#5A1626]/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#5A1626]/15 transition-all duration-300">
            {isDragging ? (
              <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-[#C69238] animate-bounce" />
            ) : (
              <FolderUp className="w-8 h-8 sm:w-10 sm:h-10 text-[#5A1626]" />
            )}
          </div>

          <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#3F0E19] mb-2">
            Select or Drop Family Files
          </h3>

          <p className="text-sm sm:text-base text-[#524C49] mb-6 leading-relaxed">
            Choose photos, heirloom videos, or documents from your phone or computer to preview and download directly.
          </p>

          <button
            type="button"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] rounded-xl font-medium text-sm sm:text-base shadow-sm group-hover:shadow-md transition-all pointer-events-none"
          >
            <FolderUp className="w-5 h-5 text-[#E8BD6D]" />
            <span>Browse Device Files</span>
          </button>

          {/* Supported formats label */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-[#7A726D]">
            <span className="px-2.5 py-1 rounded-md bg-[#F4EFE6] font-medium text-[#524C49]">JPG, PNG, WebP</span>
            <span className="px-2.5 py-1 rounded-md bg-[#F4EFE6] font-medium text-[#524C49]">MP4, WebM Videos</span>
            <span className="px-2.5 py-1 rounded-md bg-[#F4EFE6] font-medium text-[#524C49]">PDF Documents</span>
            <span className="px-2.5 py-1 rounded-md bg-[#F4EFE6] font-medium text-[#524C49]">Word &amp; Text</span>
          </div>

          {/* Genuine Session Clarification */}
          <div className="mt-5 flex items-center gap-2 text-xs text-[#7A726D]">
            <ShieldAlert className="w-4 h-4 text-[#C69238] shrink-0" />
            <span>Files remain strictly in this browser session. Nothing is sent to any server.</span>
          </div>
        </div>
      </div>

      {/* Real-time notification if files were added */}
      {notification && (
        <div className="mt-4 p-3 rounded-xl bg-[#5A1626]/10 border border-[#5A1626]/20 text-[#3F0E19] text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <CheckCircle className="w-4 h-4 text-[#5A1626] shrink-0" />
          <span>{notification}</span>
          <span className="text-xs text-[#7A726D] ml-auto hidden sm:inline">Active in current session</span>
        </div>
      )}
    </div>
  );
};
