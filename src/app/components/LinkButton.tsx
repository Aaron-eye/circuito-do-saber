import styles from "./LinkButton.module.scss";

export default function LinkButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <div className={styles["link-button"]}>
      <a href={href} className={className}>
        {children}
      </a>
    </div>
  );
}
