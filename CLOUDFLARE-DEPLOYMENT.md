# Cloudflare deployment notes

## Important

This project is a **full-stack Next.js app** using:

- App Router
- Route Handlers (`/api/remove-background`)
- server-side environment variables

Because of that, it should **not** be deployed as a static Cloudflare Pages site.

For Cloudflare, the correct deployment path is:

- **Cloudflare Workers + OpenNext adapter** for runtime
- Git-connected deployment from the Cloudflare dashboard / Workers & Pages

## Why not static Pages?

Cloudflare's own docs distinguish between:

- **static Next.js on Pages**
- **full-stack SSR Next.js on Workers**

This app needs the Workers path because it has a server endpoint.

## Required environment variables

Configure the following in Cloudflare:

- `REMOVE_BG_API_KEY`

## Build / deploy commands

### Local Cloudflare preview

```bash
pnpm cf:preview
```

### Build for Cloudflare

```bash
pnpm cf:build
```

### Deploy with Wrangler

```bash
pnpm cf:deploy
```

## Wrangler config

The project includes:

- `open-next.config.ts`
- `wrangler.jsonc`

## Recommended dashboard setup

In Cloudflare dashboard, create a **Workers/Next.js deployment** connected to the GitHub repo instead of trying to use static Pages output.

Repository:

- `ada31e-svg/image-background-remover`

Production branch:

- `main`
