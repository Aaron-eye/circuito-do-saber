import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { simpleBlockContentType } from "./simpleBlockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    simpleBlockContentType,
    categoryType,
    postType,
    authorType,
  ],
};
