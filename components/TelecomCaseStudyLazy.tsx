"use client";

import dynamic from "next/dynamic";

// See ExperienceLazy.tsx for why this wrapper exists — SelectedWork is a
// Server Component, so the schematic's JS needs a client boundary to
// dynamically import from.
export default dynamic(() => import("./TelecomCaseStudy"));
