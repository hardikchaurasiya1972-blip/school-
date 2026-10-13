export type FileCategory = 'all' | 'photos' | 'videos' | 'documents' | 'other';

export type SubCategory = 'all' | 'ceremony' | 'jubilee' | 'performances' | 'teachers' | 'classmates';

export type SortField = 'date-newest' | 'date-oldest' | 'name-asc' | 'name-desc' | 'size-asc' | 'size-desc';

export type ViewMode = 'grid' | 'masonry' | 'list';

export interface ArchiveFile {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  category: FileCategory;
  objectUrl: string;
  isBundled?: boolean;
  downloadUrl?: string;
  rawFile?: File;
  // Rich photo metadata
  momentTitle?: string;
  momentDescription?: string;
  subCategory?: 'ceremony' | 'jubilee' | 'performances' | 'teachers' | 'classmates';
  featured?: boolean;
  source?: string;
  width?: number;
  height?: number;
  aspect?: 'landscape' | 'portrait';
  tags?: string[];
}

