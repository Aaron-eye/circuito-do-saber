import { standardClient } from "@/sanity/client";
import Post from "@/app/types/Post"; // Adjust the import based on your types
import Category from "../types/Category";

export async function fetchFilteredPosts(
  itemType: string,
  filters: string[]
): Promise<Post[]> {
  const categoryIds = (
    await standardClient.fetch(
      `*[_type == "category" && title in [${filters.map((f) => `"${f}"`).join(",")}]] {
      _id
    }`
    )
  ).map((category: any) => category._id);

  const filterQuery = filters.length
    ? `&& ${categoryIds.map((id: any) => `"${id}" in categories[]._ref`).join(" && ")}`
    : "";

  const query = `*[_type == "${itemType}" ${filterQuery}]{
      'firstBlocks': body[_type == 'block'][0..4].children[_type == 'span'],
      'mainImageUrl': mainImage.asset->url,
      title,
      slug
    }`;

  return await standardClient.fetch<Post[]>(query);
}

export async function fetchPost(slug: string): Promise<Post> {
  const query = `*[_type == "post" && slug.current == $slug]`;
  const post = await standardClient.fetch(query, { slug });
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
