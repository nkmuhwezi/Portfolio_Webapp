"use client";

import dynamic from "next/dynamic";

// See ExperienceLazy.tsx for why this wrapper exists — CaseStudyFeature
// is a Server Component, so its carousel JS needs a client boundary to
// dynamically import from.
export default dynamic(() => import("./CaseStudyGallery"));
