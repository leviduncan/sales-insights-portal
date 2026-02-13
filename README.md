# Sales Insights Portal

A financial analytics dashboard with full CRUD capabilities, built with Next.js. Visualizes sales data across segments, countries, and products with interactive charts, and provides authenticated record management.

## Features

- **Interactive Dashboard** — 11 chart and card visualizations including line charts, bar charts, pie charts, scatter plots, and KPI cards
- **Filtering** — Filter data by region and date range across all visualizations
- **CRUD Management** — Create, read, update, and delete financial records via a paginated management interface
- **Auto-Calculated Fields** — Gross Sales, Sales, and Profit auto-compute from input values when creating or editing records
- **Authentication** — NextAuth.js credentials-based auth protects write operations; read access remains public
- **User Management** — Admin interface to create and list application users with secure password hashing
- **Dark/Light Mode** — Theme toggle with full Tailwind CSS dark mode support
- **Standalone Deployment** — Automated CI/CD via GitHub Actions with SCP to a VPS, managed by systemd and Caddy

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (Pages Router) |
| Language | TypeScript 5 |
| UI | React 19, Tailwind CSS 3 |
| Charts | Chart.js 4 + react-chartjs-2 |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | NextAuth.js v4 (Credentials) |
| Server | Caddy (reverse proxy), systemd |
| CI/CD | GitHub Actions |

## Screenshots

*Coming soon*

## Local Run Steps

### Prerequisites

- Node.js 20+
- PostgreSQL running locally

### 1. Clone and install

```bash
git clone https://github.com/your-username/sales-insights-portal.git
cd sales-insights-portal
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your local values:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/sales_insights"
NEXTAUTH_SECRET="run-openssl-rand-hex-32"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_PASSWORD="your-admin-password"
```

### 3. Set up the database

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

This creates the tables and seeds ~1,766 financial records plus an admin user from the bundled JSON dataset.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the dashboard, [http://localhost:3000/manage](http://localhost:3000/manage) for record management, and [http://localhost:3000/users](http://localhost:3000/users) for user management (both require login).

## Deployment Notes

The app deploys automatically when pushing to the `radian-proof` branch via GitHub Actions.

### VPS setup (one-time)

1. **Install PostgreSQL** and create the database:
   ```bash
   sudo apt install postgresql postgresql-contrib
   sudo -u postgres createuser --pwprompt sipuser
   sudo -u postgres createdb -O sipuser sales_insights
   ```

2. **Create the environment file** at `/srv/sales-insights-portal/.env`:
   ```env
   DATABASE_URL="postgresql://sipuser:password@localhost:5432/sales_insights"
   NEXTAUTH_SECRET="your-generated-secret"
   NEXTAUTH_URL="https://sip.darrinduncan.com"
   ```

3. **Configure systemd** to load the env file by adding to the service unit:
   ```ini
   EnvironmentFile=/srv/sales-insights-portal/.env
   ```

4. **Add GitHub Secrets**: `DATABASE_URL`, `SERVER_HOST`, `SERVER_USERNAME`, `SERVER_PASSWORD`

5. **Seed the database** after first deploy:
   ```bash
   cd /srv/sales-insights-portal
   ADMIN_PASSWORD="your-password" npx prisma db seed
   ```

### CI/CD pipeline

On push to `radian-proof`, the workflow:
1. Installs dependencies and generates the Prisma client
2. Builds the Next.js standalone output
3. Bundles the app with Prisma client and migration files
4. SCPs the bundle to the VPS
5. Runs `prisma migrate deploy` on the server
6. Restarts the systemd service and reloads Caddy

## API Endpoints

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/financial-data` | Returns all records as formatted strings (used by dashboard charts) |
| `GET` | `/api/records?page=1&limit=50` | Paginated record list with IDs |
| `GET` | `/api/records/:id` | Single record by ID |

### Authenticated

These endpoints require a valid session (return `401` if unauthenticated).

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/records` | Create a new financial record |
| `PUT` | `/api/records/:id` | Update an existing record |
| `DELETE` | `/api/records/:id` | Delete a record |

### User Management (Authenticated)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users` | List all users (id, username, createdAt) |
| `POST` | `/api/users` | Create a new user (username + password, min 8 chars) |

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signin` | NextAuth sign-in (credentials) |
| `POST` | `/api/auth/signout` | NextAuth sign-out |
| `GET` | `/api/auth/session` | Current session info |
