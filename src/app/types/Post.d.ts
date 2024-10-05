import Author from "./Author";
import BlockContent from "./BlockContent";

export default interface Post {
  title: string;
  slug: string;
  body: BlockContent;
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
