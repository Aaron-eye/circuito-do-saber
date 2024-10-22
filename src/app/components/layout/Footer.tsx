// components/Footer.jsx

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; Circuito do Saber {new Date().getFullYear()}</p>
      <p>Instituto Federal da Bahia - Campus Seabra</p>
      <a href="/sobre">Sobre o projeto</a>
    </footer>
  );
};

export default Footer;
