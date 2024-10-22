import Card from "@/app/components/cards/Card";
import Simulator from "@/app/types/Simulator";
import urlForImage from "@/app/utils/urlForImage";
import Image from "next/image";
import styles from "./SimulatorCard.module.scss";

export default function SimulatorCard({ simulator }: { simulator: Simulator }) {
  const { title, url, description, image } = simulator;

  let imageUrl;
  if (image) {
    imageUrl = urlForImage(image).width(400).height(400).url();
  }
  const illustration = imageUrl ? (
    <Image width={600} height={600} src={imageUrl} alt={image.alt || title} />
  ) : null;

  return (
    <div className={styles["simulator-card"]}>
      <Card
        title={title}
        href={url}
        illustration={illustration}
        linkText="Jogue"
        externalLink={true}
      >
        <p>{description}</p>
      </Card>
    </div>
  );
}
