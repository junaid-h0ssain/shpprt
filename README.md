# shpprt 

shpprt is a full-stack product sharing app where authenticated users can:

- browse all product listings
- create their own product posts with a title, description, and image URL
- edit or delete their own products
- view product details and comments
- add or remove their own comments

The app uses Clerk for authentication, a TanStack Start frontend, and an Express + Drizzle backend backed by PostgreSQL.

## Tech stack

### Frontend
- React 19
- TanStack Start
- TanStack Router
- TanStack Query
- Vite
- Tailwind CSS v4
- daisyUI
- Clerk React integration
- Axios
- Lucide React icons

### Backend
- Bun runtime
- Express 5
- Drizzle ORM
- PostgreSQL
- Clerk Express middleware
- CORS
- dotenv

## Local development setup

This repository is split into two apps, so install dependencies in both directories.

### 1) Set up PostgreSQL

Make sure you have a PostgreSQL database running locally or remotely, and create an empty database for the app.

### 2) Configure environment variables

Create a `.env` file in `backend/`:

```bash
PORT=3001
DB_URL=postgresql://USER:PASSWORD@localhost:5432/shpprt
FRONTEND_URL=http://localhost:5173
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Create a `.env` file in `frontend/`:

```bash
VITE_API_URL=http://localhost:3001/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

> Use the same Clerk publishable key in both places.

### 3) Install dependencies

From the project root, run:

```bash
cd backend
bun install

cd ../frontend
bun install
```

### 4) Initialize the database

From `backend/`, push the schema to your PostgreSQL database:

```bash
bun run db:push
```

### 5) Start the backend

In one terminal:

```bash
cd backend
bun run dev
```

### 6) Start the frontend

In another terminal:

```bash
cd frontend
bun run dev
```

The app should be available at:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001/api`

## Useful scripts

### Frontend (`frontend/`)
- `bun run dev` — start the dev server
- `bun run build` — build for production
- `bun run preview` — preview the production build
- `bun run test` — run tests with Vitest
- `bun run lint` — lint with Biome
- `bun run format` — format with Biome
- `bun run check` — run Biome checks

### Backend (`backend/`)
- `bun run dev` — run the API in watch mode
- `bun run build` — build to `dist/`
- `bun run start` — run the built server
- `bun run db:push` — push the Drizzle schema to the database
- `bun run db:generate` — generate Drizzle migrations

## Notes

- The frontend expects Clerk auth to be configured and the publishable key to be available at startup.
- The backend allows the frontend origin defined by `FRONTEND_URL`.
- If you change ports, update both `FRONTEND_URL` and `VITE_API_URL` accordingly.
