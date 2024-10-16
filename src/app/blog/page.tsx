// PostsPage.tsx (Server Component)
import { fetchFilteredPosts } from "@/app/actions/postActions";
import SearchContainer from "@/components/layout/SearchContainer";
import PostCard from "../components/PostCard";
import styles from "./page.module.scss";
import Post from "@/app/types/Post";
import { fetchCategories } from "@/app/actions/postActions";
import { SearchHandler } from "@/components/layout/SearchContainer";

export default async function PostsPage() {
  const searchHandler: SearchHandler = async (start, end, filters) => {
    "use server";
    const { posts, amountOfItems } = await fetchFilteredPosts(
      start,
      end,
      filters
    );

    return {
      items: posts.map((post: Post) => {
        return <PostCard key={post.slug} post={post} />;
      }),
      amountOfItems,
    };
  };

  const categoryNames = (await fetchCategories()).map(
    (category: any) => category.title
  );

  return (
    <div className={styles.page}>
      <SearchContainer
        searchSubject="Blog"
        filters={categoryNames}
        searchHandler={searchHandler}
      />
    </div>
  );
}
