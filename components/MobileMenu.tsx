import Link from 'next/link';
import { StoryblokComponent } from '@storyblok/react';
import Logo from './Logo';

interface MobileMenuProps {
  menu: any; // Replace 'any' with the actual type of your 'menu' prop
  toggleMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menu, toggleMenu }) => {
  return (
    <div className='lg:hidden' role='dialog' aria-modal='true'>
      {/* Background backdrop, show/hide based on slide-over state. */}
      <div className='fixed inset-0 z-20'></div>
      <div className='sm:ring-gray-900/10 fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white px-5 py-6 sm:max-w-sm sm:ring-1'>
        <div className='flex items-center justify-between'>
          <Logo blok={menu.logo} logo_text={menu.logo_text} />
          <button
            type='button'
            onClick={toggleMenu}
            className='text-gray-700 -m-2.5 rounded-md p-2.5'
          >
            <span className='sr-only'>Close menu</span>
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
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <div className='mt-6 flow-root'>
          <div className='divide-gray-500/10 -my-6 divide-y'>
            <div className='space-y-2 py-6'>
              {menu?.header_menu?.map((nestedBlok: any) => (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
