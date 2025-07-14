Other available scripts are defined in `package.json` and can be run with `pnpm` as well.
=======
# SEN Transport Control Center

This project contains the frontend for a dashboard-style application built with **Next.js** and **React**. It showcases an administration panel used to manage school transport for children with special educational needs.

## Prerequisites

- **Node.js** 18 or later
- A package manager such as **npm** or **pnpm**

## Setup

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

The application will be available on `http://localhost:3000` by default.

## Development Commands

- `npm run dev` – start the development server with hot reload
- `npm run build` – generate a production build
- `npm start` – run the production build locally
- `npm run lint` – run ESLint checks (a basic configuration is provided)

## Dashboard Features

The dashboard demonstrates several modules used to monitor and coordinate school transport:

- **Emergency Alert System** – displays high priority incidents with quick response actions
- **Live Operations Center** – real-time overview of all active bus routes, including status and progress
- **Performance Overview** – key metrics such as on-time rate, safety record, staff utilization and compliance
- **Dashboard Overview** – quick stats on active runs, staff availability and current issues

Additional pages include staff management, job history, route management and reporting sections.

