import { standardClient } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(standardClient);

export default function (source: any) {
  return builder.image(source);
}
