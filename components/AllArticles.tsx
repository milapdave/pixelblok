import React, { useEffect, useState } from 'react';
import ArticleTeaser from './ArticleTeaser';
import {
  getStoryblokApi,
  storyblokEditable,
  ISbStoriesParams,
} from '@storyblok/react';

interface Article {
  slug: string;
  // Add other properties of the article here
}

interface AllArticlesProps {
  blok: {
    show_posts: string; // You may adjust the type based on your data
    column_option?: string; // You may adjust the type based on your data
  };
}

const AllArticles: React.FC<AllArticlesProps> = ({ blok }) => {
  // Convert the string value to a number for items per page
  const ITEMS_PER_PAGE = parseInt(blok.show_posts, 10);

  // Function to get grid column classes based on the selected option
  const getGridColumnClasses = (columnOption: string | undefined) => {
    switch (columnOption) {
      case '3':
        return 'lg:grid-cols-3';
      case '4':
        return 'xl:grid-cols-4';
      // Add more column cases as needed
      default:
        return 'lg:grid-cols-3'; // Default to 3 columns
    }
  };

  // Get the column option from blok or use the default '3' columns
  const columnOption = blok.column_option || '3';

  // Function to fetch data based on the number of items per page
  const getData = async (ITEMS_PER_PAGE: number) => {
    // Get an instance of the Storyblok API
    const storyblokApi = getStoryblokApi();

    // Define parameters for fetching data
    const sbParams: ISbStoriesParams = {
      version: 'draft',
      starts_with: 'blog/', // Adjust the starts_with value as needed
      is_startpage: false,
      per_page: ITEMS_PER_PAGE,
    };

    // Fetch data from Storyblok
    const { data } = await storyblokApi.get(`cdn/stories`, sbParams);

    return data.stories;
  };

  // State to store fetched data
  const [data, setData] = useState<Article[]>([]);

  useEffect(() => {
    getData(ITEMS_PER_PAGE).then((result) => {
      // Set the slug property in the content object for each article
      const updatedArticles = result.map((article: any) => {
        article.content.slug = article.slug;
        return article.content;
      });
      setData(updatedArticles);
    });
  }, [ITEMS_PER_PAGE]);

  return (
    <div
      className={`grid w-full gap-8 px-5 py-10 lg:px-24 md:grid-cols-3 ${getGridColumnClasses(
        columnOption
      )}`}
      {...storyblokEditable(blok)}
    >
      {data.map((article) => (
        <ArticleTeaser article={article} key={article.slug} />
      ))}
    </div>
  );
};

export default AllArticles;
