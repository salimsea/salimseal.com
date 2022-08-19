import styles from "styles/Portfolio.module.scss";

const SectionHero = () => {
  return (
    <section className={styles["hero"]}>
      <div className="container text-center" data-aos="zoom-in">
        <h1>Blogger</h1>
        <p className="mt-3">
          This page is for sharing knowledge, news about technology and coding{" "}
          <br />
          (content by: blogger.com)
        </p>
      </div>
    </section>
  );
};

export default SectionHero;
