export type Section =
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string };

export type FAQ = { q: string; a: string };

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  keywords: string[];
  updatedAt: string; // ISO date
  readMinutes: number;
  keyTakeaways: string[];
  sections: Section[];
  faqs: FAQ[];
  related?: { category: string; slug: string; title: string }[];
};

export type Category = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  iconName: string; // lucide icon key
  order: number;
  articles: Article[];
};
