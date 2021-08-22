import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="container">
      <div className={styles.card}>
        <div className={styles.content}>
          <h1 className={styles.heading}>Trivia Game</h1>
          <Link href="/quiz" passHref>
            <button className={styles.btn}>Start Game!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
