import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import { StoryblokComponent } from '@storyblok/react';
import RichTextRenderer from './RichTextRenderer';

interface ArticleProps {
  blok: {
    image: {
      alt: string;
      filename: string;
    };
    date: string; // You can specify the date format or use a Date object
    title: string;
    content: any; // Adjust the type for content as per your data structure
  };
}

const Article: React.FC<ArticleProps> = ({ blok }) => {
  return (
    <section className=''>
      <div className='flex flex-col items-center justify-center'>
        <div className='relative w-full'>
          <Image
            className='mb-10 w-full rounded object-cover object-center md:h-[500px]'
            alt={blok.image.alt}
            src={blok.image.filename}
            width={1920}
            height={1080}
          />
          <div className='absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-2/4 -translate-y-2/4 text-center text-white'>
            <div className='text-slate-200 mb-4'>
              {moment(blok.date).format('Do MMMM YYYY')}
            </div>
            <h1 className='title-font mb-8 text-3xl font-medium sm:text-4xl'>
              {blok.title}
            </h1>
          </div>
        </div>
        <div className='w-full text-center lg:w-2/3'>
          <div className='prose lg:prose-xl mb-8 w-full max-w-none text-justify leading-relaxed'>
            {<RichTextRenderer content={blok.content} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Article;
