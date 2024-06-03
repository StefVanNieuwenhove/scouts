export type Links = {
  name: string;
  sublinks: {
    name: string;
    href: string;
    permission: string[];
  }[];
};
