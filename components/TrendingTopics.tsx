import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { render } from 'storyblok-rich-text-react-renderer';

interface Props {
  blok: any;
}

const TrendingTopics: React.FC<Props> = ({ blok }) => {
  console.log(blok, 'blok');
  const topics = blok?.select_trending_topics || [];

  return (
    <div className='px-5 py-10 lg:px-24'>
      <div className='flex w-full justify-between  py-10 text-2xl'>
        <h2>{blok.heading}</h2>
      </div>
      <div className='grid grid-cols-3 gap-8'>
        {topics.map((article: any, index: number) => {
          article.content.slug = article?.slug;
          const isFirstItem = index === 0;

          return (
            <div className={`${isFirstItem ? 'col-span-2' : ''}`} key={article.slug}>
              <div className='relative flex h-full gap-8' key={article.slug}>
                <Image
                  className='h-full w-full object-cover object-center max-h-[450px] min-h-[450px]'
                  src={article.content.image.filename}
                  alt={article.content.title}
                  width={1024}
                  height={1024} // Adjust the height as needed
                />
                <div className='absolute bottom-0 left-0 right-0 flex flex-col top-0 justify-end bg-black bg-opacity-30 text-white p-10'>
                  <div className='mb-4 text-xs text-gray'>
                    {moment(article.content.date).format('Do MMMM YYYY')}
                  </div>
                  <Link
                    href={`/blog/${article.content.slug}`}
                    className='block text-xl font-semibold leading-snug tracking-tighter'
                  >
                    {article.content.title}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingTopics;
