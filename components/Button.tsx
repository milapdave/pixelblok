import React from 'react';
import Link from 'next/link';

interface StoryblokLinkProps {
  blok: {
    color: string;
    size: string;
    align: string;
    margin: string;
    link: {
      cached_url: string;
    };
    label: string;
  };
}

const StoryblokLink: React.FC<StoryblokLinkProps> = ({ blok }) => {
  // Function to get link CSS classes based on color option
  const getColorClasses = (colorOption: string) => {
    switch (colorOption) {
      case 'black':
        return 'bg-dark';
      case 'red':
        return 'bg-red';
      case 'green':
        return 'bg-green';
      // Add more color cases as needed
      default:
        return 'bg-dark'; // Default to 'black' color
    }
  };

  // Function to get link CSS classes based on size option
  const getSizeClasses = (sizeOption: string) => {
    switch (sizeOption) {
      case 'small':
        return 'text-sm px-3 py-2';
      case 'large':
        return 'text-lg px-3 py-2';
      // Add more size cases as needed
      default:
        return 'text-base px-6 py-3'; // Default to 'base' size
    }
  };

  // Function to get alignment classes
  const getAlignmentClasses = (alignOption: string) => {
    switch (alignOption) {
      case 'left':
        return 'text-left';
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return ''; // No alignment class by default
    }
  };

  // Function to get margin classes
  const getMarginClasses = (marginOption: string) => {
    switch (marginOption) {
      case 'medium':
        return 'my-4';
      case 'large':
        return 'my-6';
      case 'small':
        return 'my-2';
      default:
        return 'my-10'; // No margin class by default
    }
  };

  const colorClasses = getColorClasses(blok.color);
  const sizeClasses = getSizeClasses(blok.size);
  const alignmentClasses = getAlignmentClasses(blok.align);
  const marginClasses = getMarginClasses(blok.margin);

  // Combine all classes
  const linkClasses = `${colorClasses} ${sizeClasses}`;

  return (
    <div className={`${alignmentClasses} ${marginClasses}`}>
      <Link
        href={blok?.link?.cached_url}
        className={`${linkClasses} inline-flex rounded-sm font-semibold text-white hover:bg-black`}
        passHref
      >
        {blok?.label}
      </Link>
    </div>
  );
};

export default StoryblokLink;
