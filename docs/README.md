# Next.js Multilingual Starter

This is a Next.js starter project that provides a basic structure for building a multilingual website using Next.js and `next-intl`.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- NPM (version 8 or higher)

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

The app will start running on http://localhost:3000

## Directory Structure

The project is structured as follows:

```bash
├── messages/
│   ├── en.json
│   └── de.json
├── next.config.mjs
└── src/
    ├── i18n/
    │   ├── routing.js
    │   └── request.js
    ├── lib/
    │   └── utils.js
    ├── utils/
    │   └── api.js
    ├── middleware.js
    ├── components
    │   ├── LocaleSwitcher.jsx
    │   ├── LocaleSwitcherSelect.jsx
    │   ├── Layouts/
    │   ├── Forms/
    │   ├── ui/
    │   │    ├── button.jsx
    │   │    └── input.jsx
    │   └── pages/
    │         └── Home/
    └── context/
    └── app/
        └── [locale]
            ├── layout.jsx
            └── page.jsx

```

- **messages/**: Contains translation messages for different locales.
- **next.config.mjs**: Configuration file for Next.js with alias setup to provide a request-specific i18n configuration.
- **i18n/routing.ts**: Configuration file for handling i18n aspects like language prefixes are handled behind the scenes. And provide wrappers around Next.js’ navigation APIs like `<Link/>` or `{redirect}, {usePathname}, {useRouter}`.
- **i18n/request.ts**: Configuration file for using `next-intl` in Server Components.
- **middleware.ts**: Middleware configuration for Next.js.

## Sending Locale to the Backend with `next-intl`

To ensure your backend returns data in the correct language, you need to send the current locale from the Next.js frontend to the backend. Using next-intl, you can detect the locale with the useLocale hook. Then, you can send the locale to the backend through various methods, such as headers, query parameters, or request bodies.

**Methods to Send Locale**

- **Headers:** Include the locale in the Accept-Language header of your API request.
- **Query Parameters:** Pass the locale as a query parameter in the request URL.

**Backend Handling**

On the backend, you can retrieve the locale from the headers, query parameters, and use it to fetch and return data in the appropriate language.

By synchronizing the locale between the frontend and backend, you ensure that the user receives localized content based on their language preference.

**Example Next.js Frontend: Sending Locale in Headers**

```javascript
// Example of making an API request with locale in headers
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const locale = useLocale();
const locale = Cookies.get("NEXT_LOCALE") || "en";

const getProducts = async () => {
  // console.log("locale: ", locale);
  const res = await axios.get(`${API_URL}/api/v2/products`, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": locale,
    },
  });
  return res.data;
};

export { getProducts };
```

**Example Next.js Frontend: Sending Locale as a Query Parameter**

```javascript
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
// const locale = useLocale();
const locale = Cookies.get("NEXT_LOCALE") || "en";
const fetchData = async () => {
  // console.log("locale: ", locale);
  const response = await axios.get(
    `${API_URL}/api/some-endpoint?locale=${locale}`
  );

  const data = await response.data;
  return data;
};
```

**Example NodeJS Backend:**

```javascript
app.get("/api/some-endpoint", (req, res) => {
  const locale = req.headers["accept-language"] || req.query.locale || "en"; // Default to 'en' if no locale provided

  // Fetch data in the appropriate language based on locale
  const data = getDataForLocale(locale);
  res.json(data);
});
```
