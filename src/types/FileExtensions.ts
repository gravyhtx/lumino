// ~/types/FileExtensions.ts

/**
 * Image file extensions
 */
export type ImageFormat =
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'gif'
  | 'webp'
  | 'bmp'
  | 'tiff'
  | 'svg'
  | 'ico'
  | 'heic'
  | 'heif';

/**
 * Image MIME types
 */
export type ImageMIMEType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'image/webp'
  | 'image/bmp'
  | 'image/tiff'
  | 'image/svg+xml'
  | 'image/x-icon'
  | 'image/heic'
  | 'image/heif';

/**
 * Audio file extensions
 */
export type AudioFormat =
  | 'mp3'
  | 'wav'
  | 'aac'
  | 'ogg'
  | 'flac'
  | 'alac'
  | 'aiff'
  | 'wma'
  | 'm4a';

/**
 * Audio MIME types
 */
export type AudioMIMEType =
  | 'audio/mpeg'
  | 'audio/wav'
  | 'audio/aac'
  | 'audio/ogg'
  | 'audio/flac'
  | 'audio/x-m4a'
  | 'audio/aiff'
  | 'audio/x-ms-wma';

/**
 * Video file extensions
 */
export type VideoFormat =
  | 'mp4'
  | 'mov'
  | 'avi'
  | 'wmv'
  | 'flv'
  | 'mkv'
  | 'webm'
  | '3gp'
  | '3g2';

/**
 * Video MIME types
 */
export type VideoMIMEType =
  | 'video/mp4'
  | 'video/quicktime'
  | 'video/x-msvideo'
  | 'video/x-ms-wmv'
  | 'video/x-flv'
  | 'video/x-matroska'
  | 'video/webm'
  | 'video/3gpp'
  | 'video/3gpp2';

/**
 * Document file extensions
 */
export type DocumentFormat =
  | 'pdf'
  | 'doc'
  | 'docx'
  | 'xls'
  | 'xlsx'
  | 'ppt'
  | 'pptx'
  | 'txt'
  | 'rtf';

/**
 * Document MIME types
 */
export type DocumentMIMEType =
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/vnd.ms-powerpoint'
  | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  | 'text/plain'
  | 'application/rtf';

/**
 * Compressed file extensions
 */
export type CompressedFormat = 'zip' | 'rar' | '7z' | 'tar' | 'gz' | 'bz2';

/**
 * Compressed MIME types
 */
export type CompressedMIMEType =
  | 'application/zip'
  | 'application/x-rar-compressed'
  | 'application/x-7z-compressed'
  | 'application/x-tar'
  | 'application/gzip'
  | 'application/x-bzip2';

/**
 * File types
 */
export type FileTypes = 'images' | 'video' | 'audio' | 'documents' | 'compressed';