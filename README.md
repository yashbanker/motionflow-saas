# 🚀 MotionFlow - SaaS Management Platform

**MotionFlow** is an AI-powered Motion Graphics, Video Editing, Creative Agency, and Freelance Client Management Platform. It features a stunning, state-of-the-art dark-mode UI with high-performance React animations and a fully decoupled REST API.

---

## 🌟 Features

- **Next.js 15 App Router:** Blazing fast React 19 Frontend with SSR and optimized routing.
- **Glassmorphic UI Engine:** Custom-built beautiful, premium UI utilizing Tailwind CSS v4 and Framer Motion.
- **Node.js REST API:** Fully featured Express.js backend with JWT Authentication.
- **Real-Time Engine:** Built-in Socket.IO integrations for instant client messaging.
- **MongoDB Atlas Data Layer:** Highly optimized Mongoose schemas with indexing for fast full-text searching.
- **DevOps Ready:** Pre-configured with `render.yaml` and `vercel.json` for one-click deployments.

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15, React 19, TypeScript
- Tailwind CSS v4, Shadcn UI (Lucide Icons)
- Framer Motion, Zustand

### Backend
- Node.js, Express.js (v5), TypeScript
- MongoDB, Mongoose
- Socket.IO, JWT Auth, Cloudinary

---

## 📦 Local Installation

### 1. Clone & Setup
Clone this repository to your local machine and install the dependencies for both the frontend and backend.

### 2. Backend Setup
1. Navigate to the `backend` directory.
2. Run `npm install`.
3. Create a `.env` file based on `.env.example`.
4. Seed the database with `npx ts-node src/seed.ts` (This creates the initial Admin user).
5. Run the dev server: `npm run dev`.

### 3. Frontend Setup
1. Navigate to the `frontend` directory.
2. Run `npm install`.
3. Start the Next.js server: `npx next dev`.

---

## 🚀 Deployment

The project is fully pre-configured for modern serverless and containerized deployment.

### Deploying the Frontend (Vercel)
The `frontend` directory contains a `vercel.json` file. Simply import the frontend folder into a new Vercel project, and it will automatically build and deploy using Next.js 15 presets.

### Deploying the Backend (Render)
The `backend` directory contains a `render.yaml` configuration file. Connect this repository to your Render.com account as a "Blueprint" and it will instantly spin up the backend Node.js web service. *Note: Ensure you populate your `MONGO_URI` and `JWT_SECRET` in the Render environment variables dashboard.*

---

*Designed and engineered as a world-class platform.*
