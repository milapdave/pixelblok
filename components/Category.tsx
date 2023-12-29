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

interface CategoryProps {
  blok: {
    show_posts: string; // You may adjust the type based on your data
    column_option?: string; // You may adjust the type based on your data
    heading: string;
    style: string;
  };
  params:any
}

const Category: React.FC<CategoryProps> = ({ blok, params }) => {
  const [tags, setTags] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [checkedTags, setCheckedTags] = useState<string>();
  const [newDataLoaded, setNewDataLoaded] = useState(false);
  // State to store fetched data
  const [data, setData] = useState<Article[]>([]);

  // Convert the string value to a number for items per page
  const ITEMS_PER_PAGE = 12; // parseInt(blok.show_posts, 10);

  useEffect(() => {
    getData(ITEMS_PER_PAGE, page, params);
  }, [page, checkedTags, params]);


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
  const getData = async (ITEMS_PER_PAGE: number, page: number, params: any) => {
    // Get an instance of the Storyblok API
    const storyblokApi = getStoryblokApi();
    // Define parameters for fetching data
    const sbParams: ISbStoriesParams = {
      version: 'draft',
      starts_with: 'blog/', // Adjust the starts_with value as needed
      is_startpage: false,
      sort_by: 'created_at:desc',
      per_page: ITEMS_PER_PAGE,
      page: page,
      with_tag: checkedTags || '', // Convert the selected tags array to a comma-separated string
    };

    // Fetch data from Storyblok
    const { data } = await storyblokApi.get(`cdn/stories`, sbParams);

    const articlesWithSlug = data.stories.map((article: any) => {
      article.content.slug = article.slug;
      return article.content;
    });

    // Check if new data has been loaded and update the state accordingly
    if (
      articlesWithSlug.length > 0 &&
      articlesWithSlug.length === ITEMS_PER_PAGE
    ) {
      setNewDataLoaded(true);
    } else {
      setNewDataLoaded(false);
    }

    if (page === 1) {
      setData(articlesWithSlug);
    } else {
      setData((prevArticles) => [...prevArticles, ...articlesWithSlug]);
    }
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className='px-5 pb-10 lg:px-24'>
      <div
        className={`grid w-full gap-8  md:grid-cols-3  ${getGridColumnClasses(
          columnOption
        )}`}
        {...storyblokEditable(blok)}
      >
        {data.map((article) => (
          <ArticleTeaser article={article} key={article.slug} />
        ))}
      </div>
      {newDataLoaded && blok.style === 'all' && (
        <div className='pt-20 text-center'>
          <button
            className='inline-flex rounded-sm bg-dark px-6 py-3 text-base font-semibold text-white hover:bg-black'
            onClick={handleNextClick}
          >
            More Articles
          </button>
        </div>
      )}
    </div>
  );
};

export default Category;
