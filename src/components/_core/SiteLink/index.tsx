import Link from "next/link";
import React from "react";
import styles from "./site-link.module.css";
import { classnames } from "~/utils/global";

type SiteLinkProps = {
  children: React.ReactNode;
  label?: string;
  href?: string;
  className?: string;
};

const SiteLink: React.FC<SiteLinkProps & React.HTMLProps<HTMLAnchorElement>> = React.memo(({ children, label, href, className, ...props }: SiteLinkProps) => (
  <Link href={href ?? '/'} passHref>
    <a className={classnames(styles.default, className)} aria-label={label ?? 'App Link'} {...props}>
      {children}
    </a>
  </Link>
));

export default SiteLink;