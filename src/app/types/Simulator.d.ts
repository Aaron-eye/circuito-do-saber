export default interface Simulator {
  title: string;
  url: string;
  description: string;
  image: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
    hotspot?: boolean;
  };
}
