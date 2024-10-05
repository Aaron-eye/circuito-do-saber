import { standardClient } from "@/sanity/client";
import Post from "@/app/types/Post"; // Adjust the import based on your types
import Category from "../types/Category";

const cardPostContent = `
  'firstBlocks': body[_type == 'block'][0..4].children[_type == 'span'],
  mainImage,
  title,
  slug,
`;

export async function fetchFilteredPosts(
  amount: number,
  filters: string[] = []
): Promise<Post[]> {
  const categoryIds = (
    await standardClient.fetch(
      `*[_type == "category" && title in [${filters.map((f) => `"${f}"`).join(",")}]] {
        _id
      }`
    )
  ).map((category: any) => category._id);

  const filterQuery = categoryIds.length
    ? `&& ${categoryIds.map((id: any) => `"${id}" in categories[]._ref`).join(" && ")}`
    : "";

  const query = `*[_type == "post" ${filterQuery}] | order(publishedAt desc)[0..${amount - 1}] { ${cardPostContent} }`;

  return await standardClient.fetch<Post[]>(query);
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
    { cache: "no-store" } //Not a good practice, but we want to avoid caching
  );
  console.log(post);

  return post[0];
}

export async function fetchCategories(): Promise<Category[]> {
  const query = `*[_type == "category"]{
      title,
      slug
    }`;

  return await standardClient.fetch<Category[]>(query);
}
