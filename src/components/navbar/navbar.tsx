'use client';

import { FC } from 'react';
import NavLink from './navbarLink';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

interface INavbarProps {}

const Navbar: FC<INavbarProps> = () => {
  return (
    <nav className='navbar'>
      <div className='navbar__container'>
        <ul className='navbar__links'>
          <NavLink href='/'>Home</NavLink>
          <NavLink href='/goods'>Goods</NavLink>
        </ul>
        <div className='navbar__right'>
          <ClerkProvider>
            <SignedOut>
              <SignInButton>
                <button className='white-button signin-button'>sign in</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <NavLink href='/new-sale'>New sale</NavLink>
              <UserButton />
            </SignedIn>
          </ClerkProvider>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
