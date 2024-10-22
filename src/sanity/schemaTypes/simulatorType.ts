import { BoltIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const simulatorType = defineType({
  name: "simulator",
  title: "Simulator",
  type: "document",
  icon: BoltIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});
