This is source code for online course https://www.youtube.com/watch?v=MZbwu3-uz3Y
 - use bun as build tool
 - next.js strandard project
 - shadcn-ui

## Video Sections
 - chap
 - chapter/3-sign-up ends 1:31:50
 - chapter/4-convex-quick ends 1:58:43
## Create project

```bash
bun create next-app@latest nextjs-16-tutorial-yt --yes
bunx --bun shadcn@latest init
bunx --bun shadcn@latest add button
```

### Add card
```bash
bunx --bun shadcn@latest add card
bunx --bun shadcn@latest add field
bunx --bun shadcn@latest add input
bunx --bun shadcn@latest add separator 
bun install react-hook-form
bun install zod
bun install @hookform/resolvers
```

### Baas(convex)
```bash
bun install convex
bunx convex dev
bunx convex import --table tasks sampleData.jsonl
# after finish @convex/tasks.ts
bunx convex dev 
```
>> https://docs.convex.dev/quickstart/nextjs

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
