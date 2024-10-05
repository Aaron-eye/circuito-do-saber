export default interface Author {
  name: string;
  slug: string;
  image?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
    hotspot?: boolean;
  };
  bio: BlockContent;
}
