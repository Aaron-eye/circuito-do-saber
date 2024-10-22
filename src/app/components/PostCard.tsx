// components/PostCard.jsx

import Link from "next/link";
import styles from "./PostCard.module.scss";
import Lamp from "./svg/Lamp";
import urlForImage from "../utils/urlForImage";
import Image from "next/image";

const PostCard = ({ post }: { post: any }) => {
  const { title, mainImage } = post;

  const slug = post.slug.current;
  const excerpt = post.firstBlocks.map((block: any) => block.text).join(" ");

  const href = `/blog/${slug}`;

  let mainImageUrl;
  if (mainImage) {
    try {
      mainImageUrl = urlForImage(mainImage).width(400).height(400).url();
    } catch (err) {
      console.log(err);
    }
  }

  const illustration = mainImageUrl ? (
    <Image width={400} height={400} src={mainImageUrl} alt={title} />
  ) : (
    <Lamp />
  );

  return (
    <div className={styles.card}>
      <Link href={href} className={styles["image-container"]}>
        {illustration}
      </Link>
      <div className={styles["text-content"]}>
        <div className={styles["description-container"]}>
          <h3>{title}</h3>
          <p>{excerpt}</p>
          <div className={styles["gradient"]}></div>
        </div>
        <Link className={styles["read-more"]} href={href}>
          Leia Mais
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
