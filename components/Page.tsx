import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

// Define the Props interface for the Page component
interface Props {
  blok: any; // Props include a "blok" property, which represents the content from Storyblok.
}

// Define the Page component as a React functional component
export const Page: React.FC<Props> = ({ blok }) => (
  <main {...storyblokEditable(blok)} className="flex-grow overflow-hidden">
    <>
      {blok?.body?.map((nestedBlok: any) => (
        // Render nested components using StoryblokComponent and provide each nestedBlok's data and a unique key.
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </>
  </main>
);
