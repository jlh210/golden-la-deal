export type Section =
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string };

export type FAQ = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  keywords: string[];
  category: string; // display label — e.g. "Buying", "Selling", "Licensing", "LA Market"
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date, defaults to publishedAt
  readMinutes: number;
  keyTakeaways: string[];
  sections: Section[];
  faqs: FAQ[];
  related?: { slug: string; title: string }[];
};
