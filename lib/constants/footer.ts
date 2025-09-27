import { brand } from "./brand";

interface FooterItem {
  title: string;
  link: string;
}

export interface FooterColumn {
  title: string;
  items: FooterItem[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: brand.name,
    items: [
      {
        title: "Features",
        link: "#features",
      },
      {
        title: "Pricing",
        link: "#pricing",
      },
      {
        title: "FAQ",
        link: "#faq",
      },
      {
        title: "Terms and Conditions",
        link: "/terms",
      },
      {
        title: "Privacy Policy",
        link: "/privacy",
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        title: "Preview",
        link: "/preview",
      },
    ],
  },
  {
    title: "Social",
    items: [
      {
        title: "Bluesky",
        link: brand.bluesky,
      },
      {
        title: "Instagram",
        link: brand.instagram,
      },
    ],
  },
];
