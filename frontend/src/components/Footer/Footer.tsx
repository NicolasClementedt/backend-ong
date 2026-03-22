import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        © SimpleEstoque {new Date().getFullYear()} — Sistema de Gestão Open
        Source
      </p>
    </footer>
  );
}
