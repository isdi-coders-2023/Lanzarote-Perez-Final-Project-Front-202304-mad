import styles from "./footer.module.scss";
export function Footer() {
  return (
    <footer className={styles.footer}>
      <address>
        <h2 className={styles.h2}>@SRC</h2>
      </address>
    </footer>
  );
}
