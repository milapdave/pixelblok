import React from 'react';
import ArticleTeaser from './ArticleTeaser';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import { render } from 'storyblok-rich-text-react-renderer';

interface Props {
  blok: any;
}

const FeaturedArticle: React.FC<Props> = ({ blok }) => {
  console.log(blok, 'blokblokblokblok');
  const topics = blok?.select_article || [];

  return (
    <section className='px-5 py-10 lg:px-24'>
      <div className='flex w-full justify-between py-10 text-2xl'>
        <h2>{blok.heading}</h2>
      </div>
      <div>
        <div className='grid w-full gap-8  md:grid-cols-3 lg:grid-cols-3'>
          {topics.map((article: any) => {
            article.content.slug = article?.slug;
            return (
              <ArticleTeaser article={article.content} key={article.slug} />
            );
          })}
        </div>
      </div>
      <div className='text-center my-10'>
        <Link
          href={blok?.more_button?.cached_url || ''}
          className='inline-flex rounded-sm bg-dark px-6 py-3 text-base font-semibold text-white hover:bg-black'
        >
          {blok?.more_button?.label}
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArticle;
