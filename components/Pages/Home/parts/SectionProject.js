import React from "react";
import {
  ProjectDummy1,
  ProjectDummy2,
  ProjectDummy8,
  ProjectDummy14,
} from "assets";
import Image from "next/image";

const SectionProject = ({ styles }) => {
  return (
    <section className={styles["project"]}>
      <div className="container">
        <div className="row text-center">
          <div className="col-md-12 mb-4">
            <span>My Project</span>
          </div>
          <div className="col-md-6 mb-4" data-aos="fade-up">
            <Image
              src={ProjectDummy14}
              width={650}
              height={350}
              className={styles["img-project"]}
              alt=""
            />
          </div>
          <div className="col-md-6 mb-4" data-aos="fade-up">
            <Image
              src={ProjectDummy1}
              width={650}
              height={350}
              className={styles["img-project"]}
              alt=""
            />
          </div>
          <div className="col-md-6 mb-4" data-aos="fade-up">
            <Image
              src={ProjectDummy2}
              width={650}
              height={350}
              className={styles["img-project"]}
              alt=""
            />
          </div>
          <div className="col-md-6 mb-4" data-aos="fade-up">
            <Image
              src={ProjectDummy8}
              width={650}
              height={350}
              className={styles["img-project"]}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionProject;
