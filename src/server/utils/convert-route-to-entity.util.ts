const mapping: Record<string, string> = {
  'guided-selling-solutions': 'guided_selling_solution',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
