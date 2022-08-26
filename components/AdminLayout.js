import Head from "next/head";
import styles from "./AdminLayout.module.css";

export default function AdminLayout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>{pageTitle ? `${pageTitle} - ` : ""}Admin - Be Wild</title>
      </Head>
      <header className={styles.header}>Be Wild | Back-office</header>
      <main className={styles.container}>{children}</main>
    </>
  );
}
