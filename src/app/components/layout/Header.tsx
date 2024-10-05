"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const [isScrolledPastHalf, setIsScrolledPastHalf] = useState(false);

  const defaultHeaderClassName = `${styles.header} ${styles.fixed}`;
  let headerClassName = defaultHeaderClassName;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.5) {
        setIsScrolledPastHalf(true);
      } else {
        setIsScrolledPastHalf(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (usePathname() === "/") {
    headerClassName = isScrolledPastHalf
      ? defaultHeaderClassName
      : `${styles.header} ${styles.absolute}`;
  }

  return (
    <header className={headerClassName}>
      <Link className={styles.logo} href="/">
        <Image src="/img/logo.png" width={100} height={100} alt="Logo" />
      </Link>
      <nav className={styles.nav}>
        <Link href="/blog">Blog</Link>
        <Link href="/quizzes">Quizzes</Link>
        <Link href="/simulators">Simuladores</Link>
      </nav>
    </header>
  );
};

export default Header;
