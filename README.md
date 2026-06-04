# Developer Portfolio (Full-Stack Setup)

This repository contains the full-stack codebase for the developer portfolio.

## 📁 Repository Structure

The project is structured into two main subdirectories:

*   **`frontend/`**: The frontend user interface built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.
*   **`backend/`**: An **Express.js** API backend server that handles secure contact form submissions, rate-limiting, and email dispatching via EmailJS/SMTP.

---

## 🚀 Getting Started

To run the application locally, you will need to set up both the frontend and backend.

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure your environment variables:
    ```bash
    cp .env.example .env
    ```
    Open the `.env` file and configure your email delivery preferences (EmailJS REST credentials or SMTP details).
4.  Start the backend server in development mode:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure your environment variables:
    ```bash
    cp .env.example .env.local
    ```
    Open `.env.local` and set `VITE_API_URL=http://localhost:5000` to point to your local backend server.
4.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The site will start on `http://localhost:5173`.

---

## 🛠️ Combined Scripts

For convenience, you can navigate into either folder to run their respective scripts:

| Command (within folder) | Directory | Description |
| :--- | :--- | :--- |
| `npm run dev` | `frontend/` | Starts the React Vite dev server |
| `npm run build` | `frontend/` | Builds the static site for production |
| `npm run dev` | `backend/` | Starts the Express server with auto-reload |
| `npm run start` | `backend/` | Starts the Express server in production |

---

## 📄 License

MIT — feel free to customize and use this for your own portfolio.
