import { fetchPost } from "@/app/actions/postsActions";
import blockToJSX from "@/app/utils/blockToJSX";
import styles from "./page.module.scss";

export default async function Post({ params }: { params: any }) {
  const { slug } = params;

  if (!slug) return;

  const post = await fetchPost(slug);
  const postContent = blockToJSX(post.body);

  return <div className={styles["page"]}>{postContent}</div>;
}
