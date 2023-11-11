# PixelBlok - Next.js & Storyblok Blog Site

Welcome to PixelBlok, a dynamic blog site that combines the power of Next.js for frontend development, Storyblok as the content management system, and Tailwind CSS for styling.

## Prerequisites

1. Node.js installed - [Download Node.js](https://nodejs.org/)
2. Storyblok account - [Sign up for Storyblok](https://www.storyblok.com/)

## Features

- [Storyblok](https://www.storyblok.com/) integration for content management.
- [Next.js](https://nextjs.org/) for server-rendered React applications.
- [Prettier](https://prettier.io/) for code formatting.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone [repository_link]
   cd pixelblok

2. **Install Dependencies:**

    ```bash
    npm install

3. **Set up Storyblok**:

- Create a Storyblok account and set up a new space.
- Obtain your Storyblok access token and set it as an environment variable in a `.env.local` file:

  ```
    NEXT_PUBLIC_STORYBLOK_TOKEN=your_access_token
    NEXT_PUBLIC_STORYBLOK_VERSION=draft
  ```

4. **Run the Project:**

    ```bash
    npm run dev

Your blog site should be running at `http://localhost:3000`.

## Customization

### Layouts

* Hero Slider: Select posts for the Hero Slider in Storyblok by tagging them accordingly.
* Featured Posts: Choose featured posts in Storyblok to showcase in this section.
* Featured Topics: Create topics and assign posts to them in Storyblok.

## Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/milapdave/pixelblok/issues/).

## License

PixelBlok is licensed under the MIT License.