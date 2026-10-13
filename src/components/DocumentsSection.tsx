import React from 'react';
import { FileText, Download, Eye, PlusCircle } from 'lucide-react';
import type { ArchiveFile } from '../types/archive';
import { formatFileSize, formatDate, triggerFileDownload } from '../utils/fileHelpers';

interface DocumentsSectionProps {
  documents: ArchiveFile[];
  onPreview: (file: ArchiveFile) => void;
  onOpenAddFiles: () => void;
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  documents,
  onPreview,
  onOpenAddFiles,
}) => {
  return (
    <section id="documents" className="py-14 sm:py-20 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6]/50 to-[#FAF7F2] border-t border-b border-[#E8E0D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C69238]/15 text-[#A17120] text-xs font-semibold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Written Heritage</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#3F0E19]">
              Heirloom Documents &amp; Records
            </h2>
            <p className="text-sm sm:text-base text-[#524C49] mt-1">
              Family certificates, letters, genealogies, scrapbooks, and preserved historical papers.
            </p>
          </div>

          {documents.length > 0 && (
            <span className="text-xs font-semibold text-[#5A1626] bg-[#5A1626]/10 px-3 py-1.5 rounded-full border border-[#5A1626]/20 self-start sm:self-auto">
              {documents.length} {documents.length === 1 ? 'Document' : 'Documents'}
            </span>
          )}
        </div>

        {/* Documents Content */}
        {documents.length === 0 ? (
          /* Empty State for Documents */
          <div className="border border-dashed border-[#D8CEBE] rounded-3xl bg-[#FDFCF9] p-10 sm:p-14 text-center">
            <div className="max-w-md mx-auto flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-[#5A1626]/10 border border-[#5A1626]/20 flex items-center justify-center mb-5">
                <FileText className="w-8 h-8 text-[#5A1626]" />
              </div>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#3F0E19] mb-2">
                No Documents in Archive
              </h3>
              <p className="text-sm text-[#524C49] mb-6 leading-relaxed">
                No documents or genealogical records have been added yet. Add PDF documents, word transcripts, or scanned certificates to browse and download them here.
              </p>
              <button
                onClick={onOpenAddFiles}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] font-semibold text-sm rounded-xl shadow-xs transition-all active:scale-95"
              >
                <PlusCircle className="w-4 h-4 text-[#E8BD6D]" />
                <span>Add Documents</span>
              </button>
            </div>
          </div>
        ) : (
          /* Documents Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="group bg-[#FDFCF9] rounded-2xl p-5 border border-[#E8E0D3] hover:border-[#C69238] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#5A1626]/10 text-[#5A1626] border border-[#5A1626]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-sm sm:text-base text-[#2A2826] truncate" title={doc.name}>
                      {doc.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-[#7A726D] mt-1">
                      <span className="font-semibold text-[#524C49]">{formatFileSize(doc.size)}</span>
                      <span>•</span>
                      <span>{formatDate(doc.lastModified)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E8E0D3] flex items-center gap-2">
                  <button
                    onClick={() => triggerFileDownload(doc)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#E8BD6D]" />
                    <span>Download PDF/Doc</span>
                  </button>

                  <button
                    onClick={() => onPreview(doc)}
                    className="p-2.5 text-[#524C49] hover:text-[#3F0E19] bg-[#F4EFE6] hover:bg-[#EAE2D5] rounded-xl border border-[#E8E0D3] transition-colors"
                    title="Preview document"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
