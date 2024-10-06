import { fetchPostPage } from "@/app/actions/postActions";
import blockToJSX from "@/app/utils/blockToJSX";
import styles from "./page.module.scss";
import Tag from "@/app/components/svg/Tag";
import Image from "next/image";
import urlForImage from "@/app/utils/urlForImage";

export default async function Post({ params }: { params: any }) {
  const { slug } = params;

  if (!slug) return;

  const post = await fetchPostPage(slug);
  const { title, publishedAt, mainImage, categoryNames, author } = post;
  const formattedDate = new Date(publishedAt).toLocaleDateString("pt-BR");
  const postContent = blockToJSX(post.body);

  const authorImgSize = 100;

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
            <p className={styles["date"]}>Publicação: {formattedDate + ""}</p>
          </div>
          <div className={styles["image-container"]}>
            {author && (
              <Image
                src={urlForImage(author.image)
                  .width(authorImgSize)
                  .height(authorImgSize)
                  .url()}
                width={authorImgSize}
                height={authorImgSize}
                alt={author.name}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles["main-image-container"]}>
        {mainImage && (
          <Image
            src={urlForImage(mainImage).width(400).height(300).url()}
            width={700}
            height={400}
            alt={slug}
          />
        )}
      </div>
      {postContent}
    </div>
  );
}
