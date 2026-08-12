"use client";

import dynamic from "next/dynamic";

// See ExperienceLazy.tsx for why this wrapper exists.
export default dynamic(() => import("./CaseStudySteps"));
