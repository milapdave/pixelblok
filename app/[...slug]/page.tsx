import React, { ReactElement } from 'react';
import { ISbStoriesParams, getStoryblokApi } from '@storyblok/react/rsc';
import StoryblokStory from '@storyblok/react/story';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';

// Define the default export as an async function
export default async function Page({
  params,
}: {
  params: { slug: string[]; locale: string };
}): Promise<ReactElement> {
  // Fetch data based on the provided slug
  const { data } = await fetchData(params.slug);

  // Render the StoryblokStory component if there's valid data
  return <>{data?.story && <StoryblokStory story={data?.story} />}</>;
}

// Function to fetch data from the Storyblok API
const fetchData = (slug: string[]) => {
  // Set a default slug if none is provided
  const _slug = slug || ['home'];
  const storyblokApi = getStoryblokApi();

  // Determine whether to fetch the draft or published version
  const preview =
    process.env.NEXT_PUBLIC_STORYBLOK_VERSION === 'draft' ||
    draftMode().isEnabled;

  // Define parameters for the Storyblok API request
  const sbParams: ISbStoriesParams = {
    version: preview ? 'draft' : 'published',
    resolve_links: 'url',
    resolve_relations: [
      'hero_slider.articles',
      'featured_topics.select_topics',
      'trending_topics.select_trending_topics',
      'featured_article.select_article',
    ],
  };

  // Fetch data from the Storyblok API and return the promise
  return storyblokApi
    .get(`cdn/stories/${_slug.join('/')}`, sbParams)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return { data: JSON.parse(e) };
    });
};

// Function to generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string[]; locale: string };
}): Promise<Metadata> {
  const { data } = await fetchData(params.slug);

  try {
    // Extract metadata values from the Storyblok content
    const title =
      data?.story?.content.seo_metatags?.title || data?.story?.name || '';
    const description = data?.story?.content.seo_metatags?.description || '';
    const og_title = data?.story?.content.seo_metatags?.og_title;
    const og_description = data?.story?.content.seo_metatags?.og_description;
    const og_image = data?.story?.content.seo_metatags?.og_image;
    const twitter_title = data?.story?.content.seo_metatags?.twitter_title;
    const twitter_description =
      data?.story?.content.seo_metatags?.twitter_description;
    const twitter_image = data?.story?.content.seo_metatags?.twitter_image;

    // Create and return metadata object with extracted values
    return {
      title,
      description,
      openGraph: {
        title: og_title,
        description: og_description,
        images: og_image,
      },
      twitter: {
        card: 'summary_large_image',
        title: twitter_title,
        description: twitter_description,
        images: twitter_image,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    throw error;
  }
}


export async function generateStaticParams(): Promise<Array<object>> {
  const preview = process.env.NEXT_PUBLIC_STORYBLOK_VERSION === 'draft';
  const storyblokApi = getStoryblokApi();
  const perPage = 100; // You can change this value as needed.
  let currentPage = 1;
  let allStories = [] as any;

  while (true) {
    const stories = await storyblokApi.get(`cdn/stories`, {
      per_page: perPage,
      page: currentPage,
      version: preview ? 'draft' : 'published',
      // excluding_slugs: "config,find-a-members/*,member-resources/*,about/*,members-only/*,news-and-events/*"
    });
    const currentStories = stories?.data?.stories || [];
    if (currentStories.length === 0) {
      break; // No more results, exit the loop.
    }

    allStories = [...allStories, ...currentStories];
    currentPage++;
  }
  return allStories.map((x: any) => {
    return { slug: x.full_slug.split('/') };
  });
}
