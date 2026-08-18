# Imprenta Website - Full Stack Project

This is the full-stack repository for the Imprenta Website, consisting of a Node.js/Express backend API, a React user-facing frontend, and a React admin dashboard.

## Project Architecture

- `/backend`: Node.js, Express, MongoDB (Mongoose). Contains REST APIs, Authentication (JWT), models and controllers.
- `/client`: React (Vite) frontend application for customers. Styled with Tailwind CSS v4. Uses Redux Toolkit footprint.
- `/admin`: React (Vite) frontend for admins to manage products, categories, orders, contacts, and inquiries.

## Environment Setup

1. Copy `.env.example` in the root and create respective environments:
   - Create `/backend/.env`. Requires `MONGODB_URI` and `JWT_SECRET` (Port default 5000)
   - Create `/client/.env`. Requires `VITE_API_URL=http://localhost:5000/api`
   - Create `/admin/.env`. Requires `VITE_API_URL=http://localhost:5000/api`

## Installation & Setup

You can run the installation script from the root which installs dependencies across all 3 folders:
```bash
npm install
```

## Database Setup & Seeding

Ensure MongoDB is running locally or provide a valid URI in `/backend/.env`.

To migrate the existing mock product data from the client to MongoDB, use the seed script:
```bash
npm run seed
```
*This parses the legacy JS mock data files in `client/src/data` and populates the database.*

## Development Commands

Run the entire stack concurrently (Backend on port 5000, Client on 5173, Admin on 5174):
```bash
npm run dev
```

Alternatively, you can run them individually:
```bash
npm run dev:backend
npm run dev:client
npm run dev:admin
```

## Admin Login Setup

The system automatically supports Admin users via role-based JWT logic. In your local MongoDB database, create a user manually or allow user signups, then upgrade their role to `admin` in the users collection to gain access to the dashboard APIs.

## API Endpoints

- `POST /api/auth/login`: Login user/admin
- `GET /api/products`: Retrieve all products
- `POST /api/products`: Add new product (Admin) (Allows image array, features, specs, badges, and pricing)
- `GET /api/categories`: Retrieve categories
- `POST /api/contact`: Allows clients to submit contact queries
- `POST /api/inquiries`: Allows clients to submit quote requests

## Production Deployment Process

1. Provide correct `MONGODB_URI` and `.env` production variables spanning the ecosystem.
2. Ensure Frontend (`client` and `admin`) have `VITE_API_URL` pointing strictly to your online backend API URL (e.g. `https://api.imprenta.com`).
3. Build logic via `npm run build` in each directory.
4. The express backend can serve static contents from dist/ folders or they can be deployed statically (e.g. on Vercel/Netlify) while backend goes to Render/Fly.io.
