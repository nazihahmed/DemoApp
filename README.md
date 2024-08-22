# Planck Full-Stack app

Demo app with Login capabilities and list of shopping items

* Login is persisted with a secure cookie
* Pagination and Filters are stored in query params
* Logout clears the cookie and redirects to home page

## Developing

> It is required to install node.js on the machine to run the app
* Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.