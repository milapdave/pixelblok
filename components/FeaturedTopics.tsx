import React from 'react';
import ArticleTeaser from './ArticleTeaser';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import { render } from 'storyblok-rich-text-react-renderer';

interface Props {
  blok: any;
}

const FeaturedTopics: React.FC<Props> = ({ blok }) => {
  const topics = blok?.select_topics || [];
  const lastIndex = topics.length - 1;
  const lastItem = topics[lastIndex];

  return (
    <section className='bg-dark px-5 lg:px-24'>
      <div className='flex'>
        <div className='flex w-1/2 flex-col gap-8 p-24'>
          <div className='mb-5 text-2xl text-white'>
            <h2>{blok.heading}</h2>
          </div>
          {topics.slice(0, lastIndex).map((article: any) => {
            article.content.slug = article?.slug;
            return (
              <div className='flex gap-8' key={article.slug}>
                <Link href={`/blog/${article.content.slug}`}>
                  <Image
                    className='min-h-[180px] w-full min-w-[180px] object-cover object-center'
                    src={article.content.image.filename}
                    alt={article.title}
                    width={180}
                    height={180}
                  />
                </Link>
                <div className='text-white'>
                  <div className='mb-4 text-xs text-gray'>
                    {moment(article.content.date).format('Do MMMM YYYY')}
                  </div>
                  <Link
                    href={`/blog/${article.content.slug}`}
                    className='mb-4 block text-lg font-semibold leading-snug tracking-tighter'
                  >
                    {article.content.title}
                  </Link>
                  <div className='mx-auto line-clamp-2 text-sm leading-relaxed text-gray'>
                    {render(article.content.teaser)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className='w-1/2'>
          {/* Content 2 */}
          <div className='relative flex h-full gap-8' key={lastItem.slug}>
            <Image
              className='h-full w-full object-cover object-center'
              src={lastItem.content.image.filename}
              alt={lastItem.title}
              width={1024}
              height={1024} // Adjust the height as needed
            />
            <div className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-white'>
              <div className='mb-4 text-xs text-gray'>
                {moment(lastItem.content.date).format('Do MMMM YYYY')}
              </div>
              <Link
                href={`/blog/${lastItem.content.slug}`}
                className='mb-4 block text-2xl font-semibold leading-snug tracking-tighter'
              >
                {lastItem.content.title}
              </Link>
              <div className='mx-auto line-clamp-2 max-w-xs text-base leading-relaxed text-gray'>
                {render(lastItem.content.teaser)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTopics;
