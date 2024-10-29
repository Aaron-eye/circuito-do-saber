import PostCard from "../components/cards/PostCard";
import styles from "./page.module.scss";
import { fetchFilteredPosts } from "../actions/postActions";
import LinkButton from "../components/LinkButton";
import Post from "../types/Post";
import Quiz from "../components/svg/Quiz";
import Calculator from "../components/svg/Calculator";
import Control from "../components/svg/Control";

export const metadata = {
  title: "Circuito do Saber",
  description: "Página inicial da Circuito do Saber",
};

const FeatureElement = function ({
  icon,
  description,
  href,
}: {
  icon: React.ReactNode;
  description: string;
  href: string;
}) {
  return (
    <div className={styles["feature-element"]}>
      <div>
        {icon}
        <p>{description}</p>
      </div>
      <a href={href}>Confira</a>
    </div>
  );
};

export default async function Home() {
  const examplePosts = (await fetchFilteredPosts(0, 3)).posts;

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
            <LinkButton href="/sobre"> Saiba Mais </LinkButton>
          </div>
          <div></div>
        </div>
      </section>

      <main>
        <section>
          <h2 id="categorias">Leia nosso blog educacional</h2>
          <div className={styles["card-grid"]}>
            {examplePosts.map((post: Post) => (
              <PostCard key={post.slug.current} post={post} />
            ))}
          </div>
          <LinkButton href="/blog" className={styles["see-more"]}>
            Ver Todos
          </LinkButton>
        </section>

        <section>
          <div className={styles["feature-grid"]}>
            <div className={styles["quiz-element"]}>
              <FeatureElement
                icon={<Quiz />}
                description="Desafie-se com o nosso quiz"
                href="/quiz"
              />
            </div>
            <FeatureElement
              icon={<Calculator />}
              description="Use nossa calculadora para resolver problemas sobre eletricidade"
              href="/calculadoras"
            />

            <FeatureElement
              icon={<Control />}
              description="Divirta-se com os simuladores que recomendamos"
              href="/simuladores"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
