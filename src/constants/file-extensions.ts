// ~/constants/file-extensions.ts
import type {
  ImageFormat,
  ImageMIMEType,
  AudioFormat,
  AudioMIMEType,
  VideoFormat,
  VideoMIMEType,
  DocumentFormat,
  DocumentMIMEType,
  CompressedFormat,
  CompressedMIMEType,
} from '~/types/FileExtensions';

export const fileExtensions = {
  image: {
    ext: [
      'jpg',
      'jpeg',
      'png',
      'gif',
      'webp',
      'bmp',
      'tiff',
      'svg',
      'ico',
      'heic',
      'heif',
    ] as ImageFormat[],
    mime: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp',
      'image/tiff',
      'image/svg+xml',
      'image/x-icon',
      'image/heic',
      'image/heif',
    ] as ImageMIMEType[],
  },
  audio: {
    ext: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'alac', 'aiff', 'wma', 'm4a'] as AudioFormat[],
    mime: [
      'audio/mpeg',
      'audio/wav',
      'audio/aac',
      'audio/ogg',
      'audio/flac',
      'audio/x-m4a',
      'audio/aiff',
      'audio/x-ms-wma',
    ] as AudioMIMEType[],
  },
  video: {
    ext: ['mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'webm', '3gp', '3g2'] as VideoFormat[],
    mime: [
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo',
      'video/x-ms-wmv',
      'video/x-flv',
      'video/x-matroska',
      'video/webm',
      'video/3gpp',
      'video/3gpp2',
    ] as VideoMIMEType[],
  },
  document: {
    ext: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf'] as DocumentFormat[],
    mime: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'application/rtf',
    ] as DocumentMIMEType[],
  },
  compressed: {
    ext: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'] as CompressedFormat[],
    mime: [
      'application/zip',
      'application/x-rar-compressed',
      'application/x-7z-compressed',
      'application/x-tar',
      'application/gzip',
      'application/x-bzip2',
    ] as CompressedMIMEType[],
  },
} as const;

export const allExtensions = [
  ...fileExtensions.image.ext,
  ...fileExtensions.audio.ext,
  ...fileExtensions.video.ext,
  ...fileExtensions.document.ext,
  ...fileExtensions.compressed.ext,
] as const;

export const allMIMETypes = [
  ...fileExtensions.image.mime,
  ...fileExtensions.audio.mime,
  ...fileExtensions.video.mime,
  ...fileExtensions.document.mime,
  ...fileExtensions.compressed.mime,
] as const;

export const imageExtensionsRegex = new RegExp(`\\.(${fileExtensions.image.ext.join('|')})$`, 'i');
export const audioExtensionsRegex = new RegExp(`\\.(${fileExtensions.audio.ext.join('|')})$`, 'i');
export const videoExtensionsRegex = new RegExp(`\\.(${fileExtensions.video.ext.join('|')})$`, 'i');
export const documentExtensionsRegex = new RegExp(`\\.(${fileExtensions.document.ext.join('|')})$`, 'i');
export const compressedExtensionsRegex = new RegExp(`\\.(${fileExtensions.compressed.ext.join('|')})$`, 'i');
export const allExtensionsRegex = new RegExp(`\\.(${allExtensions.join('|')})$`, 'i');

export const imageMIMETypesRegex = new RegExp(`(${fileExtensions.image.mime.join('|')})`, 'i');
export const audioMIMETypesRegex = new RegExp(`(${fileExtensions.audio.mime.join('|')})`, 'i');
export const videoMIMETypesRegex = new RegExp(`(${fileExtensions.video.mime.join('|')})`, 'i');
export const documentMIMETypesRegex = new RegExp(`(${fileExtensions.document.mime.join('|')})`, 'i');
export const compressedMIMETypesRegex = new RegExp(`(${fileExtensions.compressed.mime.join('|')})`, 'i');
export const allMIMETypesRegex = new RegExp(`(${allMIMETypes.join('|')})`, 'i');

export const FILE_EXTENSIONS_REGEX = {
  all: allExtensionsRegex,
  images: imageExtensionsRegex,
  audio: audioExtensionsRegex,
  video: videoExtensionsRegex,
  documents: documentExtensionsRegex,
  compressed: compressedExtensionsRegex,
} as const;

export const FILE_MIME_TYPES_REGEX = {
  all: allMIMETypesRegex,
  images: imageMIMETypesRegex,
  audio: audioMIMETypesRegex,
  video: videoMIMETypesRegex,
  documents: documentMIMETypesRegex,
  compressed: compressedMIMETypesRegex,
} as const;

export const FILE_EXTENSIONS = {
  all: allExtensions,
  images: fileExtensions.image.ext,
  audio: fileExtensions.audio.ext,
  video: fileExtensions.video.ext,
  documents: fileExtensions.document.ext,
  compressed: fileExtensions.compressed.ext,
} as const;

export const FILE_MIME_TYPES = {
  all: allMIMETypes,
  images: fileExtensions.image.mime,
  audio: fileExtensions.audio.mime,
  video: fileExtensions.video.mime,
  documents: fileExtensions.document.mime,
  compressed: fileExtensions.compressed.mime,
} as const;