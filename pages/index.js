import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../comps/Footer";
import Navbar from "../comps/Navbar";
import styles from "../styles/Home.module.css";

export default function Home({ sentences }) {
  // console.log(sentences);
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="keywords" content="thai, travel, language" />
      </Head>
      <div>
        <h2 className={styles.title}>Home</h2>
        <p className={styles.text}>
          It&apos;s more fun to speak the local&apos;s language when you travel.
        </p>
        <p className={styles.text}>
          Making you feel more connected with the people and culture.
        </p>
        <p className={styles.text}>
          Here we present you with relevant words that&apos;s easy, and very
          useful to remember.
        </p>
        <Link href="/sentences">
          <a className={styles.btn}>All sentences</a>
        </Link>
      </div>
    </>
  );
}
