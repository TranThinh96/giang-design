"use client";

import { makePage } from "@keystatic/next/ui/app";
import config from "@/keystatic.config";

/** The admin SPA. Client-only — it talks to /api/keystatic in the browser. */
export default makePage(config);
