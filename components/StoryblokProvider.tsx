/** 1. Tag it as a client component */
"use client"; // This comment indicates that this module is intended to run on the client side.

// Import necessary dependencies
import { ReactNode } from "react";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { Page } from "./Page";
import MenuLink from "./MenuLink";
import HeroSlider from "./HeroSlider";

// Define the prop type for the StoryblokProvider component
interface StoryblokProviderProps {
  children: ReactNode; // ReactNode represents the type of children elements (components, elements, etc.)
}

const components = {
  page: Page, // Define a mapping of component names to their respective components. In this case, "page" maps to the Page component.
  menu_link: MenuLink,
  hero_slider: HeroSlider,
};

/** 2. Initialize it as usual */
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN, // Initialize Storyblok with an access token from an environment variable.
  use: [apiPlugin], // Use the Storyblok API plugin.
  components, // Provide the components mapping defined above to Storyblok for component rendering.
  apiOptions: {
    region: "us", // Set the API region to "us".
  },
});

// Define the StoryblokProvider component that wraps around other components
export default function StoryblokProvider({
  children,
}: StoryblokProviderProps) {
  return children; // Render the provided children components. This component acts as a wrapper around other components, allowing them to access Storyblok data.
}
