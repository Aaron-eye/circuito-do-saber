import BlockContent from "./BlockContent";

export default interface Post {
  title: string;
  slug: string;
  body: BlockContent;
}
