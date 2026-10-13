import type { ArchiveFile, FileCategory } from '../types/archive';

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const val = parseFloat((bytes / Math.pow(k, i)).toFixed(1));
  return `${val} ${sizes[i]}`;
}

export function formatDate(timestamp: number): string {
  if (!timestamp) return 'Unknown date';
  const d = new Date(timestamp);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function categorizeFile(file: File): FileCategory {
  const mime = (file.type || '').toLowerCase();
  const name = (file.name || '').toLowerCase();

  if (
    mime.startsWith('image/') ||
    name.endsWith('.jpg') ||
    name.endsWith('.jpeg') ||
    name.endsWith('.png') ||
    name.endsWith('.webp') ||
    name.endsWith('.gif') ||
    name.endsWith('.svg') ||
    name.endsWith('.heic') ||
    name.endsWith('.bmp')
  ) {
    return 'photos';
  }

  if (
    mime.startsWith('video/') ||
    name.endsWith('.mp4') ||
    name.endsWith('.webm') ||
    name.endsWith('.mov') ||
    name.endsWith('.avi') ||
    name.endsWith('.mkv') ||
    name.endsWith('.m4v')
  ) {
    return 'videos';
  }

  if (
    mime === 'application/pdf' ||
    mime.includes('document') ||
    mime.includes('text/') ||
    mime.includes('msword') ||
    mime.includes('officedocument') ||
    name.endsWith('.pdf') ||
    name.endsWith('.doc') ||
    name.endsWith('.docx') ||
    name.endsWith('.txt') ||
    name.endsWith('.rtf')
  ) {
    return 'documents';
  }

  return 'other';
}

/**
 * Triggers a real, native browser download for an archive file.
 * Handles both local session blob/object URLs and bundled static assets.
 */
export function triggerFileDownload(file: ArchiveFile): boolean {
  try {
    const downloadUrl = file.downloadUrl || file.objectUrl;
    if (!downloadUrl) {
      console.error('No download URL available for file:', file.name);
      return false;
    }

    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = file.name;
    anchor.rel = 'noopener noreferrer';
    anchor.style.display = 'none';

    document.body.appendChild(anchor);
    anchor.click();

    // Clean up anchor element immediately
    setTimeout(() => {
      document.body.removeChild(anchor);
    }, 150);

    return true;
  } catch (err) {
    console.error('Failed to trigger download for file:', file.name, err);
    return false;
  }
}

/**
 * Revokes object URLs to prevent browser memory leaks
 */
export function revokeFileObjectUrl(file: ArchiveFile): void {
  if (file.objectUrl && !file.isBundled && file.objectUrl.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(file.objectUrl);
    } catch (err) {
      console.warn('Error revoking object URL:', err);
    }
  }
}
