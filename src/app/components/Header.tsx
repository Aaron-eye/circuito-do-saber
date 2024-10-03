"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  const defaultHeaderClassName = `${styles.header} ${styles.fixed}`;
  let headerClassName = defaultHeaderClassName;

  if (window.location.pathname === "/") {
    const [isScrolledPastHalf, setIsScrolledPastHalf] = useState(false);

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

    headerClassName = isScrolledPastHalf
      ? defaultHeaderClassName
      : `${styles.header} ${styles.absolute}`;
  }

  return (
    <header className={headerClassName}>
      <div className={styles.logo}>
        <Link href="/">Circuito do Saber</Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/blog">Blog</Link>
        <Link href="/quizzes">Quizzes</Link>
        <Link href="/simulators">Simuladores</Link>
      </nav>
    </header>
  );
};

export default Header;
