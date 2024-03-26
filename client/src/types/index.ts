export type Route = {
  name: string;
  icon: JSX.Element;
  items?: {
    name: string;
    url: string;
    access: string[];
  }[];
  access: string[];
};
