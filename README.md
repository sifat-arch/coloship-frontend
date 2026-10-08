# 📦 Coloship Frontend

**Coloship** is a modern, responsive Courier & Logistics Management Web Application built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **TypeScript**. It provides comprehensive portals for **Customers**, **Couriers**, and **Admins** with real-time parcel tracking, dynamic status updates, and interactive dashboards.

---

## 🚀 Key Features

### 👤 1. Customer Portal
- **Parcel Booking:** Create new shipments with pickup/delivery addresses, weight, parcel types, and delivery speed (Standard / Express).
- **Live Parcel Journey:** Real-time tracking with visual status indicators (Created, Picked Up, In Transit, Delivered, Cancelled).
- **Shipment Management:** View past orders, track deliveries, copy tracking numbers, and cancel eligible pending bookings.
- **Payment & Invoicing:** Integrated payment status displays (e.g., bKash gateway integration) and cash-on-delivery tracking.

### 🚚 2. Courier Portal
- **Task Management:** Real-time list of assigned parcel pickups and drop-offs.
- **Status Updates:** Update shipment progress (Pick up parcel, Mark as in-transit, Complete delivery).
- **Task Sheets:** Slide-over detail drawer for recipient details, routing notes, and contact buttons.

### 🛡️ 3. Admin Portal
- **User Management:** Manage customers, couriers, and administrators with role-based access control.
- **Courier Approvals:** Review and approve courier applications and credentials.
- **Shipment Overview:** Central control room to monitor all logistics activity across the network.

### ⚡ 4. Platform & UI/UX Highlights
- **Smooth Navigation & Motion:** Ultra-smooth scrolling powered by **Lenis** and fluid animations via **Framer Motion**.
- **Responsive Drawer / Sheet Modals:** Detail sheets and slide-overs with optimized wheel and touch scrolling.
- **Authentication:** Quick login, email/password credentials, OTP input verification, and Google OAuth integration.
- **Dark / Light Theme Ready:** Accessible, modern aesthetic built with Tailwind CSS v4 and Base UI primitives.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React Framework (App Router, Static Export configured) |
| **React 19** | UI Library |
| **TypeScript** | Static Type Safety |
| **Tailwind CSS v4** | Utility-First Modern CSS Framework |
| **Base UI / Shadcn** | Accessible, unstyled UI primitives & components |
| **Framer Motion** | Micro-interactions and drawer transitions |
| **TanStack Query (v5)** | Server state management and caching |
| **TanStack Form + Zod** | Type-safe form validation |
| **Lenis** | Smooth page scrolling |
| **Biome** | High-performance linter and code formatter |
| **Bun** | Fast package manager and runtime |

---

## 📁 Project Structure

```text
coloship-frontend/
├── public/                 # Static assets, icons, and illustrations
├── src/
│   ├── api/                # API client functions and endpoints
│   ├── app/                # Next.js App Router
│   │   ├── (dashboard)/    # Authenticated dashboard views
│   │   │   ├── admin/      # Admin dashboard & controls
│   │   │   ├── courier/    # Courier tasks & status portal
│   │   │   └── customer/   # Customer bookings & tracking
│   │   ├── (public)/       # Public marketing & auth routes
│   │   │   ├── (authentication)/ # Login, register, forgot password
│   │   │   └── (marketing)/      # Home, tracking, about, pricing
│   │   ├── layout.tsx      # Root application layout
│   │   └── globals.css     # Tailwind CSS styles & design tokens
│   ├── components/         # Reusable UI components
│   │   ├── modules/        # Domain-specific feature modules
│   │   │   ├── courier-approval/
│   │   │   ├── courier-tasks/
│   │   │   ├── customer-shipments/
│   │   │   ├── shipment/
│   │   │   └── user-management/
│   │   └── ui/             # Core UI components (button, sheet, dialog, etc.)
│   ├── hooks/              # Custom React Query & UI hooks
│   ├── lib/                # Shared utilities & API configurations
│   ├── providers/          # QueryClient, SmoothScroll, & Auth providers
│   ├── types/              # TypeScript interface & type definitions
│   └── validation/         # Zod schemas for forms and validations
├── next.config.ts          # Next.js configuration (static export setup)
├── package.json            # Dependencies and npm scripts
└── README.md               # Project documentation
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API Base URL
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api/v1

# Google OAuth Client ID (Optional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

---

## 🏃 Getting Started

### 1. Install Dependencies
Using **Bun** (recommended):
```bash
bun install
```
Or using **npm**:
```bash
npm install
```

### 2. Run Development Server
```bash
bun run dev
# or
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
This project is configured with `output: "export"` in `next.config.ts`, generating a static HTML/CSS/JS build inside the `out/` folder:
```bash
bun run build
# or
npm run build
```

### 4. Lint & Code Quality
```bash
bun run lint
# or formatting
bun run format
```

---

## 🚀 Deployment

- **Vercel:** Connect the GitHub repository directly to Vercel for automatic CI/CD on every push.
- **Static Hosting (Netlify / GitHub Pages / Cloudflare Pages / VPS):**
  Run `bun run build` and upload/serve the generated `out/` directory.
