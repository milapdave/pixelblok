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
    <section className='px-5 lg:px-24'>
      <div className='flex flex-col items-center justify-center'>
        <div className='relative mb-10 w-full '>
          <Image
            className='w-full rounded object-cover object-center md:h-[500px] '
            alt={blok.image.alt}
            src={blok.image.filename}
            width={1920}
            height={1080}
          />
          <div className='absolute bottom-0 left-0 right-0 top-0 flex w-full flex-col items-center justify-center bg-black bg-opacity-30 text-center text-white'>
            <div className='text-slate-200 mb-4'>
              {moment(blok.date).format('Do MMMM YYYY')}
            </div>
            <h1 className='title-font mb-8 text-3xl font-medium sm:text-4xl'>
              {blok.title}
            </h1>
          </div>
        </div>
        <div className='w-full text-center lg:w-2/3'>
          <div className='prose mb-8 w-full max-w-none text-justify leading-relaxed lg:prose-xl'>
            {<RichTextRenderer content={blok.content} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Article;
