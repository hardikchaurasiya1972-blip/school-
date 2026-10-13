import React, { useState } from 'react';
import { Sparkles, Eye, Download, Calendar, ArrowRight, Flame, Award, Music, Users } from 'lucide-react';
import type { ArchiveFile } from '../types/archive';
import { triggerFileDownload } from '../utils/fileHelpers';

interface EventChroniclesProps {
  onPreviewPhoto: (file: ArchiveFile) => void;
  allFiles: ArchiveFile[];
}

interface ChronicleStory {
  id: string;
  pillar: string;
  icon: React.FC<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  quote: string;
  primaryImage: string;
  supportingImages: string[];
}

export const EventChronicles: React.FC<EventChroniclesProps> = ({ onPreviewPhoto, allFiles }) => {
  const [activeStoryId, setActiveStoryId] = useState<string>('diya-lighting');

  const stories: ChronicleStory[] = [
    {
      id: 'diya-lighting',
      pillar: 'Chapter I',
      icon: Flame,
      title: 'Auspicious Diya Lighting & Prayer',
      subtitle: 'Solemn Invocation & Traditional Blessing',
      description:
        'The morning assembly began with reverent prayer as the Sister Superiors, Headmistress, and senior faculty gathered around the ceremonial brass diya. With folded hands and floral greetings, the sacred flame was ignited, filling the courtyard with peace, gratitude, and divine blessing.',
      quote: '“Where there is light, wisdom blossoms.”',
      primaryImage: '/cam/DSC01820.JPG',
      supportingImages: ['/cam/DSC01825.JPG', '/cam/DSC01830.JPG'],
    },
    {
      id: 'silver-jubilee',
      pillar: 'Chapter II',
      icon: Award,
      title: 'Silver Jubilee Felicitation',
      subtitle: 'Honoring Richa Ma\'am & Neeta Ma\'am (25 Years)',
      description:
        'A quarter-century of selfless dedication, compassion, and academic guidance. The entire school community gave a standing ovation as Richa Ma\'am and Neeta Ma\'am were honored with ceremonial shawls, bouquets, and commemorative citations on the festive stage.',
      quote: '“A teacher affects eternity; he can never tell where his influence stops.”',
      primaryImage: '/phone/IMG_20210904_100932.jpg',
      supportingImages: ['/phone/IMG_20210904_103425.jpg', '/phone/IMG_20210904_104640.jpg'],
    },
    {
      id: 'cultural-stage',
      pillar: 'Chapter III',
      icon: Music,
      title: 'Cultural Extravaganza & Choir',
      subtitle: 'Roses, Melodies, Drama & Energetic Dances',
      description:
        'Students showcased diverse talents across the morning. From the angelic rose presentation choir accompanied by live synthesizer, to the hilarious classroom parody skit that brought tears of laughter to the teachers, concluding with high-energy dance performances.',
      quote: '“Though you wrote in chalk, you brightened our lives.”',
      primaryImage: '/cam/DSC01940.JPG',
      supportingImages: ['/cam/DSC01860.JPG', '/cam/DSC01949.JPG', '/cam/DSC01900.JPG'],
    },
    {
      id: 'faculty-bonds',
      pillar: 'Chapter IV',
      icon: Users,
      title: 'The Sacred Heart Faculty & Comrades',
      subtitle: 'Grand Faculty Portrait & Backstage Brotherhood',
      description:
        'Dressed in vibrant silk sarees, the revered educators of Sacred Heart Convent School assembled for the grand annual portrait. Along the corridors, classmates in traditional Garba lehengas and uniforms laughed, took selfies, and cemented memories for a lifetime.',
      quote: '“Teachers plant the seeds of knowledge that will grow forever.”',
      primaryImage: '/phone/IMG_20210904_111930.jpg',
      supportingImages: ['/phone/IMG_20210904_105435.jpg', '/phone/IMG_20210904_111825.jpg'],
    },
  ];

  const currentStory = stories.find((s) => s.id === activeStoryId) || stories[0];

  const findFileByUrl = (url: string): ArchiveFile => {
    const filename = url.split('/').pop() || '';
    const match = allFiles.find((f) => f.name.toLowerCase() === filename.toLowerCase());
    if (match) return match;
    return {
      id: 'story-' + filename,
      name: filename,
      size: 1500000,
      type: 'image/jpeg',
      lastModified: 1630721292000,
      category: 'photos',
      objectUrl: url,
      downloadUrl: url,
      momentTitle: currentStory.title,
      momentDescription: currentStory.description,
    };
  };

  return (
    <section id="chronicles" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6]/50 to-[#FAF7F2] border-b border-[#E8E0D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5A1626]/10 text-[#5A1626] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C69238]" />
            <span>Chronicles of 4th September 2021</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3F0E19] mb-4">
            Milestones of Our Celebration
          </h2>
          <p className="text-base sm:text-lg text-[#524C49] font-cormorant italic">
            &ldquo;From the traditional morning diya lighting to the Silver Jubilee honors and grand faculty portraits, explore the key chapters of our historic day.&rdquo;
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {stories.map((story) => {
            const Icon = story.icon;
            const isActive = story.id === activeStoryId;
            return (
              <button
                key={story.id}
                onClick={() => setActiveStoryId(story.id)}
                className={`p-4 sm:p-5 rounded-2xl text-left border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#FDFCF9] border-[#C69238] shadow-lg scale-[1.02] ring-2 ring-[#C69238]/30'
                    : 'bg-[#FAF7F2]/80 border-[#E8E0D3] hover:border-[#C69238]/60 hover:bg-[#FDFCF9]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-cinzel text-xs font-bold text-[#A17120] uppercase tracking-wider">
                      {story.pillar}
                    </span>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#5A1626]' : 'text-[#7A726D]'}`} />
                  </div>
                  <h3 className="font-serif-display text-sm sm:text-base font-bold text-[#3F0E19] line-clamp-1">
                    {story.title}
                  </h3>
                </div>
                <span className={`text-xs mt-3 flex items-center gap-1 font-semibold ${isActive ? 'text-[#5A1626]' : 'text-[#7A726D]'}`}>
                  <span>View Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Showcase Card */}
        <div className="bg-[#FDFCF9] rounded-3xl border border-[#C69238]/40 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Story Details & Supporting Images */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FAF7F2] border border-[#E8E0D3] text-xs font-semibold text-[#A17120] uppercase tracking-wider mb-3">
                  <Calendar className="w-3 h-3" />
                  <span>{currentStory.pillar} • Sacred Heart Event Chronicle</span>
                </div>
                
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#3F0E19] mb-2 leading-tight">
                  {currentStory.title}
                </h3>

                <p className="font-cinzel text-xs text-[#A17120] font-semibold tracking-wider mb-4">
                  {currentStory.subtitle}
                </p>

                <p className="text-sm sm:text-base text-[#524C49] leading-relaxed mb-6 font-sans">
                  {currentStory.description}
                </p>

                <blockquote className="border-l-3 border-[#C69238] pl-4 italic text-sm text-[#3F0E19] bg-[#FAF7F2] py-2 rounded-r-xl">
                  {currentStory.quote}
                </blockquote>
              </div>

              {/* Supporting Thumbnails */}
              <div>
                <span className="block text-xs font-semibold text-[#7A726D] uppercase tracking-wider mb-2">
                  Related Chapter Captures
                </span>
                <div className="flex items-center gap-3">
                  {currentStory.supportingImages.map((imgUrl, i) => {
                    const f = findFileByUrl(imgUrl);
                    return (
                      <div
                        key={i}
                        onClick={() => onPreviewPhoto(f)}
                        className="group relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden border border-[#D8CEBE] hover:border-[#C69238] shadow-xs cursor-pointer transition-transform hover:scale-105"
                      >
                        <img
                          src={imgUrl}
                          alt={`${currentStory.title} capture ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="w-4 h-4 text-[#E8BD6D]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Primary Hero Showcase Image */}
            <div className="lg:col-span-7">
              {(() => {
                const primaryFile = findFileByUrl(currentStory.primaryImage);
                return (
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#E8E0D3] hover:border-[#C69238] shadow-lg group bg-[#23201F]">
                    <div
                      className="relative aspect-16/10 overflow-hidden cursor-pointer"
                      onClick={() => onPreviewPhoto(primaryFile)}
                    >
                      <img
                        src={currentStory.primaryImage}
                        alt={currentStory.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 text-white">
                        <span className="text-xs font-semibold">Click to open full resolution view</span>
                        <Eye className="w-5 h-5 text-[#E8BD6D]" />
                      </div>
                    </div>

                    {/* Bottom Action Strip on Primary Card */}
                    <div className="p-4 bg-[#FAF7F2] border-t border-[#E8E0D3] flex items-center justify-between gap-4">
                      <div className="truncate">
                        <span className="block font-medium text-xs sm:text-sm text-[#23201F] truncate">
                          {primaryFile.name}
                        </span>
                        <span className="text-xs text-[#7A726D]">High-Resolution Primary Event Capture</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onPreviewPhoto(primaryFile)}
                          className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#F4EFE6] border border-[#D8CEBE] text-[#3F0E19] text-xs font-medium transition-colors"
                          title="Preview full size"
                        >
                          <Eye className="w-4 h-4 text-[#A17120]" />
                        </button>
                        <button
                          onClick={() => triggerFileDownload(primaryFile)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#5A1626] hover:bg-[#47101D] text-[#FAF7F2] text-xs font-semibold rounded-lg shadow-xs transition-colors"
                        >
                          <Download className="w-3.5 h-3.5 text-[#E8BD6D]" />
                          <span>Download Photo</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })()}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
