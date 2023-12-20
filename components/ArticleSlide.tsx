import React from 'react';
import moment from 'moment/moment';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleSlideProps {
  article: any;
  currentSlide: number;
  index: number;
}

const ArticleSlide: React.FC<ArticleSlideProps> = ({
  article,
  currentSlide,
  index,
}) => {
  return (
    <div
      className={`absolute left-0 right-0 h-full w-full transition-opacity duration-700 ease-in ${
        currentSlide === index ? 'z-10 opacity-100' : 'z-0 opacity-0'
      }`}
    >
      <Image
        className='h-full w-full object-cover object-center'
        src={article.image.filename}
        alt={article.title}
        width={1920}
        height={1080}
      />
      <div className='absolute bottom-0 left-0 top-0 flex w-full items-center justify-center bg-black bg-opacity-30 text-center text-white sm:py-10'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          <div className='text-slate-200 mb-4'>
            {moment(article.date).format('Do MMMM YYYY')}
          </div>
          <h1 className='mx-auto mb-8 text-2xl font-medium leading-none tracking-tighter md:text-3xl'>
            <Link href={`/blog/${article.slug}`}>{article.title}</Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ArticleSlide;
