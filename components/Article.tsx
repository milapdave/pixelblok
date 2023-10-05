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
    <section className="">
      <div className="flex items-center justify-center flex-col">
        <div className='relative w-full'>
          <Image
            className="md:h-[500px] w-full mb-10 object-cover object-center rounded"
            alt={blok.image.alt}
            src={blok.image.filename}
            width={1920}
            height={1080}
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 w-full max-w-2xl text-center text-white">
            <div className="text-slate-200 mb-4">
              {moment(blok.date).format('Do MMMM YYYY')}
            </div>
            <h1 className="title-font sm:text-4xl text-3xl mb-8 font-medium">
              {blok.title}
            </h1>
          </div>
        </div>
        <div className="text-center lg:w-2/3 w-full">
          <div className="mb-8 w-full max-w-none prose lg:prose-xl leading-relaxed text-justify">
            {<RichTextRenderer content={blok.content} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Article;
