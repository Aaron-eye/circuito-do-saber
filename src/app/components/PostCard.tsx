// components/PostCard.jsx

import Link from "next/link";
import styles from "./PostCard.module.scss";

const PostCard = ({
  title,
  excerpt,
  slug,
}: {
  title: string;
  excerpt: string;
  slug: string;
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={"/img/hero.png"} alt={title} />
      </div>
      <div className={styles.textContent}>
        <div className={styles.descriptionContainer}>
          <h3>{title}</h3>
          <p>{excerpt}</p>
        </div>
        <Link className={styles.readMore} href={`/blog/${slug}`}>
          Leia Mais
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
