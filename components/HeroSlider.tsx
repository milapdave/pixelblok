import React, { useEffect, useState } from 'react';
import ArticleSlide from './ArticleSlide';
import { storyblokEditable } from '@storyblok/react';

interface Article {
  slug: string;
  // Add other properties of the article here
}

interface PopularArticlesProps {
  blok: {
    articles: {
      content: Article;
      uuid: string;
      slug: string;
    }[];
  };
}

const HeroSlider: React.FC<PopularArticlesProps> = ({ blok }) => {
  const [slides, setSlides] = useState(blok.articles);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className='slider-container px-5 lg:px-24'
        {...storyblokEditable(blok)}
      >
        <div
          className={`relative h-screen lg:max-h-[calc(100vh-120px)] overflow-hidden max-h-[320px] md:max-h-[620px]`}
        >
          {blok?.articles.map((article, index) => {
            article.content.slug = article?.slug;
            return (
              <ArticleSlide
                currentSlide={currentSlide}
                index={index}
                article={article.content}
                key={article.uuid}
              />
            );
          })}
          {/* <!-- Slider controls --> */}
          <button
            type='button'
            onClick={() => nextSlide()}
            className='group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none'
            data-carousel-prev
          >
            <span className='inline-flex h-8 w-8 items-center justify-center bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-white/30 dark:group-hover:bg-white/60 dark:group-focus:ring-white/70 sm:h-10 sm:w-10'>
              <svg
                aria-hidden='true'
                className='h-5 w-5 text-white dark:text-white sm:h-6 sm:w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 19l-7-7 7-7'
                ></path>
              </svg>
              <span className='sr-only'>Previous</span>
            </span>
          </button>
          <button
            type='button'
            onClick={() => handlePrev()}
            className='group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none'
            data-carousel-next
          >
            <span className='inline-flex h-8 w-8 items-center justify-center bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-white/30 dark:group-hover:bg-white/60 dark:group-focus:ring-white/70 sm:h-10 sm:w-10'>
              <svg
                aria-hidden='true'
                className='h-5 w-5 text-white dark:text-white sm:h-6 sm:w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 5l7 7-7 7'
                ></path>
              </svg>
              <span className='sr-only'>Next</span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroSlider;
