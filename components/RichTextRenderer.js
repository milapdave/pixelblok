import { StoryblokComponent } from '@storyblok/react';
import React from 'react';
import {
  render,
  NODE_UL,
  NODE_LI,
  NODE_PARAGRAPH,
  NODE_HEADING,
  MARK_LINK,
  LinkCustomAttributes,
} from 'storyblok-rich-text-react-renderer'; // Import required modules

// Define the RichTextRenderer component
const RichTextRenderer = ({ content }) => {
  // Define custom node renderers for ul and li elements
  const customNodeRenderers = {
    [NODE_UL]: (children) => (
      <ul className='mb-8 list-disc pl-5'>{children}</ul>
    ), // Render ul as a flex column
    [NODE_PARAGRAPH]: (children) => <p className={`mb-6`}>{children}</p>, // Render p
    [NODE_HEADING]: (children, node) => {
      const headingLevel = node.level;
      let headingTag = ''; // Initialize an empty heading tag
      let className = ''; // Initialize an empty className
      switch (headingLevel) {
        case 1:
          headingTag = 'h1';
          className = 'text-5xl mb-6 font-semibold'; // Customize the class for h1
          break;
        case 2:
          headingTag = 'h2';
          className = 'text-3xl mb-6 font-semibold'; // Customize the class for h2
          break;
        case 3:
          headingTag = 'h3';
          className = 'text-2xl mb-6 font-semibold'; // Customize the class for h3
          break;
        case 4:
          headingTag = 'h4';
          className = 'text-xl mb-6 font-semibold'; // Customize the class for h4
          break;
        case 5:
          headingTag = 'h5';
          className = 'text-lg mb-6 font-semibold'; // Customize the class for h5
          break;
        case 6:
          headingTag = 'h6';
          className = 'text-base mb-6 font-semibold'; // Customize the class for h6
          break;
        default:
          // Handle other cases if needed
          break;
      }
      return React.createElement(headingTag, { className }, children);
    },
    [NODE_LI]: (children) => (
      <li className='mb-4'>
        {' '}
        {/* Style for each list item */}
        {children} {/* Display the check icon and content */}
      </li>
    ),
  };

  // Define custom mark renderers for links using MARK_LINK
  const customMarkRenderers = {
    [MARK_LINK]: (children) => (
      <a
        href={props.href}
        target={props.target}
        rel={props.custom?.rel}
        title={props.custom?.title}
      >
        {children}
      </a>
    ), // Render MARK_LINK as anchor tags with a blue color and underline
  };

  // Render the rich text content with custom node renderers
  const renderedContent = render(content, {
    nodeResolvers: customNodeRenderers,
    markResolvers: customMarkRenderers,
    defaultBlokResolver: (name, props) => {
      const blok = { ...props, component: name };
      return <StoryblokComponent blok={blok} key={props._uid} />;
    },
  });

  return (
    <div className={`rich_text_box prose max-w-none`}>{renderedContent}</div>
  ); // Render the rendered content
};

export default RichTextRenderer; // Export the component
