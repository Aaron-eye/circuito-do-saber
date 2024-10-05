// PostsPage.tsx (Server Component)
import { fetchFilteredPosts } from "@/app/actions/postActions";
import SearchContainer from "@/components/layout/SearchContainer";
import PostCard from "../components/PostCard";
import styles from "./page.module.scss";
import Post from "@/app/types/Post";
import { fetchCategories } from "@/app/actions/postActions";

export default async function PostsPage() {
  const searchHandler = async (selectedFilters: string[]) => {
    "use server";
    const filteredPosts = await fetchFilteredPosts(100, selectedFilters);
    return filteredPosts.map((post: Post) => {
      return <PostCard key={post.slug} post={post} />;
    });
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
