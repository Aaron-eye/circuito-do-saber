import { standardClient } from "@/sanity/client";
import Author from "@/app/types/Author";
import blockToJSX from "../utils/blockToJSX";

export async function fetchAllAuthors(): Promise<Author[]> {
  const query = `*[_type == "author"]{
    name,
    slug,
    image,
    bio
  }`;
  const authors = await standardClient.fetch(
    query,
    {},
    { cache: "no-store" } //Not a good practice, but we want to avoid caching
  );

  const formattedAuthors = authors.map((author: any) => {
    const { bio, ...rest } = author;
    return {
      ...rest,
      bio: blockToJSX(author.bio),
    };
  });

  return formattedAuthors;
}
