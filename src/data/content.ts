/**
 * All site content lives here. Edit these arrays to update the site —
 * no component changes needed.
 */

import { longVideos, saasVideos, shortVideos, type VideoItem } from "@/data/videoCatalog";

export type { VideoItem } from "@/data/videoCatalog";

/* ------------------------------------------------------------------ */
/* WORK — videos are auto-generated from public/videos folders.         */
/* ------------------------------------------------------------------ */

export const workSections = [
  { key: "short", label: "Short Form", videos: shortVideos, note: "Reels • Shorts • TikToks — built for the first 3 seconds." },
  { key: "long", label: "Long Form", videos: longVideos, note: "YouTube • Docs • Vlogs — built to hold attention for minutes." },
  { key: "saas", label: "SaaS Videos", videos: saasVideos, note: "Launch films • Walkthroughs • Ads — built to convert." },
] as const;

/* ------------------------------------------------------------------ */
/* TESTIMONIALS                                                        */
/* ------------------------------------------------------------------ */

export type Testimonial = {
  id: string;
  name: string;
  platform: string;
  quote: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "tm1",
    name: "Long-term client",
    platform: "iMessage",
    quote: "You are very talented. Lots of attention to detail. You smashed it 🔥🙌",
    image: "/testimonials/Testimonials 01.webp",
  },
  {
    id: "tm2",
    name: "Long-term client",
    platform: "iMessage",
    quote: "Bro that's insane. I love it.",
    image: "/testimonials/Testimonials 02.webp",
  },
  {
    id: "tm3",
    name: "Joanna",
    platform: "Discord · BINI",
    quote: "This is really cool. I really like it — great job!",
    image: "/testimonials/Testimonials 03.webp",
  },
  {
    id: "tm4",
    name: "Obvix Labs",
    platform: "WhatsApp",
    quote: "Gjb ❤️ — (good job, bro)",
    image: "/testimonials/Testimonial 04.webp",
  },
  {
    id: "tm5",
    name: "4th Hebrew",
    platform: "WhatsApp",
    quote: "Brothererrrr — you're insane!",
    image: "/testimonials/Testimonials 05.webp",
  },
  {
    id: "tm6",
    name: "Reefbash",
    platform: "WhatsApp",
    quote: "You're the f***ing best. Run it my brother! 💪",
    image: "/testimonials/Testimonials 06.webp",
  },
  {
    id: "tm7",
    name: "Long-term client",
    platform: "iMessage",
    quote: "You actually killed it. I can't stop watching it — it's so satisfying.",
    image: "/testimonials/Testimonial 07.webp",
  },
];

export const crowdChatter = [
  "...",
  "🔥",
  "brooo",
  "legend",
  "so clean",
  "insane",
  "👏",
  "smooth",
  "no notes",
  "🔥🔥",
  "chef's kiss",
  "run it back",
];

/* ------------------------------------------------------------------ */
/* CLIENTS                                                            */
/* ------------------------------------------------------------------ */

export const clients = [
  { name: "Obvix Labs", tag: "SaaS" },
  { name: "4th Hebrew", tag: "Creator" },
  { name: "BINI · Joanna", tag: "Creator" },
  { name: "Reefbash", tag: "Brand" },
  { name: "Magnet Media", tag: "Agency" },
];

/* ------------------------------------------------------------------ */
/* SERVICES                                                           */
/* ------------------------------------------------------------------ */

export const services = [
  {
    title: "Short Form Editing",
    line: "Reels, Shorts & TikToks engineered for the scroll.",
    detail: "Hook development, beat-synced cuts, captions, SFX and platform-native pacing — every second earning the next one.",
  },
  {
    title: "Long Form Editing",
    line: "YouTube videos and docs that hold attention.",
    detail: "Story structure, chaptering, b-roll weaving, retention-first pacing and clean audio — made for 10+ minute watch times.",
  },
  {
    title: "SaaS Product Videos",
    line: "Launch films and walkthroughs that convert.",
    detail: "Script support, UI choreography, motion graphics and a narrative that turns features into reasons to buy.",
  },
  {
    title: "Ads & Performance Creatives",
    line: "Creatives built to survive paid traffic.",
    detail: "Multiple hooks per edit, benefit-first framing and iterations based on what the data says — not vibes.",
  },
  {
    title: "YouTube Editing",
    line: "A channel's backbone, handled end to end.",
    detail: "Consistent style system, thumbnails-ready frames, intros that don't leak viewers and packaging that earns the click.",
  },
  {
    title: "Content Repurposing",
    line: "One recording → a month of content.",
    detail: "Long form sliced into platform-native clips, each with its own hook, format and caption strategy.",
  },
];

/* ------------------------------------------------------------------ */
/* PROCESS                                                            */
/* ------------------------------------------------------------------ */

export const processSteps = [
  { step: "01", title: "Discovery", text: "A quick call or chat. I learn your content, audience and what 'working' looks like for you." },
  { step: "02", title: "Strategy", text: "We lock the angle, hooks and format before any timeline opens. No guessing." },
  { step: "03", title: "Editing", text: "The real work — story, pacing, motion, sound. You'll see a first cut fast." },
  { step: "04", title: "Feedback", text: "Structured rounds with timestamped comments. Revisions are quick and exact." },
  { step: "05", title: "Delivery", text: "Platform-ready exports, every format you need, on time. Then we do it again." },
];

/* ------------------------------------------------------------------ */
/* WHY UNIX                                                           */
/* ------------------------------------------------------------------ */

export const othersTraits = ["Generic edits", "No storytelling", "Slow delivery", "Random trends"];
export const UnixTraits = [
  "Retention-focused cuts",
  "Modern motion & sound design",
  "Clean, premium design",
  "Fast, clear communication",
];

/* ------------------------------------------------------------------ */
/* BOOKING — replace with the real details when ready.                */
/* ------------------------------------------------------------------ */

export const WHATSAPP_NUMBER = "910000000000"; // ← put Unix's WhatsApp number here (country code, no +)
export const CALENDAR_URL = "https://cal.com/unix"; // ← replace with the real booking link

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];
