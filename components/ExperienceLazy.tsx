"use client";

import dynamic from "next/dynamic";

// Code-splits Experience's accordion JS out of the page's initial bundle.
// Next.js only honours this split when the dynamic() call itself sits
// inside a Client Component — calling dynamic() from a Server Component
// (page.tsx) bundles the target in anyway, so this thin wrapper exists
// purely to give dynamic() a client boundary to run in. The static HTML
// is unaffected: Experience still renders in the prerendered page, only
// its hydration JS is deferred to a separate chunk.
export default dynamic(() => import("./Experience"));
