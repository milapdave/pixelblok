import React, { ReactElement } from 'react';
import { ISbStoriesParams, getStoryblokApi } from '@storyblok/react/rsc';
import StoryblokStory from '@storyblok/react/story';
import type { Metadata } from 'next';
import { draftMode } from 'next/headers';

// Define the default export as an async function
export default async function Page({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<ReactElement> {
  // Fetch data based on the provided slug
  const { data } = await fetchData(params.slug);

  // Render the StoryblokStory component if there's valid data
  return <>{data?.story && <StoryblokStory story={data?.story} />}</>;
}

// Function to fetch data from the Storyblok API
const fetchData = (slug: any) => {
  // Set a default slug if none is provided
  const slugSub = slug || ['home'];
  const storyblokApi = getStoryblokApi();

  // Determine whether to fetch the draft or published version
  const preview =
    process.env.NEXT_PUBLIC_STORYBLOK_VERSION === 'draft' ||
    draftMode().isEnabled;

  // Define parameters for the Storyblok API request
  const sbParams: ISbStoriesParams = {
    version: preview ? 'draft' : 'published',
    resolve_relations: [
      'hero_slider.articles',
      'featured_topics.select_topics',
      'trending_topics.select_trending_topics',
      'featured_article.select_article',
    ],
  };

  // Fetch data from the Storyblok API and return the promise
  return storyblokApi.get(`cdn/stories/${slugSub.join('/')}`, sbParams);
};

// Function to generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Fetch data based on the provided slug
  const { data } = await fetchData(params.slug);

  try {
    // Extract metadata values from the Storyblok content
    const title =
      data?.story.content.seo_metatags?.title || data?.story?.name || '';
    const description = data?.story.content.seo_metatags?.description || '';
    const og_title = data?.story.content.seo_metatags?.og_title;
    const og_description = data?.story.content.seo_metatags?.og_description;
    const og_image = data?.story.content.seo_metatags?.og_image;
    const twitter_title = data?.story.content.seo_metatags?.twitter_title;
    const twitter_description =
      data?.story.content.seo_metatags?.twitter_description;
    const twitter_image = data?.story.content.seo_metatags?.twitter_image;

    // Create and return a metadata object with extracted values
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
    // Handle and log any errors that occur during metadata generation
    // console.error('Error generating metadata:', error);
    throw error;
  }
}
