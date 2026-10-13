import { useState, useRef, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StageQuotesRibbon } from './components/StageQuotesRibbon';
import { EventChronicles } from './components/EventChronicles';
import { BentoShowcase } from './components/BentoShowcase';
import { PrivacyBanner } from './components/PrivacyBanner';
import { FileUploader } from './components/FileUploader';
import { FileManager } from './components/FileManager';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { VideosSection } from './components/VideosSection';
import { DocumentsSection } from './components/DocumentsSection';
import { PermanentPackagingGuide } from './components/PermanentPackagingGuide';
import { MobileDownloadGuide } from './components/MobileDownloadGuide';
import { Footer } from './components/Footer';
import { FilePreviewModal } from './components/FilePreviewModal';
import type { ArchiveFile, FileCategory } from './types/archive';
import { formatFileSize, revokeFileObjectUrl } from './utils/fileHelpers';
import { CURATED_ARCHIVE_PHOTOS } from './data/curatedArchive';

export function App() {
  // Pre-load all 403 curated high-resolution photos directly from the local project
  const [files, setFiles] = useState<ArchiveFile[]>(CURATED_ARCHIVE_PHOTOS);
  const [activeCategory, setActiveCategory] = useState<FileCategory>('photos');
  const [previewFile, setPreviewFile] = useState<ArchiveFile | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const filesRef = useRef<ArchiveFile[]>(files);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  // Cleanup object URLs on final unmount to prevent browser memory leaks
  useEffect(() => {
    return () => {
      filesRef.current.forEach((file) => {
        revokeFileObjectUrl(file);
      });
    };
  }, []);

  // Compute total archive size in session
  const totalSizeBytes = useMemo(() => {
    return files.reduce((acc, f) => acc + f.size, 0);
  }, [files]);

  const totalSizeFormatted = useMemo(() => {
    return formatFileSize(totalSizeBytes);
  }, [totalSizeBytes]);

  // Derived category lists
  const photoFiles = useMemo(() => files.filter((f) => f.category === 'photos'), [files]);
  const videoFiles = useMemo(() => files.filter((f) => f.category === 'videos'), [files]);
  const documentFiles = useMemo(() => files.filter((f) => f.category === 'documents'), [files]);

  // Handlers for modal navigation across the entire archive
  const previewIndex = useMemo(() => {
    if (!previewFile) return -1;
    return files.findIndex((f) => f.id === previewFile.id);
  }, [previewFile, files]);

  const handleNextFile = () => {
    if (previewIndex >= 0 && previewIndex < files.length - 1) {
      setPreviewFile(files[previewIndex + 1]);
    } else if (previewIndex === files.length - 1 && files.length > 0) {
      setPreviewFile(files[0]);
    }
  };

  const handlePrevFile = () => {
    if (previewIndex > 0) {
      setPreviewFile(files[previewIndex - 1]);
    } else if (previewIndex === 0 && files.length > 0) {
      setPreviewFile(files[files.length - 1]);
    }
  };

  const handleOpenAddFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFilesAdded = (newFiles: ArchiveFile[]) => {
    setFiles((prev) => [...newFiles, ...prev]);
  };

  const handleRemoveFile = (fileId: string) => {
    const fileToRemove = files.find((f) => f.id === fileId);
    if (fileToRemove) {
      revokeFileObjectUrl(fileToRemove);
    }
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    if (previewFile?.id === fileId) {
      setPreviewFile(null);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all loaded files from this browser session?')) {
      files.forEach((f) => revokeFileObjectUrl(f));
      setFiles([]);
      setPreviewFile(null);
    }
  };

  const handleBrowseArchive = () => {
    const element = document.getElementById('archive');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreGallery = () => {
    setActiveCategory('photos');
    const element = document.getElementById('photos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23201F]">
      
      {/* 1. Header Navigation */}
      <Header
        fileCount={files.length}
        onOpenAddFiles={handleOpenAddFiles}
      />

      <main className="flex-1">
        {/* 2. Hero Section with Carousel of Actual Photos */}
        <Hero
          fileCount={files.length}
          totalSizeFormatted={totalSizeFormatted}
          onOpenAddFiles={handleOpenAddFiles}
          onBrowseArchive={handleBrowseArchive}
          onExploreGallery={handleExploreGallery}
          onPreviewPhoto={(file) => setPreviewFile(file)}
        />

        {/* 3. Stage Quotes & Sacred Heart Motto Ribbon */}
        <StageQuotesRibbon />

        {/* 4. Event Chronicles (4-Chapter Interactive Timeline) */}
        <EventChronicles
          allFiles={files}
          onPreviewPhoto={(file) => setPreviewFile(file)}
        />

        {/* 5. Asymmetric Bento Grid Highlights */}
        <BentoShowcase
          allFiles={files}
          onPreviewPhoto={(file) => setPreviewFile(file)}
        />

        {/* 6. Master Photo Gallery Section */}
        <PhotoGallerySection
          photos={photoFiles}
          onPreview={(photo) => setPreviewFile(photo)}
          onOpenAddFiles={handleOpenAddFiles}
        />

        {/* 7. Comprehensive Archive Manager (Table/Grid, Search, Batch Download) */}
        <FileManager
          files={files}
          onOpenAddFiles={handleOpenAddFiles}
          onPreviewFile={(file) => setPreviewFile(file)}
          onRemoveFile={handleRemoveFile}
          onClearAll={handleClearAll}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />

        {/* 8. Videos Section (shown when videos exist) */}
        {videoFiles.length > 0 && (
          <VideosSection
            videos={videoFiles}
            onPreview={(video) => setPreviewFile(video)}
            onOpenAddFiles={handleOpenAddFiles}
          />
        )}

        {/* 9. Documents Section (shown when documents exist) */}
        {documentFiles.length > 0 && (
          <DocumentsSection
            documents={documentFiles}
            onPreview={(doc) => setPreviewFile(doc)}
            onOpenAddFiles={handleOpenAddFiles}
          />
        )}

        {/* 10. Strict Frontend Architecture & Session Notice */}
        <PrivacyBanner />

        {/* 11. Add Files Dropzone & Device Picker */}
        <section id="upload" aria-label="Upload files" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <FileUploader
            onFilesAdded={handleFilesAdded}
            fileInputRef={fileInputRef}
          />
        </section>

        {/* 12. Permanent Static Packaging Instructions */}
        <PermanentPackagingGuide />

        {/* 13. Mobile Phone & Tablet Download Instructions */}
        <MobileDownloadGuide />
      </main>

      {/* 14. Footer */}
      <Footer />

      {/* 15. Full-Screen Preview Lightbox with Carousel Controls */}
      <FilePreviewModal
        file={previewFile}
        onClose={() => setPreviewFile(null)}
        onNext={handleNextFile}
        onPrev={handlePrevFile}
        currentIndex={previewIndex >= 0 ? previewIndex : undefined}
        totalCount={files.length}
      />

    </div>
  );
}

export default App;
