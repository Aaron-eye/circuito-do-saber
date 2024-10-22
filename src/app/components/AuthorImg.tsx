import Author from "../types/Author";
import Image from "next/image";
import urlForImage from "@/app/utils/urlForImage";

export default function AuthorImg({
  author,
  size,
}: {
  author: Author;
  size: number;
}) {
  const authorImg = author.image ? (
    <Image
      src={urlForImage(author.image).width(size).height(size).url()}
      width={size}
      height={size}
      alt={author.name}
    />
  ) : (
    <Image
      src={"/img/empty-avatar.png"}
      width={size}
      height={size}
      alt={"Avatar vazio"}
    />
  );

  return authorImg;
}
