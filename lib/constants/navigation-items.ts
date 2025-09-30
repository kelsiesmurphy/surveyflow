export const marketingNavItems = [
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
];

export function dashboardNavItems(surveyId: string) {
  return [
    { label: "Create", href: `/dashboard/${surveyId}` },
    { label: "Share", href: `/dashboard/${surveyId}/share` },
    { label: "Responses", href: `/dashboard/${surveyId}/responses` },
  ];
}
