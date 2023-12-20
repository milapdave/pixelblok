import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { render } from 'storyblok-rich-text-react-renderer';

interface Props {
  blok: any;
}

const TrendingTopics: React.FC<Props> = ({ blok }) => {
  const topics = blok?.select_trending_topics || [];

  return (
    <div className='px-5 py-10 lg:px-24'>
      <div className='flex w-full justify-between  py-10 text-2xl font-semibold'>
        <h2>{blok.heading}</h2>
      </div>
      <div className='grid grid-cols-3 gap-8'>
        {topics.map((article: any, index: number) => {
          article.content.slug = article?.slug;
          const isFirstItem = index === 0;

          return (
            <div
              className={`${
                isFirstItem
                  ? 'col-span-full lg:col-span-2'
                  : 'col-span-full lg:col-span-1'
              } `}
              key={article.slug}
            >
              <div
                className='group relative flex h-full gap-8 overflow-hidden'
                key={article.slug}
              >
                <Image
                  className='h-full max-h-[450px] min-h-[450px] w-full object-cover object-center transition duration-300 group-hover:scale-110'
                  src={article.content.image.filename}
                  alt={article.content.title}
                  width={1024}
                  height={1024} // Adjust the height as needed
                />
                <Link
                  href={`/blog/${article.content.slug}`}
                  className='absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-end bg-black bg-opacity-60 p-10 text-white'
                >
                  <div className='mb-4 text-xs text-gray'>
                    {moment(article.content.date).format('Do MMMM YYYY')}
                  </div>
                  <h2 className='block text-xl font-medium leading-snug tracking-tighter'>
                    {article.content.title}
                  </h2>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingTopics;
