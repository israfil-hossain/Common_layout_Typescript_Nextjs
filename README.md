Frontend template
=================

ReactJS frontend template.

Requirements
============

- NodeJS
- Typescript
- NextJS (13.2.0)
- Primereact [https://primereact.org/](https://primereact.org/)

How to run
==========

First install dependencies - 

```
npm ci
```

To run in development mode -

```
npm run dev
```

To run in production mode, first build -

```
npm run build
```

then run in production mode -

```
npm run start
```

Environmental variables
=======================

To add an environmental variable follow these steps - 

1. Add the variable in *.env.example* file first
2. Then modify *src/types/env.d.ts* file to add typing support for that variable
3. Update your *.env* file, include the variable with its proper value
4. Use the variable in code

Setting up Editor/IDE
=====================

1. Use [prettier](https://prettier.io/) for code formatting. 
2. Disable ESLint (it is a typescript project, just utilize typescript as much as possible)

Pre-installed libraries
=======================

- [Primereact](https://primereact.org/) (CSS and Component library, default font set to Poppins)
- [Primeflex](https://primeflex.org/) (CSS Utility class library)
- [Formik](https://formik.org/) (Form state management)
- [Yup](https://github.com/jquense/yup) (Form validation)
- [React toastify](https://github.com/fkhadra/react-toastify) (To show toast messages)
- [Lodash](https://lodash.com/) (JS utility functions)
- [React use](https://github.com/streamich/react-use) (Many utility type hooks)
- [Luxon](https://moment.github.io/luxon) (Datetime processing)
- [SWR](https://swr.vercel.app/) (Client side data fetching, use pre-built hooks instead)
- [Axios](https://axios-http.com/) (Data fetching in both client side and server side, use pre-built hooks instead)
- [React HTML Parser](https://github.com/wrakky/react-html-parser) (To render strings which hae html in them, use pre-built component instead of it directly)
- [Next Auth](https://next-auth.js.org/) (For authentication and route guard)
- [React Icons](https://github.com/react-icons/react-icons) (For SVG icon components)

Feature based code organization
===============================
- Under *features* folder create folders for each separate isolated features of the project. i.e *auth*, *layouts* etc. 
- Each feature will correspond to a single folder. Consider a folder under *features* folder as a separate feature. 
- Any feature can have more child features. i.e *auth/next-auth*, here *next-auth* is
a child feature under *auth* feature. 
- One feature should contain all of it's code within it. This includes components, hooks,
constants, utility functions, static images everything.
- Each feature (including child features) must have an *index.ts* or *index.tsx* file in it. Purpose of this file is to re-export parts of the feature, so that other features can import them and use them.
- When importing something from another feature, do not use full file path to import it. For example, say feature *a* exports a component named *AComponent*, to import this component in feature *b* use this syntax - *import { AComponent } from "features/a";

Naming convention
=================

- All lower cased file and folder names with dashes between words. i.e *avatar.component.tsx*
- Add appropriate suffixes/extensions after a file's base name. But not all files will required extensions (see examples). i.e add *.component.tsx* after *avatar* to name the file which has an *Avatar* component in it. like *avatar.component.tsx*. More examples will be *use-user.hook.tsx*, *profile-provider.component.tsx*, *constants.ts* etc
- Components, functions (exported ones) should be named like *MyComponent* or *DoSomething*
- Don't use default export.

Restrictions that should be followed
====================================

- Do not use *any* type
- Must provide proper typing at every stage/statement/expression
- Use short circuit syntax in react to render components conditionally, not ternary operation
- Make use of the builtin hooks of react whenever you can
- Do not mask any statement/expression/file with *ts-ignore* or *eslint-ignore* type comment
- Try utilizing pre-installed libraries as much as you can
- Do not create any component/hook or any function that exceeds 100-150 lines of code. If that happens break it into smaller component/hook/function.
- Try to create re-usable small components
- Do not implement any logic/component or anything inside *src/pages*. Each page should only render one component from a feature. Implement all your logic inside feature.

API data structure
==================

When using the built-in components (form inputs, datatable etc) with an API gateway,
following data structures must be maintained by the API gateway -

- All API responses must be JSON, exceptions are the file serving endpoints
- For POST, PUT, PATCH, DELETE, the returned object should be the created/edited object itself, not a partial object
- API's error response must maintain the following structure -
```
{
  status?: number; // HTTP status code
  message?: string; // Single error message (i.e user already exists when registering)
  validationErrors?: Object; // Validation error messages, more later
}
```

For validation errors, the object returned in the property *validationErrors* must follow 
the same data structure of the input form. For example if the form data is as follows -

```
{
    "name": "",
    "password": "123"
}
```

then the validation errors must be of the following structure -

```
{
    "name": "Name is required",
    "password": "Password must be at least 6 characters"
}
```

- Listing API endpoints with server side pagination, searching, sorting, filtering etc must maintain the following data structure -

```
export type PaginationResponse<T = DataTableValue> = {
  docs: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalDocs: number;
  hasNext: boolean;
  hasPrev: boolean;
};
```

All listing endpoints should at least utilize the following query parameters -

```
export type PaginationParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortType;
  search?: string;
};
```

For more details see - [types.ts](./src/features/ui/datatable/types.ts). There is also an example listing API built in the [demo-api](./src/features/demo-api) feature.
