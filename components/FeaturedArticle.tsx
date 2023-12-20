import React from 'react';
import ArticleTeaser from './ArticleTeaser';
import Link from 'next/link';

interface Props {
  blok: any;
}

const FeaturedArticle: React.FC<Props> = ({ blok }) => {
  const topics = blok?.select_article || [];

  return (
    <section className='px-5 py-10 lg:px-24'>
      <div className='flex w-full justify-between py-10 text-2xl font-semibold'>
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
      <div className='my-10 text-center'>
        <Link
          href={blok?.more_button?.cached_url || ''}
          className='inline-flex rounded-sm bg-dark px-6 py-3 text-base font-medium text-white hover:bg-black'
        >
          {blok?.more_button?.label}
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArticle;
