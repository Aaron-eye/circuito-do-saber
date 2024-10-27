"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  let pathName = usePathname();
  const [isAbsolute, setIsAbsolute] = useState(pathName === "/");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.5) {
        setIsAbsolute(false);
      } else {
        setIsAbsolute(true);
      }
    };

    if (pathName === "/") {
      setIsAbsolute(true);
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsAbsolute(false);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathName]);

  const headerClassName = isAbsolute
    ? `${styles.header} ${styles.absolute}`
    : `${styles.header} ${styles.fixed}`;
  const logoSrc = isAbsolute ? "/img/logo.png" : "/img/logo-turned-off.png";

  return (
    <header className={headerClassName}>
      <Link className={styles.logo} href="/">
        <Image src={logoSrc} width={110} height={110} alt="Logo" />
      </Link>
      <nav className={styles.nav}>
        <Link href="/blog">Blog</Link>
        <Link href="/quiz">Quiz</Link>
        <Link href="/simuladores">Simuladores</Link>
        <Link href="/sobre">Sobre</Link>
      </nav>
    </header>
  );
};

export default Header;
