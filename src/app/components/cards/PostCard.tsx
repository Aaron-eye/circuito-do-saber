import styles from "./PostCard.module.scss";
import urlForImage from "../../utils/urlForImage";
import Image from "next/image";
import Card from "./Card";

const PostCard = ({ post }: { post: any }) => {
  const { title, mainImage } = post;

  const slug = post.slug.current;
  const excerpt = post.firstBlocks.map((block: any) => block.text).join(" ");

  const href = `/blog/${slug}`;

  let mainImageUrl;
  if (mainImage) {
    mainImageUrl = urlForImage(mainImage).width(400).height(400).url();
  }
  const illustration = mainImageUrl ? (
    <Image
      width={400}
      height={400}
      src={mainImageUrl}
      alt={mainImage.alt || title}
    />
  ) : null;

  return (
    <div className={styles["post-card"]}>
      <Card illustration={illustration} href={href} title={title}>
        <p>{excerpt}</p>
        <div className={styles["gradient"]}></div>
      </Card>
    </div>
  );
};

export default PostCard;
