# Crystal Sky Logistics

A full-stack logistics management and customer-facing tracking platform built with Next.js 16, Prisma, and Tailwind CSS.

---

## What's Included

- **Public website** — homepage, about page, track & trace, contact info
- **Customer tracking** — public `/track` page + homepage widget using generated tracking codes
- **Admin dashboard** — create/manage shipments, add status updates, view all shipments
- **Document generation** — printable invoices, receipts, and shipment reports with company letterhead
- **Secure authentication** — HMAC-SHA256 session tokens, HTTP-only cookies, Next.js 16 Edge Proxy
- **Security hardened** — rate limiting, security headers (CSP, HSTS, X-Frame-Options), open-redirect protection, no internal IDs exposed to the public API

---

## Quick Start (Development)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
```
Edit `.env.local`: set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SECRET`, and **`DATABASE_URL`** (a PostgreSQL connection string — use [Neon](https://neon.tech) or [Supabase](https://supabase.com) free tier for local dev).

### 3. Set up the database
```bash
# Ensure DATABASE_URL is set in .env.local (PostgreSQL — e.g. Neon free tier, Supabase, or local Postgres)
npm run db:push     # creates tables from the Prisma schema
npm run db:seed     # loads 6 demo shipments
```

### 4. Run the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

**Default dev login** (from `.env.local.example` after you run `cp .env.local.example .env.local`):
| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | *(set in `.env.local` — see `.env.local.example`)* |

> Use strong, unique credentials in production. Never commit `.env.local`.

---

## Admin Access

| URL | What it does |
|-----|-------------|
| `/admin/login` | Sign in with credentials from `.env.local` |
| `/admin` | Dashboard with live stats |
| `/admin/shipments/new` | Create a new shipment + generate tracking code |
| `/admin/shipments/[id]` | Edit shipment, add status updates, open Invoice / Receipt |
| `/admin/shipments/[id]/invoice` | Printable invoice with company letterhead |
| `/admin/shipments/[id]/receipt` | Printable delivery receipt |
| `/admin/reports` | Full shipments report — printable / export to PDF |

---

## Demo Tracking Codes (seed data)

| Code | Route | Status |
|------|-------|--------|
| `CSL-AF7X2K` | New York → London | Delivered |
| `CSL-OC3B9M` | Shanghai → Rotterdam | In Transit |
| `CSL-RD5H1P` | Manchester → Paris | Out for Delivery |
| `CSL-WH8N4T` | Dubai → Lagos | Processing |
| `CSL-EX2V6R` | Toronto → Tokyo | In Transit |
| `CSL-SC4K7W` | Shenzhen → Amsterdam | Delivered |

---

## Deploying to Production (Vercel)

### 1. Provision a PostgreSQL database

Vercel Postgres was discontinued in December 2024. For new projects, use one of these:

| Provider | Free tier | How to get the connection string |
|----------|-----------|----------------------------------|
| **Neon** (recommended for Vercel) | Yes | [vercel.com/marketplace](https://vercel.com/marketplace) → search "Neon" → install → copy `DATABASE_URL` |
| **Supabase** | Yes | [supabase.com](https://supabase.com) → New project → Settings → Database → Connection string |
| **Railway** | Yes (trial) | [railway.app](https://railway.app) → New project → PostgreSQL → Connect → copy `DATABASE_URL` |

> **Quickest path:** In your Vercel project dashboard, go to **Storage → Browse Marketplace → Neon**. Vercel installs it and automatically adds `DATABASE_URL` to your project's environment variables.

### 2. Generate secure credentials
```bash
# Run this and paste the output into ADMIN_SECRET
openssl rand -hex 32
```

### 3. Deploy
```bash
npx vercel
```

### 4. Set environment variables in Vercel
Go to **Project → Settings → Environment Variables** and add:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | PostgreSQL connection string (auto-set if using Neon via Marketplace) |
| `ADMIN_USERNAME` | Your chosen admin username |
| `ADMIN_PASSWORD` | A strong password |
| `ADMIN_SECRET` | 64-char hex string from `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | Your production domain, e.g. `https://crystalskylogistics.com` |

> The app will throw an error on login if `ADMIN_SECRET` is missing or uses the default dev value in production. This is intentional — it prevents deploying with insecure defaults.

### 5. Push the schema to production
```bash
DATABASE_URL="your-production-url" npx prisma db push
```

Or if you connected Neon through the Vercel Marketplace (env var already set in your project):
```bash
npx vercel env pull .env.production.local
DATABASE_URL=$(grep DATABASE_URL .env.production.local | cut -d '=' -f2-) npx prisma db push
```

### 6. Connect your domain
In Vercel → **Project → Domains**, add your domain. Vercel handles SSL automatically.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Prisma ORM + PostgreSQL (dev and prod — Neon, Supabase, Railway, or local) |
| Auth | HMAC-SHA256 session tokens, HTTP-only cookies, Edge Proxy |
| Images | Unsplash (via `unoptimized` Next.js Image) |

---

## Security Features

| Feature | Implementation |
|---------|---------------|
| Session signing | HMAC-SHA256 with per-deployment secret |
| Credential comparison | Constant-time (`timingSafeEqual`) |
| Cookie flags | HttpOnly + SameSite=Strict + Secure (production) |
| Login rate limiting | 10 attempts per IP per 15 minutes |
| Tracking API rate limiting | 60 requests per IP per minute |
| Open-redirect prevention | `from` param validated to same-origin paths only |
| Internal ID protection | Database `id` never returned in public API responses |
| Security headers | CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy |
| Admin routes | Blocked by Edge Proxy; search engines excluded via `robots.txt` |
| Production secret check | App throws on startup if `ADMIN_SECRET` is default or missing |

---

## Printing Documents

From any Invoice, Receipt, or Report page, click **Print / Download PDF**. The browser print dialog opens. Choose **Save as PDF** as the printer for a clean A4 document. Background colours and the company logo are forced to print via `print-color-adjust: exact`.

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_USERNAME` | Yes | Login username for `/admin` |
| `ADMIN_PASSWORD` | Yes | Login password for `/admin` |
| `ADMIN_SECRET` | Yes | Secret key for signing session tokens (min 32 chars) |
| `DATABASE_URL` | Yes | PostgreSQL connection string (dev and prod) |
| `NEXT_PUBLIC_SITE_URL` | Prod only | Full URL of your site, used for `sitemap.xml` and `robots.txt` |

Copy `.env.local.example` to `.env.local` to get started.
