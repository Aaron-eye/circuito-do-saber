// pages/blog/[slug].jsx

import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Post.module.scss";

// Exemplo de dados estáticos
const posts = [
  {
    slug: "introducao-a-eletrostatica",
    title: "Introdução à Eletrostática",
    content: "Conteúdo completo do post sobre Eletrostática...",
  },
  // Adicione mais posts conforme necessário
];

const Post = () => {
  const router = useRouter();
  const { slug } = router.query;
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>{post.title} - Circuito do Saber</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </main>
      <Footer />
    </div>
  );
};

export default Post;
