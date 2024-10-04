type BlockContent = (Block | Image)[];
export default BlockContent;

interface Block {
  _type: "block";
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  listItem?: "bullet";
  children: BlockChild[];
  marks?: BlockMarks;
}

interface BlockChild {
  _type: "span";
  text: string;
  marks?: string[]; // References decorators or annotations
}

interface BlockMarks {
  decorators: ("strong" | "em")[];
  annotations: BlockAnnotation[];
}

interface BlockAnnotation {
  _type: "link";
  href: string;
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: boolean;
}
