## This is a `express-typescript-drizzle` starter template

**_Step 1_**

```
npm install
```

**_Step 2_**

```
npm run dev
```

## Folder Structure (src/)

```bash

│   index.ts
│
├───controllers
├───db
│   │   db.ts
│   │
│   └───schema
│           user.ts
│
├───routes
└───utils
```

## Folder Structure Info

- `src/index.ts` -- Main entry file of the project
- `src/db/schema` -- All the schemas must be in this directory
- `src/controllers` -- All the routes logic/controller must me in this directory
- `src/routes` -- All the routes musct be in this directory

## Some Important Rules

1. Use `Promise.all()` when making multiple async calls in a function and those calls are indeprendent of each other
2. Run `npm run gen` and then `npm run migrate` after doing any kind of change in schema
3. All controllers must be wrapped with `TryCatch` untility function from `src/utils/index.ts`
4. Always use `TError` utility function from `src/utils/index.ts` to throw an error in a controller. NOTE: Only use this when the controller is wrapped with `TryCatch`
5. Prefer using `router.route("/path").get().post()` instead of `router.get()` or `router.post()`
