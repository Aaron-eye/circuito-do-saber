// pages/blog.jsx

import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import styles from "./page.module.scss";

// Exemplo de dados estáticos. Em um projeto real, você buscaria de uma API ou CMS.
const posts = [
  {
    id: 1,
    title: "Introdução à Eletrostática",
    excerpt: "Aprenda os conceitos básicos da eletrostática...",
    slug: "introducao-a-eletrostatica",
  },
  {
    id: 2,
    title: "Leis de Coulomb",
    excerpt: "Entenda a lei que descreve a força entre cargas...",
    slug: "leis-de-coulomb",
  },
  // Adicione mais posts conforme necessário
];

const Blog = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog - Circuito do Saber</title>
        <meta
          name="description"
          content="Artigos sobre Eletrodinâmica e Eletrostática."
        />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>Blog</h1>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            excerpt={post.excerpt}
            slug={post.slug}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
