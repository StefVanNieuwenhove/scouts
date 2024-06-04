export type Links = {
  name: string;
  authenticaded: boolean;
  sublinks: {
    name: string;
    href: string;
    permission: string[];
  }[];
};
