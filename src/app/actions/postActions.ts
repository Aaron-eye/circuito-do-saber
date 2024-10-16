import { standardClient } from "@/sanity/client";
import blockToJSX from "@/app/utils/blockToJSX";
import Post from "@/app/types/Post"; // Adjust the import based on your types
import Category from "../types/Category";

type FetchFilteredPostsResult = {
  posts: Post[];
  amountOfItems: number;
};

export async function fetchFilteredPosts(
  start: number,
  end: number,
  filters: SearchHandlerFilters = {}
): Promise<FetchFilteredPostsResult> {
  const { selectedCategories = [], searchTerm = "" } = filters;

  let categoryMatchFilter = "";
  if (selectedCategories.length) {
    const stringifiedFilters = `[${selectedCategories.map((filter) => `"${filter}"`).join(", ")}]`;
    categoryMatchFilter = `&& count((categories[]->title)[@ in ${stringifiedFilters}]) >= ${selectedCategories.length}`;
  }

  let searchTermFilter = "";
  if (searchTerm) {
    searchTermFilter = `&& title match "${searchTerm}*"`;
  }

  const filterQuery = `*[_type == "post" ${categoryMatchFilter} ${searchTermFilter}]`;

  const query = `${filterQuery} | order(publishedAt desc) [${start}...${end}] {
    'firstBlocks': body[_type == 'block'][0..4].children[_type == 'span'],
    mainImage,
    title,
    slug,
    publishedAt,
  }`;
  const posts = await standardClient.fetch<Post[]>(query);

  const countQuery = `count(${filterQuery})`;
  const amountOfItems = await standardClient.fetch<number>(countQuery);

  return { posts, amountOfItems };
}

export async function fetchPostPage(slug: string): Promise<Post> {
  const query = `*[_type == "post" && slug.current == $slug]{
    title,
    author->,
    mainImage,
    'categoryNames': categories[]->title,
    publishedAt,
    body,
  }`;
  const post = await standardClient.fetch(
    query,
    { slug },
    { cache: "no-store" }
  );

  const { publishedAt, body, ...rest } = post[0];

  const formattedPost = {
    ...rest,
    publishedAt: new Date(publishedAt).toLocaleDateString("pt-BR"),
    body: blockToJSX(body),
  };

  return formattedPost;
}

export async function fetchCategories(): Promise<Category[]> {
  const query = `*[_type == "category"]{
      title,
      slug
    }`;

  return await standardClient.fetch<Category[]>(query);
}
