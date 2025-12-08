# Safe Haven Consultancy Monorepo

This project is structured as a monorepo containing the frontend and backend applications.

## Structure

- `apps/frontend`: The React frontend application (Vite + TypeScript).
- `apps/backend`: The backend application (Placeholder for future use).

## Getting Started

1.  **Install Dependencies**:
    Run the following command from the root directory to install dependencies for all workspaces:
    ```bash
    npm install
    ```

2.  **Run Frontend**:
    To start the frontend development server:
    ```bash
    npm run dev
    ```
    Or specifically:
    ```bash
    npm run dev --workspace=safehaven-frontend
    ```

## Deployment (Vercel)

When deploying to Vercel:
- **Root Directory**: Keep as `.` (root).
- **Framework Preset**: Vite.
- **Build Command**: `cd apps/frontend && npm run build` (or configure Vercel to point to `apps/frontend` as the root directory for the project).
- **Output Directory**: `apps/frontend/dist`.
