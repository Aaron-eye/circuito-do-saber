import { projectId, dataset } from "@/sanity/env";
// @ts-ignore
import blocksToHtml from "@sanity/block-content-to-html";
import parse from "html-react-parser";

const h = blocksToHtml.h;
const serializers = {
  types: {
    code: (props: any) =>
      h("pre", { className: props.node.language }, h("code", props.node.code)),
  },
};

export default function blockToJSX(block: any) {
  const htmlBlock = blocksToHtml({
    projectId,
    dataset,
    blocks: block,
    serializers: serializers,
  });
  console.log(htmlBlock);

  const blockContent = parse(htmlBlock);
  return blockContent;
}
