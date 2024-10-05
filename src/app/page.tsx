import Footer from "./components/layout/Footer";
import PostCard from "./components/PostCard";
import styles from "./page.module.scss";
import { fetchFilteredPosts } from "./actions/postActions";
import LinkButton from "./components/LinkButton";
import Post from "./blog/[slug]/page";

export default async function Home() {
  const examplePosts = await fetchFilteredPosts(3);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.background}>
          <div></div>
          <div className={styles["image-container"]}>
            <div className={styles.gradient1}></div>
            <div className={styles.gradient2}></div>
            <img src="/img/hero.png" alt="Eletrostática e Eletrodinâmica" />
          </div>
        </div>
        <div className={styles["content-grid"]}>
          <div className={styles["text-content"]}>
            <h1>Aprenda Eletrostática e Eletrodinâmica</h1>
            <p>
              O lugar ideal para aprofundar o seu conhecimento sobre os
              conteúdos relativos à eletricidade do Ensino Médio.
            </p>
            <LinkButton href="/info"> Saiba Mais </LinkButton>
          </div>
          <div></div>
        </div>
      </section>

      <main className={styles.main}>
        <section className={styles.blogSection}>
          <h2 id="categorias">Leia nosso blog educacional</h2>
          <div className={styles["card-grid"]}>
            {examplePosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <LinkButton href="/blog" className={styles["see-more"]}>
            Ver Todos
          </LinkButton>
        </section>
      </main>
    </div>
  );
}
