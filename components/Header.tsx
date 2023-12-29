'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ISbStoriesParams,
  StoryblokComponent,
  getStoryblokApi,
} from '@storyblok/react';
import MobileMenu from './MobileMenu';
import Logo from './Logo';

interface HeaderProps {
  menu: any; // Replace 'any' with the actual type of your 'menu' prop
}

interface Article {
  slug: string;
  // Add other properties of the article here
}

const Header: React.FC<HeaderProps> = ({ menu }) => {
  // State to manage mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);
  const [tags, setTags] = useState<Article[]>([]);
  const [checkedTags, setCheckedTags] = useState<string>();

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    // Get an instance of the Storyblok API
    const storyblokApi = getStoryblokApi();

    // Define parameters for fetching data
    const sbParams: ISbStoriesParams = {
      version: 'draft',
      is_startpage: false,
      sort_by: 'created_at:desc',
      starts_with: 'categories/',
    };

    // Fetch data from Storyblok
    const { data } = await storyblokApi.get(`cdn/stories`, sbParams);

    const cetegory = data.stories.map((article: any) => {
      article.content.slug = article.slug;
      return article.content;
    });

    setTags(cetegory);
  };

  const handleCheckboxChange = (tag: string) => {
    setCheckedTags(tag === 'All' ? undefined : tag);
  };
  return (
    <header className='bg-white'>
      <nav
        className='mx-auto flex items-center justify-between px-5 py-6 lg:px-24 lg:py-8 '
        aria-label='Global'
      >
        <div className='flex items-center lg:flex-1'>
          <Logo blok={menu.logo} logo_text={menu.logo_text} />
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
        <div className='hidden text-dark lg:flex lg:gap-x-12 '>
          {menu?.header_menu?.map((nestedBlok: any) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
          {console.log(tags,'tagstagstagstagstags')}
          {tags?.map((story: any, index: any) => (
            <div key={index} className='flex'>
              <Link
                className='block border-b border-transparent py-1 text-base font-medium hover:border-black'
                href={`/categories/${story.slug}`}
              >
                {story.name}
              </Link>
              
            </div>
          ))}
        </div>
      </nav>
      {/* Mobile menu, show/hide based on menu open state. */}
      {menuOpen && <MobileMenu menu={menu} toggleMenu={toggleMenu} />}
    </header>
  );
};

export default Header;
