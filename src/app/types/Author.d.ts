export default interface Author {
  name: string;
  slug: {
    current: string;
  };
  image?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
    hotspot?: boolean;
  };
  bio: string | JSX.Element | JSX.Element[];
}
