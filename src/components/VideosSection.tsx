import React from 'react';
import { Film, Download, Play, PlusCircle } from 'lucide-react';
import type { ArchiveFile } from '../types/archive';
import { formatFileSize, triggerFileDownload } from '../utils/fileHelpers';

interface VideosSectionProps {
  videos: ArchiveFile[];
  onPreview: (file: ArchiveFile) => void;
  onOpenAddFiles: () => void;
}

export const VideosSection: React.FC<VideosSectionProps> = ({
  videos,
  onPreview,
  onOpenAddFiles,
}) => {
  return (
    <section id="videos" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A1626]/10 text-[#5A1626] text-xs font-semibold uppercase tracking-wider mb-2">
            <Film className="w-3.5 h-3.5 text-[#C69238]" />
            <span>Moving Pictures</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#3F0E19]">
            Family Video Archive
          </h2>
          <p className="text-sm sm:text-base text-[#524C49] mt-1">
            Recorded celebrations, anniversary speeches, weddings, and oral history recordings.
          </p>
        </div>

        {videos.length > 0 && (
          <span className="text-xs font-semibold text-[#5A1626] bg-[#5A1626]/10 px-3 py-1.5 rounded-full border border-[#5A1626]/20 self-start sm:self-auto">
            {videos.length} {videos.length === 1 ? 'Video' : 'Videos'}
          </span>
        )}
      </div>

      {/* Video Content */}
      {videos.length === 0 ? (
        /* Empty State for Videos */
        <div className="border border-dashed border-[#D8CEBE] rounded-3xl bg-[#FDFCF9] p-10 sm:p-14 text-center">
          <div className="max-w-md mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#5A1626]/10 border border-[#5A1626]/20 flex items-center justify-center mb-5">
              <Film className="w-8 h-8 text-[#5A1626]" />
            </div>
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#3F0E19] mb-2">
              No Video Recordings Loaded
            </h3>
            <p className="text-sm text-[#524C49] mb-6 leading-relaxed">
              No video files have been added to this archive session. Select MP4, WebM, or MOV video clips to play and download them here.
            </p>
            <button
              onClick={onOpenAddFiles}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] font-semibold text-sm rounded-xl shadow-xs transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-[#E8BD6D]" />
              <span>Add Videos</span>
            </button>
          </div>
        </div>
      ) : (
        /* Video Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group bg-[#FDFCF9] rounded-2xl overflow-hidden border border-[#E8E0D3] hover:border-[#C69238] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Video Thumbnail / Player preview */}
              <div
                onClick={() => onPreview(video)}
                className="relative aspect-video bg-[#23201F] cursor-pointer overflow-hidden flex items-center justify-center"
              >
                <video
                  src={video.objectUrl}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                  preload="metadata"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-[#5A1626]/90 border-2 border-[#E8BD6D] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-[#E8BD6D] fill-[#E8BD6D] ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Video Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-medium text-base text-[#2A2826] truncate" title={video.name}>
                    {video.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#7A726D] mt-1">
                    <span className="font-semibold text-[#524C49]">{formatFileSize(video.size)}</span>
                    <span>•</span>
                    <span className="truncate">{video.type || 'video/mp4'}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E0D3] flex items-center gap-2">
                  <button
                    onClick={() => triggerFileDownload(video)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#E8BD6D]" />
                    <span>Download Video</span>
                  </button>

                  <button
                    onClick={() => onPreview(video)}
                    className="px-3 py-2.5 bg-[#F4EFE6] hover:bg-[#EAE2D5] text-[#3F0E19] text-xs font-semibold rounded-xl border border-[#E8E0D3] transition-colors"
                  >
                    Play
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};
