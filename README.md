A modern full-stack blog platform built with Next.js, Redux, TailwindCSS, Node.js, Express, and PostgreSQL. Authenticated users can create, edit, delete, and view blog posts. Public users can view posts without logging in.
## Getting Started

Frontend:

Next.js 16

TypeScript

Redux Toolkit

React-Quill (Rich Text Editor)

TailwindCSS

Backend:

Node.js (v22)

Express.js

PostgreSQL

JWT Authentication

bcrypt (Password hashing)

UUID for unique IDs

Backend

Clone the repo

Install dependencies:
npm install

Create .env file:

PORT=5000

# PostgreSQL
DATABASE_URL=postgresql://postgres:123@localhost:5432/blogdb

# JWT
JWT_SECRET=super_strong_jwt_secret_change_me

# Environment
NODE_ENV=development

Start server:
npm run dev

Frontend
1:Install dependencies:
  .npm install
  
Start server:

npm run dev

 API Endpoints

 Delete Post: http://localhost:5000/posts/:id #POST
 
 Create Post: http://localhost:5000/posts #POST
 
 get Post:http://localhost:5000/posts #GET
 
 get Post By ID:http://localhost:5000/posts/:id #GET
 
 Update Post :http://localhost:5000/posts/:id #PUT
 
 Register User:http://localhost:5000/auth/register #POST
 
 Login: http://localhost:5000/auth/login  #POST

🔹 Backend Architecture (Node.js + Express + PostgreSQL)

The backend is structured using a Controller–Service–Repository pattern:

1. Routes Layer

Defines API endpoints and HTTP methods

Applies middlewares (authentication, authorization)

Example: /auth, /posts

2. Controllers Layer

Handles HTTP request/response logic

Validates input and returns standardized responses

Delegates business logic to services

3. Services Layer

Contains all business logic

Interacts with the database using parameterized SQL queries

Handles authentication, authorization, and ownership checks

4. Database Layer

PostgreSQL with normalized tables (users, posts)

UUID primary keys for scalability and security

Indexed foreign keys for performance

5. Middleware

JWT authentication middleware protects private routes

Ensures only post owners can edit/delete content

Centralized error handling and CORS configuration

🔹 Frontend Architecture (Next.js + Redux + Tailwind)

The frontend uses Next.js Pages Router with centralized state management.

1. Pages (Routing Layer)

Each file under /pages maps to a route

Public and protected routes handled via ProtectedRoute component

2. Redux Store

Global state managed using Redux Toolkit

Separate slices for auth and posts

Async operations handled via createAsyncThunk

3. Components

Reusable UI components (Navbar, BlogCard)

Stateless and highly reusable

4. API Layer

Axios instance with interceptors

Automatically attaches JWT token to protected requests

5. Styling

TailwindCSS for utility-first, responsive UI

PostMan Link

https://.postman.co/workspace/My-Workspace~60e8ff28-30b5-4e82-82e5-0cb81dae3b61/collection/29422943-9a328742-659b-4a02-bc06-b72541db33e1?action=share&creator=29422943

Vercel Link 

https://blogs-nine-rosy.vercel.app/
