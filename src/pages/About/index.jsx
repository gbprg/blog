import { Link } from "react-router-dom";
import styles from "./About.module.css";

export default function About() {
  return (
    <>
      <div className={styles.about}>
        <h2>Sobre o Blog</h2>

        <p>
          Este projeto consiste em um blog feito com react no front-end e
          firebase no back-end
        </p>
        <Link to="/posts/create" className="btn">
          Criar Post
        </Link>
      </div>
    </>
  );
}
