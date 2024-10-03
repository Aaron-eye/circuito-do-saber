import Header from "./components/Header";
import Footer from "./components/Footer";
import PostCard from "./components/PostCard";
import styles from "./page.module.scss";
import Link from "next/link";
import LinkButton from "./components/LinkButton";

export default function Home() {
  // Exemplos de posts divididos por categoria
  const categories = {
    eletrostatica: [
      {
        id: 1,
        title: "O que é Eletrostática?",
        excerpt: "Introdução aos princípios básicos da eletrostática...",
        slug: "o-que-e-eletrostatica",
      },
      {
        id: 2,
        title: "Força Eletrostática",
        excerpt: "Entenda as interações de cargas elétricas...",
        slug: "forca-eletrostatica",
      },
    ],
    eletrodinamica: [
      {
        id: 3,
        title: "Corrente Elétrica",
        excerpt: "Como a corrente elétrica flui em circuitos...",
        slug: "corrente-eletrica",
      },
      {
        id: 4,
        title: "Leis de Ohm",
        excerpt: "A relação entre tensão, corrente e resistência...",
        slug: "leis-de-ohm",
      },
    ],
    aplicacoes: [
      {
        id: 5,
        title: "Circuitos Práticos",
        excerpt: "Veja exemplos práticos de aplicação de circuitos...",
        slug: "circuitos-praticos",
      },
      {
        id: 6,
        title: "Eletrodinâmica no Dia a Dia",
        excerpt: "Descubra como a eletrodinâmica está presente...",
        slug: "eletrodinamica-no-dia-a-dia",
      },
    ],
  };

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.background}>
          <div></div>
          <div className={styles.imageContainer}>
            <div className={styles.gradient1}></div>
            <div className={styles.gradient2}></div>
            <img src="/img/hero.png" alt="Eletrostática e Eletrodinâmica" />
          </div>
        </div>
        <div className={styles.contentGrid}>
          <div className={styles.textContent}>
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
          <div className={styles.cardGrid}>
            {categories.eletrostatica.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
              />
            ))}
          </div>
          <LinkButton href="/blog" className={styles.seeMore}>
            Ver Todos
          </LinkButton>
        </section>
      </main>

      <Footer />
    </div>
  );
}
