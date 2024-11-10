import styles from "styles/Portfolio.module.scss";

const SectionHero = () => {
  return (
    <section className={styles["hero"]}>
      <div className="container text-center" data-aos="zoom-in">
        <h1>Portfolio</h1>
        <p className="mt-3">
          This portfolio page highlights the projects and products I have
          developed, showcasing their features, design, and functionality to
          demonstrate my skills and expertise.
        </p>
      </div>
    </section>
  );
};

export default SectionHero;
