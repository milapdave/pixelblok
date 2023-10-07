'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { StoryblokComponent } from '@storyblok/react';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  menu: any; // Replace 'any' with the actual type of your 'menu' prop
}

const Header: React.FC<HeaderProps> = ({ menu }) => {
  // State to manage mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);
  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className='bg-white'>
      <nav
        className='mx-auto flex items-center justify-between px-5 py-6 lg:px-24 lg:py-8 '
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5 text-xl font-bold uppercase'>
            <span className='sr-only'>PixelBlok</span>
            PixelBlok
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            onClick={toggleMenu}
            className='text-gray-700 -m-2.5 inline-flex items-center justify-center rounded-md p-2.5'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          {menu?.header_menu?.map((nestedBlok: any) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </nav>
      {/* Mobile menu, show/hide based on menu open state. */}
      {menuOpen && <MobileMenu menu={menu} toggleMenu={toggleMenu} />}
    </header>
  );
};

export default Header;
