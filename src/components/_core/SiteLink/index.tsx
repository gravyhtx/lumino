// ~/components/_core/SiteLink/index.tsx
import React, { forwardRef, memo } from 'react';
import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import Link, { type LinkProps as NextLinkProps } from 'next/link';
import type { FileTypes } from '~/types/FileExtensions';
import { FILE_EXTENSIONS_REGEX } from '~/constants/file-extensions';
import classNames from 'classnames';
import styles from './site-link.module.css';

type DownloadType = boolean | 'auto' | FileTypes | FileTypes[];

type SiteLinkProps = {
  /**
   * The content of the link.
   */
  children: React.ReactNode;
  /**
   * The target URL or path for the link.
   */
  href: string;
  /**
   * The label or text content for the link.
   * If not provided, it will default to 'Internal site link' or 'External site link' based on the URL.
   */
  label?: string | false | null | undefined;
  /**
   * Additional classes to apply to the link.
   */
  classes?: string;
  /**
   * Whether the link should open in a new tab or window.
   * @default false
   */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /**
   * The relationship between the current document and the linked document.
   * @default 'noopener noreferrer' for external links, undefined for internal links
   */
  rel?: string;
  /**
   * Whether to download the linked resource instead of navigating to it.
   * If 'auto', it automatically determines based on the file extension.
   * If a specific file type (e.g., 'images', 'video', 'audio', 'documents', 'compressed'), it checks against the extensions for that file type.
   * It can also be an array of file types.
   */
  download?: DownloadType;
  /**
   * Whether the link should be followed by search engine crawlers.
   * @default true
   */
  follow?: boolean;
  /**
   * Whether the link should be treated as internal or external.
   * If 'auto' (default), the component will determine based on the href value.
   */
  internal?: boolean | 'auto';
  /**
   * Any additional props to be passed to the underlying HTML element.
   */
  [key: string]: unknown;
} & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

/**
 * `SiteLink` is a React component for creating links that can be internal or external to the website.
 * It supports automatic determination of internal vs. external links, download capability based on file type,
 * opening links in a new tab, and SEO optimizations such as `rel="nofollow"` for external links.
 *
 * @component
 * @example
 * // Internal link example
 * <SiteLink href="/about" label="About Us">
 *   Learn more about us
 * </SiteLink>
 *
 * @example
 * // External link example with target="_blank" to open in a new tab and rel="noopener noreferrer" for security
 * <SiteLink href="https://example.com" target="_blank" rel="noopener noreferrer">
 *   Visit Example
 * </SiteLink>
 *
 * @example
 * // Download link example for a PDF document
 * <SiteLink href="/path/to/document.pdf" download>
 *   Download Document
 * </SiteLink>
 *
 * @example
 * // Using `download` prop with specific file type to auto-detect and enable download
 * <SiteLink href="/path/to/image.jpg" download="images">
 *   Download Image
 * </SiteLink>
 *
 * @example
 * // Custom classes and `aria-label` for accessibility
 * <SiteLink href="/contact" classes="custom-class" aria-label="Contact Page">
 *   Contact Us
 * </SiteLink>
 *
 * @param {SiteLinkProps} props - The props for the SiteLink component.
 * @param {string} props.href - The URL or path for the link. Determines if the link is internal or external.
 * @param {string} [props.label] - Aria-label for the link for accessibility purposes. Required value but can be set to 'undefined', 'null', or 'false' to default to 'Internal site link' / 'External site link'.
 * @param {string} [props.classes] - Additional CSS classes for the link.
 * @param {'_blank' | '_self' | '_parent' | '_top'} [props.target='_self'] - Specifies where to open the linked document.
 * @param {string} [props.rel] - Specifies the relationship between the current and linked documents. Automatically adds "noopener noreferrer" for external links.
 * @param {DownloadType} [props.download='auto'] - Enables downloading the linked resource. Can be boolean, 'auto', or a specific file type.
 * @param {boolean} [props.follow=true] - If false, adds "nofollow" to the rel attribute to instruct search engines not to follow the link.
 * @param {boolean | 'auto'} [props.internal='auto'] - Manually specify if the link is internal or external. Defaults to 'auto', which auto-determines based on the href value.
 */

const SiteLink = forwardRef<HTMLAnchorElement, SiteLinkProps>(
  (
    {
      children,
      href,
      label,
      classes,
      target = '_self',
      rel,
      download = 'auto',
      follow = true,
      ...rest
    },
    ref
  ) => {
    const isInternalLink = href.startsWith('/') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:');

    const ariaLabel = label ?? (isInternalLink ? 'Internal site link' : 'External site link');
    const className = classNames(classes, isInternalLink ? styles.internal : styles.external);

    const linkProps: NextLinkProps = {
      href,
      as: isInternalLink ? href : undefined,
      prefetch: !isInternalLink,
    };

    const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
      ref,
      target: isInternalLink ? undefined : target,
      rel: isInternalLink ? undefined : `${rel ? `${rel} ` : ''}${!follow ? 'nofollow' : ''}`,
      download: !isInternalLink ? handleDownload(href, download as DownloadType) : undefined,
      className,
      ...rest,
    };

    return isInternalLink ? (
      <Link {...linkProps} passHref>
        <a aria-label={String(ariaLabel)} {...anchorProps}>
          {children}
        </a>
      </Link>
    ) : (
      <a aria-label={String(ariaLabel)} {...anchorProps} href={href}>
        {children}
      </a>
    );
  }
);

const handleDownload = (href: string, download: DownloadType): string | undefined => {
  if (typeof download === 'boolean') {
    return download ? href : undefined;
  }

  if (typeof download === 'string') {
    const isValidFileType = ['auto', 'images', 'video', 'audio', 'documents', 'compressed'].includes(download);
    if (!isValidFileType) {
      console.warn(`Invalid value for 'download' prop: ${download}`);
      return undefined;
    }

    const regexes = {
      auto: FILE_EXTENSIONS_REGEX.all,
      images: FILE_EXTENSIONS_REGEX.images,
      video: FILE_EXTENSIONS_REGEX.video,
      audio: FILE_EXTENSIONS_REGEX.audio,
      documents: FILE_EXTENSIONS_REGEX.documents,
      compressed: FILE_EXTENSIONS_REGEX.compressed,
    };

    return regexes[download]?.test(href) ? href : undefined;
  }

  if (Array.isArray(download)) {
    const regexes = download.map((fileType) => FILE_EXTENSIONS_REGEX[fileType] || null).filter(Boolean);
    return regexes.some((regex) => regex?.test(href)) ? href : undefined;
  }

  return undefined; // Handle any other case
};

const MemoizedSiteLink = memo(SiteLink);

export default MemoizedSiteLink;