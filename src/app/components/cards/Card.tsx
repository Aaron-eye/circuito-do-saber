import Link from "next/link";
import styles from "./Card.module.scss";
import Lamp from "../svg/Lamp";
import { ReactElement } from "react";

export default function Card({
  children,
  illustration,
  href,
  title,
  linkText = "Leia mais",
  externalLink = false,
}: {
  children: any;
  illustration?: ReactElement | null;
  href: string;
  title: string;
  linkText?: string;
  externalLink?: boolean;
}) {
  const LinkElement = externalLink
    ? ({ children }: { children: any }) => <a href={`//${href}`}>{children}</a>
    : ({ children }: { children: any }) => <Link href={href}>{children}</Link>;

  return (
    <div className={styles.card}>
      {
        <LinkElement>
          <div className={styles["image-container"]}>
            {illustration ? illustration : <Lamp />}
          </div>
        </LinkElement>
      }
      <div className={styles["text-content"]}>
        <div className={styles["description-container"]}>
          <h3>{title}</h3>
          {children}
        </div>
        <LinkElement>
          <p className={styles["link-text"]}>{linkText}</p>
        </LinkElement>
      </div>
    </div>
  );
}
