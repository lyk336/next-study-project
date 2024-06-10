'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface INavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: FC<INavLinkProps> = ({ href, children }) => {
  const pathName = usePathname();

  return (
    <Link href={href} className={pathName === href ? 'active' : ''}>
      {children}
    </Link>
  );
};

export default NavLink;
