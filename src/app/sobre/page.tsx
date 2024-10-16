import styles from "./page.module.scss";
import { fetchAllAuthors } from "../actions/authorActions";
import Image from "next/image";
import urlForImage from "../utils/urlForImage";

export default async function AboutPage() {
  const authors = await fetchAllAuthors();
  const authorImgSize = 200;

  return (
    <div className={styles.page}>
      <h1>Sobre</h1>
      <p>
        Circuito do Saber é um projeto de ensino médio que tem como objetivo
        apresentar informações sobre eletrostática e eletrodinâmica. Através de
        uma abordagem interativa e didática, buscamos ajudar estudantes a
        entender os conceitos fundamentais dessas áreas da física, promovendo
        uma aprendizagem mais envolvente.
      </p>
      <p>
        Com conteúdos explicativos, quizzes e exercícios práticos, o projeto
        visa reforçar a compreensão dos princípios da eletricidade e magnetismo,
        que são essenciais para o desenvolvimento acadêmico dos alunos. Nosso
        foco é proporcionar uma experiência de ensino que vá além da teoria,
        incentivando a aplicação dos conhecimentos em situações reais.
      </p>
      <p>
        Trabalho apresentado ao componente curricular de Física do curso Técnico
        de Nível Médio em Informática do Instituto Federal de Educação, Ciência
        e Tecnologia da Bahia, Campus Seabra, como parte avaliativa da II
        unidade. Professor: Nelson Costa.
      </p>
      <h2>Equipe</h2>
      <div className={styles["team-container"]}>
        {authors.map((author) => {
          const { name, slug, image, bio } = author;
          return (
            <div key={slug.current} className={styles["team-member-card"]}>
              <div className={styles["name-image-container"]}>
                <h3>{name}</h3>
                <div className={styles["image-container"]}>
                  <Image
                    src={urlForImage(image)
                      .width(authorImgSize)
                      .height(authorImgSize)
                      .url()}
                    width={authorImgSize}
                    height={authorImgSize}
                    alt={name}
                  />
                </div>
              </div>
              <div className={styles["bio"]}>{bio}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
