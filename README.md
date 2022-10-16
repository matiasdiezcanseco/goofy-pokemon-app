# goofy-pokemon-app

With this app you can vote on which pokemon is the goofiest.

The project is built with Sveltekit, TailwindCSS, Prisma and MySQL.

## How to run

You will need docker to set the project locally.

To start the project run:

```bash
yarn prisma:schema
yarn db:init
yarn prisma:deploy
yarn dev
```

You will also need to set the .env file with:

```bash
SECRET_ENDPOINT_PASSWORD=xxxxxxxxxxxxxxxxxxxx
DATABASE_URL="mysql://user:password@localhost:3306/goofy-pokemon"
```

SECRET_ENDPOINT_PASSWORD is a protection for the route POST /api/pokemon, which loads all pokemon to the DB.

DATABASE_URL is needed to connect via Prisma to the DB.
