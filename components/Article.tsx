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
    <section className='lg:px-24 px-5'>
      <div className='flex flex-col items-center justify-center'>
        <div className='relative w-full mb-10 '>
          <Image
            className='w-full rounded object-cover object-center md:h-[500px] '
            alt={blok.image.alt}
            src={blok.image.filename}
            width={1920}
            height={1080}
          />
          <div className='absolute w-full top-0 bottom-0 left-0 right-0 text-center text-white bg-black bg-opacity-30 flex flex-col justify-center items-center'>
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
