import Author from "./Author";

export default interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  body: string | JSX.Element | JSX.Element[];
  categoryNames: string[];
  publishedAt: Date;
  author: Author;
  mainImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
    hotspot?: boolean;
  };
}
