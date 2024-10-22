import { fetchPostPage } from "@/app/actions/postActions";
import styles from "./page.module.scss";
import Tag from "@/components/svg/Tag";
import Image from "next/image";
import urlForImage from "@/app/utils/urlForImage";
import AuthorImg from "@/components/AuthorImg";

export default async function Post({ params }: { params: any }) {
  const { slug } = await params;

  if (!slug) return;

  const post = await fetchPostPage(slug);
  const { title, publishedAt, mainImage, categoryNames, author, body } = post;

  const authorImgSize = 100;
  const mainImageSize = 1000;

  return (
    <div className={styles["page"]}>
      <div className={styles["page-header"]}>
        <div className={styles["title-container"]}>
          <div className={styles["category-container"]}>
            {categoryNames && (
              <>
                <Tag />
                <span>{categoryNames.join(", ")}</span>
              </>
            )}
          </div>
          <h1 className={styles["title"]}>{title}</h1>
        </div>
        <div className={styles["author-container"]}>
          <div className={styles["author-info"]}>
            <p className={styles["author-name"]}>
              {author && `Escrito por ${author.name}`}
            </p>
            <p className={styles["date"]}>Publicação: {publishedAt + ""}</p>
          </div>
          <div className={styles["image-container"]}>
            <AuthorImg author={author} size={authorImgSize} />
          </div>
        </div>
      </div>
      <div className={styles["main-image-container"]}>
        {mainImage && (
          <Image
            src={urlForImage(mainImage)
              .width(mainImageSize)
              .height(mainImageSize)
              .url()}
            width={mainImageSize}
            height={mainImageSize}
            alt={mainImage.alt || title}
          />
        )}
      </div>
      {body}
    </div>
  );
}
