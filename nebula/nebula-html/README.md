# Nebula - HTML

Nebula is a dark-themed, fully responsive HTML template designed for modern SaaS applications. Built with Tailwind CSS and Alpine.js, it offers a sleek, customizable foundation for your next project.

## Get Started

Unzip and open the folder of the theme with your editor of choice.

We have shipped this template using the Tailwind CLI tool in order to get you up and running as fast as possible.

If you would like to set up a development environment with hot reloading, first ensure that Node.js and your package manager of choice are installed. This theme uses the latest version of Tailwind: `tailwindcss v4.1`.

First, install the dependencies by navigating to the project directory in your terminal and run

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

This will install all the required dependencies and place them in a folder called `node_modules` in the root directory.

We have added the compiled CSS file to the `<head>` of all the template's HTML files so if you want to rebuild Tailwind’s utility classes to style your content, you simply run the Tailwind CLI tool to scan your template files for classes and rebuild your CSS. We have wrapped the Tailwind CLI tool in a npm script, that way you can do this by running the following command in your terminal:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun dev
```

This will run the Tailwind CLI in watch mode, that way the `build/css/main.css` file will rebuild every time you make changes to your HTML files. You can also run

```bash
# Using npm
npm run build

# Using yarn
yarn build

# Using pnpm
pnpm build

# Using bun
bun build
```

to build your CSS for production and minify your stylesheet.

## Tailwind CSS

This theme is built on top of the Tailwind CSS framework which is installed via npm and used via the Tailwind CLI tool as documented by the offical Tailwind installation docs (https://tailwindcss.com/docs/installation/tailwind-cli). If you are not familiar with the Tailwind CSS framework I would recommend you check out the [Tailwind documentation](https://tailwindcss.com/docs).

The entrypoint css file is located at `src/css/styles.css`. This file imports tailwind css and contains additional CSS used in the template. It also imports the `odometer-theme-default.css` stylesheet for `odometer.js` in order to style the counter in the home page stats section.

We've tried to minimize any custom CSS and only rely on Tailwind's utility classes and a few additional classes. This template uses 1 official Tailwind plugin (`@tailwindcss/forms`).

## Build directory

The bulk of the code is located in the `build` directory. Here you will find all of the `html` files at the root of the directory. the images (`build/images`), the [Geist fonts](https://vercel.com/font) used across the template in the `build/fonts` directory, the javascript in the `build/js` directory, and the CSS build file after running the Tailwind CLI tool (`build/css/main.css`).

## Javascript

The main JavaScript file is `build/js/main.js`. It contains various interactive components and initializations for third-party libraries.

The `build/js/starfield.js` file contains the code for the animated starfield background effect.

### Alpine.js

Alpine.js is used for interactive components throughout the template. You can find Alpine.js directives (x-data, x-show, etc.) in the HTML files.

### Third-Party Libraries

- **[Alpine.js](https://alpinejs.dev/)**: Used for reactive and interactive components across the site
- **[Splide](https://splidejs.com/)**: Powers the sliders used across the site
- **[Shiki](https://shiki.style/)**: Used for code syntax highlighting
- **[Odometer](https://github.hubspot.com/odometer/)**: Creates animated number counters

## Icons

The icons used for this theme are part of the [Hero Icons](https://heroicons.com/) set that are free to use and published under the [MIT License](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE).

Some of the examples in Nebula use [Nucleo App](https://nucleoapp.com/premium-icons) icons which we have acquired a license for. You are free to use the Nucleo icons included in this template on your projects, but if you are interested in using the rest of their premium icons you can buy a license on their [website](https://nucleoapp.com/).

## Images

All of the images used in the template are free to use and are either from [Unsplash](https://unsplash.com/), [Pexels](https://www.pexels.com/), or custom-made.

## License

This site template is a commercial product and is licensed under the [Tailwind Awesome license](https://www.tailwindawesome.com/license).

## Additional Help

If you need additional help setting up the template or have any questions, feel free to contact us at <rodrigo@tailwindawesome.com>.
