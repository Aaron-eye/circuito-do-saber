// components/Footer.jsx

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} Circuito do Saber. Todos os direitos
        reservados.
      </p>
    </footer>
  );
};

export default Footer;
