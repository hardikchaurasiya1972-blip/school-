import React from 'react';
import { Sparkles, Eye, Download, Camera } from 'lucide-react';
import type { ArchiveFile } from '../types/archive';
import { triggerFileDownload } from '../utils/fileHelpers';

interface BentoShowcaseProps {
  onPreviewPhoto: (file: ArchiveFile) => void;
  allFiles: ArchiveFile[];
}

export const BentoShowcase: React.FC<BentoShowcaseProps> = ({ onPreviewPhoto, allFiles }) => {
  const getFile = (url: string, title: string, tag: string): ArchiveFile => {
    const filename = url.split('/').pop() || '';
    const found = allFiles.find((f) => f.name.toLowerCase() === filename.toLowerCase());
    if (found) return found;
    return {
      id: 'bento-' + filename,
      name: filename,
      size: 2000000,
      type: 'image/jpeg',
      lastModified: 1630721292000,
      category: 'photos',
      objectUrl: url,
      downloadUrl: url,
      momentTitle: title,
      tags: [tag],
    };
  };

  const bentoItems = [
    {
      url: '/phone/IMG_20210904_111930.jpg',
      title: 'Sacred Heart Faculty Grand Portrait',
      tag: 'Faculty & Mentors',
      colSpan: 'md:col-span-2 md:row-span-2',
      aspectRatio: 'aspect-4/3 md:aspect-auto md:h-full',
      badge: 'Iconic Gathering',
    },
    {
      url: '/phone/IMG_20210904_103425.jpg',
      title: 'Panoramic Silver Jubilee Celebration Stage',
      tag: 'Milestone Stage',
      colSpan: 'md:col-span-2',
      aspectRatio: 'aspect-16/9',
      badge: 'Silver Jubilee',
    },
    {
      url: '/cam/DSC01820.JPG',
      title: 'Auspicious Diya Lighting by Sister Superiors & Mentors',
      tag: 'Sacred Invocation',
      colSpan: 'md:col-span-1',
      aspectRatio: 'aspect-4/3',
      badge: 'Diya Ceremony',
    },
    {
      url: '/cam/DSC01940.JPG',
      title: 'Sacred Heart Rose Presentation Choir',
      tag: 'Vocal Ensemble',
      colSpan: 'md:col-span-1',
      aspectRatio: 'aspect-4/3',
      badge: 'Rose Tribute',
    },
    {
      url: '/phone/IMG_20210904_105435.jpg',
      title: 'Backstage Corridor: Classmates in Festive Costumes',
      tag: 'Classmate Memories',
      colSpan: 'md:col-span-1',
      aspectRatio: 'aspect-4/3',
      badge: 'Backstage',
    },
    {
      url: '/cam/DSC01825.JPG',
      title: 'Graceful Classical Prayer Dance Performance',
      tag: 'Cultural Stage',
      colSpan: 'md:col-span-1',
      aspectRatio: 'aspect-4/3',
      badge: 'Prayer Dance',
    },
  ];

  return (
    <section id="highlights" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8E0D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C69238]/15 text-[#A17120] text-xs font-semibold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Curated Visual Highlights</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#3F0E19]">
              Moments That Defined The Day
            </h2>
            <p className="text-sm sm:text-base text-[#524C49] mt-1">
              Hand-picked captures spotlighting the dignity, artistry, and fellowship of Sacred Heart.
            </p>
          </div>

          <div className="text-xs text-[#7A726D] flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-[#C69238]" />
            <span>Click any frame for high-res zoom &amp; download</span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {bentoItems.map((item, index) => {
            const file = getFile(item.url, item.title, item.tag);
            return (
              <div
                key={index}
                className={`group relative rounded-3xl overflow-hidden bg-[#23201F] border border-[#E8E0D3] hover:border-[#C69238] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-end ${item.colSpan}`}
              >
                {/* Background Image Container */}
                <div
                  className={`w-full ${item.aspectRatio} overflow-hidden cursor-pointer relative`}
                  onClick={() => onPreviewPhoto(file)}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#23201F]/90 via-[#23201F]/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#3F0E19]/90 text-[#E8BD6D] border border-[#C69238]/40 text-xs font-semibold shadow-xs">
                      <Sparkles className="w-3 h-3" />
                      <span>{item.badge}</span>
                    </span>
                  </div>

                  {/* Action Icons on hover */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerFileDownload(file);
                      }}
                      className="p-2 rounded-xl bg-black/60 hover:bg-[#5A1626] text-white border border-white/20 shadow-md transition-colors"
                      title="Download photo"
                    >
                      <Download className="w-4 h-4 text-[#E8BD6D]" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreviewPhoto(file);
                      }}
                      className="p-2 rounded-xl bg-black/60 hover:bg-[#5A1626] text-white border border-white/20 shadow-md transition-colors"
                      title="Expand preview"
                    >
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <span className="font-cinzel text-[11px] text-[#E8BD6D] font-bold tracking-wider uppercase block mb-1">
                      {item.tag}
                    </span>
                    <h3 className="font-serif-display text-base sm:text-lg font-bold text-[#FAF7F2] drop-shadow-sm leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
