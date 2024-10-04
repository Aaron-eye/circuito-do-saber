// components/PostCard.jsx

import Link from "next/link";
import styles from "./PostCard.module.scss";
import Post from "../types/Post";
import Lamp from "./svg/Lamp";

const PostCard = ({ post }: { post: any }) => {
  const { title, mainImageUrl } = post;
  const slug = post.slug.current;
  console.log(post);
  const excerpt = post.firstBlocks.map((block: any) => block.text).join(" ");

  const href = `/blog/${slug}`;

  const illustration = mainImageUrl ? (
    <img src={mainImageUrl} alt={title} />
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
